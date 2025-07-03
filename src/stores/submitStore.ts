import { defineStore } from 'pinia'
import axiosInstance from '../untils/req'
import { Mysub, MySub2 } from '../types/types'
import { ref } from 'vue'
// import {lovedata} from '../types/types'

export const usesubmitstore = defineStore('submits', () => {
    // submissions 存后端传的自定义网站
    let submissions = ref<MySub2[]>([])

    

    // 直接利用传来的封装好的对象发送请求添加自定义网站
    const addsubmits = async (sub: Mysub) => {
        try {
            console.log('Submitting data:', sub);

            // 发送请求
            const response = await axiosInstance.post('/addsubmit', sub, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response from server:', response.data);
        } catch (e) {
            console.error('Error submitting data:', e);
        }
    };

    // 获取用户自定义网站
    const fetchSubmissions = async (username: any) => {
        try {
            const response = await axiosInstance.post('/getsubmit', { username });
            console.log('Response from server:', response.data);
            if (response.data.code == 200) {

                submissions.value = response.data.commit;
                console.log('Fetched submissions:', submissions.value);  // 注意：此处 response.data.commit 是一个数组，包含了该用户的自定义网站。
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