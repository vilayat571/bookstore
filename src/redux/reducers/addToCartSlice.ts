import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductProps } from "../../pages/ProductPage";

// Helper function to load cart data from localStorage
const CartFromLocalStorage = (): IProductProps[] => {
  const savedCart = localStorage.getItem("productsCart");
  return savedCart ? JSON.parse(savedCart) : [];
};

interface IInitialState {
  productsCart: IProductProps[];
  error: string | null;
  loading: boolean;
}

const initialState: IInitialState = {
  productsCart: CartFromLocalStorage(),
  error: null,
  loading: false,
};

const addToCartSlice = createSlice({
  name: "addToCartSlice",
  initialState,
  reducers: {
    // Action for adding a product to the cart
    addToCart: (state, action: PayloadAction<IProductProps>) => {
      state.productsCart.push(action.payload);
      localStorage.setItem("productsCart", JSON.stringify(state.productsCart));
    },

    // Action for removing a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.productsCart = state.productsCart.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("productsCart", JSON.stringify(state.productsCart));
    },

    // Action for clearing the cart
    clearCart: (state) => {
      state.productsCart = [];
      localStorage.removeItem("productsCart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = addToCartSlice.actions;

export default addToCartSlice.reducer;
