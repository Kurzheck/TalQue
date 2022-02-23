<template>
  <div class="home">
    <Profile v-if="showProfile" @close="showProfile=false" />
    <header>
        <div class="logo">TalQue</div>
        <div><User @userclick="showProfile=true" /></div>
    </header>
    <main>
      <button class="write" @click="gotoEditor">T</button>
      <PostList :isHome="true" />
      <editor ref="editor" :isReply="false" @send-post="sendPost"/>
    </main>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import User from "@/components/User.vue";
import Editor from "@/components/Editor.vue";
import Profile from "@/components/Profile.vue";
export default {
  name: "Home",
  components: {
    PostList,
    User,
    Editor,
    Profile
  },
  data() {
    return {
      myPost: null,
      showProfile: false
    };
  },
  methods: {
    gotoEditor() {
      window.scrollTo(0, 100000000);
      this.$nextTick(() => {
        this.$refs.editor.$refs.title.focus();
      });
    },
    sendPost(title, content) {
      this.myPost = {
        "title": title,
        "content": content
      };
      this.$axios({
        method: "post",
        url: "/api/v1/post/",
        headers: {
          "authorization": this.$store.state.jwt
        },
        data: this.myPost
      })
      .then(() => {
          location.reload();
          alert('Successfully posted!');
      })
      .catch(error => {
        alert("Something went wrong.");
        console.log(error);
      });
      this.postTitle = "";
      this.postContent = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
  header
    display flex
    flex-flow row nowrap
    justify-content space-between
    position absolute
    top 0
    left 0
    width 100%
    height 70px
    color #ffffff
    font-family Cochin, Times New Roman, Times, serif
    font-weight bolder
    background-color #ff7529
    box-shadow 0px 2px 12px rgba(211,97,31,0.8)
    z-index 100000
  main
    position relative
    top 80px
  .logo
    margin-bottom 20px
    position relative
    bottom 15px
    user-select none
    left 40px
    font-size 72px
    font-weight bolder
  .user
    position relative
    user-select none
    bottom 0
  .write
    position fixed
    right 4%
    top 100px
    width 60px
    height 60px
    border-radius 30px
    background-color white
    color #ff7529
    font-family Cochin, Times New Roman, Times, serif
    font-size 40px
    box-shadow 0px 2px 8px rgba(144,144,144,0.6)
    transition all 200ms ease-in-out
  .write:hover
    background-color #ff7529
    color white
    box-shadow 0px 2px 16px rgba(214,76,1,0.6)
</style>
