"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, RootState } from "./store";

interface Props {
  children: React.ReactNode;
  initialState?: RootState;
}

export function Providers({ children, initialState }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(initialState);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
