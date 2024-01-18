import { RiDeleteBin7Fill } from "react-icons/ri";
import ButtonAction from "../components/ButtonAction";
function Card({ props }) {
  const { id, name, days } = props;
  const text = days.map((day) => day.name).join(", ");

  return (
    <>
      <div className="relative max-w-xs rounded-md shadow-md bg-base-200">
        {/* Botón para eliminar */}
        <ButtonAction
          routineId={id}
          type="button"
          action={"delete"}
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-red-500 transition duration-300"
        >
          <RiDeleteBin7Fill />
        </ButtonAction>
        <img
          src="https://source.unsplash.com/random/300x300/?2"
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracki">{name}</h2>
            <p className="dark:text-gray-100">
              This routine is for:{" "}
              {text ? text : " This routine don't have any days"}
            </p>
          </div>
          <ButtonAction
            type="button"
            routineId={id}
            action={"select"}
            className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900"
          >
            Select
          </ButtonAction>
        </div>
      </div>
    </>
  );
}

export default Card;
