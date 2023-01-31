import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    const res = await fetch("http://127.0.0.1:8000/getproducts");
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {
    addProduct: (state, action) => {
      return state.push(action.payload);
    },
    deleteproduct: (state, action) => {
      // return state.filter((Product) => Product.titre !== action.payload.titre)
      return state.pop(action.payload);
    },
    //     editproduct:(state, action) => {

    //         return state.push(action.payload);
    //   },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addProduct, deleteproduct } = productsSlice.actions;
export default productsSlice.reducer;
