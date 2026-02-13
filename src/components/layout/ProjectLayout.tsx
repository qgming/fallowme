import { Outlet, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from './Footer'

export default function ProjectLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 浮动返回按钮 */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 glass-card rounded-full p-4 hover:scale-110 transition-all duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
      </Link>

      {/* 主内容区域 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  )
}
