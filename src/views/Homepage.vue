<template>
  <div class="google-container">
    <!-- 主体内容容器 -->
    <div class="content-wrapper">
      <!-- 自定义搜索图标 -->
      <div class="logo-box">
        <el-icon :size="88" color="#4285f4" class="search-icon">
          <Search />
        </el-icon>
      </div>

      <!-- 搜索输入区域 -->
      <div class="input-section">
        <el-autocomplete v-model="searchQuery" :fetch-suggestions="querySearch" placeholder="在搜索中查找..."
          class="google-style-input" @select="handleSelect" @keyup.enter="handleSearch" :trigger-on-focus="false" size="large" clearable>
          <template #prefix>
            <el-icon class="input-icon">
              <Search />
            </el-icon>
          </template>
        </el-autocomplete>
        <div class="action-buttons">
          <el-button class="search-action primary" @click="handleSearch">
            搜索
          </el-button>
        </div>
      </div>



    </div>
    <!--快捷链接区域 -->
    <!-- 在content-wrapper同级位置添加 -->
    <div class="shortcut-container">
      <ShortcutGrid :shortcuts="customShortcuts" class="my-shortcuts" />
    </div>

    <!--  添加快捷方式按键 -->
    <!-- 新增的添加快捷方式按钮 -->
  <div class="add-shortcut">
    <el-button 
      type="primary" 
      @click="showAddDialog"
      class="add-button"
    >
      添加快捷方式
    </el-button>
  </div>

  <!-- 新增的Element Plus弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    title="新建快捷方式"
    width="500px"
    :close-on-click-modal="false"
  >
    <el-form 
      :model="newShortcut" 
      label-width="80px"
      ref="shortcutForm"
      :rules="formRules"
    >
      <el-form-item label="名称" prop="name">
        <el-input 
          v-model="newShortcut.name" 
          placeholder="请输入快捷方式名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input 
          v-model="newShortcut.url" 
          placeholder="请输入完整URL（包含http://或https://）"
          clearable
        />
      </el-form-item>
    </el-form>
    
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button 
        type="primary" 
        @click="confirmAdd"
        :loading="isSubmitting"
      >
        确认添加
      </el-button>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '../router';
import { ElMessage, FormInstance } from 'element-plus';

const searchQuery = ref('');

// 搜索建议逻辑
const querySearch = async (query: string, cb: Function) => {
  const results = [
    { value: 'Vue3 最新特性' },
    { value: 'Element Plus 组件指南' },
    { value: 'TypeScript 高级技巧' }
  ];
  cb(results.filter(item => item.value.toLowerCase().includes(query.toLowerCase())));
};

const customShortcuts = ref([
  {
    name: '主页',
    url: 'http://localhost:5173/homepage',
    icon: 'https://img.ixintu.com/download/jpg/201911/e25b904bc42a74d7d77aed81e66d772c.jpg!con',
    iconType: 'url',
    color: '#34a853'
  },
  {
    name: 'Maps',
    url: 'http://localhost:5173/star-map',
    icon: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.BVwA0oMrj2WXE2qlVn-EJQHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
    iconType: 'url',
    size: 72
  },
  {
    name: 'Music',
    url: 'http://localhost:5173/music',
    icon: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.CFF5Arip7HzRXTSkZAIg0gHaHH?rs=1&pid=ImgDetMain',
    iconType: 'url',
    
  }
]); // 
const handleSelect = (item: { value: string }) => {
  searchQuery.value = item.value;
  handleSearch();
};
const handleSearch = () => {
  if (searchQuery.value) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
  }
}

// 新增响应式数据
const dialogVisible = ref(false);
const isSubmitting = ref(false);
const shortcutForm = ref<FormInstance>();
const newShortcut = reactive({
  name: '',
  url: ''
});

// 新增表单验证规则
const formRules = {
  name: [
    { required: true, message: '名称不能为空', trigger: 'blur' },
    { max: 20, message: '名称长度不能超过20个字符', trigger: 'blur' }
  ],
  url: [
    { required: true, message: '链接不能为空', trigger: 'blur' },
    { 
      pattern: /^(https?:\/\/)/,
      message: '链接必须包含http://或https://协议头',
      trigger: 'blur'
    }
  ]
};

// 显示弹窗方法
const showAddDialog = () => {
  dialogVisible.value = true;
  // 重置表单数据
  Object.assign(newShortcut, { name: '', url: '' });
  shortcutForm.value?.resetFields();
};

// 确认添加方法
const confirmAdd = async () => {
  try {
    isSubmitting.value = true;
    // 执行表单验证
    await shortcutForm.value?.validate();
    
    // 添加数据到快捷方式数组
    customShortcuts.value.push({
      name: newShortcut.name,
      url: newShortcut.url,
      icon: 'Link',
      iconType: 'element',
      color: '#409EFF'
    });
    
    ElMessage.success('快捷方式添加成功');
    dialogVisible.value = false;
    
    // 这里可以添加本地存储逻辑（可选）
    // localStorage.setItem('shortcuts', JSON.stringify(customShortcuts));
  } catch (error) {
    console.error('验证失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style>
/* 全局居中布局 */
.google-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  background-color: #1c212f;
}

/* 内容容器 */
.content-wrapper {
  width: 584px;
  max-width: 90%;
  text-align: center;
}

/* 图标布局 */
.logo-box {
  margin-bottom: 32px;
}

.search-icon {
  filter: drop-shadow(0 2px 8px rgba(66, 133, 244, 0.2));
}


/* 按钮样式 */
.action-buttons {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.search-action {
  background: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  font: 14px/20px Arial, sans-serif;
  padding: 0 18px;
  height: 36px;
  transition: all 0.1s ease;
}

.search-action.primary {
  background: #4285f4;
  color: #fff;
  border-color: #4285f4;
  margin-right: 8px;
}

.search-action:hover {
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  border-color: #dadce0;
}

/* 下拉建议框 */
:deep(.el-autocomplete__popper) {
  width: 584px !important;
  max-width: 90%;
  margin-top: 10px !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.el-autocomplete__popper .el-select-dropdown__item) {
  color: #202124 !important;
  padding: 12px 20px !important;
  font-size: 14px !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 16px;
  }

  :deep(.google-style-input .el-input__wrapper) {
    height: 42px;
    border-radius: 22px !important;
    padding: 0 36px;
  }

  .search-icon {
    height: 72px;
  }
}

.input-section {
  display: flex;
  justify-content: center;
  align-items: center;
}


.shortcut-container {
  margin-top: 40px;
  width: 80%;
  max-width: 1200px;
}

.app-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}

.app-item {
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}

.app-item:hover {
  transform: translateY(-5px);
}

.google-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-letter {
  color: white;
  font: 500 24px/1 'Roboto', sans-serif;
  margin-top: -2px;
  margin-left: 2px;
}

.app-name {
  margin-top: 8px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 新增样式 */
.add-shortcut {
  margin-top: 30px;
  text-align: center;
}

.add-button {
  padding: 12px 30px;
  font-size: 14px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
}

/* 弹窗表单样式优化 */
.el-dialog__body {
  padding: 20px 25px;
}

.el-form-item {
  margin-bottom: 18px;
}

.el-input__inner {
  border-radius: 8px;
}
</style>