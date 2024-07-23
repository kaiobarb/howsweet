"use client"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page() {

  return <div className="container flex w-full justify-center items-center">
    <Button className="text-[40px] p-10" size="lg" onClick={()=> redirect("/play")}>
      Start
    </Button>
  </div>;
}
