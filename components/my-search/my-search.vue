<template>
  <view @click="searchBoxHandler" class="my-search-container" :style="{'backgroundColor': bgcolor}">
    <view class="my-search-box" :style="{'borderRadius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 // px
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  .my-search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 100%;
    background-color: #fff;
    .placeholder {
      margin-left: 5px;
      font-size: 15px;
    }
  }
}
</style>
