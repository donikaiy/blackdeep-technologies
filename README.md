# User Registration Form

This project involves creating a multi-step user registration form designed to assess understanding of fundamental front-end development principles, including React, TypeScript, form handling, validation, and component-based architecture.

The application guides users through a two-step registration process:
1.  **Step 1:** Collects user's names, password (with confirmation), and interests (max 2, loaded from a mock service).
2.  **Step 2:** Allows the user to upload an avatar image.

The project emphasizes the use of modern front-end technologies and best practices.

---

## ✨ Key Features

* **Multi-Step Form:** Intuitive two-step registration flow.
* **Comprehensive Input Fields:**
    * First Name & Last Name
    * Password with Confirmation
    * Multiple Choice Interests (max 2, dynamically loaded)
    * Avatar Image Upload
* **Client-Side Validation:** Robust validation for all fields using `Zod` and `react-hook-form`.
* **Mock API Integration:**
    * Interests are fetched from a mock JSON service.
    * Form submission is handled by a mock endpoint.
* **Reusable Components:** UI built with a focus on modular and reusable React components using Chakra UI.
* **TypeScript:** Entire codebase written in TypeScript for type safety and improved developer experience.

---

## 🛠️ Tech Stack Requirements

This project is built using the following technologies as per the task requirements:

* **Core:**
    * React (v19+)
    * TypeScript (~v5.8.3)
    * Vite (as the build tool and dev server)
* **Form Handling & Validation:**
    * React Hook Form (v7.56+)
    * Zod (v3.25+) for schema-based validation
    * `@hookform/resolvers` for integrating Zod with React Hook Form
* **UI & Styling:**
    * Chakra UI (v3.19+)
    * `@emotion/react` (peer dependency for Chakra UI)
* **Utilities & Others:**
    * `react-icons` for iconography.
    * `resize-observer-polyfill` for broader browser compatibility with resize observations.
* **Development & Testing:**
    * ESLint for code linting.
    * Vitest for unit/integration testing.
    * `@testing-library/react` for component testing.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js:** Ensure you have Node.js installed (v18.x or later is recommended). You can download it from [nodejs.org](https://nodejs.org/).
* **npm or yarn:** npm is included with Node.js. Alternatively, you can use yarn.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <github-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Running the Application Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command will start the Vite development server. By default, the application will be accessible at `http://localhost:5173` (or the next available port).

2.  Open your web browser and navigate to the local URL provided in the terminal.

---

## 📜 Available Scripts

In the project directory, you can run the following scripts:

* **`npm run dev`**:
  Starts the application in development mode with hot-reloading using Vite.

* **`npm run build`**:
  Builds the application for production. This includes TypeScript compilation (`tsc -b`) followed by Vite's build process. The optimized static assets will be output to the `dist/` directory.

* **`npm run lint`**:
  Lints the codebase using ESLint to identify and report on patterns in the code, ensuring code quality and consistency.

* **`npm run preview`**:
  Serves the production build from the `dist/` directory locally. This is useful for testing the production build before deployment.

* **Running Tests (using Vitest):**
  While not explicitly in the `scripts` section of your `package.json`, you can run tests using Vitest directly:
    ```bash
    npx vitest
    ```
  Or, you can add a script to your `package.json`:
    ```json
    "scripts": {
        ...
        "test": "vitest"
    }
    ```
  And then run:
    ```bash
    npm test
    ```

---

## 📂 Project Structure Overview

The project's directory structure is organized as follows to promote modularity and maintainability:

**Key Directories:**

* **`public/`**: Contains static assets that are not processed by the build tool (Vite). These are typically files like `favicon.ico` or `robots.txt`.
* **`src/`**: This is the heart of the application and contains all the source code.
    * **`src/assets/`**: For static assets like images or custom fonts that are imported directly into the components.
    * **`src/components/`**: Houses all reusable React components. Each component or logical group of components often resides in its own subdirectory (e.g., `AvatarImage`, `Input`).
        * **`src/components/ui/`**: Can be used for very generic, low-level UI primitive components if you build any beyond what Chakra UI offers.
    * **`src/data/`**: Contains mock data or files related to simulating API services. `interestsCollection.ts` is an example, likely holding the array of interests.
    * **`src/testing/`**: Dedicated to test files. It's good practice to mirror the structure of the `src/` directory for components or modules being tested. `render.tsx` likely contains a custom render function for tests, possibly wrapping components with necessary providers (like ChakraProvider).
    * **`src/validation/`**: Holds the Zod validation schemas. `registrationSchema.tsx` defines the validation rules for the registration form.
    * **`App.css`**: For any global CSS styles or overrides. With Chakra UI, this file might be minimal.
    * **`App.tsx`**: Typically the root React component of your application, where you might set up routing, global context providers, and the main layout.
    * **`main.tsx`**: The entry point of the React application. This is where `ReactDOM.createRoot()` is called to render the `App` component into the `index.html`.
* **Root Directory Files**:
    * `.eslintrc.cjs`: Configuration for ESLint, the code linter.
    * `.gitignore`: Tells Git which files or directories to ignore.
    * `index.html`: The main HTML page that Vite uses to inject bundled JavaScript.
    * `package.json`: Lists project dependencies, scripts, and other metadata.
    * `README.md`: This documentation file.
    * `tsconfig.json` & `tsconfig.node.json`: TypeScript compiler configuration files.
    * `vite.config.ts`: Configuration file for Vite, the build tool and development server.

This structure promotes a clear separation of concerns, making the codebase easier to understand, navigate, and maintain.

---

## 📝 Important Notes & Comments

* **Mock Services:** The "Interests" data and form submission endpoint are mocked within the client-side application (`src/data/`). In a real-world scenario, these would be actual API calls to a backend server.
* **Component Reusability:** Emphasis has been placed on creating reusable UI components (found in `src/components/`) to ensure a DRY (Don't Repeat Yourself) codebase and maintainable UI.
* **Schema-Driven Validation:** Form validation is robustly handled using `Zod` schemas, ensuring data integrity before any mock "submission". This approach is declarative and easy to maintain.
* **UI Library:** Chakra UI is utilized for its comprehensive set of accessible and themeable components, speeding up UI development.
* **Git Commits:** As per the task requirements, development progress was tracked with at least 10 meaningful Git commits.

---

