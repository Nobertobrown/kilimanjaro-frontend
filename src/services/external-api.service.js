import reserveAPI from "../api/api";

/** Gets specified route with its buses. */
export const Query = (args) => ({
  queryKey: [args],
  queryFn: async () => {
    const res = await reserveAPI(args)
    return res
  },
});

