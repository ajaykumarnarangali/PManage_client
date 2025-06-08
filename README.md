
## ✅ Requirements

- [Node.js](https://nodejs.org/) (v16 or later)
- npm or yarn
- Backend API running (refer: [`product-api`](https://github.com/your-username/product-api))

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-product-catalog.git
cd dirname

## Install Dependencies
npm install

## 🔁 Proxy Setup for API (Vite)

If you're running the frontend and backend on different ports (e.g., React on 5173 and Node.js API on 3000), configure Vite to **proxy API requests** to the backend.

### 🔧 Edit `vite.config.js`

Update your Vite config like this:

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 🔁 Your backend API URL
      },
    },
  },
};


##startfile
npm run dev
