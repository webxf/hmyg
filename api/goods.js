import fly from '../utils/request'

export const getGoods = (data) => {
  return fly.get('/goods/search',data)
}