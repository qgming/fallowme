import { Outlet } from 'react-router-dom'
import StarsBackground from '@/components/backgrounds/StarsBackground'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="site-shell">
      <StarsBackground />
      <a className="skip-link" href="#main">跳到正文</a>
      <main id="main" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
