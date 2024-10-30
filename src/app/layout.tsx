import Navbar from "@/components/Navbar";
import { apiFetchHotels } from "@core/api/hotelsApi";
import { setHotels } from "@core/store/globalSlice";
import { Providers } from "@core/store/provider";
import { makeStore } from "@core/store/store";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotels App - joserealdev",
  description: "Github: joserealdev",
};

const store = makeStore();

async function initializeStoreData() {
  try {
    const hotels = await apiFetchHotels();
    store.dispatch(setHotels(hotels));
    return store.getState();
  } catch (error) {
    console.error("Failed to initialize store data:", error);
    return store.getState();
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = await initializeStoreData();

  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
