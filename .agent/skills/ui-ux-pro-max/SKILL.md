---
2: name: ui-ux-pro-max
3: description: UI/UX 设计智能。50 种风格，21 种调色板，50 种字体组合，20 种图表，9 种技术栈。
---
5: # ui-ux-pro-max
6: 
7: 全面的 Web 和移动应用设计指南。包含 67 种风格、96 种调色板、57 种字体组合、99 条 UX 指南和跨 13 个技术栈的 25 种图表类型。支持基于优先级的建议搜索。

9: ## 前提条件
10: 
11: 检查是否已安装 Python：

```bash
python3 --version || python --version
```

17: 如果未安装 Python，请根据您的操作系统进行安装：
18: 
19: **macOS:**
```bash
brew install python3
```

24: **Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

29: **Windows:**
```powershell
winget install Python.Python.3.12
```

---

36: ## 如何使用此 Skill
37: 
38: 当用户请求 UI/UX 相关工作（设计、构建、创建、实现、审核、修复、改进）时，请遵循以下流程：

40: ### 第 1 步：分析用户需求

42: 从用户请求中提取关键信息：
43: - **产品类型**：SaaS、电子商务、作品集、仪表板、落地页等。
44: - **风格关键词**：极简、趣味、专业、优雅、深色模式等。
45: - **行业**：医疗保健、金融科技、游戏、教育等。
46: - **技术栈**：React、Vue、Next.js，或默认为 `html-tailwind`

48: ### 第 2 步：生成设计系统（必选）
49: 
50: **始终从 `--design-system` 开始**，以获取包含推理的全面建议：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

56: 此命令将：
57: 1. 并行搜索 5 个领域（产品、风格、颜色、落地页、排版）
58: 2. 应用来自 `ui-reasoning.csv` 的推理规则来选择最佳匹配项
59: 3. 返回完整的设计系统：模式、风格、颜色、排版、效果
60: 4. 包含应避免的反模式

62: **示例：**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

67: ### 第 2b 步：持久化设计系统（Master + Overrides 模式）

69: 如需保存设计系统以便跨会话进行分层检索，请添加 `--persist`：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

75: 这将创建：
76: - `design-system/MASTER.md` —— 包含所有设计规则的全局真相来源
77: - `design-system/pages/` —— 页面特定覆盖的文件夹

79: **包含页面特定覆盖：**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

83: 这还将创建：
84: - `design-system/pages/dashboard.md` —— 与 Master 的页面特定偏差

87: **分层检索的工作原理：**
88: 1. 构建特定页面（如“Checkout”）时，首先检查 `design-system/pages/checkout.md`
89: 2. 如果页面文件存在，其规则将 **覆盖** Master 文件
90: 3. 如果不存在，则仅使用 `design-system/MASTER.md`

92: ### 第 3 步：辅以详细搜索（根据需要）
93: 
94: 获取设计系统后，使用领域搜索获取更多细节：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

100: **何时使用详细搜索：**
101: 
102: | 需求 | 领域 | 示例 |
103: |------|--------|---------|
104: | 更多风格选项 | `style` | `--domain style "glassmorphism dark"` |
105: | 图表建议 | `chart` | `--domain chart "real-time dashboard"` |
106: | UX 最佳实践 | `ux` | `--domain ux "animation accessibility"` |
107: | 备选字体 | `typography` | `--domain typography "elegant luxury"` |
108: | 落地页结构 | `landing` | `--domain landing "hero social-proof"` |

110: ### 第 4 步：技术栈指南（默认：html-tailwind）
111: 
112: 获取特定实现的最佳实践。如果用户未指定技术栈，则 **默认为 `html-tailwind`**。

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

118: 可选技术栈：`html-tailwind`、`react`、`nextjs`、`vue`、`svelte`、`swiftui`、`react-native`、`flutter`、`shadcn`、`jetpack-compose`

---

