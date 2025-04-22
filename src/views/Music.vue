<template>
  <div class="mainpage">
      <!-- <button >换图片</button> -->
      <h1>{{ songsname }}</h1>
      <h6>{{ player }}</h6>
      <img :src="imageUrl" id="im" alt="动态图片" class="imge" />

      <p>
          <button @click="changeRanks('热歌榜')" :class="{ 'active': rank === '热歌榜' }" id="热歌榜">热歌榜</button>
          <button @click="changeRanks('飙升榜')" :class="{ 'active': rank === '飙升榜' }" id="飙升榜">飙升榜</button>
          <button @click="changeRanks('原创榜')" :class="{ 'active': rank === '原创榜' }" id="原创榜">原创榜</button>
          <button @click="changeRanks('新歌榜')" :class="{ 'active': rank === '新歌榜' }" id="新歌榜">新歌榜</button>
      </p>
      <div style="padding-top:30px ;">
          <audio :src="songUrl" controls style="width: 600px; " @error="handleError"></audio>
          <!-- @error="handleError"当播放源因为是vip歌曲而产生错误时，触发handleError函数，自动跳到下一首 -->
          <button @click="changeSongs" class="nextSongs">下一首</button>
      </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

// 定义一个响应式变量来存储图片 URL
const imageUrl = ref("https://p1.music.126.net/R7yzr15Ftp4Mf59kTvy_uA==/109951167605022957.jpg");
let songsname = ref("紫荆花盛开")
let songUrl = ref("https://music.163.com/song/media/outer/url?id=1959528822")
let player = ref("李荣浩/梁咏琪")
let mainUrl = ref("https://api.vvhan.com/api/wyMusic/飙升榜?type=json")
let rank = ref("热歌榜")
// 排行榜切换函数

function changeRanks(name: string) {
  rank.value = name;
  mainUrl.value = `https://api.vvhan.com/api/wyMusic/${name}?type=json`
  // const button = document.getElementById(name)
  // button.style.backgroundColor = "#ff6600";
  // console.log(mainUrl.value)
}


// 图片更换函数
async function changeSongs() {
  // const res = await axios.get("https://api.vvhan.com/api/wallpaper/views?type=json") //json格式的风景图片API
  const ress = await axios.get(mainUrl.value)
  console.log(ress.data)
  // 通过随机查询参数或使用新的图片 API 来加载新图片
  imageUrl.value = ress.data.info.pic_url;
  songsname.value = ress.data.info.name;
  songUrl.value = ress.data.info.url;
  player.value = ress.data.info.auther;
  
  // 更新歌曲 URL 后，自动播放音频
  const audio = document.querySelector('audio')!;
  // audio.load(); // 重新加载音频
  audio.play(); // 播放音频
}



// 处理音频播放错误
function handleError() {
  changeSongs(); // 当播放遇到错误时，自动切换到下一首
}


// 波浪效果脚本
let boLangScript: HTMLScriptElement | null = null;

onMounted(() => {
// 动态加载波浪脚本
boLangScript = document.createElement('script');
boLangScript.type = 'text/javascript';
boLangScript.src = 'https://api.vvhan.com/api/script/bolang';
boLangScript.defer = true;
document.body.appendChild(boLangScript);


// 找到音频元素
const audio = document.querySelector('audio')!;

// 监听音频播放和暂停事件
audio.addEventListener('play', () => {
  const img = document.querySelector('.imge')!;
  img.classList.add('rotate-animation'); // 添加旋转动画类
});

audio.addEventListener('pause', () => {
  const img = document.querySelector('.imge')!;
  img.classList.remove('rotate-animation'); // 移除旋转动画类
});
});

onUnmounted(() => {
// 卸载组件时移除波浪脚本
if (boLangScript) {
  document.body.removeChild(boLangScript);
}

// 移除波浪脚本生成的 DOM 元素
const bolangElement = document.querySelector('.vh-bolang');
if (bolangElement) {
  document.body.removeChild(bolangElement);
}

// 移除波浪脚本注入的样式
const styleSheets = Array.from(document.styleSheets);
styleSheets.forEach((styleSheet) => {
  try {
    if (styleSheet.href === 'https://api.vvhan.com/api/script/bolang') {
      const ownerNode = styleSheet.ownerNode as HTMLStyleElement;
      if (ownerNode) {
        ownerNode.remove();
      }
    }
  } catch (error) {
    // 捕获错误并忽略
  }
});
});
</script>

<style scoped>
.mainpage{
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 5vh;
}

/* 当前选中榜单的按钮样式 */
button.active {
  background-color: red !important;
  color: white;
}

/* 这里可以添加样式 */
.imge {
  position: relative;
 
  width: 300px;
  border-radius: 100%;
}

.nextSongs {
  position: relative;
  bottom: 19px;
  left: 50px;
  background-color: rgb(188, 220, 220);
  width: 100px;
}

/* 新增旋转动画 */
.rotate-animation {
  animation: rotate 15s linear infinite; /* 5秒旋转一周，无限循环 */
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>