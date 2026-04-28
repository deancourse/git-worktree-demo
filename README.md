# SalesPilot CRM — 官網首頁

> 一站式業務管理平台，助你掌控銷售線、提升成交率。

## 🚀 Tech Stack
test

- **React 18** + **Vite 6**
- Vanilla CSS（CSS Custom Properties 設計系統）
- Google Fonts（Inter + Noto Sans TC）

## 📁 專案結構

```
src/
├── main.jsx                # 應用程式入口
├── App.jsx                 # 根組件
├── index.css               # 全域樣式 & 設計系統
├── components/
│   ├── Navbar.jsx          # 導覽列（含 RWD 漢堡選單）
│   ├── Hero.jsx            # 主視覺區（CTA + 管線 Mockup）
│   ├── SocialProof.jsx     # 客戶信賴區塊 + 見證引言
│   ├── Features.jsx        # 6 大核心功能
│   ├── UseCases.jsx        # 3 種應用場景
│   ├── Pricing.jsx         # 方案價格比較
│   ├── CallToAction.jsx    # 底部 CTA 橫幅
│   └── Footer.jsx          # 頁尾（產品/資源/公司/法務/社群）
└── data/
    ├── navigation.js       # 導覽 & 品牌設定
    ├── hero.js             # Hero 文案 & 數據
    ├── socialProof.js      # 客戶 logo & 見證
    ├── features.js         # 功能列表
    ├── useCases.js         # 應用場景
    ├── pricing.js          # 方案定價
    └── footer.js           # 頁尾連結
```

## 🏁 快速開始

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器（預設 http://localhost:3000）
pnpm dev

# 打包正式版本
pnpm build

# 預覽正式版本
pnpm preview
```

## 🎨 設計特色

- **深色主題**：以 `#0a0e1a` 為底，搭配 Indigo / Cyan 漸層
- **Glassmorphism Navbar**：`backdrop-filter` 毛玻璃效果
- **微動畫**：Hero 背景光暈呼吸、Mockup 浮動、卡片 hover 上移
- **全響應式**：桌面 → 平板 → 手機三段斷點
- **A11y**：語意化 HTML、`aria-label`、`aria-expanded`、`role` 標注

## ⚙️ Config-Driven

所有文案與資料集中在 `src/data/` 下的 JS 模組，修改內容不需觸碰任何組件程式碼。

| 檔案 | 控制內容 |
|------|---------|
| `navigation.js` | 品牌名稱、導覽連結 |
| `hero.js` | 主標、副標、統計數據、CTA 按鈕 |
| `socialProof.js` | 客戶 logo、見證引言 |
| `features.js` | 6 項功能的 icon / 標題 / 描述 |
| `useCases.js` | 3 種角色場景 & 亮點清單 |
| `pricing.js` | 3 組方案的價格 / 功能列表 |
| `footer.js` | 頁尾欄位、社群連結、版權 |

## 📜 License

MIT
