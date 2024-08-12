"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { submitGuess } from "@/app/actions";
import { Attempt } from "@types";
import React from "react";

interface GuessFormProps {
  children?: React.ReactNode;
  className?: string;
  productBarcode: string;
}

const initialState: { attempts: Attempt[]; productBarcode: string } = {
  attempts: [],
  productBarcode: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Guess
    </Button>
  );
}

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
          step="0.01"
          required
        />
        <SubmitButton />
        <input type="hidden" name="productBarcode" value={productBarcode} />
      </form>
      {children}
    </div>
  );
}
