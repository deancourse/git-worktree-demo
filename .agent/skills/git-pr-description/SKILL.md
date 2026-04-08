---
name: Git PR Description
description: 根据当前 branch 与目标 branch 的差异，自动产生 Pull Request 的 Title 与 Description。当用户提到“PR”、“Pull Request”、“写 PR”、“PR 描述”、“PR description”、“建立 PR”时触发此 Skill。
---

# Git PR Description — 自动生成 PR 标题与描述

根据当前 branch 相对于目标 branch（默认 `master`）的所有 commit 与 diff，产出结构化的 PR Title 与 Description。

---

## 流程

### 1. 确认分支信息

取得当前 branch 名称与目标 branch：

```bash
git branch --show-current
```

默认目标 branch 为 `master`。若用户指定其他 base branch，以用户指定为准。

确认当前 branch 相对于目标 branch 有 commit 差异：

```bash
git log --oneline master..HEAD
```

若无差异，告知用户“当前 branch 与目标 branch 没有差异”后结束。

---

### 2. 搜集变更信息

取得完整的 commit 列表与 diff：

```bash
# commit 摘要
git log --oneline master..HEAD

# 详细 commit 信息
git log --format="%h %s%n%b" master..HEAD

# 变更文件统计
git diff --stat master..HEAD

# 完整 diff（用于分析具体改动）
git diff master..HEAD
```

---

### 3. 分析变更内容

根据搜集到的信息，分析：

- **变更的目的**：这个 branch 要解决什么问题或新增什么功能
- **修改范围**：涉及哪些组件、模块、配置文件
- **影响层面**：是否有破坏性变更、是否影响既有功能

---

### 4. 产生 PR Title

#### Title 格式

```
<type>: <简短描述>
```

**type 对照表：**

| type | 使用时机 |
|------|----------|
| `feat` | 新增功能 |
| `fix` | 修复 bug |
| `refactor` | 重构 |
| `style` | 样式调整 |
| `chore` | 杂务、配置 |
| `docs` | 文档更新 |
| `test` | 测试相关 |

**Title 规则：**

- 使用简体中文描述
- 不超过 72 字
- 用动词开头：新增、调整、修正、移除、重构
- 精准描述此 PR 的核心目的

---

### 5. 产生 PR Description

使用 `references/pr-template.md` 中的模板产生 Description。

#### Description 结构

```markdown
## 🎯 为什么要这样做

简述此 PR 的背景与动机

## ⚠️ 修改的内容

依功能与需求分组：
- **功能名称 / 需求项目**：说明此组变更的业务目标
- **修改方向**：简述（性能、修复、样式等）
- **内容**：列出具体修改点，**禁止**出现任何文件路径（包含相对路径），一律改用功能描述，例如“新增手风琴展开动画”而非“修改 `src/components/FAQ.jsx`”

### [功能名称 / 需求项目]
- **修改方向**：...
- **内容**：
  - 具体修改点 1（纯功能描述）
  - 具体修改点 2（纯功能描述）

### [另一个功能名称]
- **修改方向**：...
- **内容**：
  - ...

## 🧪 测试步骤

> **规则：必须为“修改的内容”中列出的每一个模块 / 组件都产生至少一个对应的测试案例，确保所有变更皆被涵盖。**

### 测试案例 1：[针对模块 A 的测试情境]

1. 操作步骤一
2. 操作步骤二
3. **预期结果**：描述预期行为

### 测试案例 2：[针对模块 B 的测试情境]

1. 操作步骤一
2. 操作步骤二
3. **预期结果**：描述预期行为

### 测试案例 N：[依此类推，直到所有变更模块皆有对应测试]
```

---

### 6. 输出结果

将完整的 PR Title + Description 以 **markdown code block** 的形式输出，让用户可以直接复制粘贴到 GitHub PR。

输出格式（整段用 markdown code block 包裹）：

````
```markdown
<title>

<description 完整 markdown 内容，包含 ##、###、列表等格式>
```
````

**注意事项：**
- 不要在 code block 外面加额外的 `📝 PR Title:` 等前缀，直接输出可复制的 markdown
- code block 内的第一行为 PR Title，空一行后接 Description
- 用户可要求调整任何部分后再复制使用
- **重要**：Description 中**禁止**出现任何文件路径（包含相对路径），一律改用纯功能描述。

---

## 🛑 格式严格规范

- **禁止任何 Markdown 链接格式**：`[文字](...)`
- **禁止任何 URI / scheme**：比如 `file://`、`cci:`
- **禁止出现任何文件路径**：不论相对或绝对路径，一律不出现在 Description 中，改以纯功能描述取代

---

## 边界情况处理

- **存在未提交的变更**：提醒用户先提交或 stash，避免遗漏

---

## 其他资源

### 参考文件

- **`references/pr-template.md`** — PR Description 的完整模板，可依团队需求定制化
