const getCacheKey = () => {
  const dateKey = new Date().toISOString().split('T')[0];
  return dateKey;
};

const filterAndAddFullImagePath = (data, type) => {
  if (Array.isArray(data.results)) {
    const result = data.results.map((el) => ({
      id: el.id,
      title: type === 'movie' ? el.title : el.name,
      release_date: type === 'movie' ? el.release_date : el.first_air_date,
      poster_path: `${process.env.TMDB_IMAGE_BASE_URL}w500${el.poster_path}`,
      type,
    }));
    return result;
  }
  return null;
};

module.exports = {
  getCacheKey,
  filterAndAddFullImagePath,
};
