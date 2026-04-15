# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install      # 安裝依賴
pnpm dev          # 啟動開發伺服器（http://localhost:3000，自動開啟瀏覽器）
pnpm build        # 打包正式版本
pnpm preview      # 預覽打包後的正式版本
```

## Architecture

**SalesPilot CRM** 是以 React 18 + Vite 6 建置的行銷官網，採用純 Vanilla CSS（CSS Custom Properties）設計系統，無 CSS-in-JS 或 UI 框架。

### Config-Driven 架構

所有頁面文案與資料集中在 `src/data/` 的 JS 模組中。修改頁面內容只需編輯對應的 data 檔，**不需觸碰任何元件程式碼**：

| 資料檔 | 控制內容 |
|--------|---------|
| `navigation.js` | 品牌名稱、導覽連結 |
| `hero.js` | 主標、副標、統計數據、CTA 按鈕 |
| `socialProof.js` | 客戶 logo、見證引言 |
| `features.js` | 6 項功能的 icon / 標題 / 描述 |
| `useCases.js` | 3 種角色場景 & 亮點清單 |
| `pricing.js` | 3 組方案的價格 / 功能列表 |
| `footer.js` | 頁尾欄位、社群連結、版權 |

### 頁面組件順序

`App.jsx` 依序渲染：`Navbar → Hero → SocialProof → Features → UseCases → Pricing → CallToAction → Footer`

## Skills / Slash Commands（`.claude/commands/`）

每個 skill 支援兩種觸發方式：**AI 自動判斷觸發**（依下列條件）或**手動輸入 slash command**。

| 指令 | 手動觸發 | AI 自動觸發條件 |
|------|----------|----------------|
| git-smart-commit | `/git-smart-commit` | 使用者說「幫我 commit」、「拆分 commit」、「smart commit」，或完成一批功能開發後要提交 |
| git-pr-description | `/git-pr-description` | 使用者說「寫 PR」、「PR 描述」、「建立 PR」、「PR description」 |
| git-worktree-design | `/git-worktree-design` | 使用者說「worktree」、「平行開發」、「多分支」，或需求明顯適合拆分成多個獨立 feature branch |
| exec-worktree-spec | `/exec-worktree-spec` | 進入含有 `git-worktree-spec.md` 的 worktree 後說「開始開發」、「執行 spec」、「按 spec 做」 |
| ui-ux-pro-max | `/ui-ux-pro-max` | 使用者要求設計、建立或改善 UI/UX，或說「設計系統」、「配色」、「字型」 |

### Worktree Workflow

當使用 git worktree 平行開發時：
1. 執行 `/git-worktree-design` → 分析需求、建立 worktree、寫入 `git-worktree-spec.md`
2. 切換到對應 worktree 目錄，執行 `pnpm install`
3. 執行 `/exec-worktree-spec` → 依 spec 逐項實作並打勾追蹤進度

**目錄規則：** Worktree 放在 repo 同層（`../`），格式：`../<repo-name>-<feature-short-name>`

### Commit Message 格式

```
<type>(<scope>): <繁體中文描述>
```

scope 對照：元件名稱小寫（`hero`、`navbar`）、`data`、`style`、`project`

## 設計系統重點

- 深色主題，底色 `#0a0e1a`，accent 色為 Indigo / Cyan 漸層
- Glassmorphism Navbar：`backdrop-filter` 毛玻璃效果
- 全域 CSS 變數定義在 `src/index.css`
- 三段響應式斷點：桌面 → 平板 → 手機
