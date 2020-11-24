export const INTRODUCTION_FRAMES = [
  {
    title: 'Introduction',
    body: [
      `Since the internet bubble from the 90s, more and morestartup companies are emerging. Some entrepreneurs dropped school and ended up doing businesses and writing biographies. Many other young professionals in their early careers are stimulated to start their own business as well.`,
    ],
  },
  {
    title: 'Equation of a line 2',
    body: [
      'Befor interpreting values, let us first describe the general formula for any line.',
      { tex: '\\hat{y} = \\beta_0+ X\\beta_1' },
      `This equation explains that to find the y value for any line, you plugin the slope(β1), multiply it by your X of interest and add the y-intercept(β0) to it.
  As you might have already noticed, the answer to this equation is not y, but rather ŷ. This is because y refers to the actual y value that we get from the data points. ŷ refers to the prediction that our regression line makes. This distinction becomes important later on.`,
    ],
    graph: {
      name: 'SignificanceLevel',
      startSD: 1,
    },
  },
];
