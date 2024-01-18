import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoutine } from "../api/routinesApi";
import Loader from "../components/Loader";
import ButtonAction from "../components/ButtonAction";
function RoutinePage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["routine", id],
    queryFn: () => getRoutine(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  return (
    <>
      <div className="grid grid-cols-2 gap-7">
        {data.days.length > 0
          ? data.days.map((day) => (
              <div
                key={day.id}
                className="card w-auto bg-primary text-primary-content"
              >
                <div className="card-body">
                  <h2 className="card-title">{day.name}</h2>
                  <div className="card-actions justify-end">
                    <ButtonAction
                      action="view"
                      routineId={id}
                      dayId={day.id}
                      className="btn"
                    >
                      View
                    </ButtonAction>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default RoutinePage;
