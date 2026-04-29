---
description: 檢查當前 worktree 的 git-worktree-spec.md 是否存在，讀取後依照 spec 內容執行開發任務
---

# 執行 Worktree Feature Spec

## 前置條件

1. 檢查當前工作目錄根目錄是否存在 `git-worktree-spec.md`
   - 若**不存在**：告知使用者此 worktree 沒有 spec 檔案，詢問是否要手動描述需求或中止
   - 若**存在**：繼續下一步

## 讀取 Spec

2. 讀取 `git-worktree-spec.md` 全文內容

3. 解析 Spec 中的以下區塊，確認理解任務：
   - **目標**：這個 feature 要達成什麼
   - **實作範圍**：具體的 checklist 任務
   - **驗收標準**：完成後需通過的條件
   - **技術約束**：開發時的限制與慣例
   - **跨分支備註**：是否有相依其他分支的注意事項

## 執行實作

4. 依照 spec 中「實作範圍」的 checklist **逐項執行**：
   - 每完成一項任務，更新 `git-worktree-spec.md`，將已完成的 checklist 項目打勾 `[x]`
   - 若遇到模糊不清的任務描述，主動詢問使用者而非猜測
   - 遵守「技術約束」中列出的所有限制

## 驗收

6. 實作完成後，逐項檢查「驗收標準」：
   - 能跑測試的就跑測試
   - 能透過 dev server 驗證的就啟動驗證
   - 將驗收結果回報給使用者