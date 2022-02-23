<template>
    <div class="pageswitch">
        <button class="notnum" v-if="currPage > 1" @click="$emit('page',1-currPage)">first</button>
        <button v-if="currPage> 1" @click="$emit('page', -1)">&lt;&lt;</button>
        <button v-for="index in pageNav"  @click="$emit('page', index-currPage)" :key="index" :checked="index===currPage">
            {{ index }}
        </button>
        <button v-if="currPage < totalPage" @click="$emit('page', 1)">&gt;&gt;</button>
        <button class="notnum" v-if="currPage < totalPage" @click="$emit('page',totalPage-currPage)">last</button>
    </div>
</template>

<script>
export default {
    props: {
        currPage: Number,
        totalPage: Number
    },
    computed: {
        pageNav() {
            let nav = [];
            for (let i = 1; i <= this.totalPage; i++) {
                if (this.currPage-4<=i && i<=(this.currPage+4<9?9:this.currPage+4)) {
                    nav.push(i);
                }
            }
            return nav;
        }
    }
};
</script>

<style lang="stylus" scoped>
    .pageswitch
        margin 10px auto
        padding 0
        width 730px
    button
        width 40px
        height 40px
        margin 5px
        background-color #EEEEEE
        font-size 16px
        font-weight bold
        color #696969
        border-radius 20px
        border 0
        box-sizing border-box
        transition all 100ms ease-in-out
        outline: none
    button:hover
        box-shadow 0px 2px 8px rgba(144,144,144,0.6)
        color #555555
    button[checked="checked"]
        background-color #ff7529
        color #ffffff
    button[checked="checked"]:hover
        box-shadow 0px 2px 8px rgba(214,76,1,0.6)
    .notnum
        width 60px
</style>