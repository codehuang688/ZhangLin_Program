<template>
  <div class="activity-form">
    <div class="page-header">
      <h2 class="page-title">{{ isEdit ? '编辑活动' : '添加活动' }}</h2>
      <el-button @click="handleBack">返回列表</el-button>
    </div>

    <el-form :model="form" ref="formRef" class="form-container">
      <el-form-item label="活动名称" prop="title" required>
        <el-input v-model="form.title" placeholder="请输入活动名称" />
      </el-form-item>

      <el-form-item label="活动类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option v-for="t in activityTypes" :key="t.value" :label="t.label" :value="t.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="描述" prop="description" required>
        <el-input v-model="form.description" type="textarea" placeholder="请输入活动描述" />
      </el-form-item>

      <el-form-item label="地点" prop="place" required>
        <el-input v-model="form.place" placeholder="请输入活动地点" />
      </el-form-item>

      <el-form-item label="封面图片" prop="image">
        <el-input v-model="form.image" placeholder="请输入图片URL" />
      </el-form-item>

      <el-form-item label="开始时间" prop="startTime" required>
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择开始时间"
        />
      </el-form-item>

      <el-form-item label="结束时间" prop="endTime" required>
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择结束时间"
        />
      </el-form-item>

      <el-form-item label="名额" prop="capacity">
        <el-input v-model.number="form.capacity" type="number" placeholder="请输入名额数量" />
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
import { activityApi } from '../api'

const isEdit = ref(false)
const activityId = ref(null)
const formRef = ref(null)

const form = ref({
  title: '',
  type: 'activity',
  description: '',
  place: '',
  image: '',
  startTime: '',
  endTime: '',
  capacity: 30,
  enrolled: 0,
  status: 'upcoming'
})

const activityTypes = ref([])

const fetchActivityTypes = () => {
  activityApi.types().then(res => {
    if (res.code === 200) {
      activityTypes.value = res.data
    }
  })
}

const fetchActivity = (id) => {
  activityApi.get(id).then(res => {
    if (res.code === 200) {
      form.value = res.data
    }
  })
}

const handleSubmit = () => {
  if (!form.value.title || !form.value.description || !form.value.place || !form.value.startTime || !form.value.endTime) {
    ElMessage.warning('请填写必填字段')
    return
  }

  if (isEdit.value) {
    activityApi.update(activityId.value, form.value).then(res => {
      if (res.code === 200) {
        ElMessage.success('更新成功')
        window.location.href = '/activity'
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    activityApi.add(form.value).then(res => {
      if (res.code === 200) {
        ElMessage.success('添加成功')
        window.location.href = '/activity'
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}

const handleBack = () => {
  window.location.href = '/activity'
}

onMounted(() => {
  fetchActivityTypes()
  
  const path = window.location.pathname
  if (path.includes('/edit/')) {
    isEdit.value = true
    activityId.value = path.split('/').pop()
    fetchActivity(activityId.value)
  }
})
</script>

<style>
.activity-form {
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