const initialState = {
  user: { username: "", email: "", profile: "", uid: "" },
  locations: [],
  trips: [],
  booking: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, user: payload };

    case "SET_LOCATIONS":
      return { ...state, locations: payload };

    case "SET_TRIPS":
      return { ...state, trips: payload };

    case "TRIP_TO_BOOK":
      return { ...state, booking: payload };

    default:
      return state;
  }
};

export default reducer;
