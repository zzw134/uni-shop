  import {mapState, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters('m_cart', ['total'])
    },
    onShow() {
      this.setBadge()
    },
    watch: {
      total() {
        this.setBadge()
      }
    },
    methods: {
      setBadge() {
        if (this.total > 0) {
          uni.setTabBarBadge({
            index: 2,
            text: this.total + ''
          })
        } else {
          uni.removeTabBarBadge({
            index: 2
          })
        }
      }
    }
  }