122: ## 搜索参考
123: 
124: ### 可选领域
125: 
126: | 领域 | 用途 | 示例关键词 |
127: |--------|---------|------------------|
128: | `product` | 产品类型建议 | SaaS, e-commerce, portfolio, healthcare, beauty, service |
129: | `style` | UI 风格、颜色、效果 | glassmorphism, minimalism, dark mode, brutalism |
130: | `typography` | 字体组合、Google Fonts | elegant, playful, professional, modern |
131: | `color` | 按产品类型的调色板 | saas, ecommerce, healthcare, beauty, fintech, service |
132: | `landing` | 页面结构、CTA 策略 | hero, hero-centric, testimonial, pricing, social-proof |
133: | `chart` | 图表类型、库建议 | trend, comparison, timeline, funnel, pie |
134: | `ux` | 最佳实践、反模式 | animation, accessibility, z-index, loading |
135: | `react` | React/Next.js 性能 | waterfall, bundle, suspense, memo, rerender, cache |
136: | `web` | Web 界面指南 | aria, focus, keyboard, semantic, virtualize |
137: | `prompt` | AI 提示词、CSS 关键词 | (style name) |
138: 
139: ### 可选技术栈
140: 
141: | 技术栈 | 侧重点 |
142: |-------|-------|
143: | `html-tailwind` | Tailwind 实用类、响应式、a11y（默认） |
144: | `react` | 状态、Hooks、性能、模式 |
145: | `nextjs` | SSR、路由、图像、API 路由 |
146: | `vue` | Composition API, Pinia, Vue Router |
147: | `svelte` | Runes, stores, SvelteKit |
148: | `swiftui` | 视图、状态、导航、动画 |
149: | `react-native` | 组件、导航、列表 |
150: | `flutter` | 小部件、状态、布局、主题 |
151: | `shadcn` | shadcn/ui 组件、主题、表单、模式 |
152: | `jetpack-compose` | Composables, Modifiers, State Hoisting, Recomposition |

---

156: ## 示例流程
157: 
158: **用户请求：**“Làm landing page cho dịch vụ chăm sóc da chuyên nghiệp”（为专业护肤服务制作落地页）
159: 
160: ### 第 1 步：分析需求
161: - 产品类型：美容/水疗服务
162: - 风格关键词：优雅、专业、柔和
163: - 行业：美容/健康
164: - 技术栈：html-tailwind（默认）
165: 
166: ### 第 2 步：生成设计系统（必选）

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service elegant" --design-system -p "Serenity Spa"
```

172: **输出：** 包含模式、风格、颜色、排版、效果和反模式的完整设计系统。

174: ### 第 3 步：辅以详细搜索（根据需要）

```bash
177: # 获取动画和可访问性的 UX 指南
178: python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux
179: 
180: # 如果需要，获取备选排版选项
181: python3 skills/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography
182: ```
183: 
184: ### 第 4 步：技术栈指南

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

190: **然后：** 综合设计系统 + 详细搜索，并实现设计。

---

194: ## 输出格式
195: 
196: `--design-system` 标志支持两种输出格式：

```bash
199: # ASCII 框（默认）—— 最适合终端显示
200: python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system
201: 
202: # Markdown —— 最适合文档记录
203: python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

