import React from "react";
import { Query } from "../../services/external-api.service";
import Card4 from "../../components/ui/Card4"
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ManageRoutes = () => {
  const [routeList, setRouteList] = React.useState([]);
  const {bus} = useParams();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const fetchRouteList = async () => {
      try {
        const params = {
          bus
        };

        const args = {
          key: "getRoutes",
          method: "GET",
          route: "/routes",
          params
        };

        const res = await queryClient.ensureQueryData(Query(args))

        if (res && res.routes) {
          setRouteList(res.routes);
        }
      } catch (error) {
        console.error("Error fetching route list:", error);
      }
    };

    fetchRouteList();
  }, [bus, queryClient]);

  return (
    <article>
      {routeList.length < 1 ? (
        <div className="flex items-center min-h-[70vh] text-center justify-center">
          <div className="space-y-4">
            <h1>No routes found!</h1>
            <p>
              It looks like you haven&rsquo;t added any routes for the bus yet.
              Register new routes to view them here.
            </p>
            <div>
              <Link to={`/${bus}/register-route`}>
                <Button text="Register Route" className="max-w-max mx-auto" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <section className="text-center mx-auto space-y-8 mb-20">
            <h1>Manage Routes</h1>
            <p>
              Welcome to the routes management page. Here, you can view and
              manage details of your routes.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
            {routeList.map((route, idx) => (
              <Card4
                key={idx}
                routeName={route.name}
                origin={route.origin}
                destination={route.destination}
                departureDate={route.date}
                duration={route.duration}
                departureTime={route.time}
                cost={route.cost}
              />
            ))}
          </section>
        </div>
      )}
    </article>
  );
};

export default ManageRoutes;
