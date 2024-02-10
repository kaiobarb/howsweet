"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";

export function Landing() {
  return (
    <div className="container flex flex-col items-center gap-4 px-4 text-center md:gap-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
          Guess the Sugar
        </h2>
        <p className="text-sm tracking-wide leading-loose">
          Enter your guess in grams
        </p>
      </div>
      <div className="justify-center gap-4">
        <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
          <Image
            alt="Item"
            className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
            height="200"
            src="/placeholder.webp"
            width="200"
          />
        </div>
      </div>
      <form className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2 lg:gap-4">
        <Input
          className="max-w-xs md:mr-2 lg:mr-4"
          min="0"
          placeholder="Enter your guess"
          type="number"
        />
        <Button type="submit">Check</Button>
      </form>
      <div className="space-y-2">
        <h3 className="font-bold tracking-tighter">Feedback</h3>
        <p className="text-sm">
          You guessed: 50g. The actual sugar content is 30g. You were off by
          20g.
        </p>
      </div>
    </div>
  );
}

export default Landing;
