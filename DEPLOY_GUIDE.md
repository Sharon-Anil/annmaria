# Deployment Guide: Ann Maria Boutique

This guide explains how to deploy your boutique application so anyone can access it online. We will use **Render** for the backend and **Vercel** for the frontend.

## Prerequisites
- Your code is already pushed to [GitHub](https://github.com/Sharon-Anil/annmaria).
- Create a free account on [Render](https://render.com/) and [Vercel](https://vercel.com/).

---

## Part 1: Deploy the Backend (Render)

1.  **Log in to Render** and click **New +** > **Web Service**.
2.  **Connect your GitHub** account and select the `annmaria` repository.
3.  **Configure the Service**:
    - **Name**: `annmaria-backend`
    - **Root Directory**: `server`
    - **Environment**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node index.js`
4.  **Environment Variables**:
    - Click **Advanced** > **Add Environment Variable**.
    - Add `PORT` with value `10000` (Render's default).
5.  **Deploy**: Click **Create Web Service**.
6.  **Find your URL**: Once deployed, Render will give you a URL like `https://annmaria-backend.onrender.com`. **Copy this URL.**

---

## Part 2: Deploy the Frontend (Vercel)

1.  **Log in to Vercel** and click **Add New** > **Project**.
2.  **Import your GitHub** repository `annmaria`.
3.  **Configure the Framework**:
    - Select **Vite** as the Framework Preset.
    - **Root Directory**: `client`
4.  **Environment Variables**:
    - Add a variable named **`VITE_API_BASE_URL`**.
    - Set the value to your **Render Backend URL** (e.g., `https://annmaria-backend.onrender.com`).
5.  **Deploy**: Click **Deploy**.

---

## Local Updates
To push updates later:
`git add .`
`git commit -m "Your changes"`
`git push origin main`
