export default {
  // 开启命名空间
  namespaced: true,
  
  // 数据
  state: {
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户信息的对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向Object对象
    redirectInfo: null
  },
  
  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },
  
  // 数据包装器
  getters: {
    addstr(state) {
      if (state.address.provinceName) {
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      } else {
        return ''
      }
    }
  }
}