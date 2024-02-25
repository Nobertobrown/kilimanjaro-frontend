import React from "react";
import { Query } from "../../services/external-api.service";
import Card3 from "../../components/ui/Card3";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";

const ManageBuses = () => {
  const [busList, setBusList] = React.useState([]);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const fetchBusList = async () => {
      try {
        const args = {
          key: "getBuses",
          method: "GET",
          route: "/buses",
        };

        const res =
          (queryClient.getQueryData(Query(args).queryKey)) ??
          (await queryClient.fetchQuery(Query(args)));

        if (res && res.buses) {
          setBusList(res.buses);
        }
      } catch (error) {
        console.error("Error fetching bus list:", error);
      }
    };

    fetchBusList();
  }, [queryClient]);

  return (
    <article>
      {busList.length < 1 ? (
        <div className="flex items-center min-h-[70vh] text-center justify-center">
          <div className="space-y-4">
            <h1>No buses found!</h1>
            <p>
              It looks like you haven&rsquo;t added any buses yet. Start
              managing your buses to view them here.
            </p>
            <div>
              <Link to={"/register"}>
                <Button
                  text="Register Your Bus"
                  className="max-w-max mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <section className="text-center mx-auto space-y-8 mb-20">
            <h1>Manage Your Buses</h1>
            <p>
              Welcome to the bus management page. Here, you can view and manage
              details of your buses.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
            {busList.map((bus) => (
              <Card3
                key={bus._id}
                busNumber={bus.plateNo}
                seats={bus.seats}
                type = {bus.type}
              />
            ))}
          </section>
        </div>
      )}
    </article>
  );
};

export default ManageBuses;
