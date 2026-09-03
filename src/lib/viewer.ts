import type { Resource, ResourceFormat, ResourcePart } from '../data/types'

/** What the viewer is currently showing: a resource, optionally one of its parts. */
export interface ViewerTarget {
  resourceId: string
  part: number | null
}

const YT_HOSTS = new Set(['www.youtube.com', 'youtube.com', 'm.youtube.com', 'youtu.be'])

/**
 * Rewrite a public URL into one that can be loaded inside an iframe.
 * - YouTube watch / playlist / short links become player embeds.
 * - arXiv abstract pages become the PDF (arXiv frames PDFs but not abstracts).
 * Everything else is returned unchanged.
 */
export function toEmbedUrl(url: string): string {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return url
  }
  const host = parsed.hostname

  if (YT_HOSTS.has(host)) {
    if (parsed.pathname.startsWith('/embed/')) return url
    const list = parsed.searchParams.get('list')
    let video = parsed.searchParams.get('v')
    if (host === 'youtu.be') video = parsed.pathname.slice(1)
    if (!video && parsed.pathname.startsWith('/shorts/')) video = parsed.pathname.split('/')[2]
    if (video) {
      const q = new URLSearchParams({ rel: '0', modestbranding: '1' })
      if (list) q.set('list', list)
      return `https://www.youtube-nocookie.com/embed/${video}?${q.toString()}`
    }
    if (list) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(list)}&rel=0`
    }
    return url
  }

  if (host === 'arxiv.org' || host === 'www.arxiv.org') {
    const m = /^\/abs\/(.+)$/.exec(parsed.pathname)
    if (m) return `https://arxiv.org/pdf/${m[1]}`
  }

  return url
}

/** True when the URL is a YouTube channel or user page — those cannot be embedded. */
export function isYouTubeChannel(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (!YT_HOSTS.has(parsed.hostname)) return false
    return /^\/(@|c\/|channel\/|user\/)/.test(parsed.pathname)
  } catch {
    return false
  }
}

export interface Viewable {
  title: string
  url: string
  embed: string
  embeddable: boolean
  kind: ResourceFormat
}

/** Resolve a resource (or one of its parts) into the concrete thing the viewer loads. */
export function resolveViewable(resource: Resource, part: number | null): Viewable {
  const sub: ResourcePart | undefined = part === null ? undefined : resource.parts?.[part]
  const url = sub?.url ?? resource.url
  const explicit = sub ? sub.embed : resource.embed
  const embed = explicit ?? toEmbedUrl(url)
  const flag = sub ? sub.embeddable : resource.embeddable
  const embeddable = flag ?? !isYouTubeChannel(url)
  const kind: ResourceFormat =
    sub?.kind ??
    (embed !== url && /youtube/.test(embed)
      ? 'video'
      : /\.pdf($|\?)/i.test(embed) || /arxiv\.org\/pdf\//.test(embed)
        ? 'pdf'
        : resource.format)
  return { title: sub?.title ?? resource.title, url, embed, embeddable, kind }
}

/** Whether "View here" makes sense for a resource at all. */
export function canView(resource: Resource): boolean {
  if (resource.embeddable !== false && !isYouTubeChannel(resource.url)) return true
  return Boolean(resource.parts?.some((p) => p.embeddable !== false && !isYouTubeChannel(p.url)))
}

/** Index of the first viewable entry: null means the resource's own URL, a number means a part. */
export function firstViewable(resource: Resource): number | null {
  if (resource.embeddable !== false && !isYouTubeChannel(resource.url)) return null
  const idx = resource.parts?.findIndex((p) => p.embeddable !== false && !isYouTubeChannel(p.url)) ?? -1
  return idx >= 0 ? idx : null
}
