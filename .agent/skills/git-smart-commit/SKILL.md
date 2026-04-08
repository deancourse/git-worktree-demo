---
2: name: Git Smart Commit
3: description: 将杂乱的 git 变更，依功能逻辑自动拆分成多个有意义的 conventional commit
---

6: # Git Smart Commit — 智慧拆分提交
7: 
8: 将目前所有 staged / unstaged 变更，依功能逻辑分群后，逐批 `git add` + `git commit`。

---

12: ## 流程
13: 
14: ### 1. 检查变更状态

16: 执行以下指令取得完整变更清单：
17: 
18: ```bash
19: git status --short
20: ```
21: 
22: 若没有任何变更，告知用户“目前没有需要提交的变更”后结束。
23: 
24: 接着取得所有变更的 diff 内容（用来判断分群逻辑）：

```bash
git diff
git diff --cached
```

---

33: ### 2. 分析并分群
34: 
35: 根据以下维度，将档案变更分成多个 **commit 分组**，每组代表一个独立的逻辑单元：

37: #### 分群依据（优先顺序）
38: 
39: | 优先级 | 维度 | 范例 |
40: |--------|------|------|
41: | 1 | **项目脚手架 / 设定档** | `package.json`, `vite.config.*`, `.gitignore`, `README.md`, `tsconfig.json` |
42: | 2 | **资料层 / config data** | `src/data/*.js`, `src/constants/*`, `src/config/*` |
43: | 3 | **组件（按组件名称分组）** | `src/components/Hero.jsx` + 对应测试 + 对应样式 |
44: | 4 | **页面 / 路由** | `src/pages/*`, `src/routes/*`, `src/App.jsx` |
45: | 5 | **全局样式** | `src/index.css`, `src/styles/*`, `src/theme/*` |
46: | 6 | **工具 / hooks / 型别** | `src/utils/*`, `src/hooks/*`, `src/types/*` |
47: | 7 | **测试** | `__tests__/*`, `*.test.*`, `*.spec.*` |
48: | 8 | **文件 / 其他** | `docs/*`, `*.md`（非 README）, 其他杂项 |

50: #### 分群规则
51: 
52: - **同一组件的 JSX/TSX + CSS Module + 测试 → 归为同一组**
53: - **相关的资料档如果是为某个组件服务 → 可考虑合并或独立**，取决于变更量
54: - **若某一组只有 1 个档案且改动极小（< 5 行）→ 合并到最相关的邻近组**
55: - **新增档案用 `feat`，修改用 `fix` / `refactor` / `style`，删除用 `chore`**

---

59: ### 3. 产出 Commit 计划
60: 
61: 在执行任何 git 操作之前，先列出计划让用户确认：
62: 
63: ```
64: 📋 Commit 计划（共 N 个 commit）
65: 
66: 1. chore(project): 初始化项目设定与相依套件
67:    → package.json, vite.config.js, .gitignore
68: 
69: 2. feat(data): 新增首页各区块的设定资料
70:    → src/data/navigation.js, src/data/hero.js, ...

72: 3. feat(navbar): 新增 Navbar 组件（含 RWD 汉堡菜单）
73:    → src/components/Navbar.jsx
74: 
75: ...
76: 
77: 确认执行？(Y/n)
78: ```
79: 
80: 使用 `notify_user` 工具向用户展示计划并等待确认。

---

84: ### 4. 逐批执行 Commit
85: 
86: 用户确认后，对每一组依序执行：

```bash
git add <file1> <file2> ...
git commit -m "<type>(<scope>): <subject>"
```

93: #### Commit Message 格式
94: 
95: ```
96: <type>(<scope>): <简短描述，简体中文>
97: ```
98: 
99: **type 对照表：**
100: 
101: | type | 使用时机 |
102: |------|---------|
103: | `feat` | 新增功能、组件、页面 |
104: | `fix` | 修复 bug |
105: | `style` | 纯样式调整（不影响逻辑） |
106: | `refactor` | 重构（不改变行为） |
107: | `chore` | 杂务（设定档、脚手架、CI） |
108: | `docs` | 文件更新 |
109: | `test` | 测试相关 |

111: **scope 规则：**
112: - 组件：用组件名称小写，例如 `hero`, `navbar`, `pricing`
113: - 资料层：`data`
114: - 全局样式：`style`
115: - 项目设定：`project`
116: - 多个范围：用最主要的一个，不要用斜线串接
117: 
118: **subject 规则：**
119: - 使用简体中文
120: - 不超过 50 字
121: - 不以句号结尾
122: - 用“动词开头”：新增、调整、修正、移除、重构

---

126: ### 5. 确认结果
127: 
128: 所有 commit 完成后，执行：
129: 
130: ```bash
131: git log --oneline -20
132: ```
133: 
134: 将结果展示给用户，确认所有 commit 都已正确建立。
135: 
136: ---
137: 
138: ## 边界情况处理
139: 
140: - **有冲突或 merge 状态**：提醒用户先解决冲突，不执行任何操作
141: - **有 `.env` 或敏感档案**：提醒用户确认是否应被 gitignore，不自动提交
142: - **变更量极大（> 50 个档案）**：先产出分组摘要，请用户确认后再执行
143: - **用户已有部分 staged 变更**：尊重已 staged 的状态，将其视为一个独立分组或合并到最相关的分组
