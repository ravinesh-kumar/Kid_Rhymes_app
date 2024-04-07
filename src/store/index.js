import {configureStore} from '@reduxjs/toolkit';
import vdoSlice from './slices/vdoSlice';

const store = configureStore({
    reducer: {
        vdos: vdoSlice,
    }
});

export default store;