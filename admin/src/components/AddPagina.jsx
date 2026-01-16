import React, { useState } from "react";
import { addPageStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    precoTipo: "free",
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
    capitulo: [],
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
      toast.error("Please enter course name");
      return false;
    }
    if (!formData.professor?.trim()) {
      toast.error("Please enter instructor name");
      return false;
    }
    if (!formData.imagem?.file) {
      toast.error("Please upload a course image");
      return false;
    }
    if (!formData.overview?.trim()) {
      toast.error("Please enter course overview");
      return false;
    }
    if (!formData.palestrasTotal || Number(formData.palestrasTotal) <= 0) {
      toast.error("Please enter valid total lectures count");
      return false;
    }
    if (!formData.duracaoTotal.horas && !formData.duracaoTotal.minutos) {
      toast.error("Please enter total duration");
      return false;
    }
    if (formData.preco === "pago") {
      if (
        !formData.preco.original ||
        parseFloat(formData.price.original) <= 0
      ) {
        toast.error("Please enter valid original price for paid course");
        return false;
      }
      if (!formData.preco.venda || parseFloat(formData.preco.venda) <= 0) {
        toast.error("Please enter valid sale price for paid course");
        return false;
      }
      if (
        parseFloat(formData.preco.venda) >= parseFloat(formData.preco.original)
      ) {
        toast.error("Sale price should be less than original price");
        return false;
      }
    }
    if (formData.palestras.length === 0) {
      toast.error("Please add at least one lecture");
      return false;
    }
    for (let i = 0; i < formData.palestras.length; i++) {
      const palestra = formData.palestras[i];
      if (!palestra.titulo?.trim()) {
        toast.error(`Lecture ${i + 1} has no title`);
        return false;
      }
      if (
        (palestra.capitulos?.length || 0) === 0 &&
        !palestra.duracao.horas &&
        !palestra.duracao.minutos
      ) {
        toast.error(`Lecture ${i + 1} has no duration`);
        return false;
      }
    }
    return true;
  };

  return <div>AddPagina</div>;
};

export default AddPagina;
