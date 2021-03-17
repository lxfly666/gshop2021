<template>
    <div>
      <router-view/>
      <FooterGuide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
    import FooterGuide from './components/FooterGuide/FooterGuide'
    import {reqFoodCategories} from './api/'

    export default {

      async mounted(){
/*        const result = await reqFoodCategories();
        console.log(result);*/
        this.$store.dispatch("getAddress");
        this.$store.dispatch("getUserInfo");
      },

      components: {
        FooterGuide
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
