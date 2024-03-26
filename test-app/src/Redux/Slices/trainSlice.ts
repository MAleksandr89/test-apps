import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Characteristics {
  speed: number | string;
  force: number | string;
  engineAmperage: number | string;
}
export interface DataTrain {
    name: string;
    description: string;
    characteristics: Characteristics[];
    status: string;
}
interface TrainSliceState {
  items: DataTrain[];
  status: Status;
}
export enum Status {
  LOADING = "Loading",
  SUCCESS = "Success",
  ERROR = "Error",
}


export const fetchTrain = createAsyncThunk<DataTrain[]>(
  "train/fetchDataTrain",
  async () => {
    const { data } = await axios.get<DataTrain[]>(
      'https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json'
    );
    return data;
  }
);

const initialState: TrainSliceState = {
  items: [],
  status: Status.LOADING,
};

export const trainSlice = createSlice({
  name: "train",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<DataTrain[]>) {
      state.items = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrain.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchTrain.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTrain.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const fetchDataTrain = (state: RootState) => state.train.items;
export const { setItems } = trainSlice.actions;
export default trainSlice.reducer;
