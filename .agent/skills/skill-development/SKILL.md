---
name: Skill Development
description: 当用户想要“创建 Skill”、“将 Skill 添加到插件”、“编写新 Skill”、“改进 Skill 描述”、“整理 Skill 内容”或需要有关 Claude Code 插件的 Skill 结构、渐进式披露或 Skill 开发最佳实践的指导时，应使用此 Skill。
version: 0.1.0
---

# Claude Code 插件的 Skill 开发

此 Skill 为创建有效的 Claude Code 插件 Skill 提供指导。

## 关于 Skill

Skill 是模块化的、自包含的软件包，通过提供专业知识、工作流和工具来扩展 Claude 的能力。可以将它们视为针对特定领域或任务的“入职指南”——它们将 Claude 从一个通用型智能体转变为一个具备任何模型都无法完全拥有的过程性知识的专业型智能体。

### Skill 提供什么

1. 专业工作流 - 针对特定领域的多个步骤的流程
2. 工具集成 - 使用特定文件格式或 API 的指令
3. 领域专长 - 公司特定的知识、模式、业务逻辑
4. 捆绑资源 - 用于复杂和重复任务的脚本、参考资料和资产

### Anatomy of a Skill (Skill 的解剖结构)

每个 Skill 都由一个必需的 SKILL.md 文件和可选的捆绑资源组成：

```
skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter 元数据 (必需)
│   │   ├── name: (必需)
│   │   └── description: (必需)
│   └── Markdown 指令 (必需)
└── Bundled Resources (可选)
    ├── scripts/          - 可执行代码 (Python/Bash 等)
    ├── references/       - 旨在根据需要加载到上下文中的参考文档
    └── assets/           - 在输出中使用的文件 (模板、图标、字体等)
```

#### SKILL.md (必需)

**元数据质量：** YAML frontmatter 中的 `name` 和 `description` 决定了 Claude 何时使用该 Skill。请具体说明该 Skill 的功能及其使用时机。使用第三人称（例如“当……时应使用此 Skill”，而不是“当……时使用此 Skill”）。

#### 捆绑资源 (可选)

##### 脚本 (`scripts/`)

用于需要确定性可靠性或重复编写的任务的可执行代码 (Python/Bash 等)。

- **何时包含**：当相同的代码被重复编写或需要确定性可靠性时
- **示例**：用于 PDF 旋转任务的 `scripts/rotate_pdf.py`
- **优点**：Token 效率高、确定性强、可以在不加载到上下文页面的情况下执行
- **注意**：脚本可能仍需要被 Claude 读取以进行修补或针对特定环境的调整

##### 参考资料 (`references/`)

旨在根据需要加载到上下文中以告知 Claude 的过程和思路的文档和参考材料。

- **何时包含**：用于 Claude 在工作时应参考的文档
- **示例**：用于财务模式的 `references/finance.md`、公司 NDA 模板的 `references/mnda.md`、公司政策的 `references/policies.md`、API 规范的 `references/api_docs.md`
- **用例**：数据库模式、API 文档、领域知识、公司政策、详细的工作流指南
- **优点**：保持 SKILL.md 精简，仅在 Claude 确定需要时才加载
- **最佳实践**：如果文件较大（>10k 词），请在 SKILL.md 中包含 grep 搜索模式
- **避免重复**：信息应存在于 SKILL.md 或参考文件中，而不是两者都有。推荐将详细信息放在参考文件中，除非它确实是 Skill 的核心——这可以保持 SKILL.md 精简，同时使信息可被发现，又不会占用过多的上下文窗口。仅在 SKILL.md 中保留必要的过程性指令和工作流指南；将详细的参考材料、模式和示例移至参考文件。

##### 资产 (`assets/`)

不打算加载到上下文中，而是供 Claude 生成的输出中使用的文件。

