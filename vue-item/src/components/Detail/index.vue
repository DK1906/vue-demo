<template>
  <div class="detailList">
    <Header title="电影详情"></Header>
    <div class="commentContent" v-if="flag">
      <textarea placeholder="请输入评价..." v-model="comment"></textarea>
      <span @click="flag=false">取消</span>
      <p @click="express()">发表</p>
    </div>
    <div class="detailImg">
      <img
        v-if="this.$store.state.detailMovie.img"
        :src="this.$store.state.detailMovie.img | setWH('128.180')"
        alt
      />
    </div>
    <div class="allDetail">
      <p class="detailDra">简介：{{this.$store.state.detailMovie.dra}}</p>
      <p>类型：{{this.$store.state.detailMovie.cat}}</p>
      <p>导演：{{this.$store.state.detailMovie.dir}}</p>
      <p>主演：{{this.$store.state.detailMovie.star}}</p>
      <p style="font-size:20px;">中文名：{{this.$store.state.detailMovie.nm}}</p>
      <p>英文名：{{this.$store.state.detailMovie.enm}}</p>
      <p style="margin-bottom:0;">上映时间：{{ this.$store.state.detailMovie.rt}}</p>
    </div>
    <div class="comment">
      <div class="join">
        <span @click="joinComment">参与评价</span>
      </div>
      <ul class="commentList">
        <li v-for="(item,i) in this.$store.state.allComments" :key="i">
          <div class="name">
            <img class="photo" v-if="item.avatar" :src="item.avatar.replace(/public/,'http://123.56.106.124:1906' )" alt />
            <!-- <p class="photo">{{item.avatar.replace(/public/,"http://hostname:1906")}}</p> -->
            <span class="username">用户：{{item.username}}</span>
          </div>
          <!-- <div class="comment-right"> -->

          <p class="comment">内容：{{item.comment}}</p>
          <span class="time">发表于：{{item.time}}</span>
          <!-- </div> -->
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "detail",
  data() {
    return {
      comment: "",
      flag: false
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.axios
      .get("/api/detailMovie?movieId=" + this.$route.params.movieId)
      .then(res => {
        //    this.detailMovie = res.data.data.detailMovie;
        //  console.log(res.data.data.detailMovie.img)
        var detailMovie = res.data.data.detailMovie;
        this.$store.commit("getDetailMovie", detailMovie);
        console.log(this.$store.state.detailMovie);
        // console.log(this.$store.state.detailMovie.nm)
        //获取所有评论
        this.axios
          .get("/vue/getAllComments", {
            params: {
              nm: this.$store.state.detailMovie.nm
            }
          })
          .then(res => {
            // console.log(333)
            console.log(res.data.result);
            var result = res.data.result;
            this.$store.commit("getAllComments", result);
          });
      });
  },
  // beforeUpdate(){
  //    this.axios.get('/vue/getAllComments',{params:{
  //       nm:this.$store.state.detailMovie.nm
  //     }}).then(res=>{
  //       // console.log(333)
  //       console.log( res.data.result)
  //       var result = res.data.result;
  //       this.$store.commit('getAllComments',result)

  //     })
  // },
  methods: {
    joinComment() {
      this.flag = true;
    },
    express() {
 if(sessionStorage.userInfo){
        var username = JSON.parse(sessionStorage.userInfo).username;
      this.axios.get("/vue/getAvatar", { params: { username } }).then(res => {
        // console.log(res.data.result.avatar);
        var avatar = res.data.result.avatar;
        var comment = this.comment;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var time = `${year}-${month}-${day}/${hour}:${minute}:${second}`;

        this.axios
          .post("/vue/expressComment", {
            username,
            avatar,
            comment,
            time,
            nm: this.$store.state.detailMovie.nm
          })
          .then(res => {
            console.log(res.data.result[0]);
            var result = res.data.result[0];
            this.$store.commit("saveComment", result);

            this.axios
              .get("/vue/getAllComments", {
                params: {
                  nm: this.$store.state.detailMovie.nm
                }
              })
              .then(res => {
                // console.log(333)
                console.log(res.data.result);
                var result = res.data.result;
                this.$store.commit("getAllComments", result);
              });
          });
      });

      this.flag = false;
 }else{
   this.$router.push({name:'login'})
 }
    }
  }
};
</script>

<style  scoped>
/* .detailList{
    overflow: hidden;
} */
.detailList {
  margin-top: 50px;
}
.commentContent {
  position: fixed;
  width: 100%;
  z-index: 100;
  height: 100%;
  background: rgba(110, 110, 110, 0.8);
}
.commentContent textarea {
  margin-top: 50px;
  width: 100%;
  height: 50%;
  border: #000 1px solid;
}
.commentContent p {
  float: right;
  background-color: rgb(241, 9, 9);
  padding: 10px 20px;
  border-radius: 10px;
  /* font-weight: bold; */
  color: black;
  font-weight: bold;
}
.commentContent span {
  float: left;
  margin-top: 10px;
  background-color: rgb(241, 9, 9);
  padding: 10px 20px;
  border-radius: 10px;
  /* font-weight: bold; */
  color: black;
  font-weight: bold;
}
.detailImg img {
  float: left;
  /* width: 300px; */
}
.allDetail {
  background-color: rgb(209, 186, 144);
  font-weight: bold;
  border-radius: 5px;
  text-align: left;
}
.allDetail p {
  color: black;
}
.allDetail .detailDra {
  /* float: right; */
  /* width: 250px; */
  /* z-index: -100; */
  margin-bottom: 30px;
  text-indent: 30px;
  font-size: 14px;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  color: rgba(90, 87, 87, 0.931);
  /* opacity:0.9; */
  /* background-color: #000 */
}
.comment {
  text-align: left;
}
.comment .join {
  background-color: rgb(209, 186, 144);
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.comment .join span {
  float: right;
  background-color: rgb(241, 9, 9);
  padding: 5px;
  border-radius: 10px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.8);
}
.comment ul li {
  border-top: 1px solid #000;
  width: 100%;
}

.commentList {
  margin-bottom: 80px;
  /* background-color: grey; */
}
.commentList .name {
  display: flex;
  /* background-color: blue; */
}
.commentList li {
  overflow: hidden;
  /* background-color: cyan; */
  border-bottom: 1px dashed grey;
  border-top: 1px solid grey;
  margin-bottom: 3px;
}

.commentList .photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* float: left; */
  /* background-color: aqua; */
}

.commentList .username {
  flex: 1;

  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
}
.commentList .comment {
  text-indent: 24px;
  font-size: 12px;
  width: 200px;
  /* background-color: aqua; */
}
.commentList .time {
  font-size: 12px;
}
</style>