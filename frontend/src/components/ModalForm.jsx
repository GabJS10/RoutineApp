import FormRecordExercise from "./FormRecordExercise";
import FormRoutine from "./FormRoutine";

function ModalForm({ whatRender, record, idModal }) {
  return (
    <>
      {whatRender === "routine" ? (
        <FormRoutine idModal={idModal} />
      ) : (
        <FormRecordExercise record={record} idModal={idModal} />
      )}
    </>
  );
}
export default ModalForm;