- **何时包含**：当 Skill 需要将在最终输出中使用的文件时
- **示例**：品牌资产的 `assets/logo.png`、PowerPoint 模板的 `assets/slides.pptx`、HTML/React 样板的 `assets/frontend-template/`、排版用的 `assets/font.ttf`
- **用例**：模板、图像、图标、样板代码、字体、被复制或修改的示例文档
- **优点**：将输出资源与文档分离开来，使 Claude 能够使用文件而无需将其加载到上下文中

### Progressive Disclosure Design Principle (渐进式披露设计原则)

Skill 使用三层加载系统来高效管理上下文：

1. **元数据 (name + description)** - 始终在上下文中 (~100 词)
2. **SKILL.md 正文** - 当 Skill 触发时 (<5k 词)
3. **捆绑资源** - 根据 Claude 的需要加载 (无上限*)

*无上限是因为脚本可以在不读入上下文窗口的情况下执行。

## Skill Creation Process (Skill 创建流程)

按照“Skill 创建流程”顺序执行操作，仅当有明确理由说明步骤不适用时才跳过。

### 第 1 步：通过具体示例理解 Skill

仅当已经清楚理解 Skill 的使用模式时才跳过此步骤。即使在处理现有 Skill 时，该步骤仍然极具价值。

要创建有效的 Skill，请清楚地了解 Skill 将如何使用的具体示例。这种理解可以来自用户的直接示例，也可以来自经过用户反馈验证的生成示例。

例如，在构建图像编辑器 Skill 时，相关问题包括：

- “图像编辑器 Skill 应支持哪些功能？编辑、旋转，还有别的吗？”
- “您能举一些如何使用此 Skill 的例子吗？”
- “我可以想象用户会提出‘去除这张图片的红眼’或‘旋转这张图片’之类的请求。您还想象过此 Skill 的其他使用方式吗？”
- “用户会说什么来触发此 Skill？”

为了避免用户感到困扰，请避免在单条消息中询问过多问题。从最重要的问题开始，并根据需要进行跟进以提高效率。

当清楚了解 Skill 应支持的功能后，结束此步骤。

### 第 2 步：规划可重用的 Skill 内容

要将具体示例转化为有效的 Skill，请通过以下方式分析每个示例：

1. 考虑如何从头开始执行该示例
2. 识别在重复执行这些工作流时哪些脚本、参考资料和资产会有所帮助

示例：构建 `pdf-editor` Skill 来处理诸如“帮我旋转这个 PDF”之类的查询时，分析显示：

1. 旋转 PDF 每次都需要重写相同的代码
2. 在 Skill 中存储 `scripts/rotate_pdf.py` 脚本会有所帮助

示例：为诸如“帮我构建一个待办事项应用”或“帮我构建一个仪表板来追踪我的步数”之类的查询设计 `frontend-webapp-builder` Skill 时，分析显示：

1. 编写前端 Web 应用每次都需要相同的 HTML/React 样板
2. 在 Skill 中存储包含样板 HTML/React 项目文件的 `assets/hello-world/` 模板会有所帮助

示例：构建 `big-query` Skill 来处理诸如“今天有多少用户登录？”之类的查询时，分析显示：

1. 查询 BigQuery 每次都需要重新探索表模式和关系
2. 在 Skill 中存储记录表模式的 `references/schema.md` 文件会有所帮助

**对于 Claude Code 插件：** 构建 hooks Skill 时，分析显示：
1. 开发者反复需要验证 hooks.json 并测试 hook 脚本
2. `scripts/validate-hook-schema.sh` and `scripts/test-hook.sh` 工具会有帮助
3. `references/patterns.md` 用于详细的 hook 模式，以避免 SKILL.md 过于臃肿

要建立 Skill 的内容，请分析每个具体示例以创建要包含的可重用资源列表：脚本、参考资料和资产。

### 第 3 步：创建 Skill 结构

对于 Claude Code 插件，创建 Skill 目录结构：

