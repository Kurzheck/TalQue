<template>
    <div class="postlist">
        <PostCard v-for="post in posts" :key="post.id"
        v-bind="post" />
        <PageSwitch v-if="totalPage > 1" @page="changePage" :currPage="currPage" :totalPage="totalPage"/>
    </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import PageSwitch from "@/components/PageSwitch.vue";
export default {
    data() {
        return {
            posts: [],
            size: 10,
            totalPage: null
        };
    },
    props: {
        isHome: Boolean
    },
    computed: {
        currPage() {
            if (this.isHome) {
                return this.$store.state.homePageNumber;
            }
            return this.$store.state.userPageNumber;
        }
    },
    components: {
        PostCard,
        PageSwitch
    },
    methods: {
        postDetail() {
            this.$router.push('/post');
        },
        changePage(delt) {
            if (this.isHome) {
                this.$store.commit("homeChangePage", delt);
                this.$axios
                .get("/api/v1/post?page="
                    + String(this.currPage)
                    + "&size=" + String(this.size), {
                    headers: {
                        "authorization": this.$store.state.jwt
                    }
                })
                .then(response => {
                    this.posts = response.data.posts;
                    this.totalPage = Math.ceil(response.data.total/this.size);
                })
                .catch(error => {
                    console.log(error);
                    alert("Something went wrong.");
                });
            }
            else {
                this.$store.commit("userChangePage", delt);
                this.$axios
                .get("/api/v1/post?page="
                    + String(this.currPage)
                    + "&size=" + String(this.size)
                    + "&userId=" + String(this.$store.state.browseUserId), {
                    headers: {
                        "authorization": this.$store.state.jwt
                    }
                })
                .then(response => {
                    this.posts = response.data.posts;
                    this.totalPage = Math.ceil(response.data.total/this.size);
                })
                .catch(error => {
                    console.log(error);
                    alert("Something went wrong.");
                });
            }
            window.scrollTo(0, 0);
        }
    },
    created() {
        if (this.isHome) {
            this.$axios
                .get("/api/v1/post?page="
                    + String(this.currPage)
                    + "&size=" + String(this.size), {
                    headers: {
                        "authorization": this.$store.state.jwt
                    }
                })
                .then(response => {
                   this.posts = response.data.posts;
                   this.totalPage = Math.ceil(response.data.total/this.size);
                })
                .catch(error => {
                   console.log(error);
                   alert("Something went wrong.");
            });
        }
        else {
            this.$axios
                .get("/api/v1/post?page="
                    + String(this.currPage)
                    + "&size=" + String(this.size)
                    + "&userId=" + String(this.$store.state.browseUserId), {
                    headers: {
                        "authorization": this.$store.state.jwt
                    }
                })
                .then(response => {
                   this.posts = response.data.posts;
                   this.totalPage = Math.ceil(response.data.total/this.size);
                })
                .catch(error => {
                   console.log(error);
                   alert("Something went wrong.");
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
</style>