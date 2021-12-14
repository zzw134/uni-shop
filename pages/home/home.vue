<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图的区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id={{item.goods_id}}'">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 这是轮播图的数据列表
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层数据列表
        floorList: []
      };
    },
    onLoad() {
      // 调用方法,获取轮播图的数据
      this.getSwiperList()
      // 获取分类导航的数据
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      async getNavList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      async getFloorList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    } 
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floor-title {
    width: 100%;
    height: 60rpx;
  }
  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  .search-box {
    position: sticky;
    top: 0;
    z-index: 9999;
  }
</style>
