import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import movieRouter from "./movie"
import mineRouter from "./mine"
import cinemaRouter from "./cinema"
import loginRouter from "./login"

Vue.use(Router)

export default new Router({
  mode:"hash",
  // base
  routes: [
   
    movieRouter,
    mineRouter,
    cinemaRouter,
    loginRouter,
    {
      path:'/ticketList/:movieId?/:nm?/:addr?',
      name:'ticketList',
      component:()=>import("@/views/TicketList.vue"),
    },
    {
      path:'/chooseSet/:time?/:money?/:nm?/:cinema?',
      name:'chooseSet',
      component:()=>import("@/views/ChooseSet.vue"),
    },
    {
      path:'/myOrders',
      name:'myOrders',
      component:()=>import("@/views/MyOrders.vue"),
    },
    {
      path:'/myComment',
      name:'myComment',
      component:()=>import("@/views/MyComment.vue"),
    },
    {
              path:'/detail/:movieId?',
              name:"detail",
              component:()=>import("@/components/Detail"),

      },
    {
      path:"**",
      redirect:"/movie"
    }




    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
