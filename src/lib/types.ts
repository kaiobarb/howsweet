export interface GameState {
  productId?: string;
}

export interface Attempt {
  value: number;
  feedback: string;
}

export interface Nutriment {
  [key: string]: string; // Example to handle various nutriment fields dynamically
}

export interface ProductPackagingComponent {
  shape: string;
  material: string;
  recycling: string;
  quantity_per_unit: string;
  weight: number;
}

export interface Product {
  abbreviated_product_name: string;
  code: string;
  generic_name: string;
  id: string;
  lc: string;
  lang: string;
  nova_group: number;
  nova_groups: string;
  product_name: string;
  product_name_en: string;
  product_quantity: string;
  product_quantity_unit: string;
  quantity: string;
  nutriments: Nutriment;
  packaging_text: string;
  packagings: ProductPackagingComponent[];
  brands: string;
  categories: string;
  countries: string;
  serving_size: string;
  images: {
    [key: string]: {
      uploaded_t: string;
      uploader: string;
      sizes: {
        [size: string]: {
          h: number;
          w: number;
        };
      };
      rev?: number;
    };
  };
}

export interface OFFResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
}
