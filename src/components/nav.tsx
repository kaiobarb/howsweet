"use client";
import { ThemeToggle } from "./ThemeToggle";

const Nav = () => {
  return (
    <header className="pt-10 shrink-0 flex justify-center font-playwrite">
      <div className="container flex justify-between gap-4 px-4 md:gap-6 max-w-[1500px]">
        <div />
        <div className="space-y-1 text-center text-primary">
          <h1 className="text-5xl font-bold tracking-tighter">How Sweet!</h1>
          <p className="text-md tracking-wide font-fredoka">
            A sugar guessing game
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Nav;
