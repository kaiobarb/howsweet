"use client";

import { useRouter, useSearchParams } from "next/navigation";

export interface GameState {
  item?: string;
}

export const GameStateController = ({ item }: GameState) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!searchParams.toString() && item) {
    // const barcode = searchParams;
    const params = new URLSearchParams();
    params.set("item", item);
    console.log("params", params.toString());
    router.push(`?${params.toString()}`);
  }
  return null;
};
