export const QUESTIONS = [
  {
    id: 'gestao_processos',
    dim: 'Gestão de processos',
    q: 'Quando um colaborador experiente sai da empresa, as atividades que ele fazia ficam paradas ou atrasadas impactando outros departamentos e clientes.',
    inv: true,
  },
  {
    id: 'indicadores',
    dim: 'Indicadores e performance',
    q: 'Quando os resultados ficam abaixo do esperado, sabemos exatamente o que causou o desvio.',
    inv: false,
  },
  {
    id: 'gestao_rotina',
    dim: 'Gestão da rotina',
    q: 'O dia a dia da operação é previsível — raramente somos surpreendidos por problemas que não conseguimos antecipar.',
    inv: false,
  },
  {
    id: 'melhoria_continua',
    dim: 'Melhoria contínua',
    q: 'Os mesmos problemas operacionais tendem a se repetir mês após mês, mesmo depois de tentarmos resolver.',
    inv: true,
  },
  {
    id: 'estrategia',
    dim: 'Estratégia e direcionamento',
    q: 'As equipes sabem claramente o que precisa ser priorizado — não há dúvida sobre onde concentrar esforços.',
    inv: false,
  },
  {
    id: 'estrutura',
    dim: 'Estrutura e responsabilidades',
    q: 'Há clareza sobre quem é dono de cada processo crítico e quem responde pelos resultados.',
    inv: false,
  },
  {
    id: 'cultura',
    dim: 'Cultura de melhoria',
    q: 'Quando tentamos mudar a forma de trabalhar, a mudança não se sustenta — as pessoas voltam ao jeito antigo.',
    inv: true,
  },
  {
    id: 'projetos',
    dim: 'Gestão de projetos',
    q: 'Os projetos de melhoria que iniciamos entregam resultado dentro do prazo e do escopo esperado.',
    inv: false,
  },
  {
    id: 'informacao',
    dim: 'Informação e visibilidade',
    q: 'Temos acesso fácil às informações certas para tomar decisões operacionais sem perder tempo buscando dados.',
    inv: false,
  },
  {
    id: 'execucao',
    dim: 'Capacidade de execução',
    q: 'Quando a liderança decide implementar uma mudança, ela de fato acontece — sem travar na operação.',
    inv: false,
  },
]

export const LABELS = [
  'Discordo totalmente',
  'Discordo',
  'Neutro',
  'Concordo parcialmente',
  'Concordo totalmente',
]

