// src/dummydata.js
import HC1 from "../assets/HC1.png";
import HC2 from "../assets/HC2.png";
import HC3 from "../assets/HC3.png";
import HC4 from "../assets/HC4.png";
import HC5 from "../assets/HC5.png";
import HC6 from "../assets/HC6.png";
import HC7 from "../assets/HC7.png";
import HC8 from "../assets/HC8.png";

export const coursesData = [
  {
    id: 1,
    nome: "React Masterclass",
    professor: "Sophia Miller",
    imagem: HC1,
    rating: 4.8,
    gratuito: false,
    preco: { original: 200, sale: 99 },
    overview: "Master React de fundamentametal ha padrões Avaçandos. Prenda hooks, state management, performance optimization, e arquitetura de projeto  no mundo real. Construia aplicações escalaveis com ferramentas de ecosistemas de React moderno e melhores practicas usado por companias tech top.",
    palestras: [
      {
        id: "1-1",
        titulo: "Intro & Setup",
        duracaoMin: 12,
        capitulos: [
          { id: "1-1-1", nome: "Curso intro", topico: "O que vamos Fazer", duracaoMin: 4, videoUrl: "https://drive.google.com/file/d/1LsVJM1CquQtmp8fJX91oskMx1TjlplLJ/view?usp=drive_link" },
          { id: "1-1-2", nome: "Environment", topico: "Node, npm, editor setup", duracaoMin: 8, videoUrl: "https://youtu.be/4eGJp3LBLIA?si=9t7IQ-gDqbUR0SAw" }
        ]
      },
      {
        id: "1-2",
        titulo: "JSX & Componentes",
        duracaoMin: 30,
        capitulos: [
          { id: "1-2-1", nome: "JSX basico", topico: "Sintaxe & expresões", duracaoMin: 10, videoUrl: "https://youtu.be/JGwfuuyJX5E?si=UB5xSzIr3G7P5uaA" },
          { id: "1-2-2", nome: "Componentes Funcionais", topico: "Props & composição", duracaoMin: 10, videoUrl: "https://youtu.be/_EiO98jSAb8?si=RApm9kuU8Ud1hY7a" },
          { id: "1-2-3", nome: "Componentes de Estilos", topico: "CSS modules & Tailwind", duracaoMin: 10, videoUrl: "https://youtu.be/Fm_wxwEChCk?si=3lekkBDLHldxjWKV" }
        ]
      },
      {
        id: "1-3",
        titulo: "State & Hooks",
        duracaoMin: 46,
        capitulos: [
          { id: "1-3-1", nome: "useState", topico: "Local state padrões", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "1-3-2", nome: "useEffect", topico: "Efeitos Colaterais & cleanup", duracaoMin: 12, videoUrl: "https://youtu.be/JGwfuuyJX5E?si=UB5xSzIr3G7P5uaA" },
          { id: "1-3-3", nome: "Custom hooks", topico: "logica reusada", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "1-3-4", nome: "Performance hooks", topico: "useMemo & useCallback", duracaoMin: 12, videoUrl: "https://youtu.be/JGwfuuyJX5E?si=UB5xSzIr3G7P5uaA" }
        ]
      },
      {
        id: "1-4",
        titulo: "Routing & Data",
        duracaoMin: 34,
        capitulos: [
          { id: "1-4-1", nome: "React Router", topico: "Routes & params", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "1-4-2", nome: "Fetching data", topico: "fetch, axios & patterns", duracaoMin: 12, videoUrl: "https://youtu.be/JGwfuuyJX5E?si=UB5xSzIr3G7P5uaA" },
          { id: "1-4-3", nome: "State management intro", topico: "Context vs libs", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" }
        ]
      }
    ]
  },

  {
    id: 2,
    nome: "Frontend Crash Course",
    professor: "Ethan Brown",
    imagem: HC2,
    rating: 4.7,
    gratuito: true,
    preco: null,
    overview: "Acelere sua Jornada de desenvolmento frontend Com HTML, CSS, and JavaScript fundamentals. Perfeito para iniciantes começando suas careirras de web development. Aprenda design responsivo , accessibilidade, e tecnicas de CSS moderno para construir websites Bonitos e funcional.",
    palestras: [
      {
        id: "2-1",
        titulo: "HTML & Accessibilidade",
        duracaoMin: 26,
        capitulos: [
          { id: "2-1-1", nome: "HTML semantico ", topico: "Structure & a11y basico", duracaoMin: 12, videoUrl: "https://youtu.be/6BrpMJeZuvQ?si=AHhbSJobh3kntX6Y" },
          { id: "2-1-2", nome: "Forms & Inputs", topico: "Validação & UX", duracaoMin: 14, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" }
        ]
      },
      {
        id: "2-2",
        titulo: "CSS Layouts & Responsivo",
        duracaoMin: 44,
        capitulos: [
          { id: "2-2-1", nome: "Flexbox aprofundamento", topico: "Aliamento & padrões", duracaoMin: 18, videoUrl: "https://youtu.be/6BrpMJeZuvQ?si=AHhbSJobh3kntX6Y" },
          { id: "2-2-2", nome: "CSS Grid", topico: "Complexos layouts", duracaoMin: 18, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "2-2-3", nome: "Design responsivo", topico: "Media queries & mobile-first", duracaoMin: 8, videoUrl: "https://youtu.be/6BrpMJeZuvQ?si=AHhbSJobh3kntX6Y" }
        ]
      },
      {
        id: "2-3",
        titulo: "JavaScript Essecial",
        duracaoMin: 50,
        capitulos: [
          { id: "2-3-1", nome: "DOM & Events", topico: "Manipulation & listeners", duracaoMin: 15, videoUrl: "https://youtu.be/6BrpMJeZuvQ?si=AHhbSJobh3kntX6Y" },
          { id: "2-3-2", nome: "ES6+", topico: "Let/const, arrow functions, modules", duracaoMin: 18, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "2-3-3", nome: "Tooling", topico: "Bundlers & npm scripts", duracaoMin: 17, videoUrl: "https://youtu.be/6BrpMJeZuvQ?si=AHhbSJobh3kntX6Y" }
        ]
      }
    ]
  },

  {
    id: 3,
    nome: "Full Stack JavaScript",
    professor: "Noah Johnson",
    imagem: HC3,
    rating: 4.7,
    gratuito: false,
    preco: { original: 180, sale: 89 },
    overview: "Desevolvimento de master full-stack JavaScript com Node.js, Express, MongoDB, e React. Crie web applications completas de database design para implementacao frontend. Aprenda autenticação, Desenvomento de API, estrategias de desenvomento, e workflows de desenvolmento moderno.",
    palestras: [
      {
        id: "3-1",
        titulo: "Node & NPM",
        duracaoMin: 36,
        capitulos: [
          { id: "3-1-1", nome: "Node intro", topico: "Runtime & modules", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4" },
          { id: "3-1-2", nome: "NPM & scripts", topico: "Packages, semver", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "3-1-3", nome: "APIs com Express", topico: "Routes & middleware", duracaoMin: 14, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      },
      {
        id: "3-2",
        titulo: "Databases",
        duracaoMin: 40,
        capitulos: [
          { id: "3-2-1", nome: "Relational vs NoSQL", topico: "Quando usar O que", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "3-2-2", nome: "MongoDB quickstart", topico: "Collections & queries", duracaoMin: 15, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: "3-2-3", nome: "ORM/ODM", topico: "Mongoose & query patterns", duracaoMin: 15, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      },
      {
        id: "3-3",
        titulo: "Integracao Fullstack ",
        duracaoMin: 52,
        capitulos: [
          { id: "3-3-1", nome: "Auth basico", topico: "JWT & sessions", duracaoMin: 18, videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: "3-3-2", nome: "Frontend-backend flow", topico: "Design API  & CORS", duracaoMin: 16, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: "3-3-3", nome: "Deploying fullstack", topico: "Hosting & env", duracaoMin: 18, videoUrl: "https://youtu.be/qU32Okw8nPs?si=PrHXTXnz_7wTVWLc" }
        ]
      }
    ]
  },

  {
    id: 4,
    nome: "UX/UI Design Pro",
    professor: "Olivia Lee",
    imagem: HC4,
    rating: 4.9,
    gratuito: false,
    preco: { original: 250, sale: 125 },
    overview: "Transforme-se em um  designer UX/UI profissional. Domine design thinking, user research, wireframing, prototyping, e design systems. Aprenda ferramentas nivel industry-standard como Figma e Adobe XD enquanto construindo um design de projeto portfolio do zero.",
    palestras: [
      {
        id: "4-1",
        titulo: "Design Principios",
        duracaoMin: 34,
        capitulos: [
          { id: "4-1-1", nome: "Principios de design", topico: "Contrast, hierarchy", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: "4-1-2", nome: "Color & typography", topico: "Escolher cores & fontes", duracaoMin: 10, videoUrl: "https://youtu.be/QKxTMgdsaZU?si=wVoTpraaIOCLr-B9" },
          { id: "4-1-3", nome: "Spacing & layout", topico: "Grids & rhythm", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      },
      {
        id: "4-2",
        titulo: "Wireframing & Prototipação",
        duracaoMin: 42,
        capitulos: [
          { id: "4-2-1", nome: "Low-fidelity wireframes", topico: "Structure & flow", duracaoMin: 14, videoUrl: "https://youtu.be/QKxTMgdsaZU?si=wVoTpraaIOCLr-B9" },
          { id: "4-2-2", nome: "High-fidelity mockups", topico: "Visual design & polimento", duracaoMin: 16, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: "4-2-3", nome: "Prototipos interativos ", topico: "User testing & feedback", duracaoMin: 12, videoUrl: "https://youtu.be/QKxTMgdsaZU?si=wVoTpraaIOCLr-B9" }
        ]
      },
      {
        id: "4-3",
        titulo: "User Research",
        duracaoMin: 30,
        capitulos: [
          { id: "4-3-1", nome: "Entrevistas", topico: "Questione designs & moderação", duracaoMin: 12, videoUrl: "https://youtu.be/QKxTMgdsaZU?si=wVoTpraaIOCLr-B9" },
          { id: "4-3-2", nome: "Testando usabilidade", topico: "tarefas & analises", duracaoMin: 18, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      }
    ]
  },

  {
    id: 5,
    nome: "Next.js Avançado",
    professor: "Liam Smith",
    imagem: HC5,
    rating: 4.6,
    gratuito: true,
    preco: null,
    overview: "Domine o framework de Next.js com renderização server-side , geração de sites estaticos e rotas API . Crie aplicações React production-ready com performance optimizada, beneficios SEO e  deployment perfeito no Vercel e outas platformas.",
    palestras: [
      {
        id: "5-1",
        titulo: "Next.js Básico",
        duracaoMin: 28,
        capitulos: [
          { id: "5-1-1", nome: "Paginas & routing", topico: "File-based routing", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0" },
          { id: "5-1-2", nome: "Data fetching", topico: "getStaticProps & getServerSideProps", duracaoMin: 18, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      },
      {
        id: "5-2",
        titulo: " Rotas API & Middleware",
        duracaoMin: 36,
        capitulos: [
          { id: "5-2-1", nome: "Rotas API", topico: "Serverless endpoints", duracaoMin: 16, videoUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0" },
          { id: "5-2-2", nome: "Middleware", topico: "Edge & routing control", duracaoMin: 20, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
        ]
      },
      {
        id: "5-3",
        titulo: "Performace & Optimização",
        durationMin: 32,
        capitulos: [
          { id: "5-3-1", nome: "Optimização de Imagens ", topico: "Next Image componente", duracaoMin: 12, videoUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0" },
          { id: "5-3-2", nome: "Analises de Bundle ", topico: "Reduzindo tamanho do bundle", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: "5-3-3", nome: "Estrategias de Deployment", topico: "Vercel & outras platformas", duracaoMin: 10, videoUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0" }
        ]
      }
    ]
  },

  {
    id: 6,
    nome: "Python para Data Science",
    professor: "Isabella Brown",
    imagem: HC6,
    rating: 4.5,
    gratuito: true,
    preco: null,
    overview: "Começe sua jornada de ciencia data com Python. Aprenda manipulação de data com pandas, visualização com Matplotlib e Seaborn, e analise de estatisca basico. Perfeito para iniciantes interesados em analise de data , inteligencia de negocios, e tomada de decisão baseada em dados.",
    palestras: [
      {
        id: "6-1",
        titulo: "Python Fundamentos",
        duracaoMin: 42,
        capitulos: [
          { id: "6-1-1", nome: "Python sintaxe", topico: "Variables, control flow", duracaoMin: 16, videoUrl: "https://youtu.be/O6dlFgal1Lg?si=Xf9YHtUwwthSP444" },
          { id: "6-1-2", nome: "Data structures", topico: "Lists, dicts, sets", duracaoMin: 14, videoUrl: "https://youtu.be/dB9iEqsLLcM?si=WbThPTaG9Zss2nSi" },
          { id: "6-1-3", nome: "Functions & modules", topico: "Codigo reusavel", duracaoMin: 12, videoUrl: "https://youtu.be/vvCcEGNXsAc?si=xpNfQp0tB7NWFeaj" }
        ]
      },
      {
        id: "6-2",
        titulo: "Pandas & Data Wrangling",
        duracaoMin: 46,
        capitulos: [
          { id: "6-2-1", nome: "Intro to pandas", topico: "Series & DataFrames", duracaoMin: 16, videoUrl: "https://youtu.be/dB9iEqsLLcM?si=WbThPTaG9Zss2nSi" },
          { id: "6-2-2", nome: "Clean data", topico: "Values & transforms faltando", duracaoMin: 15, videoUrl: "https://youtu.be/1t6bc3QbTx4?si=oMBiU-E0ldO-HsWN" },
          { id: "6-2-3", nome: "Agrecação de data", topico: "GroupBy & pivot tables", duracaoMin: 15, videoUrl: "https://youtu.be/dB9iEqsLLcM?si=WbThPTaG9Zss2nSi" }
        ]
      },
      {
        id: "6-3",
        titulo: "Visualização de Data",
        duracaoMin: 38,
        capitulos: [
          { id: "6-3-1", nome: "Matplotlib basico", topico: "Plots & customização", duracaoMin: 14, videoUrl: "https://youtu.be/1t6bc3QbTx4?si=oMBiU-E0ldO-HsWN" },
          { id: "6-3-2", nome: "Seaborn for stats", topico: "Statistical plotting", duracaoMin: 12, videoUrl: "https://youtu.be/vvCcEGNXsAc?si=xpNfQp0tB7NWFeaj" },
          { id: "6-3-3", nome: "Plotly interativo", topico: "Visualizações web-based ", duracaoMin: 12, videoUrl: "https://youtu.be/O6dlFgal1Lg?si=Xf9YHtUwwthSP444" }
        ]
      }
    ]
  },

  {
    id: 7,
    nome: "Python para Data Science (Avançado)",
    professor: "Isabella Brown",
    imagem: HC7,
    rating: 4.5,
    gratuito: false,
    price: { original: 190, sale: 95 },
    overview: "Tecnicas avançadas para data science incluindo machine learning, engenharia de recursos e model deployment. Aprofunde-se no scikit-learn, construa pipelines prontos para produção e aprenda os fundamentos de MLOps para aplicações reais de ciência de dados.",
    palestras: [
      {
        id: "7-1",
        titulo: "Panda avançado",
        duracaoMin: 38,
        capitulos: [
          { id: "7-1-1", nome: "Performance dicas", topico: "Vectorização & memoria", duracaoMin: 12, videoUrl: "https://youtu.be/YCrSjxIfDcI?si=ej1DX6xjxWqhVBu_" },
          { id: "7-1-2", nome: "Time series", topico: "Resampling & windows", duracaoMin: 14, videoUrl: "https://youtu.be/ZuHMuvIo7P4?si=gyMY-TPqRgwMdNRt" },
          { id: "7-1-3", nome: "Indexing avançado", topico: "MultiIndex & querying", duracaoMin: 12, videoUrl: "https://youtu.be/YCrSjxIfDcI?si=ej1DX6xjxWqhVBu_" }
        ]
      },
      {
        id: "7-2",
        titulo: "Engenharia de recursos",
        duracaoMin: 46,
        capitulos: [
          { id: "7-2-1", nome: "Criação de recursos", topico: "Deriving signals", duracaoMin: 18, videoUrl: "https://youtu.be/YCrSjxIfDcI?si=ej1DX6xjxWqhVBu_" },
          { id: "7-2-2", nome: "Escala & codificação", topico: "Normalization & encoders", duracaoMin: 14, videoUrl: "https://youtu.be/ZuHMuvIo7P4?si=gyMY-TPqRgwMdNRt" },
          { id: "7-2-3", nome: "Seleção de recursos", topico: "Statistical methods", duracaoMin: 14, videoUrl: "https://youtu.be/YCrSjxIfDcI?si=ej1DX6xjxWqhVBu_" }
        ]
      },
      {
        id: "7-3",
        titulo: "Machine Learning Pipeline",
        duracaoMin: 52,
        capitulos: [
          { id: "7-3-1", nome: "Model training", topico: "Cross-validation & metricas", duracaoMin: 18, videoUrl: "https://youtu.be/ZuHMuvIo7P4?si=gyMY-TPqRgwMdNRt" },
          { id: "7-3-2", nome: "Hyperparameter tuning", topico: "Grid search & Bayesian", duracaoMin: 16, videoUrl: "https://youtu.be/YCrSjxIfDcI?si=ej1DX6xjxWqhVBu_" },
          { id: "7-3-3", nome: "Model deployment", topico: "APIs & monitoramento", duracaoMin: 18, videoUrl: "https://youtu.be/ZuHMuvIo7P4?si=gyMY-TPqRgwMdNRt" }
        ]
      }
    ]
  },

  {
    id: 8,
    nome: " JavaScript (Alternativo)",
    professor: "Noah Johnson",
    imagem: HC8,
    rating: 4.7,
    gratuito: false,
    preco: { original: 180, sale: 89 },
    overview: "Currículo alternativo de full stack com foco em TypeScript, estratégias modernas de testes e padrões avançados de React. Aprenda arquitetura de aplicações em nível corporativo, microsserviços e implantação em nuvem com AWS ou Google Cloud Platform.",
    palestras: [
      {
        id: "8-1",
        titulo: "Frontend Moderno",
        duracaoMin: 48,
        capitulos: [
          { id: "8-1-1", nome: "Padroes de React", topico: "Composição & hooks", duracaoMin: 18, videoUrl: "https://youtu.be/48iVEbvT7u4?si=StHwMSCby-BrefhI" },
          { id: "8-1-2", nome: "State libs", topico: "Redux & Zustand", duracaoMin: 16, videoUrl: "https://youtu.be/2LrbDDTgTU0?si=iZIpUpgOw14Mb0bt" },
          { id: "8-1-3", nome: "Teste", topico: "Unit & integração", duracaoMin: 14, videoUrl: "https://youtu.be/I6YcroaALcw?si=8-MdVIxyDCJPI2gg" }
        ]
      },
      {
        id: "8-2",
        titulo: "Arquitetura de Backend",
        duracaoMin: 44,
        capitulos: [
          { id: "8-2-1", nome: "Microserviços", topico: "Design & comunição", duracaoMin: 16, videoUrl: "https://youtu.be/48iVEbvT7u4?si=StHwMSCby-BrefhI" },
          { id: "8-2-2", nome: "Design de database ", topico: "Escalibidade & performace", duracaoMin: 14, videoUrl: "https://youtu.be/2LrbDDTgTU0?si=iZIpUpgOw14Mb0bt" },
          { id: "8-2-3", nome: "Estrategias de cache", topico: "Redis & CDN", duracaoMin: 14, videoUrl: "https://youtu.be/I6YcroaALcw?si=8-MdVIxyDCJPI2gg" }
        ]
      },
      {
        id: "8-3",
        titulo: "Cloud & DevOps",
        duracaoMin: 38,
        capitulos: [
          { id: "8-3-1", nome: "Containerização", topico: "Docker & Kubernetes", duracaoMin: 14, videoUrl: "https://youtu.be/48iVEbvT7u4?si=StHwMSCby-BrefhI" },
          { id: "8-3-2", nome: "CI/CD pipelines", topico: "Testes automatizados & deployment", duracaoMin: 12, videoUrl: "https://youtu.be/2LrbDDTgTU0?si=iZIpUpgOw14Mb0bt" },
          { id: "8-3-3", nome: "Monitoramento & logging", topico: "Observabilidade da produção", duracaoMin: 12, videoUrl: "https://youtu.be/I6YcroaALcw?si=8-MdVIxyDCJPI2gg" }
        ]
      }
    ]
  }
];

export default coursesData;