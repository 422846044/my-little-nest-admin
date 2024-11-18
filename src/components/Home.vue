<script setup>
import { ref, reactive, onMounted } from 'vue'
import {ElMessage} from 'element-plus'
import {getHomeDataCount} from '../api'
import { useTransition } from '@vueuse/core';

const info = reactive({
  allCount: 100,
  monthCount: 10,
  monthCountThan: 10,
  dayCount: 0,
  dayCountThan: 0,
  draftCount: -1
})

const allCount = ref(0)
const allCountT = useTransition(allCount,{duration: 1000});

const monthCount = ref(0)
const monthCountT = useTransition(monthCount,{duration: 1000});

const dayCount = ref(0)
const dayCountT = useTransition(dayCount,{duration: 1000});

const draftCount = ref(0)
const draftCountT = useTransition(draftCount,{duration: 1000});


onMounted(()=>{
  getHomeDataCount()
  .then(res=>{
    if(res.data.success){
        allCount.value = res.data.data.allCount
        monthCount.value = res.data.data.monthCount
        info.monthCountThan = res.data.data.monthCountThan
        dayCount.value = res.data.data.dayCount
        info.dayCountThan = res.data.data.dayCountThan
        draftCount.value = res.data.data.draftCount
    }
  })
})

</script>

<template>
 <el-row :gutter="16">
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="allCountT">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              文章总数量
              <el-tooltip
                effect="dark"
                content="前台可查看的文章总数量"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="monthCountT">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              本月发布文章数量
              <el-tooltip
                effect="dark"
                content="本月发布前台可查看文章总数量"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>较上月</span>
            <span :class="info.monthCountThan >= 0 ? 'green':'red'">
              {{info.monthCountThan}}%
              <el-icon>
                <CaretTop v-if="info.monthCountThan >= 0"/>
                  <CaretBottom v-if="info.monthCountThan < 0"/>
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="dayCountT">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              今日发布文章数量
              <el-tooltip
                effect="dark"
                content="今日新发布前台可查看文章总数量"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>较昨天</span>
            <span :class="info.dayCountThan >= 0 ? 'green':'red'">
              {{info.dayCountThan}}%
              <el-icon>
                <CaretTop v-if="info.dayCountThan >= 0"/>
                  <CaretBottom v-if="info.dayCountThan < 0"/>
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="draftCountT" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center">
             草稿数量
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          
        
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>