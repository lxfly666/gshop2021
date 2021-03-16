import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
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

  async getShopRatings({commit}) {
    const result = await reqShopRatings();
    if(result.code===0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS, {ratings});
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


}
















