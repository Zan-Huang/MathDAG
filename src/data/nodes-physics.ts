import type { Topic } from './types'

export const physicsTopics: Topic[] = [
  {
    id: 'intro-mechanics',
    title: 'Introductory Mechanics',
    domains: ['physics'],
    primary: 'physics',
    hours: 70,
    prerequisites: ['precalculus'],
    summary:
      'Newton’s laws, energy, momentum, rotation, and the first contact with modeling the physical world.',
    ideas: [
      'Force is the rate of change of momentum, not a primitive push.',
      'Energy and momentum are useful because they are conserved under stated conditions.',
      'A free-body diagram is the theory; the algebra is bookkeeping.',
      'Simple harmonic motion is the universal small-oscillation story.',
      'Dimensional analysis tells you the answer’s shape before you compute.',
    ],
    overview:
      'Mechanics is the first physics, and it is a course in honest modeling: isolate a system, name the interactions, write Newton’s second law, and check conservation. The Feynman lectures and a good calculus-based course both aim at the same thing — not a catalog of block-on-incline problems, but the idea that the world is compressible into a few laws plus initial conditions.\n\nCover kinematics, Newton’s laws, work and energy, momentum, rotation, gravitation, and oscillations. Calculus should enter as soon as you have it; do not stay in algebra-physics longer than you must.',
    study:
      'MIT 8.01 and the Feynman Lectures Vol. I. Walter Lewin’s 8.01 lectures remain unmatched for demonstration. Solve fewer problems more carefully: every solution should include a picture, a conservation check, and units.',
    unlocks:
      'Unlocks introductory E&M, waves, thermodynamics, special relativity, and analytical mechanics. It is the physics root.',
  },
  {
    id: 'intro-em',
    title: 'Introductory Electromagnetism',
    domains: ['physics'],
    primary: 'physics',
    hours: 70,
    prerequisites: ['intro-mechanics', 'single-var-calc'],
    summary:
      'Charges, fields, circuits, induction, and Maxwell’s equations in their first form.',
    ideas: [
      'A field is a physical object assigned to every point, not a bookkeeping trick.',
      'Gauss and Ampère are integral statements of local sources.',
      'Faraday’s law is the deepest undergraduate fact after Newton: changing B makes E.',
      'The displacement current is what makes light possible.',
      'Circuits are lumped-element shadows of Maxwell in the quasistatic limit.',
    ],
    overview:
      'Electricity and magnetism is the first field theory most people meet, and it is the hidden infrastructure of neuroscience (membrane currents, extracellular potentials) and of every electronic computer. The goal of a first course is Maxwell’s equations in integral form, the Lorentz force, and enough circuits to be dangerous in a lab.\n\nVector calculus will later make the same laws local and beautiful. Do not wait for that to start: flux and circulation can be understood with pictures and simple surfaces.',
    study:
      'MIT 8.02 (Lewin or later) and Feynman Vol. II. Build intuition with field-line sketches before you touch potentials. A coil, a capacitor, and a plane wave are the three objects you should be able to discuss in your sleep.',
    unlocks:
      'Unlocks waves and optics, electrodynamics, and special relativity’s electromagnetic side. Circuits here also feed membrane biophysics.',
  },
  {
    id: 'waves-optics',
    title: 'Waves & Optics',
    domains: ['physics'],
    primary: 'physics',
    hours: 50,
    prerequisites: ['intro-mechanics', 'single-var-calc'],
    summary:
      'Oscillations, traveling waves, interference, diffraction, and the linear wave equation.',
    ideas: [
      'A wave is a pattern that can move while the medium stays.',
      'Superposition is the linear luxury that makes Fourier useful.',
      'Interference is geometry plus phase; diffraction is interference from a continuum of sources.',
      'Dispersion is when different frequencies travel at different speeds.',
      'Standing waves are eigenfunctions of a bounded medium.',
    ],
    overview:
      'Waves are the bridge from mechanics to quantum mechanics, from circuits to light, and from cochlear models to spectrograms. Once you can write the wave equation, add boundary conditions, and talk about phase and group velocity, a surprising fraction of later physics is the same story in a new medium.\n\nCover simple harmonic oscillators, coupled oscillators, traveling and standing waves, sound, electromagnetic waves at a first level, and basic interference and diffraction. Polarization and a first look at Fourier optics are high leverage.',
    study:
      'MIT 8.03 and Feynman Vol. I wave chapters. Animate a dispersive packet. Then look at a cochlear filterbank or a quantum infinite well and notice you are still doing standing waves.',
    unlocks:
      'Unlocks quantum mechanics I, Fourier-heavy sensory models, and a better reading of electrodynamics. Oscillation language also feeds neural rhythms.',
  },
  {
    id: 'thermo',
    title: 'Thermodynamics',
    domains: ['physics'],
    primary: 'physics',
    hours: 45,
    prerequisites: ['intro-mechanics', 'single-var-calc'],
    summary:
      'Heat, work, temperature, and the laws that constrain every engine, cell, and computer.',
    ideas: [
      'Temperature is what equals at equilibrium; energy is what is conserved.',
      'The first law is energy accounting with heat as a mode of transfer.',
      'The second law is about which processes happen, not just which states exist.',
      'Entropy is not “disorder”; it is how many micro-descriptions a macro-state hides.',
      'Potentials (F, G, H) are Legendre transforms that match different constraints.',
    ],
    overview:
      'Thermodynamics is the most general physics you will learn: it applies to engines, membranes, computation, and black holes. A first course should make the four laws operational and should introduce entropy as a state function with a measurable differential. The microscopic “why” is statistical mechanics; do not skip the macroscopic “what” in the rush to ensembles.\n\nCover equations of state, heat capacities, Carnot, entropy, thermodynamic potentials, and equilibrium conditions. Phase transitions at the Clausius–Clapeyron level are enough for now.',
    study:
      'A careful thermo course or Schroeder-level treatment; Tong and Feynman both have excellent chapters. Compute the efficiency of something real. Then read Landauer’s principle as a teaser for information and physics.',
    unlocks:
      'Unlocks statistical mechanics and a more adult view of information theory. Every later story about heat, efficiency, or equilibrium starts here.',
  },
  {
    id: 'special-relativity',
    title: 'Special Relativity',
    domains: ['physics'],
    primary: 'physics',
    hours: 40,
    prerequisites: ['intro-mechanics', 'multivariable-calc'],
    summary:
      'Spacetime, Lorentz transformations, and the invariance of c. Mechanics without a preferred rest frame.',
    ideas: [
      'The invariant interval is the geometry; time dilation and length contraction are coordinates.',
      'Simultaneity is frame-dependent; causality is not.',
      'Four-vectors make momentum and energy into one object.',
      'E² = p²c² + m²c⁴ is Pythagoras in Minkowski space.',
      'Maxwell was already relativistic; mechanics had to catch up.',
    ],
    overview:
      'Special relativity is short, sharp, and non-optional for anything past introductory physics. It is also a geometry course: Minkowski space is the first non-Euclidean metric most people meet, and that prepares general relativity. Particle physics and QFT assume four-vectors as a native tongue.\n\nLearn Lorentz transformations, the interval, four-momentum, relativistic collisions, and the electromagnetic field tensor at a first level if you already have E&M. Paradoxes are coordinate confusion; resolve them with invariants.',
    study:
      'French, or Tong’s Dynamics and Relativity, or the relativity chapters of a modern intro sequence. Draw spacetime diagrams for every paradox. Then rewrite a familiar conservation law as a four-vector statement.',
    unlocks:
      'Unlocks general relativity, electrodynamics in covariant form, QFT, particle physics, and cosmology. It is the geometry of “no preferred inertial frame.”',
  },
  {
    id: 'analytical-mechanics',
    title: 'Analytical Mechanics',
    domains: ['physics'],
    primary: 'physics',
    hours: 70,
    prerequisites: ['intro-mechanics', 'multivariable-calc', 'odes'],
    summary:
      'Lagrangians, Hamiltonians, and phase space. Mechanics as geometry and variational principle.',
    ideas: [
      'The Lagrangian is T − V; Euler–Lagrange reproduces Newton with better coordinates.',
      'Cyclic coordinates give conserved momenta — Noether in undergraduate form.',
      'Hamilton’s equations are a first-order flow on phase space.',
      'Poisson brackets are the classical ancestors of commutators.',
      'Action-angle variables and generating functions are how you change coordinates without losing the physics.',
    ],
    overview:
      'Lagrangian and Hamiltonian mechanics are not a more painful way to do pendula. They are the form of mechanics that survives the trip to fields, quantum theory, and optimal control. Constraints become coordinate choices. Symmetries become conservation laws. Quantization becomes “replace Poisson brackets with commutators.”\n\nDerive Euler–Lagrange, treat constraints, move to the Hamiltonian, understand phase space and Liouville, and meet the Hamilton–Jacobi equation as a teaser. Small oscillations and rigid-body motion are the applied chapters.',
    study:
      'Tong’s Classical Dynamics notes are the best open path. Complement with a problems book. After you can do a double pendulum in Lagrangian form, write the same system as a Hamiltonian flow and visualize the energy surface.',
    unlocks:
      'Unlocks quantum mechanics, general relativity’s action principles, QFT, and optimal control. This is the adult form of mechanics.',
  },
  {
    id: 'electrodynamics',
    title: 'Electrodynamics',
    domains: ['physics'],
    primary: 'physics',
    hours: 90,
    prerequisites: ['intro-em', 'vector-calculus', 'odes'],
    summary:
      'Maxwell’s equations as a field theory: potentials, waves, radiation, and matter.',
    ideas: [
      'The homogeneous Maxwell equations say E and B come from potentials; the inhomogeneous ones say how charges make them.',
      'Gauge freedom is physical redundancy you must fix to compute.',
      'Radiation is the piece of the field that carries energy away at c.',
      'In matter, polarization and magnetization hide microscopic charges in effective fields.',
      'The stress tensor and Poynting vector are the local conservation laws.',
    ],
    overview:
      'This is the professional electromagnetic theory: Maxwell in differential form, boundary-value problems, multipoles, electromagnetic waves in media, waveguides, and radiation from accelerating charges. It is also the first serious relativistic field theory you can compute with.\n\nYou will use Green’s functions, special functions, and a lot of vector calculus. The prize is seeing light, circuits, and statics as one theory, and being ready for the covariant formulation that QFT needs.',
    study:
      'Tong’s EM notes, then a Griffiths- or Jackson-level problem diet as far as you need. Feynman Vol. II remains the intuition layer. Compute the field of an oscillating dipole and the energy it radiates.',
    unlocks:
      'Unlocks condensed-matter electrodynamics, quantum optics-adjacent QM II, and the field-theory step into QFT. MRI, extracellular potentials, and antennas all sit on this subject.',
  },
  {
    id: 'qm1',
    title: 'Quantum Mechanics I',
    domains: ['physics'],
    primary: 'physics',
    hours: 90,
    prerequisites: ['waves-optics', 'linear-algebra', 'odes', 'analytical-mechanics'],
    summary:
      'States as vectors, observables as operators, and the Schrödinger equation.',
    ideas: [
      'A state is a ray in a Hilbert space, not a point in phase space.',
      'Observables are self-adjoint operators; measurement is not a passive look.',
      'The Schrödinger equation is a linear ODE (or PDE) that preserves inner products.',
      'Commutators measure incompatibility; they become Poisson brackets in ħ → 0.',
      'Identical particles force symmetrization; that is already half of chemistry.',
    ],
    overview:
      'A first quantum course should make the linear-algebra picture unavoidable: spin-1/2 as the simplest quantum system, then the harmonic oscillator and the hydrogen atom as PDEs. Wave mechanics and Dirac notation are the same theory. Uncertainty is a theorem about inner products, not a slogan.\n\nCover the postulates, infinite well, oscillator (preferably via ladder operators), angular momentum, spin, and hydrogen. Perturbation theory and identical particles close the first year. Interpretational debates are optional; computing spectra is not.',
    study:
      'MIT 8.04 (Zwiebach) and Tong’s QM notes. Feynman Vol. III for spin and amplitude thinking. Solve the oscillator two ways. Implement a 1D split-operator time-dependent Schrödinger solver.',
    unlocks:
      'Unlocks QM II, condensed matter, quantum statistical mechanics, and QFT. It is also the conceptual ancestor of quantum-inspired ML metaphors — treat those metaphors with suspicion until you have this.',
  },
  {
    id: 'qm2',
    title: 'Quantum Mechanics II',
    domains: ['physics'],
    primary: 'physics',
    hours: 80,
    prerequisites: ['qm1', 'complex-analysis', 'group-representation'],
    summary:
      'Approximation methods, addition of angular momentum, scattering, and the road to many-body physics.',
    ideas: [
      'Degenerate perturbation theory is linear algebra in a subspace the Hamiltonian mixes.',
      'Variational methods turn a spectrum problem into an optimization problem.',
      'The WKB idea is “locally a plane wave, globally a phase integral.”',
      'Scattering amplitudes are how particles talk to experiments.',
      'Tensor products of representations are how two spins become a singlet or triplet.',
    ],
    overview:
      'The second quantum course is technique and structure: time-independent and time-dependent perturbation theory, variational methods, identical particles in earnest, addition of angular momentum, and scattering. This is the toolkit of atomic, molecular, and nuclear physics, and the last stop before many-body theory and QFT.\n\nIf group theory is on board, SU(2) and spherical tensors stop being magic. If complex analysis is on board, Green’s functions and contour integrals start to appear naturally.',
    study:
      'MIT 8.05 / 8.06 and Tong’s “Topics in Quantum Mechanics.” Work every angular-momentum addition problem. Compute a first-order shift and a Fermi-golden-rule rate from scratch.',
    unlocks:
      'Unlocks QFT, particle physics, and a serious condensed-matter course. It is the professional quantum toolkit.',
  },
  {
    id: 'statistical-mechanics',
    title: 'Statistical Mechanics',
    domains: ['physics', 'bridge'],
    primary: 'physics',
    hours: 80,
    prerequisites: ['thermo', 'probability', 'multivariable-calc'],
    summary:
      'Entropy from counting, ensembles, and the passage from micro-laws to thermo.',
    ideas: [
      'The Boltzmann formula S = k log W is the whole subject in one line.',
      'Ensembles are different conditionings of the same micro-world.',
      'The partition function is a generating function for thermodynamics.',
      'Phase transitions are nonanalyticities that only exist in the thermodynamic limit.',
      'When interactions matter, mean-field is the first lie that is still useful.',
    ],
    overview:
      'Statistical mechanics is the bridge from particles to thermodynamics, from spins to magnets, and — later — from synapses to learning curves. The intellectual shock is that a probability distribution over microstates, plus a counting argument, produces temperature, heat capacity, and phase transitions.\n\nCover microcanonical, canonical, and grand canonical ensembles, ideal gases, two-state systems, the Ising model at mean field, and Bose/Fermi gases at a first level. Fluctuations and the connection to information entropy should be explicit. Quantum statistics can start here or after QM I.',
    study:
      'Tong’s statistical physics notes and Sethna’s free book. Simulate a 2D Ising model. Then read a paragraph of a “physics of deep learning” paper and recognize the partition function.',
    unlocks:
      'Unlocks condensed matter, nonequilibrium stat mech, biophysics, mean-field neural populations, energy-based models, and the statistical physics of learning. This is the central physics overlap node.',
  },
  {
    id: 'condensed-matter',
    title: 'Condensed Matter',
    domains: ['physics'],
    primary: 'physics',
    hours: 80,
    prerequisites: ['qm1', 'statistical-mechanics'],
    summary:
      'Solids and many-body order: phonons, electrons in lattices, and broken symmetry.',
    ideas: [
      'A crystal is a discrete translation symmetry; Bloch’s theorem is its representation theory.',
      'Phonons and magnons are the quantized small oscillations of a condensed phase.',
      'Fermi surfaces, not atoms, decide a metal’s personality.',
      'Broken symmetry plus Goldstone modes is the modern organizing idea.',
      'Topology in band structure is when you cannot define a phase continuously.',
    ],
    overview:
      'Condensed matter is most of the physical universe that is not a dilute gas or a star: metals, insulators, magnets, superconductors, and the devices in your computer. It is also the closest physics culture to complex systems and to some neural mean-field theories — many interacting degrees of freedom, effective theories, and universality.\n\nA first course: crystal structure, phonons, free electrons, nearly-free electrons and tight binding, semiconductors, and a first look at magnetism and superconductivity. Second courses add Green’s functions and topology.',
    study:
      'Tong’s condensed-matter notes and Steve Simon’s online lectures/book drafts where available. Compute a 1D tight-binding band. The quantum Hall effect is the “why topology?” advertisement.',
    unlocks:
      'Unlocks a research path in materials and devices, and a richer intuition for many-body methods that reappear in statistical theories of learning.',
  },
  {
    id: 'fluids',
    title: 'Fluid Dynamics',
    domains: ['physics'],
    primary: 'physics',
    hours: 60,
    prerequisites: ['vector-calculus', 'pdes', 'intro-mechanics'],
    summary:
      'Continuum mechanics of fluids: Navier–Stokes, vorticity, and the Reynolds number.',
    ideas: [
      'The material derivative is “the field as seen by a particle.”',
      'Navier–Stokes is Newton plus a constitutive law for stress.',
      'Vorticity is the local rotation; in ideal flow it is frozen into the fluid.',
      'Reynolds number is the only dimensionless vote between inertia and viscosity.',
      'Turbulence is a cascade of scales, not a failure of the equation.',
    ],
    overview:
      'Fluids are the continuum mechanics you can see. They matter for blood, CSF, climate, stars, and a surprising number of mathematical techniques (complex potentials, boundary layers) that transfer. They are also a humility course: the equations are known and still mostly unsolved.\n\nCover kinematics of continua, Euler and Navier–Stokes, Bernoulli, vorticity, dimensional analysis, Stokes flow versus high-Re flow, and a first word on turbulence. Geophysical or biological fluids can be the applied flavor.',
    study:
      'Tong’s fluid-mechanics notes. Watch a few Cambridge or MIT fluids labs. Nondimensionalize Navier–Stokes yourself until Reynolds number is inevitable.',
    unlocks:
      'Unlocks a swath of applied physics and geophysics, and sharpens PDE and scaling skills used in biophysics and large-scale neural field models.',
  },
  {
    id: 'general-relativity',
    title: 'General Relativity',
    domains: ['physics'],
    primary: 'physics',
    hours: 90,
    prerequisites: ['special-relativity', 'differential-geometry', 'analytical-mechanics'],
    summary:
      'Gravity as spacetime curvature: Einstein’s equation, geodesics, and classic tests.',
    ideas: [
      'Equivalence: a gravitational field is locally a choice of acceleration.',
      'Matter tells spacetime how to curve; spacetime tells matter how to move.',
      'The Einstein tensor is the unique (simple) divergenceless curvature tensor.',
      'Schwarzschild is the spherical vacuum; its geodesics are the classic tests.',
      'Horizons are causal structure, not necessarily a place where curvature blows up.',
    ],
    overview:
      'General relativity is differential geometry with a physical metric whose curvature is tied to stress-energy. It is not required for neuroscience or most AI, but it is required for a complete physics education and for cosmology. It also permanently upgrades your comfort with tensors, gauges, and action principles.\n\nLearn the Einstein equation, geodesic deviation, Schwarzschild, linearized waves, and Friedmann cosmologies. Computational GR and black-hole thermodynamics can wait.',
    study:
      'Tong’s GR notes and Sean Carroll’s lecture notes (free). Do every index calculation once by hand. Recover Newtonian gravity as a limit so the theory does not float away.',
    unlocks:
      'Unlocks cosmology and a mature geometric view of field theory. It is a capstone of the theoretical-physics track.',
  },
  {
    id: 'qft',
    title: 'Quantum Field Theory',
    domains: ['physics'],
    primary: 'physics',
    hours: 120,
    prerequisites: ['qm2', 'special-relativity', 'analytical-mechanics'],
    summary:
      'Fields as the fundamental objects: quantization, Feynman diagrams, and renormalization as a first encounter.',
    ideas: [
      'Particles are excitations of fields; locality is a property of the Lagrangian.',
      'Canonical quantization and path integrals are two calculational religions.',
      'Feynman diagrams are terms in a perturbative expansion, not little movies of reality.',
      'Renormalization is how a theory remembers that it is an effective theory.',
      'Symmetries of the Lagrangian become Ward identities of the correlators.',
    ],
    overview:
      'QFT is the framework of particle physics and the formal ancestor of a surprising amount of statistical-field-theory and “infinite-width neural network” literature. A first course should get you from a free scalar field to tree-level amplitudes in QED, with a honest warning about what renormalization means.\n\nYou will need the harmonic oscillator, Lorentz representations, and a lot of Gaussian integrals. Do not start here to understand ChatGPT; start here to understand the Standard Model and the idea of an effective field theory.',
    study:
      'Tong’s QFT notes and Srednicki’s free draft. Compute the φ⁴ self-energy at one loop far enough to see a divergence. Peskin problems if you want the standard rite of passage.',
    unlocks:
      'Unlocks particle physics at a professional level and statistical field theory methods that reappear in the physics of learning. It is a long climb; treat it as a multi-quarter project.',
  },
  {
    id: 'particle-physics',
    title: 'Particle Physics',
    domains: ['physics'],
    primary: 'physics',
    hours: 60,
    prerequisites: ['qm2', 'special-relativity'],
    summary:
      'The Standard Model as phenomenology: quarks, leptons, gauge forces, and the Higgs.',
    ideas: [
      'Matter is fermions in representations; forces are gauge bosons.',
      'QCD confines; QED does not; that is a dynamical fact, not a slogan.',
      'The Higgs mechanism gives mass without explicitly breaking gauge invariance in the Lagrangian.',
      'Flavor mixing (CKM, PMNS) is a misalignment of mass and weak bases.',
      'Most of the universe’s mass-energy is not in the Standard Model’s inventory.',
    ],
    overview:
      'Particle physics is the experimental and taxonomic layer on top of QFT: what exists, how it decays, and how we know. You can learn a surprising amount with only QM II and relativity — Feynman diagrams as cartoons, conservation laws, and accelerator phenomenology — before a full QFT course.\n\nCover the particle content, Feynman rules at a user level, discrete symmetries (C, P, T), deep inelastic scattering as a story, and the Higgs. Neutrino oscillations are the cleanest “new physics already seen.”',
    study:
      'Tong’s particle-physics notes (unusually accessible) plus a modern survey lecture. Read a Particle Data Group review as if it were a field guide.',
    unlocks:
      'Unlocks a literate reading of collider results and of “beyond the Standard Model” claims. Pair with QFT if you want to compute, not only narrate.',
  },
  {
    id: 'computational-physics',
    title: 'Computational Physics',
    domains: ['physics', 'computing'],
    primary: 'physics',
    hours: 60,
    prerequisites: ['scientific-computing', 'odes', 'intro-mechanics'],
    summary:
      'N-body, Monte Carlo, PDE solvers, and the practice of discovering physics on a computer.',
    ideas: [
      'A good computational experiment has a known limit it must recover.',
      'Monte Carlo is sampling as integration; importance sampling is the whole game.',
      'Symplectic integrators respect the geometry of Hamiltonian flow.',
      'The Ising model is the fruit fly of computational stat mech.',
      'Visualization is part of the analysis, not a last-minute plot.',
    ],
    overview:
      'Computational physics is where numerical methods meet physical judgment. You learn which integrator conserves energy, how to thermalize a Monte Carlo chain, how to discretize a field without wrecking the continuum limit, and how to be skeptical of a pretty animation.\n\nProjects beat syllabi: an N-body solar system, an Ising magnet, a time-dependent Schrödinger packet, a little fluid solver. Each one teaches a family of later problems in neuroscience and ML.',
    study:
      'A computational physics course (Mark Newman-style or MIT-style) with graded projects. Reuse your scientific-computing hygiene. Compare Euler, RK4, and velocity Verlet on a Kepler problem.',
    unlocks:
      'Unlocks research-style simulation in physics and transfers directly to neural simulators and physics-informed ML.',
  },
  {
    id: 'biophysics',
    title: 'Biological Physics',
    domains: ['physics', 'biology', 'bridge'],
    primary: 'physics',
    hours: 55,
    prerequisites: ['statistical-mechanics', 'cell-biology', 'dynamical-systems'],
    summary:
      'Life as a physical system: polymers, membranes, molecular machines, and noise at kT.',
    ideas: [
      'kT is the currency of the cell; a kcal/mol is a few kT.',
      'Random walks and first-passage times are how molecules find each other.',
      'A membrane is a two-dimensional fluid with capacitance and a voltage.',
      'Molecular machines are nonequilibrium, not miniature Carnot engines in equilibrium.',
      'Scaling arguments often beat detailed simulation at the start of a problem.',
    ],
    overview:
      'Biophysics is the physics of cells without waiting for a full medical education. It is the right physical background for membrane models, molecular motors, and the claim that computation in cells is limited by noise and energy. It sits between statistical mechanics and neuroscience proper.\n\nCover diffusion and the Stokes–Einstein relation, Poisson–Boltzmann at a light level, polymer entropic springs, membrane elasticity, and rate theories for channels. Phillips-style “physical biology” thinking is the culture.',
    study:
      'Physical Biology of the Cell thinking (or open lecture analogues) plus Nelson’s Biological Physics if you can get it. Compute a diffusion time across a synapse and a membrane RC time; those two numbers organize a lot of neuroscience.',
    unlocks:
      'Unlocks a physically honest membrane biophysics and a better reading of molecular neuroscience. It is the physics–biology overlap.',
  },
  {
    id: 'nonequilibrium-statmech',
    title: 'Nonequilibrium Statistical Mechanics',
    domains: ['physics', 'bridge'],
    primary: 'physics',
    hours: 70,
    prerequisites: ['statistical-mechanics', 'stochastic-processes'],
    summary:
      'Systems that carry currents: fluctuation theorems, linear response, and driven matter.',
    ideas: [
      'Equilibrium is the special case of detailed balance; life is not that case.',
      'Linear response and the fluctuation–dissipation theorem relate noise to relaxation.',
      'A current-carrying steady state can still have a stationary density.',
      'Fluctuation theorems are exact symmetries of trajectory probabilities.',
      'Entropy production is the bookkeeping of irreversibility.',
    ],
    overview:
      'Brains, computers, and the climate are nonequilibrium. This subject is how statistical mechanics survives when you drive a system. It is also the formal background for some theories of life and of computation, and for the stochastic thermodynamics of molecular machines and possibly of synapses.\n\nLearn master equations with currents, Langevin and Fokker–Planck with drive, linear response, and a first fluctuation theorem. Driven lattice gases and simple ratchet models are the fruit flies.',
    study:
      'A modern nonequilibrium noteset (there are several excellent open lecture series) after equilibrium stat mech. Compute entropy production for a two-state driven system. Be wary of grand claims that skip this calculation.',
    unlocks:
      'Unlocks a more honest biophysics, some complexity/criticality literature, and a skeptical reading of “the brain is a nonequilibrium system” papers — now you can ask “which current?”',
  },
  {
    id: 'cosmology',
    title: 'Cosmology',
    domains: ['physics'],
    primary: 'physics',
    hours: 50,
    prerequisites: ['general-relativity', 'statistical-mechanics'],
    summary:
      'The universe as a dynamical system: expansion, thermal history, and large-scale structure.',
    ideas: [
      'The Friedmann equations are GR plus homogeneity and isotropy.',
      'A thermal history is statistical mechanics in an expanding box.',
      'Dark matter and dark energy are inferred from gravity, not yet from a laboratory particle.',
      'Primordial fluctuations become galaxies; that is a field-theory-plus-fluids story.',
      'The cosmological constant is the worst (or most interesting) fine-tuning problem.',
    ],
    overview:
      'Cosmology is GR plus statistical physics plus a little particle physics, pointed at the whole universe. It is not on the neuroscience path, but it is part of a complete physics education and a beautiful synthesis node: expansion dynamics, Boltzmann equations for relics, and the linear theory of structure.\n\nCover scale factor, redshift, the cosmic inventory, recombination, nucleosynthesis at a story level, and the idea of an inflationary spectrum. Data (CMB, BAO, supernovae) should stay in the room.',
    study:
      'Tong’s cosmology notes or a first cosmology course after GR. Recreate the critical-density calculation and a simple Boltzmann freeze-out estimate.',
    unlocks:
      'A complete theoretical-physics picture. Optional for every other track in this graph.',
  },
  {
    id: 'math-methods-physics',
    title: 'Mathematical Methods of Physics',
    domains: ['physics', 'math'],
    primary: 'physics',
    hours: 70,
    prerequisites: ['linear-algebra', 'odes', 'multivariable-calc', 'fourier-signal'],
    summary:
      'The working toolkit: special functions, Green’s functions, asymptotics, and tensor notation.',
    ideas: [
      'Green’s functions are inverses of linear differential operators with a point source.',
      'Special functions are the named eigenfunctions of the operators physics keeps using.',
      'Asymptotics extract the useful part of an integral that will not close.',
      'Tensors are objects with transformation laws, not “arrays with many indices.”',
      'Complex analysis is a computational engine, not a separate subject, once you are here.',
    ],
    overview:
      'This is the “how physicists actually compute” course that sits beside the theory sequence: Sturm–Liouville problems, Bessel and Legendre, saddle-point integrals, and the first Green’s functions. It is less a new subject than a consolidation that makes electrodynamics, QM, and PDEs faster.\n\nIf you have already learned these tools in situ, treat this node as a checklist, not a semester. If you are struggling in those courses, this node is the repair shop.',
    study:
      'A mathematical-methods course (Riley–Hobson–Bence style, or MIT 8.04/8.05 math interludes, or Nearing’s free Mathematical Tools for Physics). Keep a personal handbook of transforms and orthogonality relations you have actually used.',
    unlocks:
      'Makes electrodynamics, QM, and PDE courses compressible. Not a gate by itself, but a force multiplier for the physics track.',
  },
]
