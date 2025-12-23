// src/components/HomeCourses/dummydata.js
import HC1 from "../assets/HC1.png";
import HC2 from "../assets/HC2.png";
import HC3 from "../assets/HC3.png";
import HC4 from "../assets/HC4.png";
import HC5 from "../assets/HC5.png";
import HC6 from "../assets/HC6.png";
import HC7 from "../assets/HC7.png";
import HC8 from "../assets/HC8.png";

const cursos = [
  {
    id: 9,
    nome: "Masterclass de React",
    professor: "Sophia Miller",
    imagem: HC1,
    avaliacao: 4.8,
    categoria: "Desenvolvimento",
    preco: { original: 200, promocional: 99 },
    gratuito: false,
    descricao:
      "Domine React desde os fundamentos até padrões avançados. Aprenda hooks, gerenciamento de estado, otimização de desempenho e arquitetura de projetos reais. Crie aplicações escaláveis usando as melhores práticas do ecossistema moderno do React.",
    aulas: [
      {
        id: "1-1",
        titulo: "Introdução e Configuração",
        duracaoMinutos: 12,
        capitulos: [
          {
            id: "1-1-1",
            nome: "Introdução ao curso",
            topico: "O que vamos construir",
            duracaoMinutos: 4,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          },
          {
            id: "1-1-2",
            nome: "Ambiente de desenvolvimento",
            topico: "Node, npm e editor",
            duracaoMinutos: 8,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          }
        ]
      },
      {
        id: "1-2",
        titulo: "JSX e Componentes",
        duracaoMinutos: 30,
        capitulos: [
          {
            id: "1-2-1",
            nome: "Fundamentos do JSX",
            topico: "Sintaxe e expressões",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/JGwfuuyJX5E"
          },
          {
            id: "1-2-2",
            nome: "Componentes funcionais",
            topico: "Props e composição",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/_EiO98jSAb8"
          },
          {
            id: "1-2-3",
            nome: "Estilização de componentes",
            topico: "CSS Modules e Tailwind",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/Fm_wxwEChCk"
          }
        ]
      }
    ]
  },

  {
    id: 10,
    nome: "Desenvolvimento Web Completo",
    professor: "John Smith",
    imagem: HC2,
    avaliacao: 4.8,
    categoria: "Desenvolvimento",
    preco: null,
    gratuito: true,
    descricao:
      "Curso completo de desenvolvimento web cobrindo HTML, CSS, JavaScript e práticas modernas de deploy. Ideal para iniciantes.",
    aulas: [
      {
        id: "2-1",
        titulo: "HTML e Semântica",
        duracaoMinutos: 25,
        capitulos: [
          {
            id: "2-1-1",
            nome: "HTML Básico",
            topico: "Tags e estrutura",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          },
          {
            id: "2-1-2",
            nome: "Formulários e Acessibilidade",
            topico: "Formulários e ARIA",
            duracaoMinutos: 15,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          }
        ]
      }
    ]
  },

  {
    id: 11,
    nome: "JavaScript Avançado",
    professor: "Sarah Johnson",
    imagem: HC3,
    avaliacao: 4.9,
    categoria: "Desenvolvimento",
    preco: { original: 149, promocional: 79 },
    gratuito: false,
    descricao:
      "Aprofunde-se nos recursos modernos do JavaScript, padrões, programação assíncrona e boas práticas para código limpo e eficiente.",
    aulas: [
      {
        id: "3-1",
        titulo: "JavaScript Moderno",
        duracaoMinutos: 35,
        capitulos: [
          {
            id: "3-1-1",
            nome: "ES6+",
            topico: "let, const e arrow functions",
            duracaoMinutos: 12,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          },
          {
            id: "3-1-2",
            nome: "JavaScript Assíncrono",
            topico: "Promises e async/await",
            duracaoMinutos: 23,
            urlVideo: "https://youtu.be/JGwfuuyJX5E"
          }
        ]
      }
    ]
  },

  {
    id: 12,
    nome: "Design UI/UX",
    professor: "Mike Chen",
    imagem: HC4,
    avaliacao: 4.7,
    categoria: "Design",
    preco: null,
    gratuito: true,
    descricao:
      "Curso completo de UI/UX abordando princípios de design, pesquisa com usuários, wireframes, protótipos e sistemas de design.",
    aulas: [
      {
        id: "4-1",
        titulo: "Fundamentos do Design",
        duracaoMinutos: 30,
        capitulos: [
          {
            id: "4-1-1",
            nome: "Princípios de Design",
            topico: "Contraste e hierarquia",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          }
        ]
      },
  {
    id: 13,
    nome: "Ciência de Dados",
    professor: "Dra. Emily Wilson",
    imagem: HC5,
    avaliacao: 4.6,
    categoria: "Ciência de Dados",
    preco: { original: 229, promocional: 129 },
    gratuito: false,
    descricao:
      "Introdução à ciência de dados com Python. Aprenda manipulação de dados com pandas, análise estatística, visualização de dados e conceitos básicos de machine learning.",
    aulas: [
      {
        id: "5-1",
        titulo: "Python para Dados",
        duracaoMinutos: 40,
        capitulos: [
          {
            id: "5-1-1",
            nome: "Numpy e Pandas",
            topico: "Manipulação de dados",
            duracaoMinutos: 20,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          },
          {
            id: "5-1-2",
            nome: "Visualização de Dados",
            topico: "Matplotlib e Seaborn",
            duracaoMinutos: 20,
            urlVideo: "https://youtu.be/JGwfuuyJX5E"
          }
        ]
      },
      {
        id: "5-2",
        titulo: "Estatística",
        duracaoMinutos: 30,
        capitulos: [
          {
            id: "5-2-1",
            nome: "Estatística Descritiva",
            topico: "Média, mediana e variância",
            duracaoMinutos: 15,
            urlVideo: "https://youtu.be/_EiO98jSAb8"
          },
          {
            id: "5-2-2",
            nome: "Estatística Inferencial",
            topico: "Testes de hipótese",
            duracaoMinutos: 15,
            urlVideo: "https://youtu.be/Fm_wxwEChCk"
          }
        ]
      }
    ]
  },

  {
    id: 14,
    nome: "Desenvolvimento de Aplicativos Mobile",
    professor: "Alex Rodriguez",
    imagem: HC6,
    avaliacao: 4.8,
    categoria: "Desenvolvimento",
    preco: { original: 169, promocional: 99 },
    gratuito: false,
    descricao:
      "Crie aplicativos mobile multiplataforma com React Native. Aprenda padrões de interface, navegação, gerenciamento de estado e publicação em lojas.",
    aulas: [
      {
        id: "6-1",
        titulo: "Introdução ao Mobile",
        duracaoMinutos: 20,
        capitulos: [
          {
            id: "6-1-1",
            nome: "Escolha de Plataformas",
            topico: "Nativo vs híbrido",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          },
          {
            id: "6-1-2",
            nome: "Configuração e Ferramentas",
            topico: "Emuladores e IDEs",
            duracaoMinutos: 10,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          }
        ]
      }
    ]
  },

  {
    id: 15,
    nome: "Fundamentos de Machine Learning",
    professor: "Dr. James Brown",
    imagem: HC7,
    avaliacao: 4.9,
    categoria: "IA / Machine Learning",
    preco: null,
    gratuito: true,
    descricao:
      "Curso completo de machine learning cobrindo aprendizado supervisionado e não supervisionado, avaliação de modelos e aplicações reais.",
    aulas: [
      {
        id: "7-1",
        titulo: "Conceitos Básicos de ML",
        duracaoMinutos: 45,
        capitulos: [
          {
            id: "7-1-1",
            nome: "Aprendizado Supervisionado",
            topico: "Regressão e classificação",
            duracaoMinutos: 20,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          },
          {
            id: "7-1-2",
            nome: "Aprendizado Não Supervisionado",
            topico: "Clusterização e PCA",
            duracaoMinutos: 25,
            urlVideo: "https://youtu.be/JGwfuuyJX5E"
          }
        ]
      }
    ]
  },

  {
    id: 16,
    nome: "Marketing Digital",
    professor: "Lisa Wang",
    imagem: HC8,
    avaliacao: 4.5,
    categoria: "Marketing",
    preco: { original: 139, promocional: 69 },
    gratuito: false,
    descricao:
      "Domine estratégias de marketing digital como SEO, marketing de conteúdo, redes sociais e anúncios pagos.",
    aulas: [
      {
        id: "8-1",
        titulo: "Fundamentos de Marketing",
        duracaoMinutos: 28,
        capitulos: [
          {
            id: "8-1-1",
            nome: "Pesquisa de Mercado",
            topico: "Público-alvo e produto",
            duracaoMinutos: 14,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          },
          {
            id: "8-1-2",
            nome: "Fundamentos de Marca",
            topico: "Identidade e voz",
            duracaoMinutos: 14,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          }
        ]
      }
    ]
  },

  {
    id: 17,
    nome: "Design Gráfico Profissional",
    professor: "Robert Taylor",
    imagem: HC1,
    avaliacao: 4.7,
    categoria: "Design",
    preco: { original: 159, promocional: 89 },
    gratuito: false,
    descricao:
      "Curso completo de design gráfico cobrindo Photoshop, Illustrator, tipografia e composição visual.",
    aulas: [
      {
        id: "9-1",
        titulo: "Ferramentas de Design",
        duracaoMinutos: 35,
        capitulos: [
          {
            id: "9-1-1",
            nome: "Photoshop Básico",
            topico: "Ferramentas e máscaras",
            duracaoMinutos: 18,
            urlVideo: "https://youtu.be/Fm_wxwEChCk"
          },
          {
            id: "9-1-2",
            nome: "Illustrator Básico",
            topico: "Vetores e caneta",
            duracaoMinutos: 17,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          }
        ]
      }
    ]
  },

  {
    id: 18,
    nome: "Programação em Python",
    professor: "Maria Garcia",
    imagem: HC2,
    avaliacao: 4.8,
    categoria: "Desenvolvimento",
    preco: null,
    gratuito: true,
    descricao:
      "Aprenda Python do zero. Domine sintaxe, estruturas de dados, funções, arquivos e orientação a objetos.",
    aulas: [
      {
        id: "10-1",
        titulo: "Fundamentos do Python",
        duracaoMinutos: 40,
        capitulos: [
          {
            id: "10-1-1",
            nome: "Sintaxe e Tipos",
            topico: "Tipos de dados e controle de fluxo",
            duracaoMinutos: 20,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          },
          {
            id: "10-1-2",
            nome: "Funções e Módulos",
            topico: "Reutilização de código",
            duracaoMinutos: 20,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          }
        ]
      }
    ]
  },

  {
    id: 19,
    nome: "Computação em Nuvem",
    professor: "David Kim",
    imagem: HC3,
    avaliacao: 4.6,
    categoria: "Cloud",
    preco: { original: 189, promocional: 109 },
    gratuito: false,
    descricao:
      "Aprenda fundamentos de computação em nuvem com AWS, Azure e Google Cloud, incluindo containers e segurança.",
    aulas: [
      {
        id: "11-1",
        titulo: "Fundamentos da Nuvem",
        duracaoMinutos: 35,
        capitulos: [
          {
            id: "11-1-1",
            nome: "Conceitos Principais",
            topico: "IaaS, PaaS e SaaS",
            duracaoMinutos: 15,
            urlVideo: "https://youtu.be/sDoiClRyV_c"
          }
        ]
      }
    ]
  },

  {
    id: 20,
    nome: "Fundamentos de Cibersegurança",
    professor: "Amanda Lee",
    imagem: HC4,
    avaliacao: 4.9,
    categoria: "Segurança",
    preco: { original: 199, promocional: 119 },
    gratuito: false,
    descricao:
      "Curso completo de cibersegurança cobrindo ameaças, segurança de redes, código seguro e resposta a incidentes.",
    aulas: [
      {
        id: "12-1",
        titulo: "Fundamentos de Segurança",
        duracaoMinutos: 30,
        capitulos: [
          {
            id: "12-1-1",
            nome: "Tipos de Ameaças",
            topico: "Malware e phishing",
            duracaoMinutos: 15,
            urlVideo: "https://youtu.be/4eGJp3LBLIA"
          }
        ]
      }
    ]
  }
]
  }
]

export const buscarCursoPorId = (id) =>
  cursos.find((curso) => curso.id === id);

export default cursos;