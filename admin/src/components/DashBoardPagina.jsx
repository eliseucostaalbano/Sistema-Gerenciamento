import { useState, useEffect } from "react";
import { dashboardStyles } from "../assets/dummyStyles"
import { BadgeIndianRupee, BookMarked, ShoppingCart, Users } from "lucide-react";

const API_BASE = 'http://localhost:2000'

const fmtCurrency = (n) => {
  if (n == null) return "R$0";
  const num = Number(n)
  if (Number.isNaN(num)) return "R$0";
  return `R$${num}`;
};

const DashBoardPagina = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconMap = {
    Users,
    ShoppingCart,
    BookMarked,
    BadgeIndianRupee,
  };
  
  const buildStats = (backendStats) => {
    const totalBookings = backendStats?.totalBookings ?? 0;
    const totalRevenue = backendStats?.totalRevenue ?? 0;
    const bookingsLast7Days = backendStats?.bookingsLast7Days ?? 0;
    const topCourses = backendStats?.topCourses ?? [];

    return [
      {
        titulo: "Reservesas Totais",
        value: totalBookings,
        icone: iconMap.Users,
        cor: "indigo",
      },
      {
        titulo: "Ganhos",
        value: fmtCurrency(totalRevenue),
        icone: iconMap.BadgeIndianRupee,
        cor: "green",
      },
      {
        titulo: "Reservas (7d)",
        value: bookingsLast7Days,
        icone: iconMap.ShoppingCart,
        cor: "yellow",
      },
      {
        titulo: "Top Cursos",
        value: (topCourses && topCourses.length) || 0,
        icone: iconMap.BookMarked,
        cor: "purple",
      },
    ];
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchStats = () =>
      fetch(`${API_BASE}/api/reserva/stats`)
        .then((r) => r.json())
        .then((j) =>
          j.success ? j.status : Promise.reject(j.messagem || "Status error")
        );

    const fetchCourses = () =>
      fetch(`${API_BASE}/api/curso`)
        .then((r) => r.json())
        .then((j) =>
          j.success ? j.cursos : Promise.reject(j.messagem || "Curso error")
        );

    Promise.all([fetchStats(), fetchCourses()])
      .then(([stats, cursos]) => {
        if (!mounted) return;

        const topLookup = {};
        Array.isArray(stats?.topCursos) &&
          stats.topCursos.forEach((t) => {
            if (!t) return;
            const nome = t.cursoNome || "";
            topLookup[nome] = {
              purchases: Number(t.count || 0),
              revenue: Number(t.revenue || 0),
            };
          });

        const mapped = (cursos || []).map((c) => {
          const id = c._id ?? c.id ?? c.courseId ?? "";
          const nome = c.nome ?? c.titulo ?? "Curso Intuladado";
          const imagem = c.imagem ?? "";
          const instrutor = c.professor ?? c.instrutor ?? "desconhecido";
          const metricas = topLookup[nome] || { comprass: 0, revenue: 0 };
          const estudantes = metricas.purchases || (c.etudantes ?? 0);
          const compras = metricas.purchases || (c.purchases ?? 0);
          const ganhos = metricas.revenue ?? c.ganhos ?? 0;

          let precoDisplay = "Gratis";
          if (c.preco && (c.preco.venda || c.preco.original)) {
            const venda = c.preco.venda != null ? Number(c.preco.venda) : null;
            const orig =
              c.preco.original != null ? Number(c.preco.original) : null;
            precoDisplay =
              venda != null
                ? fmtCurrency(venda)
                : orig != null
                ? fmtCurrency(orig)
                : "Gratis";
          } else if (c.precoTipo && c.precoTipo !== "Gratis") {
            precoDisplay = "R$0";
          }

          return {
            id,
            imagem,
            nome,
            instrutor,
            estudantes,
            preco: precoDisplay,
            compras,
            ganhos: fmtCurrency(ganhos),
          };
        });

        setStatsData(buildStats(stats));
        setCoursesData(mapped);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        if (mounted) setError(String(err) || "Falha em carregar dashboard data");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const stats = statsData || [
    { titulo: "Reservas Totais",
      value: 0, 
      icone: iconMap.Users, 
      cor: "indigo" 
    },
    {
      titulo: "Ganhos",
      value: "R$0",
      icone: iconMap.BadgeIndianRupee,
      cor: "green",
    },
    {
      titulo: "Reservas (7d)",
      value: 0,
      icone: iconMap.ShoppingCart,
      cor: "yellow",
    },
    {
      titulo: "Top Cursos",
      value: 0,
      icone: iconMap.BookMarked,
      cor: "purple",
    },
  ];

  const filteredCourses = coursesData.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (curso.instrutor || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={dashboardStyles.pageContainer}>
     <div className={dashboardStyles.backgroundPattern}></div>

     <div className={dashboardStyles.contentContainer}>
      {/* Header */}
      <div className={dashboardStyles.headerContainer}>
        <h1 className={dashboardStyles.headerTitle}>DashBoard Overview</h1>
        <p className={dashboardStyles.headerSubtitle}> Bem vindo De volta. Aqui o que tem no seus cursos hoje</p>
      </div>
      
      {error  && (
        <div className={dashboardStyles.errorBanner} role="alert">
          {error}
        </div>
      )}
      <div>
      </div>
     </div>
    </div>
  )
}

export default DashBoardPagina