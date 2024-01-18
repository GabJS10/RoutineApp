import { useParams } from "react-router-dom";
import { compareDetailExercise } from "../api/routinesApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
function ComparePage() {
  const { id, id2 } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["compareRecordsDetail", id, id2],
    queryFn: () => {
      toast.success(
        "Weights in pounds have been converted to kilos for comparison."
      );
      return compareDetailExercise(id, id2);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>exercise</th>
              <th># set</th>
              <th>reps R1</th>
              <th>reps R2</th>
              <th>diff reps</th>
              <th>weight R1</th>
              <th>weight R2</th>
              <th>diff weight</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.comparison).map((key) => (
              <tr key={key}>
                <td>{key.slice(0, -2)}</td>
                <td>{data.comparison[key].set}</td>
                <td>{data.comparison[key].reps.record1}</td>
                <td>{data.comparison[key].reps.record2}</td>
                <td
                  className={
                    data.comparison[key].reps.diff < 0 ? "text-red-500" : ""
                  }
                >
                  {data.comparison[key].reps.diff}
                </td>
                <td>{data.comparison[key].weight.record1}</td>
                <td>{data.comparison[key].weight.record2}</td>
                <td
                  className={
                    data.comparison[key].weight.diff < 0 ? "text-red-500" : ""
                  }
                >
                  {data.comparison[key].weight.diff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ComparePage;
