import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Products from '../../components/Products';
export const fetchUser = createAsyncThunk("OrderSlice/fetchUser", async () => {
  const res = await fetch("http://127.0.0.1:8000/users/me/");
  const data = await res.json();
  return data;
});


const OrderSlice = createSlice({
  initialState: [],
  name: "OrderSlice",
  reducers: {
    MakeOrder: (state, action) => {

      
    },
  },
  extraReducers: (builder) => {

      builder.addCase(fetchUser.fulfilled, (state, action) => {
          return action.payload;
      })

  }
});

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
