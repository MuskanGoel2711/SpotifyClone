import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeartState {
  isHeartFilled: boolean;
}

interface HeartPayload {
  title: string;
  artist: string;
  image: string;
}

const initialState: HeartState = {
  isHeartFilled: false,
};

const heartSlice = createSlice({
  name: 'heart',
  initialState,
  reducers: {
    toggleHeart: (state, action: PayloadAction<HeartPayload>) => {
      const { title, artist, image } = action.payload;
      state.isHeartFilled = !state.isHeartFilled;
    },
  },
});

export const { toggleHeart } = heartSlice.actions;
export default heartSlice.reducer;
