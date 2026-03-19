const catalogo = {
  "pc gamer": {
    principal: "PC gamer como oferta principal",
    complemento: "Sugira headset, mousepad, teclado mecânico ou monitor como upsell inteligente.",
    ancora: "Apresente um setup base e uma versão mais completa para comparar valor percebido."
  },
  "notebook gamer": {
    principal: "Notebook gamer como oferta principal",
    complemento: "Sugira mochila, mouse gamer, base refrigerada ou upgrade de memória.",
    ancora: "Mostre a diferença entre mobilidade e desempenho para justificar a faixa de valor."
  },
  "notebook": {
    principal: "Notebook como oferta principal",
    complemento: "Sugira mouse sem fio, mochila, suporte e garantia estendida.",
    ancora: "Compare um modelo de entrada com um intermediário para ancorar custo-benefício."
  },
  "teclado": {
    principal: "Teclado como oferta principal",
    complemento: "Sugira mouse, mousepad ou apoio ergonômico.",
    ancora: "Mostre uma opção prática e uma premium para aumentar percepção de valor."
  },
  "mouse": {
    principal: "Mouse como oferta principal",
    complemento: "Sugira mousepad, teclado ou kit de periféricos.",
    ancora: "Compare uma opção básica com outra de maior precisão e conforto."
  }
};

const perguntasBase = {
  baixo: [
    "Qual faixa de orçamento você quer manter?",
    "Seu foco é custo-benefício ou alguma função específica?"
  ],
  medio: [
    "Você quer equilibrar desempenho e preço ou priorizar algum diferencial?",
    "Vai usar mais para trabalho, estudo ou lazer?"
  ],
  alto: [
    "Você quer priorizar desempenho máximo, acabamento ou experiência completa?",
    "Busca o produto principal apenas ou já pensa num setup mais completo?"
  ]
};

function regrasAplicadas(interesse, orcamento) {
  const regras = [
    "Priorizar lógica de ajuda real antes de tentar empurrar produtos.",
    "Fazer poucas perguntas objetivas para qualificar a necessidade.",
    "Não forçar high ticket se o cliente demonstrar busca por algo simples.",
    "Usar cross-sell com inteligência, apenas quando fizer sentido no contexto."
  ];

  if (interesse === "pc gamer" || interesse === "notebook gamer") {
    regras.push("Para high ticket, tratar o item principal como oferta central.");
  }

  if (orcamento === "baixo") {
    regras.push("Em low ticket, sugerir complemento apenas com benefício prático claro.");
  }

  return regras;
}

function diagnosticoTexto(interesse, orcamento, perfil, uso) {
  const nivel = orcamento === "alto" ? "alto potencial de ticket" :
                orcamento === "medio" ? "potencial intermediário" :
                "potencial de entrada";

  return `Cliente com interesse em ${interesse}, perfil ${perfil} e foco em ${uso}. O atendimento indica ${nivel}, então a abordagem deve equilibrar clareza, contexto e recomendação coerente.`;
}

function primeiraAcao(interesse) {
  return `Abra a conversa confirmando o contexto do cliente e feche com uma pergunta objetiva: "Qual faixa de orçamento você pretende investir e qual será o uso principal para ${interesse}?"`;
}

document.getElementById("gerar").addEventListener("click", () => {
  const loja = document.getElementById("loja").value;
  const interesse = document.getElementById("interesse").value;
  const orcamento = document.getElementById("orcamento").value;
  const uso = document.getElementById("uso").value;
  const perfil = document.getElementById("perfil").value;

  const item = catalogo[interesse];

  document.getElementById("resumo").textContent =
    `Atendimento de ${loja} com cliente interessado em ${interesse}, perfil ${perfil} e objetivo principal de ${uso}.`;

  document.getElementById("diagnostico").textContent =
    diagnosticoTexto(interesse, orcamento, perfil, uso);

  const perguntas = document.getElementById("perguntas");
  perguntas.innerHTML = "";
  perguntasBase[orcamento].forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    perguntas.appendChild(li);
  });

  document.getElementById("ofertaPrincipal").textContent =
    `${item.principal}. Apresente os benefícios mais conectados ao uso em ${uso}.`;

  document.getElementById("crossSell").textContent =
    item.complemento;

  document.getElementById("ancoragem").textContent =
    item.ancora;

  const regras = document.getElementById("regras");
  regras.innerHTML = "";
  regrasAplicadas(interesse, orcamento).forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    regras.appendChild(li);
  });

  document.getElementById("primeiraAcao").textContent =
    primeiraAcao(interesse);
});

document.getElementById("gerar").click();
