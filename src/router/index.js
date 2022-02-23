import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import UserPost from "../views/UserPost.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/post",
    name: "Post",
    component: Post
  },
  {
    path: "/userpost",
    name: "UserPost",
    component: UserPost
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && !store.state.jwt) {
        next('/login');
    }
    else {
        next();
    }
})

export default router;
