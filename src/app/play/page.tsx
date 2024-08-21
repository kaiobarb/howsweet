export const runtime = "edge";
import React, { Suspense } from "react";

import GuessForm from "@/components/guess-form";
import ProductCard from "./components/product-card";
import { getAnswer, getAttempts, resetAttempts } from "../actions";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  Table,
} from "@/components/ui/table";
import EndModal from "./components/end-modal";
import NewGameButton from "./components/new-game-button";
import { CardSkeleton } from "@/components/card-skeleton";
import { ServingSize } from "./components/serving-size";
import { redirect } from "next/navigation";

export interface GameState {
  item?: string;
}

export default async function Play({
  searchParams,
}: {
  searchParams?: GameState;
}) {
  const attempts = await getAttempts();
  const barcode = searchParams?.item || "";
  const sugars = (await getAnswer(barcode)) || 0;

  let win = false;
  let end = false;
  if (Math.abs(attempts.slice(-1)[0]?.value - sugars) < sugars * 0.05) {
    win = true;
    end = true;
  } else if (attempts.length >= 5) {
    end = true;
  }

  const handleNewGame = async () => {
    "use server";
    resetAttempts();
    redirect("/play");
  };

  return (
    <div className="container flex flex-col m-auto justify-center bg-gradient">
      <div className="flex justify-center gap-4 border-primary border-5 grid grid-cols-3">
        {/* Column 1 */}
        <div className="col-span-2">
          <div className="text-center text-2xl font-playwrite font-bold p-5 text-primary">
            How much sugar is in...
          </div>
          <Suspense fallback={<CardSkeleton />}>
            <ProductCard barcode={barcode} />
          </Suspense>
        </div>
        {/* Column 2 */}
        <div className={"border-primary border-2 rounded-sm p-4"}>
          <header className="border-b-8 border-primary pb-1 mb-2">
            <h1 className="font-bold text-4xl m-0 mb-1">Your Guesses</h1>
          </header>
          <div className="flex flex-row justify-between w-full border-collapse p-1">
            <Suspense>
              <ServingSize barcode={barcode} />
            </Suspense>
          </div>
          {!end && (
            <GuessForm
              barcode={barcode}
              className="flex flex-col items-center justify-center"
            />
          )}
          <Table className="place-items-center shrink">
            <TableHeader className="border-primary border-b-8">
              <TableRow>
                <TableHead className="dark:text-white">#</TableHead>
                <TableHead className="font-bold dark:text-white">
                  Sugar
                </TableHead>
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
                  <TableCell className="text-right">
                    {attempt.feedback}
                  </TableCell>
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
        {end && (
          <div className="col-span-3 flex flex-col m-auto gap-2 mt-2">
            <NewGameButton onNewGameStart={handleNewGame} />
            <EndModal
              title={win ? "You Win!" : "You Lose!"}
              description={win ? "How sweet :)" : "Better luck next time."}
              buttonText="Reveal Answer"
            >
              {win &&
                `You guessed within 5% of the correct answer in ${
                  attempts.length
                } ${attempts.length > 1 ? "tries" : "try"}!`}
              <br />
              The {win ? "exact" : "correct"} answer was{" "}
              <span className="font-bold text-2xl">{sugars.toFixed(2)}g</span>
              of sugar per serving
              <NewGameButton onNewGameStart={handleNewGame} />
            </EndModal>
          </div>
        )}
      </div>
    </div>
  );
}
