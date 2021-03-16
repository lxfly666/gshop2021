<template>
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categoriesArr.length>0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(cs,index) in categoriesArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(c,index2) in cs" :key="index2">
                <div class="food_container">
                  <img :src="imageBaseUrl+c.image_url">
                </div>
                <span>{{c.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" v-else>
      </nav>
      <!--首页附近商家-->
      <ShopList/>
    </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import Swiper from 'swiper'
  import {mapState} from 'vuex';
  import ShopList from '../../components/ShopList/ShopList'


  export default {
      mounted(){

        this.$store.dispatch("getCategories");
        this.$store.dispatch("getShops");

      },
      data() {
        return {
          imageBaseUrl: 'https://fuss10.elemecdn.com'
        }
      },
      computed:{
        ...mapState(['address','categories','userInfo']),

        categoriesArr(){
          const {categories} = this;
          const max = 8;
          const arr = [];

          let smallArr = [];
          categories.forEach((item, index)=>{
            if(smallArr.length===0){
              arr.push(smallArr);
            }
            smallArr.push(item);
            if(smallArr.length===max){
              smallArr=[];
            }
          });

          return arr;
        }
      },

      components:{
        HeaderTop,
        ShopList
      },

      watch:{
        categories(value){
/*          setTimeout(()=>{
            new Swiper('.swiper-container',{
              loop: true,
              pagination: {
                el: '.swiper-pagination'
              }
            })
          },100)*/

          this.$nextTick(()=>{
            new Swiper('.swiper-container',{
              loop: true,
              pagination: {
                el: '.swiper-pagination'
              }
            })
          })
        }
      }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'swiper/dist/css/swiper.min.css'
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
