import type { Resource, ResourcePart } from './types'

/**
 * Viewer metadata layered over the resource catalog.
 *
 * - `embed`: what to load in the in-app viewer when the public URL is not itself framable
 *   (YouTube playlist embeds, direct PDFs).
 * - `embeddable: false`: the publisher sends X-Frame-Options / frame-ancestors that forbid
 *   framing (checked by fetching response headers), so the viewer offers an external open.
 * - `parts`: lecture playlists, chapter PDFs, or notes pages that can be viewed individually.
 * - `url`: corrected when the catalog link had moved or was a search page.
 *
 * YouTube watch/playlist URLs and arXiv abstract pages are rewritten automatically by
 * `toEmbedUrl`, so they only need to appear here when they are not the resource's own URL.
 */

const playlist = (id: string) => `https://www.youtube.com/playlist?list=${id}`

const video = (title: string, id: string): ResourcePart => ({
  title,
  url: playlist(id),
  kind: 'video',
})

const pdf = (title: string, url: string): ResourcePart => ({ title, url, kind: 'pdf' })
const web = (title: string, url: string, embeddable?: boolean): ResourcePart => ({
  title,
  url,
  kind: 'web',
  ...(embeddable === undefined ? {} : { embeddable }),
})

const tong = (slug: string) => `https://davidtong.org/teaching/${slug}/`
const tongPdf = (slug: string, file: string) => `https://davidtong.org/pdfs/teaching/${slug}/${file}`

