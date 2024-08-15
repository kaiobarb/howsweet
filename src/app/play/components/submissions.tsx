import { getAnswer, getAttempts } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactElement } from "react";
import EndModal from "./end-modal";
import React from "react";
import NewGameButton from "./new-game-button";

export default async function Submissions({
  className,
  children,
  barcode,
}: {
  className?: string;
  children?: ReactElement;
  barcode: string;
}) {
  // const [gameEnd, setGameEnd] = React.useState(false);
  let gameEnd = false;
  let win = false;
  let sugars = 0;
  const attempts = await getAttempts();
  sugars = await getAnswer(barcode);
  if (Math.abs(attempts.slice(-1)[0]?.value - sugars) < sugars * 0.05) {
    gameEnd = true;
    win = true;
  } else if (attempts.length >= 5) {
    gameEnd = true;
  }
  return (
    <div className={className + " border-primary border-2 rounded-sm p-4"}>
      <EndModal open={gameEnd} win={win}>
        {win &&
          `You guessed within 5% of the correct answer in ${attempts.length} ${
            attempts.length > 1 ? "tries" : "try"
          }!`}
        <br />
        The {win ? "exact" : "correct"} answer was {sugars.toFixed(2)}g of sugar
        per serving
        <NewGameButton />
      </EndModal>
      <header className="border-b-8 border-primary pb-1 mb-2">
        <h1 className="font-bold text-4xl m-0 mb-1">Your Guesses</h1>
      </header>
      {children}
      <Table className="place-items-center shrink">
        <TableHeader className="border-primary border-b-8">
          <TableRow>
            <TableHead className="dark:text-white">#</TableHead>
            <TableHead className="font-bold dark:text-white">Sugar</TableHead>
            <TableHead className="text-right dark:text-white">
              Feedback
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt, index) => (
            <TableRow
              key={index}
              className="bg-grey-100 border-primary border-b-2"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{attempt.value}g</TableCell>
              <TableCell className="text-right">{attempt.feedback}</TableCell>
            </TableRow>
          ))}
          {[...Array(-attempts.length + 5)].map((_, index) => (
            <TableRow
              key={index}
              className="bg-grey-100 border-primary border-b-2"
            >
              <TableCell>{attempts.length + index + 1}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Get within 5% of the correct answer</TableCaption>
      </Table>
    </div>
  );
}
