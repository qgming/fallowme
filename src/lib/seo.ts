export const SITE_URL = 'https://www.qgming.com'
export const SITE_TITLE = 'qgming · 个人网站'
export const SITE_DESCRIPTION = '我是 qgming，独立开发者。这里放着我的一些作品：梦想画布、Oint 和芝士读书，以及偶尔写下的想法。'

export function setNamedMeta(name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = name
    document.head.appendChild(meta)
  }
  meta.content = content
}

export function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
}
