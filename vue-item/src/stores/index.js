import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // cities:[],
    commentList:[],
    cityInfo:[57,'武汉'],
    username:'',
    detailMovie:{},
    searchList:[],
    comingList:[],
    cinemaList:[],
    movieList:[],
    cityList:[],
    hotcity:[],
    ticketsInfoList:[],
    allComments:[],
    
  },
  mutations: {
    // getCities(state,cities){
    //   state.cities=cities;
    // },
    getAllComments(state,allComments){
        state.allComments=allComments
    },
    updateCommentList(state,commentList){
        state.commentList = commentList
    },
    saveComment(state,comment){
        state.commentList.push(comment);
    },
    getCity(state,cityInfo){
      state.cityInfo = cityInfo;
    },
    

    formatCityList(state,list){
      var  {cityList,hotcity}=list;
      state.cityList=cityList;
      state.hotcity=hotcity;

    },
    getMovieList(state,movieList){
      state.movieList = movieList;
    },
    getCinemaList(state,cinemaList){
      state.cinemaList =cinemaList;
    },
    getComingList(state,comingList){
      state.comingList =comingList;
    },
    getSearchList(state,searchList){
      state.searchList = searchList
    },
    getDetailMovie(state,detailMovie){
      state.detailMovie = detailMovie;
    },
    getUsername(state,username){
      state.username = username;
    },
    ticketsInfoList(state,ticketsInfoList){
      state.ticketsInfoList=ticketsInfoList
    }
  },
  actions: {
    // getCities({commit},url){
    //   axios.get(url).then(res=>{
    //      //   自动提交 mutation
    //      console.log( res.data.data.cities)
    //      commit("getCities", res.data.data.cities)
    //   })
    // }
  }
})
