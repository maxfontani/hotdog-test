import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchHotdogs,
  addHotdogAsync,
  editHotdogAsync,
  deleteHotdogAsync,
} from "./hotdogsAPI";
import { sortByTitle } from "../utils";
import {
  IHotdogsState,
  IHotdog,
  INewHotdog,
  IDraftHotdog,
} from "../../app/types";

const initialState: IHotdogsState = {
  allHotdogs: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getHotdogsThunk = createAsyncThunk(
  "staff/fetchHotdogsThunk",
  async () => {
    // The value we return becomes the `fulfilled` action payload
    try {
      return await fetchHotdogs();
    } catch (error) {
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
  }
);

export const addHotdogThunk = createAsyncThunk(
  "staff/addHotdogThunk",
  async (newHotdog: INewHotdog) => {
    // The value we return becomes the `fulfilled` action payload
    try {
      const response = await addHotdogAsync(newHotdog);
      if (response.length && response[0].id) {
        const addedHotdog: IHotdog = {
          ...newHotdog,
          id: response.id,
          created: response.created_at || new Date(),
          updated: response.updated_at || new Date(),
        };
        return addedHotdog;
      } else {
        return undefined;
      }
    } catch (error) {
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
  }
);

export const editHotdogThunk = createAsyncThunk(
  "staff/editHotdogThunk",
  async (params: { id: string; draftHotdog: IDraftHotdog }) => {
    // The value we return becomes the `fulfilled` action payload
    try {
      const { id, draftHotdog } = params;
      // Server API returns the modified hotdog draft object in an Array, e.g. [{id: 4, title: "New Title"}]
      const response = await editHotdogAsync(id, draftHotdog);
      console.log("EDIT RESPO ", response);
      return response[0];
    } catch (error) {
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
  }
);

export const deleteHotdogThunk = createAsyncThunk(
  "staff/deleteHotdogThunk",
  async (id: string) => {
    // The value we return becomes the `fulfilled` action payload
    try {
      // Server API returns the deleted id in an Array, e.g. [18]
      return await deleteHotdogAsync(id);
    } catch (error) {
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
  }
);

export const hotdogsSlice = createSlice({
  name: "hotdogs",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`

    resetState: (state) => {
      state.allHotdogs = initialState.allHotdogs;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getHotdogsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getHotdogsThunk.fulfilled,
        (state, action: PayloadAction<IHotdog[] | undefined>) => {
          if (action.payload) {
            state.allHotdogs = action.payload;
            state.status = "idle";
          } else {
            state.status = "failed";
          }
        }
      )
      // ON ADD
      .addCase(addHotdogThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addHotdogThunk.fulfilled,
        (state, action: PayloadAction<IHotdog | undefined>) => {
          if (action.payload) {
            state.allHotdogs.push(action.payload);
            state.status = "idle";
          } else {
            alert("Oops, something went wrong..");
            state.status = "failed";
          }
        }
      )
      // ON DELETE
      .addCase(deleteHotdogThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteHotdogThunk.fulfilled,
        (state, action: PayloadAction<Array<number>>) => {
          state.status = "idle";
          if (action.payload) {
            state.status = "idle";
            state.allHotdogs = state.allHotdogs.filter(
              (hotdog) => hotdog.id !== action.payload.toString()
            );
          } else {
            alert("Oops, something went wrong..");
            state.status = "failed";
          }
        }
      )
      // ON EDIT
      .addCase(editHotdogThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        editHotdogThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "idle";
          console.log("PAYLO", action.payload);
          if (action.payload && Object.keys(action.payload).includes("id")) {
            state.status = "idle";
            const editedHotdog: IHotdog = state.allHotdogs.filter(
              (hotdog) => hotdog.id === action.payload.id
            )[0];
            const editedIndex = state.allHotdogs.indexOf(editedHotdog);
            Object.assign(state.allHotdogs[editedIndex], { ...action.payload });
          } else {
            alert("Something went wrong.. Make sure that the title is unique.");
            state.status = "failed";
          }
        }
      );
  },
});

export const { resetState } = hotdogsSlice.actions;

// The functions below are called a selector and allow us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllHotdogs = (state: RootState): IHotdog[] =>
  state.hotdogs.allHotdogs;

export const selectHotdogById =
  (id: string) =>
  (state: RootState): IHotdog =>
    state.hotdogs.allHotdogs.filter((hotdog) => hotdog.id === id)[0];

export const selectStatus = (state: RootState): IHotdogsState["status"] =>
  state.hotdogs.status;

export const selectHotdogsOrderedByTitle = (state: RootState): IHotdog[] => {
  if (!state.hotdogs.allHotdogs.length) return [];
  return sortByTitle(selectAllHotdogs(state));
};

export default hotdogsSlice.reducer;
