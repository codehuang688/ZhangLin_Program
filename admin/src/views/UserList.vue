<template>
  <div class="user-list">
    <div class="page-header">
      <h2 class="page-title">用户管理</h2>
      <el-button type="primary" @click="$router.push('/user/add')">
        <el-icon><Plus /></el-icon>
        添加用户
      </el-button>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索用户名或昵称"
        prefix-icon="Search"
        @keyup.enter="handleSearch"
      />
      <el-select v-model="searchRole" placeholder="选择角色">
        <el-option label="全部" value="" />
        <el-option label="管理员" value="admin" />
        <el-option label="讲解员" value="guide" />
        <el-option label="普通用户" value="visitor" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <el-table :data="userList" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-tag :type="getRoleType(scope.row.role)">
            {{ getRoleLabel(scope.row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'warning'">
            {{ scope.row.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="lastLogin" label="最后登录" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
            type="text"
            @click="handleToggleStatus(scope.row.id, scope.row.status)"
          >
            {{ scope.row.status === 'active' ? '禁用' : '启用' }}
          </el-button>
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
import { userApi } from '../api'

const userList = ref([])
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const searchKeyword = ref('')
const searchRole = ref('')

const getRoleType = (role) => {
  const types = {
    admin: 'danger',
    guide: 'primary',
    visitor: 'success'
  }
  return types[role] || 'default'
}

const getRoleLabel = (role) => {
  const labels = {
    admin: '管理员',
    guide: '讲解员',
    visitor: '普通用户'
  }
  return labels[role] || role
}

const fetchUserList = () => {
  userApi.list({
    page: pagination.value.page,
    limit: pagination.value.limit,
    role: searchRole.value,
    keyword: searchKeyword.value
  }).then(res => {
    if (res.code === 200) {
      userList.value = res.data.list
      pagination.value = { ...pagination.value, ...res.data.pagination }
    }
  })
}

const handleSearch = () => {
  pagination.value.page = 1
  fetchUserList()
}

const handlePageChange = (page) => {
  pagination.value.page = page
  fetchUserList()
}

const handleEdit = (id) => {
  window.location.href = `/user/edit/${id}`
}

const handleDelete = (id) => {
  if (confirm('确定要删除这个用户吗？')) {
    userApi.delete(id).then(res => {
      if (res.code === 200) {
        ElMessage.success('删除成功')
        fetchUserList()
      } else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  }
}

const handleToggleStatus = (id, status) => {
  const newStatus = status === 'active' ? 'inactive' : 'active'
  userApi.status(id, { status: newStatus }).then(res => {
    if (res.code === 200) {
      ElMessage.success(`${newStatus === 'active' ? '启用' : '禁用'}成功`)
      fetchUserList()
    } else {
      ElMessage.error(res.message)
    }
  })
}

onMounted(() => {
  fetchUserList()
})
</script>

<style>
.user-list {
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