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

export interface Website {
  _id: string;
  id: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  views: number;
  isPaid: boolean;
  language: string[];
  accessSpeed: string;
}

export interface Mysub {
  username: string;
  submit: object;
}
// 这里定义的是提交网站时真正存入数据库的类型，也是数据库返回自定义网站数组的元素类型
export interface MySub2 {
  name: string,
  url: string,
  description: string,
  category: string,
  reason: string,
  logo: string
}