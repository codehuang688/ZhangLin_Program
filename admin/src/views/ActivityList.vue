<template>
  <div class="activity-list">
    <div class="page-header">
      <h2 class="page-title">活动管理</h2>
      <el-button type="primary" @click="$router.push('/activity/add')">
        <el-icon><Plus /></el-icon>
        添加活动
      </el-button>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索活动名称"
        prefix-icon="Search"
        @keyup.enter="handleSearch"
      />
      <el-select v-model="searchStatus" placeholder="选择状态">
        <el-option label="全部" value="" />
        <el-option label="进行中" value="ongoing" />
        <el-option label="即将开始" value="upcoming" />
        <el-option label="名额有限" value="limited" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <el-table :data="activityList" border>
      <el-table-column prop="title" label="活动名称" />
      <el-table-column prop="place" label="地点" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="endTime" label="结束时间" />
      <el-table-column prop="capacity" label="名额" />
      <el-table-column prop="enrolled" label="已报名" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="pagination.total"
      :page-size="pagination.limit"
      :current-page="pagination.page"
      @current-change="handlePageChange"
      layout="prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { activityApi } from '../api'

const activityList = ref([])
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const searchKeyword = ref('')
const searchStatus = ref('')

const getStatusType = (status) => {
  const types = {
    ongoing: 'success',
    upcoming: 'warning',
    limited: 'info',
    completed: 'default'
  }
  return types[status] || 'default'
}

const getStatusLabel = (status) => {
  const labels = {
    ongoing: '进行中',
    upcoming: '即将开始',
    limited: '名额有限',
    completed: '已结束'
  }
  return labels[status] || status
}

const fetchActivityList = () => {
  activityApi.list({
    page: pagination.value.page,
    limit: pagination.value.limit,
    status: searchStatus.value,
    keyword: searchKeyword.value
  }).then(res => {
    if (res.code === 200) {
      activityList.value = res.data.list
      pagination.value = { ...pagination.value, ...res.data.pagination }
    }
  })
}

const handleSearch = () => {
  pagination.value.page = 1
  fetchActivityList()
}

const handlePageChange = (page) => {
  pagination.value.page = page
  fetchActivityList()
}

const handleEdit = (id) => {
  window.location.href = `/activity/edit/${id}`
}

const handleDelete = (id) => {
  if (confirm('确定要删除这个活动吗？')) {
    activityApi.delete(id).then(res => {
      if (res.code === 200) {
        ElMessage.success('删除成功')
        fetchActivityList()
      } else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  }
}

onMounted(() => {
  fetchActivityList()
})
</script>

<style>
.activity-list {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar :deep(.el-input) {
  width: 250px;
}

.search-bar :deep(.el-select) {
  width: 150px;
}
</style>