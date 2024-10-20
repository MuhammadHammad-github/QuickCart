const calculatePercentage = (obt, total) => {
  const percent = (obt * 100) / total;
  return Math.round(100 - percent);
};

export default calculatePercentage;
