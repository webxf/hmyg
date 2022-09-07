import fly from '@/utils/request'

export const getBanner = () => {
  return fly.get('/home/swiperdata')
}
//获取导航栏
export const getNavs = () => {
  return fly.get('/home/catitems')
}

export const getFloors = () => {
  return fly.get('/home/floordata')
}