export const embedOverrides: Record<string, Partial<Resource>> = {
  // ---- Mathematics -----------------------------------------------------------------------
  'mit-1801': {
    parts: [
      web('Course page (notes, problem sets, exams)', 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/'),
      video('Lecture videos — 18.01 Fall 2006 (Jerison)', 'PL590CCC2BC5AF3BC1'),
    ],
  },
  '3b1b-calc': {
    embed: playlist('PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'),
    parts: [
      video('Essence of Calculus playlist', 'PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'),
      web('3blue1brown.com topic page', 'https://www.3blue1brown.com/topics/calculus'),
    ],
  },
  'mit-1802': {
    parts: [
      web('Course page (notes, problem sets, exams)', 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/'),
      video('Lecture videos — 18.02 Fall 2007 (Auroux)', 'PL4C4C8A7D06566F38'),
    ],
  },
  'mit-1806': {
    parts: [
      web('Course page (notes, problem sets, exams)', 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/'),
      video('Strang lecture videos — 18.06', 'PL49CF3715CB9EF31D'),
      video('Follow-up: 18.065 Matrix Methods in Data Analysis (Strang, 2018)', 'PLUl4u3cNGP63oMNUHXqIUcrkS2PivhN3k'),
    ],
  },
  '3b1b-la': {
    embed: playlist('PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'),
    parts: [
      video('Essence of Linear Algebra playlist', 'PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'),
      web('3blue1brown.com topic page', 'https://www.3blue1brown.com/topics/linear-algebra'),
    ],
  },
  'axler-ladr': {
    embed: 'https://linear.axler.net/LADR4e.pdf',
    parts: [
      pdf('Full book PDF (4th ed.)', 'https://linear.axler.net/LADR4e.pdf'),
      web('Book site (errata, videos, solutions)', 'https://linear.axler.net/'),
    ],
  },
  'lebl-analysis': {
    parts: [
      web('Book site (both volumes, exercises)', 'https://www.jirka.org/ra/'),
      pdf('Volume I PDF', 'https://www.jirka.org/ra/realanal.pdf'),
    ],
  },
  'mml-book': {
    parts: [
      web('Book site and tutorials', 'https://mml-book.github.io/'),
      pdf('Full book PDF', 'https://mml-book.github.io/book/mml-book.pdf'),
    ],
  },
  'boyd-cvx': {
    parts: [
      web('Book site (slides, exercises, additional chapters)', 'https://web.stanford.edu/~boyd/cvxbook/'),
      pdf('Full book PDF', 'https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf'),
    ],
  },
  'uml-shai': { embeddable: false },
  'mit-1803': {
    parts: [
      web('Course page (notes, problem sets, exams)', 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/'),
      video('Lecture videos — 18.03 Spring 2006 (Mattuck)', 'PLEC88901EBADDD980'),
    ],
  },
  'complexity-dynamics': { embeddable: false },
  'brunton-dynamics': { embeddable: false },
  databookuw: { embeddable: false },
  stat110: {
    embed: playlist('PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo'),
    parts: [
      video('Stat 110 lecture videos (Harvard)', 'PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo'),
      web('Course site (handouts, homework, strategic practice)', 'https://stat110.harvard.edu/'),
    ],
  },
  'think-dsp': {
    parts: [
      web('Book page (notebooks, code)', 'https://greenteapress.com/wp/think-dsp/'),
      pdf('Full book PDF', 'https://greenteapress.com/thinkdsp/thinkdsp.pdf'),
    ],
  },
  'mit-18100': {
    url: 'https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/',
  },

  // ---- Computing ------------------------------------------------------------------------
  'mit-6100': {
    parts: [
      web('Course page (slides, problem sets, code)', 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/'),
      video('Lecture videos — 6.100L Fall 2022', 'PLUl4u3cNGP62A-ynp6v6-LGBCzeH3VAQB'),
    ],
  },
  'mit-6006': {
    parts: [
      web('Course page (notes, problem sets)', 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'),
      video('Lecture videos — 6.006 Spring 2020', 'PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY'),
      video('Lecture videos — 6.006 Fall 2011 (Demaine, Devadas)', 'PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb'),
    ],
  },
  'cuda-mode': { embeddable: false },
  cleanrl: { embeddable: false },

  // ---- Physics --------------------------------------------------------------------------
  feynman: { embeddable: false },
  'mit-801': {
    url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/',
    parts: [
      web('8.01SC Fall 2016 course page (videos, problem sets)', 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/'),
      video('Walter Lewin 8.01x lectures (Fall 1999)', 'PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e'),
    ],
  },
  'mit-802-lewin': {
    url: playlist('PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j'),
    parts: [
      video('Walter Lewin 8.02x lectures (Spring 2002)', 'PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j'),
      web('Later offering: 8.02 Spring 2019 course page', 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/'),
    ],
  },
  'mit-803': {
    url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
  },
  'mit-804': {
    parts: [
      web('Course page (notes, problem sets)', 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/'),
      video('Lecture videos — 8.04 Spring 2016 (Zwiebach)', 'PLUl4u3cNGP60cspQn3N9dYRPiyVWDd80G'),
      video('Lecture videos — 8.04 Spring 2013 (Adams)', 'PLUl4u3cNGP61-9PEhRognw5vryrSEVLPr'),
    ],
  },
  'tong-teaching': {
    url: tong(''),
    parts: [
      pdf('Vector Calculus', tongPdf('vector-calculus', 'vc.pdf')),
      pdf('Dynamics and Relativity', tongPdf('dynamics-and-relativity', 'dynrel.pdf')),
      pdf('Classical Dynamics (Lagrangian & Hamiltonian)', tongPdf('classical-dynamics', 'clas.pdf')),
      web('Electromagnetism (chapter PDFs)', tong('electromagnetism')),
      pdf('Quantum Mechanics', tongPdf('quantum-mechanics', 'qm.pdf')),
      pdf('Statistical Physics', tongPdf('statistical-physics', 'statphys.pdf')),
      pdf('Solid State Physics', tongPdf('solid-state-physics', 'solidstate.pdf')),
      pdf('Fluid Mechanics', tongPdf('fluid-mechanics', 'fluids.pdf')),
      pdf('General Relativity', tongPdf('general-relativity', 'gr.pdf')),
      pdf('Quantum Field Theory', tongPdf('quantum-field-theory', 'qft.pdf')),
      pdf('Particle Physics', tongPdf('particle-physics', 'pp.pdf')),
      pdf('Cosmology', tongPdf('cosmology', 'cosmo.pdf')),
      web('All courses (index)', tong('')),
    ],
  },
  'zee-notes-sub': {
    url: tong('particle-physics'),
    embed: tongPdf('particle-physics', 'pp.pdf'),
  },
  'variational-notes': {
    url: tong('classical-dynamics'),
    embed: tongPdf('classical-dynamics', 'clas.pdf'),
  },
  'sethna-statmech': {
    url: 'https://sethna.lassp.cornell.edu/StatMech/EntropyOrderParametersComplexity20.pdf',
  },
  'sethna-page': {
    url: 'https://sethna.lassp.cornell.edu/StatMech/',
  },
  'srednicki-qft': {
    parts: [
      web('Author page', 'https://web.physics.ucsb.edu/~mark/qft.html'),
      pdf('Full draft PDF', 'https://web.physics.ucsb.edu/~mark/ms-qft-DRAFT.pdf'),
    ],
  },
  'theoretical-minimum': { embeddable: false },
  'nelson-lectures': { embeddable: false },
  'noneq-arxiv': { embeddable: false },

  // ---- Biology & neuroscience -----------------------------------------------------------
  nsonline: { embeddable: false },
  'izhikevich-dsn': {
    parts: [
      web('Book page', 'https://www.izhikevich.org/publications/dsn/'),
      pdf('Full book PDF', 'https://www.izhikevich.org/publications/dsn.pdf'),
    ],
  },
  'coursera-compneuro': { embeddable: false },
  'rao-ballard': { embeddable: false },
  'hopfield-1982': { embeddable: false },
  'hh-1952': { embeddable: false },
  'oscillation-review': { embeddable: false },
  tvb: { embeddable: false },
  'neuromorphic-ini': { embeddable: false },

  // ---- AI --------------------------------------------------------------------------------
  'sutton-barto': {
    parts: [
      web('Book page', 'http://incompleteideas.net/book/the-book-2nd.html'),
      pdf('Full book PDF (2020 printing)', 'http://incompleteideas.net/book/RLbook2020.pdf'),
    ],
  },
  'silver-rl': {
    embed: playlist('PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ'),
    parts: [
      video('Lecture videos (DeepMind × UCL, 2015)', 'PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ'),
      web('Course page (slides)', 'https://www.davidsilver.uk/teaching/'),
    ],
  },
  cs229: {
    parts: [
      web('Course site', 'https://cs229.stanford.edu/'),
      pdf('Main lecture notes PDF', 'https://cs229.stanford.edu/main_notes.pdf'),
    ],
  },
  cs231n: {
    parts: [
      web('Course notes', 'https://cs231n.stanford.edu/'),
      video('Lecture videos — Spring 2017', 'PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv'),
    ],
  },
  cs224n: {
    parts: [
      web('Course site (slides, notes, assignments)', 'https://web.stanford.edu/class/cs224n/'),
      video('Lecture videos — Winter 2021', 'PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ'),
    ],
  },
  'learning-from-data': {
    parts: [
      web('Course site (slides, homework)', 'https://work.caltech.edu/telecourse.html'),
      video('Lecture videos — CS 156', 'PLD63A284B7615313A'),
    ],
  },
  'karpathy-zero': {
    embed: playlist('PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'),
    parts: [
      video('Zero to Hero playlist', 'PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'),
      web('Course page (notebooks, exercises)', 'https://karpathy.ai/zero-to-hero.html'),
    ],
  },
  '3b1b-nn': {
    embed: playlist('PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi'),
    parts: [
      video('Neural networks playlist', 'PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi'),
      web('3blue1brown.com topic page', 'https://www.3blue1brown.com/topics/neural-networks'),
    ],
  },
  'hf-nlp': { embeddable: false },
  'mit-6s191': {
    parts: [
      web('Course site (slides, labs)', 'https://introtodeeplearning.com/'),
      video('Lecture videos', 'PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI'),
    ],
  },
  'arxiv-sanity-note': { embeddable: false },
  'bluedot-alignment': { url: 'https://bluedot.org/courses/alignment' },
  'anthropic-courses': { embeddable: false },
}
