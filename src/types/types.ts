// src/types.ts
export interface User {
    username: string;
    // 其他用户信息可以根据需要添加
  }
  
export interface Credentials {
    username: string
    password: string;
  } 
export interface lovedata {
  username: string; //代表一个字符串
  love: object; //Array<string> 代表一个字符串数组
}