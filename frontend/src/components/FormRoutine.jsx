import { Formik, Form, Field } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoutine } from "../api/routinesApi";
import { toast } from "react-hot-toast";
function FormRoutine({ idModal }) {
  const queryClient = useQueryClient();

  const routineMutation = useMutation({
    mutationFn: createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routines"] });
      toast.success("Routine created successfully");
    },
    onError: () => {
      toast.error("Please select at least one day");
    },
  });

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={idModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a routine</h3>
          <p className="py-4">
            Give your routine a name to identify it and select the days on which
            you will train. You will NOT be able to change the training days and
            if you make a mistake you will have to do a new routine, make sure
            you are clear about the days you will train
          </p>
          <div>
            <Formik
              initialValues={{
                name: "",
                checked: [],
              }}
              onSubmit={(values) => {
                const { name, checked } = values;
                const days = checked.map((day) => parseInt(day));
                console.log(days);
                routineMutation.mutate({ name, days });
                document.getElementById("my_modal_1").close();
                //clear the form
                values.name = "";
                values.checked = [];
              }}
            >
              <div role="group" aria-labelledby="checkbox-group">
                <Form className="grid grid-cols-2 gap-7">
                  {/* Resto del formulario */}
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Name your routine"
                    className="input w-full max-w-md-xl col-span-2"
                  />
                  {/* Checkboxes organizados en una cuadrícula */}
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="1"
                      className="checkbox checkbox-md"
                    />
                    Monday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="2"
                      className="checkbox checkbox-md"
                    />
                    Tuesday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="3"
                      className="checkbox checkbox-md"
                    />
                    Wednesday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="4"
                      className="checkbox checkbox-md"
                    />
                    Thursday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="5"
                      className="checkbox checkbox-md"
                    />
                    Friday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="6"
                      className="checkbox checkbox-md"
                    />
                    Saturday
                  </label>
                  <label className="col-span-1">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="7"
                      className="checkbox checkbox-md"
                    />
                    Sunday
                  </label>

                  <button type="submit" className="btn col-span-2">
                    Create
                  </button>
                </Form>
              </div>
            </Formik>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FormRoutine;
