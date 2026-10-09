(function () {
  "use strict";

  const group = (name, priority, topics) => ({ name, priority, topics: topics.split("|") });
  const MODULES = [
    { id: "m0", title: "Computer Science Foundations", stage: "Fundamentos", sources: "Futura · AnyoneAI refresher", output: "Aplicación Python modular con tests, logs y configuración externa.", groups: [
      group("Python Fundamentals", "CORE", "Variables y tipos|Operadores|Condicionales|Loops|Comprehensions|Funciones|*args y **kwargs|Scope|Lambda|Decorators|Exceptions|Debugging"),
      group("Data Structures", "CORE", "Lists|Tuples|Sets|Dictionaries|Nested structures|Stacks y queues|Complejidad temporal básica|Big-O básico"),
      group("Object-Oriented Programming", "CORE", "Classes y objects|Encapsulation|Inheritance|Composition|Dataclasses|SOLID: introducción"),
      group("Files & Data", "CORE", "CSV|JSON|TXT|YAML|File I/O|Paths|Serialization"),
      group("Python moderno", "CORE", "Type hints y typing|Virtual environments|Dependency management|Logging|pytest|Packaging básico|Environment variables"),
      group("Async Python", "AI ENGINEERING", "asyncio|async/await|Concurrent requests|Background tasks|HTTPX")
    ] },
    { id: "m1", title: "Mathematics for Data & AI", stage: "Fundamentos", sources: "AnyoneAI refresher · Futura", output: "Explicar y aplicar la matemática detrás de un modelo, no solo memorizar fórmulas.", groups: [
      group("Álgebra", "CORE", "Ecuaciones|Funciones|Logaritmos|Exponenciales"),
      group("Álgebra lineal", "CORE", "Vectores|Matrices|Operaciones matriciales|Producto punto|Transposición|Sistemas lineales|Eigenvalues/eigenvectors: intuición|Normas|Distancias|SVD: concepto"),
      group("Cálculo", "CORE", "Derivadas|Derivadas parciales|Gradientes|Chain rule|Optimización|Gradient Descent"),
      group("Probabilidad", "CORE", "Eventos|Probabilidad condicional|Bayes|Variables aleatorias|Esperanza|Varianza|Distribuciones principales"),
      group("Estadística descriptiva", "CORE", "Media|Mediana|Moda|Varianza descriptiva|Desviación estándar|Percentiles|Correlación"),
      group("Estadística inferencial", "CORE", "Muestreo|Distribuciones muestrales|Intervalos de confianza|Pruebas de hipótesis|p-values|Errores tipo I y II|A/B testing básico"),
      group("Matemática complementaria", "COMPLEMENTARIO", "Maximum Likelihood|Entropy|Cross Entropy|KL Divergence")
    ] },
    { id: "m2", title: "Data Engineering Foundations", stage: "Data Science", sources: "AnyoneAI Sprint 1 · Futura · Coursera SQL Server", output: "API → ingesta → limpieza → transformación → validación → almacenamiento → análisis.", groups: [
      group("Data manipulation", "CORE", "NumPy|Pandas|Data cleaning|Missing values|Duplicates|Outliers|Data transformations|Joins y merges"),
      group("SQL", "CORE", "SELECT|WHERE|GROUP BY|HAVING|JOIN|Subqueries|CTE|Window functions|Indexes: concepto|Query optimization: básico"),
      group("SQL Server", "COMPLEMENTARIO", "T-SQL|Stored Procedures|Views|Functions|Transactions|Execution plans|Indexes en SQL Server"),
      group("APIs / HTTP", "CORE", "HTTP|GET / POST / PUT / DELETE|Status codes|REST APIs|Authentication|JSON responses|Error handling"),
      group("Data acquisition", "CORE", "Web scraping|Consumo de APIs|CSV y Excel|Bases de datos"),
      group("Data Pipelines", "CORE", "Ingestion|Cleaning|Transformation|Validation|Storage|Scheduling|ETL|ELT"),
      group("Orquestación y calidad", "COMPLEMENTARIO", "Airflow|Prefect o Dagster|Data quality checks")
    ] },
    { id: "m3", title: "Data Analysis & EDA", stage: "Data Science", sources: "Futura · AnyoneAI Sprint 1", output: "EDA guiado por preguntas, features documentadas y riesgos de leakage detectados.", groups: [
      group("Visualization", "CORE", "Matplotlib|Seaborn|Selección correcta de gráficos"),
      group("Visualización adicional", "COMPLEMENTARIO", "Plotly"),
      group("Exploratory Data Analysis", "CORE", "Distribución de variables|Relaciones|Correlaciones|Missing data|Outliers|Segmentación inicial|Leakage detection"),
      group("Feature Engineering", "CORE", "Encoding|Scaling|Normalization|Log transformations|Binning|Interaction features|Date features|Text features|Missing indicators"),
      group("Especializado", "COMPLEMENTARIO", "Weight of Evidence (WoE)|Information Value|Feature selection"),
      group("Dimensionality Reduction", "CORE", "PCA|t-SNE: concepto|UMAP: concepto")
    ] },
    { id: "m4", title: "Machine Learning Core", stage: "ML Engineering", sources: "AnyoneAI Sprint 2 · Futura", output: "EDA → features → entrenamiento → evaluación → interpretación → recomendación de negocio.", groups: [
      group("ML Foundations", "CORE", "Supervised vs unsupervised|Training / validation / test|Bias|Variance|Underfitting|Overfitting|Data leakage|Baselines"),
      group("Regression", "CORE", "Linear Regression|Multiple Regression|Polynomial Regression|Ridge|Lasso|Elastic Net"),
      group("Classification", "CORE", "Logistic Regression|KNN|Decision Trees|Naive Bayes|SVM"),
      group("Tree Ensembles", "CORE", "Random Forest|Gradient Boosting|XGBoost|LightGBM"),
      group("Tree Ensembles", "COMPLEMENTARIO", "CatBoost"),
      group("Clustering", "CORE", "K-Means|Hierarchical clustering|DBSCAN"),
      group("Classification metrics", "CORE", "Accuracy|Precision|Recall|F1|Confusion Matrix|ROC-AUC|PR-AUC"),
      group("Regression metrics", "CORE", "MAE|MSE|RMSE|R²"),
      group("Training & validation", "CORE", "Cross-validation|Hyperparameter tuning|Grid Search|Random Search"),
      group("Training & validation", "COMPLEMENTARIO", "Bayesian Optimization: concepto"),
      group("Interpretability", "CORE", "Feature importance|SHAP"),
      group("Interpretability", "COMPLEMENTARIO", "Partial dependence")
    ] },
    { id: "m5", title: "Deep Learning", stage: "ML Engineering", sources: "AnyoneAI Sprint 3 · Futura", output: "Entrenar, evaluar y explicar una red pequeña con PyTorch.", groups: [
      group("Neural Network Foundations", "CORE", "Perceptron|Layers|Weights|Bias|Activation functions|Forward propagation|Loss functions|Backpropagation|Gradient descent en redes"),
      group("Optimization", "CORE", "SGD|Momentum|Adam|Learning rate|Schedulers|Regularization|Dropout|Batch normalization"),
      group("Framework", "CORE", "PyTorch"),
      group("Framework", "COMPLEMENTARIO", "TensorFlow / Keras"),
      group("Architectures", "CORE", "MLP|CNN|Attention|Transformers: arquitectura"),
      group("Architectures", "COMPLEMENTARIO", "RNN: concepto|LSTM / GRU: concepto")
    ] },
    { id: "m6", title: "NLP & Computer Vision", stage: "ML Engineering", sources: "Futura · AnyoneAI Sprint 3 · Hugging Face", output: "Pipeline de texto reproducible; Computer Vision como rama opcional.", groups: [
      group("NLP", "CORE", "Tokenization|Text preprocessing|Bag of Words|TF-IDF|Embeddings|Sequence models|Attention en NLP|Transformers en NLP|BERT|Encoder vs Decoder|Hugging Face"),
      group("NLP histórico", "COMPLEMENTARIO", "Word2Vec: concepto"),
      group("Computer Vision", "COMPLEMENTARIO", "Image representation|OpenCV|CNN para visión|Image classification|Object detection|YOLO|Segmentation")
    ] },
    { id: "m7", title: "Software Engineering for AI", stage: "ML Engineering", sources: "AnyoneAI Sprint 4 · práctica en proyectos", output: "Servicio modular con FastAPI, validación, pruebas y documentación.", groups: [
      group("Git", "CORE", "Repository|Commit|Branch|Merge|Pull requests|.gitignore"),
      group("Git", "COMPLEMENTARIO", "Rebase: básico"),
      group("Software quality", "CORE", "Clean code|Modularity|Separation of concerns|Configuration management|Error handling|Logging|Unit testing|Integration testing"),
      group("Backend", "CORE", "FastAPI|Pydantic|API endpoints|Request validation|Backend error handling|Streaming|Authentication"),
      group("Backend", "COMPLEMENTARIO", "WebSockets"),
      group("System basics", "CORE", "Linux|Bash|Processes|Environment variables en sistema|Ports|Networking básico")
    ] },
    { id: "m8", title: "ML Engineering & MLOps", stage: "ML Engineering", sources: "AnyoneAI Sprint 4 · proyecto final", output: "Modelo versionado, servido y monitoreado; elegir una sola nube para profundizar.", groups: [
      group("Model lifecycle", "CORE", "Experiment tracking|Training pipeline|Model artifacts|Versioning|Model registry"),
      group("Tools", "CORE", "MLflow|Docker|FastAPI para modelos"),
      group("Tools", "COMPLEMENTARIO", "DVC|Weights & Biases"),
      group("Deployment", "CORE", "Batch inference|Online inference|REST serving|Containers|Environment management"),
      group("CI/CD", "CORE", "Automated tests|GitHub Actions|Build pipelines|Deployment pipelines|Rollbacks"),
      group("Cloud: elige una", "CORE", "AWS o GCP o Azure"),
      group("Containers & orchestration", "CORE", "Docker Compose|Kubernetes fundamentals|Pods|Services|Deployments"),
      group("Monitoring", "CORE", "Latency|Errors|Resource usage|Data drift|Model drift|Performance degradation")
    ] },
    { id: "m9", title: "Generative AI Foundations", stage: "AI Engineering", sources: "AnyoneAI Sprint 3 · Coursera/Udemy puntual · documentación", output: "Aplicación LLM con salida estructurada, herramientas y validación robusta.", groups: [
      group("LLM fundamentals", "CORE", "Transformers para LLM|Tokenization en LLM|Context window|Embeddings para LLM|Sampling|Temperature|Top-p|Hallucinations"),
      group("LLM APIs: domina una", "CORE", "Una API de LLM en profundidad"),
      group("LLM APIs: familiaridad", "COMPLEMENTARIO", "OpenAI API|Anthropic API|Gemini API"),
      group("Prompt Engineering", "CORE", "System instructions|User prompts|Few-shot prompting|Structured prompting|Prompt templates|Context management"),
      group("Structured Outputs", "CORE", "JSON|Schemas|Pydantic para outputs|Validation|Parsing|Retry strategies"),
      group("Tool Calling", "CORE", "Function/tool definitions|Tool schemas|Tool validation|Tool permissions|Tool retries|Tool error handling")
    ] },
    { id: "m10", title: "RAG & Retrieval Engineering", stage: "AI Engineering", sources: "Documentación · proyecto propio · Udemy puntual", output: "RAG con evaluación de recuperación, fidelidad y observabilidad.", groups: [
      group("Document ingestion", "CORE", "Parsing|Cleaning de documentos|Chunking|Metadata enrichment"),
      group("Embeddings", "CORE", "Dense embeddings|Similarity|Cosine similarity|Embedding models"),
      group("Vector Databases: elige una", "CORE", "Una base vectorial: pgvector, Qdrant, FAISS, Pinecone o Weaviate|Indexing|Vector search|Metadata filtering"),
      group("Retrieval Engineering", "CORE", "Semantic search|Keyword search|BM25|Hybrid search|Reranking|Metadata filtering en retrieval|Query rewriting"),
      group("Context Engineering", "CORE", "Context selection|Context compression|Context ordering|Token budgeting"),
      group("RAG Evaluation", "CORE", "Retrieval quality|Context relevance|Answer faithfulness|Groundedness")
    ] },
    { id: "m11", title: "AI Agents", stage: "AI Engineering", sources: "LangGraph · documentación · proyecto propio", output: "Workflow con herramientas, estado, permisos, recuperación de errores y revisión humana.", groups: [
      group("Agent fundamentals", "CORE", "Agent loop|Planning|Tool use|State|Memory"),
      group("Agent fundamentals", "COMPLEMENTARIO", "Reflection: concepto"),
      group("Frameworks", "CORE", "LangGraph en profundidad"),
      group("Frameworks", "COMPLEMENTARIO", "LangChain: familiaridad"),
      group("Agent orchestration", "CORE", "Workflows|Routing|Sequential agents|Parallel execution|Multi-agent coordination"),
      group("Protocols", "CORE", "MCP|Tool schemas para agentes|Resource access|Permissions para agentes"),
      group("Reliability", "CORE", "Retries|Timeouts|Fallbacks|Idempotency|Error recovery"),
      group("Human-in-the-loop", "CORE", "Approval flows|Escalation|Review|Intervention points")
    ] },
    { id: "m12", title: "Production AI Engineering", stage: "Producción", sources: "Documentación · proyecto final · observabilidad", output: "Sistema de IA medible, seguro, recuperable y con costes controlados.", groups: [
      group("Evaluation", "CORE", "Golden datasets|Offline evaluation|Online evaluation|Task success|Human evaluation"),
      group("Evaluation", "COMPLEMENTARIO", "LLM-as-judge: limitaciones"),
      group("Model Routing", "CORE", "Cost-based routing|Latency-based routing|Capability-based routing|Fallback models"),
      group("Observability", "CORE", "Prompt tracing|Tool tracing|Token usage|Failures|Latency de IA|User feedback"),
      group("Herramientas de observabilidad", "COMPLEMENTARIO", "LangSmith|OpenTelemetry|Phoenix"),
      group("Latency Optimization", "CORE", "Caching|Streaming|Parallel execution|Batching|Async execution"),
      group("Cost Optimization", "CORE", "Token budgeting|Prompt compression|Smaller models|Smart routing|Cache strategies"),
      group("Guardrails & Safety", "CORE", "Prompt injection|Jailbreak concepts|Input validation|Output validation|PII handling|Content controls"),
      group("Security", "CORE", "Authentication|Authorization|Secret management|API keys|Least privilege|Rate limiting"),
      group("Data Governance", "CORE", "Privacy|Retention|Access|Auditability|Lineage: básico"),
      group("Reliability Engineering", "CORE", "Retries en producción|Exponential backoff|Timeouts en producción|Fallbacks en producción|Graceful degradation"),
      group("Reliability Engineering", "COMPLEMENTARIO", "Circuit breakers: concepto")
    ] },
    { id: "m13", title: "AI System Design", stage: "Producción", sources: "Proyectos · diagramas · revisiones de arquitectura", output: "Diseñar y defender sistemas completos ante restricciones reales.", groups: [
      group("Trade-offs", "CORE", "Scalability|Reliability|Availability|Latency|Cost|Security|Consistency|Failure modes"),
      group("Arquitecturas", "CORE", "ML inference service|Batch prediction pipeline|RAG system|LLM chatbot|Agentic workflow|AI recommendation service"),
      group("Arquitecturas", "COMPLEMENTARIO", "Multi-agent architecture")
    ] },
    { id: "m14", title: "Business & Professional Skills", stage: "Transversal", sources: "Coursera · práctica en proyectos · inglés", output: "Brief de negocio, presentación ejecutiva y defensa técnica en inglés.", groups: [
      group("Business", "CORE", "Problem framing|KPIs|ROI|Business metrics|Cost-benefit analysis|Customer problems|Stakeholder requirements"),
      group("Product thinking", "CORE", "User needs|MVP|Experimentation|Success criteria|Feedback loops"),
      group("Project Management", "CORE", "Agile|Scrum|Kanban|Backlogs|Estimation|Risk management"),
      group("Communication", "CORE", "Technical writing|Documentation|Presentations|Storytelling|Stakeholder communication"),
      group("English", "CORE", "Technical reading|Reading documentation|Technical writing in English|Speaking|Explaining architecture|Interviews|Business English")
    ] }
  ];

  const STATUS = ["No iniciado", "Estudiado", "Practicado", "Dominado"];
  const CATEGORIES = ["AnyoneAI", "Futura", "Portafolio", "Inglés", "Descanso", "Personal", "Otro"];
  const START_HOUR = 5;
  const END_HOUR = 23;
  const HOUR_HEIGHT = 58;
  let api;
  let root;
  let calendarRoot;
  let weekStart;
  let search = "";
  let filter = "all";
  let showHidden = false;
  let reviewWeekOffset = 0;
  const evidenceOpen = new Set();

  function esc(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  function state() { return api.getState(); }
  function dateAtNoon(value) { return new Date(value + "T12:00:00"); }
  function iso(date) { return api.isoDate(date); }
  function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
  function sundayOf(date) { return addDays(date, -date.getDay()); }
  function timeToMinutes(value) { const parts = String(value).split(":").map(Number); return parts[0] * 60 + parts[1]; }
  function minutesToTime(value) { return String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0"); }
  function topicKey(moduleId, groupIndex, topicIndex) { return moduleId + ":" + groupIndex + ":" + topicIndex; }
  function topicData(key) { return state().competencies[key] || {}; }
  function topicStatus(key) { return Math.max(0, Math.min(3, Number(topicData(key).status) || 0)); }
  function masteryReady(data) { return String(data.evidence || "").trim().length >= 12 && data.explain && data.apply && data.solve; }
  function allTopics(module) {
    const result = [];
    module.groups.forEach((g, gi) => g.topics.forEach((title, ti) => result.push({ key: topicKey(module.id, gi, ti), title, group: g.name, priority: g.priority, custom: false })));
    (state().customCompetencies || []).filter(item => item.moduleId === module.id).forEach(item => result.push({ key: item.id, title: item.title, group: "Personalizado", priority: item.priority || "CORE", custom: true }));
    return result;
  }
  function counts(topics) {
    return topics.reduce((n, t) => { if (!topicData(t.key).hidden) { n.total++; n.weight += topicStatus(t.key); if (topicStatus(t.key) >= 2) n.practiced++; if (topicStatus(t.key) === 3) n.mastered++; } return n; }, { total: 0, weight: 0, practiced: 0, mastered: 0 });
  }
  function topicRow(topic) {
    const data = topicData(topic.key);
    const current = topicStatus(topic.key);
    const label = data.label || topic.title;
    return '<div class="tc-topic" data-topic="' + esc(topic.key) + '">' +
      '<div class="tc-topic-main"><span class="tc-topic-dot tc-level-' + current + '" aria-hidden="true"></span>' +
      '<input class="tc-topic-label" aria-label="Nombre de competencia" data-topic-label value="' + esc(label) + '">' +
      '<span class="tc-priority">' + esc(topic.priority) + '</span>' +
      '<select class="tc-status" data-topic-status aria-label="Estado de ' + esc(label) + '">' + STATUS.map((s, i) => '<option value="' + i + '"' + (current === i ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' +
      '<button class="tc-mini" type="button" data-toggle-evidence aria-label="Editar evidencia de ' + esc(label) + '">Evidencia</button>' +
      '<button class="tc-mini tc-muted" type="button" data-remove-topic title="' + (topic.custom ? 'Eliminar competencia' : data.hidden ? 'Restaurar competencia' : 'Ocultar competencia') + '">' + (topic.custom ? 'Eliminar' : data.hidden ? 'Restaurar' : 'Ocultar') + '</button></div>' +
      '<div class="tc-evidence-panel"' + (evidenceOpen.has(topic.key) ? '' : ' hidden') + '><label>Evidencia concreta o enlace<textarea data-topic-evidence placeholder="Qué construiste, explicaste o resolviste">' + esc(data.evidence || '') + '</textarea></label>' +
      '<div class="tc-mastery-checks"><label><input type="checkbox" data-master="explain"' + (data.explain ? ' checked' : '') + '> Puedo explicarlo</label><label><input type="checkbox" data-master="apply"' + (data.apply ? ' checked' : '') + '> Puedo aplicarlo</label><label><input type="checkbox" data-master="solve"' + (data.solve ? ' checked' : '') + '> Resuelvo un problema sin tutorial</label></div>' +
      '<details class="tc-learning-loop"><summary>Explicar · English · quiz</summary><div class="tc-learning-fields"><label>Explícalo en español<textarea data-topic-field="explanationEs" placeholder="Explica con tus palabras, sin mirar notas">' + esc(data.explanationEs || '') + '</textarea></label><label>Explain it in English<textarea data-topic-field="explanationEn" placeholder="Explain the idea and one practical use in English">' + esc(data.explanationEn || '') + '</textarea></label><div class="tc-quiz-row"><button type="button" class="tc-mini" data-copy-quiz>Copiar prompt de quiz avanzado</button><label>Resultado / 5<input type="number" min="0" max="5" step="1" data-topic-field="quizScore" value="' + esc(data.quizScore == null ? '' : data.quizScore) + '"></label></div><small>El botón prepara preguntas para usar en ChatGPT u otra IA; no envía tus datos automáticamente.</small></div></details>' +
      '<small>“Dominado” exige las tres comprobaciones y una evidencia de al menos 12 caracteres.</small></div></div>';
  }
  function moduleCard(module, previousOpen) {
    const topics = allTopics(module);
    const n = counts(topics);
    const progress = n.total ? Math.round(n.weight / (n.total * 3) * 100) : 0;
    const matches = topics.filter(t => {
      const data = topicData(t.key);
      if (data.hidden && !showHidden) return false;
      const status = topicStatus(t.key);
      if (filter === "todo" && status !== 0) return false;
      if (filter === "active" && (status === 0 || status === 3)) return false;
      if (filter === "mastered" && status !== 3) return false;
      return !search || (module.title + " " + t.group + " " + (data.label || t.title)).toLocaleLowerCase("es").includes(search);
    });
    if (!matches.length) return "";
    let lastGroup = "";
    const rows = matches.map(t => { const heading = t.group !== lastGroup ? '<h4 class="tc-group-title">' + esc(t.group) + '</h4>' : ""; lastGroup = t.group; return heading + topicRow(t); }).join("");
    return '<details class="tc-module" data-module="' + module.id + '"' + (search || previousOpen.has(module.id) ? ' open' : '') + '><summary><span class="tc-module-number">M' + module.id.slice(1).padStart(2, "0") + '</span><span class="tc-module-title"><strong>' + esc(module.title) + '</strong><small>' + esc(module.stage) + ' · ' + n.practiced + ' practicadas · ' + n.mastered + ' dominadas</small></span><span class="tc-module-progress"><span class="tc-progress-track"><i style="width:' + progress + '%"></i></span><b>' + progress + '%</b></span><span class="tc-chevron">⌄</span></summary><div class="tc-module-body"><p class="tc-source"><strong>Fuentes:</strong> ' + esc(module.sources) + '</p><div class="tc-topic-list">' + rows + '</div><div class="tc-module-footer"><div><strong>Proyecto o evidencia de salida</strong><p>' + esc(module.output) + '</p></div><form class="tc-add-topic" data-add-topic="' + module.id + '"><input name="title" maxlength="140" placeholder="Añadir competencia propia" required aria-label="Nueva competencia"><select name="priority" aria-label="Prioridad"><option>CORE</option><option>COMPLEMENTARIO</option></select><button type="submit">Añadir</button></form></div></div></details>';
  }
  function renderCompetencies() {
    if (!root) return;
    const previousOpen = new Set(Array.from(root.querySelectorAll(".tc-module[open]")).map(el => el.dataset.module));
    const all = MODULES.flatMap(allTopics);
    const n = counts(all);
    const pct = n.total ? Math.round(n.weight / (n.total * 3) * 100) : 0;
    root.querySelector("#tcCompetencySummary").innerHTML = '<div><span>Competencias activas</span><strong>' + n.total + '</strong></div><div><span>En práctica o dominio</span><strong>' + n.practiced + '</strong></div><div><span>Dominadas con evidencia</span><strong>' + n.mastered + '</strong></div><div><span>Avance ponderado</span><strong>' + pct + '%</strong></div>';
    root.querySelector("#tcModuleList").innerHTML = MODULES.map(m => moduleCard(m, previousOpen)).join("") || '<p class="tc-empty">No hay competencias para este filtro.</p>';
    renderRoadmap();
  }
  const ROADMAP_STAGES = [
    { title: "Fundamentos de datos", caption: "Python, matemáticas, pipelines y análisis", ids: ["m0", "m1", "m2", "m3"] },
    { title: "Machine Learning e ingeniería", caption: "Modelos, deep learning, software y despliegue", ids: ["m4", "m5", "m6", "m7", "m8"] },
    { title: "AI Engineering", caption: "GenAI, RAG y agentes con evaluación", ids: ["m9", "m10", "m11"] },
    { title: "Sistemas de producción", caption: "Fiabilidad, seguridad y diseño de sistemas", ids: ["m12", "m13"] },
    { title: "Negocio e inglés", caption: "Habilidades transversales durante toda la ruta", ids: ["m14"] }
  ];
  function roadmapSummary() {
    const items = MODULES.flatMap(allTopics).filter(t => !topicData(t.key).hidden);
    const n = counts(items);
    const next = items.find(t => t.priority === "CORE" && topicStatus(t.key) < 2) || items.find(t => topicStatus(t.key) < 3);
    const stage = ROADMAP_STAGES.find(s => s.ids.some(id => MODULES.some(m => m.id === id && allTopics(m).some(t => !topicData(t.key).hidden && t.priority === "CORE" && topicStatus(t.key) < 2)))) || ROADMAP_STAGES[ROADMAP_STAGES.length - 1];
    return { total: n.total, practiced: n.practiced, mastered: n.mastered, percent: n.total ? Math.round(n.weight / (n.total * 3) * 100) : 0, next: next ? topicData(next.key).label || next.title : "Consolidar evidencias", stage: stage.title };
  }
  function renderRoadmap() {
    const target = document.getElementById("competencyRoadmap");
    if (!target || !api) return;
    const summary = roadmapSummary();
    target.innerHTML = '<div class="tc-roadmap-intro"><div><span>Avance de la matriz</span><strong>' + summary.percent + '%</strong><small>' + summary.practiced + ' practicadas · ' + summary.mastered + ' dominadas · ' + summary.total + ' activas</small></div><div><span>Foco recomendado</span><strong>' + esc(summary.next) + '</strong><small>Etapa: ' + esc(summary.stage) + '</small></div><button type="button" data-go-view="habilidades">Actualizar Habilidades →</button></div>' +
      '<div class="tc-roadmap-stages">' + ROADMAP_STAGES.map((stage, index) => {
        const modules = stage.ids.map(id => MODULES.find(m => m.id === id)).filter(Boolean);
        const topics = modules.flatMap(allTopics).filter(t => !topicData(t.key).hidden);
        const c = counts(topics);
        const pct = c.total ? Math.round(c.weight / (c.total * 3) * 100) : 0;
        return '<article class="tc-roadmap-stage"><div class="tc-stage-head"><span>ETAPA ' + (index + 1) + '</span><h3>' + esc(stage.title) + '</h3><p>' + esc(stage.caption) + '</p><div class="tc-progress-track"><i style="width:' + pct + '%"></i></div><small>' + pct + '% · ' + c.practiced + ' practicadas / ' + c.total + ' competencias</small></div><div class="tc-stage-modules">' + modules.map(m => {
          const mc = counts(allTopics(m));
          const mp = mc.total ? Math.round(mc.weight / (mc.total * 3) * 100) : 0;
          const next = allTopics(m).find(t => !topicData(t.key).hidden && t.priority === "CORE" && topicStatus(t.key) < 2);
          return '<div class="tc-stage-module"><div><b>M' + m.id.slice(1).padStart(2, "0") + ' · ' + esc(m.title) + '</b><span>' + mp + '%</span></div><small>' + mc.practiced + ' practicadas · ' + mc.mastered + ' dominadas</small><p>' + (next ? 'Siguiente: ' + esc(topicData(next.key).label || next.title) : 'Siguiente: evidenciar dominio y aplicar el proyecto') + '</p><em>' + esc(m.sources) + '</em></div>';
        }).join("") + '</div></article>';
      }).join("") + '</div>';
  }
  function reviewDay() { return iso(new Date()); }
  function reviewWeekStart(offset) { return sundayOf(addDays(dateAtNoon(reviewDay()), offset * 7)); }
  function weeklyMetrics(start) {
    const end = addDays(start, 7);
    const days = Object.entries(state().daily || {}).filter(([key]) => { const d = dateAtNoon(key); return d >= start && d < end; }).map(([, day]) => day);
    const hours = days.reduce((s, day) => s + (day.tasks || []).reduce((x, t) => x + (Number(t.actual) || 0), 0), 0);
    const done = days.reduce((s, day) => s + (day.tasks || []).filter(t => t.done).length, 0);
    const total = days.reduce((s, day) => s + (day.tasks || []).length, 0);
    const from = iso(start), to = iso(end);
    const changes = (state().competencyHistory || []).filter(e => { const day = e.day || (e.at || "").slice(0, 10); return day >= from && day < to; });
    const practiced = changes.filter(e => e.from < 2 && e.to >= 2).length;
    const mastered = changes.filter(e => e.from < 3 && e.to === 3).length;
    return { hours: Math.round(hours * 10) / 10, done, total, practiced, mastered };
  }
  function renderReviews() {
    if (!api) return;
    const dailyRoot = document.getElementById("dailyReviewRoot");
    if (dailyRoot) {
      const key = reviewDay(); const review = (state().dailyReviews || {})[key] || {};
      const day = (state().daily || {})[key] || {};
      const tasks = day.tasks || [];
      dailyRoot.innerHTML = '<div class="tc-review-metrics"><div><strong>' + tasks.filter(t => t.done).length + '/' + tasks.length + '</strong><span>Tareas completadas</span></div><div><strong>' + (Math.round(tasks.reduce((s, t) => s + (Number(t.actual) || 0), 0) * 10) / 10) + ' h</strong><span>Estudio registrado</span></div><div><strong>' + (day.focus || '—') + '/5</strong><span>Enfoque</span></div></div><div class="tc-review-fields"><label>¿Qué avancé hoy?<textarea data-daily-review="progress" placeholder="Resultado o evidencia concreta">' + esc(review.progress || '') + '</textarea></label><label>¿Qué me bloqueó o debo corregir?<textarea data-daily-review="blocker" placeholder="Una observación útil">' + esc(review.blocker || '') + '</textarea></label><label>Primera acción del próximo bloque<textarea data-daily-review="next" placeholder="Una acción clara y realizable">' + esc(review.next || '') + '</textarea></label></div><p class="tc-review-note">Cierre rápido: 3 respuestas y una decisión. Las métricas vienen de Plan diario.</p>';
    }
    const weeklyRoot = document.getElementById("weeklyReviewRoot");
    if (weeklyRoot) {
      const start = reviewWeekStart(reviewWeekOffset), key = iso(start);
      const review = (state().weeklyReviews || {})[key] || {};
      const metric = weeklyMetrics(start);
      weeklyRoot.innerHTML = '<div class="tc-review-switch"><button type="button" data-review-week="-1"' + (reviewWeekOffset === -1 ? ' class="is-active"' : '') + '>Semana anterior</button><button type="button" data-review-week="0"' + (reviewWeekOffset === 0 ? ' class="is-active"' : '') + '>Semana actual</button></div><div class="tc-review-metrics"><div><strong>' + metric.hours + ' h</strong><span>Estudio registrado</span></div><div><strong>' + metric.done + '/' + metric.total + '</strong><span>Tareas completadas</span></div><div><strong>' + metric.practiced + '</strong><span>Nuevas competencias practicadas</span></div><div><strong>' + metric.mastered + '</strong><span>Nuevas competencias dominadas</span></div></div><div class="tc-review-fields"><label>Entregables y resultados<textarea data-weekly-review="results" placeholder="Qué quedó terminado y dónde está la evidencia">' + esc(review.results || '') + '</textarea></label><label>Aprendizaje más importante<textarea data-weekly-review="learning" placeholder="Qué ahora puedes explicar o aplicar">' + esc(review.learning || '') + '</textarea></label><label>Bloqueo y ajuste<textarea data-weekly-review="blocker" placeholder="Qué cambiarás para progresar">' + esc(review.blocker || '') + '</textarea></label><label>Prioridad para la próxima semana<textarea data-weekly-review="priority" placeholder="Competencia o entregable prioritario">' + esc(review.priority || '') + '</textarea></label><label>Carga y energía<textarea data-weekly-review="energy" placeholder="Qué mantener o reducir para sostener el ritmo">' + esc(review.energy || '') + '</textarea></label></div><p class="tc-review-note">El avance de competencias cuenta cambios realizados desde Habilidades. Los estados previos a esta versión permanecen intactos, pero no tienen historial retroactivo.</p>';
    }
  }
  function initReviews() {
    const dailyRoot = document.getElementById("dailyReviewRoot");
    const weeklyRoot = document.getElementById("weeklyReviewRoot");
    if (dailyRoot) dailyRoot.addEventListener("input", event => {
      const field = event.target.dataset.dailyReview; if (!field) return;
      const key = reviewDay(); const map = state().dailyReviews || (state().dailyReviews = {});
      (map[key] || (map[key] = {}))[field] = event.target.value; api.save();
    });
    if (weeklyRoot) {
      weeklyRoot.addEventListener("click", event => { const button = event.target.closest("[data-review-week]"); if (!button) return; reviewWeekOffset = Number(button.dataset.reviewWeek); renderReviews(); });
      weeklyRoot.addEventListener("input", event => {
        const field = event.target.dataset.weeklyReview; if (!field) return;
        const key = iso(reviewWeekStart(reviewWeekOffset)); const map = state().weeklyReviews || (state().weeklyReviews = {});
        (map[key] || (map[key] = {}))[field] = event.target.value; api.save();
      });
    }
    renderReviews();
  }
  function initCompetencies() {
    root = document.getElementById("competencyRoot");
    if (!root) return;
    root.innerHTML = '<div class="tc-path"><span>DATA SCIENCE CORE</span><i>→</i><span>ML ENGINEERING</span><i>→</i><span>AI ENGINEERING</span><i>→</i><span>PRODUCCIÓN</span></div>' +
      '<div class="tc-summary" id="tcCompetencySummary"></div><div class="tc-guidance"><strong>Una competencia, varias fuentes.</strong> AnyoneAI y Futura son la columna vertebral; Coursera y Udemy cubren brechas puntuales. La progresión es <b>No iniciado → Estudiado → Practicado → Dominado</b>. Aprender → recordar → practicar → explicar → English → quiz → corregir → repasar.</div>' +
      '<div class="tc-controls"><label>Buscar competencia<input id="tcSearch" type="search" placeholder="Ej. validación, RAG, inglés..."></label><label>Estado<select id="tcFilter"><option value="all">Todos</option><option value="todo">No iniciados</option><option value="active">En progreso</option><option value="mastered">Dominados</option></select></label><label class="tc-show-hidden"><input id="tcShowHidden" type="checkbox"> Mostrar ocultos</label></div><div id="tcModuleList" class="tc-modules"></div>';
    root.addEventListener("input", event => { if (event.target.id === "tcSearch") { search = event.target.value.trim().toLocaleLowerCase("es"); renderCompetencies(); } });
    root.addEventListener("change", event => {
      if (event.target.id === "tcFilter") { filter = event.target.value; renderCompetencies(); return; }
      if (event.target.id === "tcShowHidden") { showHidden = event.target.checked; renderCompetencies(); return; }
      const row = event.target.closest("[data-topic]");
      if (!row) return;
      const key = row.dataset.topic;
      const data = state().competencies[key] || (state().competencies[key] = {});
      if (event.target.matches("[data-topic-label]")) data.label = event.target.value.trim();
      if (event.target.matches("[data-topic-evidence]")) data.evidence = event.target.value.trim();
      if (event.target.matches("[data-topic-field]")) data[event.target.dataset.topicField] = event.target.value;
      if (event.target.matches("[data-master]")) data[event.target.dataset.master] = event.target.checked;
      if (event.target.matches("[data-topic-status]")) {
        const before = topicStatus(key);
        const desired = Number(event.target.value);
        if (desired === 3 && !masteryReady(data)) {
          data.status = 2;
          evidenceOpen.add(key);
          event.target.value = "2";
          alert("Para marcar Dominado, registra una evidencia concreta y confirma que puedes explicarlo, aplicarlo y resolver un problema sin tutorial.");
        } else data.status = desired;
        if (before !== data.status) {
          const history = state().competencyHistory || (state().competencyHistory = []);
          history.push({ key, from: before, to: data.status, day: iso(new Date()), at: new Date().toISOString() });
          if (history.length > 3000) history.splice(0, history.length - 3000);
        }
      }
      const lostMastery = data.status === 3 && !masteryReady(data);
      if (lostMastery) data.status = 2;
      api.save();
      if (lostMastery || event.target.matches("[data-topic-status],[data-topic-label]")) renderCompetencies();
    });
    root.addEventListener("click", event => {
      const row = event.target.closest("[data-topic]");
      if (!row) return;
      if (event.target.closest("[data-copy-quiz]")) {
        const moduleName = row.closest(".tc-module").querySelector(".tc-module-title strong").textContent;
        const topicName = row.querySelector("[data-topic-label]").value;
        const prompt = "Actúa como evaluador exigente de AI/ML Engineering. Módulo: " + moduleName + ". Tema: " + topicName + ". Hazme 5 preguntas avanzadas: 3 de razonamiento y 2 casos de aplicación o debugging. No reveles las respuestas todavía. Espera mis respuestas y luego corrige con rúbrica de 0 a 5, explica errores, dame una pregunta oral para explicar el tema y otra para responder en inglés. Termina proponiendo un repaso concreto y una mini evidencia práctica.";
        const button = event.target.closest("[data-copy-quiz]");
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt).then(() => { button.textContent = "Prompt copiado"; }, () => { promptFallback(prompt); });
        else promptFallback(prompt);
        return;
      }
      if (event.target.closest("[data-toggle-evidence]")) { const key = row.dataset.topic; const panel = row.querySelector(".tc-evidence-panel"); panel.hidden = !panel.hidden; if (panel.hidden) evidenceOpen.delete(key); else evidenceOpen.add(key); }
      if (event.target.closest("[data-remove-topic]")) {
        const key = row.dataset.topic;
        const custom = state().customCompetencies.find(x => x.id === key);
        if (custom) { if (!confirm("¿Eliminar esta competencia personalizada?")) return; state().customCompetencies = state().customCompetencies.filter(x => x.id !== key); delete state().competencies[key]; }
        else { state().competencies[key] = { ...topicData(key), hidden: !topicData(key).hidden }; }
        api.save(); renderCompetencies();
      }
    });
    root.addEventListener("submit", event => {
      const form = event.target.closest("[data-add-topic]"); if (!form) return;
      event.preventDefault();
      const title = form.elements.title.value.trim(); if (!title) return;
      state().customCompetencies.push({ id: "custom-" + Date.now() + "-" + Math.random().toString(16).slice(2), moduleId: form.dataset.addTopic, title, priority: form.elements.priority.value });
      api.save(); renderCompetencies();
    });
    renderCompetencies();
  }
  function promptFallback(prompt) { window.prompt("Copia este prompt para tu IA:", prompt); }

  function calendarOccurrence(event, date) {
    if (event.repeat === "weekly") return date >= event.date && dateAtNoon(date).getDay() === dateAtNoon(event.date).getDay();
    return event.date === date;
  }
  function visibleEvents(date) { return (state().calendarEvents || []).filter(event => calendarOccurrence(event, date) && timeToMinutes(event.end) > timeToMinutes(event.start)); }
  function categoryClass(category) { return "tc-cat-" + (CATEGORIES.indexOf(category) >= 0 ? CATEGORIES.indexOf(category) : 6); }
  function calendarEvent(event) {
    const start = timeToMinutes(event.start);
    const end = timeToMinutes(event.end);
    const top = Math.max(0, (start - START_HOUR * 60) / 60 * HOUR_HEIGHT);
    const height = Math.max(25, (Math.min(end, END_HOUR * 60) - Math.max(start, START_HOUR * 60)) / 60 * HOUR_HEIGHT - 2);
    if (end <= START_HOUR * 60 || start >= END_HOUR * 60) return "";
    return '<button type="button" class="tc-event ' + categoryClass(event.category) + '" data-event="' + esc(event.id) + '" style="top:' + top + 'px;height:' + height + 'px"><strong>' + esc(event.title) + '</strong><small>' + esc(event.start) + '–' + esc(event.end) + (event.repeat === "weekly" ? ' · ↻' : '') + '</small></button>';
  }
  function renderCalendar() {
    if (!calendarRoot) return;
    const scroller = calendarRoot.querySelector("#tcCalendarScroll");
    const oldScroll = scroller ? scroller.scrollTop : 3 * HOUR_HEIGHT;
    const days = Array.from({ length: 7 }, (_, i) => iso(addDays(weekStart, i)));
    const weekEnd = addDays(weekStart, 6);
    const dateFmt = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "short" });
    const dayFmt = new Intl.DateTimeFormat("es-PE", { weekday: "short" });
    const weeklyHours = days.reduce((sum, date) => sum + visibleEvents(date).reduce((s, e) => s + (timeToMinutes(e.end) - timeToMinutes(e.start)) / 60, 0), 0);
    calendarRoot.querySelector("#tcWeekLabel").textContent = dateFmt.format(weekStart) + " – " + dateFmt.format(weekEnd) + " " + weekEnd.getFullYear();
    calendarRoot.querySelector("#tcWeekHours").textContent = weeklyHours.toFixed(1).replace(".0", "") + " h en bloques";
    const header = '<div class="tc-timezone">GMT-05</div>' + days.map(date => '<button type="button" class="tc-day-head' + (date === iso(new Date()) ? ' is-today' : '') + '" data-select-date="' + date + '"><small>' + dayFmt.format(dateAtNoon(date)).toUpperCase() + '</small><strong>' + dateAtNoon(date).getDate() + '</strong></button>').join("");
    const timeLabels = '<div class="tc-time-labels">' + Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => '<span style="top:' + Math.max(2, i * HOUR_HEIGHT - 7) + 'px">' + String(START_HOUR + i).padStart(2, "0") + ':00</span>').join("") + '</div>';
    const cols = days.map(date => {
      const now = new Date(); const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const currentLine = date === iso(now) && nowMinutes >= START_HOUR * 60 && nowMinutes <= END_HOUR * 60 ? '<div class="tc-now-line" style="top:' + ((nowMinutes - START_HOUR * 60) / 60 * HOUR_HEIGHT) + 'px"></div>' : "";
      return '<div class="tc-day-column" data-calendar-date="' + date + '">' + visibleEvents(date).map(calendarEvent).join("") + currentLine + '</div>';
    }).join("");
    calendarRoot.querySelector("#tcCalendarHeaders").innerHTML = header;
    calendarRoot.querySelector("#tcCalendarScroll").innerHTML = '<div class="tc-week-body">' + timeLabels + cols + '</div>';
    calendarRoot.querySelector("#tcCalendarScroll").scrollTop = oldScroll;
  }
  function openEvent(event, date, start) {
    const dialog = calendarRoot.querySelector("#tcEventDialog");
    const form = dialog.querySelector("form");
    form.reset();
    form.elements.id.value = event ? event.id : "";
    form.elements.title.value = event ? event.title : "";
    form.elements.date.value = event ? event.date : date || iso(new Date());
    form.elements.start.value = event ? event.start : start || "08:30";
    form.elements.end.value = event ? event.end : minutesToTime(Math.min(timeToMinutes(start || "08:30") + 60, END_HOUR * 60));
    form.elements.category.value = event ? event.category : "AnyoneAI";
    form.elements.repeat.checked = event ? event.repeat === "weekly" : false;
    form.elements.notes.value = event ? event.notes || "" : "";
    dialog.querySelector("#tcDeleteEvent").hidden = !event;
    dialog.querySelector("#tcDialogTitle").textContent = event ? "Editar bloque" : "Nuevo bloque";
    dialog.showModal();
  }
  function initCalendar() {
    calendarRoot = document.getElementById("calendarRoot"); if (!calendarRoot) return;
    weekStart = sundayOf(dateAtNoon(iso(new Date())));
    calendarRoot.innerHTML = '<div class="tc-calendar"><div class="tc-calendar-toolbar"><div><span class="tc-kicker">Calendario semanal</span><h3>Diseña tus bloques de tiempo</h3><p>Haz clic en una franja para crear un bloque. El plan y las horas reales se gestionan abajo.</p></div><div class="tc-calendar-actions"><button type="button" data-calendar-nav="today">Hoy</button><button type="button" data-calendar-nav="prev" aria-label="Semana anterior">‹</button><button type="button" data-calendar-nav="next" aria-label="Semana siguiente">›</button><strong id="tcWeekLabel"></strong><span id="tcWeekHours"></span><button class="tc-add-event" type="button" id="tcAddEvent">+ Bloque</button></div></div><div class="tc-calendar-legend">' + CATEGORIES.map(c => '<span class="' + categoryClass(c) + '">' + esc(c) + '</span>').join("") + '</div><div class="tc-calendar-overflow"><div class="tc-calendar-headers" id="tcCalendarHeaders"></div><div class="tc-calendar-scroll" id="tcCalendarScroll"></div></div><p class="tc-calendar-note">Los datos se guardan en este navegador. Usa Exportar/Importar para trasladarlos a otro dispositivo o a GitHub Pages.</p></div>' +
      '<dialog class="tc-dialog" id="tcEventDialog"><form method="dialog" id="tcEventForm"><div class="tc-dialog-head"><h3 id="tcDialogTitle">Nuevo bloque</h3><button type="button" id="tcCloseDialog" aria-label="Cerrar">×</button></div><input name="id" type="hidden"><label>Actividad<input name="title" maxlength="100" required placeholder="Ej. AnyoneAI: evaluación de modelos"></label><div class="tc-dialog-grid"><label>Fecha<input name="date" type="date" required></label><label>Categoría<select name="category">' + CATEGORIES.map(c => '<option>' + esc(c) + '</option>').join("") + '</select></label><label>Inicio<input name="start" type="time" required></label><label>Fin<input name="end" type="time" required></label></div><label class="tc-repeat"><input name="repeat" type="checkbox"> Repetir cada semana desde esta fecha</label><label>Nota breve<textarea name="notes" rows="2" placeholder="Objetivo o resultado esperado"></textarea></label><div class="tc-dialog-actions"><button type="button" class="tc-delete" id="tcDeleteEvent">Eliminar</button><button type="submit" class="tc-save">Guardar bloque</button></div></form></dialog>';
    calendarRoot.addEventListener("click", event => {
      const nav = event.target.closest("[data-calendar-nav]");
      if (nav) { const action = nav.dataset.calendarNav; weekStart = action === "today" ? sundayOf(new Date()) : addDays(weekStart, action === "prev" ? -7 : 7); renderCalendar(); return; }
      if (event.target.closest("#tcAddEvent")) { openEvent(null, iso(new Date()), "08:30"); return; }
      const eventButton = event.target.closest("[data-event]");
      if (eventButton) { openEvent(state().calendarEvents.find(x => x.id === eventButton.dataset.event)); return; }
      const dayHead = event.target.closest("[data-select-date]");
      if (dayHead) { const planner = document.getElementById("plannerDate"); planner.value = dayHead.dataset.selectDate; planner.dispatchEvent(new Event("change", { bubbles: true })); return; }
      const col = event.target.closest("[data-calendar-date]");
      if (col) { const rect = col.getBoundingClientRect(); const y = event.clientY - rect.top; const minutes = Math.max(START_HOUR * 60, Math.min(END_HOUR * 60 - 60, START_HOUR * 60 + Math.floor(y / (HOUR_HEIGHT / 2)) * 30)); openEvent(null, col.dataset.calendarDate, minutesToTime(minutes)); }
    });
    const dialog = calendarRoot.querySelector("#tcEventDialog");
    calendarRoot.querySelector("#tcCloseDialog").addEventListener("click", () => dialog.close());
    calendarRoot.querySelector("#tcDeleteEvent").addEventListener("click", () => {
      const id = dialog.querySelector('[name="id"]').value;
      if (!id || !confirm("¿Eliminar este bloque? Si se repite, se eliminará toda la serie.")) return;
      state().calendarEvents = state().calendarEvents.filter(item => item.id !== id);
      api.save(); dialog.close(); renderCalendar();
    });
    calendarRoot.querySelector("#tcEventForm").addEventListener("submit", event => {
      event.preventDefault();
      const form = event.target;
      const start = form.elements.start.value;
      const end = form.elements.end.value;
      if (timeToMinutes(end) <= timeToMinutes(start)) { alert("La hora de fin debe ser posterior al inicio."); return; }
      const item = { id: form.elements.id.value || "block-" + Date.now() + "-" + Math.random().toString(16).slice(2), title: form.elements.title.value.trim(), date: form.elements.date.value, start, end, category: form.elements.category.value, repeat: form.elements.repeat.checked ? "weekly" : "none", notes: form.elements.notes.value.trim() };
      if (!item.title) return;
      const index = state().calendarEvents.findIndex(x => x.id === item.id);
      if (index >= 0) state().calendarEvents[index] = item; else state().calendarEvents.push(item);
      weekStart = sundayOf(dateAtNoon(item.date));
      api.save(); dialog.close(); renderCalendar();
    });
    renderCalendar();
  }

  window.TrainerExtensions = {
    init(config) { api = config; initCompetencies(); initCalendar(); initReviews(); if (api.refreshDashboard) api.refreshDashboard(); },
    render() { if (!api) return; renderCompetencies(); renderCalendar(); renderReviews(); },
    refreshViews() { if (!api) return; renderRoadmap(); renderReviews(); },
    summary() { return api ? roadmapSummary() : null; }
  };
})();
