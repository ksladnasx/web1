<template>
  <div class="comment-section">
    <!-- 评论输入框 -->
    <div class="comment-input">
      <textarea
        v-model="newComment"
        placeholder="写下你的评论..."
        rows="3"
      ></textarea>
      <button @click="addComment" :disabled="!newComment.trim()">发布</button>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list">
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
          <textarea
            v-model="newReply"
            placeholder="写下你的回复..."
            rows="2"
          ></textarea>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 模拟数据
const comments = reactive([
  {
    id: 1,
    username: '用户A',
    avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    content: '这是一条示例评论',
    time: new Date(),
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 11,
        username: '用户B',
        avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
        content: '这是一条回复',
        time: new Date(), 
      }
    ]
  },
  {
    id: 2,
    username: '用户A',
    avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    content: '这是一条示例评论',
    time: new Date(),
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 12,
        username: '用户B',
        avatar: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
        content: '这是一条回复',
        time: new Date(), 
      }
    ]
  }
]);

const newComment = ref('');
const newReply = ref('');
const activeReplyId = ref(null);
const isAdmin = ref(true); // 模拟管理员身份

const addComment = () => {
  if (newComment.value.trim()) {
    comments.unshift({
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
  const comment = comments.find(c => c.id === commentId);
  comment.isLiked = !comment.isLiked;
  comment.likes += comment.isLiked ? 1 : -1;
};

const toggleReply = (commentId) => {
  activeReplyId.value = activeReplyId.value === commentId ? null : commentId;
};

const addReply = (commentId) => {
  if (newReply.value.trim()) {
    const comment = comments.find(c => c.id === commentId);
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
  const index = comments.findIndex(c => c.id === commentId);
  if (index !== -1) comments.splice(index, 1);
};

const formatTime = (date) => {
  return new Date(date).toLocaleString();
};
</script>

<style scoped>
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