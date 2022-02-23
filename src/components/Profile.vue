<template>
    <div class="profile">
        <div class="mask">
            <div class="card">
                <h1>Profile</h1>
                <p>
                    <ul>
                        <li>User ID: {{ userId }}</li>
                        <li>User Name: {{ username }}</li>
                        <li>Nickname: {{ nickname }}</li>
                    </ul>
                </p>
                <button class="mypost" @click="enterUser">Posts</button>
                <button class="close" @click="$emit('close')">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: this.$store.state.userId,
            username: this.$store.state.username,
            nickname: this.$store.state.nickname
        }
    },
    methods: {
        enterUser() {
            this.$store.commit("jumptoUserPost", this);
            this.$router.push("/userpost");
        }
    }
};
</script>

<style lang="stylus" scoped>
    .mask
        position fixed
        top -20px
        margin auto auto
        width 100%
        height 120%
        z-index 9998
        background-color rgba(0,0,0,0.8)
    .card
        background-color white
        position fixed
        top 50%
        left 50%
        transform translate(-50%, -50%)
        padding 20px 20px
        margin auto auto
        border-radius 20px
        width 500px
        height 250px
        box-shadow 0px 4px 16px #000000
    p
        padding 0 50px
    ul
        text-align left
        font-size 20px
    li
        margin 10px
    h1
        color #ff7529
        font-size 40px
        margin 10px
    button
        height 50px
        border-radius 25px
        margin-left 10px
        color #ff7529
        font-size 18px
        font-weight bold
        background-color white
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
        border 0
        outline none
        transition all 100ms ease-in-out
    button:hover
        color white
        background-color #ff7529
        box-shadow 0px 3px 12px rgba(214,76,1,0.6)
    .close
        position absolute
        right 20px
        bottom 20px
        width 50px
    .mypost
        position absolute
        right 80px
        bottom 20px
        width 80px
</style>