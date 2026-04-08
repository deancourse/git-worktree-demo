---
name: Git Worktree Design
description: 当用户的需求是新增多个功能，或判断用户的需求适合拆分为多个 feature branch 并行开发时，或是提到 "worktree"、"git worktree"、"多分支开发"、"parallel branches"，自动触发此 Skill。先分析需求并建议 worktree 拆分方案，经用户确认后执行创建。
---

# Git Worktree Design — 智能拆分并行开发

分析用户需求，判断是否适合以 `git worktree` 拆分为多个 feature branch 并行开发，提供建议方案并执行。

---

## 流程

### 1. 分析当前状态

执行以下命令了解 repo 状态：

```bash
# 确认当前分支
git branch --show-current

# 列出已有 worktree
git worktree list

# 获取 remote 信息
git remote -v

# 确认工作目录状态
git status --short
```

若有未提交的变更，提醒用户先处理（commit 或 stash）再继续。

---

### 2. 全局设计（拆分方案 + Feature Spec）

在创建任何 worktree 之前，先从全局视角完成所有 feature 的设计。这一步同时产出 **拆分方案** 和每个 feature 的 **Spec 草案**，让用户一次性 review 整体规划。

#### 2a. 需求拆分

根据用户需求，分析并拆分为多个独立的 feature branch。

**拆分原则：**

| 原则 | 说明 |
|------|------|
| **功能独立性** | 每个 worktree 负责一个独立功能，减少跨分支冲突 |
| **最小依赖** | 尽量避免分支间互相依赖，可独立开发与测试 |
| **合理粒度** | 不宜太细（增加管理负担），不宜太粗（失去并行开发优势） |
| **命名语义** | 分支名清楚描述功能，格式 `feature/<功能名>` |

#### 2b. 设计各 Feature Spec

针对每个拆分出来的 feature，根据用户的原始需求和项目现况，**自动推导**出完整的 Spec 内容（而不是给出空白模板）。

**每份 Spec 应包含：**

| 块 | 说明 |
|------|------|
| **目标** | 这个 feature branch 要达成什么 |
| **实现范围** | 具体的任务 checklist，粒度到 AI 看了就能直接动手 |
| **验收标准** | 可测试的行为或 UI 状态描述 |
| **技术约束** | 项目惯例、不可引入的依赖、需兼容的接口等 |
| **跨分支备注** | 与其他 feature 的依赖关系、建议合并顺序等 |

> **重点**：在全局设计阶段就考虑跨分支依赖，例如 feature A 产出的共用组件是否影响 feature B，合并顺序是否有先后。

#### 2c. 呈现完整方案给用户

以表格 + 各 feature spec 摘要的形式向用户呈现**完整方案**：

```
📋 Worktree 拆分方案（共 N 个分支）

| # | 分支名称 | Worktree 目录 | 负责功能 |
|---|----------|---------------|----------|
| 1 | feature/hero-redesign | ../project-hero | Hero 区域重新设计 |
| 2 | feature/pricing-page | ../project-pricing | 定价页面 |
| 3 | feature/testimonials | ../project-testimonials | 用户见证区域 |

---

📝 Feature Spec 摘要：

### 1. feature/hero-redesign
- 目标：重新设计 Hero 区域，加入动态背景与 CTA
- 验收：首屏加载 < 2s，CTA 按钮可点击跳转
- 依赖：无，可独立开发

### 2. feature/pricing-page
- 目标：新增月/年切换的定价页面
- 验收：切换月/年时价格正确更新，手机版布局正常
- 依赖：无，可独立开发

### 3. feature/testimonials
- 目标：新增用户见证轮播区域
- 验收：轮播自动播放，手动切换无 bug
- 依赖：无，可独立开发

---

建议合并顺序：1 → 2 → 3（无强制依赖，可任意顺序）

确认执行？(Y/n)
```

使用 `notify_user` 工具向用户展示完整方案（拆分 + Spec 摘要）并等待确认。

---

### 3. 创建 Worktree

用户确认后，依次执行：

```bash
# 创建各 worktree（新分支）
git worktree add -b <branch_name> <worktree_path>
```

#### Worktree 目录命名规则

- 目录放在当前 repo 的**同级目录**（`../`）
- 格式：`../<project-name>-<feature-short-name>`
- 取 repo 目录名作为 `<project-name>` 前缀，避免与其他项目混淆

---

### 4. 安装依赖

检测项目使用的包管理器并安装依赖：

```bash
# 检测 lock file 判断包管理器
# pnpm-lock.yaml → pnpm install
# yarn.lock → yarn install
# package-lock.json → npm install
# bun.lockb → bun install
```

对每个 worktree 执行：

```bash
cd <worktree_path> && <package_manager> install
```

> **注意**：每个 worktree 有独立的工作目录，`node_modules` 不会共享，必须各自安装。

---

### 5. 写入 Feature Spec 文件

将步骤 2 设计好的 Spec 内容，使用 `write_to_file` 工具写入到每个 worktree 的根目录 `<worktree_path>/git-worktree-spec.md`。

#### Spec 文件格式

```markdown
# Feature Spec: <功能名称>

> 此文件由 Git Worktree Design Skill 自动生成，供 AI Agent 作为开发指引。

## 分支信息

| 项目 | 值 |
|------|-----|
| 分支名称 | `feature/<name>` |
| 基于分支 | `<base_branch>` |
| Worktree 路径 | `<absolute_path>` |
| 创建时间 | `<timestamp>` |

## 目标

（从步骤 2 的设计内容填入）

## 实现范围

- [ ] 具体任务 1
- [ ] 具体任务 2
- [ ] 具体任务 3

## 验收标准

- 条件 A 成立时，应有行为 X
- 条件 B 成立时，应有行为 Y

## 技术约束

- 不得引入新的 npm 依赖（视情况填写）
- 需兼容已有的设计系统 / API 接口
## 跨分支备注

与其他 worktree 分支的依赖关系、合并顺序建议等。
```

---

### 6. 确认结果

所有 worktree 创建完成后，执行：

```bash
git worktree list
```

以表格形式展示结果：

```
✅ Worktree 创建完成！

| Worktree 目录 | 分支 | 状态 | Spec |
|---------------|------|------|------|
| /path/to/project-hero | feature/hero-redesign | ✅ 就绪 | ✅ 已写入 |
| /path/to/project-pricing | feature/pricing-page | ✅ 就绪 | ✅ 已写入 |
| /path/to/project-testimonials | feature/testimonials | ✅ 就绪 | ✅ 已写入 |

💡 提示：
- 切换工作目录到对应 worktree 即可开始开发
- 所有 worktree 共享同一个 .git，commit 历史互通
```

---

## 边界情况处理

- **分支已存在**：检测到分支已存在时，改用不带 `-b` 的命令（`git worktree add <path> <existing-branch>`），并提示用户确认
- **目录已存在**：提示冲突并建议替代目录名
- **有未提交变更**：提醒先 commit 或 stash
- **远端分支同步**：建议先 `git fetch` 获取最新远端状态
- **Worktree 清理**：提醒用户开发完成后使用 `git worktree remove` 和 `git branch -d` 清理
---

## 常用维护命令

```bash
# 列出所有 worktree
git worktree list

# 移除 worktree（保留分支）
git worktree remove <path>

# 强制移除（有未提交变更时）
git worktree remove --force <path>

# 清理失效的 worktree 引用
git worktree prune

# 删除分支（合并后）
git branch -d <branch_name>
```
