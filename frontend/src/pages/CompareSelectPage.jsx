import { useState, useEffect } from "react";
import { getRoutines, getRoutine, list_Records } from "../api/routinesApi";
import MySelect from "../components/MySelect";
import ButtonAction from "../components/ButtonAction";
function CompareSelectPage() {
  const [routine, setRoutine] = useState(null);
  const [day, setDay] = useState(null);
  const [record, setRecord] = useState(null);
  const [record2, setRecord2] = useState(null);

  return (
    <>
      <MySelect
        title="Select Routine"
        fnQuery={() => getRoutines()}
        handleChange={(e) => setRoutine(e.target.value)}
      />

      {routine && (
        <MySelect
          title="Select Day"
          fnQuery={() => getRoutine(routine)}
          handleChange={(e) => setDay(e.target.value)}
          rol="day"
        />
      )}
      {day && (
        <MySelect
          title="Select Record"
          fnQuery={() => list_Records(routine, day)}
          handleChange={(e) => setRecord(e.target.value)}
        />
      )}
      {day && (
        <MySelect
          title="Select Record 2"
          fnQuery={() => list_Records(routine, day)}
          handleChange={(e) => setRecord2(e.target.value)}
        />
      )}
      {record && record2 && (
        <ButtonAction
          recordId={record}
          recordId2={record2}
          action="compareDetailExercise"
          className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900 mt-5"
        >
          Compare
        </ButtonAction>
      )}
      <button
        onClick={() => {
          setRoutine(null);
          setDay(null);
          setRecord(null);
          setRecord2(null);
        }}
        className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md mt-5 dark:bg-violet-400 dark:text-gray-900"
      >
        Reset
      </button>
    </>
  );
}

export default CompareSelectPage;
