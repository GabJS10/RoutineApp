import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { list_Records } from "../api/routinesApi";
import ButtonAction from "../components/ButtonAction";
function ListRecords() {
  const { rid, did } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["record", rid, did],
    queryFn: () => list_Records(rid, did),
  });

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((record) => (
            <div key={record.id} className="card w-auto bg-base-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Record created: {record.now.slice(0, 10)}
                </h2>
                <div className="card-actions justify-end">
                  <ButtonAction
                    type="button"
                    recordId={record.id}
                    action={"detailExercise"}
                    dayId={did}
                    routineId={rid}
                    className="btn btn-primary"
                  >
                    Details
                  </ButtonAction>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No records</h1>
        )}
        <div className="col-span-3 m-auto mt-2">
          <ButtonAction
            type="button"
            routineId={rid}
            dayId={did}
            action={"createRecord"}
            className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900"
          >
            Create record
          </ButtonAction>
        </div>
      </div>
    </>
  );
}

export default ListRecords;