```bash
mkdir -p plugin-name/skills/skill-name/{references,examples,scripts}
touch plugin-name/skills/skill-name/SKILL.md
```

**注意：** 与使用 `init_skill.py` 的通用 Skill 创建程序不同，插件 Skill 直接在插件的 `skills/` 目录中创建，采用更简单的手动结构。

### 第 4 步：编辑 Skill

编辑（新生成的或现有的）Skill 时，请记住 Skill 是为另一个 Claude 实例使用的。专注于包含那些对 Claude 有益且不显见的信息。考虑哪些过程性知识、领域特定细节或可重用资产可以帮助另一个 Claude instance 更有效地执行这些任务。

#### 从可重用的 Skill 内容开始

要开始实现，请从上面识别的可重用资源开始：`scripts/`、`references/` 和 `assets/` 文件。请注意，此步骤可能需要用户输入。例如，在实现 `brand-guidelines` Skill 时，用户可能需要提供要存储在 `assets/` 中的品牌资产或模板，或者要存储在 `references/` 中的文档。

此外，删除该 Skill 不需要的所有示例文件和目录。仅创建您实际需要的目录（references/、examples/、scripts/）。

#### 更新 SKILL.md

**写作风格：** 使用 **祈使句/不定式形式**（动词开头的指令）编写整个 Skill，而不是第二人称。使用客观的、教学式的语言（例如，“要完成 X，请执行 Y”，而不是“你应该执行 X”或“如果你需要执行 X”）。这有助于保持 AI 消费的一致性和清晰度。

**描述 (Frontmatter)：** 使用第三人称格式并包含具体的触发短语：

```yaml
---
name: Skill 名称
description: 当用户要求“具体短语 1”、“具体短语 2”、“具体短语 3”时，应使用此 Skill。包含用户为触发此 Skill 会说出的确切短语。请保持具体且明确。
version: 0.1.0
---
```

**良好的描述示例：**
```yaml
description: 当用户要求“创建 hook”、“添加 PreToolUse hook”、“验证工具使用”、“实现基于提示词的 hook”或提到 hook 事件（PreToolUse、PostToolUse、Stop）时，应使用此 Skill。
```

**糟糕的描述示例：**
```yaml
description: 在处理 hook 时使用此 Skill。 # 人称错误，含糊不清
description: 当用户需要 hook 帮助时加载。 # 非第三人称
description: 提供 hook 指导。 # 无触发短语
```

要完成 SKILL.md 正文，请回答以下问题：

1. 该 Skill 的目的是什么（用几句话说明）？
2. 该 Skill 何时应被使用？（将其包含在 frontmatter 描述中，并带有具体的触发短语）
3. 在实践中，Claude 应如何使用该 Skill？应引用上面开发的所有可重用 Skill 内容，以便 Claude 知道如何使用它们。

**保持 SKILL.md 精简：** 正文的目标字数为 1,500-2,000 字。将详细内容移至 references/：
- 详细模式 → `references/patterns.md`
- 高级技术 → `references/advanced.md`
- 迁移指南 → `references/migration.md`
- API 参考 → `references/api-reference.md`

**在 SKILL.md 中引用资源：**
```markdown
## 其他资源

### 参考文件

有关详细模式和技术，请咨询：
- **`references/patterns.md`** - 常用模式
- **`references/advanced.md`** - 高级用例

### 示例文件

Working examples in `examples/`:
- **`example-script.sh`** - 现成示例
```

### 第 5 步：验证与测试

**对于插件 Skill，验证方式与通用 Skill 不同：**

1. **检查结构**：Skill 目录位于 `plugin-name/skills/skill-name/`
2. **验证 SKILL.md**：具有包含名称和描述的 frontmatter
3. **检查触发短语**：描述包含具体的客户端查询
4. **验证写作风格**：正文使用祈使句/不定式形式，而非第二人称
5. **测试渐进式披露**：SKILL.md 保持精简 (~1,500-2,000 字)，详细内容位于 references/
6. **检查引用**：所有引用的文件均存在
7. **验证示例**：示例完整且正确
8. **测试脚本**：脚本可执行且工作正常

