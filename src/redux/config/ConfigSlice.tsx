import { createSlice } from '@reduxjs/toolkit';
import { getProductsAction } from './ConfigAction';

interface CartItem {
  id: number;
  image: any;
  title: string;
  category: string;
  price: number;
  quantity: number;
  rating: number;
  isAdded?: boolean;
}
interface ConfigModal {
  isLoading: boolean;
  count: number;
  products: CartItem[];
  matched: boolean;
  cart: { [id: string]: CartItem }
  favorites: { [id: string]: CartItem }
}
type ActionType = {
  type: string;
  payload: any;
};
let initialState : ConfigModal = {
  isLoading: false,
  count: 0,
  products: [],
  matched: false,
  cart: {},
  favorites: {}
};
const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    SET_CONFIG_DATA: (state: ConfigModal, action: ActionType) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    addItem: (state: ConfigModal, action: ActionType) => {
      const { id, image, title, category, price, rating } = action.payload;
      if (!state.cart[id]) {
        state.cart[id] = { id, image, title, category, rating, price, quantity: 1, isAdded: true };
      }
    },
    incrementQuantity: (state: ConfigModal, action: ActionType) => {
      const { id } = action.payload;
      if (state.cart[id]) {
        state.cart[id].quantity += 1;
      }
    },
    decrementQuantity: (state: ConfigModal, action: ActionType) => {
      const { id } = action.payload;
      if (state.cart[id] && state.cart[id].quantity > 1) {
        state.cart[id].quantity -= 1;
      }
    },
    removeItem: (state: ConfigModal, action: ActionType) => {
      const { id } = action.payload;
      delete state.cart[id];
    },
    toggleFavorite: (state: ConfigModal, action: ActionType) => {
      const { id, image, title, category, price, rating, quantity } = action.payload;
      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = { id, image, title, category, price, rating, quantity };
      }
    },
    removeFavorite: (state: ConfigModal, action: ActionType) => {
      const { id } = action.payload;
      delete state.favorites[id];
  },
  },
  extraReducers: builder => {
    builder.addCase(getProductsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsAction.fulfilled, (state: ConfigModal, action) => {
      state.isLoading = false;
      state.products = [...state.products, ...action.payload];
    });
    builder.addCase(getProductsAction.rejected, state => {
      state.isLoading = false;
    });

    builder.addMatcher(
      action => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.isLoading = false;
        state.matched = true;
      },
    );
    builder.addDefaultCase((state, action) => {
      console.log('default case', action);
      state.isLoading = false;
    });
  },
  selectors: {
    x: (state: ConfigModal) => state.products,
  },
});

// export const { getProducts } = ConfigSlice.selectors;

export const {
  SET_CONFIG_DATA,
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  toggleFavorite,
  removeFavorite
} = ConfigSlice.actions;

export default ConfigSlice.reducer;
