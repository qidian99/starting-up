import {
  formatList,
  formatTex
} from "../../Utils";

export const INTRODUCTION_FRAMES = [{
  title: 'Introduction',
  body: [
    `Since the internet bubble from the 90s, more and morestartup companies are emerging. Some entrepreneurs dropped school and ended up doing businesses and writing biographies. Many other young professionals in their early careers are stimulated to start their own business as well.`,
    `Chart on the right shows the projected total of Angel-Seed, Early Stage, Late Stage, Technology Growth dollar values between 2010 and 2019.`,
    {
      type: 'link',
      href: 'https://news.crunchbase.com/news/the-q4-eoy-2019-global-vc-report-a-strong-end-to-a-good-but-not-fantastic-year/',
      value: 'Reference',
    },
  ],
},
{
  title: 'Startups often fails',
  body: [
    `However, among all these startups, 90% fail, and ~34% close within the first two years. Only 25% make it to the fifteenth year, and 60% cannot even break-even.`,
    `Chart on the right shows the volume of global startup exits. A startup exist is when an investor (usually a venture capitalist) sells his or her stake in the company.`,
    {
      type: 'link',
      href: 'https://www.statista.com/topics/4733/startups-worldwide/',
      value: 'Reference',
    },
  ],
},
{
  title: 'How to build a startup',
  body: [
    `The normal way of building a startup from scratch consists of four phases`,
    {
      type: 'list',
      value: [
        'Idea',
        'Pitch',
        'Funding',
        'Operation',
      ]
    },
  ],
},
{
  title: 'Different strategies for a startup',
  body: [{
    type: 'list',
    value: [
      'Subscription-based: Recurring revenue models lead to higher revenues and stronger customer relationships.',
      'Platform-based: Platforms provide networks for people to interact and facilitate connect between them.',
      'Ad-based: Ad-based revenue models entail creating ads for a specific website, service, app, or other product, and placing them on strategic, high-traffic channels.',
      'Transaction-based: Transactional revenue model entails a company providing a service or product and customers paying them for it.',
    ]
  },]
},
{
  title: 'My objective',
  body: [
    `The goal of this project is to let young people at their early professional stages be aware of the difficulties and complexity in doing a startup.`,
    `In the baseline model, there are an intensive amount of abstractions and I will apply simplified constraints to make the model easy to understand and to interact with.`,
    `While this website only implements a simple simulation of the baseline model, I will also shed lights on other more complex variants in later sections.`
  ],
},
{
  title: 'Outline',
  body: [`The rest of this presentation are`, formatList(['Model: the baseline model and its data models', 'Demo: a simple simulation', 'Evaluation: baseline model and its variants', 'Conclusion: summary and applications'])],
}
];

