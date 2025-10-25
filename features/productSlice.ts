import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get<Product[]>('https://fakestoreapi.com/products')
  return res.data
})

// Fetch single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const res = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
    return res.data
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default productSlice.reducer
