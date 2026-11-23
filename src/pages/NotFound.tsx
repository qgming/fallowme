import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNamedMeta } from '@/lib/seo'

export default function NotFound() {
  useEffect(() => {
    document.title = '页面未找到 · qgming'
    setNamedMeta('robots', 'noindex,follow')
  }, [])

  return (
    <section className="not-found page-width" aria-labelledby="not-found-title">
      <span className="not-found-code">404</span>
      <h1 id="not-found-title">这里暂时没有内容。</h1>
      <p>回首页看看我的作品，或者去博客逛逛。</p>
      <Link className="text-link" to="/">返回首页</Link>
    </section>
  )
}
