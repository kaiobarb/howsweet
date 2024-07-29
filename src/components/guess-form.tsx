"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";

interface GuessFormProps {
  children?: React.ReactNode;
  className?: string;
  onSubmit: (
    // prevState: { attempts: string[] },
    formData: FormData
  ) => Promise<{ attempts: string[] }>;
}

const initialState: { attempts: string[] } | string = {
  attempts: [],
};

export default function GuessForm({
  children,
  className,
  onSubmit,
}: GuessFormProps) {
  // const [state, formAction] = useFormState(onSubmit, initialState);

  return (
    <div className={className}>
      <form action={onSubmit} className="flex w-full justify-center py-4">
        <Input
          name="guess"
          className="max-w-xs md:mr-2 lg:mr-4"
          min="0"
          placeholder="Enter your guess in grams per serving"
          type="number"
          required
        />
        <Button type="submit">Guess</Button>
      </form>
      {children}
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
