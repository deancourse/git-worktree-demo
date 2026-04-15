---
description: UI/UX 設計智慧引導，提供設計系統、色彩方案、字型配對、UX 最佳實踐建議。當使用者要求設計、建立、實作、審查或改善 UI/UX，或提到「設計系統」、「配色」、「字型」、「UI」、「UX」時觸發。
---

# ui-ux-pro-max

全方位 UI/UX 設計指引，涵蓋 67 種風格、96 組色彩方案、57 組字型配對、99 條 UX 準則、25 種圖表類型，支援 13 種技術堆疊。

## 前置條件

確認 Python 環境：

```bash
python3 --version || python --version
```

Scripts 路徑：`.agent/skills/ui-ux-pro-max/scripts/search.py`

## 使用流程

### Step 1：分析需求

從使用者要求中提取：
- **產品類型**：SaaS、電商、作品集、Dashboard、Landing Page 等
- **風格關鍵字**：極簡、活潑、專業、優雅、深色模式 等
- **產業**：醫療、金融、遊戲、教育 等
- **技術堆疊**：React、Vue、Next.js，預設 `html-tailwind`

### Step 2：產生設計系統（必做）

**永遠從 `--design-system` 開始**：

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

此指令會：
1. 平行搜尋 5 個領域（product、style、color、landing、typography）
2. 套用推理規則選出最佳方案
3. 回傳完整設計系統：pattern、style、colors、typography、effects
4. 包含需避免的反模式

#### 持久化設計系統（跨 session）

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

建立：
- `design-system/MASTER.md` — 全域設計規則
- `design-system/pages/<page>.md` — 頁面專屬覆蓋規則

### Step 3：補充領域搜尋（依需求）

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

| 需求 | Domain |
|------|--------|
| 更多風格選項 | `style` |
| 圖表建議 | `chart` |
| UX 最佳實踐 | `ux` |
| 替代字型 | `typography` |
| Landing 結構 | `landing` |

### Step 4：堆疊指引（預設 html-tailwind）

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

可用堆疊：`html-tailwind`、`react`、`nextjs`、`vue`、`svelte`、`swiftui`、`react-native`、`flutter`、`shadcn`、`jetpack-compose`

## 專業 UI 常見規則

### Icons & 視覺元素

| 規則 | 正確做法 | 錯誤做法 |
|------|----------|----------|
| 禁用 emoji 當 icon | 使用 SVG（Heroicons、Lucide） | 用 🎨 🚀 ⚙️ 作為 UI icon |
| 穩定 hover 狀態 | 用顏色/透明度漸變 | 用 scale 導致版面偏移 |
| 一致的 icon 尺寸 | 固定 viewBox (24x24) | 混用不同大小 |

### 互動 & Cursor

| 規則 | 正確做法 | 錯誤做法 |
|------|----------|----------|
| Cursor pointer | 所有可點擊元素加 `cursor-pointer` | 預設 cursor |
| 過渡動畫 | `transition-colors duration-200` | 瞬間切換或過慢 (>500ms) |

### 亮色 / 暗色模式對比

| 規則 | 正確做法 | 錯誤做法 |
|------|----------|----------|
| 玻璃卡片亮色模式 | `bg-white/80` 或更高透明度 | `bg-white/10`（太透明） |
| 文字對比 | `#0F172A` (slate-900) | `#94A3B8` (slate-400) |
| 邊框可見度 | `border-gray-200` 亮色模式 | `border-white/10`（不可見） |

### 版面 & 間距

| 規則 | 正確做法 | 錯誤做法 |
|------|----------|----------|
| 浮動 Navbar | `top-4 left-4 right-4` | `top-0 left-0 right-0` |
| 容器寬度 | 統一 `max-w-6xl` 或 `max-w-7xl` | 混用不同寬度 |

## 交付前檢查清單

### 視覺品質
- [ ] 無 emoji 作為 icon
- [ ] 所有 icon 來自同一組（Heroicons/Lucide）
- [ ] Hover 狀態不造成版面偏移

### 互動
- [ ] 所有可點擊元素有 `cursor-pointer`
- [ ] 過渡動畫流暢（150-300ms）
- [ ] 鍵盤導航 focus 狀態可見

### 亮色 / 暗色模式
- [ ] 亮色模式文字對比度 ≥ 4.5:1
- [ ] 兩種模式下玻璃/透明元素可見
- [ ] 邊框在兩種模式下可見

### 版面
- [ ] 響應式：375px、768px、1024px、1440px
- [ ] 無水平捲軸（行動版）
- [ ] 固定 Navbar 不遮擋內容

### 無障礙
- [ ] 所有圖片有 alt 文字
- [ ] 表單輸入有 label
- [ ] 支援 `prefers-reduced-motion`
