import { fetchProduct } from "@/lib/utils";

export const dynamic = "force-static";

export async function GET(request: Request) {
  //   console.log(request);
  const referer = request.headers.get("referer");
  //   console.log("::::: ", referer);
  if (!referer) {
    return Response.json(500);
  }

  //   try {
  const url = new URL(referer); // Parse the Referer URL
  const item = url.searchParams.get("item");
  //   console.log(item);
  if (!item) {
    return Response.json(500);
  }

  try {
    const res = await fetchProduct(item);
    const sugars = res.nutriments.sugars;
    console.log("sugars: ", sugars);
    return Response.json(sugars);
  } catch (e) {
    return Response.json(500);
  }
  return Response.json(200);
}
