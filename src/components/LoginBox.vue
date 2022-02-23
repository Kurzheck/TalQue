<template>
    <div class="loginbox">
        <ul>
            <li>
                <label>Username <input type='text' v-model="username"></label>
            </li>
            <li>
              <label>Password <input type='password' v-model="password"></label>
            </li>
            <li>
              <button id="button" @click="login">Login</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "LoginBox",
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        login() {
            this.$axios
                .patch("/api/v1/login", {
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    this.$store.commit('loginSuccess', response.data);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.log(error);
                    alert("Cannot Login.");
                });
        }
    }
};
</script>

<style scoped lang="stylus">
    *
        padding 5px
        margin 5px
        border 0
    input
        background-color #EEEEEE
        color #696969
        font-size 24px
        width 300px
        height 40px
        border-radius 10px
        padding 0
        padding-left 10px
        margin 0
        outline none
    button
        width 450px
        height 60px
        border-radius 10px
        background-color white
        color #ff7529
        font-size 36px
        font-weight bold
        box-shadow 0px 2px 8px rgba(144,144,144,0.6)
        transition all 200ms ease-in-out
        outline none
    button:hover
        background-color #ff7529
        color white
        box-shadow 0px 2px 16px rgba(214,76,1,0.6)
    li
        display block
        margin 20px
        font-size 30px
        font-weight bold
    label
        white-space pre
</style>>