<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { defineComponent } from 'vue'
import axios from 'axios';
import { defineProps } from 'vue';
import { toRef } from 'vue';


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
const shouldShow = ref(false); // 控制评论区的显示和隐藏\
watch(webid, (newVal) => {
  comments.value=[]
  shouldShow.value=false
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
const isAdmin = ref(true); // 模拟管理员身份

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.value.unshift({
      id: Date.now(),
      username: '当前用户',
      avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
      content: newComment.value.trim(),
      time: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    });
    newComment.value = '';
  }
};

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
      username: '当前用户',
      avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
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

</script>


<template>

  <div class="comment-section">
    <!-- 评论输入框 -->
    <div class="comment-input">
      <textarea v-model="newComment" placeholder="写下你的评论..." rows="3"></textarea>
      <button @click="addComment" :disabled="!newComment.trim()">发布</button>
      <button @click="handleclick">查看评论</button>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list" v-if="shouldShow">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <img :src="comment.avatar" class="avatar" alt="用户头像" />
          <span class="username">{{ comment.username }}</span>
          <span class="time">{{ formatTime(comment.time) }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>

        <!-- 操作按钮 -->
        <div class="comment-actions">
          <button @click="toggleLike(comment.id)" class="like-btn">
            👍 {{ comment.likes }} {{ comment.isLiked ? '已赞' : '' }}
          </button>
          <button @click="toggleReply(comment.id)">回复</button>
          <button @click="deleteComment(comment.id)" v-if="isAdmin">删除</button>
        </div>

        <!-- 回复输入框 -->
        <div v-if="activeReplyId === comment.id" class="reply-input">
          <textarea v-model="newReply" placeholder="写下你的回复..." rows="2"></textarea>
          <button @click="addReply(comment.id)">提交回复</button>
        </div>

        <!-- 回复列表 -->
        <div v-if="comment.replies.length" class="reply-list">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <div class="reply-header">
              <img :src="reply.avatar" class="avatar-small" alt="用户头像" />
              <span class="username">{{ reply.username }}</span>
              <span class="time">{{ formatTime(reply.time) }}</span>
            </div>
            <div class="reply-content">{{ reply.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有评论时的提示信息 -->
    <div v-if="shouldShow && comments.length === 0" class="no-comments">
      <p>暂无评论，快来抢沙发吧！</p>
    </div>
  </div>
</template>
<style scoped>
.no-comments {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 5vh;
  font-weight: bold;
}

.comment-section {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.comment-input textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.comment-item {
  border: 1px solid #eee;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-content {
  margin-left: 50px;
  color: rgb(255, 255, 255);
}

.reply-list {
  margin-left: 50px;
  border-left: 2px solid #376967;
  padding-left: 20px;
}

.reply-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #4a6b8c;
  border-radius: 5px;
}

.avatar-small {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.like-btn {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
}

.like-btn:hover {
  background: #7d9fc0;
}

.comment-actions {
  margin-top: 10px;
  margin-left: 50px;
}
</style>