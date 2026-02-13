// 功能描述接口
export interface Feature {
  title: string;                 // 功能标题
  description: string;           // 功能描述
  icon?: string;                 // 功能图标(可选)
}

// 项目数据类型定义
export interface Project {
  id: string;                    // 唯一标识符
  title: string;                 // 项目名称
  subtitle: string;              // 副标题/简短描述
  description: string;           // 详细描述
  icon?: string;                 // 项目图标
  version?: string;              // 最新版本
  tags?: string[];               // 标签列表
  screenshots: string[];         // 截图列表
  links: {
    download?: string;           // 下载地址
    github?: string;             // GitHub 仓库
    demo?: string;               // 在线演示
    website?: string;            // 官网
  };
  features: Feature[];           // 主要功能列表
  stats?: {                      // 统计数据(可选)
    downloads?: number;          // 下载量
    stars?: number;              // Star数
    users?: number;              // 用户数
  };
  createdAt: string;             // 创建日期
}
