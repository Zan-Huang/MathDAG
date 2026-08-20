# MathDAG

A local study map for **physics**, **computational neuroscience**, and **AI**, including the mathematics they share and the subjects that sit on the overlaps.

The app is a dependency graph: each node is a subject, edges are prerequisites, and finishing (or marking “already know”) a node unlocks what it feeds. Every node has a readable section plus a pooled catalog of **open** books, lecture notes, video courses, and papers. The app **does not download** those materials. You open or copy a link when you want the file.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Progress lives in this browser (`localStorage`). Use **Export** / **Import** in the top bar to move a JSON backup between machines.

- Check the box on a map node, path item, or subject page to mark it done. “Already know” also counts as done and unlocks dependents.
- **Check in** on a subject after a study block (minutes, date, optional note). That is the dated log; standing notes are separate.
- You can also check off core ideas and individual resources inside a subject.
- **Log** is the chronological list of every check-in.

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
