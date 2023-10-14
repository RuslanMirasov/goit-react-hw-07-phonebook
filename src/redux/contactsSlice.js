import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact(state, action) {
      if (state.items.find(contact => contact.name.toLowerCase() === action.payload.name.toLowerCase())) return alert(`Contact already exists!`);
      state.items.unshift({ ...action.payload });
    },

    deleteContact(state, action) {
      state.items = state.items.filter(contact => contact.id !== action.payload.id);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);
