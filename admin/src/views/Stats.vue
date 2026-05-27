<template>
  <div class="stats-page">
    <h2 class="page-title">数据统计</h2>

    <div class="stats-cards">
      <el-card class="stat-card">
        <div class="stat-header">
          <span>总访问量</span>
          <span class="stat-value">{{ formatNumber(scenicStats.totalVisits) }}</span>
        </div>
        <div class="stat-body">
          <span>开放景点：{{ scenicStats.openSpots }}个</span>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-header">
          <span>活动报名</span>
          <span class="stat-value">{{ activityStats.totalEnrollments }}人</span>
        </div>
        <div class="stat-body">
          <span>进行中：{{ activityStats.ongoingActivities }}个</span>
          <span>即将开始：{{ activityStats.upcomingActivities }}个</span>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-header">
          <span>用户数量</span>
          <span class="stat-value">{{ userStats.totalUsers }}人</span>
        </div>
        <div class="stat-body">
          <span>活跃用户：{{ userStats.activeUsers }}人</span>
          <span>新增用户：{{ userStats.newUsers }}人</span>
        </div>
      </el-card>
    </div>

    <div class="charts-row">
      <el-card class="chart-card">
        <h3>景点访问量排行</h3>
        <div ref="visitsChartRef" class="chart"></div>
      </el-card>
      <el-card class="chart-card">
        <h3>活动类型分布</h3>
        <div ref="activityTypeChartRef" class="chart"></div>
      </el-card>
    </div>

    <div class="charts-row">
      <el-card class="chart-card">
        <h3>用户角色分布</h3>
        <div ref="userRoleChartRef" class="chart"></div>
      </el-card>
      <el-card class="chart-card">
        <h3>分类访问统计</h3>
        <div ref="categoryChartRef" class="chart"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { statsApi } from '../api'

const scenicStats = ref({
  totalVisits: 0,
  openSpots: 0,
  visitsByCategory: [],
  topSpots: []
})

const activityStats = ref({
  totalEnrollments: 0,
  ongoingActivities: 0,
  upcomingActivities: 0,
  limitedActivities: 0,
  byType: []
})

const userStats = ref({
  totalUsers: 0,
  activeUsers: 0,
  newUsers: 0,
  byRole: []
})

const visitsChartRef = ref(null)
const activityTypeChartRef = ref(null)
const userRoleChartRef = ref(null)
const categoryChartRef = ref(null)

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toLocaleString()
}

const initCharts = () => {
  if (visitsChartRef.value) {
    const chart = echarts.init(visitsChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: scenicStats.value.topSpots.map(s => s.name).reverse()
      },
      series: [{
        type: 'bar',
        data: scenicStats.value.topSpots.map(s => s.visits).reverse(),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#2d5a87' },
            { offset: 1, color: '#1e3a5f' }
          ])
        }
      }]
    })
  }

  if (activityTypeChartRef.value) {
    const chart = echarts.init(activityTypeChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: true, formatter: '{b}: {c}' },
        data: activityStats.value.byType.map((item, index) => ({
          value: item.value,
          name: item.type,
          itemStyle: {
            color: ['#4facfe', '#43e97b', '#fa709a', '#fee140', '#a8edea', '#fed6e3'][index]
          }
        }))
      }]
    })
  }

  if (userRoleChartRef.value) {
    const chart = echarts.init(userRoleChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: userStats.value.byRole.map((item, index) => ({
          value: item.value,
          name: item.role,
          itemStyle: {
            color: ['#ff6b6b', '#4ecdc4', '#45b7d1'][index]
          }
        }))
      }]
    })
  }

  if (categoryChartRef.value) {
    const chart = echarts.init(categoryChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: scenicStats.value.visitsByCategory.map(c => c.category)
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: scenicStats.value.visitsByCategory.map(c => c.visits),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a8edea' },
            { offset: 1, color: '#fed6e3' }
          ])
        }
      }]
    })
  }
}

const fetchData = () => {
  statsApi.scenic().then(res => {
    if (res.code === 200) {
      scenicStats.value = res.data
    }
  })

  statsApi.activities().then(res => {
    if (res.code === 200) {
      activityStats.value = res.data
    }
  })

  statsApi.users().then(res => {
    if (res.code === 200) {
      userStats.value = res.data
      setTimeout(() => {
        initCharts()
      }, 100)
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style>
.stats-page {
  padding: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 20px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.stat-header span:first-child {
  color: #999;
  font-size: 14px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e3a5f;
}

.stat-body {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 13px;
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  padding: 20px;
}

.chart-card h3 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.chart {
  height: 250px;
}
</style>