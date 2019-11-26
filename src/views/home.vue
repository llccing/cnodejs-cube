<template>
  <div class="home">
    <nav-bar @on-back="onBack" :title="title">
      <div v-if="title !== '详情'" slot="left" class="navbar-left" @click="toggleDrawer">
        <img class="logo" src="../assets/menu.svg" alt />
      </div>
    </nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { TYPE_NAME } from '@/common'
export default {
  data() {
    return {
      title: '顶部栏',
      showDrawer: false,
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('toggleDrawer')
    },
    onBack(){
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.params.type': {
      handler(v) {
        this.title = TYPE_NAME[v]
      },
      deep: true,
      immediate: true
    },
    '$route.params': {
      deep: true,
      immediate: true,
      handler(v){
        // 有id属性说明是详情页，title变为详情
        if(v.id){
          this.title = '详情'
        }
      },
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
.navbar-left
  line-height 46px
  display flex
  justify-content center
  align-items center
  img
    width 30px
.navbar-left:active
  background-color #f2f3f5
</style>
