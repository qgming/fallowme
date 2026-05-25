export const SITE_URL = 'https://www.qgming.com'

export const SITE_TITLE = 'FallowMe - qgming 的个人作品集'

export const SITE_DESCRIPTION =
  'qgming 的个人网站与个人作品集，展示独立开发项目、AI 工具、阅读写作软件、信息聚合工具与个人联系方式。'

export const SITE_IMAGE = `${SITE_URL}/assets/profile/qgming-avatar.jpg`

export function ensureMeta(selector: string, create: () => HTMLMetaElement) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (existing) {
    return existing
  }

  const meta = create()
  document.head.appendChild(meta)
  return meta
}

export function setNamedMeta(name: string, content: string) {
  ensureMeta(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta')
    meta.name = name
    return meta
  }).content = content
}

export function setPropertyMeta(property: string, content: string) {
  ensureMeta(`meta[property="${property}"]`, () => {
    const meta = document.createElement('meta')
    meta.setAttribute('property', property)
    return meta
  }).content = content
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
