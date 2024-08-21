import { fetchProduct } from "@/lib/utils";

export const ServingSize = async ({ barcode }: { barcode?: string }) => {
  let servingSize = null;
  if (!!barcode) {
    const product = await fetchProduct(barcode);
    if (product) {
      servingSize = product.serving_size;
    }
  }

  return (
    servingSize && (
      <>
        <div className="font-bold">Serving Size</div>
        {servingSize}
      </>
    )
  );
};
