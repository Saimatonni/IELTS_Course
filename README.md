# IELTS Course Page 

---

### 🔗 Live Demo

👉 [View the deployed version here](https://your-deployed-link.vercel.app/)

---

### 🛠️ Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Package Manager:** npm
- **Deployment:** Vercel
- **Optional:** Docker (for containerized environments)

---

### 🚀 How to Run Locally

#### 🔧 Prerequisites

- Node.js (v18+)
- npm or yarn

#### ▶️ Run without Docker

```bash
# Clone the repo
git clone https://github.com/your-username/10min_frontend.git
cd 10min_frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start

#### 🐳 Run with Docker (Optional)

```bash
# Dockerfile is included for containerized builds.

# 🛠 Build the Docker image
docker build -t my-next-app .
# ▶️ Run the Docker container
docker run -p 3000:3000 my-next-app

# Then visit: http://localhost:3000