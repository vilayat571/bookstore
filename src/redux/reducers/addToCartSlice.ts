import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductProps } from "../../pages/ProductPage";

interface IInitialState {
  productsCart: IProductProps[];
  error: string | null;
  loading: boolean;
}

const initialState: IInitialState = {
  productsCart: [],
  error: null,
  loading: false,
};

const addToCartSlice = createSlice({
  name: "addToCartSlice",
  initialState,
  reducers: {
    // Action for adding a product to the cart
    addToCart: (state, action: PayloadAction<IProductProps>) => {

        console.log(action.payload)
      state.productsCart.push(action.payload); // Add the product to the cart
    },
  },
});

export const { addToCart } = addToCartSlice.actions;

export default addToCartSlice.reducer;
