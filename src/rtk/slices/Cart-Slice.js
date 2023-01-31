import { createSlice } from "@reduxjs/toolkit";
// import Products from '../../components/Products';

const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.titre === action.payload.titre
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        const productClone = { ...action.payload, quantity: 1 };
        state.push(productClone);
      }
    },
    deleteFromCart: (state, action) => {
      return state.filter((Product) => Product.titre !== action.payload.titre);
    },
    clear: (state, action) => {
      return [];
    },
    DimQuantityCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.titre === action.payload.titre
      );
      if (findProduct) {
        findProduct.quantity -= 1;
        if (findProduct.quantity === 0) {
          return state.filter(
            (Product) => Product.titre !== action.payload.titre
          );
        }
      }
    },
    AugQuantityCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.titre === action.payload.titre
      );
      if (findProduct) {
        findProduct.quantity += 1;
      }
    },
  },
  // extraReducers: (builder) => {

  //     builder.addCase(fetchProducts.fulfilled, (state, action) => {
  //         return action.payload;
  //     })

  // }
});

export const {
  DimQuantityCart,
  AugQuantityCart,
  addToCart,
  deleteFromCart,
  clear,
} = cartSlice.actions;
export default cartSlice.reducer;
