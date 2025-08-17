<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import {ElMessage} from 'element-plus'
import { showLoading, hideLoading } from '../utils/loading.js'
import {getHomeDataCount, serverMonitorInfoQuery} from '../api'
import { useTransition } from '@vueuse/core';

const info = reactive({
  allCount: 100,
  monthCount: 10,
  monthCountThan: 10,
  dayCount: 0,
  dayCountThan: 0,
  draftCount: -1
})

const server = reactive({
    "cpu": {
        "cpuNum": '.....',
        "total": '.....',
        "sys": '.....',
        "used": '.....',
        "wait": '.....',
        "free": '.....'
    },
    "mem": {
        "total": '.....',
        "used": '.....',
        "free": '.....',
        "usage": '.....'
    },
    "jvm": {
        "total": '.....',
        "max": '.....',
        "free": '.....',
        "version": '.....',
        "home": '.....',
        "name": '.....',
        "used": '.....',
        "startTime": '.....',
        "usage": '.....',
        "inputArgs": '.....',
        "runTime": '.....'
    },
    "sys": {
        "computerName": '.....',
        "computerIp": '.....',
        "userDir": '.....',
        "osName": '.....',
        "osArch": '.....'
    },
    "sysFiles": [
        {
            "dirName": '.....',
            "sysTypeName": '.....',
            "typeName": '.....',
            "total": '.....',
            "free": '.....',
            "used": '.....',
            "usage": '.....'
        },
        {
            "dirName": '.....',
            "sysTypeName": '.....',
            "typeName": '.....',
            "total": '.....',
            "free": '.....',
            "used": '.....',
            "usage": '.....'
        }
    ]
})

const allCount = ref(0)
const allCountT = useTransition(allCount,{duration: 1000});

const monthCount = ref(0)
const monthCountT = useTransition(monthCount,{duration: 1000});

const dayCount = ref(0)
const dayCountT = useTransition(dayCount,{duration: 1000});

const draftCount = ref(0)
const draftCountT = useTransition(draftCount,{duration: 1000});

let timer = null  

onMounted(()=>{
  showLoading()
  getHomeDataCount()
  .then(res=>{
    if(res.data.code==200){
        allCount.value = res.data.data.allCount
        monthCount.value = res.data.data.monthCount
        info.monthCountThan = res.data.data.monthCountThan
        dayCount.value = res.data.data.dayCount
        info.dayCountThan = res.data.data.dayCountThan
        draftCount.value = res.data.data.draftCount
    }
  })
  serverMonitorInfoQuery({})
  .then(res=>{
    if(res.data.code==200){
      Object.assign(server, res.data.data)
      timer = setInterval(function(){
        serverMonitorInfoQuery({noLoading: true})
        .then(res=>{
          if(res.data.code==200){
            Object.assign(server, res.data.data)
          }
        })
      }, 5000)
    }
  })
  hideLoading()
})

onBeforeUnmount(()=>{
  clearInterval(timer)
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
  </el-row >
    <el-row class="statistic-card">
      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span><i class="el-icon-cpu"></i> CPU</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf"><div class="cell">属性</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">值</div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">核心数</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.cpu">{{ server.cpu.cpuNum }}</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">用户使用率</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.cpu">{{ server.cpu.used }}%</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">系统使用率</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.cpu">{{ server.cpu.sys }}%</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">当前空闲率</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.cpu">{{ server.cpu.free }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span><i class="el-icon-tickets"></i> 内存</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf"><div class="cell">属性</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">内存</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">JVM</div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">总内存</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.mem">{{ server.mem.total }}G</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.total }}M</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">已用内存</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.mem">{{ server.mem.used}}G</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.used}}M</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">剩余内存</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.mem">{{ server.mem.free }}G</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.free }}M</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">使用率</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.mem" :class="{'text-danger': server.mem.usage > 80}">{{ server.mem.usage }}%</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm" :class="{'text-danger': server.jvm.usage > 80}">{{ server.jvm.usage }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-monitor"></i> 服务器信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">服务器名称</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.sys">{{ server.sys.computerName }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">操作系统</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.sys">{{ server.sys.osName }}</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">服务器IP</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.sys">{{ server.sys.computerIp }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">系统架构</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.sys">{{ server.sys.osArch }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-coffee-cup"></i> Java虚拟机信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;table-layout:fixed;">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">Java名称</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.name }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">Java版本</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.version }}</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">启动时间</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.startTime }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">运行时长</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.runTime }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf"><div class="cell">安装路径</div></td>
                  <td colspan="3" class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.home }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf"><div class="cell">项目路径</div></td>
                  <td colspan="3" class="el-table__cell is-leaf"><div class="cell" v-if="server.sys">{{ server.sys.userDir }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf"><div class="cell">运行参数</div></td>
                  <td colspan="3" class="el-table__cell is-leaf"><div class="cell" v-if="server.jvm">{{ server.jvm.inputArgs }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-receiving"></i> 磁盘状态</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell el-table__cell is-leaf"><div class="cell">盘符路径</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">文件系统</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">盘符类型</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">总大小</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">可用大小</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">已用大小</div></th>
                  <th class="el-table__cell is-leaf"><div class="cell">已用百分比</div></th>
                </tr>
              </thead>
              <tbody v-if="server.sysFiles">
                <tr v-for="(sysFile, index) in server.sysFiles" :key="index">
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.dirName }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.sysTypeName }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.typeName }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.total }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.free }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.used }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" :class="{'text-danger': sysFile.usage > 80}">{{ sysFile.usage }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<style scoped>
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

::v-deep .el-card {
  box-shadow: none !important;
  border: none !important;
}
::v-deep .el-card__body{
  padding: 0 0 0 0 !important;
}
</style>