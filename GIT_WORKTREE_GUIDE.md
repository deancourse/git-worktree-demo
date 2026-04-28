# Vibe Coding 下的 Git Worktree 

> 在 AI 辅助开发背景下，如何用 Git Worktree 真正提升团队交付效率

---

## 痛点

用 AI 高速推进一个功能时，代码写到一半，忽然来了一个 Hotfix 需求。

然后你不得不：

```bash
git stash save "WIP: new dashboard"
git checkout develop
git checkout -b hotfix/login-bug
# ... 修复 ...
git push origin hotfix/login-bug
git checkout feature/new-dashboard
git stash pop
```

每次切换，AI 对话的上下文要重新建立，dev server 要重启，构建缓存失效。原本高速运转的开发节奏，就这样被打断了。

这就是 Vibe Coding 场景下，传统分支管理方式的核心问题：**AI 让你更频繁地需要切换任务，但切换本身的成本并没有降低。**

---

## 什么是 Git Worktree

Git Worktree 允许你在同一个仓库上创建多个独立工作目录，每个目录对应一个分支。

可以把它理解成：

- 同一套 `.git` 仓库，同一段提交历史
- 但可以同时拥有多个独立的"工作现场"

```bash
cd ~/project

# 为新功能创建独立工作树
git worktree add -b feature/123-login ../wt-feature-123-login main

# 为紧急修复创建另一个工作树
git worktree add -b hotfix/login-bug ../wt-hotfix-login-bug main
```

结果：

```text
project/              ← .git 在这里，所有工作树共享
  ├── .git/
  └── src/

wt-feature-123-login/ ← 对应 feature/123-login 分支
  └── src/

wt-hotfix-login-bug/  ← 对应 hotfix/login-bug 分支
  └── src/
```

现在你可以同时在三个目录里工作，互不干扰，每个目录都有独立的终端、运行状态和 AI 对话上下文。

同样的 Hotfix 场景，后面会在“实战场景”里给出完整操作示例。

---

## 为什么 Vibe Coding 更需要它

Vibe Coding 的本质是：**开发者和 AI 高频协作，让"实现"这一步变得更快、更连续。**

但 AI 带来的副作用也很明显：你会更频繁地同时推进多件事，并且更依赖 IDE 内的聊天上下文和运行状态。

对比一下：

| 维度 | 传统切分支 | Git Worktree | Worktree + AI |
|------|-----------|--------------|---------------|
| 紧急 Hotfix 处理 | stash → 切换 → 修复 → 切回 → pop | 新开目录，互不干扰 | 新开目录 + 独立 AI 对话，上下文不串 |
| Code Review + 开发并行 | 容易互相覆盖 | 隔离目录 | 隔离目录 + AI 分别辅助 |
| dev server | 切换后要重启 | 可同时运行多个 | 可同时运行，任务上下文稳定 |
| 构建缓存 | 切换后容易失效 | 各目录独立保留 | 稳定 |
| AI 对话上下文 | 容易串台 | 可按目录隔离 | 每个任务有独立干净的上下文 |
| 心智负担 | 高 | 中 | 最低 |

核心逻辑只有一句：

**AI 加速了任务产生的速度，Worktree 负责让这些任务互不干扰地并行推进。**

---

## Worktree 常用操作

### 创建工作树

```bash
# 基于 main 创建新分支 + 新工作树
git worktree add -b feature/123-login ../wt-feature-123-login main

# 基于已有远程分支创建工作树（用于 review）
git worktree add ../wt-review-payment feature/payment

# 基于 main 快速开 hotfix 工作树
git worktree add -b hotfix/login-bug ../wt-hotfix-login-bug main
```

### 查看 / 清理

```bash
git worktree list              # 查看所有工作树
git worktree list --porcelain  # 查看详细状态

git worktree remove ../wt-review-payment  # 删除工作树
git worktree prune                         # 清理无效引用
```

### 一个重要限制

**同一个分支不能同时挂载到两个 worktree。**

这不是缺陷，反而是一个保护机制——它强制你用"一个任务一个分支"的方式工作。

---

## 实战场景

### 场景一：Hotfix 不打断功能开发

**背景**：你正在 `feature/new-dashboard` 分支上开发，突然来了线上登录故障。

传统分支切换的痛点在前文已经说明，这里直接看 Worktree 处理方式。

**Worktree 做法**：

