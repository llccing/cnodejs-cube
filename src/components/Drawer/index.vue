<template>
  <div class="drawer-wrapper">
    <div class="drawer-header" :class="{ active: drawerOpen }">
      <img class="logo" src="../../assets/cnodejs_light.svg" alt />
    </div>
    <div class="drawer-body">
      <div class="menu">
        <div @click="login" class="menu-item">
          <a class="menu-item-link">登录</a>
          <i class="cubeic-arrow"></i>
        </div>

        <div class="menu-group">
          <div class="menu-group-title">板块</div>
          <div class="menu-item" v-for="item in menuData" :key="item.title">
            <router-link
              @click.native="toggleDrawer"
              class="menu-item-link"
              :to="{ name: 'list', params: { type: item } }"
            >{{ TYPE_NAME[item] }}</router-link>
            <i class="cubeic-arrow"></i>
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-group-title">其他</div>
          <div class="menu-item">
            <a
              href="https://github.com/llccing/cnodejs-cube"
              target="_blank"
              class="menu-item-link"
            >给个star吧，亲</a>
            <i class="cubeic-arrow"></i>
          </div>
          <div class="menu-item">
            <a
              href="https://llccing.github.io/FrontEnd/"
              target="_blank"
              class="menu-item-link"
            >了解作者</a>
            <i class="cubeic-arrow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { TYPE_NAME } from '@/common'
export default {
  data() {
    return {
      menuData: ['all', 'good', 'share', 'ask', 'job', 'dev'],
      TYPE_NAME
    }
  },
  computed: {
    ...mapState(['drawerOpen'])
  },
  methods: {
    ...mapMutations(['toggleDrawer']),
    login() {
      this.$createDialog({
        type: 'prompt',
        title: '登录',
        content: 'PC端登录https://cnodejs.org/，配置页中即可看到Access Token',
        prompt: {
          value: '',
          placeholder: '请输入从cnodejs.org网站获取的token',
        },
        onConfirm: (e, token) => {
          if (!token.trim()) {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '请输入合法token',
            }).show()
            return
          }
          this.doLogin(token)
        }
      }).show()
    },

    // 调用登录接口
    async doLogin(accesstoken) {
      const res = await this.$axios.post('/accesstoken', { accesstoken })
      const data = res.data
      this.getUserInfo(data.loginname)
    },

    // 获取更详细的用户信息
    async getUserInfo(loginname) {
      const res = await this.$axios.get(`/user/${loginname}`)
      console.log('getUserInfo', res)
    },

    // 获取我的消息
    async getMsg(){
      // const res = await this.$axios.get('')
    }
  }
}
</script>
<style lang="stylus">
.drawer-wrapper
  color #222
  display flex
  flex-direction column
  height 100vh
  background-color #fff
  width 270px
  z-index 101
  .drawer-header
    background-color #444
    height 40px
    padding 5px
    box-sizing border-box
    // 此处为了展示上 压在侧边栏上
    // margin-right -1px
    .logo
      height 100%
  .drawer-body
    flex 1
    overflow-y auto
    .menu
      .menu-group
        .menu-group-title
          padding 8px 16px
          background-color #F5F5F5
          border-bottom 1px solid rgba(0,0,0,0.08)
      .menu-item
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid rgba(0,0,0,0.08)
        .cubeic-arrow
          margin-right 5px
          color #666
        .menu-item-link
          flex 1
          cursor pointer
          display block
          padding 12px 16px
          color #222
.drawer-wrapper.active
  box-shadow 0 4px 16px 0 rgba(0,0,0,0.12)
</style>
