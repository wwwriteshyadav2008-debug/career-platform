const fs = require('fs');

const roadmapTemplates = {
  'Frontend Developer': {
    Beginner: [
      { title: "Internet Fundamentals & HTML", description: "Understand how the web works, DNS, hosting, and master semantic HTML5.", milestones: ["Build a structured HTML-only personal page", "Understand accessibility (a11y) basics", "Learn SEO best practices for HTML"] },
      { title: "CSS Basics & Styling", description: "Learn CSS selectors, box model, Flexbox, and Grid for responsive layouts.", milestones: ["Create a responsive landing page", "Implement a CSS Grid photo gallery", "Learn CSS variables and custom properties"] },
      { title: "JavaScript Fundamentals", description: "Master variables, data types, functions, loops, and DOM manipulation.", milestones: ["Build an interactive to-do list", "Create a simple calculator app", "Understand event bubbling and delegation"] },
      { title: "Advanced JavaScript (ES6+)", description: "Learn arrow functions, destructuring, promises, async/await, and modules.", milestones: ["Fetch and display data from a public API", "Refactor old code to use ES6+ features", "Understand closures and scope"] },
      { title: "Version Control (Git & GitHub)", description: "Learn to track changes, branch, merge, and collaborate using Git.", milestones: ["Push your projects to GitHub", "Collaborate on a repository using Pull Requests", "Resolve a merge conflict"] },
      { title: "Package Managers & Build Tools", description: "Understand npm/yarn, Vite, and Webpack basics.", milestones: ["Set up a project using Vite", "Install and use a third-party library (e.g., date-fns)", "Understand package.json and scripts"] },
      { title: "React Basics", description: "Learn components, JSX, props, state, and component lifecycle.", milestones: ["Build a simple React counter app", "Create a reusable button component", "Understand unidirectional data flow"] },
      { title: "React Hooks & State Management", description: "Master useState, useEffect, useContext, and custom hooks.", milestones: ["Build a weather app using useEffect and fetch", "Manage global theme state with Context API", "Create a custom useFetch hook"] }
    ],
    Intermediate: [
      { title: "Advanced React Patterns", description: "Learn Higher-Order Components, Render Props, and Compound Components.", milestones: ["Implement a compound Tabs component", "Use React.memo and useMemo for performance", "Understand Error Boundaries"] },
      { title: "State Management Libraries", description: "Learn Redux Toolkit, Zustand, or Recoil for complex state.", milestones: ["Build an e-commerce cart with Redux Toolkit", "Implement persistent state with Zustand", "Understand actions, reducers, and selectors"] },
      { title: "CSS Frameworks & Tailwind", description: "Master utility-first CSS with Tailwind CSS or component libraries like Material-UI.", milestones: ["Rebuild a dashboard UI using Tailwind CSS", "Customize Tailwind configuration", "Implement dark mode using utility classes"] },
      { title: "Routing & SPAs", description: "Learn client-side routing with React Router.", milestones: ["Build a multi-page blog application", "Implement protected routes for authentication", "Use nested routing and URL parameters"] },
      { title: "API Integration & Data Fetching", description: "Master React Query (TanStack Query) or SWR for server state.", milestones: ["Implement infinite scrolling with React Query", "Handle loading and error states gracefully", "Perform optimistic UI updates"] },
      { title: "Testing (Unit & Component)", description: "Learn Jest and React Testing Library.", milestones: ["Write unit tests for utility functions", "Test a complex interactive component", "Achieve 80% test coverage on a small app"] },
      { title: "TypeScript Fundamentals", description: "Add static typing to your JavaScript/React code.", milestones: ["Convert a JS React project to TypeScript", "Define interfaces for API responses", "Use generics in utility functions"] },
      { title: "Performance Optimization", description: "Learn code splitting, lazy loading, and optimizing bundle size.", milestones: ["Implement React.lazy and Suspense", "Analyze bundle size with source-map-explorer", "Optimize image loading and formats"] }
    ],
    Advanced: [
      { title: "Next.js & SSR/SSG", description: "Master Server-Side Rendering and Static Site Generation with Next.js.", milestones: ["Build a blog with SSG and Markdown", "Implement SSR for dynamic SEO-friendly pages", "Use Next.js API routes"] },
      { title: "Advanced TypeScript", description: "Learn advanced types, mapped types, conditional types, and utility types.", milestones: ["Create complex generic components", "Type a custom state management solution", "Use strict mode effectively"] },
      { title: "Web Performance & Core Web Vitals", description: "Deep dive into LCP, FID, CLS, and advanced optimization techniques.", milestones: ["Achieve 90+ Lighthouse score on a complex app", "Implement service workers for caching", "Optimize critical rendering path"] },
      { title: "Micro-Frontends", description: "Understand Module Federation and splitting apps into smaller, independent pieces.", milestones: ["Set up a host and remote app with Webpack Module Federation", "Share state across micro-frontends", "Deploy independent frontend modules"] },
      { title: "E2E Testing & CI/CD", description: "Learn Cypress or Playwright, and set up automated pipelines.", milestones: ["Write E2E tests for critical user flows", "Set up GitHub Actions for automated testing", "Automate deployments to Vercel/Netlify"] },
      { title: "Web Accessibility (a11y) Mastery", description: "Ensure applications are usable by everyone, following WCAG guidelines.", milestones: ["Audit and fix a complex web app for a11y", "Implement keyboard navigation for custom widgets", "Use ARIA attributes correctly"] },
      { title: "Web Security Basics", description: "Understand XSS, CSRF, CORS, and secure authentication flows.", milestones: ["Implement secure JWT storage", "Sanitize user input to prevent XSS", "Configure Content Security Policy (CSP)"] },
      { title: "Architecture & System Design", description: "Design scalable frontend architectures and component libraries.", milestones: ["Design a scalable folder structure for a large app", "Create a monorepo using Turborepo or Nx", "Publish a custom UI component library to npm"] }
    ]
  },
  'Backend Developer': {
    Beginner: [
      { title: "Internet & OS Fundamentals", description: "Understand HTTP/HTTPS, TCP/IP, DNS, and basic Linux commands.", milestones: ["Set up a Linux VM or WSL", "Navigate the file system using CLI", "Understand HTTP methods and status codes"] },
      { title: "Programming Language (Node.js/Python)", description: "Master the syntax, data structures, and standard library of your chosen language.", milestones: ["Build a CLI tool", "Read and write files asynchronously", "Understand event loops or threading"] },
      { title: "Version Control (Git)", description: "Learn branching, merging, and collaboration.", milestones: ["Create a GitHub repository", "Use feature branches", "Resolve merge conflicts"] },
      { title: "Relational Databases (SQL)", description: "Learn PostgreSQL or MySQL, table design, and basic queries.", milestones: ["Design a schema for a blog", "Write CRUD SQL queries", "Understand primary and foreign keys"] },
      { title: "Building RESTful APIs", description: "Create APIs using Express.js or FastAPI/Flask.", milestones: ["Build a simple REST API for a to-do list", "Implement routing and controllers", "Handle JSON requests and responses"] },
      { title: "Authentication Basics", description: "Learn session-based auth and JWT.", milestones: ["Implement user registration and login", "Secure routes with middleware", "Hash passwords using bcrypt"] },
      { title: "NoSQL Databases", description: "Understand document databases like MongoDB.", milestones: ["Set up a MongoDB cluster", "Perform CRUD operations using Mongoose/PyMongo", "Understand when to use NoSQL vs SQL"] },
      { title: "Deployment Basics", description: "Learn to deploy applications to platforms like Heroku or Render.", milestones: ["Deploy a Node.js/Python app", "Provision a managed database", "Configure environment variables in production"] }
    ],
    Intermediate: [
      { title: "Advanced SQL & ORMs", description: "Master joins, indexes, transactions, and use ORMs like Prisma or Sequelize.", milestones: ["Write complex JOIN queries", "Implement database transactions", "Optimize slow queries using EXPLAIN"] },
      { title: "API Design & GraphQL", description: "Learn advanced REST patterns and GraphQL.", milestones: ["Build a GraphQL API with Apollo Server", "Implement pagination and filtering", "Understand N+1 query problems and DataLoader"] },
      { title: "Caching & Redis", description: "Improve performance using in-memory data stores.", milestones: ["Implement response caching with Redis", "Use Redis for session storage", "Build a simple rate limiter"] },
      { title: "Message Brokers & Async Processing", description: "Learn RabbitMQ or Kafka for background jobs.", milestones: ["Implement a background email sender", "Understand pub/sub patterns", "Handle failed jobs and retries"] },
      { title: "Docker & Containerization", description: "Package applications and dependencies into containers.", milestones: ["Write a Dockerfile for your app", "Use Docker Compose for local development (App + DB)", "Optimize Docker image size"] },
      { title: "Testing (Unit & Integration)", description: "Write robust tests using Jest, Mocha, or PyTest.", milestones: ["Write unit tests for business logic", "Implement integration tests with a test database", "Set up test coverage reporting"] },
      { title: "Web Security", description: "Protect against OWASP Top 10 vulnerabilities.", milestones: ["Implement rate limiting and CORS", "Prevent SQL injection and XSS", "Secure sensitive data at rest and in transit"] },
      { title: "CI/CD Pipelines", description: "Automate testing and deployment.", milestones: ["Set up GitHub Actions for testing", "Automate Docker image builds", "Deploy automatically on merge to main"] }
    ],
    Advanced: [
      { title: "Microservices Architecture", description: "Design and build distributed systems.", milestones: ["Split a monolith into microservices", "Implement API Gateways", "Handle inter-service communication (gRPC/REST)"] },
      { title: "Advanced Database Concepts", description: "Learn sharding, replication, and high availability.", milestones: ["Set up database read replicas", "Understand CAP theorem", "Implement database migration strategies without downtime"] },
      { title: "Kubernetes & Orchestration", description: "Deploy and manage containers at scale.", milestones: ["Deploy an app to a Kubernetes cluster", "Configure pods, services, and deployments", "Implement auto-scaling"] },
      { title: "System Design & Scalability", description: "Design systems that handle millions of users.", milestones: ["Design a system like Twitter or Uber", "Understand load balancing strategies", "Identify and resolve system bottlenecks"] },
      { title: "Observability & Monitoring", description: "Implement logging, metrics, and tracing.", milestones: ["Set up Prometheus and Grafana", "Implement distributed tracing with Jaeger/OpenTelemetry", "Configure alerting for system failures"] },
      { title: "Cloud Providers (AWS/GCP)", description: "Master cloud-native services.", milestones: ["Deploy using AWS ECS or EKS", "Use managed services like SQS, S3, RDS", "Implement Infrastructure as Code (Terraform)"] },
      { title: "Advanced Security & OAuth", description: "Implement complex auth flows and secure architectures.", milestones: ["Implement an OAuth2 provider", "Set up mutual TLS (mTLS)", "Conduct a security audit of an architecture"] },
      { title: "Performance Tuning", description: "Optimize application and system performance.", milestones: ["Profile Node.js/Python applications for memory leaks", "Tune garbage collection", "Optimize OS-level network settings"] }
    ]
  },
  'Full Stack Developer': {
    Beginner: [
      { title: "HTML, CSS & JS Basics", description: "Master the building blocks of the web.", milestones: ["Build a responsive portfolio", "Learn DOM manipulation", "Understand Flexbox and Grid"] },
      { title: "Frontend Framework (React)", description: "Learn to build interactive UIs.", milestones: ["Build a single-page application", "Manage state with hooks", "Fetch data from APIs"] },
      { title: "Backend Language (Node.js)", description: "Learn server-side JavaScript.", milestones: ["Build a simple HTTP server", "Understand the event loop", "Use npm packages"] },
      { title: "RESTful APIs with Express", description: "Create endpoints for your frontend.", milestones: ["Build CRUD endpoints", "Implement middleware", "Handle errors gracefully"] },
      { title: "Database Basics (SQL/NoSQL)", description: "Store and retrieve data.", milestones: ["Set up PostgreSQL or MongoDB", "Connect backend to database", "Perform basic queries"] },
      { title: "Version Control (Git)", description: "Manage your codebase.", milestones: ["Use Git for version tracking", "Collaborate on GitHub", "Understand branching"] },
      { title: "Basic Authentication", description: "Secure your application.", milestones: ["Implement JWT login", "Hash passwords", "Protect frontend routes"] },
      { title: "Full Stack Deployment", description: "Put your app on the internet.", milestones: ["Deploy frontend to Vercel", "Deploy backend to Render", "Configure CORS and environment variables"] }
    ],
    Intermediate: [
      { title: "Advanced Frontend State", description: "Manage complex application state.", milestones: ["Implement Redux or Zustand", "Use React Query for server state", "Optimize re-renders"] },
      { title: "Advanced Backend Patterns", description: "Build robust APIs.", milestones: ["Implement pagination and filtering", "Use an ORM like Prisma", "Add input validation (Zod/Joi)"] },
      { title: "TypeScript Integration", description: "Add type safety across the stack.", milestones: ["Share types between frontend and backend", "Convert a JS project to TS", "Use strict typing"] },
      { title: "Docker Containerization", description: "Standardize your environments.", milestones: ["Dockerize frontend and backend", "Use Docker Compose for local dev", "Manage database containers"] },
      { title: "Testing Strategies", description: "Ensure application reliability.", milestones: ["Write unit tests with Jest", "Test React components", "Write API integration tests"] },
      { title: "WebSockets & Real-time", description: "Build interactive features.", milestones: ["Implement a live chat using Socket.io", "Add real-time notifications", "Handle connection drops"] },
      { title: "Caching Strategies", description: "Improve application speed.", milestones: ["Implement Redis caching", "Cache API responses", "Understand cache invalidation"] },
      { title: "CI/CD Pipelines", description: "Automate your workflow.", milestones: ["Set up GitHub Actions", "Automate testing on PRs", "Automate deployments"] }
    ],
    Advanced: [
      { title: "System Architecture", description: "Design scalable full-stack applications.", milestones: ["Design a microservices architecture", "Implement API Gateways", "Understand event-driven design"] },
      { title: "Server-Side Rendering (Next.js)", description: "Optimize for SEO and performance.", milestones: ["Migrate React app to Next.js", "Implement SSR and SSG", "Use Next.js API routes"] },
      { title: "Cloud Infrastructure (AWS)", description: "Deploy scalable infrastructure.", milestones: ["Host static assets on S3/CloudFront", "Deploy containers to ECS", "Use managed databases (RDS)"] },
      { title: "Advanced Security", description: "Protect against sophisticated attacks.", milestones: ["Implement OAuth2/OIDC", "Set up CSRF protection", "Configure strict CSP headers"] },
      { title: "Performance Optimization", description: "Make apps lightning fast.", milestones: ["Optimize database queries with indexes", "Implement frontend code splitting", "Analyze and improve Core Web Vitals"] },
      { title: "Infrastructure as Code", description: "Manage infrastructure programmatically.", milestones: ["Write Terraform scripts", "Provision environments automatically", "Manage secrets securely"] },
      { title: "Monitoring & Observability", description: "Keep track of system health.", milestones: ["Set up Datadog or New Relic", "Implement centralized logging", "Create custom dashboards and alerts"] },
      { title: "GraphQL Mastery", description: "Build flexible APIs.", milestones: ["Design a complex GraphQL schema", "Implement subscriptions", "Optimize resolvers and use DataLoader"] }
    ]
  },
  'Data Scientist': {
    Beginner: [
      { title: "Python Programming", description: "Master Python basics for data manipulation.", milestones: ["Learn lists, dictionaries, and functions", "Understand list comprehensions", "Write scripts to automate tasks"] },
      { title: "Math & Statistics Basics", description: "Learn probability, descriptive stats, and linear algebra.", milestones: ["Calculate mean, median, variance", "Understand probability distributions", "Learn basic matrix operations"] },
      { title: "Data Manipulation (Pandas/NumPy)", description: "Clean and transform datasets.", milestones: ["Load CSV/Excel files with Pandas", "Handle missing data", "Perform group-by and merge operations"] },
      { title: "Data Visualization", description: "Create insightful charts.", milestones: ["Build plots with Matplotlib", "Create interactive charts with Seaborn/Plotly", "Design a basic dashboard"] },
      { title: "SQL for Data Analysis", description: "Extract data from relational databases.", milestones: ["Write complex SELECT queries", "Use window functions", "Perform data aggregations"] },
      { title: "Exploratory Data Analysis (EDA)", description: "Discover patterns in data.", milestones: ["Perform EDA on a public dataset", "Identify outliers", "Analyze feature correlations"] },
      { title: "Intro to Machine Learning", description: "Understand supervised vs unsupervised learning.", milestones: ["Train a Linear Regression model", "Implement K-Means clustering", "Evaluate model accuracy"] },
      { title: "Jupyter & Git", description: "Manage notebooks and version control.", milestones: ["Organize code in Jupyter Notebooks", "Track changes with Git", "Share projects on GitHub"] }
    ],
    Intermediate: [
      { title: "Advanced Machine Learning", description: "Master tree-based models and ensembles.", milestones: ["Train Random Forests and XGBoost", "Perform hyperparameter tuning", "Handle imbalanced datasets"] },
      { title: "Feature Engineering", description: "Create predictive features from raw data.", milestones: ["Encode categorical variables", "Scale and normalize features", "Perform dimensionality reduction (PCA)"] },
      { title: "Model Evaluation & Validation", description: "Ensure models generalize well.", milestones: ["Implement k-fold cross-validation", "Understand ROC/AUC and F1-score", "Analyze precision-recall tradeoffs"] },
      { title: "Time Series Analysis", description: "Forecast future values.", milestones: ["Handle datetime data in Pandas", "Train ARIMA models", "Use Prophet for forecasting"] },
      { title: "Natural Language Processing (NLP)", description: "Analyze text data.", milestones: ["Perform text tokenization and stemming", "Implement TF-IDF", "Train a sentiment analysis model"] },
      { title: "Big Data Tools (Spark)", description: "Process massive datasets.", milestones: ["Write PySpark scripts", "Perform distributed data transformations", "Run queries on a Spark cluster"] },
      { title: "A/B Testing", description: "Design and analyze experiments.", milestones: ["Calculate sample sizes", "Perform hypothesis testing (t-tests)", "Interpret p-values and confidence intervals"] },
      { title: "Model Deployment Basics", description: "Serve models as APIs.", milestones: ["Wrap a model in a Flask/FastAPI app", "Dockerize the API", "Deploy to a cloud platform"] }
    ],
    Advanced: [
      { title: "Deep Learning (PyTorch/TensorFlow)", description: "Build neural networks.", milestones: ["Train a Multi-Layer Perceptron", "Implement custom loss functions", "Optimize training with GPUs"] },
      { title: "Computer Vision", description: "Analyze image data.", milestones: ["Train CNNs for image classification", "Implement object detection (YOLO)", "Use transfer learning (ResNet)"] },
      { title: "Advanced NLP & LLMs", description: "Work with Transformers and Large Language Models.", milestones: ["Fine-tune a BERT model", "Implement RAG (Retrieval-Augmented Generation)", "Use Hugging Face libraries"] },
      { title: "MLOps & Pipelines", description: "Automate the ML lifecycle.", milestones: ["Build pipelines with MLflow or Kubeflow", "Implement model registry", "Automate model retraining"] },
      { title: "Cloud AI Services", description: "Leverage AWS SageMaker or GCP Vertex AI.", milestones: ["Train models on SageMaker", "Deploy endpoints", "Use managed feature stores"] },
      { title: "Recommendation Systems", description: "Build personalization engines.", milestones: ["Implement collaborative filtering", "Build content-based recommenders", "Evaluate using NDCG"] },
      { title: "Data Engineering Concepts", description: "Understand data pipelines and warehouses.", milestones: ["Design a star schema", "Build an ETL pipeline with Airflow", "Query data in Snowflake/BigQuery"] },
      { title: "AI Ethics & Explainability", description: "Build responsible AI.", milestones: ["Use SHAP/LIME for model interpretability", "Audit models for bias", "Implement privacy-preserving techniques"] }
    ]
  },
  'AI/ML Engineer': {
    Beginner: [
      { title: "Python & Math Foundations", description: "Master Python, Linear Algebra, and Calculus basics.", milestones: ["Implement matrix multiplication from scratch", "Understand derivatives and gradients", "Master NumPy and Pandas"] },
      { title: "Machine Learning Basics", description: "Learn core algorithms with Scikit-Learn.", milestones: ["Train Regression and Classification models", "Understand bias-variance tradeoff", "Implement cross-validation"] },
      { title: "Data Preprocessing", description: "Clean and prepare data for models.", milestones: ["Handle missing values and outliers", "Perform feature scaling", "Encode categorical data"] },
      { title: "Intro to Neural Networks", description: "Understand perceptrons and backpropagation.", milestones: ["Build a simple neural net from scratch", "Understand activation functions", "Learn gradient descent"] },
      { title: "Deep Learning Frameworks", description: "Learn PyTorch or TensorFlow.", milestones: ["Build a feedforward network in PyTorch", "Train a model on MNIST", "Save and load model weights"] },
      { title: "Computer Vision Basics", description: "Learn CNNs and image processing.", milestones: ["Implement a CNN for image classification", "Use OpenCV for image augmentation", "Understand pooling and convolutions"] },
      { title: "NLP Basics", description: "Learn text processing and embeddings.", milestones: ["Implement Word2Vec or GloVe", "Build a text classifier", "Perform tokenization and lemmatization"] },
      { title: "Git & Software Engineering", description: "Write clean, version-controlled code.", milestones: ["Organize ML projects using OOP", "Track experiments with Git", "Write unit tests for data pipelines"] }
    ],
    Intermediate: [
      { title: "Advanced Deep Learning", description: "Master complex architectures.", milestones: ["Implement ResNet or Inception", "Understand sequence models (RNNs/LSTMs)", "Implement attention mechanisms"] },
      { title: "Transformers & LLMs", description: "Work with state-of-the-art NLP models.", milestones: ["Fine-tune a Hugging Face Transformer", "Implement a basic GPT architecture", "Understand self-attention"] },
      { title: "Generative AI", description: "Learn GANs, VAEs, and Diffusion models.", milestones: ["Train a DCGAN to generate images", "Implement a Variational Autoencoder", "Understand diffusion processes"] },
      { title: "Model Optimization", description: "Make models faster and smaller.", milestones: ["Perform model quantization", "Implement model pruning", "Use ONNX for inference"] },
      { title: "MLOps Fundamentals", description: "Manage the ML lifecycle.", milestones: ["Track experiments with Weights & Biases", "Version data with DVC", "Package models with Docker"] },
      { title: "Cloud ML Platforms", description: "Train and deploy on the cloud.", milestones: ["Use AWS SageMaker or GCP Vertex AI", "Set up distributed training", "Deploy a model as a REST API"] },
      { title: "Reinforcement Learning", description: "Learn agents, environments, and rewards.", milestones: ["Implement Q-Learning", "Train an agent using OpenAI Gym", "Understand Deep Q-Networks (DQN)"] },
      { title: "API Development", description: "Serve models to applications.", milestones: ["Build a FastAPI app for inference", "Handle concurrent requests", "Implement batch prediction endpoints"] }
    ],
    Advanced: [
      { title: "Large Language Models (LLMs) Deep Dive", description: "Master RAG, fine-tuning, and prompt engineering.", milestones: ["Build a complex RAG system with LangChain", "Perform PEFT/LoRA fine-tuning", "Deploy an open-source LLM locally"] },
      { title: "Advanced MLOps & CI/CD", description: "Automate end-to-end ML pipelines.", milestones: ["Build automated retraining pipelines with Kubeflow", "Implement shadow deployments", "Monitor model drift in production"] },
      { title: "High-Performance Computing", description: "Optimize training at scale.", milestones: ["Implement data and tensor parallelism", "Use CUDA/Triton for custom kernels", "Optimize GPU memory usage"] },
      { title: "Edge AI & Mobile", description: "Deploy models to edge devices.", milestones: ["Convert models to TensorFlow Lite/CoreML", "Optimize for mobile latency", "Implement federated learning basics"] },
      { title: "Advanced Computer Vision", description: "Solve complex vision tasks.", milestones: ["Implement image segmentation (U-Net)", "Build real-time object tracking", "Work with 3D point clouds"] },
      { title: "Audio & Speech Processing", description: "Work with audio data.", milestones: ["Implement Speech-to-Text (Whisper)", "Build a Text-to-Speech system", "Process spectrograms with CNNs"] },
      { title: "AI System Architecture", description: "Design scalable AI products.", milestones: ["Design a low-latency recommendation engine", "Architect a scalable vector database solution", "Handle streaming data for real-time inference"] },
      { title: "AI Safety & Alignment", description: "Ensure models are safe and robust.", milestones: ["Implement red-teaming for LLMs", "Defend against adversarial attacks", "Ensure output guardrails and moderation"] }
    ]
  },
  'Cloud Engineer': {
    Beginner: [
      { title: "Networking Fundamentals", description: "Understand IP, DNS, TCP/UDP, and firewalls.", milestones: ["Set up a VPC with public/private subnets", "Configure security groups/firewalls", "Understand CIDR notation"] },
      { title: "Linux & OS Basics", description: "Master the Linux command line.", milestones: ["Manage users and permissions", "Write basic bash scripts", "Monitor system resources (top, htop)"] },
      { title: "Cloud Provider Basics (AWS/GCP/Azure)", description: "Learn core compute, storage, and IAM.", milestones: ["Provision an EC2/Compute Engine instance", "Set up S3/Cloud Storage buckets", "Configure IAM roles and policies"] },
      { title: "Virtualization & Containers", description: "Understand Docker and containerization.", milestones: ["Write a Dockerfile", "Run multi-container apps with Docker Compose", "Understand container networking"] },
      { title: "Version Control (Git)", description: "Manage infrastructure code.", milestones: ["Use Git for configuration management", "Implement branching strategies", "Collaborate via Pull Requests"] },
      { title: "Scripting (Python/Bash)", description: "Automate cloud tasks.", milestones: ["Write a script to backup files to cloud storage", "Automate instance creation via CLI", "Parse JSON responses from cloud APIs"] },
      { title: "Databases in the Cloud", description: "Manage managed databases.", milestones: ["Provision an RDS/Cloud SQL instance", "Perform automated backups", "Connect an app to the database securely"] },
      { title: "Basic Monitoring", description: "Keep track of cloud resources.", milestones: ["Set up CloudWatch/Cloud Monitoring billing alerts", "Monitor CPU usage", "View application logs"] }
    ],
    Intermediate: [
      { title: "Infrastructure as Code (Terraform)", description: "Provision infrastructure programmatically.", milestones: ["Write Terraform modules", "Manage Terraform state remotely", "Provision a complete VPC and EC2 setup"] },
      { title: "CI/CD Pipelines", description: "Automate deployments.", milestones: ["Set up Jenkins or GitHub Actions", "Create a pipeline to build and push Docker images", "Automate Terraform apply on merge"] },
      { title: "Container Orchestration (Kubernetes)", description: "Manage containers at scale.", milestones: ["Set up a managed K8s cluster (EKS/GKE)", "Deploy applications using Deployments and Services", "Configure Ingress controllers"] },
      { title: "Advanced Networking", description: "Connect complex environments.", milestones: ["Set up VPNs or Direct Connect", "Configure Load Balancers (ALB/NLB)", "Implement Route53/Cloud DNS routing policies"] },
      { title: "Serverless Computing", description: "Build without managing servers.", milestones: ["Deploy AWS Lambda / Cloud Functions", "Set up API Gateway", "Trigger functions via cloud events (e.g., S3 upload)"] },
      { title: "Configuration Management", description: "Use Ansible, Chef, or Puppet.", milestones: ["Write Ansible playbooks to configure servers", "Manage secrets with Ansible Vault", "Automate software installations"] },
      { title: "Cloud Security", description: "Secure cloud environments.", milestones: ["Implement KMS for encryption", "Set up WAF (Web Application Firewall)", "Audit IAM permissions for least privilege"] },
      { title: "Advanced Monitoring & Logging", description: "Implement centralized observability.", milestones: ["Set up ELK stack or Datadog", "Create custom metrics and dashboards", "Implement distributed tracing"] }
    ],
    Advanced: [
      { title: "Multi-Cloud & Hybrid Cloud", description: "Design architectures across multiple providers.", milestones: ["Set up VPN tunnels between AWS and GCP", "Use Terraform to provision multi-cloud resources", "Design disaster recovery across regions"] },
      { title: "Advanced Kubernetes", description: "Master complex K8s operations.", milestones: ["Implement Service Meshes (Istio)", "Set up GitOps with ArgoCD or Flux", "Write custom Kubernetes Operators"] },
      { title: "Site Reliability Engineering (SRE)", description: "Apply software engineering to operations.", milestones: ["Define and measure SLIs, SLOs, and SLAs", "Implement error budgets", "Conduct blameless post-mortems"] },
      { title: "Cost Optimization (FinOps)", description: "Manage and reduce cloud spend.", milestones: ["Implement auto-scaling based on custom metrics", "Use Spot Instances effectively", "Analyze Cost Explorer reports and set budgets"] },
      { title: "Advanced Security & Compliance", description: "Meet enterprise security standards.", milestones: ["Implement Zero Trust architecture", "Automate compliance checks (e.g., SOC2, HIPAA)", "Set up automated threat detection (GuardDuty)"] },
      { title: "Infrastructure Architecture", description: "Design highly available systems.", milestones: ["Design an active-active multi-region architecture", "Implement chaos engineering", "Architect event-driven systems at scale"] },
      { title: "Database Migration & Scaling", description: "Manage data at scale.", milestones: ["Perform zero-downtime database migrations", "Implement database sharding", "Use caching layers (ElastiCache) effectively"] },
      { title: "Custom Cloud Automation", description: "Build internal developer platforms.", milestones: ["Create a self-service infrastructure portal", "Write custom Terraform providers", "Automate complex incident responses"] }
    ]
  }
};

const existingDataPath = './data/careerData.ts';
let existingContent = fs.readFileSync(existingDataPath, 'utf8');

const jsonString = existingContent.replace('export const careerData = ', '').replace(/;$/, '');
const existingData = JSON.parse(jsonString);

for (const role in roadmapTemplates) {
  if (existingData[role]) {
    existingData[role].roadmap = roadmapTemplates[role];
  }
}

const newContent = 'export const careerData = ' + JSON.stringify(existingData, null, 2) + ';\n';
fs.writeFileSync(existingDataPath, newContent);
console.log('Roadmap updated successfully!');
