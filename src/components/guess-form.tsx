import { Input } from "./ui/input";
import { submitGuess } from "@/app/actions";
import SubmitButton from "@/app/play/components/submit-button";
import React from "react";

interface GuessFormProps {
  children?: React.ReactNode;
  className?: string;
  barcode?: string;
}

export default function GuessForm({ className, barcode }: GuessFormProps) {
  return (
    <div className={className}>
      <form action={submitGuess} className="flex w-full justify-center py-4">
        <Input
          name="value"
          className="max-w-xs md:mr-2 lg:mr-4"
          min="0"
          placeholder="Enter your guess in grams per serving"
          type="number"
          step="0.01"
          required
        />
        <SubmitButton />
        <input type="hidden" name="barcode" value={barcode} />
      </form>
    </div>
  );
}
