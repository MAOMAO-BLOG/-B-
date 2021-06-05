<template>
  <div class='main-header'>
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class='breadcrumb'>
           <a-breadcrumb>
          <a-breadcrumb-item>{{currentRoute[0].meta.title}}</a-breadcrumb-item>
          <a-breadcrumb-item><router-link :to='{name:currentRoute[1].name}'>{{currentRoute[1].meta.title}}</router-link></a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <ul class='user-info'>
        <li>欢迎{{user.username}} <a-icon type="down" /></li>
        <li @click.prevent='handleClick'>退出</li>
        </ul>
  </div>
</template>
<script>
import {mapMutations,mapActions,mapState} from 'vuex';
export default {

  watch:{
    $route(){
      this.currentRoute=this.$route.matched;
    }
  },
  data(){
    return {
      currentRoute:this.$route.matched,
    }
  },
    computed:{
        ...mapState(['collapsed','user']),
    },
     methods: {
         ...mapMutations(['setCollapsed']),
         ...mapActions(['loginOut']),
        toggleCollapsed() {
      this.setCollapsed(!this.collapsed);
    },
    handleClick(){
      const flag=window.confirm('确定退出？');
      if(flag){
        this.$router.push({name:'login'});
        this.loginOut();
      }
    }
  },
}
</script>
<style>
  
</style>

