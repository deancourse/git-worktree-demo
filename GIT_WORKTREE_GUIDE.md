# Git Worktree 团队协作指南

## 🎯 核心价值

Git Worktree 让你**同时在多个分支工作，无需频繁切换**，极大提升团队开发效率。特别适合 Vibe Coding（流畅编码体验）的开发模式。

---

## 什么是 Git Worktree

Git Worktree 是 Git 的一个强大功能，允许你在同一个仓库中维护**多个独立的工作目录**，每个目录可以关联到不同的分支。

### 关键对比

| 方面 | 传统切换分支 | Git Worktree |
|------|----------|------------|
| 切换分支耗时 | 重新加载所有文件 | 立即切换目录 |
| 同时修改多分支 | ❌ 需要stash/切换 | ✅ 并行开发 |
| 编译缓存 | 丢失（重编） | 保留（不同目录） |
| IDE 配置 | 共享（易冲突） | 独立（互不影响） |

---

## 🚀 快速开始

### 基础命令

#### 1. 创建新工作树
```bash
# 基于当前分支创建工作树
git worktree add ../worktree-branch-name

# 基于特定分支创建工作树
git worktree add ../worktree-feature /path/to/branch-name

# 创建并同时创建新分支
git worktree add -b feature-new ../worktree-feature
```

#### 2. 列出所有工作树
```bash
git worktree list
git worktree list --verbose  # 显示详细信息
```

#### 3. 删除工作树
```bash
# 强制删除工作树
git worktree remove ../worktree-feature

# 或者先手动删除目录，再清理
rm -rf ../worktree-feature
git worktree prune
```

#### 4. 修复损坏的工作树
```bash
git worktree lock ../worktree-feature --reason "备份中"
git worktree unlock ../worktree-feature
```

---

## 💼 团队实战场景

### 场景 1: 并行开发多个功能分支

```bash
# 主工作树：处理 main 分支
cd ~/project

# 创建第一个功能分支工作树
git worktree add ../wt-feature-login -b feature/login

# 创建第二个功能分支工作树  
git worktree add ../wt-feature-payment -b feature/payment

# 创建测试修复工作树
git worktree add ../wt-bugfix-auth -b bugfix/auth-issue

# 现在可以并行开发，互不干扰
```

**文件结构：**
```
project/
  ├── .git/                    # 共享 git 仓库
  ├── src/
  ├── package.json
  └── (主工作树内容)

wt-feature-login/
  ├── src/
  ├── package.json
  └── (feature/login 分支内容)

wt-feature-payment/
  ├── src/
  ├── package.json
  └── (feature/payment 分支内容)
```

### 场景 2: 紧急修复 + 功能开发

```bash
# 正在开发 feature/user-dashboard 分支
# 突然需要修复线上 bug

# ✅ 创建新工作树修复 bug（基于 main）
git worktree add ../wt-hotfix -b hotfix/critical-bug

# 修复完成后直接提交、测试、部署
# 原工作树继续开发，无需 stash/pop
```

### 场景 3: Code Review + 功能开发

```bash
# 需要检视同事的 PR（feature/checkout）
git worktree add ../wt-review feature/checkout

# 一边测试同事代码，一边开发自己的功能
# 完成后直接删除 review 工作树
git worktree remove ../wt-review
```

---

## 🎨 最佳实践（Vibe Coding 友好）

### ✅ DO（推荐做法）

```bash
# 1. 统一的命名规范
git worktree add ../wt-feature-<issue-id>-<short-desc>
git worktree add ../wt-feature-123-user-auth
git worktree add ../wt-bugfix-456-login-crash

# 2. 创建包含所有 worktree 的快捷脚本 (创建 .worktree-setup.sh)
#!/bin/bash
# 快速创建常用工作树
git worktree add -b develop ../wt-develop develop
git worktree add -b staging ../wt-staging staging
git worktree add -b feature-1 ../wt-feature-1 feature-1

# 3. 在 VS Code 中使用工作区功能
# File > Add Folder to Workspace
# 添加 wt-feature-xxx 目录，同时编辑多个分支

# 4. 定期清理已删除的分支
git worktree prune

# 5. 在 IDE 中配置不同工作树的执行配置
# 避免冲突（不同端口、不同调试器等）
```

### ❌ DON'T（避免做法）

```bash
# ❌ 1. 不要在多个工作树中操作同一分支
git worktree add ../wt1 feature/auth
git worktree add ../wt2 feature/auth  # ❌ 冲突！

# ❌ 2. 不要忘记删除不用的工作树
# 占用磁盘空间，容易混淆

# ❌ 3. 不要跨工作树共享 node_modules、build 目录
# 创建 .gitignore 防止提交
echo "node_modules/" >> ../.gitignore
echo "dist/" >> ../.gitignore
echo ".next/" >> ../.gitignore

# ❌ 4. 不要在工作树中改变 git 配置
# 所有工作树共享 .git/config
```

---

## 🛠️ 团队配置建议

### 1. 项目根目录结构规划

```
project-repo/
├── .git/
├── .gitignore          # 包含: node_modules, dist, .env 等
├── .worktree-setup.sh  # 工作树设置脚本
├── src/
└── README.md

# 创建工作树目录（与仓库目录同级）
../wt-main/
../wt-develop/
../wt-feature-xxx/
```

### 2. 团队规范文档

```markdown
## 工作树命名规范
- 功能分支: wt-feature-{JIRA_ID}-{简短描述}
- 修复分支: wt-bugfix-{JIRA_ID}-{简短描述}  
- 发布分支: wt-release-{版本号}
- 临时分支: wt-temp-{用途}-{创建日期}

## 生命周期
1. 创建: git worktree add
2. 开发: 在工作树中正常开发
3. 提交: git commit, git push
4. 删除: git worktree remove
```

