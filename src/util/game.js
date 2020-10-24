export const GAME_ACTIONS = {
  SET_NEW_GAME: 'SET_NEW_GAME',
  REGISTER_GAME: 'REGISTER_GAME',
  ENTER_GAME: 'ENTER_GAME',
}

export const STRATEGY_ERROR_TEXT = 'Value must be in [0,1]';


export const generateRegionRows = (region) => {
  const {
    population,
    conversionRate,
    leavingRate,
    revenue,
    cost,
    growth,
  } = region;

  return [
    {
      name: 'Population',
      value: population,
    },
    {
      name: 'Conversion rate',
      value: conversionRate,
    },
    {
      name: 'Leaving rate',
      value: leavingRate,
    },
    {
      name: 'Revenue per use per cycle',
      value: revenue
    },
    {
      name: 'Cost per cycle',
      value: cost,
    },
    {
      name: 'Auto growth (# cycles)',
      value: growth,
    },
  ]
}
