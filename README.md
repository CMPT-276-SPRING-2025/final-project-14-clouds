#  2cents

## Brief Description
This project is a web-based personal financial advisor designed to help users track income and expenses while improving financial literacy through interactive tools. It addresses the widespread lack of financial knowledge, which contributes to debt, insufficient savings, and financial stress. By integrating APIs and a user-friendly design, the app provides budgeting, expense tracking, and goal-setting features tailored to various user groups, including young adults, professionals, families, low-income individuals, and newcomers. It fills a market gap by combining financial tracking with accessible education, empowering users to make informed financial decisions.

---

# Node Environment Setup

Make sure you are using **Node.js v22.14.0**

```bash
# Step 1: Check the Node version
node -v

# Step 2: If the version is not v22.14.0, install it using nvm
nvm install 22.14.0

# Step 3: Use the installed version
nvm use 22.14.0

# Step 4: Confirm you're now using v22.14.0
node -v
```
###
### Step 1: Clone the Repository
```bash
git clone https://github.com/CMPT-276-SPRING-2025/final-project-14-clouds.git

# CD to directory
cd final-project-14-clouds
```
### Step 2: Change CORS settings in src/backend/server.js

```js
# Replace:
app.use(cors({
   origin: "https://final-project-14-clouds-1.onrender.com",
   methods: "GET,POST",
   credentials: true,
}));
```
```js
# With:
app.use(cors({
   origin: ["https://final-project-14-clouds-1.onrender.com", "http://localhost:5173"],
   methods: "GET,POST",
   credentials: true,
}));
```

### Step 3: Start the backend
```bash
cd src/backend
npm install
npm start
```

### Step 4: Open a new terminal and start the frontend
```bash
cd src/frontend
npm install
npm run dev
```

### Step 5: Open the link shown in the frontend terminal (usually http://localhost:5173)

### Step 6: When finished, use Ctrl + C in both terminals to stop the backend and frontend servers

# Run Tests

## Frontend Tests:

### Step 1: Open a new terminal

### Step 2: Navigate to frontend
```bash
cd src/frontend
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Run tests
```bash
npm test
```

## Backend Tests:

### Step 1: Open a new terminal
### Step 2: Navigate to backend
```bash
cd src/backend
```
### Step 3: Install dependencies
```bash
npm install
```
### Step 4: Run tests
```bash
npm test
```