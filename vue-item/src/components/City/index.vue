<template>
   
     <div class="city_body">
         <!-- <Header title="城市"></Header> -->
          <div class="city_list">
  <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="(hot,i) in this.$store.state.hotcity" :key="i" @click="getCity([hot.id,hot.nm])">{{ hot.nm}} </li>
                  
                </ul>
            </div>

             <div class="city_sort" ref="city_sort">
                <div v-for="(city,j) in this.$store.state.cityList" :key="j">
                    <h2>{{ city.index}}</h2>
                    <ul>
                        <li v-for="(nm,k) in city.list" :key="k" @click="getCity([nm.id,nm.nm])">{{ nm.nm }}</li>
                       
                    </ul>
                </div>
                
            </div>
              </div>
               <div class="city_index">
            <ul>
                <li  v-for="(city,j) in this.$store.state.cityList" :key="j"  @touchstart="toIndex(j)">{{ city.index}}</li>
                
            </ul>
        </div>

         </div>
</template>

<script>
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import store  from "@/stores";
// import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
export default {
     name:"City",
    data(){
        return {
            // cityList:[],
            // hotcity:[]

        }
    },
   
    created(){

    },
    mounted(){
        this.axios.get("/api/cityList").then(res=>{
            var cities = res.data.data.cities;
            //  var {cityList,hotcity}=this.formatCityList(cities);
            //  this.hotcity = hotcity;
            //  this.cityList = cityList;
             var list=this.formatCityList(cities)
        this.$store.commit('formatCityList',list)
        })
        // this.$store.dispatch("getCities","/api/cityList");
        // console.log(this.$store.state.cities);
       

    },
    components:{
       
        
    },
    methods:{
        getCity(cityInfo){
                this.$store.commit('getCity',cityInfo)
        },
        toIndex(index){
                var h2List = this.$refs.city_sort.getElementsByTagName('h2');
                this.$refs.city_sort.parentNode.scrollTop=  h2List[index].offsetTop;
        },
        formatCityList(cities){
                var cityList = [];
                var hotcity = [];

                for(var i = 0;i<cities.length;i++){
                    if(cities[i].isHot==1){
                        hotcity.push(cities[i]);
                    }
                }




                for(var i = 0;i<cities.length;i++){
                    var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                    if(toCom(firstLetter)){ //新增index
                        cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
                    }else{  //添加到已有index
                   for(var j = 0;j<cityList.length;j++){
                       if(cityList[j].index===firstLetter){
                           cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                       }
                   }
                    }
                }

                cityList.sort((n1,n2)=>{
                    if(n1.index > n2.index){
                        return 1;
                    }else if(n1.index < n2.index){
                        return -1;
                    }else{
                        return 0;
                    }
                })

                function toCom(firstLetter){
                    for(var j = 0;j<cityList.length;j++){
                        if(cityList[j].index===firstLetter){
                            return false;
                        }
                    }
                    return true;
                }

             return {
                 cityList,
                 hotcity
             }  
        }
    }
}
</script>

<style  scoped>
    #content .city_body{
        
        margin-top: 100px;
        display: flex;
        width: 100%;
      
        position: absolute;
        top: 0;bottom: 0; 
        /* background-color: black; */
    }
    .city_body .city_list{
        flex:1;
        overflow: auto;
        background: #fff5f0;
    }
     .city_body .city_list::-webkit-scrollbar{
            background-color: transparent;
            width: 0;
     }
     .city_body .city_hot{
         margin-top: 20px;
     }
     .clearfix{
 overflow: hidden;

     }
      .city_body .city_hot h2{
          padding-left: 15px;
          line-height: 30px;
          font-size: 14px;
          background: #f0f0f0;
          font-weight: normal;
      }
       /* .city_body .city_hot ul{} */
       .city_body .city_hot ul li{
           float: left;
           background: #fff;
           width: 25%;
           height: 33px;
           margin-top: 15px;
           margin-left: 3%;
           padding:0 4px ;
           border: 1px #e6e6e6 solid;
           line-height: 33px;
       }
       .city_body .city_sort {
           text-align: left;
       }
       .city_body .city_sort div{
           margin-top: 20px;
       }
         .city_body .city_sort h2{ padding-left: 15px;line-height: 30px;
         font-size: 14px;
         background: #f0f0f0;
         font-weight: normal;
         }
          .city_body .city_sort ul{
              padding-left: 10px;
              margin-top: 10px;
          }
           .city_body .city_sort ul li{
               line-height: 30px;

           }
            .city_body .city_index{
                /* margin-top: 100px; */
                width: 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                border-left: 1px solid #e6e6e6;
                border-radius: 3px;
                line-height: 21px;
                text-align: center;
                box-sizing: border-box;
               /* background-color: #fff; */
            
            }




</style>