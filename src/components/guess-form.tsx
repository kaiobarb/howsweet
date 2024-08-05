"use client";

import { useFormState } from "react-dom";
// import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { submitGuess } from "@/app/actions";
import { Attempt } from "@/lib/types";

interface GuessFormProps {
  children?: React.ReactNode;
  className?: string;
  productBarcode: string;
}

const initialState: { attempts: Attempt[]; productBarcode: string } = {
  attempts: [],
  productBarcode: "",
};

export default function GuessForm({
  children,
  className,
  productBarcode,
}: GuessFormProps) {
  const [state, formAction] = useFormState(submitGuess, initialState);

  return (
    <div className={className}>
      <form action={formAction} className="flex w-full justify-center py-4">
        <Input
          name="value"
          className="max-w-xs md:mr-2 lg:mr-4"
          min="0"
          placeholder="Enter your guess in grams per serving"
          type="number"
          required
        />
        <Button type="submit">Guess</Button>
        <input type="hidden" name="productBarcode" value={productBarcode} />
      </form>
      {children}
      {state.attempts.map((attempt, index) => (
        <div key={index}>{attempt.feedback}</div>
      ))}
      {/* <Table className="place-items-center shrink">
        <TableCaption>Your guesses</TableCaption>
        <TableBody>
          {state.attempts.map((attempt, index) => {
            return (
              <TableRow key={attempt} className="bg-grey-100">
                {attempt.split(",").map((cell: string, index: number) => {
                  return <TableCell key={index}>{cell}</TableCell>;
                })}
                {/* // <TableCell className="font-medium">{attempt}</TableCell>
                // <TableCell>{index}</TableCell>
                // <TableCell>Credit Card</TableCell>
                // <TableCell className="text-right">$250.00</TableCell> *
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  );
}
