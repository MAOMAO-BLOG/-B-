<template>
<div class='home' :key='key'>
  <LeftNav/>
  <div  :class='{ "main":true,"menu-fold":collapsed}'>
    <Header/>
    <router-view></router-view>
  </div>
</div>
</template>
<script>
import LeftNav from './components/LeftNav';
import Header from './components/Header';
import {mapState} from 'vuex';
export default {
   components:{
    LeftNav,
    Header
  },
  data(){
    return {
      key:new Date().getTime(),
    }
  },
  watch:{
    $route(){
      this.key=new Date().getTime();
    }
  },
  computed:{
        ...mapState(['collapsed']),
    }
};
</script>
<style lang='less'>
@import url('~@/assets/css/home.less');
</style>
