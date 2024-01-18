import { authAxi } from "./useAxios";

export const compareDetailExercise = async (id, id2) => {
  try {
    const response = await authAxi.get(
      `/routine/compareDetailExercise/${id}/${id2}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDetailRecordExercise = async (id) => {
  await authAxi.delete(`/routine/deleteDetailRoutine/${id}`);
};
export const updateDetailRecordExercise = async (data) => {
  console.log(data);
  await authAxi.put(`/routine/updateDetailRoutine/${data.id}`, data);
};

export const createRecordExercise = async (data) => {
  await authAxi.post("/routine/createDetailRoutine/", data);
};

export const getExercises = async () => {
  try {
    const response = await authAxi.get("/routine/getExercises/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailRecordExercise = async (recordId) => {
  try {
    const response = await authAxi.get(
      `/routine/listDetailRoutine/${recordId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = async (data) => {
  console.log(data);
  await authAxi.post("/routine/createRecords/", data);
};

export const list_Records = async (routineId, dayId) => {
  try {
    const response = await authAxi.get(
      `/routine/listRecords/${routineId}/${dayId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoutine = async (id) => {
  try {
    const response = await authAxi.get(`/routine/getRoutine/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoutine = async (id) => {
  await authAxi.delete(`/routine/deleteRoutine/${id}`);
};
export const createRoutine = async (data) => {
  await authAxi.post("/routine/createRoutine/", data);
};

export const getRoutines = async () => {
  try {
    const response = await authAxi.get("/routine/listRoutine/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
