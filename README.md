# Fallowme - 个人作品集网站

一个现代化的个人作品集展示网站,采用 React + TypeScript + Vite 构建,展示独立开发者的项目作品和个人信息。

## ✨ 特性

- 🎨 **现代化设计** - 采用玻璃态设计风格,支持深色/浅色主题切换
- 📱 **响应式布局** - 完美适配桌面端和移动端设备
- ⚡ **高性能** - 使用 Vite 构建,支持 HMR 热更新
- 🎭 **动画效果** - 丰富的滚动动画和视差效果
- 🧩 **组件化架构** - 模块化设计,易于维护和扩展
- 🔍 **项目筛选** - 支持按标签筛选项目作品
- 📄 **详情页面** - 完整的项目详情展示,包含截图轮播、技术栈等
- 🌐 **路由管理** - 使用 React Router 实现页面导航

## 🛠️ 技术栈

- **框架**: React 19.2.0
- **语言**: TypeScript 5.9.3
- **构建工具**: Vite 8.0.0-beta
- **样式**: Tailwind CSS 4.1.18
- **路由**: React Router DOM 7.13.0
- **图标**: Lucide React
- **代码质量**: ESLint + TypeScript ESLint
- **编译优化**: React Compiler (Babel Plugin)

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── about/          # 关于页面组件
│   ├── home/           # 首页组件
│   ├── layout/         # 布局组件
│   ├── portfolio/      # 作品集组件
│   ├── project/        # 项目详情组件
│   └── ui/             # 通用 UI 组件
├── contexts/           # React Context
│   ├── ProfileContext.tsx
│   ├── ProjectContext.tsx
│   └── ThemeContext.tsx
├── data/               # 数据文件
│   ├── hero.json
│   ├── profile.json
│   ├── projects.json
│   ├── privacyPolicy.json
│   └── termsOfService.json
├── hooks/              # 自定义 Hooks
│   ├── useParallax.ts
│   ├── useScrollAnimation.ts
│   └── useTheme.ts
├── pages/              # 页面组件
│   ├── About.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   ├── PrivacyPolicy.tsx
│   ├── ProjectDetailPage.tsx
│   └── TermsOfService.tsx
├── types/              # TypeScript 类型定义
│   ├── profile.ts
│   └── project.ts
├── lib/                # 工具函数
│   └── utils.ts
├── App.tsx             # 应用主组件
└── main.tsx            # 应用入口
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📝 配置说明

### 修改个人信息

编辑 `src/data/profile.json` 文件:

```json
{
  "name": "你的名字",
  "title": "你的职位",
  "bio": "个人简介",
  "avatar": "/avatar.jpg",
  "social": {
    "github": "https://github.com/username",
    "twitter": "https://x.com/username",
    "email": "your@email.com"
  }
}
```

### 添加项目作品

编辑 `src/data/projects.json` 文件,添加新的项目对象:

```json
{
  "id": "project-id",
  "title": "项目名称",
  "subtitle": "项目副标题",
  "description": "项目描述",
  "icon": "/projects/project-id/icon.png",
  "tags": ["标签1", "标签2"],
  "screenshots": ["/projects/project-id/screenshot1.jpg"],
  "links": {
    "download": "https://example.com/download"
  },
  "features": [
    {
      "title": "功能标题",
      "description": "功能描述"
    }
  ],
  "techStack": ["React", "TypeScript"]
}
```

### 主题配置

主题系统基于 Tailwind CSS,支持深色/浅色模式自动切换。可在 `src/contexts/ThemeContext.tsx` 中自定义主题逻辑。

## 🎨 设计特色

- **玻璃态效果** - 使用 backdrop-blur 实现毛玻璃效果
- **Bento Grid 布局** - 首页采用流行的 Bento 网格布局
- **视差滚动** - 丰富的滚动视差效果提升用户体验
- **平滑动画** - 基于 Intersection Observer 的滚动动画
- **渐变背景** - 动态模糊渐变球体背景

## 📦 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify

1. 构建命令: `npm run build`
2. 发布目录: `dist`

### 静态服务器

将 `dist` 目录部署到任何静态文件服务器即可。

## 🔧 开发说明

### React Compiler

项目启用了 React Compiler,可以自动优化组件性能。注意这会影响开发和构建性能。

### TypeScript 类型检查

在编辑 TypeScript 文件后,运行类型检查:

```bash
npm run build
```

或使用 TypeScript 编译器:

```bash
npx tsc --noEmit
```

### ESLint 配置

项目使用 ESLint 9.x 的扁平配置格式。如需启用类型感知的 lint 规则,可参考 `eslint.config.js` 进行配置。

## 📄 许可证

MIT License

## 👤 作者

qgming - 独立开发者

- GitHub: [@qgming](https://github.com/qgming)
- Twitter: [@qgmingx](https://x.com/qgmingx)
- Email: qgming@qq.com

## 🙏 致谢

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
