# Project: Open Notebook Learning Environment
**Working name:** Open Notebook Learning Extension  
**Project type:** Open-source application customisation and extension  
**Primary platform:** Open Notebook  
**Primary AI provider:** OpenAI API  
**Deployment:** Self-hosted Docker environment  
**Development approach:** Custom fork with modular frontend and backend extensions

---

# 1. Project Overview

## 1.1 Description

The project aims to develop an enhanced version of Open Notebook that transforms its existing AI-powered research and note-taking environment into an interactive learning and teaching platform.

The primary objective is to replicate and extend the educational capabilities experienced when using ChatGPT, particularly its ability to explain complex concepts, generate visualisations, construct interactive learning materials and deliver contextual explanations within a conversation.

The platform will use OpenAI models as its underlying intelligence, while introducing a custom visualisation and interactive content-rendering architecture that allows AI-generated educational components to appear directly within the existing chat interface.

Rather than treating visualisations as separate images or external applications, the system will support structured, interactive components embedded naturally within AI responses.

The resulting application should provide a unified learning environment where explanations, mathematical notation, charts, diagrams, code execution and interactive exercises coexist within a single conversational interface.

## 1.2 Primary Objectives

1. Extend Open Notebook's existing conversational interface to support interactive educational content.
2. Introduce an AI-controlled visualisation engine capable of generating mathematical, statistical and financial visualisations.
3. Support interactive components such as sliders, adjustable parameters, dynamic graphs and mathematical demonstrations.
4. Integrate visualisations directly into conversational responses rather than relying on external applications.
5. Establish a reusable component architecture that can support multiple academic disciplines.
6. Preserve existing Open Notebook functionality, including notebooks, sources, notes, AI models and document management.
7. Maintain compatibility with self-hosted Docker deployment and existing database infrastructure.
8. Create a modular and maintainable codebase that can be updated alongside upstream Open Notebook development.

---

# 2. Core System Architecture

The application will extend the existing Open Notebook architecture rather than replace its underlying functionality.

The system will introduce a dedicated visualisation layer that communicates with the AI orchestration system and the frontend rendering environment.

### 2.1 Existing Infrastructure

Retain the existing Open Notebook components wherever possible:

- Frontend: Next.js / React
- Backend: Python / FastAPI
- AI orchestration: LangGraph
- Database: SurrealDB
- AI provider: OpenAI API
- Deployment: Docker

### 2.2 New Components

**A. Visualisation Engine**

A backend service responsible for interpreting structured visualisation requests and generating the data required to render educational components.

Responsibilities:
- Mathematical calculations.
- Statistical computations.
- Distribution generation.
- Financial modelling.
- Chart data preparation.
- Validation of visualisation parameters.

Proposed libraries:
- NumPy
- SciPy
- Pandas
- Matplotlib
- Plotly

**B. Interactive Component Library**

A frontend library containing reusable educational components.

Responsibilities:
- Render interactive graphs and charts.
- Display mathematical notation.
- Support parameter manipulation.
- Provide dynamic demonstrations.
- Display probability regions and statistical annotations.
- Support interactive educational exercises.

Proposed technologies:
- React
- TypeScript
- Plotly.js
- KaTeX or MathJax
- Custom SVG components
- HTML/CSS

**C. AI Visualisation Interface**

A tool-calling interface that allows the AI model to request specific visualisations as part of its response.

The model should be able to:
1. Identify when a visualisation would improve an explanation.
2. Select an appropriate visualisation type.
3. Supply the required parameters.
4. Request the backend to generate the necessary data.
5. Return a structured visualisation component to the frontend.

The model should not need to generate arbitrary frontend code for each graph.

**D. Conversational Rendering Layer**

Modify the existing chat response renderer to support multiple content types within a single response.

Supported content should include:
- Markdown and formatted text.
- Mathematical notation.
- Static images.
- Interactive graphs.
- Diagrams.
- Code blocks and execution results.
- Interactive educational exercises.

---

# 3. Functional Requirements

## 3.1 Mathematical Visualisation

The platform should support:

