<template>
  <view>
   <van-card
    v-for="item in goods" :key="item.goods_id"
     :price="item.goods_price | toFixed"
      :thumb = "item.goods_small_logo || defaultPic"
     :title="item.goods_name"
     :isLoading = isLoading
     :thumb-link="`/subpkg/goods_detail/goods_detail/goods_detail?id=${item.goods_id}`"
   />
  </view>
</template>

<script>
  import {getGoods} from '../../api/goods.js'
  import toast from '../../utils/toast.js'
  export default {
    data() {
      return {
        queryData:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goods:[],
        total:0,
        isLoading : false,
         defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    onLoad({query}) {
      this.queryData.query = query
      this.goodsList()
    },
    onPullDownRefresh() {
    this.queryData={
        query:'',
        cid:'',
        pagenum:1,
        pagesize:10
      },
      this.goods = [],
      this.total = 0,
     this.goodsList(() => {
       uni.stopPullDownRefresh()
     })
    },
    methods:{
       
    async  goodsList(stopPullDown){
      this.isLoading = true
      const res = await getGoods(this.queryData)
       this.isLoading = false
     this.total = res.message.total
     this.goods = [...this.goods,...res.message.goods]
     stopPullDown && stopPullDown()
    }
    },
    onReachBottom() {
      if(this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('没有更多数据了')
      if(this.isLoading) return
      this.queryData.pagenum++
      this.goodsList()
    }
  }
</script>

<style lang="scss">

</style>
