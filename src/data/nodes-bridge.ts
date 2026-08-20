import type { Topic } from './types'

export const bridgeTopics: Topic[] = [
  {
    id: 'control-theory',
    title: 'Control Theory',
    domains: ['bridge', 'physics', 'ai'],
    primary: 'bridge',
    hours: 55,
    prerequisites: ['odes', 'linear-algebra', 'multivariable-calc'],
    summary:
      'Steering dynamical systems with feedback: stability, controllability, and the loop you can prove things about.',
    ideas: [
      'Open loop is a prayer; feedback is a policy that sees the error.',
      'Poles of a linear system are the eigenvalues that decide decay and oscillation.',
      'Controllability and observability are dual geometric facts about the pair (A, B) and (A, C).',
      'PID is the industrial special case; state space is the general one.',
      'Robustness is “still works when the model is wrong” — the adult specification.',
    ],
    overview:
      'Control theory is the overlap language of motor neuroscience, robotics, and a surprising amount of optimization and RL. You take a dynamical system and ask whether you can make it do something, stably, in the presence of noise and model error. The linear theory is complete enough to be beautiful: LQR, Kalman filters, and the separation principle.\n\nNonlinear and adaptive control are the sequels. Frequency-domain methods (Bode, Nyquist) are still how a lot of the world designs loops. Do not skip them because state space feels more modern.',
    study:
      'Åström & Murray, Feedback Systems (free), plus Steve Brunton’s control lectures. Underactuated Robotics begins here. Design a controller for a pendulum or a simple thermal plant and then break the model on purpose.',
    unlocks:
      'Unlocks optimal control, robotics, and a precise reading of motor systems. RL is the learning-based cousin; this is the model-based one.',
  },
  {
    id: 'optimal-control',
    title: 'Optimal Control',
    domains: ['bridge', 'physics', 'ai', 'compneuro'],
    primary: 'bridge',
    hours: 50,
    prerequisites: ['control-theory', 'variational-calculus', 'optimization'],
    summary:
      'Choosing inputs to minimize a cost: Pontryagin, Hamilton–Jacobi–Bellman, and LQR as the solvable island.',
    ideas: [
      'A cost on a trajectory turns control into a variational problem.',
      'Pontryagin’s principle is Euler–Lagrange with inputs and constraints.',
      'HJB is the Bellman equation in continuous time; its solution is a value function.',
      'LQR is the quadratic-linear island where everything is a Riccati equation.',
      'Minimum-jerk and optimal-feedback-control models of movement live here.',
    ],
    overview:
      'Optimal control is the common ancestor of analytical mechanics (least action), RL (maximize return), and the leading normative models of human reaching. Once you have seen HJB next to a Bellman equation, the AI/neuro/physics triangle stops being a metaphor.\n\nWork LQR by hand. Meet Pontryagin on a simple constrained problem. Then read Todorov’s optimal-feedback-control story of motor noise and you will see why this node sits on three domains.',
    study:
      'A short optimal-control course or the corresponding chapters of Underactuated Robotics and Kirk/Liberzon-style notes. Solve a finite-horizon LQR. Re-derive the DDM bound as an optimal-stopping cousin.',
    unlocks:
      'Unlocks active inference’s control half, motor theories, and a principled view of actor-critic methods as approximate HJB solvers.',
  },
  {
    id: 'statistical-physics-of-learning',
    title: 'Statistical Physics of Learning',
    domains: ['bridge', 'physics', 'ai'],
    primary: 'bridge',
    hours: 55,
    prerequisites: ['statistical-mechanics', 'deep-learning', 'information-theory'],
    summary:
      'Networks as disordered systems: generalization as a phase, teacher–student models, and order parameters for learning.',
    ideas: [
      'A learning problem is a high-dimensional inference problem with a disorder average over data.',
      'Teacher–student models are the Ising models of generalization.',
      'The replica method and message passing are how you compute typical-case behavior.',
      'Double descent and grokking are phenomena looking for phase diagrams.',
      'Infinite-width limits (NTK, mean-field) are solvable theories with a limited domain of truth.',
    ],
    overview:
      'This is the genuine physics–AI overlap, not the “we used a neural net on a spectrum” overlap. You treat the training set as quenched disorder, the weights as a statistical-mechanical system, and you compute typical generalization. The classics are Gardner, replica analyses of perceptrons, and more recently the physics of gradient descent in high dimension.\n\nYou need equilibrium stat mech, information theory, and enough deep learning to know what is being idealized. The payoff is a language for generalization that is not a VC bound and not a vibe.',
    study:
      'Mehta et al., “A high-bias, low-variance introduction to Machine Learning for physicists” (arXiv, free) and a modern review on the physics of deep learning. Work a perceptron capacity argument. Then read an NTK paper as a solvable limit, not as a complete theory of GPT.',
    unlocks:
      'Unlocks a research path at the physics/ML border and a sharper reading of learning theory. It is a synthesis node, not a first course.',
  },
  {
    id: 'energy-based-models',
    title: 'Energy-Based Models',
    domains: ['bridge', 'physics', 'ai'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['statistical-mechanics', 'deep-learning'],
    summary:
      'Probabilities from energies: Boltzmann machines, score matching, and Hopfield’s family tree.',
    ideas: [
      'p(x) ∝ e^{−E(x)} is the whole idea; the partition function is the villain.',
      'Hopfield nets, Boltzmann machines, and some modern associative memories are one lineage.',
      'Contrastive divergence and score matching are ways to avoid Z.',
      'A free-energy bound is a variational handle on the same object.',
      'Compositionality of energies is the advertised advantage over normalized models.',
    ],
    overview:
      'Energy-based models are where statistical mechanics and generative AI share an equation. They include Boltzmann machines, some associative-memory models, and a way of looking at diffusion (scores are gradients of energies). They also reappear in some brain theories as “the cortex minimizes an energy.”\n\nImplement a tiny RBM or a continuous EBM on 2D data. Feel why Z is hard. Then the later diffusion and Hopfield papers read as variations.',
    study:
      'LeCun’s EBM tutorial notes, Hinton’s RBM guide, and a modern Hopfield / energy-transformer paper. Train one small model. Derive the contrastive-divergence gradient once.',
    unlocks:
      'A unified view of Hopfield attractors, some generative models, and parts of active-inference rhetoric. Optional if you are satisfied with VAEs and diffusion as engineering.',
  },
  {
    id: 'neural-odes',
    title: 'Neural ODEs & Continuous Networks',
    domains: ['bridge', 'ai', 'physics'],
    primary: 'bridge',
    hours: 35,
    prerequisites: ['odes', 'deep-learning'],
    summary:
      'Residual networks as discretized dynamics, and models whose depth is a solver.',
    ideas: [
      'A residual block is one step of an Euler scheme; the continuous limit is an ODE.',
      'The adjoint method lets you differentiate through a solver without storing every step.',
      'Adaptive computation is a numerical-analysis gift that ML rediscovered.',
      'Stability and reversibility become architecture questions.',
      'Neural CDEs and SDEs are the data-irregular and noisy sequels.',
    ],
    overview:
      'Neural ODEs are a precise overlap of deep learning and dynamical systems: you parameterize a vector field and let a numerical integrator be the network. They are useful for irregular time series, for some generative models (FFJORD), and as a conceptual lens on ResNets. They are not a replacement for transformers.\n\nImplement a residual net and its continuous cousin on a small problem. Look at the adjoint derivation. Then you will understand a family of papers that would otherwise look like a new product line.',
    study:
      'Chen et al. 2018 (arXiv) and a tutorial implementation. Compare fixed-depth ResNet to an adaptive ODE net on a toy classification or a time series. Read a critique of when the continuous view helps.',
    unlocks:
      'A research dialect at the ML/dynamics border and a cleaner story about residual computation in brains and machines.',
  },
  {
    id: 'physics-informed-ml',
    title: 'Physics-Informed Machine Learning',
    domains: ['bridge', 'physics', 'ai'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['pdes', 'deep-learning', 'numerical-methods'],
    summary:
      'Putting known equations into learners: PINNs, operator learning, and hybrid solvers.',
    ideas: [
      'A residual of a PDE is a loss; that is the PINN idea.',
      'Soft constraints are not the same as structure-preserving discretizations.',
      'Operator learners try to map functions to functions, not points to points.',
      'The classical numerical-analysis questions — stability, conservation — do not go away.',
      'The win is usually data-poor inverse problems, not replacing a good CFD code on a forward problem.',
    ],
    overview:
      'Physics-informed ML is the practical physics–AI overlap: you know some equations, you have some data, you want a surrogate or an inverse map. PINNs, Fourier neural operators, and hybrid finite-element / network methods are the current tools. The subject is moving fast and is full of papers that underperform a well-tuned classical solver.\n\nYou need PDEs and numerical methods more than you need a new architecture. Demand baselines. Conservation and boundary conditions are where honesty lives.',
    study:
      'Karniadakis-style PINN reviews and the operator-learning literature (many arXiv). Solve a 1D inverse heat problem with a PINN and with a classical method. Write down what the network bought you.',
    unlocks:
      'A research and applied path in scientific ML. Optional for neuroscience unless you do neural-field or biophysical inverse problems.',
  },
  {
    id: 'bayesian-brain',
    title: 'Bayesian Brain',
    domains: ['bridge', 'compneuro', 'ai'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['bayesian-inference', 'neural-coding', 'systems-neuroscience'],
    summary:
      'Perception as inference: priors, likelihoods, and the experimental program that tests them.',
    ideas: [
      'A percept is a posterior, not a raw sensor reading.',
      'Priors should be measured, not only postulated to save the phenomenon.',
      'Cue combination and causal inference in perception are the cleanest tests.',
      'Sampling versus variational codes are two implementation stories with different noise signatures.',
      'A Bayesian model of a task is not a proof that the brain runs Bayes’ rule.',
    ],
    overview:
      'The Bayesian-brain program says that nervous systems represent and update probability distributions. It is the most successful normative story in perception (Knill, Pouget, Ernst & Banks) and the parent of predictive coding and active inference. It is also easy to make unfalsifiable.\n\nLearn the psychophysical tests, the neural-implementation proposals (probabilistic population codes, sampling), and the failure modes (mis-specified priors, resource limits). This is applied Bayesian inference with a biological constraint set.',
    study:
      'Pouget / Ma / Knill reviews (many open access) and Neuromatch Bayesian days. Fit a cue-combination model to a toy dataset. Then read a critique so the normativity stays visible.',
    unlocks:
      'Unlocks predictive coding and active inference, and a principled link from ML inference algorithms to perceptual psychology.',
  },
  {
    id: 'predictive-coding',
    title: 'Predictive Coding',
    domains: ['bridge', 'compneuro', 'ai'],
    primary: 'bridge',
    hours: 35,
    prerequisites: ['bayesian-brain', 'deep-learning'],
    summary:
      'Hierarchy as prediction and error: Rao–Ballard, modern variants, and the comparison with backprop and transformers.',
    ideas: [
      'Higher areas send predictions; lower areas send errors — that is the cartoon, and it is testable.',
      'The original Rao–Ballard model is a linear-Gaussian hierarchical inference scheme.',
      'Precision weighting is how the theory talks about attention.',
      'Whether cortex is “just a predictive coder” is a much stronger claim than “prediction happens.”',
      'Predictive objectives in deep learning are cousins, not identity documents.',
    ],
    overview:
      'Predictive coding is the most famous process theory of hierarchical cortex. It sits between the Bayesian brain (the computational level) and specific circuit motifs (the implementational level). AI rediscovered predictive and self-supervised objectives independently; the comparison is now a research field (NeuroAI).\n\nImplement a tiny Rao–Ballard model. Read a modern electrophysiology test. Then look at a self-supervised vision model and write the analogy and the disanalogy on one page.',
    study:
      'Rao & Ballard 1999, a modern review (Walsh / Spratling / Keller — pick one), and NeuroAI course modules. Stay close to experiments that manipulate expectation.',
    unlocks:
      'Unlocks active inference and a central chapter of the NeuroAI synthesis.',
  },
  {
    id: 'active-inference',
    title: 'Active Inference & Free Energy',
    domains: ['bridge', 'compneuro', 'ai'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['predictive-coding', 'optimal-control', 'information-theory'],
    summary:
      'Action as inference: variational free energy as a unified (and contested) objective for perception, learning, and control.',
    ideas: [
      'Variational free energy is an upper bound on surprise; minimizing it is approximate inference.',
      'Active inference treats actions as hypotheses that make sensations less surprising.',
      'The free-energy principle is a modeling framework, not a single falsifiable neural mechanism.',
      'Under extra assumptions it recovers Bayes, predictive coding, and some optimal control.',
      'The controversy is about necessity and about whether the extra vocabulary earns its keep.',
    ],
    overview:
      'Active inference is the ambitious unification: perception, learning, and action as minimization of a variational free energy. It is genuinely at the center of this graph — information theory, variational methods, control, and hierarchical inference. It is also a literature with a high jargon-to-prediction ratio, so the node includes the duty to demand process models and data.\n\nWork a discrete MDP-style active-inference example by hand. Recover a Kalman filter as variational inference. Then decide, for yourself, which pieces you will keep.',
    study:
      'A tutorial that stays close to equations (there are several open ones) plus a critical review. Implement a small discrete-state agent. Compare it to an explicit POMDP solver on the same toy world.',
    unlocks:
      'A synthesis language for NeuroAI and a research community. Not required to do excellent work in any one of physics, neuro, or AI.',
  },
  {
    id: 'rl-in-brain',
    title: 'Reinforcement Learning in the Brain',
    domains: ['bridge', 'compneuro', 'ai'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['reinforcement-learning', 'synaptic-plasticity', 'systems-neuroscience'],
    summary:
      'Dopamine, basal ganglia, and the experimental status of TD learning as a brain theory.',
    ideas: [
      'The RPE-dopamine story is the most successful computational theory in systems neuroscience — and still incomplete.',
      'Model-free and model-based systems can coexist and compete (Daw / Dolan / Dayan).',
      'Three-factor plasticity is the implementational story for TD-like updates.',
      'Distributional RL has a surprisingly serious dopamine literature.',
      'Not all learning is RL; not all dopamine is an RPE.',
    ],
    overview:
      'This is the NeuroAI overlap that already paid rent. Schultz, Dayan, and Montague connected TD learning to midbrain dopamine; decades of data refined and complicated the story. You should know the original mapping, the actor-critic anatomy (striatum, dopamine, prefrontal model-based systems), and the current debates (what is the target, what about aversives, what about curiosity).\n\nPair this with motor systems and decision models and you have a computational account of action selection that you can take to the lab.',
    study:
      'The original TD-dopamine papers and a modern review (Niv; Gershman; Dabney distributional). Simulate an actor-critic on a bandit and draw the nuclei. Then read a paper that breaks the simple RPE story.',
    unlocks:
      'A concrete research program and a reality check for deep RL’s sample inefficiency. It is one of the best-justified bridges in the graph.',
  },
  {
    id: 'neuromorphic',
    title: 'Neuromorphic Computing',
    domains: ['bridge', 'computing', 'compneuro'],
    primary: 'bridge',
    hours: 35,
    prerequisites: ['snn', 'gpu-hpc', 'membrane-biophysics'],
    summary:
      'Hardware that looks more like neurons: event-based sensors, analog circuits, and the energy argument.',
    ideas: [
      'The brain’s energy budget is the existence proof that analog, sparse, local computation can work.',
      'An event-based camera is a silicon retina with a real, measurable advantage on some tasks.',
      'Analog noise and mismatch are features or bugs depending on the algorithm.',
      'The software stack is the bottleneck more often than the device physics.',
      'A fair comparison includes the sensor, the memory movement, and the task, not only the TOPS/W slide.',
    ],
    overview:
      'Neuromorphic computing is the engineering sequel to SNNs and membrane physics: you try to buy latency and energy by making the hardware event-driven or analog. Loihi, TrueNorth, analog crossbars, and event cameras are the examples. The subject is half device physics and half algorithms that can actually use spikes.\n\nKeep the accounting honest. A GPU running a dense matmul can beat a spiking chip on the tasks people actually have. The interesting work is the tasks where the spike representation is native.',
    study:
      'A neuromorphic-engineering course or summer school lectures (many open), plus event-camera tutorials. Port a tiny SNN to a simulator of a neuromorphic chip if you can. Measure energy or a proxy, not only accuracy.',
    unlocks:
      'An engineering research path at the hardware edge of NeuroAI. Optional for theorists.',
  },
  {
    id: 'information-geometry',
    title: 'Information Geometry',
    domains: ['bridge', 'math', 'ai', 'physics'],
    primary: 'bridge',
    hours: 45,
    prerequisites: ['differential-geometry', 'information-theory', 'probability'],
    summary:
      'The geometry of probability families: Fisher metric, natural gradient, and exponential families as manifolds.',
    ideas: [
      'A parametric family is a manifold; the Fisher information is a metric.',
      'The natural gradient is the steepest direction measured in KL, not in Euclidean weight space.',
      'Exponential families are dually flat; that is why their math is so clean.',
      'f-divergences induce geometries; KL is the one everyone meets first.',
      'The same metric appears in statistical mechanics as a thermodynamic inner product.',
    ],
    overview:
      'Information geometry is the math overlap of inference, learning dynamics, and statistical mechanics. It explains natural gradients, a geometric view of thermodynamics, and some theories of the brain as a statistical manifold. It is advanced and optional, but it is the cleanest “why is this the same equation?” story in the graph.\n\nYou need differential geometry and information theory already. Then Amari’s pictures become readable rather than oracular.',
    study:
      'A short information-geometry course or Amari tutorial notes (several are freely circulated by authors). Compute the Fisher metric of a Gaussian family. Implement a natural-gradient update on a tiny model and compare to Adam.',
    unlocks:
      'A geometric dialect for learning and thermodynamics. Research-level; not on the critical path for most work.',
  },
  {
    id: 'complexity-criticality',
    title: 'Complexity & Criticality',
    domains: ['bridge', 'physics', 'compneuro'],
    primary: 'bridge',
    hours: 40,
    prerequisites: ['dynamical-systems', 'statistical-mechanics', 'graph-theory'],
    summary:
      'Collective phenomena: networks, branching processes, and the contested idea that brains sit at a critical point.',
    ideas: [
      'A complex system has structure at many scales that you did not put in by hand.',
      'Criticality is scale-free fluctuation at a phase transition — a precise claim.',
      'Branching ratios and avalanche exponents are the usual neural measurements; they are easy to spoof.',
      'Self-organized criticality is a mechanism, not a destination you name after seeing a power law.',
      'Useful computation may want a regime, not a point — “edge of chaos” is a slogan until it is a model.',
    ],
    overview:
      'Complexity science is the Santa Fe-style layer: networks, scaling, emergence. In physics it is phase transitions and turbulence. In neuroscience it is the claim that cortex operates near criticality to maximize dynamic range or information. Some of that literature is careful; some of it is a power law with a story.\n\nLearn the clean physics (Ising criticality, branching processes) and the measurement hygiene (finite size, thresholding, maximum likelihood of exponents). Then the neural papers become judgeable.',
    study:
      'Sethna’s complexity chapters, Complexity Explorer courses, and a critical review of neural avalanche claims. Simulate a branching process and an Ising slice. Fit an exponent the wrong way and the right way.',
    unlocks:
      'A cautious research path in collective neural dynamics and a better BS detector for “emergence” slides.',
  },
  {
    id: 'neuro-ai',
    title: 'NeuroAI Synthesis',
    domains: ['bridge', 'compneuro', 'ai'],
    primary: 'bridge',
    hours: 50,
    prerequisites: [
      'predictive-coding',
      'foundation-models',
      'large-scale-brain',
      'interpretability',
    ],
    summary:
      'The research program that uses AI as a source of hypotheses for brains, and brains as a source of constraints for AI.',
    ideas: [
      'A task-trained network is a hypothesis about the objective and the architecture, not a miniature animal.',
      'Goal-driven modeling of vision is the existence proof that the program can work.',
      'The mapping must be specified: units to cells, layers to areas, objectives to behaviors.',
      'Engineering success and scientific explanation can diverge; keep the scores separate.',
      'The open problems — credit assignment, energy, causality, development — are where the program is still honest.',
    ],
    overview:
      'This is the capstone overlap node. NeuroAI (as in the Neuromatch course and a growing literature) treats modern AI systems as computationally explicit hypotheses about brain function, and treats neuroscience as a source of constraints, data, and new objectives. Goal-driven models of the ventral stream are the flagship success. Language, motor control, and cognitive maps are the current frontiers.\n\nYou should be able to train or probe a model, compare it to a neural dataset with a fair metric (RSA, linear predictivity), and state what would count as a failure. You should also be able to say when a foundation model is being used as a tool rather than as a theory.',
    study:
      'Neuromatch NeuroAI (open course book), Yamins / DiCarlo-style goal-driven vision papers, and a current position piece. Run one comparison on an open neural dataset. Write a one-page “what would falsify this model” before you admire the R².',
    unlocks:
      'The intended destination of this graph for people who want to work at the intersection rather than in one silo. Everything else was scaffolding.',
  },
]
