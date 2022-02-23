<template>
    <div class="user">
        <button class="nickname" @click="$emit('userclick')">{{ $store.state.nickname }}</button>
        <button class="logout" @click="logOut">Logout</button>
    </div>
</template>

<script>
export default {
    methods: {
        logOut() {
            console.log('logout');
            this.$axios({
                method: "patch",
                url: "/api/v1/logout",
                headers: {
                    "authorization": this.$store.state.jwt
                }
            })
            .then(() => {
                this.$router.push('/login');
                this.$store.commit("logoutSuccess");
                alert("You are logged out");
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong.");
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    button
        border 0
        background-color #ff7529
        color white
        height 30px
        font-weight bold
        outline none
        transition all 100ms ease-in-out
    .logout
        height 30px
        width 72px
        border-radius 10px
        font-size 16px
    .logout:hover
        background-color white
        color #ff7529
    .user
        display flex
        flex-flow row nowrap
        margin 20px 20px
    .nickname
        font-size 22px
        font-family Avenir, Helvetica, Arial, sans-serif
        font-weight normal
        padding 0 20px
    .nickname:hover
        font-weight bolder
</style>