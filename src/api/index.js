import http from '../utils/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
 let nest = import.meta.env.VITE_BASE_URL
 let admin = import.meta.env.VITE_BASE_ADMIN_URL

 //登录
export function login(params){
     return http.post(`${admin}/login`,params)
}

//添加文章
export function addArticle(params){
     return http.post(`${admin}/article/addArticle`,params)
}

// 添加文章草稿
export function addArticleDraft(params){
     return http.post(`${admin}/article/addArticleDraft`,params)
}

// 更新文章
export function updateArticle(params){
     return http.put(`${admin}/article/updateArticle`,params)
}


//获取数据字典数据
export function getDictMapByDictCode(params){
     return http.get(`${admin}/dict/getDictDetailsByDictCode`,params)
}

//查询首页数据统计
export function getHomeDataCount(){ 
     return http.get(`${admin}/article/dataCount`)
}

//查询文章列表
export function getArticleListByPage(params){
     return http.get(`${admin}/article/list`,params)
}

// 查询文章信息
export function getArticleInfo(params){
     let articleId = encodeURIComponent(params)
     return http.get(`${admin}/article/info/${articleId}`)
}

//刷新凭证接口
export function refreshToken(params){
     return http.get(`${admin}/refresh/refresh`,params)
}

// 获取七牛云上传凭证
export function getQiniuyunToken(){
     return http.get(`${admin}/common/qiniu/getUploadToken`)
}



//上传文件
export function uploadObj(param){
     return http.post(`${admin}/common/uploadFile`,param)
}


 //道聚城日志查询
export function djcTaskQuery(params){
     return http.get(`${nest}/djc/task/query`,params)
}

//道聚城token更新
export function djcUpdateToken(params){
     return http.get(`${nest}/djc/task/updateToken`,params)
}

//道聚城任务重试
export function djcTaskRetry(params){
     return http.get(`${nest}/djc/task/retryTask`,params)
}



//文章列表查询
export function articleListQuery(params){
     return http.get(`${nest}/article/getArticleByPage`,params)
}

//文章信息获取
export function articleInfoQuery(params){
     return http.get(`${nest}/article/getArticleInfoById`,params)
}

//数据字典表查询
export function dictMapQuery(params){
     return http.get(`${admin}/admin/dict/getDictMapByDictCode`,params)
}


//用户信息获取
export function simpleUserInfoQuery(params){
     return http.get(`${admin}/admin/user/getSimpleUserInfoByUserId`,params)
}

//服务监控信息
export function serverMonitorInfoQuery(){
     return http.get(`${admin}/monitor/server`)
}

// put 请求
export function putSomeAPI(params){
     return http.put(`${resquest}/putSome.json`,params)
}
// delete 请求
export function deleteListAPI(params){
     return http.delete(`${resquest}/deleteList.json`,params)
}