208: ## 更好结果的建议
209: 
210: 1. **指定具体关键词** —— “healthcare SaaS dashboard” > “app”
211: 2. **多次搜索** —— 不同的关键词会揭示不同的洞察
212: 3. **结合领域** —— 风格 + 排版 + 颜色 = 完整的设计系统
213: 4. **始终检查 UX** —— 搜索“animation”、“z-index”、“accessibility”查找常见问题
214: 5. **使用技术栈标志** —— 获取特定实现的最佳实践
215: 6. **迭代** —— 如果第一次搜索不匹配，尝试不同的关键词
216: 
217: ---
218: 
219: ## 专业 UI 的通用规则
220: 
221: 以下是经常被忽视、导致 UI 显得不专业的问题：
222: 
223: ### 图标和视觉元素
224: 
225: | 规则 | 推荐 (Do) | 不推荐 (Don't) |
226: |------|----|----- |
227: | **不使用表情符号图标** | 使用 SVG 图标 (Heroicons, Lucide, Simple Icons) | 使用 🎨 🚀 ⚙️ 等表情符号作为 UI 图标 |
228: | **稳定的悬停状态** | 悬停时使用颜色/不透明度过渡 | 使用导致布局偏移的缩放变换 |
229: | **正确的品牌徽标** | 从 Simple Icons 研究官方 SVG | 猜测或使用错误的徽标路径 |
230: | **一致的图标大小** | 使用固定的 viewBox (24x24) 并设置 w-6 h-6 | 随机混合不同的图标大小 |
231: 
232: ### 交互和光标
233: 
234: | 规则 | 推荐 (Do) | 不推荐 (Don't) |
235: |------|----|----- |
236: | **指针光标** | 为所有可点击/可悬停的卡片添加 `cursor-pointer` | 在交互元素上保留默认光标 |
237: | **悬停反馈** | 提供视觉反馈（颜色、阴影、边框） | 无指示表明元素是可交互的 |
238: | **平滑过渡** | 使用 `transition-colors duration-200` | 瞬时状态更改或过慢 (>500ms) |
239: 
240: ### 浅色/深色模式对比度
241: 
242: | 规则 | 推荐 (Do) | 不推荐 (Don't) |
243: |------|----|----- |
244: | **浅色模式玻璃卡片** | 使用 `bg-white/80` 或更高的不透明度 | 使用 `bg-white/10`（由于太透明而不易察觉） |
245: | **浅色模式文本对比度** | 文本使用 `#0F172A` (slate-900) | 正文文本使用 `#94A3B8` (slate-400) |
246: | **浅色模式柔和文本** | 至少使用 `#475569` (slate-600) | 使用 gray-400 或更浅的颜色 |
247: | **边框可见度** | 在浅色模式下使用 `border-gray-200` | 使用 `border-white/10`（不可见） |
248: 
249: ### 布局和间距
250: 
251: | 规则 | 推荐 (Do) | 不推荐 (Don't) |
252: |------|----|----- |
253: | **悬浮导航栏** | 添加 `top-4 left-4 right-4` 间距 | 导航栏紧贴 `top-0 left-0 right-0` |
254: | **内容内边距** | 考虑到固定导航栏的高度 | 让内容隐藏在固定元素后面 |
255: | **一致的最大宽度** | 使用相同的 `max-w-6xl` 或 `max-w-7xl` | 混合使用不同的容器宽度 |
256: 
257: ---
258: 
259: ## 交付前自检清单
260: 
261: 在交付 UI 代码之前，请核实以下各项：
262: 
263: ### 视觉质量
264: - [ ] 不使用表情符号作为图标（使用 SVG 代替）
265: - [ ] 所有图标来自一致的图标集 (Heroicons/Lucide)
266: - [ ] 品牌徽标正确（经 Simple Icons 验证）
267: - [ ] 悬停状态不会导致布局偏移
268: - [ ] 直接使用主题颜色 (bg-primary)，而不是 var() 包装器
269: 
270: ### 交互
271: - [ ] 所有可点击元素都有 `cursor-pointer`
272: - [ ] 悬停状态提供清晰的视觉反馈
273: - [ ] 过渡平滑 (150-300ms)
274: - [ ] 键盘导航的焦点状态可见
275: 
276: ### 浅色/深色模式
277: - [ ] 浅色模式文本具有足够的对比度（最小 4.5:1）
278: - [ ] 玻璃/透明元素在浅色模式下可见
279: - [ ] 边框在两种模式下均可见
280: - [ ] 交付前测试两种模式
281: 
282: ### 布局
283: - [ ] 悬浮元素与边缘有适当间距
284: - [ ] 没有内容隐藏在固定导航栏后面
285: - [ ] 在 375px、768px、1024px、1440px 下响应正常
286: - [ ] 移动端无水平滚动
287: 
288: ### 可访问性
289: - [ ] 所有图像都有替代文本 (alt text)
290: - [ ] 表单输入有标签
291: - [ ] 颜色不是唯一的指示器
292: - [ ] 尊重 `prefers-reduced-motion` 设置
293: 
294: ---
