import React, { useState, useEffect } from 'react';
import { Flag, Rocket, Calendar, ArrowRight, Code, Wrench, FolderGit2 } from 'lucide-react';
import { LottieDisplay } from '../components/LottieDisplay';
import { motion, AnimatePresence } from 'motion/react';

const roadmapData: Record<string, Record<string, any[]>> = {
  "Frontend Developer": {
    "Beginner": [
      {
        title: "HTML Semantic Structure & Accessibility",
        description: "Master HTML5 document structure, semantic elements, forms, and web accessibility standards. Understand how browsers parse markup and screen readers interpret content.",
        skills: ["HTML5", "Accessibility (A11y)", "SEO Basics"],
        tools: ["VS Code", "W3C Validator"],
        project: "Build a semantic, accessible personal portfolio landing page"
      },
      {
        title: "CSS Layout Systems",
        description: "Implement responsive designs using Flexbox and CSS Grid architectures. Learn the box model, media queries, and mobile-first design principles.",
        skills: ["CSS3", "Flexbox", "CSS Grid", "Responsive Design"],
        tools: ["Chrome DevTools", "CodePen"],
        project: "Create a responsive multi-section dashboard layout"
      },
      {
        title: "JavaScript Fundamentals",
        description: "Understand lexical scope, closures, hoisting, and ES6+ syntax features. Build a strong foundation in variables, data types, and functional programming.",
        skills: ["JavaScript", "ES6+", "Functions", "Scope"],
        tools: ["Browser Console", "Node.js"],
        project: "Develop an interactive task management application"
      },
      {
        title: "DOM Manipulation & Events",
        description: "Interact with the Document Object Model, handle user events, and manage event bubbling and capturing to create dynamic user interfaces.",
        skills: ["DOM API", "Event Loop", "Event Handling"],
        tools: ["VS Code", "Chrome DevTools"],
        project: "Build a custom UI component library (modals, accordions)"
      },
      {
        title: "API Integration & Asynchronous JS",
        description: "Fetch asynchronous data from RESTful endpoints using the Fetch API and Promises. Handle loading states and network errors gracefully.",
        skills: ["REST APIs", "Promises", "Async/Await", "JSON"],
        tools: ["Postman", "Fetch API"],
        project: "Create a dynamic weather dashboard using a public API"
      },
      {
        title: "Introduction to React",
        description: "Build declarative user interfaces using React components, props, and local state management. Understand the virtual DOM and component lifecycle.",
        skills: ["React", "JSX", "Components", "useState"],
        tools: ["Vite", "React DevTools"],
        project: "Develop an interactive movie search application"
      },
      {
        title: "Routing & SPA Structure",
        description: "Implement client-side routing to create seamless Single Page Applications without page reloads. Manage URL parameters and nested routes.",
        skills: ["React Router", "SPA Architecture"],
        tools: ["React Router DOM"],
        project: "Build a multi-page e-commerce storefront UI"
      },
      {
        title: "Responsive Portfolio Project",
        description: "Combine all foundational skills to build, optimize, and deploy a complete personal portfolio showcasing your projects and skills.",
        skills: ["Integration", "Deployment", "Optimization"],
        tools: ["Vercel", "Netlify", "GitHub"],
        project: "Deploy a live, responsive developer portfolio"
      }
    ],
    "Advanced": [
      {
        title: "Advanced React Patterns",
        description: "Utilize custom hooks, compound components, and the Context API to build scalable, highly reusable component architectures.",
        skills: ["Custom Hooks", "Compound Components", "Context API"],
        tools: ["React Profiler", "VS Code"],
        project: "Refactor a monolithic app into a modular component system"
      },
      {
        title: "Global State Management",
        description: "Manage complex application state using predictable state containers. Understand when to use global stores versus local component state.",
        skills: ["Redux Toolkit", "Zustand", "State Architecture"],
        tools: ["Redux DevTools"],
        project: "Implement a global cart and checkout management system"
      },
      {
        title: "Performance Optimization",
        description: "Optimize rendering cycles using memoization, lazy loading, and code splitting techniques to ensure 60fps performance on large datasets.",
        skills: ["useMemo", "useCallback", "Code Splitting", "Virtualization"],
        tools: ["Lighthouse", "Chrome Performance Tab"],
        project: "Optimize a slow data grid rendering 10,000+ rows"
      },
      {
        title: "Frontend Testing Strategy",
        description: "Ensure UI reliability through comprehensive unit and integration testing. Write tests that resemble how users interact with your application.",
        skills: ["Unit Testing", "Integration Testing", "TDD"],
        tools: ["Jest", "React Testing Library"],
        project: "Achieve 80%+ test coverage on a complex authentication flow"
      },
      {
        title: "Server-Side Rendering (SSR)",
        description: "Improve SEO and initial load performance by migrating to SSR and Static Site Generation (SSG) using modern meta-frameworks.",
        skills: ["Next.js", "SSR", "SSG", "Routing"],
        tools: ["Next.js CLI", "Vercel"],
        project: "Migrate a React SPA to a Next.js blog platform"
      },
      {
        title: "Authentication Systems",
        description: "Implement secure user authentication flows using JWTs, OAuth providers, and protected routes. Handle token refresh and session persistence.",
        skills: ["JWT", "OAuth", "Security", "Session Management"],
        tools: ["Auth0", "Firebase Auth"],
        project: "Build a secure member portal with role-based access"
      },
      {
        title: "Advanced Accessibility (a11y)",
        description: "Audit and implement strict WCAG compliance. Manage focus trapping, ARIA live regions, and ensure full keyboard navigability.",
        skills: ["WCAG Guidelines", "ARIA", "Focus Management"],
        tools: ["axe DevTools", "VoiceOver/NVDA"],
        project: "Develop a fully accessible, keyboard-navigable modal system"
      },
      {
        title: "Production-Grade Project",
        description: "Architect and deploy a large-scale, performant, and secure frontend application utilizing CI/CD pipelines and strict linting rules.",
        skills: ["Enterprise Architecture", "CI/CD", "Linting"],
        tools: ["GitHub Actions", "ESLint", "Husky"],
        project: "Deploy an enterprise-grade SaaS frontend application"
      }
    ]
  },
  "Backend Developer": {
    "Beginner": [
      {
        title: "Server-Side Fundamentals",
        description: "Understand the HTTP protocol, request/response lifecycles, and server-side execution environments. Learn how backend systems process client requests.",
        skills: ["HTTP/HTTPS", "TCP/IP", "Node.js Basics"],
        tools: ["Node.js", "Curl", "Terminal"],
        project: "Build a raw HTTP server from scratch without frameworks"
      },
      {
        title: "REST API Design",
        description: "Design predictable RESTful endpoints utilizing proper HTTP methods, status codes, and resource naming conventions.",
        skills: ["REST Architecture", "API Design", "JSON"],
        tools: ["Postman", "Swagger/OpenAPI"],
        project: "Design and document a RESTful API for a task manager"
      },
      {
        title: "Express.js Routing & Middleware",
        description: "Implement robust routing, middleware pipelines, and request validation using Express.js to handle complex application logic.",
        skills: ["Express.js", "Middleware", "Routing"],
        tools: ["Express", "Joi/Zod"],
        project: "Develop a library management API with input validation"
      },
      {
        title: "Relational Databases (SQL)",
        description: "Design normalized SQL schemas, write complex queries involving JOINs, and manage relational data integrity.",
        skills: ["SQL", "Database Normalization", "Schema Design"],
        tools: ["PostgreSQL", "DBeaver", "pgAdmin"],
        project: "Create a normalized database schema for an e-commerce store"
      },
      {
        title: "NoSQL Databases",
        description: "Model document-based data structures and perform CRUD operations. Understand when to choose NoSQL over relational databases.",
        skills: ["MongoDB", "NoSQL Modeling", "Document Stores"],
        tools: ["MongoDB Compass", "Mongoose"],
        project: "Build a data layer for a social media feed application"
      },
      {
        title: "Authentication Basics",
        description: "Secure endpoints using hashed passwords, salting, and JSON Web Tokens (JWT). Understand stateless authentication flows.",
        skills: ["Cryptography", "JWT", "Password Hashing"],
        tools: ["Bcrypt", "Passport.js"],
        project: "Implement a secure user registration and login system"
      },
      {
        title: "Error Handling & Logging",
        description: "Implement centralized error handling middleware and structured logging to ensure production observability and easier debugging.",
        skills: ["Error Management", "Structured Logging"],
        tools: ["Winston", "Morgan"],
        project: "Add global error handling and audit logging to an existing API"
      },
      {
        title: "Backend Deployment",
        description: "Containerize backend services and deploy them to cloud platforms. Manage environment variables and production configurations securely.",
        skills: ["Docker Basics", "Deployment", "Environment Config"],
        tools: ["Docker", "Render", "Heroku"],
        project: "Deploy a containerized production API to the cloud"
      }
    ],
    "Advanced": [
      {
        title: "Microservices Architecture",
        description: "Deconstruct monolithic applications into independently deployable and scalable microservices. Manage inter-service communication.",
        skills: ["Microservices", "Service Discovery", "API Gateways"],
        tools: ["Docker Compose", "Kong", "gRPC"],
        project: "Split a monolithic e-commerce API into user, order, and inventory services"
      },
      {
        title: "Caching Strategies",
        description: "Reduce database load and latency by implementing in-memory caching layers. Master cache invalidation and distributed caching techniques.",
        skills: ["Redis", "Caching", "Cache Invalidation"],
        tools: ["Redis CLI", "Memcached"],
        project: "Implement Redis caching on a high-traffic product catalog endpoint"
      },
      {
        title: "Message Queues & Event-Driven Systems",
        description: "Implement asynchronous processing and decouple services using message brokers. Handle retries and dead-letter queues.",
        skills: ["Pub/Sub", "Event-Driven Architecture", "Asynchronous Processing"],
        tools: ["RabbitMQ", "Kafka"],
        project: "Build an asynchronous email notification service using message queues"
      },
      {
        title: "System Scaling & Load Balancing",
        description: "Design systems for high availability. Understand horizontal scaling, database replication, sharding, and load balancer configuration.",
        skills: ["Load Balancing", "Database Replication", "Horizontal Scaling"],
        tools: ["NGINX", "HAProxy", "AWS ELB"],
        project: "Configure NGINX to load balance traffic across multiple API instances"
      },
      {
        title: "Advanced Security Best Practices",
        description: "Mitigate OWASP Top 10 vulnerabilities. Implement strict rate limiting, CORS policies, input sanitization, and secure headers.",
        skills: ["OWASP", "Rate Limiting", "Data Sanitization"],
        tools: ["Helmet", "Snyk", "OWASP ZAP"],
        project: "Audit, patch, and harden a legacy financial API"
      },
      {
        title: "GraphQL APIs",
        description: "Design flexible GraphQL schemas and resolvers to optimize client-server data fetching and prevent over-fetching/under-fetching.",
        skills: ["GraphQL", "Schema Design", "Resolvers"],
        tools: ["Apollo Server", "GraphiQL"],
        project: "Develop an aggregated data graph for a complex dashboard"
      },
      {
        title: "CI/CD Pipelines",
        description: "Automate testing, linting, and deployment workflows to ensure reliable code integration and zero-downtime releases.",
        skills: ["CI/CD", "Automation", "Deployment Strategies"],
        tools: ["GitHub Actions", "Jenkins", "GitLab CI"],
        project: "Create a zero-downtime deployment pipeline for a microservice"
      },
      {
        title: "Production-Grade System Design",
        description: "Architect a fault-tolerant, distributed backend system handling high concurrent traffic with comprehensive monitoring.",
        skills: ["System Architecture", "Capacity Planning", "High Availability"],
        tools: ["AWS", "Kubernetes", "Datadog"],
        project: "Design and deploy a scalable ride-sharing backend infrastructure"
      }
    ]
  },
  "Full Stack Developer": {
    "Beginner": [
      {
        title: "Frontend Foundations",
        description: "Build responsive user interfaces using HTML, CSS, and modern JavaScript frameworks. Understand how the browser renders content.",
        skills: ["HTML5/CSS3", "JavaScript", "React Basics"],
        tools: ["VS Code", "Vite", "Chrome DevTools"],
        project: "Develop an interactive, responsive UI dashboard"
      },
      {
        title: "Backend Foundations",
        description: "Create server-side logic and RESTful endpoints using Node.js and Express to serve data to frontend applications.",
        skills: ["Node.js", "Express.js", "HTTP Methods"],
        tools: ["Postman", "Node CLI"],
        project: "Build a basic CRUD server for a task application"
      },
      {
        title: "Database Integration",
        description: "Connect backend services to relational or document databases for persistent storage. Learn basic querying and schema design.",
        skills: ["SQL/NoSQL", "ORMs/ODMs", "Schema Design"],
        tools: ["Prisma", "MongoDB", "PostgreSQL"],
        project: "Integrate a persistent database into the CRUD server"
      },
      {
        title: "Client-Server Communication",
        description: "Fetch and mutate server data from the frontend using asynchronous requests. Handle CORS issues and loading states.",
        skills: ["Fetch/Axios", "CORS", "Async Data Flow"],
        tools: ["Browser Network Tab"],
        project: "Connect the React dashboard to the custom backend API"
      },
      {
        title: "State & Data Flow",
        description: "Manage application state across the stack, ensuring the frontend UI remains consistent with backend database records.",
        skills: ["State Management", "Data Binding", "Props"],
        tools: ["React DevTools"],
        project: "Build a full-stack inventory management system"
      },
      {
        title: "Full Stack Authentication",
        description: "Implement end-to-end security with JWTs, HTTP-only cookies, and protected frontend routes. Manage user sessions securely.",
        skills: ["JWT", "Cookies", "Auth Guards", "Bcrypt"],
        tools: ["Postman", "React Router"],
        project: "Add secure user registration and login to the inventory system"
      },
      {
        title: "Error & Validation Handling",
        description: "Validate inputs on both client and server, providing consistent, user-friendly error feedback across the entire application.",
        skills: ["Data Validation", "Error Boundaries", "Exception Handling"],
        tools: ["Zod", "Yup"],
        project: "Implement a robust form processing system with end-to-end validation"
      },
      {
        title: "Monolith Deployment",
        description: "Deploy a full-stack monolithic application to cloud hosting providers. Manage environment variables for production.",
        skills: ["Deployment", "Environment Configuration", "Build Processes"],
        tools: ["Heroku", "Vercel", "Render"],
        project: "Deploy the complete full-stack application to the live web"
      }
    ],
    "Advanced": [
      {
        title: "Server-Side Rendering & Meta-Frameworks",
        description: "Utilize Next.js to build unified full-stack applications with optimized SEO, server components, and API routes.",
        skills: ["Next.js", "SSR", "React Server Components"],
        tools: ["Vercel", "Next.js CLI"],
        project: "Build an SEO-optimized full-stack e-commerce platform"
      },
      {
        title: "Advanced Data Fetching & Caching",
        description: "Implement server-state management libraries for caching, deduplication, and optimistic UI updates on the frontend.",
        skills: ["React Query", "tRPC", "Optimistic Updates"],
        tools: ["React Query DevTools"],
        project: "Refactor a dashboard to use React Query with optimistic mutations"
      },
      {
        title: "Real-Time Communication",
        description: "Enable bidirectional, low-latency data transfer between client and server using WebSockets for instant updates.",
        skills: ["WebSockets", "Socket.io", "Real-time UI"],
        tools: ["Socket.io", "Browser Network Tab (WS)"],
        project: "Develop a live collaborative document editor"
      },
      {
        title: "Cloud Storage Integration",
        description: "Securely upload, process, and serve user-generated media using cloud object storage and presigned URLs.",
        skills: ["AWS S3", "Presigned URLs", "File Processing"],
        tools: ["AWS SDK", "Multer"],
        project: "Add secure image upload capabilities to a social feed application"
      },
      {
        title: "Micro-Frontends & Monorepos",
        description: "Scale codebases by splitting frontend and backend into managed monorepo workspaces. Share types and UI components.",
        skills: ["Monorepos", "Code Sharing", "Workspace Management"],
        tools: ["Turborepo", "Yarn Workspaces", "Nx"],
        project: "Set up an enterprise monorepo containing a web app, API, and shared library"
      },
      {
        title: "End-to-End Testing",
        description: "Automate browser testing to verify critical user journeys across the entire stack, from UI interactions to database writes.",
        skills: ["E2E Testing", "Test Automation", "Mocking"],
        tools: ["Cypress", "Playwright"],
        project: "Write automated tests covering a complete user checkout flow"
      },
      {
        title: "Containerized Workflows",
        description: "Standardize development and production environments using Docker. Manage multi-container setups with Docker Compose.",
        skills: ["Docker", "Containerization", "Environment Parity"],
        tools: ["Docker Compose", "Docker Desktop"],
        project: "Dockerize a React frontend, Node backend, and PostgreSQL database"
      },
      {
        title: "Production-Grade SaaS Architecture",
        description: "Architect a highly scalable, secure, and tested full-stack SaaS application incorporating payment gateways and CI/CD.",
        skills: ["System Architecture", "SaaS Development", "Payment Integration"],
        tools: ["AWS", "Stripe", "GitHub Actions"],
        project: "Develop and deploy a production-ready subscription-based SaaS platform"
      }
    ]
  },
  "Data Scientist": {
    "Beginner": [
      {
        title: "Python for Data Science",
        description: "Master Python programming, focusing on data structures, loops, and functional programming required for data manipulation.",
        skills: ["Python", "Data Structures", "Functional Programming"],
        tools: ["Jupyter Notebook", "VS Code"],
        project: "Build a robust script to parse and clean raw text logs"
      },
      {
        title: "Data Manipulation with Pandas",
        description: "Clean, filter, and transform messy datasets into structured formats. Handle missing values and perform complex aggregations.",
        skills: ["Pandas", "Data Cleaning", "Data Wrangling"],
        tools: ["Jupyter Notebook"],
        project: "Clean and structure a messy real estate dataset for analysis"
      },
      {
        title: "Numerical Computing",
        description: "Perform high-performance mathematical operations, vectorization, and multidimensional matrix manipulations using NumPy.",
        skills: ["NumPy", "Linear Algebra", "Vectorization"],
        tools: ["NumPy"],
        project: "Implement custom statistical functions on large numerical arrays"
      },
      {
        title: "Data Visualization",
        description: "Create compelling visual narratives and identify trends using charting libraries to communicate insights to stakeholders.",
        skills: ["Matplotlib", "Seaborn", "Data Storytelling"],
        tools: ["Jupyter Notebook"],
        project: "Create an exploratory data analysis (EDA) dashboard for sales data"
      },
      {
        title: "Statistical Foundations",
        description: "Apply probability distributions, hypothesis testing, and statistical significance to validate data insights and A/B tests.",
        skills: ["Statistics", "Hypothesis Testing", "A/B Testing"],
        tools: ["SciPy", "Statsmodels"],
        project: "Analyze and report the results of an A/B test for a marketing campaign"
      },
      {
        title: "SQL Data Extraction",
        description: "Query relational databases using complex JOINs, window functions, and subqueries to extract large-scale datasets.",
        skills: ["SQL", "Window Functions", "Data Extraction"],
        tools: ["PostgreSQL", "DBeaver"],
        project: "Extract and format user retention cohorts directly from a SQL database"
      },
      {
        title: "Intro to Machine Learning",
        description: "Train and evaluate foundational supervised learning models like linear regression and decision trees using Scikit-Learn.",
        skills: ["Scikit-Learn", "Regression", "Classification"],
        tools: ["Scikit-Learn"],
        project: "Build a baseline model to predict housing prices based on features"
      },
      {
        title: "End-to-End EDA Project",
        description: "Combine data extraction, cleaning, visualization, and basic modeling into a comprehensive report communicating actionable insights.",
        skills: ["EDA", "Communication", "Reporting"],
        tools: ["Jupyter", "Git"],
        project: "Analyze customer churn and present findings in a structured notebook"
      }
    ],
    "Advanced": [
      {
        title: "Advanced ML Models",
        description: "Implement powerful ensemble methods like Random Forests and Gradient Boosting machines. Master hyperparameter tuning.",
        skills: ["XGBoost", "Ensemble Methods", "Grid Search"],
        tools: ["XGBoost", "LightGBM", "Scikit-Learn"],
        project: "Optimize a high-accuracy fraud detection classification model"
      },
      {
        title: "Feature Engineering & Selection",
        description: "Extract predictive signals from raw data through categorical encoding, scaling, and dimensionality reduction techniques.",
        skills: ["Feature Engineering", "PCA", "Dimensionality Reduction"],
        tools: ["Scikit-Learn", "Pandas"],
        project: "Improve model accuracy by 15% through advanced feature engineering"
      },
      {
        title: "Time Series Forecasting",
        description: "Analyze sequential data to predict future trends. Understand seasonality, stationarity, ARIMA models, and exponential smoothing.",
        skills: ["Time Series Analysis", "ARIMA", "Forecasting"],
        tools: ["Prophet", "Statsmodels"],
        project: "Forecast monthly retail sales and inventory demand for the upcoming year"
      },
      {
        title: "Natural Language Processing (NLP)",
        description: "Process text data using tokenization, TF-IDF, and word embeddings for sentiment analysis and text classification.",
        skills: ["NLP", "Text Mining", "Embeddings"],
        tools: ["NLTK", "spaCy"],
        project: "Build a sentiment analysis model for customer product reviews"
      },
      {
        title: "Machine Learning Pipelines",
        description: "Construct robust, reproducible ML pipelines that automate data preprocessing, model training, and evaluation steps.",
        skills: ["Scikit-Learn Pipelines", "Reproducibility", "Automation"],
        tools: ["Scikit-Learn"],
        project: "Create an automated pipeline for a continuous model training workflow"
      },
      {
        title: "Big Data Processing",
        description: "Analyze datasets exceeding memory limits using distributed computing frameworks. Learn RDDs, DataFrames, and cluster computing.",
        skills: ["PySpark", "Distributed Computing", "Big Data"],
        tools: ["Apache Spark", "Databricks"],
        project: "Process and aggregate a 50GB log dataset using PySpark"
      },
      {
        title: "Model Deployment (MLOps Basics)",
        description: "Wrap trained machine learning models in REST APIs and deploy them to production environments for application integration.",
        skills: ["Model Serving", "API Development", "Docker"],
        tools: ["FastAPI", "Docker"],
        project: "Deploy a prediction model as a containerized REST API"
      },
      {
        title: "Production Data Science System",
        description: "Design an end-to-end data system with automated ingestion, model tracking, and predictions served at scale with monitoring.",
        skills: ["MLOps", "System Design", "Model Monitoring"],
        tools: ["MLflow", "Airflow", "AWS/GCP"],
        project: "Build an end-to-end recommendation engine with model tracking"
      }
    ]
  },
  "AI/ML Engineer": {
    "Beginner": [
      {
        title: "Math for Machine Learning",
        description: "Master the linear algebra, calculus, and probability theory underlying ML algorithms. Understand vectors, matrices, and derivatives.",
        skills: ["Linear Algebra", "Calculus", "Probability"],
        tools: ["NumPy", "SymPy"],
        project: "Implement basic matrix operations and gradient descent from scratch"
      },
      {
        title: "Data Handling & Preprocessing",
        description: "Prepare raw data for modeling through normalization, imputation, and categorical encoding. Handle missing data effectively.",
        skills: ["Data Preprocessing", "Normalization", "Imputation"],
        tools: ["Pandas", "Scikit-Learn"],
        project: "Create a robust preprocessing pipeline for a messy dataset"
      },
      {
        title: "Supervised Learning Fundamentals",
        description: "Implement and evaluate core classification and regression algorithms on structured data. Understand bias-variance tradeoff.",
        skills: ["Supervised ML", "Evaluation Metrics", "Cross-Validation"],
        tools: ["Scikit-Learn"],
        project: "Build and evaluate a model to predict loan defaults"
      },
      {
        title: "Unsupervised Learning Fundamentals",
        description: "Discover hidden patterns using clustering and dimensionality reduction techniques to find structure in unlabeled data.",
        skills: ["K-Means Clustering", "PCA", "Dimensionality Reduction"],
        tools: ["Scikit-Learn"],
        project: "Segment a customer database into distinct marketing personas"
      },
      {
        title: "Introduction to Neural Networks",
        description: "Understand the architecture of artificial neural networks, perceptrons, activation functions, and backpropagation.",
        skills: ["Neural Networks", "Deep Learning Basics", "Backpropagation"],
        tools: ["TensorFlow", "Keras", "PyTorch"],
        project: "Build a simple multi-layer perceptron to classify handwritten digits"
      },
      {
        title: "Model Optimization & Tuning",
        description: "Tune hyperparameters and apply regularization techniques (L1/L2, Dropout) to prevent model overfitting and underfitting.",
        skills: ["Hyperparameter Tuning", "Regularization", "Optimization"],
        tools: ["Optuna", "GridSearchCV"],
        project: "Optimize a baseline model to achieve state-of-the-art accuracy"
      },
      {
        title: "Computer Vision Basics",
        description: "Process and augment image data using standard computer vision libraries. Understand image representations and transformations.",
        skills: ["Image Processing", "Computer Vision", "Data Augmentation"],
        tools: ["OpenCV", "Pillow"],
        project: "Create an image preprocessing and augmentation pipeline"
      },
      {
        title: "End-to-End ML Pipeline",
        description: "Build a reproducible pipeline from data ingestion to model evaluation, ensuring consistent and trackable experiments.",
        skills: ["Pipeline Construction", "Reproducibility", "Version Control"],
        tools: ["Git", "Jupyter", "DVC"],
        project: "Develop a complete, version-controlled pipeline for a Kaggle dataset"
      }
    ],
    "Advanced": [
      {
        title: "Convolutional Neural Networks (CNNs)",
        description: "Design deep CNN architectures for advanced image classification, object detection, and image segmentation tasks.",
        skills: ["CNNs", "Transfer Learning", "Object Detection"],
        tools: ["PyTorch", "TensorFlow"],
        project: "Build a custom object detection model using transfer learning"
      },
      {
        title: "Sequence Modeling (RNNs/LSTMs)",
        description: "Process sequential data using Recurrent Neural Networks, LSTMs, and GRUs for time-series forecasting and text generation.",
        skills: ["RNNs", "LSTMs", "Sequence Modeling"],
        tools: ["PyTorch"],
        project: "Develop a text generation model or machine translation system"
      },
      {
        title: "Transformers & Attention Mechanisms",
        description: "Master the attention mechanism and transformer architectures powering modern AI. Understand self-attention and positional encoding.",
        skills: ["Transformers", "Attention Mechanism", "Deep Learning"],
        tools: ["Hugging Face", "PyTorch"],
        project: "Implement a custom transformer block from scratch"
      },
      {
        title: "Large Language Models (LLMs)",
        description: "Fine-tune pre-trained LLMs for domain-specific tasks using parameter-efficient techniques like LoRA and QLoRA.",
        skills: ["LLMs", "Fine-tuning", "PEFT", "Prompt Engineering"],
        tools: ["Hugging Face Transformers", "PyTorch"],
        project: "Fine-tune a BERT/GPT model for specialized domain classification"
      },
      {
        title: "Generative AI & GANs",
        description: "Implement generative models including Generative Adversarial Networks and Diffusion models to create synthetic data or images.",
        skills: ["GANs", "Diffusion Models", "Generative AI"],
        tools: ["PyTorch"],
        project: "Implement a GAN to generate realistic synthetic faces or artwork"
      },
      {
        title: "Model Quantization & Edge AI",
        description: "Optimize deep learning models for faster inference and deployment on edge devices by reducing model size without sacrificing accuracy.",
        skills: ["Quantization", "Pruning", "Edge Deployment"],
        tools: ["TensorRT", "ONNX", "TensorFlow Lite"],
        project: "Optimize a heavy deep learning model for mobile device inference"
      },
      {
        title: "MLOps & Experiment Tracking",
        description: "Implement robust tracking for experiments, datasets, and model versions to ensure reproducibility in production environments.",
        skills: ["MLOps", "Experiment Tracking", "Model Registry"],
        tools: ["MLflow", "Weights & Biases"],
        project: "Set up a central model registry and experiment tracking dashboard"
      },
      {
        title: "Production AI System Architecture",
        description: "Design and build a scalable AI product. Handle data drift detection, continuous training, and high-availability model serving.",
        skills: ["AI Architecture", "Model Serving", "Continuous Training"],
        tools: ["TorchServe", "Kubernetes", "AWS SageMaker"],
        project: "Architect and deploy an end-to-end scalable recommendation engine"
      }
    ]
  },
  "Cloud Engineer": {
    "Beginner": [
      {
        title: "Linux & Networking Fundamentals",
        description: "Master essential Linux commands, file permissions, bash scripting, and core networking concepts including TCP/IP, DNS, and Subnets.",
        skills: ["Linux CLI", "Bash Scripting", "Networking Basics"],
        tools: ["Terminal", "SSH"],
        project: "Write a bash script to automate server setup and network configuration"
      },
      {
        title: "Cloud Computing Concepts",
        description: "Understand cloud service models (IaaS, PaaS, SaaS), regions, availability zones, and the shared responsibility security model.",
        skills: ["Cloud Concepts", "IaaS/PaaS", "Security Model"],
        tools: ["AWS Console", "GCP Console"],
        project: "Map a traditional on-premise architecture to cloud equivalents"
      },
      {
        title: "Identity and Access Management (IAM)",
        description: "Learn how to securely manage users, groups, roles, and policies. Understand the principle of least privilege.",
        skills: ["IAM", "Role-Based Access", "Security Policies"],
        tools: ["AWS IAM"],
        project: "Design and implement a secure IAM hierarchy for a startup"
      },
      {
        title: "Compute Services (EC2/VMs)",
        description: "Provision, configure, and manage virtual machines in the cloud. Learn about instance types, AMIs, and SSH key management.",
        skills: ["Virtual Machines", "Provisioning", "SSH"],
        tools: ["AWS EC2", "GCP Compute Engine"],
        project: "Deploy a highly available web server on a cloud VM"
      },
      {
        title: "Cloud Storage Solutions",
        description: "Understand object storage, block storage, and file storage. Learn lifecycle policies, versioning, and static website hosting.",
        skills: ["Object Storage", "Block Storage", "Data Lifecycle"],
        tools: ["AWS S3", "EBS"],
        project: "Host a static website on S3 with a custom domain and SSL"
      },
      {
        title: "Relational Databases in the Cloud",
        description: "Deploy and manage managed relational databases. Understand backups, multi-AZ deployments, and read replicas.",
        skills: ["Managed Databases", "SQL", "High Availability"],
        tools: ["AWS RDS", "Cloud SQL"],
        project: "Migrate a local database to a managed cloud database instance"
      },
      {
        title: "Virtual Private Cloud (VPC) Basics",
        description: "Design isolated cloud networks. Configure public/private subnets, route tables, internet gateways, and security groups.",
        skills: ["VPC", "Subnetting", "Firewalls"],
        tools: ["AWS VPC"],
        project: "Build a secure 2-tier network architecture (public web, private DB)"
      },
      {
        title: "Cloud Monitoring & Billing",
        description: "Set up alerts, monitor resource utilization, analyze logs, and configure budgets to prevent unexpected cloud costs.",
        skills: ["Monitoring", "Logging", "Cost Management"],
        tools: ["AWS CloudWatch", "AWS Budgets"],
        project: "Create a monitoring dashboard with automated billing alerts"
      }
    ],
    "Advanced": [
      {
        title: "Infrastructure as Code (IaC)",
        description: "Automate the provisioning of cloud resources using code. Understand state management, modules, and declarative infrastructure.",
        skills: ["Terraform", "IaC", "State Management"],
        tools: ["Terraform", "AWS CloudFormation"],
        project: "Write Terraform scripts to provision a complete VPC and EC2 cluster"
      },
      {
        title: "Containerization & Docker",
        description: "Deep dive into containerizing applications, writing optimized Dockerfiles, managing volumes, and container networking.",
        skills: ["Docker", "Containerization", "Image Optimization"],
        tools: ["Docker CLI", "Docker Compose"],
        project: "Containerize a multi-tier application and run it locally"
      },
      {
        title: "Container Orchestration (Kubernetes)",
        description: "Master Kubernetes architecture, Pods, Deployments, Services, and Ingress. Learn how to manage containerized apps at scale.",
        skills: ["Kubernetes", "Orchestration", "YAML"],
        tools: ["kubectl", "Minikube", "EKS/GKE"],
        project: "Deploy a microservices application to a managed Kubernetes cluster"
      },
      {
        title: "Continuous Integration & Delivery (CI/CD)",
        description: "Design and implement automated pipelines that build, test, and deploy code changes directly to cloud environments.",
        skills: ["CI/CD", "Automation", "Deployment Strategies"],
        tools: ["GitHub Actions", "GitLab CI", "Jenkins"],
        project: "Build a CI/CD pipeline that deploys a Docker image to Kubernetes"
      },
      {
        title: "Serverless Architecture",
        description: "Build applications without managing servers. Understand event-driven architectures, API gateways, and serverless functions.",
        skills: ["Serverless", "Event-Driven", "FaaS"],
        tools: ["AWS Lambda", "API Gateway", "Serverless Framework"],
        project: "Develop an event-driven image processing pipeline using Lambda"
      },
      {
        title: "Advanced Networking & Content Delivery",
        description: "Implement global content delivery networks, advanced routing policies, VPNs, and hybrid cloud connectivity.",
        skills: ["CDN", "DNS Routing", "VPN/Direct Connect"],
        tools: ["AWS CloudFront", "Route 53"],
        project: "Configure a global CDN with geo-routing and WAF protection"
      },
      {
        title: "Cloud Security & Compliance",
        description: "Implement advanced security measures including encryption at rest/transit, secrets management, and automated compliance checks.",
        skills: ["Encryption", "Secrets Management", "Compliance"],
        tools: ["AWS KMS", "HashiCorp Vault", "AWS Config"],
        project: "Implement dynamic secrets injection for a Kubernetes application"
      },
      {
        title: "Scalability & Disaster Recovery",
        description: "Design self-healing, auto-scaling architectures. Implement cross-region replication and comprehensive disaster recovery plans.",
        skills: ["Auto-scaling", "Disaster Recovery", "High Availability"],
        tools: ["Auto Scaling Groups", "Route 53 Failover"],
        project: "Architect and test a multi-region active-passive failover system"
      }
    ]
  }
};

