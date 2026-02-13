// 个人信息类型定义
export interface Profile {
  name: string;                  // 姓名
  title: string;                 // 职位/头衔
  bio: string;                   // 个人简介
  avatar: string;                // 头像路径
  social: {                      // 社交平台链接
    github?: string;             // GitHub
    twitter?: string;            // Twitter
    email?: string;              // Email
    wechat?: {                   // 微信公众号
      name: string;              // 公众号名称
      qrCode: string;            // 二维码图片路径
    };
    weibo?: string;              // 微博
    zhihu?: string;              // 知乎
    bilibili?: string;           // B站
    juejin?: string;             // 掘金
    linkedin?: string;           // LinkedIn
  };
}
