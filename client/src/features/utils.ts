import { AxiosError } from "axios";
import { IHotdog } from "../app/types";

export function sortByTitle(list: IHotdog[]): IHotdog[] {
  list.sort((a: IHotdog, b: IHotdog) => {
    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // if names are equal
    return 0;
  });
  return list;
}

export function checkTitleIsUnique(list: IHotdog[], title: string): boolean {
  if (list.filter((hotdog) => hotdog.title === title).length) return false;
  return true;
}

// TODO re checker functions
// export function urlCheck(url: string) {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
//   return re.test(url);
// }

export function priceCheck(price: string) {
  const re = /^\d{1,3}([,\\.](\d{1,2}))?$/gm;
  return re.test(price);
}

export function consoleLogError(error: AxiosError): undefined {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.warn(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", error.message);
  }
  return undefined;
}
