import products from "../data/products.json";

export const getMockedProducts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(products);
      } else {
        reject(new Error("Failed to fetch products"));
      }
    }, 1000);
  });
};

export const getProducts = async () => {
  try {
    const response = await fetch("api/products");
    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.log("error fetching products", error);
    throw error;
  }
};
