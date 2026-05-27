<template>
  <div class="scenic-form">
    <div class="page-header">
      <h2 class="page-title">{{ isEdit ? '编辑景点' : '添加景点' }}</h2>
      <el-button @click="handleBack">返回列表</el-button>
    </div>

    <el-form :model="form" ref="formRef" class="form-container">
      <el-form-item label="景点名称" prop="name" required>
        <el-input v-model="form.name" placeholder="请输入景点名称" />
      </el-form-item>

      <el-form-item label="分类" prop="category" required>
        <el-select v-model="form.category" placeholder="请选择分类">
          <el-option v-for="cat in categories" :key="cat.name" :label="cat.name" :value="cat.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="描述" prop="description" required>
        <el-input v-model="form.description" type="textarea" placeholder="请输入景点描述" />
      </el-form-item>

      <el-form-item label="主图URL" prop="image">
        <el-input v-model="form.image" placeholder="请输入图片URL" />
      </el-form-item>

      <el-form-item label="开放时间" prop="openTime">
        <el-input v-model="form.openTime" placeholder="例如：09:00-17:30" />
      </el-form-item>

      <el-form-item label="门票价格" prop="ticketPrice">
        <el-input v-model="form.ticketPrice" placeholder="例如：免费 或 30元" />
      </el-form-item>

      <el-form-item label="位置" prop="location">
        <el-input v-model="form.location" placeholder="请输入景点位置" />
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" active-value="open" inactive-value="closed" />
        <span>{{ form.status === 'open' ? '开放' : '关闭' }}</span>
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
import { scenicApi } from '../api'

const isEdit = ref(false)
const scenicId = ref(null)
const formRef = ref(null)

const form = ref({
  name: '',
  category: '',
  description: '',
  image: '',
  gallery: [],
  features: [],
  openTime: '09:00-17:00',
  ticketPrice: '免费',
  location: '',
  status: 'open'
})

const categories = ref([])

const fetchCategories = () => {
  scenicApi.categories().then(res => {
    if (res.code === 200) {
      categories.value = res.data
    }
  })
}

const fetchScenic = (id) => {
  scenicApi.get(id).then(res => {
    if (res.code === 200) {
      form.value = res.data
    }
  })
}

const handleSubmit = () => {
  if (!form.value.name || !form.value.category || !form.value.description) {
    ElMessage.warning('请填写必填字段')
    return
  }

  if (isEdit.value) {
    scenicApi.update(scenicId.value, form.value).then(res => {
      if (res.code === 200) {
        ElMessage.success('更新成功')
        window.location.href = '/scenic'
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    scenicApi.add(form.value).then(res => {
      if (res.code === 200) {
        ElMessage.success('添加成功')
        window.location.href = '/scenic'
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}

const handleBack = () => {
  window.location.href = '/scenic'
}

onMounted(() => {
  fetchCategories()
  
  const path = window.location.pathname
  if (path.includes('/edit/')) {
    isEdit.value = true
    scenicId.value = path.split('/').pop()
    fetchScenic(scenicId.value)
  }
})
</script>

<style>
.scenic-form {
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