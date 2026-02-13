import termsData from '@/data/termsOfService.json'

interface ListItem {
  title?: string
  type: 'disc' | 'decimal'
  items: string[]
}

interface Subsection {
  title: string
  content?: string[]
  list?: ListItem
  note?: string
}

interface Section {
  id: string
  title: string
  content?: string[]
  list?: ListItem
  note?: string
  highlight?: string
  subsections?: Subsection[]
}

export default function TermsOfService() {
  const { appName, companyName, contactEmail, updateDate, effectiveDate, sections } = termsData

  const replaceVariables = (text: string): string => {
    return text
      .replace(/\{appName\}/g, appName)
      .replace(/\{companyName\}/g, companyName)
      .replace(/\{contactEmail\}/g, contactEmail)
  }

  const renderList = (list: ListItem) => {
    const listClass = list.type === 'decimal' ? 'list-decimal' : 'list-disc'
    return (
      <div>
        {list.title && <p className="font-semibold text-foreground mb-2">{replaceVariables(list.title)}</p>}
        <ul className={`${listClass} list-inside ml-4 ${list.title ? 'mt-3' : ''} space-y-${list.type === 'disc' ? '2' : '1'}`}>
          {list.items.map((item, index) => (
            <li key={index}>{replaceVariables(item)}</li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSubsection = (subsection: Subsection, index: number) => (
    <div key={index}>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{replaceVariables(subsection.title)}</h3>
      {subsection.content && subsection.content.map((text, i) => (
        <p key={i} className={i < subsection.content!.length - 1 ? 'mb-2' : ''}>
          {replaceVariables(text)}
        </p>
      ))}
      {subsection.list && renderList(subsection.list)}
      {subsection.note && (
        <p className="mt-2 text-sm">{replaceVariables(subsection.note)}</p>
      )}
    </div>
  )

  const renderSection = (section: Section) => {
    const isClosing = section.id === 'closing'

    return (
      <section key={section.id} className={isClosing ? 'pt-6 border-t border-border/30' : ''}>
        {section.title && (
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{replaceVariables(section.title)}</h2>
        )}
        {section.content && section.content.map((text, index) => (
          <p key={index} className={isClosing ? 'text-sm text-muted-foreground' : 'mb-4'}>
            {replaceVariables(text)}
          </p>
        ))}
        {section.highlight && (
          <p className="font-semibold text-foreground mb-4">
            {replaceVariables(section.highlight)}
          </p>
        )}
        {section.list && renderList(section.list)}
        {section.subsections && (
          <div className="ml-4 space-y-4">
            {section.subsections.map((subsection, index) => renderSubsection(subsection, index))}
          </div>
        )}
        {section.note && (
          <p className="mt-3 text-sm">{replaceVariables(section.note)}</p>
        )}
      </section>
    )
  }

  return (
    <div className="relative min-h-screen py-16 md:py-24 pt-24 md:pt-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">用户协议</h1>
        <p className="text-sm text-muted-foreground mb-2">
          更新日期：{updateDate}
        </p>
        <p className="text-sm text-muted-foreground mb-12">
          生效日期：{effectiveDate}
        </p>

        <div className="space-y-10 text-muted leading-relaxed">
          {sections.map((section) => renderSection(section as Section))}
        </div>
      </div>
    </div>
  )
}
