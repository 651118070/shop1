import adminProductSlice from './admin/product';
import authReducer from './authSlice';
import shoppingProductSlice from './shop/product/index'
import shoppingCartSlice from './shop/cart/index'
import addressSlice from './shop/address/index'
import shoppingOrderSlice from './shop/order/index'
import shopReviewSlice from './shop/review/index'
import commonFeatureSlice from './common/index'
import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './shop/search/index';
import adminOrderSlice from './admin/order/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shoppingProducts:shoppingProductSlice,
        adminOrder:adminOrderSlice,
        cartProducts:shoppingCartSlice,
        addressProducts:addressSlice,
        orderProducts:shoppingOrderSlice,
        shopSearch:searchSlice,
        shopReview: shopReviewSlice, 
        commonFeature: commonFeatureSlice,
    }
})
export default store;