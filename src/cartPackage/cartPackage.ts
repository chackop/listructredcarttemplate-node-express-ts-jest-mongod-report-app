export const GET_BASE_URL =
  "https://equalexperts.github.io/backend-take-home-test-data/";

export enum ProductNames {
  CHEER = "cheerios",
  CORN = "cornflakes",
  FROST = "frosties",
  SHRED = "shreddies",
  WEET = "weetabix",
}

export interface ProductAPIRepsonse {
  title: ProductNames;
  price: number;
}

export interface CartItemList extends ProductAPIRepsonse {
  quantity: number;
}

export const readProductAPI = async (product: ProductNames) => {
  const resp = await fetch(`${GET_BASE_URL}${product}.json`);
  const jsonResp = (await resp.json()) as ProductAPIRepsonse;

  return jsonResp;
};

export const addProduct = async (product: ProductNames, quantity: number) => {
  const resp = await readProductAPI(product);

  if (resp) {
    console.log(`Adding ${quantity} x ${resp.title} @ ${resp.price} each`);

    return { ...resp, quantity } as CartItemList;
  }
};

export const combineItems = (itemList: CartItemList[]) => {
  // Sum and Merge based on Object Property
  const combinedList = itemList.reduce(
    (acc: CartItemList[], currItem: CartItemList) => {
      const currTitle = currItem.title;

      const found = acc.find(
        (elem: CartItemList) => elem.title === currTitle
      ) as any;

      if (found) {
        found.price += currItem.price;
        found.quantity += currItem.quantity;
      } else {
        acc.push(currItem);
      }

      return acc;
    },
    []
  );

  return combinedList;
};

export const getCartState = (combinedList: CartItemList[]) => {
  let subTotal = 0;

  const taxPercentageValue = 0.125;

  combinedList.forEach((item: CartItemList) => {
    const outputText = `Cart contains ${item.quantity} x ${item.title}`;

    subTotal = subTotal + item.price;

    console.log(outputText);
  });

  const taxedValue = subTotal * taxPercentageValue;
  const totalValue = subTotal + taxedValue;

  console.log("Subtotal = ", subTotal);
  console.log("Tax = ", taxedValue);
  console.log("Total = ", totalValue);

  return totalValue;
};
