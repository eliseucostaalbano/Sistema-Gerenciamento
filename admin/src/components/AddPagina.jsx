import { useState } from "react";
import { addPageStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import {
  BadgeIndianRupee,
  BookOpenText,
  ChevronDown,
  ChevronUp,
  Clock,
  Image as ImageIcon,
  ListOrdered,
  PenLine,
  Plus,
  Star,
  Upload,
  UserPen,
  Video,
  X,
} from "lucide-react";

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
    lec.capitulos = lec.capitulos.map((ch) => {
      const chHours = Number(ch?.duracao?.horas) || 0;
      const chMins = Number(ch?.duracao?.minutos) || 0;
      const chTotal = Math.max(0, chHours * 60 + chMins);
      capitulosMinutos += chTotal;
      return {
        ...ch,
        duracao: { horas: chHours, minutos: chMins },
        totalMinutos: chTotal,
      };
    });

    let palestraMinutosTotal = 0;
    if (lec.capitulos.length > 0) {
      palestraMinutosTotal = capitulosMinutos;
    } else {
      palestraMinutosTotal = Math.max(
        0,
        (Number(lec.duracao.horas) || 0) * 60 +
          (Number(lec.duracao.minutos) || 0),
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
    0,
  );

  return {
    palestras: cloned,
    totalPalestras: cloned.length,
    duracaoTotal: {
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
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  const handleInputChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome.includes("preco.")) {
      const priceField = nome.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        preco: { ...prev.preco, [priceField]: value },
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
        : "Curso set como Curso Regular !",
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
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
    if (nome.includes("duracao.")) {
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
    const { duracaoTotal: duracaoTotal } = computeCourseTotals(
      formData.palestras,
    );
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
        toast.error(
          "Por favor insira um preço original válido para o curso pago",
        );
        return false;
      }
      if (!formData.preco.venda || parseFloat(formData.preco.venda) <= 0) {
        toast.error(
          "Por favor insira um preço de venda válido para o curso pago",
        );
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
        "Por favor insira a duração da palestra ou adicione capítulos com durações",
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
        currentChapter.duracao.minutos,
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
        capitulos: [...(prev.capitulos || []), chapter],
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
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)),
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
      const computed = computeCourseTotals(formData.palestras);
      const fd = new FormData();

      fd.append("nome", formData.nome);
      fd.append("professor", formData.professor);
      fd.append("rating", String(formData.rating || 0));
      fd.append("precoTipo", formData.precoTipo);
      fd.append("overview", formData.overview);
      fd.append(
        "palestrasTotal",
        String(formData.palestrasTotal || computed.palestrasTotal || 0),
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
        const message = data?.message || data?.error || "Erro ao criar o curso";
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

  return (
    <div className={addPageStyles.pageContainer}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className={addPageStyles.contentContainer}>
        <div className={addPageStyles.headerContainer}>
          <div className={addPageStyles.headerGradient}>
            <div className={addPageStyles.headerGlow}></div>

            <h1 className={addPageStyles.headerTitle}>Criar Novo Curso</h1>
          </div>
          <p className={addPageStyles.headerSubtitle}>
            Construa uma experiencia exepicional de apredizagem com nossos
            cursos intuituvos de criação de platarformas de sites
          </p>
        </div>

        <form onSubmit={handleSubmit} className={addPageStyles.form}>
          <div
            className={`${addPageStyles.card} ${addPageStyles.courseTypeCard}`}
          >
            <div className={addPageStyles.cardHeader}>
              <div className={addPageStyles.cardIconContainer}>
                <BookOpenText className={addPageStyles.cardIcon} size={20} />
              </div>
              <div>
                <h2 className={addPageStyles.cardTitle}>Tipo de Curso</h2>
                <p className={addPageStyles.cardSubtitle}>
                  Selecione o tipo de curso que você deseja criar
                </p>
              </div>
            </div>

            <div className={addPageStyles.courseTypeGrid}>
              <label
                htmlFor="top"
                className={addPageStyles.courseTypeLabel(
                  formData.cursoTipo === "top",
                  "top",
                )}
              >
                <input
                  type="radio"
                  id="top"
                  name="cursoTipo"
                  value="top"
                  checked={formData.courseType === "top"}
                  onChange={() => handleCourseTypeChange("top")}
                  className={`${addPageStyles.courseTypeInput} text-orange-500`}
                />
                <div>
                  <h3 className={addPageStyles.courseTypeText}>Curso Top</h3>
                </div>
              </label>

              <label
                htmlFor="regular"
                className={addPageStyles.courseTypeLabel(
                  formData.cursoTipo === "regular",
                  "regular",
                )}
              >
                <input
                  type="radio"
                  id="regular"
                  name="cursoTipo"
                  value="regular"
                  checked={formData.courseType === "regular"}
                  onChange={() => handleCourseTypeChange("regular")}
                  className={`${addPageStyles.courseTypeInput} text-blue-500`}
                />
                <div>
                  <h3 className={addPageStyles.courseTypeText}>
                    Curso Regular
                  </h3>
                </div>
              </label>
            </div>
          </div>

          <div
            className={`${addPageStyles.card} ${addPageStyles.courseInfoCard}`}
          >
            <div className={addPageStyles.cardHeader}>
              <div className={addPageStyles.cardIconContainer}>
                <BookOpenText className={addPageStyles.cardIcon} size={20} />
              </div>
              <div>
                <h2 className={addPageStyles.cardTitle}>Informação Do Curso</h2>
                <p className={addPageStyles.cardSubtitle}>
                  Detalhes Básicos sobre seu curso
                </p>
              </div>
            </div>

            <div className={addPageStyles.formGrid}>
              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <PenLine size={16} className={addPageStyles.inputIcon} />
                  Curso Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={addPageStyles.input}
                  placeholder="e.g., React Masterclass"
                  required
                />
              </div>

              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <UserPen size={16} className={addPageStyles.inputIcon} />
                  Nome Professor(a) *
                </label>
                <input
                  type="text"
                  name="professor"
                  value={formData.professor}
                  onChange={handleInputChange}
                  className={addPageStyles.input}
                  placeholder="e.g., Sophia Miller"
                  required
                />
              </div>

              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <Star size={16} className={addPageStyles.inputIcon} /> Curso
                  Rating
                </label>
                <div className="p-2 sm:p-3 bg-white border-2 border-gray-200 rounded-full shadow-sm">
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={handleRatingChange}
                  />
                </div>
              </div>

              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <Clock size={16} className={addPageStyles.inputIcon} />
                  Duração Total *
                </label>
                <div className={addPageStyles.durationGrid}>
                  <div>
                    <input
                      type="number"
                      name="duracaoTotal.horas"
                      value={formData.duracaoTotal.horas}
                      onChange={handleInputChange}
                      placeholder="Horas"
                      min="0"
                      className={addPageStyles.input}
                    />
                    <span className={addPageStyles.durationHelper}>Horas</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="duracaoTotal.minutos"
                      value={formData.duracaoTotal.minutos}
                      onChange={handleInputChange}
                      placeholder="Minutos"
                      min="0"
                      max="59"
                      className={addPageStyles.input}
                    />
                    <span className={addPageStyles.durationHelper}>
                      Minutos
                    </span>
                  </div>
                </div>
                {(formData.duracaoTotal.horas ||
                  formData.duracaoTotal.minutos) && (
                  <p className={addPageStyles.durationFormatted}>
                    Formatted: {formatTotalDuration()}
                  </p>
                )}
              </div>

              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <ListOrdered size={16} className={addPageStyles.inputIcon} />
                  Total Palestras *
                </label>
                <input
                  type="number"
                  name="palestrasTotal"
                  value={formData.palestrasTotal}
                  onChange={handleInputChange}
                  min="1"
                  className={addPageStyles.input}
                  placeholder="Ponha o total de palestras"
                  required
                />
              </div>

              <div className={addPageStyles.inputContainer}>
                <label className={addPageStyles.inputLabel}>
                  <BadgeIndianRupee
                    size={16}
                    className={addPageStyles.inputIcon}
                  />
                  Curso Tipo *
                </label>
                <select
                  name="precoTipo"
                  value={formData.precoTipo}
                  onChange={handleInputChange}
                  className={addPageStyles.select}
                >
                  <option value="gratis">Curso Gratis</option>
                  <option value="pago">Curso Pago</option>
                </select>
              </div>

              {formData.precoTipo === "pago" && (
                <>
                  <div className={addPageStyles.inputContainer}>
                    <label className={addPageStyles.inputLabel}>
                      <BadgeIndianRupee
                        size={16}
                        className={addPageStyles.inputIcon}
                      />
                      Preço Original*
                    </label>
                    <input
                      type="number"
                      name="preco.original"
                      value={formData.preco.original}
                      onChange={handleInputChange}
                      min="1"
                      step="0.01"
                      className={addPageStyles.input}
                      placeholder="200"
                      required={formData.precoTipo === "pago"}
                    />
                  </div>
                  <div className={addPageStyles.inputContainer}>
                    <label className={addPageStyles.inputLabel}>
                      <BadgeIndianRupee
                        size={16}
                        className={addPageStyles.inputIcon}
                      />
                      Preço de Venda *
                    </label>
                    <input
                      type="number"
                      name="preco.venda"
                      value={formData.preco.venda}
                      onChange={handleInputChange}
                      min="1"
                      step="0.01"
                      className={addPageStyles.input}
                      placeholder="99"
                      required={formData.precoTipo === "pago"}
                    />
                  </div>
                </>
              )}

              <div className={addPageStyles.formFullWidth}>
                <label className={addPageStyles.inputLabel}>
                  <ImageIcon size={16} className={addPageStyles.inputIcon} />
                  Imagem do Curso *
                </label>
                <div className={addPageStyles.uploadContainer}>
                  <label className={addPageStyles.uploadLabel}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={addPageStyles.uploadInput}
                      required
                    />
                    <div className={addPageStyles.uploadBox}>
                      <Upload size={18} className={addPageStyles.uploadIcon} />
                      <span className="font-medium text-center sm:text-left">
                        {formData.imagem
                          ? "Mude Imagem"
                          : "Upload Imagem do Curso"}
                      </span>
                    </div>
                  </label>
                  {formData.imagem && (
                    <div className={addPageStyles.imagePreview}>
                      <img
                        src={formData.imagem.preview}
                        alt="Course preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={addPageStyles.formFullWidth}>
                <label className={addPageStyles.inputLabel}>
                  <BookOpenText size={16} className={addPageStyles.inputIcon} />
                  Curso Overview *
                </label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  rows="4"
                  className={addPageStyles.textarea}
                  placeholder="Descreva o que os alunos aprenderão..."
                  required
                />
              </div>
            </div>
          </div>

          <div
            className={`${addPageStyles.card} ${addPageStyles.lecturesCard}`}
          >
            <div className={addPageStyles.lecturesHeader}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={addPageStyles.cardIconContainer}>
                  <Video className={addPageStyles.cardIcon} size={20} />
                </div>
                <div>
                  <h2 className={addPageStyles.cardTitle}>Conteudo Do Curso</h2>
                  {formData.palestras.length > 0 ? (
                    <p className={addPageStyles.cardSubtitle}>
                      {calculateTotalLectures()} palestras •{" "}
                      {calculateTotalCourseDuration()} de duração total
                    </p>
                  ) : (
                    <p className={addPageStyles.cardSubtitle}>
                      Adicione palestras e capítulos para construir o conteúdo
                      do curso
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLectureForm(true)}
                className={addPageStyles.addLectureButton}
              >
                <Plus size={16} /> Add Palestra
              </button>
            </div>

            <div className={addPageStyles.lecturesList}>
              {formData.palestras.map((palestra, lectureIndex) => (
                <div key={palestra.id} className={addPageStyles.lectureCard}>
                  <div className={addPageStyles.lectureHeader}>
                    <div className={addPageStyles.lectureContent}>
                      <button
                        onClick={() => toggleLecture(lectureIndex)}
                        className={addPageStyles.lectureToggleButton}
                      >
                        {expandedLectures.includes(lectureIndex) ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                      <div className={addPageStyles.lectureInfo}>
                        <h3 className={addPageStyles.lectureTitle}>
                          {palestra.titulo}
                        </h3>
                        <p className={addPageStyles.lectureMeta}>
                          <Clock size={14} /> {formatDuration(palestra.duracao)}
                          {palestra.capitulos?.length > 0 &&
                            ` • ${palestra.capitulos.length} chapters`}
                        </p>
                      </div>
                    </div>
                    <div className={addPageStyles.lectureActions}>
                      <button
                        type="button"
                        onClick={() => openAddChapter(lectureIndex)}
                        className={addPageStyles.addChapterButton}
                      >
                        <Plus size={14} /> Add Chapter
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLecture(lectureIndex)}
                        className={addPageStyles.deleteButton}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedLectures.includes(lectureIndex) &&
                    palestra.capitulos?.length > 0 && (
                      <div className={addPageStyles.chaptersContainer(true)}>
                        {palestra.capitulos.map((chapter, chapterIndex) => (
                          <div
                            key={chapter.id}
                            className={addPageStyles.chapterCard}
                          >
                            <div className={addPageStyles.chapterContent}>
                              <div className={addPageStyles.chapterInfo}>
                                <h4 className={addPageStyles.chapterTitle}>
                                  {chapter.nome}
                                </h4>
                                <p className={addPageStyles.chapterTopic}>
                                  {chapter.topico}
                                </p>
                                <div className={addPageStyles.chapterMeta}>
                                  <span
                                    className={addPageStyles.chapterDuration}
                                  >
                                    <Clock size={12} />{" "}
                                    {formatDuration(chapter.duracao)}
                                  </span>
                                  <p className={addPageStyles.chapterUrl}>
                                    {chapter.videoUrl}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeChapter(lectureIndex, chapterIndex)
                                }
                                className={addPageStyles.chapterDeleteButton}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className={addPageStyles.submitContainer}>
            <button
              type="submit"
              className={addPageStyles.submitButton}
              disabled={loading}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading
                ? "Criando..."
                : `Criar Curso ${
                    formData.courseType === "top" ? "Top" : "Regular"
                  }`}
            </button>
          </div>
        </form>

        {showLectureForm && (
          <div className={addPageStyles.modalOverlay}>
            <div className={addPageStyles.modal}>
              <div className={addPageStyles.modalHeader}>
                <div className={addPageStyles.modalIconContainer("bg-sky-300")}>
                  <Video className="text-white" size={20} />
                </div>
                <h3 className={addPageStyles.modalTitle}>
                  Adicionar Nova Palestra
                </h3>
              </div>

              <div className={addPageStyles.modalContent}>
                <div>
                  <label>Titulo da Palestra *</label>
                  <input
                    type="text"
                    name="titulo"
                    value={currentLecture.titulo}
                    onChange={handleLectureChange}
                    placeholder="e.g., Introdução ao React"
                    className={addPageStyles.input}
                  />
                </div>

                <div>
                  <label className={addPageStyles.inputLabel}>Duração *</label>
                  <div className={addPageStyles.durationGrid}>
                    <div>
                      <input
                        type="number"
                        name="duracao.horas"
                        value={currentLecture.duracao.horas}
                        onChange={handleLectureChange}
                        placeholder="Horas"
                        min="0"
                        max="59"
                        className={addPageStyles.input}
                      />
                      <span className={addPageStyles.durationHelper}>
                        Horas
                      </span>
                    </div>

                    <div>
                      <input
                        type="number"
                        name="duracao.minutos"
                        value={currentLecture.duracao.minutos}
                        onChange={handleLectureChange}
                        placeholder="Minutos"
                        min="0"
                        className={addPageStyles.input}
                      />
                      <span className={addPageStyles.durationHelper}>
                        Minutos
                      </span>
                    </div>
                  </div>
                </div>

                {currentLecture.capitulos.length > 0 && (
                  <div>
                    <label className={addPageStyles.inputLabel}>
                       Capítulos nessa palestra
                    </label>
                    <div className={addPageStyles.chaptersList}>
                      {currentLecture.capitulos.map((capitulo) => (
                        <div key={capitulo.id} className={addPageStyles.chapterPreview}>
                          <div className={addPageStyles.chapterPreviewTitle}>
                            {capitulo.nome}
                          </div>

                          <div className={addPageStyles.chapterPreviewDuration}>
                            {formatDuration(capitulo.duracao)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={addPageStyles.modalActions}>
                 <button
                 type="button"
                 onClick={() => openAddChapter()}
                 className={`${addPageStyles.modalButton} ${addPageStyles.modalButtonPrimary}`}
                 >
                 <Plus size={14} /> Adicionar Capítulo
                 </button>
                </div>
                <div className="flex gap-2 sm:gap-3 pt-2">
                <button
                 type="button"
                 onClick={addLecture}
                 className={`${addPageStyles.modalButton} ${addPageStyles.modalButtonPrimary}`}
                 >
                  Adicionar Palestra
                 </button>
                 <button
                 type="button"
                 onClick={() => setShowLectureForm(false)}
                 className={`${addPageStyles.modalButton} ${addPageStyles.modalButtonSecondary}`}
                 >
                  Cancelar
                 </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showChapterForm && (
          <div className={addPageStyles.modalOverlay}>
            <div className={addPageStyles.modal}>
              <div className={addPageStyles.modalHeader}>
                <div
                  className={addPageStyles.modalIconContainer("bg-green-100")}
                >
                  <Plus className="text-green-600" size={20} />
                </div>
                <h3 className={addPageStyles.modalTitle}>
                  {selectedLectureIndex !== null
                    ? "Adicione Capítulo à Palestra"
                    : "Adicione Capítulo à Palestra Atual"}
                </h3>
              </div>
              <div className={addPageStyles.modalContent}>
                <div>
                  <label className={addPageStyles.inputLabel}>
                    Nome do Capítulo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={currentChapter.nome}
                    onChange={handleChapterChange}
                    placeholder="e.g., Introdução Ao Curso"
                    className={addPageStyles.textarea}
                  />
                </div>

                <div>
                  <label className={addPageStyles.inputLabel}>Topico *</label>
                  <input
                    type="text"
                    name="topico"
                    value={currentChapter.topico}
                    onChange={handleChapterChange}
                    placeholder="e.g., O que Contruiremos"
                    className={addPageStyles.textarea}
                  />
                </div>

                <div>
                  <label className={addPageStyles.inputLabel}>Duração *</label>
                  <div className={addPageStyles.durationGrid}>
                    <div>
                      <input
                        type="number"
                        name="duracao.horas"
                        value={currentChapter.duracao.horas}
                        onChange={handleChapterChange}
                        placeholder="Horas"
                        min="0"
                        className={addPageStyles.textarea}
                      />
                      <span className={addPageStyles.durationHelper}>
                        Horas
                      </span>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="duracao.minutos"
                        value={currentChapter.duracao.minutos}
                        onChange={handleChapterChange}
                        placeholder="Minutos"
                        min="0"
                        max="59"
                        className={addPageStyles.textarea}
                      />
                      <span className={addPageStyles.durationHelper}>
                        Minutos
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={addPageStyles.inputLabel}>
                    Video URL *
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={currentChapter.videoUrl}
                    onChange={handleChapterChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className={addPageStyles.textarea}
                  />
                </div>

                <div className={addPageStyles.modalActions}>
                  <button
                    type="button"
                    onClick={addChapter}
                    className={`${addPageStyles.modalButtonCompact} ${addPageStyles.modalButtonCompactPrimary}`}
                  >
                    Adicionar Capítulo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowChapterForm(false);
                      setSelectedLectureIndex(null);
                    }}
                    className={`${addPageStyles.modalButtonCompact} ${addPageStyles.modalButtonCompactSecondary}`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddPagina;
