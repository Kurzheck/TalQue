<template>
    <div class="editor">
        <div class="title" v-if="!isReply || editType==='post'">Title <input ref="title" type="text" v-model="editorTitle"></div>
        <div ref="editor" style="text-align:left" placeholder="Text here..."></div>
        <button v-if="!isReply" @click="clickButt">POST</button>
        <button v-if="isReply && editType===''" @click="clickButt">Reply</button>
        <button v-if="editType==='floor'" @click="clickButt">Submit</button>
        <button v-if="editType==='post'" @click="clickButt">Submit</button>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editor: null,
          editorTitle: "",
          editorContent: ""
        }
      },
      props: {
          isReply: Boolean,
          editType: String
      },
      methods: {
        clickButt() {
            if (this.editType === "post") {
                this.$emit("edit-post", this.editorTitle, this.editorContent);
            }
            else if (this.editType === "floor") {
                this.$emit("edit-floor", this.editorContent);
            }
            else if (this.isReply) {
                this.$emit("reply", this.editorContent);
            }
            else {
                this.$emit("send-post", this.editorTitle, this.editorContent);
            }
            this.editor.txt.clear();
            this.editorContent = "";
            this.editorTitle = "";
        }
      },
      mounted() {
        this.editor = new E(this.$refs.editor);
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html;
        };
        this.editor.create();
      }
    };
</script>

<style lang="stylus" scoped>
    .editor
        margin 10px auto
        width 80%
        min-width 730px
    input
        padding 0 10px
        margin-left 5px
        flex-grow 1
        height 30px
        font-size 20px
        border 1px solid #CCCCCC
        border-radius 10px
        outline none
    .title
        margin 10px 0
        width 100%
        display flex
        flex-direction row
        align-items baseline
        white-space pre
        font-size 24px
        font-weight bold
        user-select none
    button
        margin 10px 0
        border 0
        border-radius 20px
        width 100%
        height 40px
        font-weight bold
        font-size 20px
        color #ff7529
        background-color white
        box-shadow 0px 2px 8px rgba(144,144,144,0.8)
        transition all 100ms ease-in-out
        outline none
    button:hover
        color white
        background-color #ff7529
        box-shadow 0px 3px 12px rgba(214,76,1,0.6)
</style>
