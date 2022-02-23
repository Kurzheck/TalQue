<template>
    <div class="post">
        <button class="backhome" @click="enterHome">Home</button>
        <div class="mainfloor">
            <h1>{{ title }}</h1>
            <div class="info">
                <div>
                    <span>Posted by </span>
                    <span @click="enterUser"
                    style="font-size:18px;font-weight:bold;user-select:none">
                            {{ nickname }}
                    </span>
                </div>
                <div>
                    <span style="font-weight:bold">Posted: </span>{{createTime}}
                    <span style="font-weight:bold"> Updated: </span>{{updateTime}}
                </div>
            </div>
            <p v-html="content" class="content"></p>
            <div class="ops">
                <button class="editbutton" v-if="userId === $store.state.userId"
                @click="writeEdit(0,content,'post',1)">Edit</button>
                <button class="replybutton" @click="writeReply(0,1)">Reply</button>
            </div>
        </div>
        <Floor v-for="floor in reply[currPage-1]" :key="floor.id"
        v-bind="floor" @change-replyid="writeReply" @edit-reply="writeEdit" />
        <PageSwitch v-if="reply.length>1" @page="changePage" :currPage="currPage" :totalPage="reply.length"/>
        <div class="editortip" v-if="editing">
            <div class="tiptext">{{ editTip }}</div>
            <button class="cancel" @click="cancelEdit">CANCEL</button>
        </div>
        <editor ref="replyeditor" :isReply="true" :editType="edit" @reply="replyFloor"
        @edit-post="editPost" @edit-floor="editFloor"/>
    </div>
</template>

