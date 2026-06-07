export const COUNTRY_TO_CURRENCY = {
  IN: 'INR',
  AU: 'AUD',
};

// priceNote is derived at render time: symbol + Math.round(discounted / sessions) + '/- session'
export const PRICING = {
  INR: {
    symbol: '₹',
    foundation: {
      original: 6000,
      discounted: 5000,
    },
    committedLearner: {
      original: 18000,
      discounted: 13500,
    },
  },
  AUD: {
    symbol: 'A$',
    foundation: {
      original: 150,
      discounted: 120,
    },
    committedLearner: {
      original: 450,
      discounted: 300,
    },
  },
  USD: {
    symbol: '$',
    foundation: {
      original: 105,   // TODO: set USD Foundation original price
      discounted: 90, // TODO: set USD Foundation discounted price
    },
    committedLearner: {
      original: 315,   // TODO: set USD Committed Learner original price
      discounted: 210, // TODO: set USD Committed Learner discounted price
    },
  },
};
