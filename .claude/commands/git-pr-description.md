---
description: 根據當前 branch 與目標 branch 的差異，自動產生 Pull Request 的 Title 與 Description。當使用者說「PR」、「Pull Request」、「寫 PR」、「PR 描述」、「PR description」、「建立 PR」時觸發。
---

# Git PR Description — 自動產生 PR 標題與描述

根據當前 branch 相對於目標 branch（預設 `master`）的所有 commit 與 diff，產出結構化的 PR Title + Description。

## 流程

### 1. 確認分支資訊

```bash
git branch --show-current
git log --oneline master..HEAD
```

若無差異，告知使用者後結束。預設目標 branch 為 `master`，若使用者指定其他 base branch 則以使用者指定為準。

### 2. 蒐集變更資訊

```bash
git log --oneline master..HEAD
git log --format="%h %s%n%b" master..HEAD
git diff --stat master..HEAD
git diff master..HEAD
```

### 3. 產生 PR Title

格式：`<type>: <繁體中文描述>`

| type | 使用時機 |
|------|----------|
| `feat` | 新增功能 |
| `fix` | 修復 bug |
| `refactor` | 重構 |
| `style` | 樣式調整 |
| `chore` | 雜務、設定 |
| `docs` | 文件更新 |

Title 規則：繁體中文、不超過 72 字、動詞開頭、精準描述核心目的。

### 4. 產生 PR Description

使用 `.claude/pr-template.md` 作為模板結構，填入以下內容：

- **為什麼要這樣做**：背景與動機
- **修改的內容**：依功能分組，**禁止出現任何檔案路徑**，一律用純功能描述
- **測試步驟**：每個修改模組至少一個對應測試案例，包含操作步驟與預期結果

### 5. 輸出結果

以 markdown code block 包裹輸出，讓使用者可直接複製貼上：

````
```markdown
<PR Title>

<PR Description 完整內容>
```
````

## 格式嚴格規範

- **禁止 Markdown 連結格式**：`[文字](...)`
- **禁止任何 URI / scheme**：`file://`、`cci:` 等
- **禁止出現任何檔案路徑**（相對或絕對），一律改用純功能描述

## 邊界情況

- **存在未提交的變更**：提醒使用者先 commit 或 stash

## Additional Resources

- **`.claude/pr-template.md`** — PR Description 完整模板
