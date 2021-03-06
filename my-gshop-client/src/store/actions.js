import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_GOOD_COUNT,
  DECREMENT_GOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOP
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'

export default {
  async getAddress({commit,state}){
    const geohash = state.latitude+','+state.longitude;
    const result = await reqAddress(geohash);
    if(result.code===0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address});
    }
  },
  async getCategories({commit,state}){
    const result = await reqFoodCategories();
    if(result.code===0){
      const categories = result.data
      commit(RECEIVE_CATEGORIES, {categories});
    }
  },
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude);
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops});
    }
  },
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo});
  },

  async getUserInfo({commit}) {
    const result = await reqUserInfo();
    if(result.code===0){
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, {userInfo});
    }
  },

  async logout({commit}) {
    const result = await reqLogout();
    if(result.code===0){
      commit(RESET_USER_INFO);
    }
  },

  async getShopRatings({commit},callback) {
    const result = await reqShopRatings();
    if(result.code===0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS, {ratings});
      callback&&callback()
    }
  },

  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if(result.code===0){
      const info = result.data;
      info.score = 3.5
      commit(RECEIVE_INFO, {info});
    }
  },

  async getShopGoods({commit},callback) {
    const result = await reqShopGoods();
    if(result.code===0){
      const goods = result.data;
      commit(RECEIVE_GOODS, {goods});
      callback&&callback()
    }
  },

  updateFoodCount({commit,state},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_GOOD_COUNT,{food})
    }else{
      commit(DECREMENT_GOOD_COUNT,{food})
    }
  },

  clearCart({commit,state}){
    commit(CLEAR_CART)
  },

  async searchShops({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if(result.code === 0){
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOP,{searchShops});
    }else{
      const arr = []
      commit(RECEIVE_SEARCH_SHOP,{arr});
    }
  }
}
















