import { deleteRoutine, createRecord } from "../api/routinesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ButtonAction({
  routineId,
  children,
  action,
  dayId,
  recordId,
  recordId2,
  ...styles
}) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: () => deleteRoutine(routineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routines"] });
      toast.success("Routine deleted successfully");
    },
  });

  const createRecordMutation = useMutation({
    mutationFn: () => createRecord({ routine: routineId, day: dayId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record", routineId, dayId] });
      toast.success("Record created successfully");
    },
  });

  const actions = {
    delete: () => deleteMutation.mutate(),
    select: () => {
      navigate(`/routine/${routineId}`);
    },
    view: () => {
      navigate(`/routine/${routineId}/day/${dayId}`);
    },
    createRecord: () => createRecordMutation.mutate(),
    detailExercise: () =>
      navigate(`/routine/detailRecordExercise/record/${recordId}`),
    compareDetailExercise: () => {
      if (recordId === recordId2) {
        toast.error("Please select different records");
        return;
      }
      navigate(`/routine/compare/${recordId}/${recordId2}`);
    },
  };

  const handleAction = () => {
    return actions[action]();
  };

  return (
    <>
      <button {...styles} onClick={handleAction}>
        {children}
      </button>
    </>
  );
}

export default ButtonAction;
