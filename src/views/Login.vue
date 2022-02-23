<template>
    <div class="login">
        <header>
            TalQue
        </header>
        <main>
            <LoginBox class="loginbox"/>
        </main>
    </div>
</template>

<script>
import LoginBox from "@/components/LoginBox.vue";

export default {
    name: "Login",
    components: {
        LoginBox
    }    
};
</script>

<style lang="stylus" scoped>
    header
        font-size 120px
        color #ff7529
        font-family Cochin, Times New Roman, Times, serif
        font-weight bolder
        margin 60px auto
        user-select none
    .loginbox
        margin 100px auto
</style>