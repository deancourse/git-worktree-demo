---
description: 讀取當前 worktree 的 git-worktree-spec.md 並依照 spec 內容執行開發任務。當使用者說「執行 spec」、「開始開發」、「按照 spec 做」、「exec spec」，或進入一個有 git-worktree-spec.md 的 worktree 時觸發。
---

# 執行 Worktree Feature Spec

讀取當前 worktree 的 `git-worktree-spec.md`，解析任務內容後逐項實作。

## 前置條件

檢查根目錄是否存在 `git-worktree-spec.md`：
- **不存在**：告知使用者此 worktree 沒有 spec 檔案，詢問是否手動描述需求或中止
- **存在**：繼續執行

## 讀取 Spec

讀取 `git-worktree-spec.md` 全文，解析以下區塊：

| 區塊 | 用途 |
|------|------|
| **目標** | 確認此 feature 的最終目的 |
| **實作範圍** | 具體的 checklist 任務清單 |
| **驗收標準** | 完成後需通過的條件 |
| **技術約束** | 開發時的限制與慣例 |
| **跨分支備註** | 是否相依其他分支的注意事項 |

## 執行實作

依照「實作範圍」的 checklist **逐項執行**：

1. 每完成一項任務，更新 `git-worktree-spec.md`，將已完成項目打勾 `[x]`
2. 遇到模糊不清的描述，主動詢問使用者而非猜測
3. 嚴格遵守「技術約束」中列出的所有限制

## 驗收

實作完成後，逐項檢查「驗收標準」：

- 能跑測試的就跑測試
- 能透過 dev server 驗證的就啟動驗證（`pnpm dev`）
- 將驗收結果回報給使用者