export const DIMS_DATA = {
  gestao_processos: {
    label: 'Gestão de processos',
    pain: 'Quando o processo vive na cabeça das pessoas e não no papel, a operação fica refém de quem sabe fazer. Qualquer saída de colaborador vira uma crise — e cada nova contratação reinicia o aprendizado do zero.\n\nO caminho passa por mapear os processos críticos, documentar as etapas, definir os responsáveis e criar padrões que qualquer pessoa consiga seguir.\n\nParece simples — mas sem um método estruturado, a maioria das empresas cria documentações desconexas com o que realmente é praticado, gerando perda de tempo, burocracia e perda de confiabilidade no sistema de gestão.',
    hook: 'Quer ver como estruturar isso de forma que realmente funcione na sua operação?',
    opp: 'Mapeamento e padronização de processos críticos com transferência de conhecimento estruturada.',
  },
  indicadores: {
    label: 'Indicadores e performance',
    pain: 'Quando um resultado cai e ninguém sabe exatamente o que causou o desvio, a gestão vira tentativa e erro. Cada mês é uma surpresa — e as causas reais continuam intactas, gerando os mesmos problemas.\n\nO caminho é definir os indicadores certos para cada processo crítico, estabelecer metas claras e criar uma rotina de análise que conecte o número à causa.\n\nO problema não é falta de dados — é excesso de dados sem estrutura de interpretação. Sem isso, o indicador vira decoração de dashboard.',
    hook: 'Quer entender quais indicadores realmente importam para a sua operação?',
    opp: 'Estruturação de indicadores de causa raiz e painéis de acompanhamento operacional.',
  },
  gestao_rotina: {
    label: 'Gestão da rotina',
    pain: 'Quando a operação é imprevisível, o time vive no modo apagar incêndio. Problemas que poderiam ter sido antecipados chegam como urgências — consumindo energia que deveria estar em crescimento e melhoria.\n\nO caminho é implantar uma gestão visual da rotina: indicadores no quadro, reuniões curtas de acompanhamento e um método claro para tratar desvios antes que virem crise.\n\nMuitas empresas têm reuniões de rotina que não resolvem nada. O que faz a diferença é a estrutura certa — pauta, frequência, responsáveis e um método de escalonamento.',
    hook: 'Quer ver como uma rotina bem estruturada transforma a previsibilidade da sua operação?',
    opp: 'Implantação de gestão visual e rituais de rotina que antecipam problemas antes que virem crise.',
  },
  melhoria_continua: {
    label: 'Melhoria contínua',
    pain: 'Quando os mesmos problemas voltam mês após mês, as soluções aplicadas estão tratando sintomas, não causas. O time se frustra, o gestor se desgasta — e a operação continua sangrando no mesmo ponto.\n\nO caminho é adotar uma metodologia estruturada de análise de causa raiz — como A3 ou 5 Porquês — e criar um ciclo formal de melhoria com dono, prazo e medição de resultado.\n\nA maioria das empresas tenta resolver problemas com reuniões. Reunião sem método gera ata, não solução. O que resolve é ter um processo estruturado de investigação.',
    hook: 'Quer conhecer o método que usamos para eliminar problemas recorrentes de forma definitiva?',
    opp: 'Metodologia estruturada de análise de causa raiz e ciclos de melhoria com medição de resultado.',
  },
  estrategia: {
    label: 'Estratégia e direcionamento',
    pain: 'Quando as prioridades não são claras, cada área decide sozinha o que é mais importante. O resultado é energia dispersa, iniciativas concorrentes e a sensação de muito movimento com pouco avanço real.\n\nO caminho é desdobrar a estratégia em metas operacionais por área — conectando o que cada time faz no dia a dia com os objetivos que a empresa precisa alcançar.\n\nPlanejamento estratégico sem desdobramento operacional é um documento que fica apenas nas apresentações da alta gestão e não chega, de fato, em quem executa os processos. O que faz funcionar é a conexão entre o estratégico e o dia a dia de cada área.',
    hook: 'Quer ver como traduzir sua estratégia em metas que as equipes realmente persigam?',
    opp: 'Alinhamento estratégico com desdobramento de metas em indicadores operacionais.',
  },
  estrutura: {
    label: 'Estrutura e responsabilidades',
    pain: 'Quando não está claro quem é dono de cada processo, os problemas caem no vão entre as áreas. Ninguém é responsável por tudo — e na prática, ninguém é responsável por nada.\n\nO caminho é mapear os processos críticos, definir donos claros para cada um e estabelecer interfaces formais entre áreas — incluindo o que cada uma entrega para a outra e em que prazo.\n\nOrganograma não resolve isso. O que resolve é a clareza sobre processos, não sobre cargos. Muitas empresas têm o organograma certo e o processo errado.',
    hook: 'Quer entender como estruturar responsabilidades de forma que os problemas não caiam mais no vão entre as áreas?',
    opp: 'Redesenho de estrutura de responsabilidades e interfaces entre áreas.',
  },
  cultura: {
    label: 'Cultura de melhoria',
    pain: 'Quando mudanças não se sustentam, o time aprende rapidamente que não vale a pena se engajar nas próximas. Cada iniciativa que não perdurar aumenta a resistência à seguinte — criando um ciclo difícil de quebrar.\n\nO caminho é implantar mudanças com um método estruturado de gestão da mudança — envolvendo o time na construção, criando padrões claros e monitorando a aderência nas primeiras semanas.\n\nO problema raramente é resistência das pessoas. É a forma como a mudança é implantada — sem estrutura de suporte, sem reforço e sem métricas de aderência.',
    hook: 'Quer conhecer o método que usamos para fazer mudanças que realmente se sustentam?',
    opp: 'Gestão de mudança com envolvimento das equipes e mecanismos de sustentação dos novos padrões.',
  },
  projetos: {
    label: 'Gestão de projetos',
    pain: 'Quando projetos não entregam no prazo ou no escopo, a organização perde confiança na sua própria capacidade de mudar. E o que é pior: isso contamina as próximas iniciativas antes mesmo de começarem.\n\nO caminho é adotar um método estruturado de gestão de projetos — com objetivo muito claro, dono definido, rituais de gestão e acompanhamento frequente.\n\nNão é necessário um método complexo. O que faz diferença é consistência: ter sempre o objetivo muito claro, dono, rituais de gestão e acompanhamento frequente — ou seja, ter um método simples e garantir que seja seguido.',
    hook: 'Quer ver como estruturar projetos que entregam resultado de forma previsível?',
    opp: 'Estruturação de gestão de projetos com governança, marcos e responsáveis claros.',
  },
  informacao: {
    label: 'Informação e visibilidade',
    pain: 'Quando as informações certas não chegam na hora certa, as decisões são tomadas no escuro ou com atraso. O gestor passa tempo demais buscando dados — e ainda assim decide com menos segurança do que deveria.\n\nO caminho é estruturar o fluxo de informação da operação: definir quais dados cada decisor precisa, com que frequência e em qual formato — e garantir que cheguem sem precisar ser buscados.\n\nNão é problema de sistema — é problema de arquitetura de informação. Muitas empresas têm ERP, BI e planilha, e ainda assim o gestor não consegue responder perguntas básicas sobre a operação.',
    hook: 'Quer entender como estruturar a visibilidade que você precisa para tomar decisões com mais velocidade e segurança?',
    opp: 'Estruturação de fluxo de informação e painéis de gestão integrados à operação.',
  },
  execucao: {
    label: 'Capacidade de execução',
    pain: 'Quando boas decisões não viram realidade, a liderança perde credibilidade e o time perde motivação. A operação aprende que anunciar uma mudança não significa que ela vai acontecer de verdade.\n\nO caminho é criar um sistema de execução: transformar decisões em planos de ação com responsável, prazo e acompanhamento — e ter uma cadência formal de revisão de andamento.\n\nO gargalo raramente é falta de vontade. É a ausência de um sistema que acompanhe a execução, remova obstáculos e mantenha o ritmo até a entrega.',
    hook: 'Quer ver como criar uma cultura de execução onde o que é decidido realmente acontece?',
    opp: 'Desenvolvimento de capacidade de implementação com acompanhamento estruturado de iniciativas.',
  },
}

