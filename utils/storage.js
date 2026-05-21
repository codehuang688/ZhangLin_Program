const FAVORITE_SPOTS_KEY = 'favoriteSpots';
const RECENT_SPOTS_KEY = 'recentSpots';
const ACTIVITY_REGISTRATIONS_KEY = 'activityRegistrations';

function getArray(key) {
  try {
    const value = wx.getStorageSync(key);
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function setArray(key, value) {
  wx.setStorageSync(key, value);
}

function toggleFavoriteSpot(spot) {
  const favorites = getArray(FAVORITE_SPOTS_KEY);
  const exists = favorites.find((item) => item.id === spot.id);
  const nextFavorites = exists
    ? favorites.filter((item) => item.id !== spot.id)
    : [{
      id: spot.id,
      name: spot.name,
      image: spot.image,
      summary: spot.summary
    }].concat(favorites).slice(0, 12);

  setArray(FAVORITE_SPOTS_KEY, nextFavorites);
  return !exists;
}

function isFavoriteSpot(spotId) {
  return getArray(FAVORITE_SPOTS_KEY).some((item) => item.id === spotId);
}

function getFavoriteSpots() {
  return getArray(FAVORITE_SPOTS_KEY);
}

function addRecentSpot(spot) {
  const recent = getArray(RECENT_SPOTS_KEY).filter((item) => item.id !== spot.id);
  const nextRecent = [{
    id: spot.id,
    name: spot.name,
    image: spot.image,
    summary: spot.summary
  }].concat(recent).slice(0, 8);

  setArray(RECENT_SPOTS_KEY, nextRecent);
  return nextRecent;
}

function getRecentSpots() {
  return getArray(RECENT_SPOTS_KEY);
}

function registerActivity(activity) {
  const registrations = getArray(ACTIVITY_REGISTRATIONS_KEY);
  const exists = registrations.find((item) => item.id === activity.id);
  if (exists) {
    return {
      registered: true,
      registrations
    };
  }

  const nextRegistrations = [{
    id: activity.id,
    title: activity.title,
    date: activity.date,
    place: activity.place,
    image: activity.image
  }].concat(registrations).slice(0, 10);

  setArray(ACTIVITY_REGISTRATIONS_KEY, nextRegistrations);
  return {
    registered: false,
    registrations: nextRegistrations
  };
}

function getActivityRegistrations() {
  return getArray(ACTIVITY_REGISTRATIONS_KEY);
}

function isRegisteredActivity(activityId) {
  return getArray(ACTIVITY_REGISTRATIONS_KEY).some((item) => item.id === activityId);
}

module.exports = {
  toggleFavoriteSpot,
  isFavoriteSpot,
  getFavoriteSpots,
  addRecentSpot,
  getRecentSpots,
  registerActivity,
  getActivityRegistrations,
  isRegisteredActivity
};
