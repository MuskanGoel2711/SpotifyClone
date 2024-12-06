import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';
// import { increaseCountByPayload } from '../config/ConfigSlice';

interface Product {
  id: string;
  name: string;
  price: number;
}

const getProductsApi = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/mockapi'
      : 'http://localhost:3000/mockapi'
  );
  return response.data;
};

interface GetProductsArgs {
  
}

export const getProductsAction = createAsyncThunk<Product[], GetProductsArgs>(
  'config/getProducts',
  async (args, thunkApi) => {
    console.log('args', args);
    try {
      console.log('getProductsAction', args, thunkApi);
      const response = await getProductsApi();
      console.log('getProductsApi', response);
      
      if (response) {
        // thunkApi.dispatch(increaseCountByPayload());
        return thunkApi.fulfillWithValue(response);
      }
      throw new Error('No response from API');
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);