<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useAuthStore } from '../stores/authStore';
const form = ref()

const Authstore = useAuthStore()
const handleComplain = () => {
  if (!Authstore.$state.isAuthenticated) {
    const isConfirmed = confirm("请先登录，确认跳转到登录页面？");
    if (isConfirmed) {
      window.location.href = '/login'; // 原生跳转
      // 或前端路由：this.$router.push('/login');
    }
    return;
  } else {
    // 获取表单数据
    const formData = form.value; // 获取绑定的表单数据
    console.log("提交的表单数据：", formData);
    // 模拟成功提交
    alert("感谢您的反馈！");
    router.push('/');
  }
}
</script>

<template>
  <div class="mainpage">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold mb-6">关于我们</h1>
      <div>
        -----------------------------------------------------------------------------------------------------------------------
      </div>
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">网站目标</h2>
        <p class="text-gray-600">
          帮助用户高效发现优质网络资源，为大学生和研究人员提供精选的学术工具和资源导航。
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">审核标准</h2>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>内容真实可靠，无虚假或误导信息</li>
          <li>优先收录免费或提供免费版本的网站</li>
          <li>拒绝含有恶意广告或弹窗的网站</li>
          <li>重视用户体验和访问速度</li>
          <li>确保资源的学术性和专业性</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4">联系我们</h2>
        <form class="space-y-4" @submit.prevent="handleComplain">
          <div>
            <label for="feedback" class="block text-sm font-medium text-gray-700">
              反馈建议
            </label>
            <textarea v-model="form" id="feedback" rows="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="请输入您的反馈或建议..."></textarea>
          </div>
          <button type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            提交反馈
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.mainpage {
  text-align: center;
  height: 100%;
}
</style>