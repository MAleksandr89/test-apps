import { configureStore } from "@reduxjs/toolkit";
import train from "./Slices/trainSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    train,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 