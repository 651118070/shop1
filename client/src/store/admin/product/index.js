import { axiosInstance } from "@/api/axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    isLoading: false,
    products: [],
  };
  export const addNewProduct = createAsyncThunk(
    "admin/products/add",
    async (formData) => {
      const result = await axiosInstance.post(
        "admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );
  
  export const fetchAllProducts = createAsyncThunk(
    "/admin/products/",
    async () => {
      const result = await axiosInstance.get(
        "/admin/products/"
      );
  
      return result?.data;
    }
  );
  
  export const editProduct = createAsyncThunk(
    "/admin/products/edit",
    async ({ id, formData }) => {
      const result = await axiosInstance.put(
        `/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );
  
  export const deleteProduct = createAsyncThunk(
    "/admin/products/delete",
    async (id) => {
      const result = await axiosInstance.delete(
        `/admin/products/delete/${id}`
      );
  
      return result?.data;
    }
  );
  const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.products = [];
        });
    },
  });
  
  export default AdminProductsSlice.reducer;