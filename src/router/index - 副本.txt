import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Layout/Home.vue';
import Login from '../views/Login.vue';
import store from '../store';
import getMenuRoutes from '../utils/permission';
Vue.use(Router);
const asyncRouteMap=[
  {
    path:'/product',
    name:'product',
    meta:{
      title:'商品',
      hidden:false,
      icon:'home'
    },
    component:Home,
    children:[
      {
        path:'list',
        name:'productList',
        meta:{
          title:'商品列表',
          hidden:false,
          icon:'unordered-list'
        },
        component:()=>import('../views/ProductList.vue')
      },
      {
        path:'add',
        name:'addProduct',
        meta:{
          title:'添加商品',
          hidden:false,
          icon:'medicine-box'
        },
        component:()=>import('../views/AddProduct.vue'),
      },
      {
        path:'edit/:id',
        name:'editProduct',
        meta:{
          title:'编辑商品',
          hidden:true,
          icon:'edit'
      },
        component:()=>import('../views/EditProduct.vue'),
      },
      {
        path:'category',
        name:'category',
        meta:{
          title:'商品管理',
          hidden:false,
          icon:'project'
        },
        component:()=>import('../views/Category.vue'),
      }
    ]
  },
]

const routes=[
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:{
      name:'index'
    },
    meta:{
      title:'首页',
      hidden:false,
      icon:'home'
    },
    children:[{
      path:'index',  //
      name:'index',
      component:()=>import('../views/Index.vue'),
      meta:{
        title:'统计',
        hidden:false,
        icon:'area-chart'
      },
    }],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title:'登录',
      hidden:true,
      icon:'login'

    },
  },
  {
    path: '/about',
    name: 'about',
    meta:{
      title:'关于',
      hidden:true,
      icon:'setting'
    },
    component: ()=>import('../views/About.vue'),
  },
  // {
  //   path:'/notFound',
  //   name:'notFound',
  //   meta:{
  //     hidden:true,
  //   },
  //   component:()=>import('../views/notFound.vue'),
  // },
  // {
  //   path:'*',
  //   redirect:{path:'/notFound'},
  //   meta:{
  //     hidden:true,
  //   },
  // }
]
const router=new Router({
  routes,
});
export default router;
let isAddRoutes=false;
router.beforeEach((to,from,next)=>{
  if(to.path!=='/login'){
    if(store.state.user.appkey && store.state.user.username && store.state.user.email &&store.state.user.role){
      if(!isAddRoutes){
        const resultRoutes=getMenuRoutes(asyncRouteMap,store.state.user.role);
        store.dispatch('changeMenuRoutes', routes.concat(resultRoutes)).then(()=>{
        router.addRoutes(resultRoutes);
        next();
        });
        isAddRoutes=true;
      }
    }
    else{
      next('/login');
    }
  }
  next();
})
