import { checkTitleIsUnique } from "./utils";
import { IHotdog } from "../app/types";

const mockList: IHotdog[] = [
  {
    id: "5",
    title: "Toronto",
    image: "https://newengland.com/wp-content/uploads/new-england-hot-dogs.jpg",
    price: "4",
    description: "Great one!",
    created: new Date(2020, 1, 10),
    updated: new Date(2021, 9, 10),
  },
  {
    id: "11",
    title: "New Orleans",
    image: "https://newengland.com/new-orl.jpg",
    price: "2",
    description: "Awesome!",
    created: new Date(2020, 8, 10),
    updated: new Date(2021, 9, 10),
  },
  {
    id: "22",
    title: "Chicago",
    image: "https://newengland.com/chicago.jpg",
    price: "11",
    description: "Splendid!",
    created: new Date(2020, 3, 10),
    updated: new Date(2021, 7, 12),
  },
];

describe("utils", () => {
  test("checks if title is unique", () => {
    expect(checkTitleIsUnique(mockList, "Kyiv")).toBe(true);
    expect(checkTitleIsUnique(mockList, "New Orleans")).toBe(false);
  });
});
