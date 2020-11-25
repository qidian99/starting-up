export const INTRODUCTION_FRAMES = [
  {
    title: 'Introduction',
    body: [
      `Since the internet bubble from the 90s, more and morestartup companies are emerging. Some entrepreneurs dropped school and ended up doing businesses and writing biographies. Many other young professionals in their early careers are stimulated to start their own business as well.`,
      `Chart on the right shows the projected total of Angel-Seed, Early Stage, Late Stage, Technology Growth dollar values between 2010 and 2019.`,
      { type: 'link', href: 'https://news.crunchbase.com/news/the-q4-eoy-2019-global-vc-report-a-strong-end-to-a-good-but-not-fantastic-year/', value: 'Reference', },
    ],
  },
  {
    title: 'Startups often fails',
    body: [
      `However, among all these startups, 90% fail, and ~34% close within the first two years. Only 25% make it to the fifteenth year, and 60% cannot even break-even.`,
      `Chart on the right shows the volume of global startup exits. A startup exist is when an investor (usually a venture capitalist) sells his or her stake in the company.`,
      { type: 'link', href: 'https://www.statista.com/topics/4733/startups-worldwide/', value: 'Reference', },
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
    body: [
      {
        type: 'list',
        value: [
          'Subscription-based: Recurring revenue models lead to higher revenues and stronger customer relationships.',
          'Platform-based: Platforms provide networks for people to interact and facilitate connect between them.',
          'Ad-based: Ad-based revenue models entail creating ads for a specific website, service, app, or other product, and placing them on strategic, high-traffic channels.',
          'Transaction-based: Transactional revenue model entails a company providing a service or product and customers paying them for it.',
        ]
      },
    ]
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
    title: 'End of introduction',
    body: [],
  }
];

export const MODEL_FRAMES = [
  {
    title: 'Model',
    body: [
      `This section will introduce the baseline model and all its data models.`,
      `There are different objects in the baseline model: `,
      {
        type: 'list',
        value: [
          'Cycle', 'Terrian', 'Region', 'Company', 'Funding', 'Strategy', 'User', 'Revenue',
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
        type: 'text', value: [`In the baseline model, the market is of size`,
        { type: 'tex', value: 'N\\times N' },]
      },
      `We assume that all population in the market are possible users of the product.`
    ],
  },
  {
    title: 'Region',
    body: [
    ],
  },
  {
    title: 'Company',
    body: [
    ],
  },
  {
    title: 'Funding',
    body: [
    ],
  },
  {
    title: 'Strategy',
    body: [
    ],
  },
  {
    title: 'User',
    body: [
    ],
  },
  {
    title: 'Revenue',
    body: [
    ],
  },
];

