<template>111
    <div class="audio-player">
      <vue-audio :src="audioSrc" controls />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';  
  import VueAudio from 'vue-audio-player';
  
  const audioSrc = ref("https://music.163.com/song/media/outer/url?id=2677108480"); // 替换为你的音频文件地址
  </script>
  
  <style scoped>
  .audio-player {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  </style>