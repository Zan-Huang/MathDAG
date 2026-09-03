# MathDAG

A local study map for **physics**, **computational neuroscience**, and **AI**, including the mathematics they share and the subjects that sit on the overlaps.

The app is a dependency graph: each node is a subject, edges are prerequisites, and finishing (or marking “already know”) a node unlocks what it feeds. Every node has a readable section plus a pooled catalog of **open** books, lecture notes, video courses, and papers. Videos, PDFs, and course pages load in the middle panel next to your checklist and check-in form; the app **does not download** or store any of it, the content streams from the publisher.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173/MathDAG/`). The public site is built into `docs/` (`npm run build`) and served by GitHub Pages at `/MathDAG/`.

Progress lives in this browser (`localStorage`). Use **Export** / **Import** in the top bar to move a JSON backup between machines.

## Tracking

Progress is tracked continuously from what you do; there is nothing extra to fill out.

- Every subject has a **mastery level** computed from its curriculum items, core ideas, and sources you have ticked: *Not started → Attempted → Familiar → Proficient*. Checking the subject off (or marking it “already know”) makes it **Mastered** and unlocks what depends on it. The percentage and level show on the map node, in the subject panel, and in the top bar.
- Every tick, source used, check-in, and subject opened is written to an **activity log**. Un-ticking removes its entry.
- Time is tracked automatically while material is open in the viewer and the tab is visible (one minute per minute, credited to the subject). You can still **check in** manually with minutes and a note.
- **Progress** shows the whole picture: hour-weighted mastery for the current Focus, minutes this week against an editable weekly goal, current and longest **streak**, a 26-week activity calendar, mastery by field and by goal path, **Continue** (recently active subjects with the next unticked item), **Up next** (unlocked but untouched), subjects ready to check off, and the activity feed grouped by day.

## Viewing material inside the app

- **View here** on any resource opens it in the middle panel (replacing the map) while the subject stays open on the right. Press `Esc` or **Back to map** to return; the **Viewer** tab in the top bar brings it back.
- Courses expose their **parts**: the OCW course page, the lecture playlist, chapter PDFs, and so on. Tong’s notes list every noteset; MIT courses list the lecture videos beside the notes.
- YouTube links become player embeds and arXiv abstracts become the PDF automatically.
- **Start session** runs a timer while you read or watch; **Stop session** prefills the check-in form with the elapsed minutes and the resource title, so logging is one click.
- Some publishers forbid embedding (Feynman Lectures, Coursera, Hugging Face, PMC, GitHub, Complexity Explorer, Theoretical Minimum). Those show **Open ↗** instead and open in a new tab. The list is in `src/data/embeds.ts`, checked against the sites’ `X-Frame-Options` / `frame-ancestors` headers.

## What is in the graph

- **Mathematics** — the shared spine (calculus through information theory, geometry, and analysis)
- **Computing** — programming through scientific and GPU computing
- **Physics** — mechanics through QFT, condensed matter, fluids, GR, cosmology
- **Biology & experimental neuro** — cells through systems, cognitive, and methods
- **Computational neuroscience** — membranes through coding, populations, connectomics
- **AI** — classical ML through foundation models, RL, interpretability, alignment
- **Bridges** — control, statistical physics of learning, Bayesian brain, NeuroAI, and related overlaps

Guided **Paths** are topological routes through the same nodes (theoretical physics, computational neuro, ML, NeuroAI, physics of intelligence, and the shared foundations).

## Resources

Only sources that are officially free to open for personal study are listed: author-hosted PDFs, OpenStax, MIT OCW, arXiv, PMC, Neuromatch, Feynman Lectures, Tong notes, Gerstner, Sutton & Barto, and similar. Commercial books are not pirated here. If a link rots, use the title and authors — do not fall back to unofficial scrapers.

## Stack

Vite, React, TypeScript. No backend. No analytics.