- Cartesian coordinate systems.
- Function plotting.
- Normal distributions.
- Standard normal distributions.
- Probability density functions.
- Cumulative distribution functions.
- Probability mass functions.
- Histograms.
- Scatter plots.
- Regression lines.
- Derivatives and tangent lines.
- Integration and area-under-curve demonstrations.
- Mathematical transformations.

## 3.2 Interactive Statistical Visualisation

Users should be able to manipulate parameters and observe changes dynamically.

Examples:

**Normal Distribution**
- Adjust mean.
- Adjust standard deviation.
- Change the observed variable.
- Display corresponding Z-scores.
- Highlight probability intervals.
- Compare multiple distributions.

**Probability**
- Adjust event probabilities.
- Visualise conditional probability.
- Display probability trees.
- Demonstrate intersections and unions.
- Explore distributions through interactive controls.

**Statistical Analysis**
- Change dataset parameters.
- Observe correlation changes.
- Adjust regression models.
- Visualise variance and standard deviation.
- Explore sampling distributions.

## 3.3 Financial Mathematics

The system should eventually support:

- Binomial option pricing trees.
- Black-Scholes option pricing.
- Stock price simulations.
- Geometric Brownian motion.
- Portfolio return distributions.
- Risk and volatility visualisations.
- Order book visualisations.
- Bid/ask spread and market depth.
- Financial time-series analysis.

## 3.4 Interactive Educational Components

Beyond charts, the component library should support:

- Adjustable mathematical equations.
- Interactive sliders.
- Dynamic numerical outputs.
- Step-by-step worked solutions.
- Annotated diagrams.
- Knowledge checks.
- Multiple-choice exercises.
- Interactive demonstrations.

## 3.5 Code Execution and Computational Learning

Introduce the ability to execute selected code examples within a controlled environment.

Initial focus:
- Python.
- NumPy.
- Pandas.
- SciPy.
- Matplotlib.

Execution should be isolated from the main application and subject to resource and security restrictions.

---

# 4. AI Integration and Behaviour

The OpenAI model should remain responsible for understanding the user's request and deciding how to respond.

The visualisation engine should act as a specialised capability available to the AI.

### 4.1 Tool-Calling Architecture

Introduce structured tools such as:

- `create_visualization`
- `calculate_distribution`
- `plot_function`
- `create_probability_diagram`
- `execute_python`

Each tool should have a defined schema, validated parameters and predictable output.

### 4.2 Visualisation Decision-Making

The AI should be instructed to consider whether visual content would materially improve its explanation.

Examples:

| User request | Appropriate output |
|---|---|
| Explain standard deviation | Distribution graph |
| Explain Z-scores | Normal curve with marked Z-values |
| Explain probability intersections | Venn diagram |
| Explain differentiation | Function and tangent-line graph |
| Explain binomial pricing | Binomial tree |
| Explain correlation | Scatter plot with regression line |

Visualisations should not be generated unnecessarily for simple factual questions.

### 4.3 Response Composition

A single AI response should be capable of containing multiple components.

For example:

1. Written explanation.
2. Mathematical equation.
3. Interactive normal distribution.
4. Worked numerical example.
5. Follow-up knowledge check.

The response renderer must preserve the intended ordering of these components.

---

# 5. Technical Development Strategy

## Phase 1: Repository and Architecture Assessment

- Clone the official Open Notebook repository.
- Establish a local development environment.
- Identify frontend chat components.
- Identify backend AI orchestration workflows.
- Understand how streaming responses are handled.
- Identify existing model tool-calling capabilities.
- Document database dependencies.
- Establish a clean development baseline.

**Deliverable:** Technical architecture document and functioning local development installation.

## Phase 2: Visualisation Prototype

Develop an independent prototype to validate the visualisation architecture.

Initial components:
- Normal distribution.
- Standard normal distribution.
- Z-score demonstration.
- Probability density function.
- Interactive mean and standard deviation controls.

Validate the output using known mathematical results.

**Deliverable:** Working visualisation component library and backend calculation interface.

## Phase 3: AI Tool Integration

Integrate the visualisation engine into the existing AI orchestration architecture.

