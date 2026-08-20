import type { Topic } from './types'

export const computingTopics: Topic[] = [
  {
    id: 'programming',
    title: 'Programming Fundamentals',
    domains: ['computing'],
    primary: 'computing',
    hours: 50,
    prerequisites: [],
    summary:
      'Variables, control flow, data structures, and the habit of making a machine do a precise thing.',
    ideas: [
      'A program is a proof that you understand the procedure well enough to hand it to a pedant.',
      'State, control flow, and data structures are the whole beginner game.',
      'Debugging is the scientific method applied to your own mistakes.',
      'Naming and small functions are cognitive tools, not style points.',
      'Version control is a time machine for work you will otherwise lose.',
    ],
    overview:
      'You cannot do computational neuroscience or modern AI as a spectator. Programming is the laboratory. The first goal is not “learn Python syntax”; it is to represent a process so clearly that a machine — and a future you — can run it. That means loops, functions, lists and dictionaries, files, and the emotional skill of reading error messages.\n\nWork in Python from the start if your aim is this graph. Learn git early. Do not outsource every problem to a notebook full of unreproducible cells; write functions you can test.',
    study:
      'MIT 6.100L / 6.0001 or an equivalent intro Python course. Pair with git tutorials. Build four small programs: a numerical integrator, a CSV analyzer, a random-walk simulator, and a command-line script with arguments. That set covers most later scientific work.',
    unlocks:
      'Unlocks scientific Python, algorithms, and numerical methods. It is the only non-mathematical root node that every computational path requires.',
  },
  {
    id: 'scientific-python',
    title: 'Scientific Python',
    domains: ['computing'],
    primary: 'computing',
    hours: 40,
    prerequisites: ['programming'],
    summary:
      'NumPy, SciPy, Matplotlib, and the array-oriented style of scientific computing.',
    ideas: [
      'An array is a contiguous block of numbers with a shape; vectorize before you loop.',
      'Broadcasting is linear algebra’s friend and a common source of silent bugs.',
      'A figure is an argument, not a decoration — label axes and state the claim.',
      'Reproducibility is a seed, a environment file, and a script that runs from scratch.',
      'Pandas is for tables; NumPy is for tensors; do not confuse them.',
    ],
    overview:
      'Scientific Python is the shared bench of this graph: NumPy for arrays, SciPy for solvers and stats, Matplotlib (or similar) for figures, and later Jupyter for exploration. The intellectual shift is from scalar thinking to array thinking. Almost every later library — PyTorch, Brian2, NEURON’s Python interface, scikit-learn — assumes you already live here.\n\nLearn indexing, broadcasting, reductions, random number generation, basic linear algebra calls, ODE integration via solve_ivp, and clean plotting. Pickle and ad-hoc paths are how projects rot; prefer plain formats and scripts.',
    study:
      'The official NumPy and SciPy tutorials plus a short plotting course. Reimplement mean, covariance, and a discrete convolution without (then with) library calls. Neuromatch’s Python prereqs are aimed exactly at this graph.',
    unlocks:
      'Unlocks scientific computing, neural data analysis, introductory ML, and every computational project that follows.',
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    domains: ['computing'],
    primary: 'computing',
    hours: 70,
    prerequisites: ['programming', 'discrete-math'],
    summary:
      'The cost of computation: graphs, heaps, hashing, sorting, and the idea of asymptotic complexity.',
    ideas: [
      'Data structures are slow ideas made fast by layout and invariants.',
      'Big-O is a model of growth, not a stopwatch.',
      'Graphs, heaps, and hash tables are the three structures you will meet everywhere.',
      'Dynamic programming is recursion plus a cache of subproblems.',
      'NP-hardness is a statement about the worst case of a class, not about your instance.',
    ],
    overview:
      'Algorithms are how you stop writing cubic loops over connectomes and corpora. You need enough of this subject to recognize when a problem is a shortest path, a matching, a heap, or a dynamic program, and enough complexity to know why some “just enumerate” plans will not finish before heat death.\n\nCover arrays, lists, trees, heaps, hash tables, BFS/DFS, Dijkstra, union-find, sorting, and a first meeting with NP-completeness. You do not need to become a competitive programmer; you do need to read a methods paper and see the complexity hiding in the pseudocode.',
    study:
      'MIT 6.006 or an equivalent open course. Implement a heap, Dijkstra, and topological sort. Then profile a naive versus sparse implementation of a graph diffusion on a medium connectome.',
    unlocks:
      'Unlocks a professional reading of scientific computing, graph algorithms in connectomics, and the computational side of learning theory.',
  },
  {
    id: 'scientific-computing',
    title: 'Scientific Computing',
    domains: ['computing', 'physics', 'compneuro'],
    primary: 'computing',
    hours: 60,
    prerequisites: ['scientific-python', 'numerical-methods', 'linear-algebra'],
    summary:
      'Building simulations that are correct, inspectable, and large enough to be useful.',
    ideas: [
      'A simulation is a theory plus a discretization plus a budget.',
      'Verification asks “did I solve the equations?”; validation asks “are they the right equations?”',
      'Conservation, units, and dimensionless numbers catch more bugs than print statements.',
      'Sparse structure and batching are how you buy two orders of magnitude.',
      'A notebook is a letter; a package is a laboratory.',
    ],
    overview:
      'Scientific computing is the craft layer: project layout, testing numerical code, choosing solvers, managing data, and knowing when to leave Python for compiled kernels. Computational physics, large-scale neural models, and serious ML training all fail in the same ways — silent units errors, unstable steps, unreproducible environments.\n\nLearn to structure a simulation repo, write tests against known solutions (method of manufactured solutions, conservation checks), use sparse matrices, and profile before you rewrite. This is also where you meet HDF5/NWB-style data and the idea of a computational experiment.',
    study:
      'Pair a computational physics or research-computing course with a project: a well-tested ODE/PDE solver or a small network simulator. Read the Brian2 or NEURON documentation as literature in design.',
    unlocks:
      'Unlocks computational physics, connectomics at scale, large-scale brain models, and GPU computing. It turns numerical methods into a research practice.',
  },
  {
    id: 'gpu-hpc',
    title: 'GPU & High-Performance Computing',
    domains: ['computing', 'ai'],
    primary: 'computing',
    hours: 50,
    prerequisites: ['scientific-computing'],
    summary:
      'Parallelism, accelerators, and the memory hierarchy that actually decides how fast a model runs.',
    ideas: [
      'Throughput dies on memory movement more often than on FLOPs.',
      'Data parallelism and model parallelism are different answers to “the thing does not fit.”',
      'A kernel is a program over an index space; occupancy and coalescing are the culture.',
      'Mixed precision is a numerical-methods decision, not just a flag.',
      'Profiling is the experiment; rewriting without a profile is folklore.',
    ],
    overview:
      'Modern AI and some neuroscience simulations are limited by hardware literacy. You do not need to become a CUDA engineer, but you do need to know what a GPU is good at, why batch size changes both speed and statistics, and how to tell whether you are compute-bound or memory-bound.\n\nLearn the memory hierarchy, SIMD/SIMT at a conceptual level, PyTorch (or JAX) device semantics, and a first CUDA or Triton “hello reduction.” Distributed training can stay at the level of data-parallel SGD until you need more.',
    study:
      'A short GPU computing course or the systems lectures in a serious deep-learning class. Profile a training step. Write one custom kernel or understand one fused attention implementation well enough to explain the roofline.',
    unlocks:
      'Unlocks large-scale deep learning practice and neuromorphic comparisons (what spikes buy you on which hardware). It is optional for theory and mandatory for frontier-scale experiments.',
  },
]
