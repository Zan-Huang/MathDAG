import type { Topic } from './types'

export const aiTopics: Topic[] = [
  {
    id: 'intro-ml',
    title: 'Introduction to Machine Learning',
    domains: ['ai'],
    primary: 'ai',
    hours: 50,
    prerequisites: ['linear-algebra', 'probability', 'scientific-python'],
    summary:
      'Prediction as a statistical problem: loss, generalization, train/test, and the first models.',
    ideas: [
      'A model is a family of functions; learning is picking one using data and a loss.',
      'Generalization is the only score that matters; training error is a diagnostic.',
      'The bias–variance tradeoff is a parable; modern deep learning complicates the parable without deleting it.',
      'Features are where most of the science used to live; deep learning moved that science into the architecture.',
      'A baseline that is linear and well-regularized embarrasses many “clever” models.',
    ],
    overview:
      'Machine learning is applied statistics with a culture of prediction and a taste for high-dimensional function classes. A first course should make you fluent in the loop: define a task, pick a hypothesis class, choose a loss and a regularizer, fit on a train set, evaluate on a held-out set, and plot the errors that remain.\n\nMeet linear regression, logistic regression, k-NN, decision trees, and the vocabulary of overfitting, cross-validation, and regularization. You do not need neural nets on day one. You do need to implement gradient descent on a convex loss yourself.',
    study:
      'Caltech Learning From Data (Abu-Mostafa) or an equivalent first course, plus ISL for the statistical view. Mathematics for Machine Learning (Deisenroth et al., free) fills gaps. Implement linear and logistic regression in NumPy before you touch a framework.',
    unlocks:
      'Unlocks supervised and unsupervised learning as separate crafts, neural nets, and reinforcement learning. It is the AI root after the math and Python spine.',
  },
  {
    id: 'supervised',
    title: 'Supervised Learning',
    domains: ['ai'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['intro-ml', 'statistics'],
    summary:
      'Learning functions from labeled pairs: linear models, kernels, trees, boosting, and calibration.',
    ideas: [
      'Empirical risk minimization is the official religion; the prior hides in the class and the regularizer.',
      'Kernels are inner products in a feature space you never write down.',
      'Trees split the input; boosting adds weak learners; random forests average them.',
      'Class imbalance, leakage, and mislabeled data are the usual villains.',
      'A probability forecast should be calibrated, not only accurate at a threshold.',
    ],
    overview:
      'Supervised learning is the mature core of classical ML and still the evaluation protocol of most deep learning. Go deeper than the intro survey: regularized linear models, SVMs and kernels at a conceptual level, trees and gradient boosting (the thing that still wins on tabular data), and the practice of pipelines and leakage control.\n\nThis is also where you learn to read a precision-recall curve and to not trust accuracy on an imbalanced set. Bayesian versions wait for the Bayesian node; theory waits for learning theory.',
    study:
      'ESL (Hastie, Tibshirani, Friedman, free) as the encyclopedia; ISL as the readable pass. scikit-learn’s user guide is a syllabus. Win a small tabular problem with gradient boosting before you declare deep learning mandatory.',
    unlocks:
      'Unlocks learning theory, a competent baseline culture for every later AI node, and a fair comparison with neural nets.',
  },
  {
    id: 'unsupervised',
    title: 'Unsupervised Learning',
    domains: ['ai', 'compneuro'],
    primary: 'ai',
    hours: 45,
    prerequisites: ['intro-ml', 'linear-algebra'],
    summary:
      'Structure without labels: PCA, clustering, density models, and the geometry of representations.',
    ideas: [
      'PCA is an SVD of the data; it is not a generative theory of the world.',
      'Clustering is ill-posed until you say what a cluster is for.',
      'A latent-variable model is a story about hidden causes plus a fitting procedure.',
      'Dimensionality reduction for visualization (t-SNE, UMAP) is a map, not a proof of manifolds.',
      'Self-supervised learning is unsupervised learning that invented its own labels — treated later as its own node.',
    ],
    overview:
      'Most of the world, and most neural recordings, are unlabeled. Unsupervised learning is the toolkit for finding axes, clusters, and densities. In neuroscience it is how you draw a neural manifold. In AI it is the ancestor of representation learning.\n\nCover PCA/SVD, k-means and mixtures of Gaussians, hierarchical clustering, ICA as a teaser, and the warnings about t-SNE. Generative models proper (VAEs, diffusion) come later; here you want the linear and mixture story to be solid.',
    study:
      'Bishop or Murphy chapters on latent-variable models (PML is freely available), plus Neuromatch’s dimensionality-reduction days. Project a neural population with PCA and with a nonlinear method; write what each lie is.',
    unlocks:
      'Unlocks self-supervised learning, a better reading of neural manifolds, and the density-model side of generative AI.',
  },
  {
    id: 'bayesian-inference',
    title: 'Bayesian Inference',
    domains: ['ai', 'compneuro', 'bridge'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['probability', 'statistics'],
    summary:
      'Beliefs as distributions: priors, posteriors, hierarchical models, and approximate inference.',
    ideas: [
      'Bayes’ rule is not optional if you accept the probability axioms and want coherent updates.',
      'A prior is a modeling choice; hiding it does not make it go away.',
      'Conjugacy is computational convenience, not nature.',
      'Hierarchical models share statistical strength; they are how random effects become beliefs.',
      'When the posterior is intractable, you variationally bound it or you sample it.',
    ],
    overview:
      'Bayesian inference is the common language of probabilistic ML, the Bayesian brain, and a lot of careful neuroscience statistics. The math is the same: write a generative model, invert it. The culture differs in whether you want a point estimate or a full posterior, and in how much you trust the model.\n\nCover conjugate models, hierarchical Gaussians, MAP versus posterior means, MCMC at a user level, and variational inference as KL minimization. Graphical models will organize the larger families.',
    study:
      'MacKay (free) and Barber’s Bayesian Reasoning (free) or Murphy PML. Fit a hierarchical model to a psychophysics or neural dataset. Implement mean-field variational inference for a simple Gaussian mixture once.',
    unlocks:
      'Unlocks graphical models, causal inference’s probabilistic side, Bayesian brains, and Bayesian deep learning culture.',
  },
  {
    id: 'graphical-models',
    title: 'Probabilistic Graphical Models',
    domains: ['ai'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['bayesian-inference', 'graph-theory'],
    summary:
      'Factoring joint distributions on graphs: Bayes nets, MRFs, and message passing.',
    ideas: [
      'A graph is a factorization; d-separation is the implied independence.',
      'Directed models are generative stories; undirected models are compatibility stories.',
      'Exact inference is message passing on trees and a hard problem on general graphs.',
      'EM is coordinate ascent on a bound for models with hidden variables.',
      'The same algebra underlies Kalman smoothers, hidden Markov models, and some transformer “explanations.”',
    ],
    overview:
      'Graphical models are how you write structured probability at scale: HMMs for sequences, Kalman filters for tracking, Ising/MRFs for images and spins, topic models for text. They are also the formal cousins of neural circuit diagrams when those diagrams are meant as generative models.\n\nLearn Bayes nets, undirected models, inference (variable elimination, belief propagation), and learning with complete and incomplete data. This subject peaked as “the” AI before deep learning and remains the right way to talk about structure.',
    study:
      'Coursera PGM (Koller) if you can audit it, or Murphy / Barber chapters. Implement forward–backward and a Kalman filter. Then write a tiny Bayes net for a diagnostic story.',
    unlocks:
      'Unlocks structured prediction, a cleaner view of HMMs and Kalman filters in neural data, and parts of causal inference.',
  },
  {
    id: 'neural-nets',
    title: 'Neural Networks',
    domains: ['ai', 'compneuro'],
    primary: 'ai',
    hours: 45,
    prerequisites: ['intro-ml', 'linear-algebra', 'multivariable-calc'],
    summary:
      'Layered function approximation: perceptrons, MLPs, backpropagation, and what a “unit” is allowed to mean.',
    ideas: [
      'A multilayer perceptron is composed affine maps and coordinatewise nonlinearities.',
      'Universal approximation is a low bar; the useful question is generalization and efficiency.',
      'Backprop is reverse-mode differentiation on a computational graph.',
      'A unit is not a neuron unless you have earned the metaphor with a mapping.',
      'Initialization, scaling, and residual connections are numerical-analysis facts wearing ML clothes.',
    ],
    overview:
      'This is the pre-deep-learning-industry node: what a net is, how it is trained, and why depth changes the story. You should derive backprop for an MLP, implement it, and feel vanishing gradients. You should also know the 1980s–1990s history well enough not to treat 2012 as year zero.\n\nThe neuroscience comparison starts here and becomes honest only later (NeuroAI). For now, keep the metaphor under control and the derivatives correct.',
    study:
      'Karpathy’s Neural Networks: Zero to Hero, 3Blue1Brown’s NN series, and Nielsen’s free Neural Networks and Deep Learning. Implement an MLP on MNIST in NumPy. Then reimplement it in a framework and confirm the numbers match.',
    unlocks:
      'Unlocks deep learning, SNNs as a comparison, and the rest of modern AI. No later architecture node replaces this one.',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    domains: ['ai'],
    primary: 'ai',
    hours: 70,
    prerequisites: ['neural-nets', 'optimization'],
    summary:
      'The modern practice: architectures as inductive biases, training at scale, and the empirical regularities of deep nets.',
    ideas: [
      'Architecture is a prior over functions; data and compute are the other two knobs.',
      'SGD on overparameterized nets does not behave like the convex textbook.',
      'Normalization, residuals, and attention are engineering answers to optimization and routing.',
      'Scaling laws are empirical regularities looking for a theory.',
      'A benchmark is a proxy; Goodhart applies.',
    ],
    overview:
      'Deep learning is neural nets plus a decade of systems, data, and architectural folklore that turned out to generalize. A first serious pass should make you fluent in the training loop (autodiff, GPU batches, logging), in the standard blocks (conv, recurrent, attention — each deepened later), and in the known failure modes (spurious cues, brittleness, energy cost).\n\nRead a modern free textbook (Prince, d2l, or Bishop’s DL book) cover-to-cover enough to implement, not only to watch. The science of why it works is a separate, unfinished subject (physics of learning, learning theory).',
    study:
      'Understanding Deep Learning (Prince, free), Dive into Deep Learning (free), and the Deep Learning Book (Goodfellow et al., free) as reference. Fast.ai or MIT 6.S191 for pace. Train something that is not MNIST. Read one paper you reimplement.',
    unlocks:
      'Unlocks every specialized architecture node, interpretability, physics-informed ML, and foundation models. It is the central AI hub.',
  },
  {
    id: 'convnets-vision',
    title: 'Computer Vision & Convnets',
    domains: ['ai'],
    primary: 'ai',
    hours: 50,
    prerequisites: ['deep-learning'],
    summary:
      'Images as data: convolution, hierarchies of features, detection, and the limits of texture shortcuts.',
    ideas: [
      'Convolution is weight sharing under translation; that is the inductive bias.',
      'A receptive field is the same word as in V1, and the analogy is the most abused in the field.',
      'Classification, detection, segmentation, and correspondence are different tasks with different losses.',
      'Adversarial examples and texture bias are facts about the objective and the data, not jokes.',
      '3D, video, and multimodal vision reintroduce time and geometry that 2D classifcation dropped.',
    ],
    overview:
      'Convnets are the first architecture that forced the rest of science to pay attention to deep learning, and they remain the default for many spatial signals (including some neural data). You should understand convolution, pooling, residual vision backbones, and the standard tasks. You should also know the neuroscience history (Hubel & Wiesel → Fukushima → LeCun) without claiming that ResNet is V4.\n\nModern vision is no longer only convnets — transformers and multimodal models took a lot of the crown — but the dataset culture and the failure modes were discovered here.',
    study:
      'Stanford CS231n (notes + lectures, open). Implement a convnet and a Grad-CAM. Then read a paper on ImageNet shortcuts or adversarial examples so success does not look like understanding.',
    unlocks:
      'Unlocks multimodal models, robotics perception, and a concrete comparison with sensory systems.',
  },
  {
    id: 'sequence-models',
    title: 'Sequence Models',
    domains: ['ai'],
    primary: 'ai',
    hours: 40,
    prerequisites: ['deep-learning'],
    summary:
      'RNNs, LSTMs, GRUs, and the problem of memory in time before attention took over.',
    ideas: [
      'A recurrent net is a dynamical system with a readout; training it is a shooting problem.',
      'Vanishing and exploding gradients are the linearization of that dynamical system.',
      'Gating (LSTM/GRU) is a learned integrator with forgetful privileges.',
      'Teacher forcing is a training crutch that can hide exposure bias.',
      'Attention arrived because fixed-size hidden states were a bottleneck, not because recurrence is dead.',
    ],
    overview:
      'Sequence models are how you handle speech, language, neural time series, and control before (and sometimes after) transformers. The dynamical-systems view is the right one: an RNN is a learned ODE/map. That is why this node sits next to neural ODEs and recurrent attractors.\n\nImplement an RNN and an LSTM. Train on a toy copying or addition task. Feel the gradient problems. Then you will understand why attention and residual streams won, and what they still cannot do cheaply (unbounded state, true algorithms).',
    study:
      'The sequence chapters of d2l or Prince, plus Karpathy’s char-RNN writeup. Analyze a hidden-state trajectory. Apply an RNN or SSM to a neural time series as a reality check.',
    unlocks:
      'Unlocks transformers (as a sequel and a rival) and a dynamical reading of memory in nets and brains.',
  },
  {
    id: 'transformers',
    title: 'Transformers',
    domains: ['ai'],
    primary: 'ai',
    hours: 45,
    prerequisites: ['sequence-models', 'linear-algebra'],
    summary:
      'Attention as routing: self-attention, residual streams, and the architecture behind modern language and vision models.',
    ideas: [
      'Attention is a content-addressable, differentiable lookup table.',
      'The residual stream is a communication bus; layers read and write it.',
      'Positional information is extra structure because attention is permutation-equivariant by default.',
      'Scaling the context is a systems problem (memory of the attention matrix) as much as a modeling one.',
      'Induction heads and similar circuits are the first interpretability successes, not a complete theory.',
    ],
    overview:
      'Transformers are the dominant architecture of the mid-2020s: language, vision, multimodal, even some neural-data models. You should be able to write multi-head attention, implement a GPT-style decoder, and discuss context length, tokenization, and the compute graph. You should also know what the architecture does not give you for free (causality beyond the mask, world models, guarantees).\n\nRead the original paper. Then read a modern systems or interpretability paper so the stack is not only a blog diagram.',
    study:
      'The Illustrated Transformer, Karpathy’s nanoGPT / Zero to Hero GPT lecture, and the original Vaswani et al. paper (arXiv). Train a tiny character transformer. Then read a mechanistic-interpretability note on induction heads.',
    unlocks:
      'Unlocks NLP, foundation models, and a large fraction of current AI research. It is the architecture hub of the present.',
  },
  {
    id: 'self-supervised',
    title: 'Self-Supervised & Representation Learning',
    domains: ['ai', 'compneuro', 'bridge'],
    primary: 'ai',
    hours: 40,
    prerequisites: ['deep-learning', 'unsupervised'],
    summary:
      'Learning representations from the structure of the data itself: pretext tasks, contrastive losses, and masked prediction.',
    ideas: [
      'A pretext task is a question the data can grade without a human labeler.',
      'Contrastive learning pulls views of the same thing together and pushes others apart.',
      'Masked prediction is language modeling generalized to any masked structure.',
      'The representation is the product; the head you train on top is often disposable.',
      'Neuroscience keeps rediscovering that unsupervised objectives explain a lot of sensory cortex — with caveats.',
    ],
    overview:
      'Self-supervision is how foundation models eat the unlabeled world, and it is one of the liveliest NeuroAI links: predictive and contrastive objectives produce V1-like features without ImageNet labels. You should understand contrastive (SimCLR-style), non-contrastive (BYOL/VICReg-style), and masked-autoencoder families, and the idea of a view or an augmentation as a definition of “sameness.”\n\nThis node is also a philosophy of intelligence: prediction and compression as stand-ins for “understanding.” Keep the stand-in visible.',
    study:
      'A modern SSL survey and the Neuromatch NeuroAI representation days. Implement a tiny contrastive trainer. Compare a supervised and a self-supervised embedding on a downstream probe.',
    unlocks:
      'Unlocks foundation models and a major strand of predictive-coding / NeuroAI work.',
  },
  {
    id: 'generative-models',
    title: 'Generative Models',
    domains: ['ai'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['deep-learning', 'probability', 'stochastic-processes'],
    summary:
      'Learning the data distribution: VAEs, GANs, normalizing flows, and diffusion.',
    ideas: [
      'A generative model is a probability you can sample, and maybe evaluate.',
      'VAEs optimize a variational bound; the encoder is an inference network.',
      'GANs are a game; they sample without an explicit density.',
      'Flows are invertible maps that let you compute exact likelihoods.',
      'Diffusion models learn to reverse a noise process — an SDE or a Markov chain.',
    ],
    overview:
      'Generative models are how AI grew a model of the input, not only a labeler. They connect directly to statistical physics (energy-based models, score matching) and to stochastic processes (diffusions). A first pass should make the ELBO, the adversarial game, and the score-matching / denoising story concrete.\n\nYou do not need to train a frontier image model. You do need to train a VAE on a simple dataset and implement a tiny denoising diffusion on 2D points or MNIST.',
    study:
      'Prince’s generative chapters, the DDPM paper, and a VAE tutorial you re-derive. For the physics link, look at score matching and Langevin sampling. Bishop’s DL book has a clean treatment.',
    unlocks:
      'Unlocks energy-based models as a unified view, multimodal generation, and a sampling-based view of Bayesian inference at scale.',
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    domains: ['ai', 'compneuro', 'bridge'],
    primary: 'ai',
    hours: 60,
    prerequisites: ['intro-ml', 'probability'],
    summary:
      'Learning from reward: MDPs, dynamic programming, TD, and policy gradients.',
    ideas: [
      'An MDP is state, action, transition, reward, and a discount; the rest is commentary.',
      'Value functions are expected return; Bellman equations are their self-consistency.',
      'TD learning is bootstrap plus sample; it is how you learn without a model of the world.',
      'Exploration is not a footnote; it is the reason the problem is hard.',
      'The policy is the object you actually deploy; the value is often a means.',
    ],
    overview:
      'RL is the formalization of learning by doing, and it is the native language of both game-playing AI and a large part of systems neuroscience (dopamine, basal ganglia, foraging). A first course should stay tabular and small: gridworlds, Bellman backups, Q-learning, SARSA, REINFORCE. Deep RL is a sequel that adds function approximation pathologies.\n\nControl theory is the sibling that assumes more model and less sampling. Optimal control is the common ancestor. Do not skip the MDP math in a rush to agents that play games.',
    study:
      'Sutton & Barto (free PDF) cover to cover for the first half. David Silver’s course (videos) as a companion. Implement everything in a gridworld before you import a deep library.',
    unlocks:
      'Unlocks deep RL, RL in the brain, robotics, and alignment techniques that use preference or reward models.',
  },
  {
    id: 'deep-rl',
    title: 'Deep Reinforcement Learning',
    domains: ['ai'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['reinforcement-learning', 'deep-learning'],
    summary:
      'Function approximation meets sequential decisions: DQN, actor-critic, PPO, and the instability zoo.',
    ideas: [
      'Off-policy learning with a deep critic is a non-stationary, correlated, bootstrapped mess — and it sometimes works.',
      'Replay buffers and target networks are patches for that mess.',
      'Policy gradients with too much variance need baselines and trust regions.',
      'The environment is the other half of the algorithm; changing it changes the paper.',
      'Sample efficiency, generalization, and reward hacking are the adult metrics.',
    ],
    overview:
      'Deep RL is how RL left tabular worlds. It is also a field with a reproducibility problem and a habit of reporting the best seed. You should implement a DQN and an actor-critic, understand PPO as a conservative policy-gradient recipe, and know why exploration, partial observability, and sparse reward still hurt.\n\nModel-based RL, offline RL, and imitation learning are the practical extensions. Keep a link to motor control: the body is an environment with physics.',
    study:
      'OpenAI Spinning Up (free), Berkeley CS285 lectures, and CleanRL as executable papers. Reproduce a result on a simple Gymnasium task. Read at least one “Deep RL doesn’t work yet” style critique.',
    unlocks:
      'Unlocks robotics, some alignment methods, and a fair comparison with biological learning, which is more sample-efficient than your first PPO run.',
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    domains: ['ai'],
    primary: 'ai',
    hours: 50,
    prerequisites: ['transformers'],
    summary:
      'Language as a computational object: linguistics enough to be dangerous, and models from n-grams to LLMs.',
    ideas: [
      'Language is hierarchical, ambiguous, and grounded in a world the text only mentions.',
      'Tokenization is a modeling choice that leaks into everything.',
      'Perplexity is a compression score, not a thinking score.',
      'Evaluation is the hard part: BLEU, win rates, and vibes all fail in different ways.',
      'A chatbot is an alignment and interface layer on a next-token model.',
    ],
    overview:
      'NLP is the application domain that ate the rest of AI. You still need the old layers — text classification, sequence labeling, syntactic structure — because they are how you diagnose what a language model is failing at. Then you need the new stack: pretraining, instruction tuning, prompting as a brittle API, and retrieval.\n\nLinguistics is not optional if you want to talk about meaning. You do not need a full graduate syntax course; you do need constituency, dependency, and the fact that “similarity in embedding space” is not synonymy.',
    study:
      'Stanford CS224n and the Hugging Face NLP course (both open). Train or fine-tune a small model. Write an evaluation that is not “it seemed fluent.”',
    unlocks:
      'Unlocks foundation-model practice and a large fraction of applied AI work. Language is also a cognitive-neuroscience target.',
  },
  {
    id: 'gnns',
    title: 'Graph Neural Networks',
    domains: ['ai'],
    primary: 'ai',
    hours: 40,
    prerequisites: ['deep-learning', 'graph-theory'],
    summary:
      'Learning on graphs: message passing, invariants, and the limits of local aggregation.',
    ideas: [
      'Message passing is “each node updates from its neighbors”; depth is the receptive field.',
      'Permutation invariance is the symmetry; breaking it requires extra features or positional structure.',
      'Over-smoothing is what too much averaging does to node identities.',
      'Expressivity results (WL tests) tell you which graphs a GNN cannot tell apart.',
      'Molecules, connectomes, knowledge graphs, and scenes are different graphs with different inductive biases.',
    ],
    overview:
      'GNNs are deep learning for data whose natural domain is a graph. They are the obvious tool for molecules, citation nets, some scene graphs, and — carefully — connectomes. The theory is a mix of graph theory and equivariance. The practice is a fight with heterophily, over-smoothing, and leakage through the graph construction.\n\nImplement GCN and GAT. Know when a graph transformer or a kernel method is more honest. Do not run a GNN on a connectome and claim you have explained a computation.',
    study:
      'A geometric deep learning lecture on graphs (Bronstein et al. materials are largely open) plus a PyTorch Geometric tutorial. Predict a molecular property and a node label on a citation graph so you feel two regimes.',
    unlocks:
      'Unlocks geometric deep learning more broadly and graph-shaped NeuroAI experiments.',
  },
  {
    id: 'geometric-dl',
    title: 'Geometric Deep Learning',
    domains: ['ai', 'bridge'],
    primary: 'ai',
    hours: 45,
    prerequisites: ['gnns', 'differential-geometry', 'group-representation'],
    summary:
      'Equivariance, gauges, and learning on non-Euclidean domains: the geometry of inductive bias.',
    ideas: [
      'Deep learning is “build the symmetry into the architecture when you know it.”',
      'A group action on the input should intertwine with an action on the features.',
      'Manifolds, meshes, and graphs are the three non-grid homes of data.',
      'Steerable CNNs and spherical CNNs are representation theory as engineering.',
      'The same slogan covers physics-informed symmetries (energy, momentum) when they are exact.',
    ],
    overview:
      'Geometric deep learning is the attempt to say, in one voice, why convnets, GNNs, and transformers work: they respect, or approximately respect, the geometry of the domain. It is the AI counterpart of gauge theory and of “write equations in a coordinate-free way.” You need groups, a little manifold language, and the examples (images, molecules, meshes, climate grids).\n\nThis is a high-leverage overlap with physics and with robotics (SE(3)). It is also a source of papers that rename convolution. Demand a theorem or a benchmark.',
    study:
      'Bronstein, Bruna, Cohen, Veličković’s Geometric Deep Learning proto-book and lectures (open). Implement an equivariant layer for a small group (C4 or S_n on a toy task) and watch the sample-efficiency gain.',
    unlocks:
      'Unlocks a principled architecture research path and a shared language with physics. Optional for many applied ML jobs; central for “AI for science.”',
  },
  {
    id: 'causal-inference',
    title: 'Causal Inference',
    domains: ['ai', 'compneuro', 'bridge'],
    primary: 'ai',
    hours: 50,
    prerequisites: ['bayesian-inference', 'statistics'],
    summary:
      'Interventions, graphs, and the difference between prediction and “what if I had done otherwise.”',
    ideas: [
      'A causal model is a story about what stays put when you wiggle something.',
      'do(X) is not condition-on-X; that is the whole subject.',
      'Confounding, mediation, and colliding are three different graph motifs.',
      'Identification is whether the data plus assumptions pin down the causal effect; estimation is how you compute it.',
      'A randomized experiment is the gold standard because it cuts incoming arrows.',
    ],
    overview:
      'Causal inference is the missing chapter in a lot of ML and a lot of systems neuroscience. Prediction is easy to optimize and easy to fool. Policy, treatment, and “does this area cause that behavior” are causal questions. Pearl’s graphs and the potential-outcomes tradition are two dialects of the same problem.\n\nLearn interventions, backdoor and frontdoor, IVs at a conceptual level, and the limits of what observational data can do. In neuroscience, optogenetics is an intervention with its own confounds; the graph is still the right language.',
    study:
      'A first causal-inference course (Hernán / Robins free book, or Pearl’s primer, or a modern ML-and-causality lecture). Draw the graph before you run the regression. Reanalyze a toy neuroscience claim as an identification problem.',
    unlocks:
      'Unlocks a more adult experimental neuroscience and a skeptical reading of “the model learned the cause.” Alignment and policy ML need this more than they admit.',
  },
  {
    id: 'learning-theory',
    title: 'Computational Learning Theory',
    domains: ['ai', 'math'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['supervised', 'real-analysis', 'probability'],
    summary:
      'What can be learned, with how much data, and why overparameterized nets still generalize.',
    ideas: [
      'PAC learning is “probably approximately correct” with a sample-complexity bound.',
      'VC dimension and Rademacher complexity measure the capacity of a class.',
      'Uniform convergence is one way to get generalization; it is not the only way.',
      'The modern puzzle is benign overfitting: interpolation plus small test error.',
      'Computational complexity of learning is a different axis from statistical complexity.',
    ],
    overview:
      'Learning theory is the theorem side of ML. The classical theory (PAC, VC) explains linear models and decision trees and then fails, as a tight explanation, for deep nets. The new theory (implicit bias of SGD, NTK / mean-field limits, stability, compression) is in flux and overlaps statistical physics of learning.\n\nA first pass should make you able to read a generalization bound, know what a capacity measure is, and not claim that “VC dimension explains ResNet.” The computational side (what is efficiently learnable) is the CS sibling.',
    study:
      'Understanding Machine Learning (Shalev-Shwartz & Ben-David, free) for the classical core. Then a modern survey on overparameterization. Work the proofs of a Hoeffding-based bound so the later physics papers do not look like magic.',
    unlocks:
      'Unlocks a research-level reading of generalization papers and a dialogue with statistical physics of learning.',
  },
  {
    id: 'interpretability',
    title: 'Interpretability & Mechanistic Analysis',
    domains: ['ai', 'bridge'],
    primary: 'ai',
    hours: 40,
    prerequisites: ['deep-learning', 'statistics'],
    summary:
      'Opening models: probes, attributions, circuits, and the difference between a story and a mechanism.',
    ideas: [
      'A saliency map is a local linearization; it is not a causal explanation.',
      'A probe tells you that information is present, not that the model uses it.',
      'Mechanistic interpretability tries to find components that implement an algorithm.',
      'Faithfulness, completeness, and human-ness of an explanation are different scores.',
      'The same toolkit, pointed at a brain, is systems neuroscience; pointed at a net, is this node.',
    ],
    overview:
      'Interpretability is how you refuse to treat a trained system as an oracle. The field splits into post-hoc attributions, probing, concept methods, and mechanistic circuits work in transformers. It is methodologically close to neuroscience — lesion, record, decode — and should steal neuroscience’s caution about reverse inference.\n\nDo the cheap methods (integrated gradients, logit lens, linear probes) and at least one mechanistic exercise on a tiny transformer. Read critiques. This node is also the technical half of some alignment stories.',
    study:
      'Distill.pub, a modern mech-interp tutorial (many are open), and a skeptical review of saliency. Instrument a model you trained, not only a frontier API you cannot ablate.',
    unlocks:
      'Unlocks alignment engineering and a two-way traffic with neural data analysis. It is a capstone skill of scientific AI.',
  },
  {
    id: 'alignment',
    title: 'Alignment & AI Safety',
    domains: ['ai'],
    primary: 'ai',
    hours: 45,
    prerequisites: ['foundation-models', 'reinforcement-learning'],
    summary:
      'Making powerful models do what we intend: specifications, oversight, evaluations, and failure modes.',
    ideas: [
      'The hard part is the specification, not the optimizer — Goodhart, proxies, and missing context.',
      'RLHF and preference models are a particular, leaky interface to “what humans click.”',
      'Evaluation of dangerous capabilities is an empirical science with an adversarial opponent.',
      'Inner and outer alignment are different failure stories; both might be real, neither is a proof.',
      'Governance and technical work are complements; this node is the technical map.',
    ],
    overview:
      'Alignment is the problem of pointing a capable optimizer at a goal that remains ours as the system gets stronger. The current technical stack is prosaic: preference learning, constitutional-style methods, debate and oversight schemes, red-teaming, interpretability, and evaluations. The speculative stack is about agents that seek power. You should understand both without drowning in either.\n\nThis is not a substitute for ethics, law, or political philosophy. It is the ML-shaped piece. Causal inference and social-science measurement belong in the room whenever someone says “human values.”',
    study:
      'Primary sources from labs and academic surveys (many open), plus the RLHF papers. Write an evaluation for a behavior you actually care about. Stay with claims that name a mechanism or a measurement.',
    unlocks:
      'A research and practice path that sits on top of foundation models. Optional for physics; increasingly non-optional for professional AI.',
  },
  {
    id: 'foundation-models',
    title: 'Foundation Models',
    domains: ['ai'],
    primary: 'ai',
    hours: 50,
    prerequisites: ['transformers', 'self-supervised', 'information-theory'],
    summary:
      'Large pretrained models as infrastructure: scaling, adaptation, tools, and the new scientific questions.',
    ideas: [
      'Pretrain once on a broad measure, adapt many times — that is the industrial pattern.',
      'Scaling laws are interpolations with a domain of validity, not laws of nature.',
      'Context, tools, and retrieval are how you add a world the weights do not contain.',
      'Multimodality is one training distribution over several sensorimotor channels.',
      'A foundation model is a compressed corpus plus an interface; both halves have politics.',
    ],
    overview:
      'Foundation models are pretrained transformers (and successors) large enough that adaptation is cheaper than training. The subject is part systems (data, compute, serving), part science (what is learned, what transfers), and part product (APIs, agents). Information theory is the right background for “compression is intelligence” claims: make them quantitative or drop them.\n\nYou should understand pretraining objectives, instruction tuning, in-context learning as a phenomenon, and the evaluation crisis. Training a frontier model is not required; training a small one and using a large one carefully is.',
    study:
      'Survey papers (Bommasani et al. and successors), Hugging Face and academic open-model docs, and a systems lecture on training. Fine-tune a small open model. Design a benchmark that would embarrass it.',
    unlocks:
      'Unlocks alignment, applied multimodal work, and the NeuroAI question “is this a brain theory or a product?”',
  },
  {
    id: 'robotics-embodied',
    title: 'Robotics & Embodied AI',
    domains: ['ai', 'bridge'],
    primary: 'ai',
    hours: 55,
    prerequisites: ['control-theory', 'deep-rl', 'convnets-vision'],
    summary:
      'Agents with bodies: perception, planning, control, and the gap between simulation and hardware.',
    ideas: [
      'The body is a constraint and a computation; morphology is part of the algorithm.',
      'Percieve–plan–act is a lie that is still a useful OS; learned policies blur the boxes.',
      'Sim-to-real is a domain-shift problem with contact physics as the villain.',
      'State estimation is the Bayesian filter you cannot skip because the sensors lie.',
      'Embodiment is not a slogan: it is latency, energy, and irreversible actions.',
    ],
    overview:
      'Robotics is where AI meets physics and motor neuroscience. Classical robotics (kinematics, planning, estimation) is still the reliability layer. Learning-based robotics is how you handle contact and perception that you cannot write down. The synthesis is the research.\n\nTedrake’s Underactuated Robotics (free) is the intellectual spine. Pair it with a vision stack and a policy-learning stack. If you have no hardware, treat simulators as laboratories with known lies.',
    study:
      'Underactuated Robotics plus a modern embodied-AI or robot-learning course (many lecture videos are open). Implement a controller on a simple underactuated system, then a learned policy, and compare where each breaks.',
    unlocks:
      'Unlocks a complete agent story and a comparison with motor systems and active inference. It is the AI–physics–neuro triangle in hardware.',
  },
]
