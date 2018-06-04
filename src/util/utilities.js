export const formatPrice = (price, curr) => {
  return (price && curr === 'USD') ? price.toFixed(2) : price;
}

export const getTrend = (tick) => {
  return (tick === 'MinusTick' || tick === 'ZeroMinusTick') ? 
  'bear' : 'bull';
}