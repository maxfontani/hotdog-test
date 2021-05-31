export interface IHotdog {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
  created: Date;
  updated: Date;
}

export interface INewHotdog {
  title: string;
  image: string;
  price: string;
  description: string;
}

export interface IDraftHotdog {
  id?: string;
  title?: string;
  image?: string;
  price?: string;
  description?: string;
}

export interface IHotdogsState {
  allHotdogs: IHotdog[];
  status: "idle" | "loading" | "failed";
}
