"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const NewGameButton = ({ onNewGameStart }: { onNewGameStart: () => void }) => {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(true);
    onNewGameStart();
  };
  return (
    <Button onClick={handleClick} disabled={clicked}>
      {clicked ? "Finding a new product..." : "Play Again"}
    </Button>
  );
};
export default NewGameButton;
