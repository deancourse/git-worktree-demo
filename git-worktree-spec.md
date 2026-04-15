# Feature Spec: Cookie 同意彈窗

> 此文件由 Git Worktree Design 自動產生，供 AI Agent 作為開發指引。

## 分支資訊

| 項目 | 值 |
|------|-----|
| 分支名稱 | `feature/cookie-consent` |
| 基於分支 | `master` |
| Worktree 路徑 | `/Users/linweicheng/Documents/Code/Claud_Courses/Git_worktree/git-worktree-demo-cookie` |
| 建立時間 | `2026-04-15` |

## 目標

首次進站時於頁面底部顯示 Cookie 同意彈窗，使用者同意或拒絕後記錄狀態，後續進站不再顯示。

## 實作範圍

- [x] 新增 `src/components/CookieConsent.jsx`
  - 固定於頁面底部（`position: fixed; bottom: 0`）
  - 包含說明文字、「接受」按鈕、「拒絕」按鈕
  - 點擊任一按鈕後以動畫滑出（slide-down 或 fade-out）
- [x] 使用 `localStorage` 記錄同意狀態（key: `cookie-consent`，值: `accepted` / `rejected`）
- [x] 頁面初始化時檢查 `localStorage`，若已有記錄則不顯示彈窗
- [x] 更新 `src/App.jsx` 掛載 `<CookieConsent />`
- [x] 樣式使用現有 CSS Custom Properties token，支援深色主題

## 驗收標準

- 首次進站（無 localStorage 記錄）顯示彈窗
- 點擊「接受」或「拒絕」後彈窗消失，`localStorage` 正確寫入
- 重整頁面後不再顯示彈窗
- 清除 localStorage 後重整，彈窗重新出現
- 手機版（375px）彈窗不遮擋主要操作區域，寬度正常

## 技術約束

- 不引入任何新的 npm 依賴
- 不使用第三方 cookie 管理套件
- 樣式使用 CSS Custom Properties token，不 hardcode 顏色

## 跨分支備註

- 與 `feature/theme-toggle` 及 `feature/faq-section` 無相依，可獨立開發與合併
- 若 `feature/theme-toggle` 已先合併，可直接使用其定義的 light/dark token
