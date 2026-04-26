# Git Worktree 团队协作指南

## 目标

Git Worktree 让团队可以在同一个仓库中并行处理多个分支，减少频繁切分支、stash/pop、重新编译带来的成本。

适用场景：

- 功能开发与紧急修复并行
- Code Review 与本地开发并行
- 多任务切换频繁的日常研发

---

## 什么是 Git Worktree

Git Worktree 允许一个仓库在多个目录中同时检出不同分支。所有工作树共享同一份 Git 对象库，但每个工作树有自己的工作目录内容。

对比传统切分支：

| 方面 | 传统切分支 | Git Worktree |
|---|---|---|
| 多任务并行 | 需要频繁切换 | 可多目录并行 |
| stash 依赖 | 常见 | 大幅减少 |
| IDE/终端会话 | 经常被打断 | 可长期保留 |
| 心智负担 | 高 | 低 |

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

### 场景 1：功能开发

```bash
git fetch origin
git worktree add -b feature/123-login ../wt-feature-123 origin/main
cd ../wt-feature-123
pnpm install
pnpm dev
```

### 场景 2：线上热修复（不中断当前开发）

```bash
git fetch origin
git worktree add -b hotfix/789-payment ../wt-hotfix-789 origin/main
cd ../wt-hotfix-789
pnpm install
pnpm test
```

### 场景 3：本地评审同事分支

```bash
git fetch origin
git worktree add ../wt-review-checkout origin/feature/checkout
cd ../wt-review-checkout
pnpm install
pnpm test
```

### 场景结束清理

```bash
cd ../repo
git worktree remove ../wt-review-checkout
git worktree prune
```

---

## VS Code 协作建议

1. 使用多根工作区把主仓库和常用工作树一起打开。
2. 给每个工作树单独分配端口、调试配置和环境变量。
3. 在终端标题中标明分支名，避免在错误目录执行命令。
4. 大型改动前先执行 git worktree list，确认自己在目标工作树。

---

## Do / Don’t

### Do

- 每个任务一个独立工作树。
- 分支名与任务号绑定，便于追踪。
- 任务结束后及时 remove + prune。
- 在创建前先 git fetch，保证起点分支最新。

### Don’t

- 不要在多个工作树同时检出同一分支。
- 不要长期保留无人维护的临时工作树。
- 不要在不确认目录时直接提交或推送。
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

- 文档版本：v2.0
- 更新日期：2026-04-26
- 维护建议：每次团队流程变化后，同步更新本指南
