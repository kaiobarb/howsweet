import { Product } from "@/lib/types";

export default function NutritionLabel({
  product,
  className,
}: {
  product: Product;
  className: string;
}) {
  const { nutriments, serving_size, product_quantity } = product;
  const nutrientKeys = [
    { key: "energy_serving", label: "Energy", unit: "kcal" },
    { key: "fat_serving", label: "Fat", unit: "g" },
    { key: "saturated-fat_serving", label: "Saturated Fat", unit: "g" },
    { key: "trans-fat_serving", label: "Trans Fat", unit: "g" },
    { key: "cholesterol_serving", label: "Cholesterol", unit: "mg" },
    { key: "sodium_serving", label: "Sodium", unit: "g" },
    { key: "carbohydrates_serving", label: "Carbohydrates", unit: "g" },
    { key: "fiber_serving", label: "Fiber", unit: "g" },
    // { key: "sugars_serving", label: "Sugars", unit: "g" },
    { key: "proteins_serving", label: "Proteins", unit: "g" },
    { key: "salt_serving", label: "Salt", unit: "g" },
    { key: "vitamin-a_serving", label: "Vitamin A", unit: "IU" },
    { key: "vitamin-c_serving", label: "Vitamin C", unit: "mg" },
    { key: "calcium_serving", label: "Calcium", unit: "mg" },
    { key: "iron_serving", label: "Iron", unit: "mg" },
    { key: "potassium_serving", label: "Potassium", unit: "mg" },
  ];
  return (
    <div className={className}>
      <header className="border-b-8 border-black pb-1 mb-2">
        <h1 className="font-bold text-4xl m-0 mb-1">Nutrition Facts</h1>
        {serving_size && <p className="m-0">Serving Size {serving_size}</p>}
      </header>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th
              colSpan={2}
              className="font-normal text-left p-1 border-t border-black whitespace-nowrap"
            >
              <b>Calories</b>{" "}
              {nutriments && parseInt(nutriments["energy-kcal_value"])}
            </th>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border-b border-gray-400 mb-2">
        {nutrientKeys.map(({ key, label, unit }) => {
          if (nutriments[key])
            return (
              <tr key={key}>
                <td className="text-left p-1">{label}</td>
                <td className="text-right p-1">{`${
                  nutriments[key] ?? 0
                } ${unit}`}</td>
              </tr>
            );
          else return <div />;
        })}
      </table>
    </div>
  );
}

// calcium_serving: 0.0392,
// calcium_unit: 'mg',
// carbohydrates_serving: 25,
// carbohydrates_unit: 'g',
// cholesterol_serving: 0,
// cholesterol_unit: 'mg',
// energy_serving: 544,
// energy_unit: 'kcal',
// fat_serving: 0.5,
// fat_unit: 'g',
// fiber_serving: 5,
// fiber_unit: 'g',
// iron_serving: 0.00179,
// iron_unit: 'mg',
// potassium_serving: 0.431,
// potassium_unit: 'mg',
// proteins_serving: 7,
// proteins_unit: 'g',
// salt_serving: 1.47,
// salt_unit: 'g',
// saturated-fat_serving: 0,
// saturated-fat_unit: 'g',
// sodium_serving: 0.59,
// sodium_unit: 'g',
// sugars_serving: 4,
// sugars_unit: 'g',
// trans-fat_serving: 0,
// trans-fat_unit: 'g',
// vitamin-a_serving: 0.0009,
// vitamin-a_unit: 'IU',
// vitamin-c_serving: 0.00367,
// vitamin-c_unit: 'mg',