export const CareerRoadmap: React.FC = () => {
  const rolesList = Object.keys(roadmapData);
  const [selectedRole, setSelectedRole] = useState(rolesList[0] || '');
  
  const availableLevels = selectedRole && roadmapData[selectedRole] ? Object.keys(roadmapData[selectedRole]) : [];
  const [selectedLevel, setSelectedLevel] = useState(availableLevels[0] || '');
  
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    if (selectedRole && roadmapData[selectedRole]) {
      const levels = Object.keys(roadmapData[selectedRole]);
      if (!levels.includes(selectedLevel)) {
        setSelectedLevel(levels[0] || '');
      }
    }
  }, [selectedRole, selectedLevel]);

  const handleGenerate = async () => {
    if (!selectedRole || !selectedLevel) return;
    setLoading(true);
    setIsLaunching(true);
    setError('');
    setRoadmap([]);
    
    setTimeout(() => {
      const data = roadmapData[selectedRole]?.[selectedLevel];
      
      if (data && data.length > 0) {
        setRoadmap(data);
      } else {
        setError('No data available for selected options');
      }

      setLoading(false);
      setTimeout(() => setIsLaunching(false), 1000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto pb-12"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Career Roadmap Planner
      </motion.h1>

      <div className={`w-full max-w-[280px] mx-auto mb-10 relative z-10 transition-all duration-1000 ${isLaunching ? 'translate-y-[-50px] scale-110' : 'animate-float'}`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-[50px] rounded-full -z-10 transition-all duration-1000 ${isLaunching ? 'bg-orange-500/40 scale-150' : ''}`}></div>
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/5 blur-lg rounded-[100%] -z-10 transition-all duration-1000 ${isLaunching ? 'scale-50 opacity-50' : ''}`}></div>
        
        <LottieDisplay
          src="https://assets9.lottiefiles.com/packages/lf20_g3ki3g0v.json"
          className="w-full h-auto drop-shadow-xl"
          style={{ width: '100%', height: 'auto' }}
          speed={isLaunching ? 2 : 1}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 hover:shadow-md transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-700">Select Role</label>
            <div className="relative">
              <Flag className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <select
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {rolesList.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Experience Level</label>
            <select 
              className="w-full p-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {availableLevels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(108, 92, 231, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading || !selectedRole || !selectedLevel}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white py-2.5 px-6 rounded-xl font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center shadow-md shadow-[#6C5CE7]/20 text-sm"
          >
            {loading ? 'Loading...' : 'View Roadmap'}
            {!loading && <Rocket className="w-4 h-4 ml-2" />}
          </motion.button>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {roadmap.length > 0 && (
          <motion.div 
            key="roadmap-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent"
          >
            {roadmap.map((step, index) => (
              <motion.div 
                variants={itemVariants}
                key={index} 
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gradient-to-br from-[#6C5CE7] to-[#8E7CFF] shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white font-bold transition-all duration-500 ${loading ? 'scale-110 shadow-[0_0_15px_rgba(108,92,231,0.4)]' : ''}`}
                >
                  {index + 1}
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300"
                >
                   <div className="flex items-center mb-2 space-x-2">
                     <Calendar className="w-4 h-4 text-[#6C5CE7]" />
                     <span className="text-xs font-bold text-[#6C5CE7] uppercase tracking-wider">Step {index + 1}</span>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                   <p className="text-slate-600 text-sm mb-4 leading-relaxed">{step.description}</p>
                   
                   <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                     {step.skills && step.skills.length > 0 && (
                       <div>
                         <div className="flex items-center text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                           <Code className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Skills
                         </div>
                         <div className="flex flex-wrap gap-1.5">
                           {step.skills.map((skill: string, idx: number) => (
                             <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100">
                               {skill}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}
                     
                     {step.tools && step.tools.length > 0 && (
                       <div>
                         <div className="flex items-center text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                           <Wrench className="w-3.5 h-3.5 mr-1.5 text-orange-500" /> Tools
                         </div>
                         <div className="flex flex-wrap gap-1.5">
                           {step.tools.map((tool: string, idx: number) => (
                             <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs font-medium border border-orange-100">
                               {tool}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}

                     {step.project && (
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                         <div className="flex items-center text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                           <FolderGit2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Project
                         </div>
                         <p className="text-sm text-slate-600">{step.project}</p>
                       </div>
                     )}
                   </div>
                </motion.div>

              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: roadmap.length * 0.2 + 0.5, type: "spring" }}
              className="flex justify-center pt-8"
            >
               <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-6 py-2.5 rounded-full font-medium flex items-center shadow-sm z-10 text-sm">
                 <Flag className="w-4 h-4 mr-2" />
                 Roadmap Completed
               </div>
            </motion.div>
          </motion.div>
        )}

        {roadmap.length === 0 && !loading && !error && (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 hover:bg-slate-50/80 transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
               <ArrowRight className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            </motion.div>
            <h3 className="text-lg font-medium text-slate-700">Your roadmap will appear here</h3>
            <p className="text-sm text-slate-500 mt-1">Select options above to get started</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
