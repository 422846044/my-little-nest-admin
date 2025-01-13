//引入七牛云
import * as qiniu from 'qiniu-js'
//引入uuid
import { v4 as uuidv4 } from 'uuid'
import { getQiniuyunToken } from '../api'

//上传图片 首先调取接口获取七牛云的token
export function uploadFile(file, resolve) {
    const indexOfSuffix = file.name.lastIndexOf("."); //后缀名
    const suffix = indexOfSuffix >= 0 ? file.name.substr(indexOfSuffix) : "";
    var prefix = uuidv4().replace('-', '')
    const filename = prefix + suffix; // uuid+后缀名
    if (file) {
      getQiniuyunToken().then(res => {
        if (res.data.success === true) {
          const putExtra = { fname: "", params: {}, git: null };
          const config = { useCdnDomain: true, region: qiniu.region.z2 };
          let observable = qiniu.upload(
            file, //要上传的文件对象。
            filename, //上传到七牛云后的文件名或路径(也就是图片的后缀)。
            res.data.data, //从服务器获取的七牛云上传凭证。
            putExtra, //额外的设置参数，包括文件名、自定义参数和自定义变量。
            config //配置参数，设置是否使用CDN加速和所选的七牛云存储区域。
          );
          observable.subscribe({
            next: ((response) => {
              if (response.total.percent >= 100) {
                console.log('上传成功');
              }
            }),
            error: ((err) => {
              console.log(err)
              console.log('上传失败,请稍后再试');
            }),
            complete: ((res) => {
                if(resolve){
                    resolve('http://cdn.zhongyingjie.top/' + res.key)
                }
            })
          })
        }else{
            alert('获取上传权限失败')
        }
      })
    }
  }
  