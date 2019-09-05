<template>
    <div class="search_body"> 
     <div class="search_input">
       <div class="search_input_wrapper">
       <van-icon name="search" tag="i"/>
         <input type="text" v-model='message' style="height:30px;line-height:30px;">
       </div>
     </div>
   <div class="search_result">
     <h3>  <van-icon name="apps-o" /></h3>
     <ul>
       <li v-for="(search,i) in  this.$store.state.searchList" :key="i" >
          <div class="img"><img :src="search.img | setWH('128.180')" alt="" ></div>
          <div class="info">
            <p><span>{{search.nm }}</span><span  class="second-span">{{ search.sc}}</span></p>
            <p>{{search.enm }}</p>
              <p> {{search.cat}}</p>
              <p>{{ search.pubDesc}}</p>
           
          </div>
       </li>
       
     </ul>
   </div>
    </div>
</template>

<script>

export default {
    name:"Search",
    data(){
     return {
       message:'',
      //   searchList:[]
     }
    },
    watch:{
      message(newVal){
      
     
                 this.axios.get('/api/searchList?cityId=10&kw='+newVal).then(res=>{
        console.log(res)
     if(res.data.msg&& res.data.data.movies){
          var searchList = res.data.data.movies.list;
          this.$store.commit('getSearchList',searchList)
          // console.log(this.searchList)
     }
      })
       
        
      }
    }
}
</script>

<style  scoped>
#content  .search_body{
 margin-top: 100px;
  flex:1;
  overflow: auto;
}
.search_body .search_input{
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #5e5e5e;
}
.search_body .search_input_wrapper{
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 12px 0;

}
.search_body .search_input_wrapper input{
  border :0;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;



}
.search_body .search_result h3{
  text-align: left;
  font-size: 15px;
  color: #999;
  padding: 9px 15px ;
  border-bottom: 1px solid #e6e6e6;


}
.search_body .search_result li{
  border-bottom: 1px dashed #c9c9c9;
  padding: 10px 15px;
 box-sizing: border-box;
 display: flex;
}
.search_body .search_result .img{
  width: 60px;
  float: left;
}
.search_body .search_result .img img{
  width: 100%;
} 
.search_body .search_result .info{
 float: left;
  margin-left: 15px;
  flex: 1;

}
.search_body .search_result .info p{
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size:12px;
} 
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){
  text-align: left;
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info .second-span{
  font-size: 16px;
  color: #fc7103;
}

</style>