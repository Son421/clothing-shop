import {createSlice,  createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import constants from "../constants";

interface products {
    _id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

interface productState {
    value: products[];
    loading: boolean;
    error: string | null;
}

const initialState: productState = {
    value: [],
    loading: false,
    error: null,    
}

export const fetchProducts = createAsyncThunk<products[], void>(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(constants.url); 
            
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error fetching users');
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState, 
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<products[]>) => {
                state.value = action.payload;
            })
    },
});

export const {} = productSlice.actions;

export const products = (state: RootState) => state.products.value;

export default productSlice.reducer;