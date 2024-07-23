"use client";
import { ThemeToggle } from "./ThemeToggle";

const Nav = () => {
  return (
    <header className="py-4 bg-primary shrink-0 flex justify-center">
      <div className="container flex justify-between gap-4 px-4 md:gap-6 max-w-[1500px]">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tighter">How Sweet!</h1>
          <p className="text-xs tracking-wide">
            A sugar guessing game
          </p>
        </div>
        <ThemeToggle/>
      </div>
    </header>
  );
};

export default Nav;
