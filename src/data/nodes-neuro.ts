import type { Topic } from './types'

export const neuroTopics: Topic[] = [
  {
    id: 'cell-biology',
    title: 'Cell Biology',
    domains: ['biology'],
    primary: 'biology',
    hours: 50,
    prerequisites: [],
    summary:
      'Membranes, organelles, proteins, and the cell as a chemical machine. The biological root of neuroscience.',
    ideas: [
      'A cell is a nonequilibrium chemical factory bounded by a lipid bilayer.',
      'Proteins are polymers whose folded shape is a function.',
      'Transcription and translation are a noisy digital-to-analogue pipeline.',
      'Trafficking and cytoskeleton are the logistics of a micron-scale city.',
      'Energy (ATP) is the budget that makes every “decision” of the cell affordable or not.',
    ],
    overview:
      'You cannot model a neuron honestly if “ion channel” is a black box and “synapse” is a weight. Cell biology is the parts list: membranes, gradients, receptors, second messengers, cytoskeleton, and the genome as a slowly changing policy. A first course should make the scale of things visceral — nanometers, milliseconds, micromolar.\n\nYou do not need a full medical-school histology year. You do need membranes, proteins, signaling cascades, and enough molecular biology to read a methods paragraph about CRISPR, antibodies, or opsins without panic.',
    study:
      'OpenStax Biology or Khan Academy AP/MCAT biology, plus iBiology lectures for the living cell. Draw a neuron and label nucleus, ER, mitochondria, cytoskeleton, and membrane proteins. Then read one channel-physiology abstract and highlight every organelle it assumes.',
    unlocks:
      'Unlocks neuroanatomy, cellular neurophysiology, and biophysics. It is the biology root of the graph.',
  },
  {
    id: 'neuroanatomy',
    title: 'Neuroanatomy',
    domains: ['biology'],
    primary: 'biology',
    hours: 45,
    prerequisites: ['cell-biology'],
    summary:
      'The parts of the nervous system and what is connected to what, at the scale of regions and tracts.',
    ideas: [
      'Gray matter computes; white matter communicates — a cartoon that is still useful.',
      'A named area is a consensus about cytoarchitecture, connectivity, and sometimes function.',
      'The same motif (cortex, thalamus, basal ganglia, cerebellum) recurs with different bodies.',
      'Laminae and columns are local coordinates, not mystical modules.',
      'Comparative anatomy is the control experiment evolution already ran.',
    ],
    overview:
      'Anatomy is the constraint on every theory. A beautiful dynamical system that cannot be wired given the tracts we know is a fiction. You need the major divisions of the CNS and PNS, the ventricular system, blood supply at a light level, cranial nerves, spinal laminae, and the large-scale map of cortex, thalamus, hippocampus, basal ganglia, and cerebellum.\n\nMicroanatomy — layers, cell types, glomeruli — belongs here at a first pass and deepens in systems neuroscience. Learn to read a stereotaxic atlas and an Allen or BigBrain section.',
    study:
      'Neuroscience Online (UT Houston) and OpenStax Anatomy for the gross layer. Use the Allen Brain Atlas as a lab. Sketch the trisynaptic hippocampal circuit and the basal-ganglia loops from memory.',
    unlocks:
      'Unlocks systems, sensory, and motor neuroscience, and later connectomics. Models without anatomy hallucinate.',
  },
  {
    id: 'cellular-neurophys',
    title: 'Cellular Neurophysiology',
    domains: ['biology', 'compneuro'],
    primary: 'biology',
    hours: 55,
    prerequisites: ['cell-biology', 'neuroanatomy'],
    summary:
      'Resting potential, action potentials, and the electrical life of a neuron as measured in a dish or a slice.',
    ideas: [
      'The resting potential is a Nernst-weighted leak; it is not “the sodium-potassium pump voltage.”',
      'An action potential is a traveling regenerative wave of channel gating.',
      'Input resistance and time constant turn current into a filtered voltage.',
      'Cable properties decide whether a distal synapse is a rumor or a shout.',
      'Voltage clamp is the experiment that turns a nonlinear ODE into a family of curves.',
    ],
    overview:
      'This is the experimental language that Hodgkin–Huxley formalized. Before you simulate, you should know what a voltage-clamp protocol looks like, what “inactivation” means at the bench, and why extracellular spikes are not intracellular voltages. The subject sits between cell biology and computational models.\n\nCover Nernst and GHK, passive membranes, the qualitative HH story, synaptic potentials, and a first look at neuromodulation. Labs or high-quality videos of slice physiology are worth more than another slide deck.',
    study:
      'Neuroscience Online physiology chapters plus a modern cellular-neuro course (MIT 9.40-style). Watch a voltage-clamp demonstration. Compute a Nernst potential until it is instinct.',
    unlocks:
      'Unlocks membrane biophysics, synaptic physiology, experimental methods, and the whole computational-neuron stack.',
  },
  {
    id: 'synaptic-physiology',
    title: 'Synaptic Physiology',
    domains: ['biology', 'compneuro'],
    primary: 'biology',
    hours: 40,
    prerequisites: ['cellular-neurophys'],
    summary:
      'Chemical and electrical synapses: release, receptors, plasticity at the synapse, and short-term dynamics.',
    ideas: [
      'Quantal release is a Poisson-ish story with a readily releasable pool.',
      'Ionotropic receptors are ligand-gated conductances; metabotropic receptors are slower policies.',
      'Short-term plasticity is a filter; long-term plasticity is a write operation.',
      'Excitation and inhibition are not “plus and minus” until you specify reversal and location.',
      'Neuromodulators retune the circuit more than they add a spike.',
    ],
    overview:
      'Synapses are where most of the interesting degrees of freedom in a brain live. A first course should make vesicle release, receptor kinetics, and the difference between AMPA, NMDA, GABA_A, and GABA_B operational. Plasticity — pairing, STDP as a phenomenon, LTP/LTD protocols — belongs here as experiment, and later as learning rules.\n\nElectrical synapses and ephaptic effects are the often-skipped chapters that matter for oscillations. Read at least one methods paper on slice pairing and one on in vivo synaptic imaging.',
    study:
      'A modern synaptic-physiology set of lectures plus Gerstner’s chapters on synapses. Simulate a depressing synapse and an NMDA coincidence detector. Those two models cover an enormous literature.',
    unlocks:
      'Unlocks synaptic plasticity as theory, and a less naive view of “weights” in both neuroscience and AI.',
  },
  {
    id: 'systems-neuroscience',
    title: 'Systems Neuroscience',
    domains: ['biology', 'compneuro'],
    primary: 'biology',
    hours: 70,
    prerequisites: ['neuroanatomy', 'cellular-neurophys'],
    summary:
      'Circuits that do jobs: sensorimotor loops, thalamocortical dialogue, and the logic of brain systems.',
    ideas: [
      'A system is defined by the behavior it supports, not by a stained nucleus alone.',
      'Receptive fields and tuning curves are the first-order statistics of a circuit.',
      'Recurrent circuitry is the default; pure feedforward is the exception.',
      'Lesion, stimulation, recording, and comparison are the four classical tests of a causal story.',
      'The same computation can be implemented by different circuits in different species.',
    ],
    overview:
      'Systems neuroscience asks how populations of neurons implement perception, action, and internal states. It is still an experimental subject: you learn the classic circuits (retina → LGN → V1, spinal reflexes, corticostriatal loops, hippocampal–entorhinal system) and the classic methods (extracellular recording, lesions, perturbation).\n\nA good first pass is organized by function rather than by textbook chapter order, but you should be able to place each function on an anatomical map. This node is the parent of sensory, motor, and cognitive specializations.',
    study:
      'A systems course (MIT 9.13 / 9.01 style) plus Purves- or Kandel-level reading if available. Neuroscience Online is the open spine. For each system, write a one-page “box and arrow” model and list what would falsify it.',
    unlocks:
      'Unlocks sensory and motor systems, cognitive neuroscience, decision models, and every “the brain does X” theory that hopes to meet data.',
  },
  {
    id: 'cognitive-neuroscience',
    title: 'Cognitive Neuroscience',
    domains: ['biology'],
    primary: 'biology',
    hours: 50,
    prerequisites: ['systems-neuroscience'],
    summary:
      'The neural basis of attention, memory, language, and decision as studied in humans and primates.',
    ideas: [
      'A cognitive process is a decomposition of behavior, not a blob on an fMRI map.',
      'Dissociation logic is strong when it is double and weak when it is a single activation.',
      'Working memory, attention, and control share anatomy and should not be reified too early.',
      'Human methods (fMRI, MEG, ECoG, perturbation) have different temporal and spatial lies.',
      'Computation is the missing middle between a task and a BOLD map.',
    ],
    overview:
      'Cognitive neuroscience is where psychology and systems neuroscience try to share objects. It is essential if you care about human intelligence, language, or psychiatric models, and it is a minefield of reverse inference. Learn the major networks, the logic of neuroimaging, and a handful of durable facts (hippocampal memory systems, prefrontal control, ventral/dorsal visual streams).\n\nTreat this node as a map of questions more than a map of answers. The computational payoff comes when you pair it with decision models, memory models, and NeuroAI.',
    study:
      'A first cognitive-neuroscience course plus Poldrack-style neuroimaging literacy. Read one adversarial collaboration or replication paper so the uncertainty stays visible.',
    unlocks:
      'Unlocks a literate reading of human neuroscience and of AI-alignment-adjacent claims about “human values” that skip the brain. Pairs with decision models and NeuroAI.',
  },
  {
    id: 'sensory-systems',
    title: 'Sensory Systems',
    domains: ['biology', 'compneuro'],
    primary: 'biology',
    hours: 50,
    prerequisites: ['systems-neuroscience', 'fourier-signal'],
    summary:
      'Transduction, adaptation, and hierarchical codes from receptor to cortex, with vision as the model system.',
    ideas: [
      'A receptor is a filter plus a nonlinearity plus noise.',
      'Adaptation is computation: it spends dynamic range on the current world.',
      'Efficient coding is a theory of what early sensors optimize, not a theory of the whole brain.',
      'Receptive fields become more invariant and more semantic as you ascend — sometimes.',
      'Multisensory integration is a statistical problem (and a timing problem).',
    ],
    overview:
      'Sensory systems are the most computationally mature part of neuroscience because the input is controllable. Vision is the default syllabus: retina, LGN, V1 simple/complex cells, ventral and dorsal streams. Audition and somatosensation teach you that time and space trade places. Olfaction teaches you high-dimensional chemistry.\n\nFourier and filtering language pays off immediately. So do information theory and later convnets: the same hierarchy appears in both literatures, with different honesty about data.',
    study:
      'A sensory-systems course plus Olshausen / Simoncelli efficient-coding essays (many are open). Implement a center-surround filter and a simple Gabor V1 bank on images. Then break them with a texture or adversarial example.',
    unlocks:
      'Unlocks vision models, a better reading of convnets, and neural coding as a scientific program rather than a slogan.',
  },
  {
    id: 'motor-systems',
    title: 'Motor Systems',
    domains: ['biology', 'compneuro', 'bridge'],
    primary: 'biology',
    hours: 45,
    prerequisites: ['systems-neuroscience'],
    summary:
      'How nervous systems produce movement: muscles, spinal cord, motor cortex, cerebellum, and basal ganglia.',
    ideas: [
      'Muscles and the skeleton are the plant; the nervous system is a controller with delays.',
      'The spinal cord already computes a lot; cortex is not a puppeteer of motoneurons only.',
      'Internal models are the brain’s simulators of the body and the world.',
      'The basal ganglia are a selection and vigor system, not a “motor blob.”',
      'The cerebellum is a timing and error-correction machine with a crystalline circuit.',
    ],
    overview:
      'Motor control is the most natural bridge from neuroscience to control theory and robotics. The plant is nonlinear, the delays are long, the sensors are noisy, and the task is defined in task space, not joint space. A first course should cover muscles, reflexes, motor primitives, M1, premotor areas, cerebellum, and basal ganglia at a systems level.\n\nOptimal feedback control is the theoretical language you will meet again under the control and RL-in-the-brain nodes. Do not skip the spinal cord in a rush to cortex.',
    study:
      'A motor-systems course plus a Scott / Todorov / Wolpert-style review (many are open access). Draw the cerebellar microcircuit. Then write the delay-and-noise reasons a purely reactive controller fails.',
    unlocks:
      'Unlocks optimal control as a brain theory, robotics, and a less vision-centric view of intelligence.',
  },
  {
    id: 'experimental-neuro',
    title: 'Experimental Methods in Neuroscience',
    domains: ['biology', 'compneuro'],
    primary: 'biology',
    hours: 40,
    prerequisites: ['cellular-neurophys', 'scientific-python'],
    summary:
      'What the instruments actually measure: ephys, imaging, perturbations, and their artifacts.',
    ideas: [
      'Every measurement is a convolution of the biology with a sensor and a pipeline.',
      'Spikes, LFPs, calcium, BOLD, and behavior are different projections of the same hidden state.',
      'A perturbation that is not measured is a rumor about causality.',
      'Ethics and experimental design are part of the method, not an appendix.',
      'Metadata (times, coordinates, task events) are the difference between a dataset and a file.',
    ],
    overview:
      'If you will analyze data or propose experiments, you need a user’s guide to the instruments. Extracellular electrophysiology, patch clamp, calcium imaging, voltage imaging, fMRI, neuropixels, optogenetics, and behavior tracking each have a transfer function and a failure mode. This node is that guide.\n\nLearn what a spike-sorting pipeline does, why calcium is a slow nonlinear reporter, why HRF convolution ruins fast inference, and how to read a methods section for the actual sampling rate and the actual controls.',
    study:
      'Neuromatch and Allen tutorials, SpikeInterface docs, and a methods-focused course. Process one open dataset (Allen, IBL, or similar) from raw-ish files to a plot you could put in a paper.',
    unlocks:
      'Unlocks neural data analysis as a serious subject and keeps later theory honest about what can be seen.',
  },
  {
    id: 'membrane-biophysics',
    title: 'Membrane Biophysics',
    domains: ['compneuro', 'physics'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['cellular-neurophys', 'odes'],
    summary:
      'The membrane as a circuit: capacitance, Nernst batteries, and voltage-gated conductances.',
    ideas: [
      'C dV/dt = −Σ g_i (V − E_i) + I is the whole single-compartment religion.',
      'A conductance is a population of stochastic pores; HH is the mean-field.',
      'Gating variables are chemical kinetics with voltage-dependent rates.',
      'The Nernst potential is equilibrium; current is the departure from it.',
      'Noise from finite channel number matters in small structures.',
    ],
    overview:
      'This is the physics of the lipid bilayer as an RC circuit with batteries and voltage-dependent resistors. It is the derivation layer under Hodgkin–Huxley: where the capacitance comes from, what a reversal potential is, and how a Boltzmann factor in a gating particle becomes an activation curve.\n\nWork until you can derive the parallel-conductance equation, explain units (µF/cm², mS/cm²), and discuss channel shot noise. Biophysics of Computation (Koch) is the classic advanced pointer; Gerstner Ch. 1–2 is the open start.',
    study:
      'Gerstner Neuronal Dynamics opening chapters plus a biophysics lecture. Fit an activation curve to a Boltzmann function. Simulate an RC circuit and then add one voltage-gated current by hand.',
    unlocks:
      'Unlocks Hodgkin–Huxley and a physically constrained view of every later neuron model.',
  },
  {
    id: 'hodgkin-huxley',
    title: 'Hodgkin–Huxley Models',
    domains: ['compneuro'],
    primary: 'compneuro',
    hours: 35,
    prerequisites: ['membrane-biophysics', 'odes'],
    summary:
      'The canonical conductance-based action-potential model and its numerical personality.',
    ideas: [
      'HH is a four-dimensional nonlinear ODE with a clear biophysical dictionary.',
      'The action potential is a stereotyped orbit, not a threshold crossing of a scalar.',
      'Stiffness and multiple timescales make naive Euler a bad default.',
      'Adding currents (A-type, HCN, Ca) is how the family becomes a zoo of cell types.',
      'The model is a mean-field of channels; the stochastic version is a jump process.',
    ],
    overview:
      'Hodgkin–Huxley (1952) is the founding computational-neuroscience paper and still the reference conductance-based model. You should be able to write the equations, explain n, m, and h, reproduce a spike, and discuss what the model does not include (spatial extent, calcium dynamics, realistic channel noise).\n\nThis node is short because it is focused. The payoff is that every later reduced model is a principled or unprincipled compression of this one.',
    study:
      'Gerstner Ch. 2 and the original 1952 paper (read the methods). Integrate HH with a stiff-aware solver. Then read Izhikevich on how the same currents produce bursting when you add a slow variable.',
    unlocks:
      'Unlocks cable theory, reduced neuron models, and oscillations as bifurcations of conductance-based cells.',
  },
  {
    id: 'cable-compartmental',
    title: 'Cable Theory & Compartmental Models',
    domains: ['compneuro'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['hodgkin-huxley', 'pdes'],
    summary:
      'Neurons as spatially extended cables: attenuation, dendrites, and multi-compartment simulation.',
    ideas: [
      'The cable equation is a 1D PDE for voltage along a process.',
      'Length and time constants set how far and how long a synaptic event lives.',
      'Dendrites are not passive funnels; they can spike, isolate, and compute.',
      'A compartmental model is a graph of RC circuits with shared currents.',
      'Morphology is a parameter, and usually an under-constrained one.',
    ],
    overview:
      'Point neurons are a modeling choice, not a fact. Cable theory (Rall) is the continuum electrostatics of a thin process, and compartmental modeling is the practical discretization used in NEURON and similar simulators. This is how you talk about location-dependent synapses, dendritic computation, and extracellular fields at a first order.\n\nSolve the steady-state infinite and finite cable. Understand sealed-end boundary conditions. Build a two-compartment model that actually needs two compartments to match a phenomenon.',
    study:
      'Gerstner’s cable chapter, Sterratt et al. resources, and NEURON or Brian2 spatial tutorials. Reproduce Rall’s equivalent-cylinder insight once so you know when it fails.',
    unlocks:
      'Unlocks morphologically detailed simulation and a skeptical eye for point-neuron papers that need dendrites.',
  },
  {
    id: 'reduced-neuron-models',
    title: 'Reduced Neuron Models',
    domains: ['compneuro'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['hodgkin-huxley', 'dynamical-systems'],
    summary:
      'LIF, AdEx, Izhikevich, and FitzHugh–Nagumo: few-variable models that keep the geometry of spiking.',
    ideas: [
      'A reduction is a projection of a conductance-based system onto a slow–fast plane.',
      'The leaky integrate-and-fire neuron is a linear filter plus a reset — the workhorse of theory.',
      'Bifurcation type (SNIC vs Hopf) decides type-I vs type-II excitability.',
      'Adaptation currents are extra slow variables with behavioral consequences.',
      'A model should be chosen for the question, not for tribal loyalty.',
    ],
    overview:
      'Most theory and most large-scale simulation does not use full HH. Reduced models keep a voltage, one or two recovery variables, and a spike rule. Dynamical-systems language is what makes the reduction honest: you know which bifurcation you kept.\n\nMaster LIF and exponential IF / AdEx, Izhikevich’s two-variable model, and FitzHugh–Nagumo as a cubic cartoon. Know when a rate model is allowed to replace a spiking one.',
    study:
      'Izhikevich’s Dynamical Systems in Neuroscience (free PDF) and Gerstner Ch. 4–6. Sweep a parameter and watch a neuron go from rest to spiking through a Hopf or a SNIC.',
    unlocks:
      'Unlocks network models, oscillations, SNNs, and mean-field theory. This is the workhorse node of theoretical neuroscience.',
  },
  {
    id: 'spike-trains',
    title: 'Spike Trains & Point Processes',
    domains: ['compneuro'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['probability', 'stochastic-processes', 'cellular-neurophys'],
    summary:
      'Spikes as events in time: Poisson processes, renewal models, and GLMs for neurons.',
    ideas: [
      'A spike train is a point process; the rate is only its first moment.',
      'Poisson is the no-memory null; real neurons have refractory structure.',
      'A GLM with a history filter is the modern statistical workhorse.',
      'Time-rescaling is the goodness-of-fit test you should actually run.',
      'Correlations between cells can live in the rate or in the residual — those are different theories.',
    ],
    overview:
      'Once you treat spikes as data, you need point-process statistics. This is the language of neural coding experiments, of GLM encoding models, and of the claim that a cell is “Poisson.” It sits between stochastic processes and information-theoretic coding.\n\nLearn intensity functions, renewal processes, ISI histograms, PSTHs, and the Pillow / Paninski GLM style. Simulate before you fit: a bad fit to a process you do not understand is a career.',
    study:
      'Gerstner and Neuromatch point-process tutorials; Pillow lab notes where available. Fit a GLM to a small open intracellular or retinal dataset. Run time-rescaling.',
    unlocks:
      'Unlocks neural coding as a quantitative subject and the statistical core of neural data analysis.',
  },
  {
    id: 'neural-coding',
    title: 'Neural Coding',
    domains: ['compneuro', 'bridge'],
    primary: 'compneuro',
    hours: 45,
    prerequisites: ['information-theory', 'spike-trains', 'statistics'],
    summary:
      'What spikes represent: rate, time, population geometry, and the bits they carry about the world.',
    ideas: [
      'A code is a statistical relationship between world and spikes, not a textbook label.',
      'Rate versus time codes is a false war; the question is which timescales carry the bits.',
      'Population geometry (manifolds, decoders) is how modern papers talk about codes.',
      'Noise correlations can help or hurt depending on their alignment with the signal.',
      'The encoder/decoder pair is the whole story; one side alone is a fragment.',
    ],
    overview:
      'Neural coding is the scientific program that asks what is represented, in what format, and with what fidelity. Information theory gives you the units. Point processes give you the objects. Statistics gives you the decoders. The subject has moved from single-cell tuning curves to population manifolds and task-trained networks, but the old questions are still the right ones.\n\nCover Shannon-style estimates (with the bias warning), Wiener / GLM encoding, linear decoders, d-prime, and a modern manifold paper. Efficient coding and predictive coding are theories of why the code looks as it does — they get their own later nodes.',
    study:
      'Dayan & Abbott’s coding chapters if you have the book; Gerstner’s coding chapters and Neuromatch otherwise. Decode a stimulus from a small population in an open dataset. Then try to say what “the neural code for X” would even mean.',
    unlocks:
      'Unlocks Bayesian-brain theories, a better reading of representation learning, and any claim about what a brain area “encodes.”',
  },
  {
    id: 'synaptic-plasticity',
    title: 'Synaptic Plasticity & Learning Rules',
    domains: ['compneuro', 'ai'],
    primary: 'compneuro',
    hours: 45,
    prerequisites: ['synaptic-physiology', 'dynamical-systems'],
    summary:
      'How synapses change: Hebb, STDP, eligibility traces, and the gap between rules and behavior.',
    ideas: [
      'Hebb is a correlation detector; the details of timing and normalization do all the work.',
      'STDP is a family of phenomena, not a single universal rule.',
      'Homeostasis and inhibitory plasticity keep networks in the useful regime.',
      'A learning rule is local; a behavioral function is often not — that tension is the field.',
      'Neuromodulators gate plasticity; they are the brain’s credit-assignment broadcast.',
    ],
    overview:
      'Plasticity is the neuroscience of learning, and it is not backpropagation. This node is the catalog of local rules and the experiments that constrain them: LTP/LTD protocols, STDP windows, behavioral timescale plasticity, and synaptic tagging. It is also the start of the conversation with AI about credit assignment.\n\nYou should be able to write a Hebbian ODE, an STDP nearest-neighbor rule, an Oja-style stabilizer, and a three-factor rule with a modulator. Then you should be able to say what function each could implement — and what it cannot.',
    study:
      'Gerstner’s plasticity chapters and a modern review on three-factor rules. Simulate Hebbian instability, then add normalization. Pair with the RL-in-the-brain node when you want function.',
    unlocks:
      'Unlocks RL in the brain, a less naive view of deep learning, and models of memory that are not just Hopfield cartoons.',
  },
  {
    id: 'oscillations',
    title: 'Neural Oscillations',
    domains: ['compneuro'],
    primary: 'compneuro',
    hours: 35,
    prerequisites: ['dynamical-systems', 'reduced-neuron-models'],
    summary:
      'Rhythms as collective dynamics: mechanisms, functions, and the temptation to over-interpret a peak.',
    ideas: [
      'A population rhythm can come from pacemaker cells or from the coupling, or both.',
      'PING, ING, and pyramidal-interneuron motifs are the standard E–I stories.',
      'Phase is a coordinate; power is not a function.',
      'Coherence and phase-amplitude coupling are easy to plot and easy to fake.',
      'A function for a rhythm needs a perturbation, not only a correlation with a task.',
    ],
    overview:
      'Brains oscillate. That is a fact. What the oscillations do is a research program. Mechanistically, this node is about how delayed inhibition, adaptation, and coupling produce cycles — the dynamical-systems sequel to reduced neurons. Empirically, it is about LFP, EEG, and the hygiene of spectral analysis.\n\nLearn the standard circuit motifs, the difference between a spike-LFP locking and a population cycle, and the common artifacts (filtering, volume conduction, reference). Function hypotheses (gating, packaging, traveling waves) should be treated as models to break.',
    study:
      'A oscillations-focused review plus Izhikevich / Börgers-style models. Simulate a PING network. Analyze an open EEG or LFP recording with a pre-registered question so you do not p-hack a frequency band.',
    unlocks:
      'Unlocks a dynamical reading of large-scale models and a more careful cognitive-neuroscience of “brain waves.”',
  },
  {
    id: 'recurrent-attractors',
    title: 'Recurrent Networks & Attractors',
    domains: ['compneuro', 'ai', 'bridge'],
    primary: 'compneuro',
    hours: 50,
    prerequisites: ['reduced-neuron-models', 'dynamical-systems', 'linear-algebra'],
    summary:
      'Hopfield nets, continuous attractors, and the idea that memory and integration are geometry in recurrent dynamics.',
    ideas: [
      'An attractor is a memory if the basin is the cue and the fixed point is the item.',
      'Hopfield’s energy is a Lyapunov function for a symmetric network.',
      'Continuous attractors can integrate and hold a manifold of values (head direction, working memory).',
      'Asymmetry and drive turn attractors into sequences and heteroclinic chains.',
      'Capacity, robustness, and biological plausibility are three different scores.',
    ],
    overview:
      'Recurrent attractor networks are the shared folklore of theoretical neuroscience and early AI. Hopfield nets, ring attractors, and bump attractors are still the right first models of associative memory, head direction, and some working-memory phenomena. Modern work trains recurrent nets on tasks and then looks for the same geometry.\n\nLinearize a recurrent net, find the modes, and watch how symmetry of the weights creates an energy. Then break the symmetry and see sequences. This is also the conceptual ancestor of energy-based models and of some interpretations of residual and recurrent deep nets.',
    study:
      'Hopfield’s original paper, Gerstner’s network chapters, and a modern ring-attractor review (flies have been good to this field). Implement a Hopfield net and a ring attractor. Then train a small RNN on a memory task and look for the fixed points.',
    unlocks:
      'Unlocks memory models, a dynamical view of residual computation, and part of the NeuroAI synthesis.',
  },
  {
    id: 'mean-field-populations',
    title: 'Mean-Field & Population Dynamics',
    domains: ['compneuro', 'physics', 'bridge'],
    primary: 'compneuro',
    hours: 50,
    prerequisites: ['statistical-mechanics', 'reduced-neuron-models', 'dynamical-systems'],
    summary:
      'From spikes to rates: population densities, Wilson–Cowan, balanced networks, and neural fields.',
    ideas: [
      'A mean-field replaces a population with its density or its moment closure.',
      'Wilson–Cowan is the Hopf-capable rate model everyone should meet once.',
      'Balanced excitation and inhibition can make a network both responsive and irregular.',
      'Neural field equations put rates on a continuum of space.',
      'The thermodynamic limit is a modeling choice with finite-N corrections that often matter.',
    ],
    overview:
      'Population models are where statistical physics and neuroscience share a desk. You coarse-grain spikes into rates or into a voltage density, close the equations, and study the resulting ODE or PDE. This is the language of cortical regimes (asynchronous irregular, oscillatory), of Wilson–Cowan phenomenology, and of Amari neural fields.\n\nWork the balanced-network argument (van Vreeswijk / Sompolinsky), a Wilson–Cowan bifurcation, and a population-density equation for LIF neurons. Finite-size fluctuations are the sequel, not the start.',
    study:
      'Gerstner’s population chapters and Neuromatch dynamic-networks days. Simulate a sparse E–I network and measure irregularity versus balance. Then write the corresponding rate equations and see what they miss.',
    unlocks:
      'Unlocks decision-diffusion at the circuit level, large-scale brain models, and the physics-of-learning culture of “order parameters for networks.”',
  },
  {
    id: 'decision-models',
    title: 'Decision Making Models',
    domains: ['compneuro', 'ai', 'bridge'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['stochastic-processes', 'systems-neuroscience', 'mean-field-populations'],
    summary:
      'Bounded accumulation, races, and the mapping from drift-diffusion to neural circuits and RL.',
    ideas: [
      'The drift-diffusion model is sequential probability ratio in continuous time.',
      'A bound is a policy: it trades time for accuracy.',
      'Neural implementations can be racing populations or a single integrator with inhibition.',
      'Confidence and changes of mind are not extra modules; they fall out of the same trajectory.',
      'Value-based decisions add a learning problem to an accumulation problem.',
    ],
    overview:
      'Perceptual decision making is the cleanest cognitive computation we have: evidence arrives, a bound is hit, a choice and a reaction time appear. The DDM and its race cousins connect psychophysics, LIP/PFC-style recordings, and sequential analysis in statistics. They also sit next to RL: a bound is an opportunity-cost policy.\n\nFit a DDM to a behavioral dataset. Read Gold & Shadlen. Then look at a competing-population circuit and see the same bound as a saddle or a crossing. Value-based and multi-alternative decisions are the generalization.',
    study:
      'A dedicated decision-making course or Neuromatch / summer-school lectures. Use an open psychophysics dataset. Implement both a particle DDM and a two-population rate model.',
    unlocks:
      'Unlocks a quantitative cognitive neuroscience and a bridge to RL and Bayesian brains. It is the fruit fly of Neuroeconomics.',
  },
  {
    id: 'neural-data-analysis',
    title: 'Neural Data Analysis',
    domains: ['compneuro', 'computing'],
    primary: 'compneuro',
    hours: 55,
    prerequisites: ['statistics', 'scientific-python', 'experimental-neuro'],
    summary:
      'From raw files to claims: spike sorting, encoding/decoding, dimensionality reduction, and statistics that survive a referee.',
    ideas: [
      'The pipeline is part of the result; change the sorter and you may change the science.',
      'Cross-validated decoding is a lower bound on information, not a mechanistic model.',
      'Dimensionality reduction is a lens; it can invent a manifold that the noise prefers.',
      'Multiple comparisons and nested trials are where neuroscience p-values go to die.',
      'A figure should name the unit, the N, and the null.',
    ],
    overview:
      'This is the professional practice node: you take an open or simulated dataset and produce an analysis that is preprocessed, visualized, quantified, and cautious. Tools (SpikeInterface, Neo, NWB, Nilearn, MNE) matter, but the subject is statistical judgment under dependence and high dimensionality.\n\nCover spike sorting hygiene, PSTHs, tuning, GLMs, cross-validated decoders, PCA/FA/GPFA, and cluster-robust or permutation inference. Imaging and EEG have their own artifacts; do not pretend a single notebook covers them.',
    study:
      'Neuromatch computational neuroscience data days, Allen and IBL tutorials, and a statistics-for-neuroscience course. Complete one end-to-end project with a written “what I might have faked” section.',
    unlocks:
      'Unlocks the ability to participate in empirical computational neuroscience and to test the theories in the rest of this branch.',
  },
  {
    id: 'snn',
    title: 'Spiking Neural Networks',
    domains: ['compneuro', 'ai', 'bridge'],
    primary: 'compneuro',
    hours: 45,
    prerequisites: ['reduced-neuron-models', 'neural-nets'],
    summary:
      'Networks that communicate with events: simulation, training, and the comparison with rate-based deep learning.',
    ideas: [
      'A spike is a sparse, asynchronous message with a precise timestamp.',
      'Surrogate gradients are how we pretend the spike function is differentiable.',
      'Temporal coding can in principle be efficient; in practice the hardware and the task decide.',
      'Brian2, BindsNET, Norse, and custom CUDA are different points on the realism–speed curve.',
      'The interesting question is which inductive bias spikes buy you, not whether they are “more biological.”',
    ],
    overview:
      'Spiking nets sit on the border of neuroscience and AI. As neuroscience they are the simulation layer for circuits that care about timing. As AI they are a bet that event-based computation will win on some energy or latency metric. You should be able to simulate a network of LIFs, implement a learning rule (STDP or surrogate-gradient BPTT), and discuss conversion from rate ANNs.\n\nKeep the neuromorphic hardware story adjacent but separate. Keep the hype at arm’s length: measure.',
    study:
      'Brian2 tutorials, Neuromatch or SNUFA materials, and a modern surrogate-gradient paper. Train a small SNN on a temporal or event-based task and compare to a GRU on the same data.',
    unlocks:
      'Unlocks neuromorphic computing and a concrete NeuroAI research program. It is optional for most ML and most systems neuroscience.',
  },
  {
    id: 'connectomics',
    title: 'Connectomics',
    domains: ['compneuro', 'biology'],
    primary: 'compneuro',
    hours: 40,
    prerequisites: ['graph-theory', 'neuroanatomy', 'scientific-computing'],
    summary:
      'Measuring and interpreting wiring diagrams, from C. elegans to cubic millimeters of cortex.',
    ideas: [
      'A connectome is a graph with an error model, not a truth table of the mind.',
      'Scale (synaptic, mesoscale, MRI) changes the scientific question, not just the resolution.',
      'Motifs, cell-type wiring rules, and projection maps are the usual reductions.',
      'Dynamics are not determined by anatomy alone; neuromodulation and state matter.',
      'The fly and the worm are existence proofs that a diagram plus good physiology can yield mechanisms.',
    ],
    overview:
      'Connectomics is the measurement of graphs that anatomy used to describe in prose. Electron-microscopy synaptic maps, viral tracing mesoscale maps, and diffusion MRI are three different sciences that share a noun. Graph theory is how you avoid drowning. Cell types are how you avoid treating every synapse as exchangeable.\n\nLearn what each method can and cannot see, how people define “a connection,” and what analyses (degree, motif, clustering, embedding) have actually led to mechanisms rather than posters.',
    study:
      'Reviews from the MICrONS, fly hemibrain / connectome, and Human Connectome Project literatures (many open). Load a small reconstructed graph and compute a few spectral features. Then ask what experiment the number suggests.',
    unlocks:
      'Unlocks large-scale brain models that hope to use real wiring, and a data-driven side of NeuroAI.',
  },
  {
    id: 'large-scale-brain',
    title: 'Large-Scale Brain Models',
    domains: ['compneuro', 'bridge'],
    primary: 'compneuro',
    hours: 45,
    prerequisites: ['mean-field-populations', 'connectomics', 'scientific-computing'],
    summary:
      'Whole-region and whole-brain simulations: neural masses, point-neuron networks, and the problem of parameters.',
    ideas: [
      'A large model is a hypothesis about which details can be averaged away.',
      'Connectome-based neural masses are only as good as the parcellation and the delays.',
      'Parameter inference in large models is usually underdetermined; you fit a slice of behavior.',
      'Validation against multiple modalities at once is the only adult standard.',
      'Interpretability scales worse than FLOPs.',
    ],
    overview:
      'This node is the ambitious end of computational neuroscience: The Virtual Brain-style neural masses, large point-neuron simulations, and digital-twin rhetoric. The scientific question is always the same — which measurements does the model have to match, and what would count as a surprise?\n\nYou should be able to build a small connectome-coupled Wilson–Cowan or Hopf-mass network, discuss delays and noise, and criticize a whole-brain paper’s degrees of freedom. Detailed cellular simulations of a cubic millimeter belong here as an engineering frontier.',
    study:
      'TVB tutorials, NEST or Brian large-network examples, and a skeptical reading of a flagship whole-brain paper. Reproduce one published figure from open code if it exists.',
    unlocks:
      'Unlocks the NeuroAI synthesis on the “build a brain” side, and a research path in neuroinformatics.',
  },
]
