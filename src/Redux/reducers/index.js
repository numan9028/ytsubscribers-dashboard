import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import packagesReducer from './packagesReducer';
import pageSectionReducer from './pageSectionReducer';
import faqsReducer from './faqsReducer';
import blogsReducer from './blogsReducer';
import reviewsReducer from './reviewsReducer';
import ordersReducer from './ordersReducer';
import stripeSettingReducer from './stripeSettingReducer';
import couponsReducer from './couponsReducer';
import addonReducer from './addonReducer';
import durationsReducer from './durationsReducer';


export default combineReducers({
  addons: addonReducer,
  auth: authReducer,
  categories: categoryReducer,
  packages: packagesReducer,
  pageSections: pageSectionReducer,
  faqs: faqsReducer,
  blogs: blogsReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  stripeSetting: stripeSettingReducer,
  coupons: couponsReducer,
  durations:durationsReducer
});
