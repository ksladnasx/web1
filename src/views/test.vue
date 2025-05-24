<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { defineComponent } from 'vue'
import axios from 'axios';
import { toRef } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { ElMessage } from 'element-plus';



// 获取 父组件传的WebID
const props = defineProps({
  webid: {
    type: String, // 或 Number
    required: true
  }
});

// get website by webid
const webid = toRef(props, 'webid'); // 创建响应式引用，并将父组件的 props 值赋给它
const comments = ref([]);
const mem = ref("")
const shouldShow = ref(false); // 控制评论区的显示和隐藏
// 监听 webid 的变化，如果变化则清空评论数据防止缓存污染
watch(webid, (newVal) => {
  comments.value = []
  shouldShow.value = false
});
// 
const fetchcomment = async (webids) => {
  try {
    const response = await axios.post("https://jy8b5cnnmg.hzh.sealos.run/getComment",
      {
        webid: webids, // 示例网站 ID
      },
    );
    if (response.data.code != 200) {
      console.error('Error fetching:', response.data.message)
      comments.value = []; // 清空评论数据
      return;
    }
    console.log(response.data.data.rep)
    // 检查返回的结构是否正确
    if (response.data.data.rep) {
      comments.value = response.data.data.rep; // 将返回的网站数据存储到 websites 中
    } else {
      console.warn('Invalid API response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching websites:', error);
  }
}
//if click the button, show the comment area and request the comment data
const handleclick = () => {
  if (mem.value == webid.value) {
    shouldShow.value = !shouldShow.value;
    return
  }
  if (!shouldShow.value) {
    fetchcomment(webid.value); // 显示评论区时获取评论数据
    mem.value = webid.value; // 记录当前 webid，下次点击时只获取新数据
  }
  shouldShow.value = !shouldShow.value; // 切换评论区的显示状态
};


//add comment and other 
const newComment = ref('');
const newReply = ref('');
const activeReplyId = ref(null);
const user = JSON.parse(localStorage.getItem('user'))
const addComment = () => {
  if (!user) {
    const isConfirmed = confirm("请先登录，确认跳转到登录页面？");
    if (isConfirmed) {
      window.location.href = '/login'; // 原生跳转
      // 或前端路由：this.$router.push('/login');
    }
    return;
  }
  if (newComment.value.trim()) {
    comments.value.unshift({  //插入符合数据格式的数据
      id: Date.now(),
      username: user.username,
      userid: user.userid,
      avatar: user.avatar,
      content: newComment.value.trim(),
      time: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    });
    newComment.value = '';
  }
};


const updateComment = async () => {

  // 后台添加评论的 API
  try {
    const res = axios.post("https://jy8b5cnnmg.hzh.sealos.run/addWebComment", {
      webid: webid.value,
      comments: comments.value
    })
  } catch (error) {
    console.error('Error updateComment:', error)
  }
}

const toggleLike = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId);
  comment.isLiked = !comment.isLiked;
  comment.likes += comment.isLiked ? 1 : -1;
};

const toggleReply = (commentId) => {
  activeReplyId.value = activeReplyId.value === commentId ? null : commentId;
};

const addReply = (commentId) => {
  if (newReply.value.trim()) {
    const comment = comments.value.find(c => c.id === commentId);
    comment.replies.push({
      id: Date.now(),
      username: user.username,
      userid: user.userid,
      avatar: user.avatar,
      content: newReply.value.trim(),
      time: new Date()
    });
    newReply.value = '';
    activeReplyId.value = null;
  }
};

const deleteComment = (commentId) => {
  const index = comments.value.findIndex(c => c.id === commentId);
  if (index !== -1) comments.value.splice(index, 1);

};

const formatTime = (date) => {
  return new Date(date).toLocaleString();
};

// const form = reactive({
//   name: '',
//   email: ''
// });
// const handlelogin = async () => {
//   if (!form.name || !form.email) {
//     alert("用户名和邮箱不能为空")
//     return
//   }
//   // 发送登录请求
//   try {
//     const response = await axios.post("http://localhost:3000/users", {
//       name: form.name,
//       email: form.email
//     });
//     if (response.data.code == 200) {
//       // localStorage.setItem('user', JSON.stringify(response.data.data.user))
//       console.log("登录成功")
//     } else {
//       alert(response.data.msg)
//       console.error('登录失败:', response.data.msg)
//     }
//   } catch (error) {
//     alert("dsf")

//     console.error('Error login:', error);
//   }
// }

//  comments 是 ref 对象（如通过 ref([]) 创建）
watch(comments, (newVal, oldVal) => {
  updateComment();
}, { deep: true }); // 开启深度监听以追踪数组内部变化
</script>