export const MODEL_FRAMES = [{
  title: 'Model',
  body: [
    `This section will introduce the baseline model and all its data models.`,
    `There are different objects in the baseline model:`,
    {
      type: 'list',
      value: [
        'Cycle', 'Terrian', 'Region', 'Company', 'Strategy', 'Funding', 'User', 'Revenue',
      ],
    },
  ],
},
{
  title: 'Cycle',
  body: [
    `Cycle is the base time unit in my model.`,
    `Subscription-based companies have recurring revenue every month, so a Cycle in the simulation is equivalent to a month in reality.`,
    `Each simulation will take at most 240 Cycles, e.g., a 20-year period, if the company does not go bankrupt. Otherwise, if the accumulated revenue of the company drops below 0, the simulation will end sooner.`
  ],
},
{
  title: 'Terrian',
  body: [
    `Terrian is the market space of our simulation.`,
    {
      type: 'text',
      value: [`In the baseline model, the market is of size`,
        {
          type: 'tex',
          value: 'N\\times N'
        },
      ]
    },
    `We assume that all population in the market are possible users of the product.`
  ],
},
{
  title: 'Region',
  body: [{
    type: 'text',
    value: [
      `Each block of the Terrian is called a Region, represented by`,
      {
        type: 'tex',
        value: 'R_{ij}.',
      },
      `Each region has a total population of`,
      {
        type: 'tex',
        value: `P_{ij},`,
      },
      `which is the maximum number of users.`
    ],
  },
  {
    type: 'text',
    value: [
      `Conversion rate, or growth rate, is`,
      formatTex(`cr_{ij} = \\delta_{ij}\\alpha r_{ij}f(U_{ij})`),
      `where`,
      formatTex(`\\delta_{ij}`),
      `is an indicator of whether the Region can gain new users,`,
      formatTex(`r_{ij}`),
      `is the empirical conversion rate,`,
      formatTex(`\\alpha`),
      `is a constant for adjustment, and`,
      formatTex(`f(\\cdot)`),
      `is a function of the number of users.`,
    ],
  }
  ],
},
{
  title: 'Company',
  body: [
    `Company is the participant in a simulation. It goes into the Terrian with a Strategy.`,
    `A Company will accumulate revenue after each cycle. The objective is to gain as much revenue as possible while preventing bankruptcy.`,
  ],
},
{
  title: 'Strategy',
  body: [{
    type: 'text',
    value: [
      `A Strategy consists of five parameters`,
      formatTex(`m_0`),
      `to`,
      formatTex(`m_4`),
      `for a company to determine the threshold of market occupancy rate above which it shall start scaling up before each funding phases. The market occupancy rate is the portion of users in a Region`,
      formatTex(`R_{ ij }`),
      `compared to the population`,
      formatTex(`P_{ ij }.`),
      formatTex(`m_k \\in [0, 1]`),
      `implies that the neighboring Regions of a particular Region`,
      formatTex(`R_n`),
      `can gain users after the number of active users of that Region exceeds`,
      formatTex(`R_{ ij }P_{ ij }.`),
    ],
  }],
},
{
  title: 'Funding',
  body: [{
    type: 'text',
    value: [
      `There are four Funding phases in the entire span of a simulation. The Seed Round Funding, Series A Funding, Series B Funding, and Series C Funding. The amount of these Fundings are`,
      formatTex(`F_0, F_1, F_2, F_3`),
      `respectively.`
    ],
  },],
},

{
  title: 'User',
  body: [{
    type: 'text',
    value: [
      formatTex(`U_{ij}`),
      ` represents the collection of users in a Region. It is used as the cardinality of the collection when it appears in equations. Let 1 denote the state where the user subscribes to the services of company and 0 denote the opposite. In the Region `,
      formatTex(`R_{ij}`),
      `, each User instance can have the transitions after each Cycle as shown in Table`
    ],
  },],
},
{
  title: 'Revenue',
  body: [{
    type: 'text',
    value: [
      `The accumulated total Revenue of the company`,
      formatTex(`R`),
      `is calculated after each Cycle.Each active User will bring`,
      formatTex(`R_u`),
      `revenue, and each Region will induce a fixed cost of`,
      formatTex(`R_r.`),
      `Therefore`,
    ],
  },
  formatTex(`R_{ t+ 1} = R_{ t } + \\sum_{ i, j }U_{ ij } \\cdot R_u - |\\{ R_{ ij }: U_{ ij } > 0\\}| \\cdot R_r`),
  {
    type: 'text',
    value: [
      `The total fixed cost is proportional to the number of Regions the company spreads its business to.The fixed cost can account for apparatuses and servers lent or purchased by the company in order to provide services to its users.As the business grows, the company gains more users but also spends more in hardware and maintenance.`,
      `A company goes bankrupt if its cumulative revenue is below 0 after some Cycle`,
      formatTex(`C_t`),
      `. In reality this means the investors withdraw their investments or the company suffers a margin closeout.`,
    ]
  }
  ],
},
];



export const DEMO_FRAMES = [{
  title: 'Demo',
  body: [`This section will describe the steps to perform a simulation in this platform.`,
    `The steps to simulate the baseline model are:`,
    formatList(
      ['Register a Company', 'Choose Strategy parameters', 'Join a simple simulation']),
  ],
},];


