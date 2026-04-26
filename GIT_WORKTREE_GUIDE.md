# Git Worktree × AI 并行开发指南

> **核心理念**：在 Vibe Coding 时代，AI 是你的结对编程伙伴。Worktree 让你同时开启多个 AI 工作流，互不干扰，效率倍增。

## 为什么 Vibe Coding 需要 Worktree

传统工作流下，AI 辅助编码已经很强大。但当你需要同时处理多个任务时，频繁切换分支会打断 AI 的上下文，也打断你自己的心流。

**Worktree 的核心价值：每个工作树 = 一个独立的 AI 工作上下文**

```
主仓库窗口            AI 任务 1 窗口           AI 任务 2 窗口
──────────────        ──────────────────        ──────────────────
main 分支             feature/login             hotfix/payment
Copilot 聊天          Copilot 聊天              Copilot 聊天
（看全局）             （专注登录模块）            （专注支付修复）
```

典型收益：

- **AI 上下文更纯净**：每个工作树聚焦单一任务，AI 看到的代码噪音更少，回答更精准
- **并行不阻塞**：等待 AI 生成代码时，切到另一个窗口继续推进其他任务
- **零 stash 切换**：不再因为临时切换而打断 AI 对话和本地改动
- **可重复的任务隔离**：每个 PR / issue 有自己的目录，环境变量、端口、调试配置独立

适用场景：

- 功能开发与紧急修复并行（各自跑 AI）
- AI 生成代码 review 时，不影响主开发窗口
- 多个 issue 同时推进，按进度随时切换

---

## 什么是 Git Worktree

Git Worktree 允许一个仓库在多个目录中同时检出不同分支。所有工作树共享同一份 Git 对象库，但每个工作树有自己的工作目录和 HEAD。

| 方面 | 传统切分支 | Git Worktree |
|---|---|---|
| 多任务并行 | 需要频繁切换 | 多目录同时运行 |
| stash 依赖 | 常见 | 基本不需要 |
| AI 上下文连贯性 | 切换后容易混乱 | 每个窗口独立保持 |
| IDE / 终端会话 | 经常被打断 | 长期保留 |
| 心智负担 | 高 | 低 |

---

## Vibe Coding 并行 AI 工作流

### 推荐工作模式

```
每个 Worktree 对应一个 AI 任务单元：

1. 为每个 issue / 任务创建独立工作树
2. 在该目录下打开新的 IDE 窗口（或 Cursor / VS Code workspace）
3. 在该窗口中与 AI 对话，保持上下文专一
4. 完成后 PR → merge → remove worktree
```

### AI 工具集成建议

**GitHub Copilot（VS Code）**
- 每个工作树单独用 `code <worktree-path>` 打开，Copilot Chat 上下文绑定在该窗口
- 避免在同一窗口频繁切换文件夹，否则 Copilot 的代码感知会混乱

**Cursor**
- 用 `cursor <worktree-path>` 为每个任务开独立项目窗口
- Cursor 的 Composer / Agent 模式在单一目录下效果最佳，scope 越小越准

**通用技巧**
- 在每个工作树根目录放一个 `TASK.md`，写清楚当前任务目标，作为 AI 对话的第一条 context
- 让 AI 知道它在哪个分支、解决什么问题，比直接扔代码效果好得多

### 并行任务示意

```bash
# 终端 1：主功能开发（AI 正在生成代码，先去干别的）
cd ../wt-feature-123 && cursor .

# 终端 2：同时处理热修复
cd ../wt-hotfix-789 && cursor .

# 终端 3：跑测试，不阻塞任何 AI 窗口
cd ../wt-review-checkout && pnpm test
```

---

## 核心命令速查

### 1) 创建工作树

```bash
# 在当前 HEAD 基础上创建工作树（分支与当前一致）
git worktree add ../wt-task-a

# 基于已有分支创建工作树
git worktree add ../wt-review feature/checkout

# 创建新分支并创建工作树（推荐团队开发常用）
git worktree add -b feature/123-login ../wt-feature-123 main
```

命令格式说明：

```text
git worktree add [-b <new-branch>] <path> [<start-point>]
```

### 2) 查看工作树

```bash
git worktree list
git worktree list --verbose
```

### 3) 删除工作树

```bash
# 正常删除
git worktree remove ../wt-feature-123

# 若存在未提交改动，使用 -f 强制删除
git worktree remove -f ../wt-feature-123

# 清理已失效记录
git worktree prune
```

### 4) 锁定与解锁

```bash
git worktree lock ../wt-release --reason "release freeze"
git worktree unlock ../wt-release
```

---

## 推荐目录规划

建议将工作树放在仓库同级目录，统一以 wt- 前缀命名。

