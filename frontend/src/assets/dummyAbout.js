import A1 from "../assets/A1.png"
import A2 from "../assets/A2.png"
import A3 from "../assets/A3.png"
import A4 from "../assets/A4.png"
import AT1   from "../assets/AT1.png"
import AT2 from "../assets/AT2.png"
import AT3 from "../assets/AT3.png"

import {
  Users,
  BookOpen,
  Award,
  Globe,
  GraduationCap,
  Clock,
  Target,
  Eye,
  Heart,
} from "lucide-react";

export const counterTargets = {
  estudantes: 50000,
  cursos: 2500,
  taxaSucesso: 95,
  paises: 150,
  certificados: 1000000,
  suporte: 24,
};

export const statsMeta = [
  {
    key: "estudantes",
    label: "Estudantes Ativos",
    icone: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    key: "cursos",
    label: "Cursos",
    icone: BookOpen,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    key: "taxaSucesso",
    label: "Taxa de Sucesso",
    icone: Award,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
  {
    key: "paises",
    label: "Países",
    icone: Globe,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  {
    key: "certificados",
    label: "Certificados",
    icone: GraduationCap,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
  },
  {
    key: "suporte",
    label: "Suporte",
    icone: Clock,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
  },
];

export const missionVisionValues = [
  {
    type: "missão",
    icone: Target,
    titulo: "Nossa Missão",
    subtitulo: "Educação Global e  Aberta",
    descricao:
      "Ter educação de Alta Qualidade acessível e acessível para todos, em todo lugar. Acreditamos que o aprendizado não deve ter limites.",
    dotLottie: "https://lottie.host/d4aed205-8352-4490-a20a-83e4b3b3e2f6/f3nl34gaEN.lottie",
    features: [
      "Acessível a todos os contextos",
      "Modelos de preços acessíveis",
      "Comunidade global de aprendizagem",
      "Skills relevantes à indústria",
    ],
    color: "from-blue-600 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
  },
  {
    type: "visão",
    icone: Eye,
    titulo: "Nossa Visão",
    subtitulo: "Formando Líderes do Futuro",
    descricao:
      "Criar um mundo onde qualquer pessoa possa aprender, crescer e alcançar seu potencial máximo por meio de experiências educacionais transformadoras.",
    dotLottie: "https://lottie.host/591f8a0f-faba-495a-9a38-ff1bf44b5fad/W30zLs2vep.lottie",
    features: [
      "Jornadas de Aprendizagem Longas",
      "Habilidades para o Futuro",
      "Impacto Global",
      "Inovação na educação",
    ],
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
  },
  {
    type: "valores",
    icone: Heart,
    titulo: "Nossos Valores",
    subtitulo: "Princípios que nos guiam",
    descricao:
      "Nossos valores centrais moldam cada decisão que tomamos e definem nosso compromisso com estudantes, instrutores e a comunidade global.",
    dotLottie: "https://lottie.host/4cf976d2-0a1a-4017-b021-c3fe2b0a4c18/ksM0OM58Dd.lottie",
    features: [
      "Sucesso do Aluno em 1° lugar",
      "Exelencia em Ensino",
      "Inovação & criatividade",
      "Comunidade & colaboração",
    ],
    color: "from-green-600 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
  },
];

export const teamMembers = [
  {
    nome: "Sarah Johnson",
    role: "Founder & CEO",
    imagem:A1,
    bio: "15+ anos em tecnologia educacional",
    social: ["twitter", "linkedin", "github"],
  },
  {
    nome: "Michael Chen",
    role: "Chefe de Aprendizagem Oficial",
    imagem:A2,
    bio: "Anteriomenter professor de Universidade  e Experte em currículo",
    social: ["twitter", "linkedin"],
  },
  {
    nome: "Emily Rodriguez",
    role: "Diretora Produtora",
    imagem:A3,
    bio: "Especializada em experiência do usuário e design de aprendizagem",
    social: ["twitter", "linkedin", "dribbble"],
  },
  {
    nome: "David Kim",
    role: "Tech Lead",
    imagem:A4,
    bio: "Desenvolvedor Full-stack e Arquiteta de Sistemas",
    social: ["twitter", "linkedin", "github"],
  },
];

export const values = [
  {
    titulo: "Educação de Qualidade",
    descricao:
      "Nos acreditamos em providenciar conteúdo de alta qualidade que transforma vidas por meio de currículo curado por especialistas.",
    features: ["Instrutores Experts", "Atualização de Conteúdo", "Padrões da Indústria"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    titulo: "Estudantes em 1° Lugar",
    descricao:
      "Cada decisão que tomamos é centrada no sucesso e crescimento dos nossos estudantes.",
    features: ["Aprendizagem Personalizada", "Suporte Profissional", "Construção de Comunidade"],
    color: "from-purple-500 to-pink-500",
  },
  {
    titulo: "Criação Contínua",
    descricao:
      "Nós evoluímos constantemente nossa plataforma para incorporar as mais recentes tecnologias e metodologias de aprendizagem.",
    features: ["Aprendizagem com IA", "Laboratórios Interativos", "Mobile First"],
    color: "from-green-500 to-emerald-500",
  },
  {
    titulo: "Acesso Vitalício",
    descricao:
      "Aprenda no seu próprio ritmo com acesso vitalício a todos os materiais do curso e atualizações futuras.",
    features: ["Acesso Perpétuo", "Atualizações Gratuitas", "Rastreamento de Habilidades"],
    color: "from-orange-500 to-amber-500",
  },
];

export const milestones = [
  {
    ano: "2018",
    evento: " Fundação do LearnHub ",
    descricao: "Começou com 10 cursos e 500 estudantes",
  },
  {
    ano: "2019",
    evento: "Lançamento do App Mobile ",
    descricao: "Lançamento de aplicativos iOS e Android para aprendizagem",
  },
  {
    ano: "2020",
    evento: " Expansão Global",
    descricao: "Expandio para 50+ paises mundialmente",
  },
  {
    ano: "2021",
    evento: "Integração de IA",
    descricao: "Implementou caminhos de aprendizagem baseados em IA",
  },
  {
    ano: "2022",
    evento: "1M Estudantes",
    descricao: "Alcançou 1 milhão de estudantes ativos",
  },
  {
    ano: "2023",
    evento: "Lançamento Corporativo",
    descricao: "Lançamento de soluções corporativas de treinamento",
  },
];

export const testimonials = [
  {
    nome: "Alex Thompson",
    role: "Software Developer",
    imagem:AT1,
    texto: "LearnHub transformou minha carreira. Os cursos são abrangentes e o suporte é excepcional.",
    rating: 5,
  },
  {
    nome: "Maria Garcia",
    role: "Data Scientist",
    imagem:AT2,
    texto: "A qualidade da instrução e projetos práticos me ajudaram a conseguir meu sonho de emprego.",
    rating: 5,
  },
  {
    nome: "James Wilson",
    role: "UX Designer",
    imagem:AT3,
    texto: "Melhor investimento que fiz no meu desenvolvimento profissional. Altamente recomendado!",
    rating: 5,
  },
];

// default export (optional)
export default {
  counterTargets,
  statsMeta,
  missionVisionValues,
  teamMembers,
  values,
  milestones,
  testimonials,
};