**使用 Skill 审核代理 (skill-reviewer agent)：**
```
询问：“Review my skill and check if it follows best practices”（审核我的 Skill 并检查它是否遵循最佳实践）
```

The skill-reviewer agent will check description quality, content organization, and progressive disclosure.

### 第 6 步：迭代

测试 Skill 后，用户可能会要求进行改进。通常这发生在刚使用完 Skill 之后，此时对 Skill 的表现有着明确的背景信息。

**迭代工作流：**
1. 在实际任务中使用 Skill
2. 观察困难点或效率低下的地方
3. 确定应如何更新 SKILL.md 或捆绑资源
4. 实施更改并再次测试

**常见改进：**
- 加强描述中的触发短语
- 将长章节从 SKILL.md 移至 references/
- 添加缺失的示例或脚本
- 澄清含糊不清的指令
- 添加边缘情况处理

## 插件特定的注意事项

### 插件中 Skill 的位置

插件 Skill 位于插件的 `skills/` 目录中：

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
├── agents/
└── skills/
    └── my-skill/
        ├── SKILL.md
        ├── references/
        ├── examples/
        └── scripts/
```

### 自动发现

Claude Code 会自动发现 Skill：
- 扫描 `skills/` 目录
- 查找包含 `SKILL.md` 的子目录
- 始终加载 Skill 元数据 (name + description)
- 当 Skill 触发时载入 SKILL.md 正文
- 根据需要载入 references/examples
276: - 根据需要载入 references/examples

### 无须打包

插件 Skill 作为插件的一部分分发，而不是作为单独的 ZIP 文件。用户在安装插件时即可获得 Skill。

### 插件中的测试

通过本地安装插件来测试 Skill：

```bash
# 使用 --plugin-dir 进行测试
cc --plugin-dir /path/to/plugin