<script>
import Floor from "@/components/Floor.vue";
import Editor from "@/components/Editor.vue"
import PageSwitch from "@/components/PageSwitch.vue"
export default {
    data() {
        return {
            id: this.$store.state.currPostId,
            userId: null,
            nickname: null,
            title: "",
            content: "",
            created: null,
            updated: null,
            reply: [],
            replyId: 0,
            replyContent: "",
            edit: "",
            editing: false,
            editTipNum: 1,
            isReply: true
        };
    },
    computed: {
        currPage() {
            return this.$store.state.postPageNumber;
        },
        editTip() {
            if (this.isReply) {
                return "Replying to #" + String(this.editTipNum);
            }
            else {
                return "Editing #" + String(this.editTipNum);
            }
        },
        createTime() {
            if (this.created) {
                let tmp = this.created.split("T");
                tmp[1] = tmp[1].split("+")[0];
                return tmp.join(" ");
            }
            return this.created;
        },
        updateTime() {
            if (this.updated) {
                let tmp = this.updated.split("T");
                tmp[1] = tmp[1].split("+")[0];
                return tmp.join(" ");
            }
            return this.updated;
        }
    },
    components: {
        Floor,
        Editor,
        PageSwitch
    },
    methods: {
        changePage(delt) {
            this.currPage += delt;
            this.$store.commit("postChangePage", delt);
            window.scrollTo(0, 0);
        },
        enterHome() {
            this.$router.push("/");
        },
        writeReply(id, floor) {
            this.isReply = true;
            this.editing = true;
            this.editTipNum = floor;
            this.replyId = id;
            this.edit = "";
            this.$refs.replyeditor.editor.txt.clear();
            this.$refs.replyeditor.editorContent = "";
            window.scrollTo(0, 100000000);
        },
        writeEdit(id, content, type, floor) {
            this.isReply = false;
            this.replyId = id;
            this.editTipNum = floor;
            this.editing = true;
            this.replyContent = content;
            this.edit = type;
            this.$refs.replyeditor.editor.txt.html(this.replyContent);
            this.$refs.replyeditor.editorContent = this.replyContent;
            if (type === "post") {
                this.$refs.replyeditor.editorTitle = this.title;
            }
            window.scrollTo(0, 100000000);
        },
        replyFloor(content) {
            this.replyContent = content;
            this.$axios({
                method: "post",
                url: "/api/v1/post/" + String(this.id) + "/reply",
                headers: {
                    "authorization": this.$store.state.jwt
                },
                data: {
                    content: this.replyContent,
                    replyId: this.replyId
                }
            })
            .then(() => {
                location.reload();
                alert("Successfully replied!");
            })
            .catch(error => {
                alert("Something went wrong.");
                console.log(error);
            });
            this.edit = "";
            this.replyContent = "";
            this.replyId = 0;
            this.editing = false;
            this.editTipNum = 1;
            this.isReply = true;
        },
        editPost(title, content) {
            this.title = title;
            this.content = content;
            this.$axios({
                method: "put",
                url: "/api/v1/post/" + String(this.id),
                headers: {
                    "authorization": this.$store.state.jwt
                },
                data: {
                    title: this.title,
                    content: this.content
                }
            })
            .then(() => {
                location.reload();
                alert('Successfully edited!');
            })
            .catch(error => {
                alert("Something went wrong.");
                console.log(error);
            });
            this.edit = "";
            this.replyContent = "";
            this.replyId = 0;
            this.editing = false;
            this.editTipNum = 1;
            this.isReply = true;
        },
        editFloor(content) {
            this.replyContent = content;
            this.$axios({
                method: "put",
                url: "/api/v1/post/" + String(this.id) + "/reply/" + String(this.replyId),
                headers: {
                    "authorization": this.$store.state.jwt
                },
                data: {
                    content: this.replyContent
                }
            })
            .then(() => {
                location.reload();
                alert('Successfully edited!');
            })
            .catch(error => {
                alert("Something went wrong.");
                console.log(error);
            });
            this.edit = "";
            this.replyContent = "";
            this.replyId = 0;
            this.editing = false;
            this.editTipNum = 1;
            this.isReply = true;
        },
        cancelEdit() {
            this.edit = "";
            this.replyContent = "";
            this.replyId = 0;
            this.editing = false;
            this.editTipNum = 1;
            this.isReply = true;
            this.$refs.replyeditor.editor.txt.clear();
            this.$refs.replyeditor.editorContent = "";
        },
        enterUser() {
            this.$store.commit("jumptoUserPost", this);
            this.$router.push("/userpost");
        }
    },
    created() {
        this.$axios
        .get("/api/v1/post/" + String(this.id), {
            headers: {
                "authorization": this.$store.state.jwt
            }
        })
        .then(response => {
            this.userId = response.data.userId;
            this.nickname = response.data.nickname;
            this.userId = response.data.userId;
            this.title = response.data.title;
            this.content = response.data.content;
            this.created = response.data.created;
            this.updated = response.data.updated;
            let tmp = response.data.reply;
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].floor = i + 2;
                if (tmp[i].replyId === 0) {
                    tmp[i].replyFloor = 1;
                }
                else {
                    for (let j = 0; j < i; j++)
                    {
                        if (tmp[j].id === tmp[i].replyId)
                        {
                            tmp[i].replyFloor = tmp[j].floor;
                        }
                    }
                }
            }
            while (tmp.length > 10) {
                this.reply.push(tmp.splice(0, 10));
            }
            if (tmp.length > 0) {
                this.reply.push(tmp);
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong.");
        })
    }
}
</script>
<style lang="stylus" scoped>
    button
        transition all 100ms ease-in-out
        font-weight bold
        width 60px
        height 60px
        margin 0 10px
        border-radius 30px
        font-size 18px
        border 0
        outline none
    .mainfloor
        display flex
        flex-direction column
        box-sizing border-box
        margin 40px auto
        width 80%
    .info
        display flex
        flex-direction row
        color #9e9e9e
        font-size 18px
        white-space pre
        align-items baseline
        justify-content space-between
    .replybutton, .backhome
        color #ff7529
        background-color white
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
    .editbutton
        color #696969
        background-color #EEEEEE
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
    .replybutton:hover, .backhome:hover
        color white
        background-color #ff7529
        box-shadow 0px 3px 12px rgba(214,76,1,0.6)
    .editbutton:hover
        box-shadow 0px 3px 12px rgba(144,144,144,0.6)
    .cancel
        color #696969
        background-color #EEEEEE
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
        border 0
        margin-left 30px
        width 80px
        height 30px
        border-radius 10px
        font-size 15px
    .cancel:hover
        box-shadow 0px 3px 12px rgba(144,144,144,0.6)
    .editortip
        width 80%
        min-width 730px
        margin 10px auto
        display flex
        flex-flow row nowrap
        align-items baseline
    .tiptext
        font-size 18px
        font-weight bold
        color #9e9e9e
    .backhome
        position absolute
        left 36px
        top 36px
    .content
        text-align left
        max-width 100%
</style>
