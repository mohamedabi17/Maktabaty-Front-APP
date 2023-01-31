import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// export const fetchProductInCategories = (CatID) => {
//     fetch(`http://127.0.0.1:8000/getproducts`).then((response) => response.json())
//         .then((data) => {
//             let result = data.filter(product => {
//                 if (product.id_categorie === CatID) {
//                     return product
//                 }
//             });
//             return (result)
//         }
//         );

// };


export const fetchProductInCategories = createAsyncThunk("CategorySlice/fetchProductInCategories", async (CatID) => {
    const res = await fetch('http://127.0.0.1:8000/getproducts');
    const data = await res.json();
    let result = data.filter(product => {
        if (product.id_categorie === CatID) {
            return product
        }
    });
    return result;
})



const CategorySlice = createSlice({
    initialState: [],
    name: 'CategorySlice',
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductInCategories.fulfilled, (state, action) => {
            return action.payload;
        })

    }
})


export const { } = CategorySlice.actions;
export default CategorySlice.reducer;