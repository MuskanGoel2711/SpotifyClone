import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const getProductsApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const paginatedData = response.data.slice((page - 1) * limit, page * limit);
    
    return paginatedData.map((item: Product) => ({
      ...item,
      category: item.category || 'Default Category',
      quantity: 0
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsAction = createAsyncThunk(
  'config/getProducts',
  async ({page=1,limit=10}: { page: number; limit: number }, thunkApi) => {
    try {
      const response = await getProductsApi(page,limit);
      if (response) {
        // thunkApi.dispatch(increaseCountByPayload())
        return thunkApi.fulfillWithValue(response);
      }
      throw new Error(response?.data?.error as string);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
