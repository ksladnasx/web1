import { defineStore } from 'pinia'
import axios from 'axios'
import { Mysub, MySub2 } from '../types/types'
import { ref } from 'vue'
// import {lovedata} from '../types/types'

export const usesubmitstore = defineStore('submits', () => {
    // submissions 存后端传的提交记录
    let submissions = ref<MySub2[]>([])

    const API_URL = 'https://jy8b5cnnmg.hzh.sealos.run/addsubmit';

    // 直接利用传来的封装好的对象发送请求添加提交记录
    const addsubmits = async (sub: Mysub) => {
        try {


            console.log('Submitting data:', sub);

            // 发送请求
            const response = await axios.post(API_URL, sub, {
                headers: {
                    'Content-Type': 'application/json'
                }                               
            });

            console.log('Response from server:', response.data);
        } catch (e) {
            console.error('Error submitting data:', e);
        }
    };

    // 获取用户提交记录
    const fetchSubmissions = async (username: any) => {
        try {
            const response = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/getsubmit', { username });
            console.log('Response from server:', response.data);
            if (response.data.code == 200) {
                
                submissions.value = response.data.commit;       
                console.log('Fetched submissions:', submissions.value);  // 注意：此处 response.data.commit 是一个数组，包含了该用户的提交记录。
                console.log(submissions.value.length)
            } else {
                console.error('Failed to fetch submissions:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetch  submissions:', error);
        }
    };



    // 记得暴露属性，方法
    return {
        addsubmits,
        submissions,
        // updateFavorites,
        fetchSubmissions
    }
})