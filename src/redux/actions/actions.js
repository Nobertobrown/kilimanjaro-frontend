export const createAction = (type, payload) => ({ type, payload });

export const setCurrentUser = (user) => createAction("SET_CURRENT_USER", user);
export const setLocations = (locations) =>
  createAction("SET_LOCATIONS", locations);
export const setTrips = (trips) => createAction("SET_TRIPS", trips);
export const tripToBook = (booking) => createAction("TRIP_TO_BOOK", booking);
