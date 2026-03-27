# ThumbStudio — Architect V4.1

Gerador de blueprints e imagens para thumbnails do YouTube com IA.

## 🚀 Deploy no GitHub Pages

### 1. Crie o repositório

Crie um repositório público no GitHub chamado `thumb-studio` (ou o nome que preferir).

### 2. Ajuste o nome do repositório no Vite

Abra `vite.config.js` e troque `thumb-studio` pelo nome exato do seu repositório:

```js
base: '/SEU_REPOSITORIO/',
```

### 3. Suba os arquivos

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### 4. Ative o GitHub Pages

No GitHub: **Settings → Pages → Source → GitHub Actions**

A partir daí, qualquer push na branch `main` faz o deploy automático.

### 5. Acesse o site

```
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
```

---

## 💻 Rodar localmente

```bash
npm install
npm run dev
```
