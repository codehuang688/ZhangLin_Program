<template>
  <div class="user-form">
    <div class="page-header">
      <h2 class="page-title">{{ isEdit ? '编辑用户' : '添加用户' }}</h2>
      <el-button @click="handleBack">返回列表</el-button>
    </div>

    <el-form :model="form" ref="formRef" class="form-container">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="form.username" placeholder="请输入用户名" :disabled="isEdit" />
      </el-form-item>

      <el-form-item label="昵称" prop="nickname" required>
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="密码" :required="!isEdit">
        <el-input
          v-model="form.password"
          type="password"
          :placeholder="isEdit ? '不修改请留空' : '请输入密码'"
        />
      </el-form-item>

      <el-form-item label="角色" prop="role" required>
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option v-for="r in roles" :key="r.value" :label="r.label" :value="r.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" active-value="active" inactive-value="inactive" />
        <span>{{ form.status === 'active' ? '正常' : '禁用' }}</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { userApi } from '../api'

const isEdit = ref(false)
const userId = ref(null)
const formRef = ref(null)

const form = ref({
  username: '',
  nickname: '',
  password: '',
  role: 'visitor',
  status: 'active'
})

const roles = ref([])

const fetchRoles = () => {
  userApi.roles().then(res => {
    if (res.code === 200) {
      roles.value = res.data
    }
  })
}

const fetchUser = (id) => {
  userApi.get(id).then(res => {
    if (res.code === 200) {
      form.value = res.data
    }
  })
}

const handleSubmit = () => {
  if (!form.value.username || !form.value.nickname || !form.value.role) {
    ElMessage.warning('请填写必填字段')
    return
  }

  if (!isEdit.value && !form.value.password) {
    ElMessage.warning('请设置密码')
    return
  }

  const submitData = { ...form.value }
  if (!submitData.password) {
    delete submitData.password
  }

  if (isEdit.value) {
    userApi.update(userId.value, submitData).then(res => {
      if (res.code === 200) {
        ElMessage.success('更新成功')
        window.location.href = '/user'
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    userApi.add(submitData).then(res => {
      if (res.code === 200) {
        ElMessage.success('添加成功')
        window.location.href = '/user'
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}

const handleBack = () => {
  window.location.href = '/user'
}

onMounted(() => {
  fetchRoles()
  
  const path = window.location.pathname
  if (path.includes('/edit/')) {
    isEdit.value = true
    userId.value = path.split('/').pop()
    fetchUser(userId.value)
  }
})
</script>

<style>
.user-form {
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

.form-container {
  max-width: 600px;
}
</style>