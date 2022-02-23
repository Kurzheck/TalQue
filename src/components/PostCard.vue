<template>
    <div class="postcard" @click="enterPost">
        <div class="info">
            <div style="align-items:baseline">
                <span>Posted by </span>
                <span
                style="font-size:18px;font-weight:bold;user-select:none">
                    {{ nickname }}
                </span>
            </div>
            <div style="align-items:baseline">
                <span style="font-weight:bold">Posted: </span>{{createTime}}
                <span style="font-weight:bold"> Updated: </span>{{updateTime}}
            </div>
        </div>
        <div class="title">
            <h2>{{ title }}</h2>
        </div>
        <div class="content" v-html="content"></div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        userId: Number,
        nickname: String,
        title: String,
        content: String,
        lastRepliedUserId: Number,
        lastRepliedNickname: String,
        lastRepliedTime: String,
        created: String,
        updated: String
    },
    computed: {
        createTime() {
            let tmp = this.created.split("T");
            tmp[1] = tmp[1].split("+")[0];
            return tmp.join(" ");
        },
        updateTime() {
            let tmp = this.updated.split("T");
            tmp[1] = tmp[1].split("+")[0];
            return tmp.join(" ");
        }
    },
    methods: {
        enterPost() {
            this.$store.commit("jumptoPost", this);
            this.$router.push("/post");
        }
    }
};
</script>

<style scoped lang="stylus">\
    .postcard
        width 80%
        min-width 700px
        background-color white
        margin 20px auto
        box-shadow 0px 1px 4px rgba(144,144,144,0.8)
        border-radius 10px
        box-sizing border-box
        padding 10px
        text-align left
        transition all 200ms ease-in-out
        display flex
        flex-flow column nowrap
    .postcard:hover
        box-shadow 0px 4px 16px rgba(144,144,144,0.6)
    .content
        padding 15px
        background-color #eeeeee
        border-radius 8px
        word-break:break-all
        width auto
        overflow scroll
        max-height 500px
        flex-flow row wrap
    .title
        color black
        min-height 60px
        padding-left 10px
    .info
        display flex
        flex-direction row
        color #9e9e9e
        font-size 14px
        white-space pre
        align-items baseline
        justify-content space-between
    h2
        font-size 24px
</style>