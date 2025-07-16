"use client";

import { store } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
