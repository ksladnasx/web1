<template>
    <div>
        <!-- <button >换图片</button> -->
        <h1>{{ songsname }}</h1>
        <h6>{{ player }}</h6>   
        <img :src="imageUrl" id="im" alt="动态图片" class="imge" />
        <audio :src="songUrl" controls></audio>
        <p>
        <button @click="changeRanks('热歌榜')" :class="{'active': rank === '热歌榜'}" id="热歌榜">热歌榜</button>
        <button @click="changeRanks('飙升榜')" :class="{'active': rank === '飙升榜'}" id="飙升榜">飙升榜</button>
        <button @click="changeRanks('原创榜')" :class="{'active': rank === '原创榜'}" id="原创榜">原创榜</button>
        <button @click="changeRanks('新歌榜')" :class="{'active': rank === '新歌榜'}" id="新歌榜">新歌榜</button>
        </p>
        <button @click="changeSongs" class="nextSongs">下一首</button>
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
}



let snowScript: HTMLScriptElement | null = null;
onMounted(() => {
    // 动态加载雪花脚本
    snowScript = document.createElement('script');
    snowScript.type = 'text/javascript';
    snowScript.src = 'https://api.vvhan.com/api/script/snow';
    snowScript.defer = true;

    // 将脚本插入到页面
    document.head.appendChild(snowScript);
});

onUnmounted(() => {
    // 卸载组件时移除脚本
    if (snowScript) {
        document.head.removeChild(snowScript);
    }
});
</script>

<style scoped>

/* 当前选中榜单的按钮样式 */
button.active {
  background-color: red !important;
  color: white;
}
/* 这里可以添加样式 */
.imge {
    position: relative;
    left: 30%;
    width: 300px;
}
.nextSongs{
    background-color: rgb(188, 220, 220);
    width: 200px;
}
</style>