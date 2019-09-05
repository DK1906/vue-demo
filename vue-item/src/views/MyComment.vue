<template>
  <div>
    <div class="commentContent" v-if="flag">
      <textarea placeholder="请输入评价..." v-model="comment"></textarea>
      <span @click="flag=false">取消</span>
      <p @click="express()">确认修改</p>
    </div>
    <Header title="我的评价"></Header>
    <ul v-for="(item,i) in this.$store.state.commentList" :key="i" class="commentList">
      <li>
        <div class="name">
          <div class="img">
            <img
              v-if="item.avatar"
              :src="item.avatar.replace(/public/,'http://123.56.106.124:1906' )"
              alt
            />
          </div>
          <p class="username">{{item.username }}</p>
        </div>

        <p class="nm">《{{item.nm }}》</p>
        <p class="comment">发表内容：{{item.comment }}</p>
        <p>发表于：{{item.time }}</p>
        <span class="change" @click="changeComment(item.comment,item.username,item.nm,item.time)">修改</span>
        <span class="delete" @click="deleteComment(item.username,item.nm,item.time,$event)">删除</span>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      flag: false,
      comment: "",
      nm: "",
      time: ""
    };
  },
  components: {
    Footer,
    Header
  },
  methods: {
    changeComment(comment, username, nm, time) {
      console.log(comment, username, nm, time);
      this.flag = true;
      this.comment = comment;
      this.nm = nm;
      this.time = time;
      // this.axios.post('/vue/updateComment',{
      //   comment,
      //   nm,
      //   time,
      //   username
      // }).then(res=>{
      //   console.log(res)
      // })
    },
    deleteComment(username, nm, time, e) {
      console.log(username, nm, time);
      this.axios
        .post("/vue/deleteComment", {
          username,
          nm,
          time
        })
        .then(res => {
          console.log(res.data.result);
          if (res.data.result.deletedCount) {
            e.target.parentNode.remove();
          }
        });
    },

    express() {
      //   console.log(this.comment)
      this.flag = false;
      var username = JSON.parse(sessionStorage.userInfo).username;
      this.axios
        .post("/vue/changeComment", {
          username,
          nm: this.nm,
          time: this.time,
          newcomment: this.comment
        })
        .then(res => {
          console.log(res);
          if (res.data.result.ok) {
            this.axios
              .get("/vue/getNewComment", {
                params: {
                  username: JSON.parse(sessionStorage.userInfo).username
                }
              })
              .then(res => {
                console.log(res.data.result);
                var commentList = res.data.result;
                this.$store.commit("updateCommentList", commentList);

                // var
              });
          }
        });

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
    }
  },
  mounted() {
    this.axios
      .get("/vue/getNewComment", {
        params: {
          username: JSON.parse(sessionStorage.userInfo).username
        }
      })
      .then(res => {
        console.log(res.data.result);
        var commentList = res.data.result;
        this.$store.commit("updateCommentList", commentList);

        // var
      });
    // var username = JSON.parse(sessionStorage.userInfo).username;
    // this.axios.get('/vue/getComment',{params:{username}}).then(res=>{
    // var result = res.data.result;
    //     this.$store.commit('saveComment',result)
    console.log(this.$store.state.commentList);

    // })
  }
};
</script>

<style scoped>
.commentList {
  margin-bottom: 80px;
  margin-top: 50px;
  /* background-color: grey; */
}
.commentList .name {
  display: flex;
}
.commentList li {
  overflow: hidden;
  /* background-color: cyan; */
  border-bottom: 1px dashed grey;
  border-top: 1px solid grey;
  margin-bottom: 3px;
}

.commentList .img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  float: left;
}
.commentList img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.commentList p {
  text-align: left;
  /* background-color: chocolate; */
  width: 100%;
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
}
.commentList .nm {
  font-weight: bold;
}
.commentList .change {
  float: left;
  color: red;
}
.commentList .delete {
  float: right;
  color: red;
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
</style>