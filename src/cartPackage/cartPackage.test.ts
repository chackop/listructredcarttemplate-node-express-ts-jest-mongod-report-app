import { enableFetchMocks } from "jest-fetch-mock";

import {
  CartItemList,
  ProductNames,
  addProduct,
  combineItems,
  getCartState,
  readProductAPI,
} from "./cartPackage.js";

describe("cartPackage", () => {
  enableFetchMocks();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockData = { title: ProductNames.SHRED, price: 20 };

  test("readProductAPI", async () => {
    fetchMock.mockResponse(JSON.stringify(mockData));
    const resp = await readProductAPI(ProductNames.CORN);

    expect(resp.title).toBe(mockData.title);
  });

  test("addProduct", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const resp = await addProduct(ProductNames.CORN, 1);

    expect(resp?.title).toBe(mockData.title);
  });

  test("combineItems", () => {
    const testList: CartItemList[] = [{ ...mockData, quantity: 1 }];
    expect(combineItems(testList)).toBeDefined();
  });

  test("getCartState", () => {
    const testList: CartItemList[] = [{ ...mockData, quantity: 1 }];
    expect(getCartState(testList)).toBeDefined();
  });
});
