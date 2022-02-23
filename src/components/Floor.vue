<template>
    <div class="floor">
        <div class="number">#{{ floor }}</div>
        <div class="body">
            <div class="info">
                <div style="align-items:baseline">
                    <span @click="enterUser"
                    style="font-size:18px;font-weight:bold;user-select:none">
                        {{ nickname }}
                    </span>reply to #{{replyFloor}}
                </div>
                <div>
                    <span style="font-weight:bold">Replied: </span>{{createTime}}
                    <span style="font-weight:bold"> Updated: </span>{{updateTime}}
                </div>
            </div>
            <div>
                <div class="content" v-html="content"></div>
                <div class="buttonbox">
                    <button class="editbutton" v-if="userId === $store.state.userId" 
                    @click="$emit('edit-reply', id, content, 'floor', floor)">Edit</button>
                    <button class="replybutton" @click="$emit('change-replyid', id, floor)">Reply</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        userId: Number,
        nickname: String,
        postId: Number,
        replyId: Number,
        content: String,
        created: String,
        updated: String,
        floor: Number,
        replyFloor: Number
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
        enterUser() {
            this.$store.commit("jumptoUserPost", this);
            this.$router.push('/userpost');
        }
    }
};
</script>

<style lang="stylus" scoped>
    div
        display flex
        flex-flow row nowrap
        font-family: Helvetica, Avenir, Arial, sans-serif;
    button
        width 60px
        height 30px
        border-radius 10px
        margin-left 10px
        font-size 15px        
        transition all 100ms ease-in-out
        font-weight bold
    pre
        margin 0
    .floor
        width 80%
        min-width 700px
        background-color white
        margin 20px auto
        box-shadow 0px 1px 4px rgba(144,144,144,0.8)
        border-radius 10px
        box-sizing border-box
        padding 10px
        text-align left
    .body
        margin-right 10px
        flex-grow 1
        flex-flow column nowrap
    .info
        margin-bottom 10px
        color #9e9e9e
        font-size 14px
        align-items baseline
        justify-content space-between
        white-space pre
    .content
        flex-grow 1
        word-break:break-all
        color black
        flex-flow row wrap
    .number
        width 100px
        font-size 45px
        font-weight bold
        flex-shrink 0
        font-family Impact, Helvetica, sans-serif
        color #2c3e50
    .replybutton
        color #ff7529
        background-color white
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
        border 0
        outline none
    .editbutton
        color #696969
        background-color #EEEEEE
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
        border 0
        outline none
    .replybutton:hover
        color white
        background-color #ff7529
        box-shadow 0px 3px 12px rgba(214,76,1,0.6)
    .editbutton:hover
        box-shadow 0px 3px 12px rgba(144,144,144,0.6)
</style>