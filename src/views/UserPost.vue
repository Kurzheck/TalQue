<template>
    <div class="userpost">
        <button class="backhome" @click="enterHome">Home</button>
        <header>
            {{ nickname }}'s Posts
        </header>
        <main>
            <PostList />
        </main>
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";

export default {
    name: "UserPost",
    components: {
        PostList
    },
    data() {
        return {
            userId: this.$store.state.browseUserId,
            nickname: this.$store.state.browseNickname
        };
    },
    methods: {
        enterHome() {
            this.$router.push("/");
        }
    }
};
</script>

<style lang="stylus" scoped>
    header
        height 50px
        padding-top 30px
        font-size 36px
        font-weight bold
    .backhome
        transition all 100ms ease-in-out
        font-weight bold
        width 60px
        height 60px
        margin 0 10px
        border-radius 30px
        font-size 18px
        border 0
        outline none
        position absolute
        left 36px
        top 36px
        color #ff7529
        background-color white
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
    .backhome:hover
        color white
        background-color #ff7529
        box-shadow 0px 3px 12px rgba(214,76,1,0.6)
</style>