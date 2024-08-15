"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NewGameButton = () => {
  const router = useRouter();
  return <Button onClick={() => router.push("/play")}>Play Again</Button>;
};
export default NewGameButton;