export const PROFILES = [
  {
    key: 'risco',
    min: 0,
    max: 25,
    label: 'Operação em risco',
    color: '#D85A30',
    bg: '#FAECE7',
    title: 'Sua operação está em risco real — e o custo disso cresce a cada mês',
    intro:
      'Os resultados do diagnóstico mostram que a sua operação tem falhas estruturais em múltiplas frentes simultaneamente. Processos que dependem de pessoas, problemas que se repetem sem solução e decisões tomadas no escuro não são inconveniências — são vazamentos de produtividade e receita acontecendo agora. Empresas nesse estágio costumam perder entre 15% e 30% da capacidade produtiva por ineficiências que têm solução conhecida.',
  },
  {
    key: 'desenvolvimento',
    min: 26,
    max: 39,
    label: 'Gestão em desenvolvimento',
    color: '#BA7517',
    bg: '#FAEEDA',
    title: 'Você investe energia — mas os resultados ficam abaixo do que a operação poderia entregar',
    intro:
      'Seu diagnóstico mostra que a base existe: há intenção de gestão, algumas práticas funcionando, e uma equipe que se esforça. O problema é que esforço sem estrutura produz resultados inconsistentes. Você provavelmente reconhece esse padrão: meses bons seguidos de meses problemáticos, melhorias que não se sustentam, e a sensação de que a operação poderia render muito mais com o mesmo time.',
  },
  {
    key: 'estruturada',
    min: 40,
    max: 46,
    label: 'Gestão estruturada',
    color: '#1D9E75',
    bg: '#E1F5EE',
    title: 'Sua operação está bem — e exatamente por isso o próximo salto exige mais do que esforço',
    intro:
      'Você chegou a um nível que a maioria das empresas não alcança: há processos, indicadores e uma equipe que executa. Mas em operações maduras, os ganhos mais relevantes não vêm de corrigir o que está errado — vêm de otimizar o que já funciona. As ineficiências que restam são invisíveis no dia a dia, mas têm impacto real na margem, na escalabilidade e na capacidade de crescer sem perder qualidade.',
  },
  {
    key: 'alta_maturidade',
    min: 47,
    max: 50,
    label: 'Alta maturidade operacional',
    color: '#0F6E56',
    bg: '#E1F5EE',
    title: 'Você opera em alto nível — a questão agora é: até onde essa operação pode chegar?',
    intro:
      'Seus resultados colocam você entre os gestores com maior maturidade operacional. Processos funcionam, indicadores orientam decisões, e a equipe executa com consistência. Nesse estágio, o desafio não é resolver problemas — é eliminar os últimos gargalos invisíveis, preparar a operação para escalar sem perder qualidade e transformar boas práticas em vantagem competitiva sustentável.',
  },
]

export function calcScores(answers) {
  let total = 0
  const dimScores = {}

  QUESTIONS.forEach((q) => {
    const raw = answers[q.id] ?? 3
    const score = q.inv ? 6 - raw : raw
    total += score
    dimScores[q.id] = score
  })

  return { total, dimScores }
}

export function getProfile(total) {
  return PROFILES.find((p) => total >= p.min && total <= p.max) || PROFILES[0]
}

export function getCriticalDims(dimScores, count = 3) {
  return Object.entries(dimScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, count)
    .map(([id]) => id)
}