Requirements:
- Structured tool definitions.
- AI tool selection.
- Parameter validation.
- Backend execution.
- Structured response output.
- Error handling.
- Streaming compatibility.

**Deliverable:** AI can request and generate visualisations in response to natural-language questions.

## Phase 4: Frontend Integration

Modify the existing chat interface to render visualisations inline.

Requirements:
- Extend the response renderer.
- Introduce reusable visualisation components.
- Support mixed text and interactive content.
- Preserve conversation history.
- Support responsive layouts.
- Handle loading and error states.

**Deliverable:** Fully integrated visualisation experience inside Open Notebook.

## Phase 5: Educational Component Expansion

Expand the component library beyond mathematical graphs.

Introduce:
- Probability diagrams.
- Interactive equations.
- Statistical demonstrations.
- Financial mathematics components.
- Knowledge checks.
- Code execution and output rendering.

**Deliverable:** General-purpose interactive educational component library.

## Phase 6: Deployment and Upstream Compatibility

- Build a custom Docker image.
- Maintain separate development and production environments.
- Preserve existing SurrealDB data.
- Test existing notebook functionality.
- Implement version tracking against upstream Open Notebook.
- Document deployment and rollback procedures.

**Deliverable:** Production-ready customised Open Notebook installation.

---

# 6. Non-Functional Requirements

## Performance
- Avoid unnecessary backend requests.
- Cache reusable calculations where appropriate.
- Keep interactive controls responsive.
- Support asynchronous generation of complex visualisations.

## Security
- Validate all AI-generated parameters.
- Never execute arbitrary AI-generated frontend code.
- Sandbox Python execution.
- Restrict resource consumption.
- Keep API keys server-side.

## Maintainability
- Modular frontend components.
- Independent calculation modules.
- Typed API contracts.
- Versioned visualisation schemas.
- Automated tests.
- Clear separation between upstream and custom modifications.

## Compatibility
- Existing Open Notebook functionality must remain operational.
- Existing notebooks and sources must remain accessible.
- Existing AI providers should not be unnecessarily restricted.
- Custom functionality should work across supported desktop and mobile interfaces.

---

# 7. Initial Technology Stack

| Layer | Technology |
|---|---|
| AI | OpenAI API |
| AI orchestration | Existing LangGraph architecture |
| Frontend | Next.js / React |
| Language | TypeScript |
| Backend | Python / FastAPI |
| Mathematical computation | NumPy / SciPy |
| Data processing | Pandas |
| Interactive graphs | Plotly.js |
| Static graphs | Matplotlib |
| Mathematical notation | KaTeX |
| Diagrams | SVG / React components |
| Database | Existing SurrealDB |
| Deployment | Docker |

The existing Open Notebook stack should be reused wherever practical.

---

# 8. Initial MVP Scope

The first release should remain deliberately narrow.

The objective is to prove that the AI can generate useful interactive visualisations and display them naturally within its own conversation interface.

### MVP requirements

1. Local Open Notebook development environment.
2. One integrated interactive graph component.
3. AI tool capable of requesting a graph.
4. Structured visualisation data.
5. Inline chat rendering.
6. Adjustable parameters.
7. Mathematical annotations.
8. Conversation persistence.
9. Custom Docker deployment.

### Initial demonstration

A user asks:

"Explain how changing the standard deviation affects a normal distribution."

The AI responds with an explanation and an interactive graph.

The user can:
- Adjust the mean.
- Adjust the standard deviation.
- Change the observed X value.
- Observe the corresponding Z-score.
- See the distribution curve update.
- Compare the resulting distributions.

This will serve as the initial proof of concept.

---

# 9. Long-Term Vision

The long-term objective is to establish an extensible AI learning environment that combines conversational intelligence, mathematical computation, interactive visualisation and structured educational content.

Although the initial implementation will focus on quantitative finance and mathematical learning, the architecture should remain subject-independent.

Potential future applications include:
- Mathematics and statistics.
- Computer science.
- Financial engineering.
- Machine learning.
- Economics.
- Physics.
- Data science.

The platform should ultimately allow an AI tutor to move naturally between explaining, calculating, demonstrating, visualising and testing a learner's understanding, all within one continuous conversation.