### 3. VS Code 工作区配置 (vscode-workspace)

```json
{
  "folders": [
    {
      "path": "../wt-main",
      "name": "🔵 Main Branch"
    },
    {
      "path": "../wt-develop",
      "name": "🟢 Develop Branch"
    },
    {
      "path": "../wt-feature-123",
      "name": "🟡 Feature Auth"
    }
  ],
  "settings": {
    "files.exclude": {
      "node_modules": true,
      "dist": true,
      ".next": true
    }
  }
}
```

---

## ⚡ 高级技巧

### 1. 自动化工作树管理脚本

```bash
#!/bin/bash
# worktree-manager.sh

case "$1" in
  create)
    TYPE=$2
    ISSUE_ID=$3
    DESC=$4
    git worktree add -b "$TYPE/$ISSUE_ID-$DESC" "../wt-$TYPE-$ISSUE_ID" 
    echo "✅ 创建工作树: ../wt-$TYPE-$ISSUE_ID"
    ;;
  list)
    git worktree list --porcelain
    ;;
  clean)
    git worktree prune
    echo "✅ 清理完成"
    ;;
  *)
    echo "用法: $0 {create|list|clean}"
    ;;
esac

# 使用方式
# ./worktree-manager.sh create feature 123 user-auth
# ./worktree-manager.sh list
# ./worktree-manager.sh clean
```

### 2. Git 别名快捷方式

```bash
# 在 ~/.gitconfig 中添加
[alias]
    wtadd = worktree add
    wtlist = worktree list --porcelain
    wtremove = worktree remove
    wtprune = worktree prune
    wtlock = worktree lock
    wtunlock = worktree unlock

# 使用
git wtadd ../wt-feature-1 -b feature/auth
git wtlist
```

### 3. 与 CI/CD 集成

```yaml
# GitHub Actions 示例
name: Multi-Branch Testing

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        branch: [main, develop, staging]
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ matrix.branch }}
      - name: Run tests
        run: |
          npm install
          npm test
```

---

## 🐛 常见问题解决

### Q1: 工作树被锁定，无法删除
```bash
git worktree unlock /path/to/worktree
git worktree remove /path/to/worktree
```

### Q2: 磁盘空间浪费，如何节省
```bash
# 使用共享的 node_modules（不推荐）
# 或使用符号链接
ln -s ../node_modules node_modules

# 更好的方式：配置 npm 缓存
npm install --cache-dir=../.npm-cache
```

### Q3: IDE 编译冲突（如 Java、C++ 项目）
```bash
# 为每个工作树使用不同的 build 目录
# CMakeLists.txt 示例
set(CMAKE_BINARY_DIR "${PROJECT_SOURCE_DIR}/../build-${GIT_BRANCH}")
```

### Q4: 多人团队，如何同步工作树状态
```bash
# 创建 .git-worktrees.json 文件，共享配置
{
  "active_worktrees": [
    {
      "name": "wt-feature-123",
      "branch": "feature/auth",
      "owner": "alice",
      "created_at": "2026-04-20"
    }
  ]
}

# 定期同步
git pull
git worktree prune
```

---

## 📊 性能对比

| 操作 | 传统切换 | Git Worktree |
|------|---------|-------------|
| 分支切换 | 2-5秒 | 0秒（目录切换） |
| 编译缓存命中 | 否（重编） | 是（命中率 80%+） |
| 磁盘占用（含依赖） | ~500MB | ~1GB（多工作树） |
| 同步时间 | N/A | <100ms |

---

## 📋 Vibe Coding 工作流示例

### 典型的一天

```bash
# 🌅 早上
cd ~/project
git worktree list                    # 查看现有工作树

# 🎯 处理新任务
git worktree add -b feature/dashboard ../wt-dashboard
cd ../wt-dashboard
npm install                          # 仅需要一次
npm run dev                          # 开发服务器运行

# 💬 收到 Code Review 反馈
# 保持开发工作树继续运行
cd ~/project
git worktree add feature/auth ../wt-review-auth
cd ../wt-review-auth                 # 检视同事代码
# 无需关闭开发窗口，两个项目并行运行

# 🚨 线上紧急 Bug
git worktree add -b hotfix/payment ../wt-hotfix
cd ../wt-hotfix
npm run dev                          # 独立运行
# 修复、测试、提交，然后删除

# 🌆 下午总结
git worktree list
git worktree remove ../wt-review-auth
git worktree remove ../wt-hotfix
git worktree prune
```

### Q4：如何降低依赖重复安装成本

建议优先使用包管理器缓存能力，而不是跨工作树硬链接依赖目录。

```bash
pnpm config set store-dir ../.pnpm-store
```

---

## 🎓 学习资源

- **官方文档**: `man git-worktree` 或 `git worktree --help`
- **Git 官方**: https://git-scm.com/docs/git-worktree
- **案例集**: 在团队 Confluence 中创建工作树使用案例库

---

## 📞 技术支持

遇到问题？

1. **检查状态**: `git worktree list --verbose`
2. **清理环境**: `git worktree prune`
3. **查看日志**: `cd .git && grep -r "worktree" logs/`
4. **联系技术负责人**: 在团队 Slack 中 @tech-lead

---

## 📝 更新日志

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-04-26 | 初始版本发布 |
| - | - | 包含基础用法、最佳实践、高级技巧 |

---

**最后更新**: 2026 年 4 月 26 日  
**维护人**: 技术团队  
**欢迎反馈和改进意见！**
