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

import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORIES](state,{categories}){
    state.categories = categories
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops;
  },
  [RECEIVE_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO](state){
    state.userInfo = {};
  },
  [RECEIVE_INFO](state, {info}){
    state.info = info;
  },
  [RECEIVE_RATINGS](state, {ratings}){
    state.ratings = ratings;
  },
  [RECEIVE_GOODS](state, {goods}){
    state.goods = goods;
  },
  [INCREMENT_GOOD_COUNT](state,{food}){
    if(!food.count){
      //food.count = 1;
      Vue.set(food,'count',1)
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  [DECREMENT_GOOD_COUNT](state, {food}){
    if(food.count){
      food.count--;
      if(food.count==0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    state.cartFoods.forEach((food)=>{
      food.count = 0
    })
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOP](state,{searchShops}){
    state.searchShops = searchShops
  }
}
