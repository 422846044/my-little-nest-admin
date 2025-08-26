<script setup>
import { reactive,ref, onMounted } from 'vue'
import DictSelect from '../components/DictSelect.vue'
import { getArticleListByPage, delArticleInfo } from '../api'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRoute,useRouter} from 'vue-router'

onMounted(() => {
    query()
})

const route = useRoute()

const router = useRouter()

const makeReq = reactive({
  req: true
})


const articleData = reactive({
    keyword: '',
    category: null,
    tag: null,
    order: 'create_time',
    sort: 'desc'
});

const pageInfo = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 10
})

const articleList = ref([])

function selectCategory(value) {
    articleData.category = value
}

function selectTag(value) {
    articleData.tag = value
}

function newArticle(){
    router.push({
        path: '/newArticle'
    })
}

function handleEdit(row){
    // 路由跳转 携带参数
    router.push({
        path: '/editArticle',
        query:{
            'articleId': row.id
        }
    })
}

function handleDelete(row){
    ElMessageBox.confirm('是否确认删除?','提示',{confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'})
    .then(()=>{
        // 执行删除逻辑
        delArticleInfo(row.id)
        .then(res=>{
            if(res.data.code  == 200){
                ElMessage.success("删除成功");
                query()
            }else{
                ElMessage.error(res.data.message)
            }
        })
    })
    .catch(()=>{
        ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

function query() {
    getArticleListByPage({ ...articleData, ...pageInfo })
        .then(res => {
            if (res.data.success) {
                articleList.value = res.data.data.list
                pageInfo.total = res.data.data.total
            }
        })
}

function handleSizeChange(){
    query()
}

function handleCurrentChange(){
    query()
}

function getStatusTagType(status){
    const statusTagType = {
        0:'error',
        1:'primary',
        2:'info'
    }
    return statusTagType[status] === undefined ? 'info' : statusTagType[status]
}

function getStatus(status){
    const statusTag = {
        0:'已删除',
        1:'已发布',
        2:'草稿'
    }
    return statusTag[status] === undefined ? 'info' : statusTag[status]
}

</script>

<template>
    <el-container>
            <el-form :inline="true" label-position="left" :model="articleData">
                <el-form-item label="标题">
                    <el-input v-model="articleData.keyword" placeholder="请输入标题" />
                </el-form-item>
                <el-form-item label="分类">
                    <DictSelect placeholder="请选择分类" dictCode="wzfl" @selectChange="selectCategory" :makeReq="makeReq.req" :clearable="true"></DictSelect>
                </el-form-item>
                <el-form-item label="标签">
                    <DictSelect placeholder="请选择分类" dictCode="wzbq" @selectChange="selectTag" :makeReq="makeReq.req" :clearable="true"></DictSelect>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query(ruleFormRef)">查询</el-button>
                </el-form-item>
            </el-form>
            <el-line>
               <el-button type="primary" @click="newArticle()">新增</el-button> 
            </el-line>  
            
            <el-table :data="articleList" style="width: 100%" table-layout="auto">
                <el-table-column label="标题" >
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.title }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="分类">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.category }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标签">
                    <template #default="scope" >
                        <div  style="display: flex; align-items: center">
                            <el-space>
                               <el-tag v-for="tag in scope.row.tags" type="primary">{{ tag }}</el-tag> 
                            </el-space>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="简介">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.summary }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template #default="scope" >
                        <div  style="display: flex; align-items: center">
                            <el-tag effect="dark" :type="getStatusTagType(scope.row.status)"> {{ getStatus(scope.row.status) }} </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        <el-footer>
            <div style="margin-top: 1em;">
                <el-pagination v-model:current-page="pageInfo.pageNum" v-model:page-size="pageInfo.pageSize"
                    :page-sizes="[1, 10, 20, 30, 50, 100]" size="default" :disabled="false" :background="true"
                    layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.total"
                    @size-change="handleSizeChange()" @current-change="handleCurrentChange()" />
            </div>
        </el-footer>
    </el-container>
</template>


<style>
</style>