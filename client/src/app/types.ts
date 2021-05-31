export interface IHotdog {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  created: string;
  updated: string;
}

export interface INewHotdog {
  title: string;
  image: string;
  price: string;
  description: string;
}

export interface IDraftHotdog {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
}

export interface IHotdogsState {
  allHotdogs: IHotdog[];
  status: "idle" | "loading" | "failed";
}
