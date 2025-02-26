/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
// 声明 vue-audio-player 模块
declare module 'vue-audio-player' {
    import { ComponentOptionsBase } from 'vue';

    // 定义 vue-audio-player 的 Props 类型
    interface VueAudioProps {
        src: string; // 音频文件地址
        controls?: boolean; // 是否显示播放控件
        autoPlay?: boolean; // 是否自动播放
        muted?: boolean; // 是否静音
        loop?: boolean; // 是否循环播放
        // 其他可能的支持属性可以继续添加
    }

    // 定义 vue-audio-player 的组件类型
    const VueAudio: ComponentOptionsBase<VueAudioProps, any, any> & {
        default: ComponentOptionsBase<VueAudioProps, any, any>;
    };

    export default VueAudio;
}