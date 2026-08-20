import type { Topic } from './types'

export const mathTopics: Topic[] = [
  {
    id: 'precalculus',
    title: 'Precalculus & Algebra',
    domains: ['math'],
    primary: 'math',
    hours: 40,
    prerequisites: [],
    summary:
      'Functions, algebra, trigonometry, and graphs. The shared literacy layer under every later subject in this graph.',
    ideas: [
      'A function is a rule that assigns outputs to inputs; graphs make that rule spatial.',
      'Algebra is the craft of rewriting equalities without changing their meaning.',
      'Trigonometry is the geometry of rotation, oscillation, and projection.',
      'Exponentials and logarithms convert multiplication into addition — the seed of growth, decay, and information.',
      'If you cannot sketch it, you do not yet own it.',
    ],
    overview:
      'This is the last high-school layer and the first research layer. Physics, neuroscience, and machine learning all speak in functions: voltage versus time, loss versus parameters, probability versus evidence. Precalculus is the habit of moving fluently among formulas, graphs, and verbal claims.\n\nYou need comfort with polynomials, rational functions, trig identities, inverse functions, exponentials, logarithms, and solving equations. You also need the quieter skill of checking units, estimating magnitudes, and noticing when a model is being asked to do something geometrically impossible.',
    study:
      'Work problems until rewriting expressions is automatic. Pair a structured text (OpenStax Precalculus or Khan Academy) with daily sketching: given a formula, draw it; given a graph, guess the formula. Do not rush into calculus while trig and inverse functions still feel like a foreign language.',
    unlocks:
      'Unlocks single-variable calculus, linear algebra, discrete math, programming-for-science, and introductory mechanics. Everything else in this graph is downstream of being able to manipulate functions without hesitation.',
  },
  {
    id: 'single-var-calc',
    title: 'Single-Variable Calculus',
    domains: ['math'],
    primary: 'math',
    hours: 80,
    prerequisites: ['precalculus'],
    summary:
      'Limits, derivatives, integrals, and series. The language of change for one quantity at a time.',
    ideas: [
      'The derivative is a local linear approximation, not a slope ritual.',
      'The integral accumulates a rate; the fundamental theorem says these are inverses.',
      'Taylor series replace a hard function with a polynomial that is locally honest.',
      'Convergence is the question of whether an infinite process settles.',
      'Optimization in one variable is “set the derivative to zero, then check the second derivative.”',
    ],
    overview:
      'Calculus is how you talk about instantaneous rates and accumulated totals. In physics that is velocity and work. In neuroscience it is the charging of a membrane. In AI it is the gradient of a loss. The subject is one idea — local linear approximation — applied until it becomes second nature.\n\nMaster differentiation and integration techniques, the fundamental theorem, substitution, integration by parts, improper integrals, sequences and series, and Taylor expansions. Geometric intuition matters more than a zoo of tricks: if you can see the Riemann sum and the tangent line, the algebra will follow.',
    study:
      'MIT 18.01 or OpenStax Calculus Volume 1, plus 3Blue1Brown’s Essence of Calculus for pictures. After each topic, invent a one-variable model from physics or biology (cooling, charging capacitor, logistic growth) and compute both the derivative and the integral by hand.',
    unlocks:
      'Unlocks multivariable calculus, ODEs, probability, introductory electromagnetism, waves, thermodynamics, and numerical methods. Without this, later subjects become symbol-pushing.',
  },
  {
    id: 'multivariable-calc',
    title: 'Multivariable Calculus',
    domains: ['math'],
    primary: 'math',
    hours: 70,
    prerequisites: ['single-var-calc'],
    summary:
      'Partial derivatives, multiple integrals, gradients, and functions of several variables. The setting of almost every real model.',
    ideas: [
      'The gradient points to the steepest increase and is orthogonal to level sets.',
      'A partial derivative holds other variables fixed; a total derivative does not.',
      'The chain rule in several variables is matrix multiplication of Jacobian pieces.',
      'Multiple integrals are volumes, masses, and expectations waiting for a measure.',
      'Constrained optimization begins with “the gradients must line up.”',
    ],
    overview:
      'Almost nothing you care about is a function of one variable. Energy depends on all coordinates. A neural network loss depends on millions of weights. A population density lives on a space. Multivariable calculus upgrades the derivative to the gradient and the Jacobian, and the integral to volumes in the plane and in space.\n\nYou should be able to visualize level curves and surfaces, compute gradients and directional derivatives, set up double and triple integrals in useful coordinates, and use Lagrange multipliers. This is also where you first meet the geometry that vector calculus will later turn into theorems.',
    study:
      'MIT 18.02 or OpenStax Calculus Volume 3. Draw every gradient. Implement a tiny gradient-descent loop on a 2D surface in Python so the same object appears as a picture, a formula, and an algorithm.',
    unlocks:
      'Unlocks vector calculus, optimization, PDEs, variational calculus, analytical mechanics, special relativity, and neural networks. It is the shared gateway from one-dimensional intuition to real models.',
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    domains: ['math'],
    primary: 'math',
    hours: 80,
    prerequisites: ['precalculus'],
    summary:
      'Vectors, matrices, linear maps, eigenvalues, and inner products. The operating system of modern science.',
    ideas: [
      'A matrix is a linear map; coordinates are a choice, not the object.',
      'Rank, kernel, and image describe what a map crushes and what it can hit.',
      'Eigenvectors are directions a map only stretches; they diagonalize dynamics and data.',
      'An inner product gives lengths, angles, orthogonality, and least squares.',
      'SVD is the general “stretch along orthogonal axes” picture of any matrix.',
    ],
    overview:
      'Linear algebra is the reason quantum mechanics, principal component analysis, finite-element methods, and deep learning can share a vocabulary. States, data, and discretized fields are vectors. Laws and models that are locally linear are matrices. Changing basis is the art of seeing the same object in the coordinates where it is simple.\n\nYou need vector spaces, linear maps, determinants as oriented volumes, eigenvalues, orthogonality, projections, least squares, and the singular value decomposition. Computation matters, but pictures matter more: a 2D linear map you can draw is worth ten formal proofs you cannot use.',
    study:
      'Strang’s MIT 18.06 for the applied spine; Axler’s Linear Algebra Done Right when you want the clean theory without determinants first. 3Blue1Brown’s Essence of Linear Algebra should be watched early, then again after you can compute. Implement Gaussian elimination, eigen-decomposition, and SVD yourself once.',
    unlocks:
      'Unlocks quantum mechanics, unsupervised learning, neural nets, graph theory in practice, dynamical systems, differential geometry, and nearly every computational subject. If you can only deepen one mathematical tool after calculus, deepen this.',
  },
  {
    id: 'vector-calculus',
    title: 'Vector Calculus',
    domains: ['math', 'physics'],
    primary: 'math',
    hours: 50,
    prerequisites: ['multivariable-calc', 'linear-algebra'],
    summary:
      'Div, grad, curl, line and surface integrals, and the integral theorems. The geometry of fields.',
    ideas: [
      'Gradient turns a scalar landscape into a vector field of steepest ascent.',
      'Divergence measures local expansion; curl measures local rotation.',
      'Line integrals accumulate work; surface integrals accumulate flux.',
      'Green, Stokes, and divergence theorems convert local field facts into global balances.',
      'Conservative fields are gradients; their curl vanishes and work is path-independent.',
    ],
    overview:
      'Vector calculus is how you talk about fields in space: electric fields, fluid velocity, probability currents, optical flow. The operators div, grad, and curl are not a list to memorize — they are the three independent first-order things you can do to a field in three dimensions, and the integral theorems are conservation laws in geometric clothing.\n\nThis subject sits under Maxwell’s equations, continuum mechanics, and any continuum model of cortex or fluid. It also trains a habit that later physics and geometric deep learning both need: distinguish the object from the coordinate expression.',
    study:
      'Finish multivariable calculus, then Tong’s vector calculus notes or MIT 18.02 vector chapters. Recite Maxwell’s equations in both differential and integral form until the two languages feel like one. Draw a vortex, a source, and a gradient field and compute all three operators.',
    unlocks:
      'Unlocks electrodynamics, fluid dynamics, PDEs in continuum physics, and later differential geometry. You cannot honestly read Maxwell or Navier–Stokes without it.',
  },
  {
    id: 'odes',
    title: 'Ordinary Differential Equations',
    domains: ['math'],
    primary: 'math',
    hours: 60,
    prerequisites: ['single-var-calc'],
    summary:
      'Equations that relate a function to its derivatives. The basic language of time evolution.',
    ideas: [
      'A first-order ODE is a slope field; a solution is a curve tangent to it everywhere.',
      'Linear constant-coefficient systems are solved by eigenvalues of the generator.',
      'Existence and uniqueness say when the present determines the future.',
      'Forcing, resonance, and Green’s functions describe how systems answer inputs.',
      'Nonlinear ODEs can have multiple equilibria, limit cycles, and finite-time blowup.',
    ],
    overview:
      'Whenever a law says “the rate of change depends on the current state,” you have an ODE: Newtonian particles, RC circuits, Hodgkin–Huxley membranes, chemical kinetics, residual-network layers in continuous time. The subject is part technique (separable, linear, systems) and part geometry (phase portraits).\n\nYou should solve first- and second-order linear equations, analyze 2D linear systems by eigenstructure, sketch nonlinear phase planes, and understand existence, uniqueness, and linearization around equilibria. Numerical integration is part of literacy, not an afterthought.',
    study:
      'MIT 18.03 or a modern ODE course that includes phase planes. Strogatz-style geometric thinking is more useful than a catalog of special functions. Integrate a 2D system with Euler and RK4 so you feel stability and step-size.',
    unlocks:
      'Unlocks dynamical systems, Hodgkin–Huxley, analytical mechanics, control theory, fluids (with PDEs), quantum mechanics, and neural ODEs. Time-evolution lives here.',
  },
  {
    id: 'pdes',
    title: 'Partial Differential Equations',
    domains: ['math', 'physics'],
    primary: 'math',
    hours: 70,
    prerequisites: ['odes', 'multivariable-calc'],
    summary:
      'Equations for fields that depend on space and time: waves, diffusion, Laplace, and beyond.',
    ideas: [
      'The heat equation smears; the wave equation propagates; Laplace’s equation equilibrates.',
      'Separation of variables plus eigenfunctions of the Laplacian is the classical method.',
      'Characteristics carry information in first-order and hyperbolic problems.',
      'Boundary conditions are part of the equation; change them and you change the physics.',
      'Discretization turns a PDE into a huge ODE or linear algebra problem.',
    ],
    overview:
      'PDEs are the continuum limit of local rules. Temperature, electromagnetic waves, quantum amplitudes, cable theory in dendrites, and reaction–diffusion patterns in cortex are all PDE stories. The three linear archetypes — elliptic, parabolic, hyperbolic — teach you the possible personalities of a linear field theory.\n\nYou want the heat, wave, and Laplace equations on simple domains, Fourier series as eigenfunction expansions, d’Alembert’s solution, and a first look at numerical methods. Nonlinear PDEs (Burgers, KdV, reaction–diffusion) can wait until the linear menagerie is familiar.',
    study:
      'A first PDE course or the PDE chapters of mathematical-methods texts, paired with computational experiments: discretize 1D heat and wave equations and watch energy and smoothness. Cable theory is an excellent applied sequel.',
    unlocks:
      'Unlocks electrodynamics in media, fluids, cable theory, computational physics, and physics-informed machine learning. Continuum models of brain tissue and of spacetime both sit here.',
  },
  {
    id: 'probability',
    title: 'Probability',
    domains: ['math'],
    primary: 'math',
    hours: 70,
    prerequisites: ['single-var-calc'],
    summary:
      'Random variables, expectation, conditioning, and limit theorems. Uncertainty as a mathematical object.',
    ideas: [
      'A random variable is a number-valued function on a sample space, not a “random number.”',
      'Conditioning updates a measure; Bayes is the chain rule rearranged.',
      'Expectation is a linear functional; variance is a quadratic one.',
      'Independence is a product structure, rare in nature and precious in models.',
      'LLN and CLT explain why averages settle and why Gaussians appear.',
    ],
    overview:
      'Probability is the shared currency of statistical mechanics, neural coding, Bayesian brains, and machine learning. It is not a bag of named distributions. It is a way to assign weights to possible worlds and to update those weights when data arrive.\n\nYou need discrete and continuous random variables, joint and conditional distributions, expectation and variance, generating functions at a basic level, and the law of large numbers and central limit theorem. Geometric pictures — densities as mass, conditioning as slicing — prevent the subject from becoming formal fog.',
    study:
      'Blitzstein’s Stat 110 (videos + book) is the best open first pass. Supplement with Seeing Theory and, later, a measure-flavored revisit. Derive Bayes for a binary hypothesis and a Gaussian channel by hand until it is boring.',
    unlocks:
      'Unlocks statistics, information theory, stochastic processes, Bayesian inference, statistical mechanics, and every probabilistic model of mind or machine.',
  },
  {
    id: 'statistics',
    title: 'Mathematical Statistics',
    domains: ['math'],
    primary: 'math',
    hours: 60,
    prerequisites: ['probability'],
    summary:
      'Estimation, hypothesis testing, and the gap between a probabilistic model and finite data.',
    ideas: [
      'An estimator is a function of data; bias and variance describe its personality.',
      'Likelihood is the probability of the data viewed as a function of the parameter.',
      'Confidence intervals and posterior intervals answer different questions.',
      'A test is a partition of the sample space with a controlled false-positive rate.',
      'Model misspecification is the usual state of the world; robustness is not optional.',
    ],
    overview:
      'Statistics is probability pointed at data. In the lab it is how you decide whether a neuron is tuned, whether a drug changed firing, whether a model generalizes. In AI it is why training error is not test error. The core objects are estimators, tests, and predictive checks — all of them functions that turn samples into claims with quantified error.\n\nLearn point estimation (method of moments, MLE), bias-variance, simple Bayesian updating, confidence intervals, t-tests and permutation tests, linear regression as both geometry and likelihood, and the idea of a sampling distribution. Causal claims need extra structure; that comes later.',
    study:
      'OpenIntro or OpenStax Statistics for the first pass; ISL (An Introduction to Statistical Learning) to connect the same ideas to prediction. Analyze a real spike-count or psychophysics dataset before you touch a neural net.',
    unlocks:
      'Unlocks neural data analysis, supervised learning in earnest, causal inference, and any experimental neuroscience you intend to publish.',
  },
  {
    id: 'discrete-math',
    title: 'Discrete Mathematics',
    domains: ['math', 'computing'],
    primary: 'math',
    hours: 50,
    prerequisites: ['precalculus'],
    summary:
      'Proof, sets, combinatorics, graphs, and modular arithmetic. The skeleton of algorithms and counting.',
    ideas: [
      'A proof is a public argument, not a private conviction.',
      'Bijection is the honest way to count.',
      'Induction is recursion in logical form.',
      'Graphs are the universal language of relation: synapses, citations, tokens, particles.',
      'Complexity begins as “how does the work grow with the input?”',
    ],
    overview:
      'Discrete math is how you stop being a spectator of arguments. It trains proof, counting, and the first graph theory you need for networks of neurons, tokens, or particles. It is also the conceptual background for algorithms: recurrence relations, trees, and the difference between existence and construction.\n\nCover logic and proof techniques, sets and functions, basic counting and pigeonhole, modular arithmetic, relations, and introductory graphs (paths, connectivity, trees). Leave generating functions and serious enumerative combinatorics for later if time is tight.',
    study:
      'A standard discrete math course (MIT 6.042 or an open text such as Levin) plus daily proof writing. Translate one neuroscience or ML claim a week into a precise statement you could prove or refute.',
    unlocks:
      'Unlocks algorithms, graph theory, group theory’s first steps, and the ability to read theoretical CS and learning theory without drowning.',
  },
  {
    id: 'real-analysis',
    title: 'Real Analysis',
    domains: ['math'],
    primary: 'math',
    hours: 90,
    prerequisites: ['single-var-calc'],
    summary:
      'Rigorous calculus: limits, completeness, uniform convergence, and why the operations you use are legal.',
    ideas: [
      'Completeness of the reals is the reason limits of Cauchy sequences exist.',
      'Uniform convergence is when you may swap limits and integrals or derivatives.',
      'Compactness is the precise form of “finite and closed enough to extract maxima.”',
      'A counterexample is a theorem about the boundary of an idea.',
      'Epsilon is not pedantry; it is a budget for error.',
    ],
    overview:
      'Analysis is optional for a first pass through physics or ML and non-optional if you want to know when interchanging a limit, an integral, and a derivative is allowed — the daily move in statistical mechanics, learning theory, and PDE. It replaces “the derivative exists” with a proof, and “the series of functions is fine” with a uniform-convergence test.\n\nSequences and series of numbers, open and closed sets in R^n, continuity, differentiability, Riemann integration, and uniform convergence are the core. Metric spaces are a high-leverage extra.',
    study:
      'Abbott’s Understanding Analysis if you can get it, or Lebl’s free Basic Analysis. Do the exercises; watching lectures without writing epsilon proofs does almost nothing. Revisit Taylor’s theorem and interchange of sum and integral as the prize.',
    unlocks:
      'Unlocks measure-theoretic probability, functional analysis, and a much more honest reading of learning theory and continuum physics. It is the quality upgrade for every later argument about limits.',
  },
  {
    id: 'complex-analysis',
    title: 'Complex Analysis',
    domains: ['math', 'physics'],
    primary: 'math',
    hours: 60,
    prerequisites: ['multivariable-calc'],
    summary:
      'Holomorphic functions, contour integrals, and residues. The cheat code for linear physics and generating functions.',
    ideas: [
      'Holomorphic means locally a power series — an enormous constraint.',
      'Cauchy’s theorem: integrals of holomorphic functions around closed curves vanish.',
      'Residues convert contour integrals into algebra; physics lives on the poles.',
      'Analytic continuation says a function is often determined by a tiny piece.',
      'Fourier and Laplace transforms become contour integrals in the complex plane.',
    ],
    overview:
      'Complex analysis is the unexpected engine of linear physics. Green’s functions, response functions, frequency-domain filters, and many quantum amplitudes are contour integrals in disguise. The subject also explains why 2D electrostatics and ideal flow are so solvable: holomorphic functions are conformal maps.\n\nLearn the Cauchy–Riemann equations, Cauchy’s integral formula, Taylor and Laurent series, residues, and a handful of real-integral evaluations. Physics-oriented courses add branch cuts and the inversion of transforms.',
    study:
      'A first complex analysis course; Needham’s pictures if you can find them, otherwise a concise set of notes plus lots of residue computations. Recompute a Fourier inversion or a retarded Green’s function as a contour integral.',
    unlocks:
      'Unlocks quantum mechanics II, field theory calculations, advanced electrodynamics, and a cleaner view of linear filters in neural data analysis.',
  },
  {
    id: 'dynamical-systems',
    title: 'Dynamical Systems',
    domains: ['math', 'physics', 'compneuro', 'bridge'],
    primary: 'math',
    hours: 70,
    prerequisites: ['odes', 'linear-algebra'],
    summary:
      'Long-term behavior of systems: equilibria, cycles, bifurcations, chaos, and attractors.',
    ideas: [
      'An attractor is where the future spends its time.',
      'Linearization plus Hartman–Grobman tells you the local portrait of a hyperbolic equilibrium.',
      'A bifurcation is a qualitative change as a parameter varies.',
      'Limit cycles need nonlinearity and, in 2D, a bit of topology (Poincaré–Bendixson).',
      'Chaos is deterministic unpredictability born of stretching and folding.',
    ],
    overview:
      'Dynamical systems is the shared geometry of neurons, fluids, climate, and recurrent nets. Instead of solving for a closed form, you ask: what are the invariant sets, how do they change with parameters, and what does a typical trajectory do? Hodgkin–Huxley excitability, central-pattern-generator rhythms, and Hopfield memories are all bifurcation stories.\n\nCover phase portraits, stability, Lyapunov functions at a practical level, saddle-node / Hopf / period-doubling bifurcations, and a first encounter with chaos and Lyapunov exponents. Maps (discrete time) are as important as flows.',
    study:
      'Strogatz-style geometric ODE plus Izhikevich for the neural dictionary. Complexity Explorer’s dynamical-systems course is a good open start. Animate a Hopf bifurcation and a saddle-node-on-invariant-circle; both appear in neurons.',
    unlocks:
      'Unlocks reduced neuron models, oscillations, recurrent attractor networks, mean-field populations, complexity and criticality, and a geometric reading of training dynamics.',
  },
  {
    id: 'stochastic-processes',
    title: 'Stochastic Processes',
    domains: ['math', 'physics', 'compneuro', 'ai'],
    primary: 'math',
    hours: 70,
    prerequisites: ['probability', 'odes'],
    summary:
      'Randomness that unfolds in time: Poisson processes, Markov chains, and Brownian motion.',
    ideas: [
      'A Poisson process is the continuum limit of rare independent events — the skeleton of spike trains.',
      'A Markov process remembers only the present; the generator encodes the jumps or drifts.',
      'Brownian motion is the scaling limit of random walks and the driver of diffusion.',
      'The Fokker–Planck / Kolmogorov equation is the PDE for the evolving density.',
      'Itô calculus is the chain rule with a quadratic correction.',
    ],
    overview:
      'Once your models include noise — synaptic vesicle release, thermal fluctuations, minibatch SGD, generative diffusion — you need processes, not just random variables. The three workhorses are Poisson point processes, discrete-state Markov chains, and diffusion processes.\n\nYou should compute waiting times, write master equations, simulate SDEs with Euler–Maruyama, and connect a Langevin equation to its Fokker–Planck equation. Martingales and a careful Itô integral can wait until the pictures are solid.',
    study:
      'A first stochastic-processes course or the relevant Neuromatch / MIT probability modules. Simulate a Poisson spike train, a telegraph process, and an Ornstein–Uhlenbeck voltage. Then read a page of a diffusion-model paper and recognize the same SDE.',
    unlocks:
      'Unlocks spike-train statistics, nonequilibrium statistical mechanics, decision-diffusion models, and modern generative models. Noise becomes a first-class citizen.',
  },
  {
    id: 'information-theory',
    title: 'Information Theory',
    domains: ['math', 'physics', 'compneuro', 'ai', 'bridge'],
    primary: 'math',
    hours: 55,
    prerequisites: ['probability'],
    summary:
      'Entropy, mutual information, and coding. How many bits a signal, a synapse, or a dataset actually carries.',
    ideas: [
      'Entropy is the surprise of a typical sample, in bits.',
      'Mutual information is the reduction in uncertainty about X from seeing Y.',
      'KL divergence is the extra cost of using the wrong code — and the engine of variational inference.',
      'Source coding compresses redundancy; channel coding fights noise.',
      'The data-processing inequality: no clever function of Y can increase information about X.',
    ],
    overview:
      'Information theory is the overlap language of statistical physics, neural coding, and machine learning. Shannon entropy is Boltzmann entropy with a change of units. The variational free energy that appears in variational autoencoders and in some brain theories is a KL. Rate-distortion is a theory of lossy representation, which is what both V1 and a neural net encoder do.\n\nLearn entropy, cross-entropy, KL, mutual information, the asymptotic equipartition property at a heuristic level, and the statements of the source and channel theorems. Leave error-correcting-code constructions for later unless you need them.',
    study:
      'MacKay’s Information Theory, Inference, and Learning Algorithms is free and uniquely aligned with this graph. Pair it with a neural-coding chapter (Gerstner or a Rieke-style essay) so “bits per spike” is not an abstraction.',
    unlocks:
      'Unlocks neural coding, learning theory, statistical physics of learning, foundation-model intuition (compression and prediction), and active inference. It is the quantitative theory of “what does this representation buy me?”',
  },
  {
    id: 'optimization',
    title: 'Optimization',
    domains: ['math', 'ai'],
    primary: 'math',
    hours: 60,
    prerequisites: ['multivariable-calc', 'linear-algebra'],
    summary:
      'Finding minima and maxima: gradients, constraints, convexity, and the algorithms that train models.',
    ideas: [
      'A critical point is where the gradient vanishes; convexity decides whether that is enough.',
      'Gradient descent is local linear algebra plus a step-size story.',
      'Lagrange multipliers enforce equality constraints; KKT adds inequalities.',
      'Convex problems are the ones you can usually trust; deep learning is the one you cannot, and still use.',
      'Duality turns a hard primal into a sometimes easier dual, and gives certificates.',
    ],
    overview:
      'Optimization is the verb of modern AI and of variational physics. Least action, maximum likelihood, optimal control, and training a net are the same shape of problem: extremize a scalar over a space, maybe with constraints. Convex optimization is the part with theorems. Nonconvex optimization is the part you actually run on neural nets, landscapes of spin glasses, and folding problems.\n\nCover unconstrained gradient methods, Newton and quasi-Newton at a conceptual level, line search, projected and proximal methods, and the statements of convexity, strong convexity, and duality. Constrained problems via Lagrange / KKT are essential for mechanics and SVM-style ML.',
    study:
      'Boyd and Vandenberghe’s Convex Optimization (free) plus Boyd’s EE364a lectures. Then a practical deep-learning optimization lecture (SGD, momentum, Adam, implicit bias) so the convex theory does not become a separate religion.',
    unlocks:
      'Unlocks deep learning, variational mechanics, optimal control, and any serious model-fitting in neuroscience. It is also the right language for “why did training do that?”',
  },
  {
    id: 'numerical-methods',
    title: 'Numerical Methods',
    domains: ['math', 'computing'],
    primary: 'math',
    hours: 55,
    prerequisites: ['single-var-calc', 'linear-algebra', 'programming'],
    summary:
      'Stable, accurate computation of the things analysis says exist: roots, integrals, eigenproblems, ODE steps.',
    ideas: [
      'Roundoff and truncation are different sins; stability is about not amplifying them.',
      'Conditioning is a property of the problem; stability is a property of the algorithm.',
      'A good discretization respects the invariants (energy, probability, sparsity).',
      'Sparse linear algebra is how large scientific problems become feasible.',
      'Adaptive step sizes spend work where the solution is changing.',
    ],
    overview:
      'Numerical methods are the difference between a beautiful equation and a number you can trust. Every computational neuroscience simulator, every climate model, and every implicit layer in a network sits on quadrature, linear solvers, and time-steppers. The subject trains a moral sense: when is a result an artifact of the method?\n\nLearn floating-point, root finding, interpolation, quadrature, QR and Krylov solvers, eigenvalue algorithms at a user level, and the stability regions of ODE integrators. PDE discretizations (finite difference, a taste of finite element) belong here or in scientific computing.',
    study:
      'A computational science course (MIT 18.330 / 16.90 flavor) or Trefethen-style numerical linear algebra notes, plus coding every algorithm once. Break Euler on a stiff Hodgkin–Huxley system so you understand implicit methods in your bones.',
    unlocks:
      'Unlocks scientific computing, computational physics, PDE numerics, and physics-informed ML. It is the hygiene layer for every later simulation.',
  },
  {
    id: 'graph-theory',
    title: 'Graph Theory',
    domains: ['math', 'compneuro', 'ai'],
    primary: 'math',
    hours: 40,
    prerequisites: ['discrete-math', 'linear-algebra'],
    summary:
      'Networks as objects: paths, spectra, communities, and flows. The combinatorics of connection.',
    ideas: [
      'Degree, path length, and clustering are the first three numbers of a network.',
      'The Laplacian spectrum knows about cuts, diffusion, and vibration.',
      'A random graph is a null model, not a theory of the brain.',
      'Directed and weighted graphs are the usual case in neuroscience and the web.',
      'Message passing is linear algebra on the adjacency structure.',
    ],
    overview:
      'Brains, molecules, tokens attending to tokens, and citation networks are graphs. Graph theory gives you the language (connectivity, cuts, matchings, expansion) and spectral graph theory gives you the linear algebra (Laplacians, random walks). Connectomics without this becomes a pile of pretty pictures.\n\nLearn the basic theorems about trees, Eulerian and Hamiltonian paths at a light level, adjacency and Laplacian matrices, random walks, and a first look at community detection and small-world / scale-free caveats. Flows and cuts matter for some algorithms and for transportation-style models.',
    study:
      'An open graph-theory text plus Newman-style network science chapters. Compute the Laplacian spectrum of a small connectome or a toy ring-and-shortcut network. Then read a GNN paper and recognize message passing as a learned walk.',
    unlocks:
      'Unlocks connectomics, graphical models, graph neural networks, and complexity on networks. It is the discrete geometry of interaction.',
  },
  {
    id: 'fourier-signal',
    title: 'Fourier Analysis & Signal Processing',
    domains: ['math', 'physics', 'compneuro'],
    primary: 'math',
    hours: 50,
    prerequisites: ['single-var-calc', 'linear-algebra'],
    summary:
      'Frequencies, filters, sampling, and the idea that linear time-invariant systems are multiplication in Fourier space.',
    ideas: [
      'Fourier series expand periodic signals in an orthogonal basis of oscillations.',
      'The transform diagonalizes translation-invariant linear operators.',
      'Sampling and aliasing are facts about lattices, not about software.',
      'Convolution in time is multiplication in frequency — the whole theory of filters.',
      'Spectrograms and wavelets are the compromise between time and frequency.',
    ],
    overview:
      'Fourier analysis is how waves, optics, quantum free particles, audio, LFP, fMRI preprocessing, and convolutional networks secretly agree. A linear translation-invariant system is completely known by its frequency response. Once you see that, “filter the data” and “solve the heat equation by eigenfunctions” become the same move.\n\nCover Fourier series and transforms, convolution, sampling, discrete FFT, windowing, and the uncertainty tradeoff. A light treatment of Laplace and z-transforms helps control and discrete-time filtering.',
    study:
      'Osgood’s Stanford Fourier course or Steve Brunton’s lectures, plus Think DSP (Downey, free). Filter a real LFP or audio file and explain every artifact you introduce.',
    unlocks:
      'Unlocks waves and quantum mechanics, sensory systems, neural data analysis, and a deeper reading of convnets. It is the linear theory of signals.',
  },
  {
    id: 'variational-calculus',
    title: 'Calculus of Variations',
    domains: ['math', 'physics', 'bridge'],
    primary: 'math',
    hours: 40,
    prerequisites: ['multivariable-calc'],
    summary:
      'Extremizing functionals: actions, energies, and the Euler–Lagrange equation.',
    ideas: [
      'A functional eats a whole function and returns a number (action, energy, risk).',
      'Euler–Lagrange is “the gradient with respect to a path is zero.”',
      'Constraints produce multipliers; symmetries produce conservation laws (Noether).',
      'The second variation decides min, max, or saddle.',
      'Hamilton’s principle and optimal control are the same pattern in different clothes.',
    ],
    overview:
      'Variational calculus is the reason mechanics, optics, optimal control, and many inference principles look alike. You do not pick a number; you pick a curve or a field that extremizes an integral. The Euler–Lagrange equation is the stationarity condition, and Noether’s theorem is the deepest undergraduate fact in physics: symmetries of the action are conservation laws.\n\nLearn to derive Euler–Lagrange for a Lagrangian L(q, q̇, t), handle holonomic constraints, and compute a few classic problems (brachistochrone, geodesics, harmonic oscillator). Field Lagrangians can wait for analytical mechanics and QFT.',
    study:
      'The variational chapters of a classical-mechanics course (Tong, Goldstein-level notes) plus a short dedicated noteset. Re-derive Newton’s laws from an action and the Kalman smoother as a quadratic variational problem.',
    unlocks:
      'Unlocks analytical mechanics, optimal control, field theory, and a principled view of energy-based and variational inference methods.',
  },
  {
    id: 'differential-geometry',
    title: 'Differential Geometry',
    domains: ['math', 'physics', 'ai', 'bridge'],
    primary: 'math',
    hours: 80,
    prerequisites: ['multivariable-calc', 'linear-algebra'],
    summary:
      'Manifolds, metrics, connections, and curvature. The geometry of curved spaces and of data that only look Euclidean.',
    ideas: [
      'A manifold is a space that is Euclidean in tiny charts, glued consistently.',
      'A metric tells you how to measure lengths and angles; it is extra structure.',
      'Parallel transport and curvature say whether “keeping a vector fixed” depends on path.',
      'Geodesics are straightest paths, not always shortest if the metric is wild.',
      'The same language describes spacetime, robot configuration spaces, and statistical manifolds.',
    ],
    overview:
      'Differential geometry is required for general relativity and is the right language for geometric deep learning, robotics, and information geometry. The surprising fact is that “curved space” is not a metaphor: once you have a metric, you have geodesics, curvature, and volume, and physics or learning can be written in those terms.\n\nA first pass: manifolds, tangent spaces, metrics, geodesics, and Gaussian curvature in two dimensions, then a taste of covariant derivatives. Relativity will add tensors and the Einstein equation; geometric ML will add equivariance and gauges.',
    study:
      'A gentle first book or lecture (Needham’s Visual Differential Geometry if available, or a short course such as Keenan Crane’s discrete differential geometry for intuition). Do every computation on the sphere and the hyperbolic plane.',
    unlocks:
      'Unlocks general relativity, geometric deep learning, and information geometry. It is also the cleanest way to talk about constraints and configuration spaces in mechanics and robotics.',
  },
  {
    id: 'functional-analysis',
    title: 'Functional Analysis',
    domains: ['math', 'physics'],
    primary: 'math',
    hours: 80,
    prerequisites: ['real-analysis', 'linear-algebra'],
    summary:
      'Infinite-dimensional linear algebra: Banach and Hilbert spaces, operators, and spectra.',
    ideas: [
      'A Hilbert space is inner-product geometry without a finite basis.',
      'Bounded operators are the continuous linear maps; unbounded ones (derivatives, Hamiltonians) need domains.',
      'The spectral theorem generalizes diagonalization to operators.',
      'Distributions let you differentiate things that are not functions.',
      'Compact operators are the infinite-dimensional analogue of “matrices that behave.”',
    ],
    overview:
      'Functional analysis is what linear algebra becomes when the vectors are functions. Quantum mechanics, PDE, kernel methods, and the theory of neural networks in function space all live here. You do not need a full graduate course to start QFT, but you do need Hilbert spaces, self-adjoint operators, and the idea of a spectrum.\n\nCover normed spaces, completeness, inner products, orthonormal bases, bounded operators, and the spectral theorem for compact self-adjoint operators. Distributions and Sobolev spaces are the PDE bonus.',
    study:
      'A first functional-analysis course or the Hilbert-space chapters of a mathematical-physics text. Rephrase Fourier series as an orthonormal expansion in L2. Then look at a Hamiltonian and ask what its domain is.',
    unlocks:
      'Unlocks a mature reading of quantum field theory and continuum learning theory. It is the linear algebra of infinite dimensions.',
  },
  {
    id: 'group-representation',
    title: 'Group Theory & Representations',
    domains: ['math', 'physics', 'ai'],
    primary: 'math',
    hours: 70,
    prerequisites: ['linear-algebra', 'discrete-math'],
    summary:
      'Symmetry as algebra: groups, representations, and why particles and convnets both care about orbits.',
    ideas: [
      'A group is the algebra of reversible transformations.',
      'A representation is a linear action — symmetry made into matrices.',
      'Irreducible representations are the atoms; physics names particles by them.',
      'Schur’s lemma explains why symmetries block-diagonalize problems.',
      'Equivariance is “the model respects the group”; invariance is the special case of a trivial output action.',
    ],
    overview:
      'Symmetry is the deepest organizing idea in fundamental physics and an increasingly central one in machine learning. Rotations, permutations, gauge transformations, and the Poincaré group are not decorations; they constrain what the laws and the architectures may be. Representation theory is how a group acts on a vector space, which is exactly how spin, color, and group-equivariant networks are defined.\n\nLearn groups, homomorphisms, conjugacy, and a first pass at representations of finite groups and of SO(3)/SU(2). Physics will add Lie algebras; geometric DL will add steerable kernels.',
    study:
      'A short groups-and-representations course aimed at physicists (Zee-style or a Cambridge noteset) or a mathematical first course. Work the representations of Z/n, S3, and SO(3) until the pattern is obvious.',
    unlocks:
      'Unlocks quantum mechanics II, particle physics, and geometric deep learning. It is the algebra of “what is the same as what.”',
  },
  {
    id: 'measure-probability',
    title: 'Measure-Theoretic Probability',
    domains: ['math'],
    primary: 'math',
    hours: 80,
    prerequisites: ['probability', 'real-analysis'],
    summary:
      'Probability on general spaces: sigma-algebras, integration, conditioning as projection, and limit theorems done right.',
    ideas: [
      'A measure assigns consistent mass to a sigma-algebra of events.',
      'Lebesgue integration extends expectation to the wild functions analysis produces.',
      'Conditional expectation is an orthogonal projection in L2, not a formula.',
      'Almost-sure, in-probability, and L^p convergence are not interchangeable.',
      'Radon–Nikodym is the general derivative of one measure with respect to another.',
    ],
    overview:
      'This is the professional upgrade of probability. You need it for a clean statement of stochastic calculus, for modern statistical theory, and for not being bluffed by measure-theoretic asides in learning-theory papers. It is not a prerequisite for a first research project in ML or neuroscience; it is a prerequisite for certain kinds of theorems.\n\nMeasure spaces, measurable functions, dominated convergence, product measures, independence, conditional expectation, and the standard limit theorems in their sharp forms are the core.',
    study:
      'A first measure-theoretic probability book or course after real analysis. Keep a running dictionary that translates each theorem back into an undergraduate probability statement you already know.',
    unlocks:
      'Unlocks the rigorous side of stochastic processes, functional-analytic learning theory, and a safer reading of continuum statistical mechanics.',
  },
]
