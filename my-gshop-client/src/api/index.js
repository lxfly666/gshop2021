import ajax from './ajax'

const BASE_URL = '/api';

export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

export const reqFoodCategories = () => ajax(BASE_URL+'/index_category')

export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops',{longitude,latitude})

export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops',{geohash,keyword})

// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')

export const reqShopInfo = () => ajax('/shop_info');

export const reqShopRatings = () => ajax('/shop_ratings');

export const reqShopGoods = () => ajax('/shop_goods');


