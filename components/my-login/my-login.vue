<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 用户授权之后获取用户基本信息
      getUserInfo(e) {
        // console.log(e)
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // console.log(e.detail.userInfo)
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败！')
        
        // 准备参数
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        console.log(query)
        const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        console.log(loginResult)
        if (loginResult.meta.status !== 200) {
          this.updateToken('entryTheByteDance')
          this.navigateBack()
          return uni.$showMsg('登录失败！')
        }
        // 直接把token保存到vuex中
        this.updateToken(loginResult.message.token)
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 750rpx;
    background-color: #f8f8f8;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 40px;
      border-radius: 100%;
      transform: translateY(50%);
      background-color: white;
    }
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
