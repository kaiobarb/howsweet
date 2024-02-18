import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page() {
  redirect("/play");

  return <div className="container"></div>;
}