<template>


  <div class="comment-container">
    <!-- 登录表单-->
    <!-- <div class="login-form">
      <el-form>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="password" placeholder="请输入邮箱" v-model="form.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="handlelogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <!-- 头部操作 -->
    <div class="comment-operations">
      <button @click="handleclick" class="toggle-btn gradient-bg">
        {{ shouldShow ? "▲ 收起评论" : "▼ 查看评论" }} ({{ comments.length }})
      </button>
    </div>

    <!-- 评论区主体 -->
    <transition name="comment-slide">
      <div v-if="shouldShow" class="comment-main dark-bg">
        <!-- 输入区域 -->
        <div class="comment-creator">
          <textarea v-model="newComment" placeholder="写下你的评论..." class="neo-input" rows="3"></textarea>
          <div class="action-buttons">
            <button @click="addComment" :disabled="!newComment.trim()" class="gradient-btn">
              发布评论
            </button>
          </div>
        </div>

        <!-- 评论列表 -->
        <div v-if="comments.length > 0" class="comment-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <!-- 用户信息 -->
            <div class="user-profile">
              <img :src="comment.avatar" class="user-avatar" />
              <span class="username">{{ comment.username }}</span>
            </div>

            <!-- 评论内容 -->
            <div class="comment-content">
              <div class="comment-header">
                <time class="comment-time">{{ formatTime(comment.time) }}</time>
                <div class="comment-actions">
                  <button @click="toggleLike(comment.id)" :class="['icon-btn', { 'liked': comment.isLiked }]">
                    ❤️ {{ comment.likes || 0 }}
                  </button>
                  <button @click="toggleReply(comment.id)" class="icon-btn">
                    💬
                  </button>
                  <button v-if="comment.userid === user?.userid" @click="deleteComment(comment.id)"
                    class="icon-btn danger">
                    🗑️
                  </button>
                </div>
              </div>

              <p class="comment-text">{{ comment.content }}</p>

              <!-- 回复输入 -->
              <div v-if="activeReplyId === comment.id" class="reply-creator">
                <textarea v-model="newReply" placeholder="写下你的回复..." class="neo-input" rows="2"></textarea>
                <div class="reply-actions">
                  <button @click="activeReplyId = null" class="cancel-btn">
                    取消
                  </button>
                  <button @click="addReply(comment.id)" class="gradient-btn">
                    提交
                  </button>
                </div>
              </div>

              <!-- 回复列表 -->
              <div v-if="comment.replies?.length" class="reply-list">
                <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                  <div class="user-profile">
                    <img :src="reply.avatar" class="user-avatar small" />
                    <span class="username">{{ reply.username }}</span>
                  </div>
                  <div class="reply-content">
                    <time class="reply-time">{{ formatTime(reply.time) }}</time>
                    <p class="reply-text">{{ reply.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <div class="empty-icon">💬</div>
          <p>成为第一个评论者</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


/* 基础容器 */
.comment-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Segoe UI', system-ui;
}

/* 深蓝主题 */
.dark-bg {
  background: #1a2330;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 24px;
}

/* 操作按钮 */
.toggle-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #2d87d0 0%, #1f6ab0 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.toggle-btn:hover {
  transform: translateY(-1px);
}

/* 输入区域 */
.comment-creator {
  margin-bottom: 32px;
}

.neo-input {
  width: 90%;
  padding: 14px;
  background: #2d3a4a;
  border: 1px solid #364456;
  border-radius: 8px;
  color: #c8d6e5;
  resize: none;
  transition: border-color 0.3s;
}

.neo-input:focus {
  border-color: #4a90e2;
  outline: none;
}

.reply-actions {
  display: flex;
  width: 30%;
  justify-self: end;
  justify-content: space-evenly;
}


/* 用户信息 */
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin-right: 20px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #4a90e2;
  margin-bottom: 8px;
}

.user-avatar.small {
  width: 36px;
  height: 36px;
}

.username {
  color: #9ab8d9;
  font-size: 0.9em;
  text-align: center;
  word-break: break-word;
  max-width: 80px;
}

/* 评论内容 */
.comment-item {
  display: flex;
  padding: 20px;
  margin: 16px 0;
  background: #212c38;
  border-radius: 10px;
  border: 1px solid #2d3a4a;
}

.comment-content {
  width: 100%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.comment-time {
  color: #6d8498;
  font-size: 0.85em;
}

.comment-actions {
  display: flex;
  justify-self: end;
}

.comment-text {
  color: #c8d6e5;
  line-height: 1.6;
  margin: 0;
}

/* 互动按钮 */
.icon-btn {
  background: none;
  border: none;
  color: #6d8498;
  padding: 6px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-btn:hover {
  color: #4a90e2;
  transform: scale(1.1);
}

.icon-btn.liked {
  color: #ff5a5f;
}

/* 回复列表 */
.reply-list {
  margin-top: 20px;
  padding-left: 24px;
  border-left: 2px solid #2d3a4a;
}

.reply-item {
  display: flex;
  margin: 12px 0;
  padding: 12px;
  background: #1a2330;
  border-radius: 8px;
}

.reply-content {
  flex: 1;
}

.reply-time {
  color: #6d8498;
  font-size: 0.8em;
  display: block;
  margin-bottom: 4px;
}

/* 按钮特效 */
.action-buttons {
  display: flex;
  width: 20%;
  justify-self: flex-end;
  justify-content: space-evenly;
}

.gradient-btn {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.gradient-btn:hover {
  opacity: 0.9;
}

.cancel-btn {
  background: linear-gradient(135deg, #e2614a 0%, #c15a3b 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.cancel-btn:hover {
  opacity: 0.9;
  color: #000;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #6d8498;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* 动效 */
.comment-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.comment-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.comment-slide-enter-from,
.comment-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>