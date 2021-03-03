// 云函数入口文件
const cloud = require('wx-server-sdk')
// const axios = require('axios')
var rp = require('request-promise')
cloud.init()

// async function getNews() {
//   console.log('start getNews')
//   let data = {}
//   try {
//     const url = `https://service-9g2jonkx-1302780644.sh.apigw.tencentcs.com/release/seashell`
//     console.log(url)
//     var res = await axios.get(url)
//     data = res
//     console.log(data)
//   } catch (err) {
//     console.log(err)
//   }
//   return data
// }

// 云函数入口函数
exports.main = async (event, context) => {
  let url = `https://service-9g2jonkx-1302780644.sh.apigw.tencentcs.com/release/seashell`
  var options = {
    uri: url,
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "charset": "UTF-8"
    },
    json: true
  }
  return await rp(options)
    .then(function (res) {
      console.log(res)
      return res
    })
    .catch(function (err) {
      console.log(err)
      return err
    })
}