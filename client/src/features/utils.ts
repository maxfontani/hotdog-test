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

// export function priceCheck(price: string) {
//   const re = /^[a-z ,.'-]{3,16}$/i;
//   return re.test(price);
// }
