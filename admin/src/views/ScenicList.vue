<template>
  <div class="scenic-list">
    <div class="page-header">
      <h2 class="page-title">景点管理</h2>
      <el-button type="primary" @click="$router.push('/scenic/add')">
        <el-icon><Plus /></el-icon>
        添加景点
      </el-button>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索景点名称"
        prefix-icon="Search"
        @keyup.enter="handleSearch"
      />
      <el-select v-model="searchCategory" placeholder="选择分类">
        <el-option label="全部" value="" />
        <el-option
          v-for="cat in categories"
          :key="cat.name"
          :label="cat.name"
          :value="cat.name"
        />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <el-table :data="scenicList" border>
      <el-table-column prop="name" label="景点名称" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="location" label="位置" />
      <el-table-column prop="openTime" label="开放时间" />
      <el-table-column prop="ticketPrice" label="门票价格" />
      <el-table-column prop="visits" label="访问量" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'open' ? 'success' : 'warning'">
            {{ scope.row.status === 'open' ? '开放' : '关闭' }}
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
import { scenicApi } from '../api'

const scenicList = ref([])
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const searchKeyword = ref('')
const searchCategory = ref('')
const categories = ref([])

const fetchScenicList = () => {
  scenicApi.list({
    page: pagination.value.page,
    limit: pagination.value.limit,
    keyword: searchKeyword.value,
    category: searchCategory.value
  }).then(res => {
    if (res.code === 200) {
      scenicList.value = res.data.list
      pagination.value = { ...pagination.value, ...res.data.pagination }
    }
  })
}

const fetchCategories = () => {
  scenicApi.categories().then(res => {
    if (res.code === 200) {
      categories.value = res.data
    }
  })
}

const handleSearch = () => {
  pagination.value.page = 1
  fetchScenicList()
}

const handlePageChange = (page) => {
  pagination.value.page = page
  fetchScenicList()
}

const handleEdit = (id) => {
  window.location.href = `/scenic/edit/${id}`
}

const handleDelete = (id) => {
  if (confirm('确定要删除这个景点吗？')) {
    scenicApi.delete(id).then(res => {
      if (res.code === 200) {
        ElMessage.success('删除成功')
        fetchScenicList()
      } else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  }
}

onMounted(() => {
  fetchScenicList()
  fetchCategories()
})
</script>

<style>
.scenic-list {
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