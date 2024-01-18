import Card from "../components/Card";
import ButtonModal from "../components/ButtonModal";
import ModalForm from "../components/ModalForm";
function ListRoutinesPage({ routines }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {routines.map((routine) => (
          <Card key={routine.id} props={routine} />
        ))}
        <div className="col-span-3 m-auto mt-2">
          <ButtonModal
            className="btn btn-primary"
            description={"Create Routine"}
            idModal="createRoutine"
          >
            <ModalForm whatRender="routine" idModal="createRoutine" />
          </ButtonModal>
        </div>
      </div>
    </>
  );
}

export default ListRoutinesPage;