# 提出本该触发该 Skill 的问题
# 验证 Skill 是否正确载入
```

## Plugin-Dev 中的示例

研究该插件中的 Skill，作为最佳实践示例：

**hook-development Skill：**
- 优秀的触发短语：“create a hook”、“add a PreToolUse hook”等
- Lean SKILL.md (1,651 words)
- 3 references/ files for detailed content
- 3 examples/ of working hooks
- 3 scripts/ utilities

**agent-development Skill：**
- 强力触发词：“create an agent”、“agent frontmatter”等
- Focused SKILL.md (1,438 words)
- 参考资料包含来自 Claude Code 的 AI 生成提示词
- 完整的 Agent 示例

**plugin-settings Skill：**
- 特定触发短语：“plugin settings”、“ .local.md 文件”、“YAML frontmatter”
- 参考资料显示了实际实现 (multi-agent-swarm, ralph-wiggum)
- Working parsing scripts

每个示例都展示了渐进式披露和强力的触发机制。

## Progressive Disclosure in Practice (渐进式披露实践)

### SKILL.md 中应包含的内容

**包含（当 Skill 触发时始终载入）：**
- 核心概念和概览
- 基本流程和工作流
- 快速参考表
- 指向 references/examples/scripts 的指针
- 最常见的用例

**保持在 3,000 字以内，理想情况下为 1,500-2,000 字**

### references/ 中应包含的内容

**移至 references/（根据需要载入）：**
- 详细模式和高级技术
- 全面的 API 文档
- 迁移指南
- 边缘情况和故障排除
- 扩展示例和演练

**每个参考文件可以很大（2,000-5,000+ 字）**

### examples/ 中应包含的内容

**可运行的代码示例：**
- 完整的、可运行的脚本
- 配置文件
- 模板文件
- 实际使用示例

**用户可以直接复制并改编这些内容**

### scripts/ 中应包含的内容

**工具脚本：**
- 验证工具
- 测试助手
- 解析实用程序
- 自动化脚本

**应是可执行的并带有文档说明**

## Writing Style Requirements (写作风格要求)

### 祈使句/不定式形式

使用动词开头的指令编写，而非第二人称：

**正确 (祈使句)：**
```
要创建 hook，请定义事件类型。
使用身份验证配置 MCP 服务器。
使用前验证设置。
```

**错误 (第二人称)：**
```
您应该通过定义事件类型来创建 hook。
您需要配置 MCP 服务器。
您必须在使用前验证设置。
```

### 描述中的第三人称

frontmatter 描述必须使用第三人称：

**正确：**
```yaml
description: 当用户要求“创建 X”、“配置 Y”时，应使用此 Skill……
```

**错误：**
```yaml
description: 当你想创建 X 时使用此 Skill……
description: 当用户询问时载入此 Skill……
```

### Objective, Instructional Language (客观的、教学式的语言)

关注做什么，而不是谁该做：

**正确：**
```
使用 sed 解析 frontmatter。
使用 grep 提取字段。
使用前验证值。
```

**错误：**
```
你可以解析 frontmatter……
Claude 应该提取字段……
用户可能会验证值……
```

## Validation Checklist (验证自检清单)

在完成 Skill 前：

**结构：**
- [ ] SKILL.md 文件存在且具有有效的 YAML frontmatter
- [ ] frontmatter 具有 `name` 和 `description` 字段
- [ ] Markdown 正文存在且内容充实
- [ ] 引用的文件确实存在

**描述质量：**
- [ ] 使用第三人称（“当用户要求……时，应使用此 Skill”）
- [ ] 包含用户可能提出的具体触发短语
- [ ] 列出具体的场景（“创建 X”，“配置 Y”）
- [ ] 不含糊或宽泛

**内容质量：**
- [ ] SKILL.md 正文使用祈使句/不定式形式
- [ ] 正文专注且精简（理想情况为 1,500-2,000 字，最大不超过 5,000 字）
- [ ] 详细内容已移至 references/
- [ ] 示例完整且工作正常
- [ ] 脚本可执行且带有文档说明

**渐进式披露：**
- [ ] 核心概念位于 SKILL.md
- [ ] 详细文档位于 references/
- [ ] Working code in examples/
- [ ] 工具脚本位于 scripts/
- [ ] SKILL.md 引用了这些资源

**测试：**
- [ ] Skill 针对预期的用户查询被触发
- [ ] 内容对预期任务有帮助
- [ ] 文件之间没有重复信息
- [ ] 参考资料根据需要加载

## Common Mistakes to Avoid (应避免的常见错误)

### 错误 1：触发描述过弱

❌ **不佳：**
```yaml
description: 提供 hook 处理指南。
```

**原因：** 含糊不清，没有具体的触发短语，非第三人称

✅ **良好：**
```yaml
description: 当用户要求“创建 hook”、“添加 PreToolUse hook”、“验证工具使用”或提到 hook 事件时，应使用此 Skill。提供全面的 hook API 指南。
```

**原因：** 第三人称，具体的短语，具体的场景

### 错误 2：SKILL.md 中内容过多

❌ **不佳：**
```
skill-name/
└── SKILL.md  (8,000 words - everything in one file)
```

**原因：** 当 Skill 加载时会使上下文膨胀，详细内容始终被加载

✅ **良好：**
```
skill-name/
├── SKILL.md  (1,800 字 - 核心精要)
└── references/
    ├── patterns.md (2,500 字)
    └── advanced.md (3,700 字)
