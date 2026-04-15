---
description: 將雜亂的 git 變更，依功能邏輯自動拆分成多個有意義的 conventional commit（繁體中文）。當使用者說「smart commit」、「智慧提交」、「幫我 commit」、「拆分 commit」時觸發。
---

# Git Smart Commit — 智慧拆分提交

將目前所有 staged / unstaged 變更，依功能邏輯分群後，逐批 `git add` + `git commit`。

## 流程

### 1. 檢查變更狀態

```bash
git status --short
git diff
git diff --cached
```

若沒有任何變更，告知使用者後結束。

### 2. 分析並分群

根據以下維度將檔案變更分成多個 commit 群組：

| 優先級 | 維度 | 範例 |
|--------|------|------|
| 1 | **專案設定檔** | `package.json`, `vite.config.*`, `.gitignore`, `README.md` |
| 2 | **資料層** | `src/data/*.js`, `src/constants/*` |
| 3 | **元件（按元件名稱分組）** | `src/components/Hero.jsx` + 對應樣式 |
| 4 | **頁面 / 路由** | `src/pages/*`, `src/App.jsx` |
| 5 | **全域樣式** | `src/index.css`, `src/styles/*` |
| 6 | **工具 / hooks** | `src/utils/*`, `src/hooks/*` |
| 7 | **測試** | `__tests__/*`, `*.test.*` |
| 8 | **文件 / 其他** | `docs/*`, `*.md` |

**分群規則：**
- 同一元件的 JSX/TSX + CSS Module + 測試 → 歸為同一組
- 改動極小（< 5 行）的單一檔案 → 合併到最相關的鄰近組
- 新增檔案用 `feat`，修改用 `fix` / `refactor` / `style`，刪除用 `chore`

### 3. 產出 Commit 計畫（先展示給使用者確認）

```
📋 Commit 計畫（共 N 個 commit）

1. chore(project): 初始化專案設定與相依套件
   → package.json, vite.config.js

2. feat(data): 新增首頁各區塊的設定資料
   → src/data/navigation.js, src/data/hero.js

確認執行？(Y/n)
```

### 4. 逐批執行 Commit

使用者確認後，對每一組依序執行：

```bash
git add <file1> <file2> ...
git commit -m "<type>(<scope>): <繁體中文描述>"
```

**Commit Message 格式：**

```
<type>(<scope>): <簡短描述，繁體中文，動詞開頭，不超過 50 字>
```

| type | 使用時機 |
|------|---------|
| `feat` | 新增功能、元件、頁面 |
| `fix` | 修復 bug |
| `style` | 純樣式調整 |
| `refactor` | 重構 |
| `chore` | 設定檔、腳手架 |
| `docs` | 文件更新 |
| `test` | 測試相關 |

scope 規則：元件名稱小寫（`hero`、`navbar`）、`data`、`style`、`project`

### 5. 確認結果

```bash
git log --oneline -20
```

## 邊界情況

- **有衝突或 merge 狀態**：提醒先解決衝突，不執行任何操作
- **有 `.env` 或敏感檔案**：提醒確認是否應被 gitignore
- **變更量極大（> 50 個檔案）**：先產出分組摘要，請使用者確認後再執行
- **已有部分 staged 變更**：尊重已 staged 狀態，將其視為獨立群組