```bash
# 主工作目录完全不动，直接开一个新的 worktree
git worktree add -b hotfix/login-bug ../wt-hotfix-login-bug main
cd ../wt-hotfix-login-bug

# 在新窗口里打开这个目录，让 AI 帮你定位和修复
# 修复完成后提交
git commit -am "Fix: login timeout bug"
git push origin hotfix/login-bug

# 清理
cd ..
git worktree remove wt-hotfix-login-bug

# 回到原来的目录，一切都还在原地
cd ~/project
git status  # 还是 feature/new-dashboard，所有改动都在
```

**AI 在这里的角色**：在 hotfix 窗口里明确边界，例如“只做登录超时最小修复，不改其他逻辑”，可以显著降低误改范围。

---

### 场景二：Code Review 与开发并行

**背景**：你需要 review 同事的支付分支 PR，但自己的功能开发也不能停。

```bash
# 主工作树继续开发功能
# 另开一个 worktree 专门用于 review
git worktree add ../wt-review-payment feature/payment

cd ../wt-review-payment
npm install
npm run dev  # 独立启动，不干扰你的功能开发端口

# review 完成后
git worktree remove ../wt-review-payment
```

在 review 窗口里，可以让 AI 先总结变更，再聚焦 bug、回归风险和验证缺口；由于目录与运行环境独立，review 过程更干净。

---

### 场景三：多版本并行维护

**背景**：项目有 v1.0 和 v2.0 两个版本同时维护，需要给两个版本都加一个功能。

```bash
# 为两个版本各建一个工作树
git worktree add ../wt-v1.0 release/v1.0
git worktree add ../wt-v2.0 release/v2.0

# 各自配置独立环境
echo "API_URL=https://api-v1.example.com" > ../wt-v1.0/.env.local
echo "API_URL=https://api-v2.example.com" > ../wt-v2.0/.env.local

# 分别启动（不同端口）
# Terminal 1: cd ../wt-v1.0 && npm run dev   # 端口 3000
# Terminal 2: cd ../wt-v2.0 && npm run dev   # 端口 3001

# 分别在各自窗口提交
cd ../wt-v1.0 && git commit -am "Add user profile (v1.0)"
cd ../wt-v2.0 && git commit -am "Add user profile (v2.0)"
```

每个版本目录的 AI 上下文、环境变量和 dev server 都互不干扰。

---

### 场景四：AI 驱动的方案 A/B 实验

**背景**：有一个性能优化方向，不确定哪种方案更好，想让 AI 分别实现两套然后对比。

```bash
# 开两个实验性 worktree
git worktree add -b spike/search-v1 ../wt-spike-search-v1 main
git worktree add -b spike/search-v2 ../wt-spike-search-v2 main

# 在 wt-spike-search-v1 窗口里让 AI 实现方案 A
# 在 wt-spike-search-v2 窗口里让 AI 实现方案 B

# 分别跑性能测试
cd ../wt-spike-search-v1 && npm run benchmark  # 150ms
cd ../wt-spike-search-v2 && npm run benchmark  # 120ms

# 选方案 B，废弃方案 A
cd ~/project
git merge spike/search-v2
git worktree remove ../wt-spike-search-v1
git worktree remove ../wt-spike-search-v2
```

两个 worktree 可并行实验并直接对比结果；失败方案删目录即可，主仓库不受影响。

---




## 团队落地

### 生命周期

1. 在主工作树同步最新主干
2. 为任务创建 worktree（带上 `-b` 显式创建新分支）
3. 在新窗口中打开该目录
4. 只在这个窗口里和 AI 讨论当前任务
5. 提交、验证、合并
6. 删除 worktree，执行 `git worktree prune`

### 几条注意事项

- 不要在多个 worktree 里操作同一个分支（Git 不允许，也没有必要）
- 不要长期积压无人认领的 worktree，占空间也容易混淆
- 多个 worktree 启动 dev server 时记得配不同端口，避免冲突
- 使用 pnpm 的团队可以配置共享 store，降低重复安装成本：

```bash
pnpm config set store-dir ../.pnpm-store
```

---

## 总结

Git Worktree 不是“高级 Git 技巧”，而是 AI 协作开发时代的实用基础设施。

它真正解决的不是"切分支更快"，而是：

- 让多个并行任务各自拥有稳定的工作现场
- 让 AI 的上下文不在不同任务之间串台
- 让 Hotfix、Review、功能开发、实验探索互不干扰地推进

如果团队已经在用 AI 写代码，那么下一步值得标准化的不只是提示词，而是：

**任务怎么切，目录怎么开，窗口怎么隔离，AI 怎么约束。**