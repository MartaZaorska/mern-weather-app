import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  searchHistory: localStorage.getItem("projekt_zespolowy_app") ? JSON.parse(localStorage.getItem("projekt_zespolowy_app")) : [],
  saveLocations: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { locations, ...user } = action.payload;

      if((!state.user && user.unit !== "metric") || (state.user && state.user.unit !== user.unit)){
        state.searchHistory = state.searchHistory.map(item => ({ ...item, weather: null }));
      }

      state.user = user;
      state.saveLocations = locations;
    },
    logout: (state, action) => {
      if(state.user && state.user.unit !== "metric"){
        state.searchHistory = state.searchHistory.map(item => ({ ...item, weather: null }));
      }

      state.user = null;
      state.saveLocations = [];
    },
    addSearchLocation: (state, action) => {    
      state.searchHistory = [
        { ...action.payload }, 
        ...state.searchHistory.filter(item => {
          if(item.lat === action.payload.lat && item.lon === action.payload.lon) return false;
          if(item.country === action.payload.country && item.name === action.payload.name) return false;
          return true;
        })
      ].slice(0, 9);
      
      localStorage.setItem("projekt_zespolowy_app", JSON.stringify(state.searchHistory.map(item => ({ ...item, weather: null }))));
    },
    addSaveLocation: (state, action) => {
      state.saveLocations = [action.payload, ...state.saveLocations];
    },
    deleteSaveLocation: (state, action) => {
      state.saveLocations = [...state.saveLocations.filter(item => item._id !== action.payload)];
    },
    setWeather: (state, action) => {
      const { lat, lon, weather } = action.payload;
      
      state.saveLocations = state.saveLocations.map(location => {
        return location.lat == lat && location.lon == lon ? { ...location, weather } : location;
      });

      state.searchHistory = state.searchHistory.map(location => {
        return location.lat == lat && location.lon == lon ? { ...location, weather } : location;
      });

      localStorage.setItem("projekt_zespolowy_app", JSON.stringify(state.searchHistory.map(location => ({ ...location, weather: null }))));
    }
  }
});

export const {
  setUser,
  addSaveLocation,
  addSearchLocation,
  deleteSaveLocation,
  setWeather,
  logout
} = appSlice.actions;

export default appSlice.reducer;