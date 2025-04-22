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
          class="google-style-input" @select="handleSelect" @keyup.enter="handleSearch" :trigger-on-focus="false"
          size="large" clearable>
          <template #prefix>
            <el-icon class="input-icon">
              <Search />
            </el-icon>
          </template>
        </el-autocomplete>
        <div class="action-buttons">
          <el-button class="search-action primary" @click="handleSearch"  size="large" :class="{ 'active-style': searchQuery }" >
            搜索
          </el-button>
        </div>
      </div>
    </div>



    <!--快捷链接区域 -->
    <div class="shortcutcontainer">
      <!-- 在content-wrapper同级位置添加 -->
      <div class="shortcut-container">
        <ShortcutGrid :shortcuts="customShortcuts" class="my-shortcuts" />
      </div>

      <!--  添加快捷方式按键 -->
      <!-- 新增的添加快捷方式按钮 -->
      <div class="add-shortcut">
        <el-button type="primary" @click="showAddDialog" class="add-button">
          添加快捷方式
        </el-button>
      </div>
    </div>


    <!-- 新增的Element Plus弹窗 -->
    <el-dialog v-model="dialogVisible" title="新建快捷方式" width="500px" :close-on-click-modal="false">
      <el-form :model="newShortcut" label-width="80px" ref="shortcutForm" :rules="formRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="newShortcut.name" placeholder="请输入快捷方式名称" clearable />
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="newShortcut.url" placeholder="请输入完整URL（包含http://或https://）" clearable />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="isSubmitting">
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
    url: 'http://localhost:5173/home',
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


<style scoped>
/* 深度适配评论区的色彩体系 */
.google-container {
  background: #1a2330;
  min-height: 60vh;
  padding: 3rem 0;
}

/* 主内容容器优化 */
.content-wrapper {
  width: 860px;
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem;
}

/* 搜索图标重设计 */
.logo-box {
  margin-bottom: 2.5rem;
  text-align: center;
}

.search-icon {
  filter: drop-shadow(0 4px 12px rgba(74, 144, 226, 0.3));
  padding: 12px;
  background: #2d3a4a;
  border-radius: 50%;
}

/* 输入区域布局优化 */
.input-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.2rem;
  align-items: center;
}

/* 深度定制Element组件 */
:deep(.google-style-input) {
  --el-input-bg-color: #2d3a4a;
  --el-input-border-color: #364456;
  --el-input-text-color: #c8d6e5;
  --el-input-hover-border-color: #4a90e2;
  --el-input-focus-border-color: #4a90e2;
}

:deep(.google-style-input .el-input__wrapper) {
  background-color: #2d3a4a;
  border-radius: 36px;
  padding: 0 1.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.google-style-input .el-input__prefix) {
  left: 1.2rem;
}

/* 按钮系统统一 */
.search-action.primary {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  color: #78b4ef;
  border: none;
  border-radius: 36px;
  padding: 0.8rem 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition:
    transform 0.2s ease,
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-action.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.3);
}

.search-action.primary.active-style {
  background: linear-gradient(135deg, #3b7fc1 0%, #4a90e2 100%);
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.5);
  color: azure;
}

/* 快捷链接系统 */
.shortcutcontainer{
  margin: 1rem auto;
  width: 100%;
  max-width: 1200px;
  /* padding: 1rem; */
}

.shortcut-container {
  /* margin: 3rem auto; */
  width: 100%;
  max-width: 1200px;
  display: flex
}

.my-shortcuts {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

/* 快捷方式卡片 */
.app-item {
  background: #212c38;
  border: 1px solid #2d3a4a;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.google-icon {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin-bottom: 1rem;
}

.app-name {
  color: #9ab8d9;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
}

/* 添加按钮统一 */
.add-shortcut {
  margin: 2rem 0;
  text-align: center;
}

.add-button {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  border: none;
  border-radius: 36px;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
}

/* 弹窗深度适配 */
:deep(.el-dialog) {
  --el-dialog-bg-color: #212c38;
  --el-text-color-primary: #c8d6e5;
  --el-border-color-light: #2d3a4a;
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #2d3a4a;
}

:deep(.el-form-item__label) {
  color: #9ab8d9;
  font-weight: 500;
}


:deep(.el-input) {
  --el-input-bg-color: #2d3a4a;
  --el-input-border-color: #364456;
  --el-input-text-color: #c8d6e5;
  --el-input-hover-border-color: #4a90e2;
  --el-input-focus-border-color: #4a90e2;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1.5rem;
  }

  .input-section {
    grid-template-columns: 1fr;
  }

  .my-shortcuts {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
  }

  .app-item {
    padding: 1rem;
  }

  .google-icon {
    width: 56px;
    height: 56px;
  }
}
</style>