```text
repo/
  .git/
  src/
  package.json

../wt-feature-123-login/
../wt-bugfix-456-crash/
../wt-review-checkout/
```

命名建议：

- 功能分支：wt-feature-<issue>-<desc>
- 缺陷修复：wt-bugfix-<issue>-<desc>
- 评审验证：wt-review-<branch>
- 紧急修复：wt-hotfix-<issue>

---

## 团队标准流程（SOP）

### 场景 1：AI 功能开发（Vibe Coding 标准流）

```bash
git fetch origin
git worktree add -b feature/123-login ../wt-feature-123 origin/main
cd ../wt-feature-123
pnpm install

# 创建任务上下文文件，给 AI 看
echo "## 任务：实现登录功能\n- 接口：POST /api/login\n- 相关文件：src/auth/" > TASK.md

# 用 Cursor 或 VS Code 打开，开始 AI 对话
cursor .
```

### 场景 2：线上热修复（不中断 AI 开发窗口）

```bash
git fetch origin
git worktree add -b hotfix/789-payment ../wt-hotfix-789 origin/main
cd ../wt-hotfix-789
pnpm install
pnpm test
# 在新窗口打开，原有 AI 对话不受影响
cursor .
```

### 场景 3：本地评审同事分支（AI 辅助 Review）

```bash
git fetch origin
git worktree add ../wt-review-checkout origin/feature/checkout
cd ../wt-review-checkout
pnpm install
pnpm test
# 让 AI 帮你 review：在 Copilot Chat 中问 "这个 PR 改了什么，有什么风险？"
```

### 场景结束清理

```bash
cd ../repo
git worktree remove ../wt-review-checkout
git worktree prune
```

---

## VS Code / Cursor 集成建议

1. **一任务一窗口**：每个工作树用独立 IDE 窗口打开（`code <path>` / `cursor <path>`），AI 聊天历史互不干扰。
2. **多根工作区**：如需总览，可用 VS Code 多根工作区把主仓库和常用工作树一起显示。
3. **独立端口与环境变量**：每个工作树的 `.env.local` 配置不同端口，避免 dev server 冲突。
4. **终端标题标明分支**：在 Shell 提示符中显示分支名，避免在错误目录执行 AI 生成的命令。
5. **操作前确认位置**：大型 AI 改动前先执行 `git worktree list`，确认自己在目标工作树。

---

## Do / Don’t

### Do

- 每个任务一个独立工作树，对应一个 AI 对话窗口。
- 在工作树根目录放 `TASK.md`，给 AI 提供清晰的任务上下文。
- 分支名与 issue 号绑定，AI 生成提交信息时自动关联任务。
- 任务结束后及时 remove + prune，保持目录整洁。
- 在创建前先 `git fetch`，保证起点分支最新。

### Don’t

- 不要在多个工作树同时检出同一分支（Git 会报错）。
- 不要在同一 IDE 窗口来回切换工作树目录，会污染 AI 上下文。
- 不要长期保留无人维护的临时工作树（AI 生成的代码积压更难清理）。
- 不要在不确认目录时直接执行 AI 生成的提交/推送命令。
- 不要把工作树路径写死到团队脚本中（改为参数化）。

---

## 常见问题

### Q1：提示分支已被其他工作树占用

原因：同一分支已在另一工作树检出。

处理：

```bash
git worktree list
# 改用新分支，或先移除占用该分支的工作树
```

### Q2：工作树删除失败，提示有改动

```bash
git worktree remove -f ../wt-feature-123
git worktree prune
```

注意：-f 会丢弃该工作树未提交改动。

### Q3：目录已手动删除，列表仍显示

```bash
git worktree prune
```

### Q4：如何降低依赖重复安装成本

建议优先使用包管理器缓存能力，而不是跨工作树硬链接依赖目录。

```bash
pnpm config set store-dir ../.pnpm-store
```

---

## 跨平台命令提示

### 删除目录

- macOS/Linux：rm -rf ../wt-feature-123
- PowerShell：Remove-Item -Recurse -Force ..\wt-feature-123

优先使用 git worktree remove，而不是直接删目录。

### 查看帮助

- 通用：git worktree --help

---

## 可复制的团队别名

在 Git 全局配置中加入：

```ini
[alias]
  wtls = worktree list --verbose
  wtpr = worktree prune
  wtadd = worktree add
  wtrm = worktree remove
```

使用示例：

```bash
git wtls
git wtadd -b feature/321-search ../wt-feature-321 origin/main
git wtrm ../wt-feature-321
git wtpr
```

---

## 维护信息

- 文档版本：v3.0
- 更新日期：2026-04-26
- 适用背景：Vibe Coding / AI 辅助开发团队
- 维护建议：每次 AI 工具或团队流程变化后，同步更新本指南
