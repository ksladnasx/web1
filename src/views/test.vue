<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { defineComponent } from 'vue'
import axios from 'axios';
import { toRef } from 'vue';
import { useAuthStore } from '../stores/authStore';


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
  const res = axios.post("https://jy8b5cnnmg.hzh.sealos.run/addWebComment", {
    webid: webid.value,
    comments: comments.value
  })
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
      username:user.username,
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

//  comments 是 ref 对象（如通过 ref([]) 创建）
watch(comments, (newVal, oldVal) => {
  updateComment();
}, { deep: true }); // 开启深度监听以追踪数组内部变化
</script>


<template>

  <div class="comment-section">
    <!-- 评论输入框 -->
    <div class="comment-input">
      <textarea v-model="newComment" placeholder="写下你的评论..." rows="3"></textarea>
      <div class="comment-action">
        <button @click="addComment" :disabled="!newComment.trim()">发布评论</button>
      <button @click="handleclick">查看评论</button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list" v-if="shouldShow">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <div class="comment-user-info">
            <span><img :src="comment.avatar" class="avatar" alt="用户头像" /></span>
            <span class="comment-username">{{ comment.username }}</span>
          </div>

          <span class="time">{{ formatTime(comment.time) }}</span>
        </div>
        <div class="comment-content">
          {{ comment.content }}
        </div>

        <!-- 操作按钮 -->
        <div class="comment-actions">
          <button @click="toggleLike(comment.id)" class="like-btn">
            👍 {{ comment.likes }} {{ comment.isLiked ? '已赞' : '' }}
          </button>
          <div>
            <button @click="toggleReply(comment.id)">回复</button>
            <button @click="deleteComment(comment.id)" v-if="comment.userid == user.userid" class="del-btn">删除</button>
          </div>

        </div>

        <!-- 回复输入框 -->
        <div v-if="activeReplyId === comment.id" class="reply-input">
          <textarea v-model="newReply" placeholder="写下你的回复..." rows="3" class="reply-textarea"></textarea>
          <button @click="addReply(comment.id)" class="reply-btn">提交回复</button>
        </div>

        <!-- 回复列表 -->
        <div v-if="comment.replies.length" class="reply-list">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <div class="comment-header">
              <div class="comment-user-info">
                <img :src="reply.avatar" class="avatar-small" alt="用户头像" />
                <span class="comment-username reply-username">{{ reply.username }}</span>
              </div>
              <span class="time">{{ formatTime(reply.time) }}</span>
            </div>
            <div class="comment-content">{{ reply.content }}</div>
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
button{
  width: auto;
  height: 30px;
  font-size: 10px;
}
.comment-input textarea {
  width: 90%;
  padding: 20px;
  margin-bottom: 10px;
}
textarea{
  height: 20px; 
}
.comment-action{
  display: flex;
  justify-content: space-between;
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

.comment-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.reply-username{
  font-size: 10px;
}
.comment-username {
  font-weight: bold;
  color: #9cd1ec;
  margin-left: -8px;
  margin-top: -10px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.comment-content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  bottom: 40px;
  color: rgb(255, 255, 255);
}

.del-btn {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;

}

.del-btn:hover {
  background: #7d9fc0;
  color: red;
}
.reply-input{
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
}
.reply-textarea{
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
}
.reply-btn{
  background: #4e6e78;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  height: 40px;
  cursor: pointer;
}
.reply-btn:hover{
  background: #45798c;  
}
.reply-list {
  margin-left: 50px;
  border-left: 2px solid #376967;
  padding-left: 20px;
}
.reply-header{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
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
  /* margin-top: 10px;
  margin-left: 50px; */
  display: flex;
  justify-content: space-between;
}
</style>