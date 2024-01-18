import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDetailRecordExercise,
  deleteDetailRecordExercise,
} from "../api/routinesApi";
import Loader from "../components/Loader";
import ButtonModal from "../components/ButtonModal";
import ModalForm from "../components/ModalForm";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
function DetailExercisePage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["recordExercise", id],
    queryFn: () => getDetailRecordExercise(id),
  });

  const deleteDetailRecordExerciseMutation = useMutation({
    mutationFn: deleteDetailRecordExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordExercise", id] });
      toast.success("Exercise record deleted successfully");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>exercise</th>
              <th># set</th>
              <th>reps</th>
              <th>weight</th>
              <th>unit</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record, index) => (
              <tr key={record.id}>
                <td>{record.exercise}</td>
                <td>{record.number_of_set}</td>
                <td>{record.reps}</td>
                <td>{record.Weight}</td>
                <td>{record.lbs_kg}</td>
                <td>
                  <ButtonModal
                    description={<GrUpdate />}
                    idModal={`updateExercise${record.id}`}
                  >
                    <ModalForm
                      whatRender="recordExercise"
                      record={record}
                      idModal={`updateExercise${record.id}`}
                    />
                  </ButtonModal>
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteDetailRecordExerciseMutation.mutate(record.id)
                    }
                  >
                    <RiDeleteBinFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ButtonModal
          className="btn btn-primary justify-center"
          description={"Create Record"}
          idModal="createRecord"
        >
          <ModalForm
            whatRender="recordExercise"
            record={null}
            idModal="createRecord"
          />
        </ButtonModal>
      </div>
    </>
  );
}

export default DetailExercisePage;
