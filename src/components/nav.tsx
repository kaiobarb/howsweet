"use client";
import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { confetti } from "@tsparticles/confetti";

const Nav = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);
  return (
    <header className="py-4  shrink-0 border-b-4 border-primary flex justify-center">
      <div className="container flex items-center gap-4 px-4 md:gap-6 max-w-[500px]">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tighter">How Sweet!</h1>
          <p className="text-xs tracking-wide">
            Can you guess how much sugar is in this product?
          </p>
        </div>
        {/* <Button className="text-black" size="sm" variant="outline">
          New Game
        </Button> */}
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </div>
    </header>
  );
};

export default Nav;