```

**原因：** 渐进式披露，详细内容仅在需要时加载

### 错误 3：使用第二人称写作

❌ **不佳：**
```markdown
你应该首先阅读配置文件。
你可以通过验证输入来开始。
你可以使用 grep 工具进行搜索。
```

**原因：** 第二人称，非祈使句形式

✅ **良好：**
```markdown
首先阅读配置文件。
在处理前验证输入。
使用 grep 工具搜索模式。
```

**原因：** 祈使句形式，直接的指令

### 错误 4：缺失资源引用

❌ **不佳：**
```markdown
# SKILL.md

[核心内容]

[未提及 references/ 或 examples/]
```

**原因：** Claude 并不知道参考资料的存在

✅ **良好：**
```markdown
# SKILL.md

[核心内容]

## 其他资源

### 参考文件
- **`references/patterns.md`** - 详细模式
- **`references/advanced.md`** - 高级技术

### 示例
- **`examples/script.sh`** - 现成示例
```

**原因：** Claude 知道从哪里寻找更多信息

## Quick Reference (快速参考)

### Minimal Skill (最简 Skill)

```
skill-name/
└── SKILL.md
```

适用于：简单的知识，不需要复杂的资源

### Standard Skill (Recommended) (标准 Skill (推荐))

```
skill-name/
├── SKILL.md
├── references/
│   └── detailed-guide.md
└── examples/
    └── working-example.sh
```

适用于：大多数具有详细文档的插件 Skill

### Complete Skill (完整 Skill)

```
skill-name/
├── SKILL.md
├── references/
│   ├── patterns.md
│   └── advanced.md
├── examples/
│   ├── example1.sh
│   └── example2.json
└── scripts/
    └── validate.sh
```

适用于：具有验证工具的复杂领域

## Best Practices Summary (最佳实践总结)

✅ **推荐行为：**
- 在描述中使用第三人称（“当用户要求……时，应使用此 Skill”）
- 包含具体的触发短语（“创建 X”，“配置 Y”）
- 保持 SKILL.md 精简 (1,500-2,000 字)
- 使用渐进式披露（将细节移至 references/）
- 使用祈使句/不定式形式编写
- 清晰地引用支持文件
- 提供现成的示例
- 为常见操作创建工具脚本
- 研究 plugin-dev 的 Skill 作为模板

❌ **杜绝行为：**
- 在任何地方使用第二人称
- 触发条件含糊不清
- 将所有内容都放在 SKILL.md 中（>3,000 字且无参考资料/）
- 使用第二人称（“你应该……”）编写
- 让资源处于未引用状态
- 包含损坏或不完整的示例
- 跳过验证

## 其他资源

### 学习这些 Skill

Plugin-dev 的 Skill 展示了最佳实践：
- `../hook-development/` - 渐进式披露，实用程序
- `../agent-development/` - AI 辅助创建，参考资料
- `../mcp-integration/` - 全面的参考资料
- `../plugin-settings/` - 实际示例
- `../command-development/` - 清楚的关键概念
- `../plugin-structure/` - 良好的组织结构

### 参考文件

有关完整的 Skill 创建方法：
- **`references/skill-creator-original.md`** - 完整的 Skill Creator 原始内容

## Implementation Workflow (实现工作流)

为您的插件创建 Skill 的步骤：

1. **理解用例**：识别 Skill 使用的具体示例
2. **规划资源**：确定需要的脚本/参考资料/示例
3. **创建结构**：`mkdir -p skills/skill-name/{references,examples,scripts}`
4. **写入 SKILL.md**：
   - 使用第三人称描述和触发短语的 frontmatter
   - 祈使句形式的精简内容 (1,500-2,000 字)
   - 引用支持文件
5. **添加资源**：根据需要创建 references/、examples/、scripts/
6. **验证**：检查描述、写作风格、组织方式
7. **测试**：验证 Skill 针对预期的触发条件是否载入
8. **迭代**：根据使用情况进行改进

专注于强力的触发说明、渐进式披露和祈使句写作风格，以创建能在需要时加载并提供针对性指导的有效 Skill。
