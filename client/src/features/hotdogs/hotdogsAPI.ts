import axios from "axios";
import { IHotdog, INewHotdog, IDraftHotdog } from "../../app/types";

export function fetchHotdogs() {
  return axios
    .get<IHotdog[]>("/api/getdata")
    .then((res) => res.data)
    .catch(function (error) {
      throw error;
    });
}

export function addHotdogAsync(newHotdog: INewHotdog) {
  return axios
    .post("/api/hotdogs", newHotdog)
    .then((res) => res.data)
    .catch(function (error) {
      throw error;
    });
}

export function editHotdogAsync(id: string, draftHotdog: IDraftHotdog) {
  return axios
    .post(`/api/hotdogs/${id}`, draftHotdog)
    .then((res) => res.data)
    .catch(function (error) {
      throw error;
    });
}

export function deleteHotdogAsync(id: string) {
  return axios
    .post("/api/hotdogs/delete", { id })
    .then((res) => res.data)
    .catch(function (error) {
      throw error;
    });
}
