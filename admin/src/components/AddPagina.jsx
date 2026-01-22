import { useState } from "react";
import { addPageStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const API_BASE = "http://localhost:2000";

const formatDuration = (a, b) => {
  let horas = 0;
  let minutos = 0;
  if (typeof a === "object" && a !== null) {
    horas = Number(a.horas) || 0;
    minutos = Number(a.minutos) || 0;
  } else {
    horas = Number(a) || 0;
    minutos = Number(b) || 0;
  }
  const minutosTotais = Math.max(0, Math.floor(horas * 60 + minutos));
  const hrs = Math.floor(minutosTotais / 60);
  const mins = minutosTotais % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
};

const computeCourseTotals = (palestras = []) => {
  const cloned = (Array.isArray(palestras) ? palestras : []).map((palestra) => {
    const lec = {
      ...palestra,
      duracao: {
        horas: Number(palestra?.duracao?.horas) || 0,
        minutos: Number(palestra?.duracao?.minutos) || 0,
      },
      capitulos: Array.isArray(palestra?.capitulos)
        ? [...palestra.capitulos]
        : [],
    };

    // compute chapter totals and sum
    let capitulosMinutos = 0;
    lec.chapters = lec.chapters.map((ch) => {
      const chHours = Number(ch?.duracao?.hours) || 0;
      const chMins = Number(ch?.duracao?.minutes) || 0;
      const chTotal = Math.max(0, chHours * 60 + chMins);
      capitulosMinutos += chTotal;
      return {
        ...ch,
        duracao: { hours: chHours, minutes: chMins },
        totalMinutos: chTotal,
      };
    });

    let palestraMinutosTotal = 0;
    if (lec.chapters.length > 0) {
      palestraMinutosTotal = capitulosMinutos;
    } else {
      palestraMinutosTotal = Math.max(
        0,
        (Number(lec.duracao.horas) || 0) * 60 +
          (Number(lec.duracao.minutos) || 0)
      );
    }

    const lh = Math.floor(palestraMinutosTotal / 60);
    const lm = palestraMinutosTotal % 60;

    return {
      ...lec,
      totalMinutos: palestraMinutosTotal,
      duracao: { horas: lh, minutos: lm },
    };
  });

  const cursoMinutosTotal = cloned.reduce(
    (s, l) => s + (Number(l.totalMinutos) || 0),
    0
  );

  return {
    palestras: cloned,
    totalPalestras: cloned.length,
    totalDuracao: {
      horas: Math.floor(cursoMinutosTotal / 60),
      minutos: cursoMinutosTotal % 60,
    },
  };
};
const AddPagina = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    professor: "",
    imagem: null,
    rating: 0,
    precoTipo: "gratis",
    preco: { original: "", venda: "" },
    overview: "",
    duracaoTotal: { horas: "", minutos: "" },
    palestrasTotal: "",
    palestras: [],
    cursoTipo: "regular",
  });

  const [currentLecture, setCurrentLecture] = useState({
    titulo: "",
    duracao: { horas: "", minutos: "" },
    capitulos: [],
  });

  const [currentChapter, setCurrentChapter] = useState({
    nome: "",
    topico: "",
    duracao: { horas: "", minutos: "" },
    videoUrl: "",
  });

  const [showLectureForm, setShowLectureForm] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [expandedLectures, setExpandedLectures] = useState([]);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(null);

  const toggleLecture = (index) =>
    setExpandedLectures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  const handleInputChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome.includes("price.")) {
      const priceField = nome.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: { ...prev.price, [priceField]: value },
      }));
    } else if (nome.includes("duracaoTotal.")) {
      const durationField = nome.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        duracaoTotal: { ...prev.duracaoTotal, [durationField]: value },
      }));
    } else if (nome === "palestrasTotal") {
      setFormData((prev) => ({ ...prev, palestrasTotal: value }));
    } else {
      setFormData((prev) => ({ ...prev, [nome]: value }));
    }
  };

  const handleCourseTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, cursoTipo: type }));
    toast.success(
      type === "top"
        ? "Curso set como Curso Top!"
        : "Curso set como Curso Regular !"
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("imagem/")) {
      toast.error("Faça o upload de um arquivo de imagem valido ");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({
        ...prev,
        image: { file, preview: ev.target.result },
      }));
      toast.success("Upload de imagem feito com successo!");
    };
    reader.readAsDataURL(file);
  };

  const handleRatingChange = (rating) =>
    setFormData((prev) => ({ ...prev, rating }));

  const handleLectureChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome.includes("duracao.")) {
      const durationField = nome.split(".")[1];
      setCurrentLecture((prev) => ({
        ...prev,
        duracao: { ...prev.duracao, [durationField]: value },
      }));
    } else {
      setCurrentLecture((prev) => ({ ...prev, [nome]: value }));
    }
  };

  const handleChapterChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome.includes("duration.")) {
      const durationField = nome.split(".")[1];
      setCurrentChapter((prev) => ({
        ...prev,
        duracao: { ...prev.duracao, [durationField]: value },
      }));
    } else {
      setCurrentChapter((prev) => ({ ...prev, [nome]: value }));
    }
  };
  const calculateTotalMinutes = (horas, minutos) =>
    (parseInt(horas) || 0) * 60 + (parseInt(minutos) || 0);

  const calculateTotalCourseDuration = () => {
    const { duracaoTotal: duracaoTotal } = computeCourseTotals(formData.palestras);
    return formatDuration(duracaoTotal);
  };

  const calculateTotalLectures = () => formData.palestras.length;

  const formatTotalDuration = () => formatDuration(formData.duracaoTotal);

  const validateForm = () => {
    if (!formData.nome?.trim()) {
      toast.error("Por favor insira o nome do curso");
      return false;
    }
    if (!formData.professor?.trim()) {
      toast.error("Por favor insira o nome do professor");
      return false;
    }
    if (!formData.imagem?.file) {
      toast.error("Por favor faça o upload de uma imagem do curso");
      return false;
    }
    if (!formData.overview?.trim()) {
      toast.error("Por favor insira a visão geral do curso");
      return false;
    }
    if (!formData.palestrasTotal || Number(formData.palestrasTotal) <= 0) {
      toast.error("Por favor insira uma contagem válida de palestras");
      return false;
    }
    if (!formData.duracaoTotal.horas && !formData.duracaoTotal.minutos) {
      toast.error("Por favor insira a duração total");
      return false;
    }
    if (formData.preco === "pago") {
      if (
        !formData.preco.original ||
        parseFloat(formData.preco.original) <= 0
      ) {
        toast.error("Por favor insira um preço original válido para o curso pago");
        return false;
      }
      if (!formData.preco.venda || parseFloat(formData.preco.venda) <= 0) {
        toast.error("Por favor insira um preço de venda válido para o curso pago");
        return false;
      }
      if (
        parseFloat(formData.preco.venda) >= parseFloat(formData.preco.original)
      ) {
        toast.error("Preço de venda deve ser menor que o preço original");
        return false;
      }
    }
    if (formData.palestras.length === 0) {
      toast.error("Por favor adicione pelo menos uma palestra");
      return false;
    }
    for (let i = 0; i < formData.palestras.length; i++) {
      const palestra = formData.palestras[i];
      if (!palestra.titulo?.trim()) {
        toast.error(`Palestra ${i + 1} não tem titulo`);
        return false;
      }
      if (
        (palestra.capitulos?.length || 0) === 0 &&
        !palestra.duracao.horas &&
        !palestra.duracao.minutos
      ) {
        toast.error(`Palestra ${i + 1} não tem duração válida`);
        return false;
      }
    }
    return true;
  };

  const addLecture = () => {
    if (!currentLecture.titulo?.trim()) {
      toast.error("Por favor diga o titulo da palestra");
      return;
    }

    const hasChapters =
      Array.isArray(currentLecture.capitulos) &&
      currentLecture.capitulos.length > 0;
    if (
      !hasChapters &&
      !currentLecture.duracao.horas &&
      !currentLecture.duracao.minutos
    ) {
      toast.error(
        "Por favor insira a duração da palestra ou adicione capítulos com durações"
      );
      return;
    }

    const lecture = {
      id: `Palestra-${Date.now()}`,
      titulo: currentLecture.titulo.trim(),
      duracao: {
        horas: Number(currentLecture.duracao.horas) || 0,
        minutos: Number(currentLecture.duracao.minutos) || 0,
      },
      capitulos: (currentLecture.capitulos || []).map((ch) => ({ ...ch })),
    };

    const newLectures = [...formData.palestras, lecture];
    const computed = computeCourseTotals(newLectures);

    setFormData((prev) => ({
      ...prev,
      palestras: computed.palestras,
      duracaoTotal: computed.duracaoTotal,
      palestrasTotal: computed.palestrasTotal,
    }));

    setCurrentLecture({
      titulo: "",
      duracao: { horas: "", minutos: "" },
      capitulos: [],
    });
    setShowLectureForm(false);
    setExpandedLectures((prev) => [...prev, (formData.palestras || []).length]);
    toast.success("Palestra adicionada com sucesso!");
  };
 
  const addChapter = () => {
    if (!currentChapter.nome?.trim()) {
      toast.error("Por favor insira o nome do capítulo");
      return;
    }
    if (!currentChapter.topico?.trim()) {
      toast.error("Por favor insira o tópico do capítulo");
      return;
    }
    if (!currentChapter.duracao.horas && !currentChapter.duracao.minutos) {
      toast.error("Por favor insira a duração do capítulo");
      return;
    }
    if (!currentChapter.videoUrl?.trim()) {
      toast.error("Por favor insira um URL de vídeo");
      return;
    }

    const chapter = {
      id: `capitulo-${Date.now()}`,
      nome: currentChapter.nome.trim(),
      topico: currentChapter.topico.trim(),
      duracao: {
        horas: Number(currentChapter.duracao.horas) || 0,
        minutos: Number(currentChapter.duracao.minutos) || 0,
      },
      minutosTotais: calculateTotalMinutes(
        currentChapter.duracao.horas,
        currentChapter.duracao.minutos
      ),
      videoUrl: currentChapter.videoUrl.trim(),
    };

    let newLectures = [...formData.palestras];

    if (
      selectedLectureIndex !== null &&
      typeof selectedLectureIndex === "number"
    ) {
      // add to existing lecture
      if (!newLectures[selectedLectureIndex]) {
        toast.error("Palestra não encontrada");
        return;
      }
      newLectures[selectedLectureIndex] = {
        ...newLectures[selectedLectureIndex],
        capitulos: [
          ...(newLectures[selectedLectureIndex].capitulos || []),
          chapter,
        ],
      };

      const computed = computeCourseTotals(newLectures);
      setFormData((prev) => ({
        ...prev,
        palestras: computed.palestras,
        duracaoTotal: computed.duracaoTotal,
        palestrasTotal: computed.palestrasTotal,
      }));
      toast.success("Capítulo adicionado com sucesso!");
    } else {
      // add to current lecture draft's chapters
      setCurrentLecture((prev) => ({
        ...prev,
        chapters: [...(prev.chapters || []), chapter],
      }));
      toast.success("Capítulo adicionado ao rascunho da palestra!");
    }

    setCurrentChapter({
      nome: "",
      topico: "",
      duracao: { horas: "", minutos: "" },
      videoUrl: "",
    });
    setShowChapterForm(false);
    setSelectedLectureIndex(null);
  };
  
   const openAddChapter = (lectureIndex = null) => {
    setSelectedLectureIndex(lectureIndex);
    setShowChapterForm(true);
  };

  const removeLecture = (index) => {
    const updated = formData.palestras.filter((_, i) => i !== index);
    const computed = computeCourseTotals(updated);
    setFormData((prev) => ({
      ...prev,
      palestras: computed.palestras,
      duracaoTotal: computed.duracaoTotal,
      palestrasTotal: computed.palestrasTotal,
    }));
    setExpandedLectures((prev) =>
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
    );
    toast.success("Palestra removida");
  };

  const removeChapter = (lectureIndex, chapterIndex) => {
    const updated = formData.palestras.map((lec, li) => {
      if (li !== lectureIndex) return lec;
      return {
        ...lec,
        capitulos: (lec.capitulos || []).filter((_, ci) => ci !== chapterIndex),
      };
    });
    const computed = computeCourseTotals(updated);
    setFormData((prev) => ({
      ...prev,
      palestras: computed.palestras,
      duracaoTotal: computed.duracaoTotal,
      palestrasTotal: computed.palestrasTotal,
    }));
    toast.success("Capitulo removido");
  };

  const submitToBackend = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const computed = computeCourseTotals(formData.lectures);
      const fd = new FormData();

      fd.append("nome", formData.nome);
      fd.append("professor", formData.professor);
      fd.append("rating", String(formData.rating || 0));
      fd.append("precoTipo", formData.precoTipo);
      fd.append("overview", formData.overview);
      fd.append(
        "palestrasTotal",
        String(formData.palestrasTotal || computed.palestrasTotal || 0)
      );
      fd.append("cursoTipo", formData.cursoTipo);

      fd.append("preco", JSON.stringify(formData.preco));
      fd.append("duracaoTotal", JSON.stringify(computed.duracaoTotal));
      fd.append("palestras", JSON.stringify(computed.palestras));

      if (formData.imagem?.file) fd.append("imagem", formData.imagem.file);

      const res = await fetch(`${API_BASE}/api/curso`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          data?.message || data?.error || "Erro ao criar o curso";
        toast.error(message);
        setLoading(false);
        return;
      }

      toast.success("Curso criado com sucesso!");
      navigate("/listacurso");
    } catch (err) {
      console.error("submitToBackend error:", err);
      toast.error("Erro no servidor ao criar o curso");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitToBackend();
  };

  const StarRating = ({ rating, onRatingChange }) => (
    <div className={addPageStyles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={addPageStyles.starButton}
        >
          {star <= rating ? (
            <Star className={addPageStyles.starFull} size={28} />
          ) : (
            <Star className={addPageStyles.starEmpty} size={28} />
          )}
        </button>
      ))}
    </div>
  );

  return <div>AddPagina</div>;
};

export default AddPagina;
