import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

Storage.prototype.setExpire = (key, value, expire) => {
	let obj = {
	  data: value,
	  time: Date.now(),
	  expire: expire
	};
  localStorage.setItem(key, JSON.stringify(obj));
  console.log('getting');
}

Storage.prototype.getExpire = key => {
    let val = localStorage.getItem(key);
    if (!val) {
      return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
      localStorage.removeItem(key);
      return null;
    }
    return val.data;
}

export default new Vuex.Store({
  state: {
    jwt: localStorage.getExpire("jwt"),
    username: localStorage.getItem("username"),
    nickname: localStorage.getItem("nickname"),
    userId: Number(localStorage.getItem("userId")),
    currPostId: Number(localStorage.getItem("currPostId")),
    homePageNumber: Number(localStorage.getItem("homePageNumber")),
    postPageNumber: Number(localStorage.getItem("postPageNumber")),
    userPageNumber: Number(localStorage.getItem("userPageNumber")),
    browseUserId: Number(localStorage.getItem("browseUserId")),
    browseNickname: localStorage.getItem("browseNickname")
  },
  mutations: {
    loginSuccess(state, payload) {
      //console.log(state);
      localStorage.setExpire("jwt", payload.jwt, 86400000);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("nickname", payload.nickname);
      localStorage.setItem("userId", payload.userId);
      localStorage.setItem("homePageNumber", 1);
      localStorage.setItem("postPageNumber", 1);
      localStorage.setItem("userPageNumber", 1);
      localStorage.setItem("browseNickname", payload.nickname);
      localStorage.setItem("browseUserId", payload.userId);
      
      //localStorage.setItem("currPostId", payload.currPostId);
      state.jwt = payload.jwt;
      state.username = payload.username;
      state.nickname = payload.nickname;
      state.userId = payload.userId;
      state.browseUserId = payload.userId;
      state.browseNickname = payload.nickname;
      state.homePageNumber = 1;
      state.postPageNumber = 1;
    },
    logoutSuccess(state) {
      localStorage.setItem("jwt", "");
      state.jwt = "";
    },
    jumptoPost(state, payload) {
      localStorage.setItem("currPostId", payload.id);
      localStorage.setItem("postPageNumber", 1);
      state.currPostId = payload.id;
      state.postPageNumber = 1;

      //console.log("state.currPostId=", state.currPostId);
      //console.log("payload.id=", payload.id);
    },
    jumptoUserPost(state, payload) {
      localStorage.setItem("browseUserId", payload.userId);
      localStorage.setItem("browseNickname", payload.nickname);
      localStorage.setItem("userPageNumber",1);
      state.browseUserId = payload.userId;
      state.browseNickname = payload.nickname;
      state.userPageNumber = 1;
    },
    homeChangePage(state, payload) {
      state.homePageNumber += payload;
      localStorage.setItem("homePageNumber", state.homePageNumber);
      //console.log(state.homePageNumber);
    },
    postChangePage(state, payload) {
      state.postPageNumber += payload;
      localStorage.setItem("postPageNumber", state.postPageNumber);
    },
    userChangePage(state, payload) {
      state.userPageNumber += payload;
      localStorage.setItem("userPageNumber", state.userPageNumber);
    }
  },
  actions: {},
  modules: {}
});
