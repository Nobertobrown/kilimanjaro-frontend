import reserveAPI from "../api/api";

/** Gets specified route with its buses. */
export const Query = ({ key, method, route, params, data }) => ({
  queryKey: key,
  queryFn: reserveAPI(method, route, params, data),
});