export const EVALUATION_FRAMES = [{
  title: 'Evaluation',
  body: [`This section will first evaluate the best strategy in the baseline model. After that, I will introduce other variants of the model.`],
}, {
  title: 'Fixed Point Iteration',
  body: [`In the baseline model, we have the leaving rate`, formatTex(`lr_{ij} = \\frac{0.625}{U_{ij}}`), `and the converstion (user growth) rate`, formatTex(`cr_{ij} = \\delta_{ij}\\alpha r_{ij}(f(U_{ij}))`),
    `Therefore, we can convert the discrete problem to a continuous one, and assume that the net user growth is exactly the its expected value for now. We have the following formal description to find out how many cycles it needs until the number of active users converges.`,
    `We have`,
    formatTex(`f(x) = \\frac{\\sqrt{x + 1}}{100}\\cdot (100-x) - 0.625`),
    formatTex(`x_0 = 10`),
    `and the recursive relation`,
    formatTex(`x_t = x_{t-1} + f(x_{t-1})\\quad\\forall t\\in \\mathbb N_{\\ge 1}`),
    {
      type: 'text',
      value: [`It can be shown that no matter what initial guess we have in fixed point iteration,`, formatTex(`f^n(x)`), `will always converge to`, formatTex(`x^* = 93.573.`),]
    },
    {
      type: 'text',
      value: [`By calculation, if we start from`, formatTex(`x_0 = 0,`), formatTex(`f(x)`), `will reach 10 in 6 cycles. Starting from`, formatTex(`x_0 = 10,`), formatTex(`f(x)`), `is shown in the graph on the right.`]
    },
    {
      type: 'text',
      value: [`Under this assumption, the optimal `, formatTex(`m_0`), `is in between`, formatTex(`\\frac{x_t}{100} = 0.26`), `and`, formatTex(`\\frac{x_{t+1}}{100} = 0.30.`)],
    },
  ],
}, {
  title: 'Neighboring Regions',
  body: [`Suppose that we are in a squared Terrian with the spawning region is at the center, and that the company will expand uniformly on each direction. Then the Regions with active users will look like a regular rhombus. Therefore, we have that`, formatTex(`\\text{# of outer neighboring Regions} = 4x`), formatTex(`\\text{# of Regions} = 2x^2+2x+1`),
    {
      type: 'text',
      value: [
        `So the overhead of expanding into neighbor Regions until break-even is decreasing. It explains why`, formatTex(`F_0`), `and`, formatTex(`m_0`), `are more important than other parameters.`
      ],
    }
  ],
}, {
  title: 'Simulation',
  body: [{
    type: 'text',
    value: [`For each choice of`, formatTex(`m_0`), `in`, formatTex(`[0.20, 0.22, 0.24, 0.26, 0.28, 0.30],`), `500 simulations of the first 20 cycles were performed.`]
  }],
}, {
  title: 'Result I: Number of Bankruptcy',
  body: [{ type: 'text', value: [`The barchart on the right shows the number of bankruptcy in the 500 simulations for different choices of`, formatTex(`m_0.`)] }],
}, {
  title: 'Result II: Average Revenue (1)',
  body: [`The barchart on the right shows the average accumulated revenue in the 500 simulations excluding cases where the company went bankrupt.`],
}, {
  title: 'Result III: Average Revenue (2)',
  body: [`The barchart on the right shows the average accumulated revenue in the 500 simulations including cases where the company went bankrupt. If a company goes bankrupt then its accumulative revenue is treated as 0.`],
},];


export const CONCLUSION_FRAMES = [{
  title: 'Conclusion',
  body: [{
    type: 'text',
    value: [
      `The baseline model can be analyzed using fixed point iteration. Among all the parameters,`, formatTex(`m_0`), `and`, formatTex(`F_0`), `are the most important. There are several ways to make other parameters have larger implications. The first way is to alter the cost and revenue function. For instance, change fixed cost from being a linear function of number of \textit{Regions} to other polynomial functions. The second way is to alter the growth rate and leaving rate. In the baseline model, the expectation of users stop using the product is fixed across all region because `, formatTex(`g(x) = x`), `. `, formatTex(`f(\\cdot)`), ` and `, formatTex(`g(\\cdot)`), `can be changed respectively to give us different optimization conditions.`
    ]
  },],
}, {
  title: 'Variants',
  body: [`In my final report I also introduced three variants of the baseline model. Variant I is about adding interactions between Regions to mimic the flux of population and generations. Variant II is about adding more dynamic elements such as Terrian formation, allowing user to control direction of expansion, and allowing the company to shift its users around at a certain cost. Variant III discusses the multi-company simulation where competition is involved.`],
}, {
  title: 'Implication',
  body: [`For the implication of this project, it can be applied in many disciplinaries such as math, statistics, computer science, and data science. It can also be deployed as an IO game or platform for algorithm competition.`],
},
];
