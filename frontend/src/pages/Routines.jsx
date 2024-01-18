import { getRoutines } from "../api/routinesApi";
import { useQuery } from "@tanstack/react-query";
import ListRoutinesPage from "./ListRoutinesPage";
import Loader from "../components/Loader";
import ModalForm from "../components/ModalForm";
import ButtonModal from "../components/ButtonModal";
function RoutinesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: getRoutines,
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.length > 0 ? (
        <ListRoutinesPage routines={data} />
      ) : (
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(http://127.0.0.1:8000/media/landing_image.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Opps! It seems like you don't have routines
              </h1>
              <p className="mb-5">
                But don't worry, you can create one now. Routines are a good way
                to better track your progress in the gym, with them you can
                carry out appropriate programming for what you want to achieve,
                whether hypertrophy or strength.
              </p>
              <ButtonModal
                className="btn btn-primary"
                idModal="createRoutine"
                description={"Create Routine"}
              >
                <ModalForm whatRender="routine" idModal="createRoutine" />
              </ButtonModal>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RoutinesPage;
