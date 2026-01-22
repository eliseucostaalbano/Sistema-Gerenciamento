import { useState, useEffect } from "react";
import { dashboardStyles } from "../assets/dummyStyles";
import {BadgeIndianRupee, BookMarked, BookOpenText, Search, ShoppingCart, Users} from "lucide-react";

const API_BASE = "http://localhost:2000";

const fmtCurrency = (n) => {
  if (n == null) return "R$0";
  const num = Number(n);
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
        titulo: "Reservas Totais",
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

    const fetchStats = () => {
      fetch(`${API_BASE}/api/reserva/stats`)
        .then((r) => r.json())
        .then((j) =>
          j.success ? j.status : Promise.reject(j.messagem || "Status error")
        );
      }

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

        const mapeado = (cursos || []).map((c) => {
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
        setCoursesData(mapeado);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        if (mounted)
          setError(String(err) || "Falha em carregar dashboard data");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const stats = statsData || [
    {
      titulo: "Reservas Totais",
      value: 0,
      icone: iconMap.Users,
      cor: "indigo",
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
          <p className={dashboardStyles.headerSubtitle}>
            Bem vindo De volta. Aqui o que tem no seus cursos hoje
          </p>
        </div>

        {error && (
          <div className={dashboardStyles.errorBanner} role="alert">
            {error}
          </div>
        )}
        {/* stats Section */}
        <div className={dashboardStyles.statsGrid}>
         {stats.map((stat,index) => {
          const Icone = stat.icone || Users
            return (
              <div 
              key={stat.titulo}
              className={dashboardStyles.statCard}
              style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center justify-between">
                  <div>
                   <p className={dashboardStyles.statTitle}>{stat.titulo}</p>
                   <p className={dashboardStyles.statValue}>{stat.value}</p> 
                  </div>
                  <div className={dashboardStyles.statIconContainer?.(stat.cor)}>
                   <Icone className={dashboardStyles.statIcon} />
                  </div>
                </div>
              </div>
            )
         })}
        </div>

        {/* cursos Secition */}
        <div className={dashboardStyles.coursesContainer}>
         <div className={dashboardStyles.coursesHeader}>
          <div className={dashboardStyles.coursesTitleContainer}>
           <BookOpenText  className={dashboardStyles.coursesIcon}/>
           <h2 className={dashboardStyles.coursesTitle}> Performace Cursos</h2>
          </div>

          <div className={dashboardStyles.searchContainer}>
           <Search className={dashboardStyles.searchIcon}/>
           <input 
            type="text"
            placeholder="Buscar Cursos ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={dashboardStyles.searchInput}
           />
          </div>
         </div>

         {/* tabela */}
         <div className={dashboardStyles.tableContainer}>
          <table className={dashboardStyles.table}>
           <thead className={dashboardStyles.tableHead}>
             <tr>
                  <th className={dashboardStyles.tableHeader}>Curso</th>
                  <th className={dashboardStyles.tableHeader}>Estudantes</th>
                  <th className={dashboardStyles.tableHeader}>Preço</th>
                  <th className={dashboardStyles.tableHeader}>Compras</th>
                  <th className={dashboardStyles.tableHeader}>Ganhos</th>
                </tr>
           </thead>

           <tbody className={dashboardStyles.tableBody}>
             {filteredCourses.map((curso, index) => (
              <tr key={curso.id|| `${index}`} 
              className={dashboardStyles.tableRow}
              style={{
                animationDelay: `${index * 50 + 400}ms`
              }}
              >
               <td className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center">
                  <img src={curso.imagem} alt={curso.nome} className={dashboardStyles.courseImage}/>
                  <div>
                     <p className={dashboardStyles.courseName}>
                  {curso.nome}
                </p>
                <p className={dashboardStyles.courseInstructor}>
                  {curso.instrutor}
                </p>
                  </div>
                </div>
               </td>
               <td className={dashboardStyles.studentsCell}>
                <div className="flex items-center text-gray-700">
                  <span className={dashboardStyles.studentsText}>
                    {curso.estudantes}
                  </span>
                </div>
               </td>
               <td className={dashboardStyles.priceCell}>
                {curso.preco}
               </td>
               <td>
                <div className={dashboardStyles.purchasesContainer}>
                  <ShoppingCart className={dashboardStyles.purchasesIcon} />
                  <span className={dashboardStyles.purchasesText}>
                    {curso.compras}
                  </span>
                </div>
               </td>
               <td className={dashboardStyles.earningsCell}>
                {curso.ganhos}
               </td>
              </tr>
             ))}
           </tbody>
          </table>
          {filteredCourses.length === 0 && !loading && (
            <div className={dashboardStyles.emptyState}>
              <Search className={dashboardStyles.emptyIcon}/>
              <p className={dashboardStyles.emptyText}>
                Nenhum curso encontrado
              </p>

              <button onClick={() => setSearchTerm("")} 
              className={dashboardStyles.clearButton}>
                Limpar busca
              </button>
            </div>
          )}

          {loading && (
            <div className={dashboardStyles.loadingOverlay}>
             <div className={dashboardStyles.loadingSpinner} />
            </div>
          )}
         </div>
        </div>
      </div>
    </div>
    
  );
};

export default DashBoardPagina;
