import { useFormik } from "formik";
import {
  getExercises,
  createRecordExercise,
  updateDetailRecordExercise,
} from "../api/routinesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
function FormRecordExercise({ record, idModal }) {
  const initialValues = {
    exercise: "",
    set: record?.number_of_set || "",
    reps: record?.reps || "",
    weight: record?.Weight || "",
    unit: record?.lbs_kg || "",
  };

  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  const updateDetailRecordExerciseMutation = useMutation({
    mutationFn: updateDetailRecordExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordExercise", id] });
      toast.success("Exercise record updated successfully");
      location.reload();
    },
    onError: () => {
      toast.error("Please don't blank any field");
    },
  });

  const createRecordExerciseMutation = useMutation({
    mutationFn: createRecordExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordExercise", id] });
      toast.success("Exercise record created successfully");
    },
    onError: () => {
      toast.error("Please don't blank any field");
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      if (!record) {
        console.log(values);
        values = { ...values, record: id };
        createRecordExerciseMutation.mutate(values);
      } else {
        values = { ...values, id: record.id };
        updateDetailRecordExerciseMutation.mutate(values);
      }
      console.log(values);
      resetForm({ values: initialValues });
    },
  });

  return (
    <>
      <dialog id={idModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a record exercise</h3>
          <p className="py-4">You can edit later if you want</p>
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <label htmlFor="exercise">Select an exercise</label>
              <select
                className="select select-ghost w-full max-w-xs"
                name="exercise"
                id="exercise"
                onChange={formik.handleChange}
                value={formik.values.exercise}
              >
                <option value="" disabled>
                  ---
                </option>
                {data?.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              <label htmlFor="set">Set</label>
              <input
                type="number"
                name="set"
                id="set"
                value={formik.values.set}
                onChange={formik.handleChange}
                className="input w-full max-w-xs"
              />
              <label htmlFor="reps">Reps</label>
              <input
                type="number"
                name="reps"
                id="reps"
                value={formik.values.reps}
                onChange={formik.handleChange}
                className="input w-full max-w-xs"
              />
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                className="input w-full max-w-xs"
              />
              <label htmlFor="unit">Unit</label>
              <select
                className="select select-ghost w-full max-w-xs"
                name="unit"
                id="unit"
                onChange={formik.handleChange}
                value={formik.values.unit}
              >
                <option value="kg">KG</option>
                <option value="lbs">LBS</option>
              </select>
              <button type="submit" className="btn btn-primary col-span-2">
                {record ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FormRecordExercise;
