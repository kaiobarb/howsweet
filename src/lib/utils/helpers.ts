import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructFrontImageUrl(
  barcode: string,
  rev = 1,
  fallback = false,
  resolution = "400"
) {
  const basePath = "https://images.openfoodfacts.org/images/products/";
  let folderPath =
    barcode.length > 8
      ? `${barcode.substring(0, 3)}/${barcode.substring(
          3,
          6
        )}/${barcode.substring(6, 9)}/${barcode.substring(9)}`
      : barcode;

  if (fallback) {
    return `/public/placeholder.webp`;
  }
  // Assuming 'front_en' as the default key for English front images
  const imageKey = "front_en";
  // Revision numbers can change; you may need to fetch this dynamically or use a placeholder if not available.

  const filename = `${imageKey}.${rev}.${resolution}.jpg`;

  return `${basePath}${folderPath}/${filename}`;
}

export async function guessScore(delta: number) {
  let magnitude = "";
  let highOrLow = "↓";
  if (delta < 0) {
    highOrLow = "↑";
  }
  const absDelta = Math.abs(delta);
  if (absDelta < 5) {
    magnitude = "Extremely close";
  }
  if (absDelta < 10) {
    magnitude = "Getting closer";
  }
  if (absDelta < 15) {
    magnitude = "Within range";
  } else {
    magnitude = "You're way off";
  }
  return `${magnitude},${highOrLow}`;
}

export const calculateFeedback = (delta: number, moe: number) => {
  if (Math.abs(delta) < moe) {
    return "Right on!";
  } else if (delta > 0) {
    return "Your guess was low";
  } else if (delta < 0) {
    return "You guessed too high";
  } else if (delta > 15) {
    return "You guessed too HIGH";
  } else if (delta < -15) {
    ("You guessed too LOW");
  }
};
