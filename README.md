# Pele Note & Pele CLI — 超高速 Mermaid / Markdown 図解スタジオ (三家共有・公開ツール)

Obsidian チームが開発したオープンソースの次世代 Mermaid レンダラー **Pele (v1.6.0)** をコアに据えた、**1ファイル完結の軽量 Markdown & 図解スタジオ (`pele_editor.html`)** および **コマンドライン SVG 変換ツール (`pele_cli.js`)** です。

---

## ⚡ ワンクリックでブラウザ起動 (Quick Launch)

- 🌐 **[Web 上で今すぐ Pele Note を開く (GitHub Pages)](https://ogaogamirai.github.io/pele-note/pele_editor.html)**  
  *(※ GitHub の README 画面からでも、クリック1つでそのままブラウザ上でフル機能のエディタが起動します)*
- 💻 **ローカル環境からワンクリック起動**:
  - **ブラウザで直接開く**: **[`pele_editor.html`](file:///G:/マイドライブ/Tools/pele/pele_editor.html)** （相対リンク: [`pele_editor.html`](./pele_editor.html)）
  - **バッチから既定ブラウザで起動**: **[`start_pele_note.bat`](file:///G:/マイドライブ/Tools/pele/start_pele_note.bat)** （ダブルクリックで既定ブラウザが立ち上がります）

---

## 🌟 特徴 (Features)

1. **ミリ秒単位のリアルタイム同期プレビュー**
   - 非同期 DOM 計測に依存しない **Pele (v1.6.0)** エンジンにより、Markdown や Mermaid コードを入力した瞬間に **0.5〜2ms** で純粋なベクター SVG を同期描画します。
2. **純粋・超軽量なベクター SVG 直接出力（再利用可能）**
   - `<foreignObject>` を使わない 100% 標準の `<svg>`（`<rect>`, `<path>`, `<text>`）として出力されるため、PowerPoint、Illustrator、Figma、Web 教材、GitHub README 等へ文字化けや崩れなしでそのまま再利用できます。
3. **直感的な「🎨 図解スタイル」ポップオーバー**
   - Mermaid の構文を暗記していなくても、GUI からワンクリックで図解の見た目を調整できます：
     - **⓪ 対象の図解**: 文書内の複数図解（`#1: flowchart`, `#2: sequence` 等）を自動検出して切り替え。
     - **① 塗りたいノード / 要素**: 図内のノードやアクターを自動抽出し、6色のナチュラルパレット（Forest / Amber / Slate / Rose / Iris / Stone）で配色。
     - **② 矢印（線）の色・太さ**: 個別の矢印（`#0`, `#1`...）または図内の全線（`default`）に対して、線の色（6色）と太さ（`1.5px` / `2.5px` / `4px`）を独立して変更。
     - **③ 矢印の種類変更**: 選んだ矢印をその場で「実線 (`-->`)」「点線 (`-.->`)」「太線 (`==>`)」「双方向 (`<-->`)」「ラベル付 (`-->|条件|`)」「矢印なし (`---`)」へ書き換え。
4. **スラッシュ補完（`/`）＆ スライド式文法ヘルプ（`? 文法`）**
   - エディター内で行頭に `/flow`, `/seq`, `/mind`, `/state`, `/er`, `/table`, `/style` と打つとポップアップ補完メニューが出現し、`Tab` または `Enter` で雛形を即展開します。
   - 右上の `? 文法`（`Alt+H`）から、クリック1つでカーソル位置へ構文を挿入できるリファレンスドロワーを開けます。
5. **名前と保存場所を選べるエクスポート（`.md` / `.html` / `.svg`）**
   - ブラウザのファイル保存ダイアログ（File System Access API + フォールバック）により、保存先フォルダとファイル名を指定して保存できます。
   - `.svg` 保存では、文書内に複数の図解がある場合に **全図解を1枚の美しい一覧シートに結合した SVG** として出力できるほか、各図解カードの `↓ 単体SVG保存` ボタンから個別の SVG としても保存できます。
6. **オフライン＆単体オンラインのハイブリッド動作**
   - 同梱の `vendor/pele.global.js` があれば **完全オフライン（ネット未接続）** で動作します。
   - `pele_editor.html` 1ファイルだけを単体で別の場所へコピーして開いた場合も、オンライン環境であれば自動的に CDN（`unpkg.com/@obsidianmd/pele@1.6.0`）へフォールバックして動作します。

---

## 🚀 使い方 (Usage)

### A. ブラウザで「Pele Note」エディタを使う

1. **[`pele_editor.html`](pele_editor.html)** をダブルクリックしてブラウザ（Chrome / Edge 等）で開きます（サーバー起動は不要です）。
2. **表示モード切替**:
   - 上部中央のボタン、またはショートカットキーで切り替えられます：
     - `Alt + 1` : ✎ 編集のみ
     - `Alt + 2` : ◫ 左右分割（デフォルト）
     - `Alt + 3` : ◉ プレビューのみ
3. **図解の挿入と補完**:
   - エディタ上部のクイックバー（`+Flow`, `+Seq`, `+Mind`, `+State`, `+Table`）を押すか、本文の行頭で `/` を入力して補完メニューから選びます。
4. **ノードや矢印の色・太さ・種類を変える**:
   - サブバー右端の **`🎨 図解スタイル ▾`** をクリックします。
   - **⓪ 対象の図解** で編集したい図を選び、**① ノード** または **② 矢印（線）** をプルダウンで選んで色・太さ・種類ボタンを押すと、コードとプレビュー図解が同時に更新されます。
5. **ファイルに保存（エクスポート）する**:
   - 上部の `📄 ファイル名` 欄にベース名を入力（空欄なら先頭 `# 見出し` から自動命名）し、右上の保存ボタンを押します：
     - **`↓ .md`** (`Ctrl + S`) : Markdown ソースファイルを保存。
     - **`↓ .html`** : 図解 SVG をインライン埋め込みした単一 HTML 文書を保存（そのまま配布・閲覧可能）。
     - **`↓ .svg`** : 文書内の図解を純粋な SVG ベクター画像として保存（各図解右上の `↓ 単体SVG保存` で個別保存も可）。

#### ⌨️ キーボードショートカット一覧
| ショートカット | 動作 |
| :--- | :--- |
| `Ctrl + S` / `Cmd + S` | 名前をつけて Markdown (`.md`) 保存 |
| `Ctrl + B` / `Ctrl + I` | 選択テキストを太字 (`**`) / 斜体 (`*`) で囲む |
| 行頭で `/` 入力 (`Tab` / `Enter`) | スラッシュ補完ポップアップで図解・表の雛形を展開 |
| リスト行で `Enter` | 箇条書き (`- `) や番号付きリスト (`1. `) を自動で次行へ継続 |
| `Alt + 1` / `Alt + 2` / `Alt + 3` | 編集のみ / 分割 / プレビューのみ の表示切替 |
| `Alt + H` | Markdown & Mermaid 文法ヘルプドロワーの開閉 |

---

### B. コマンドライン（`pele_cli.js`）から SVG を一括生成する

Node.js 環境からスクリプトやパイプライン経由で `.mmd` ファイルを直接 `.svg` に変換することもできます。

```powershell
# (1) ファイルから SVG 生成
node pele_cli.js diagram.mmd -o diagram.svg

# (2) インライン指定で SVG 生成
node pele_cli.js -e "flowchart LR; A[開始]-->B[終了]" -o simple.svg

# (3) 標準入力（パイプ）から SVG 生成
Get-Content diagram.mmd | node pele_cli.js -o diagram.svg
```

---

## 📁 ファイル構成 (Repository Layout)

```text
pele-note/
├── pele_editor.html      # Pele Note エディタ本体（単一HTML・ハイブリッド読込対応）
├── pele_cli.js           # Node.js 用 CLI 変換スクリプト
├── pele.ps1              # PowerShell 用 CLI ラッパー
├── vendor/
│   └── pele.global.js    # Pele v1.6.0 ローカルバンドル（完全オフライン動作保証用）
└── README.md             # 使い方・仕様ガイド（本書）
```

---

## 📜 クレジット・ライセンス (Credits & License)

- コア描画エンジンとして Obsidian チーム開発の [`@obsidianmd/pele`](https://www.npmjs.com/package/@obsidianmd/pele) (v1.6.0, MIT License) を使用しています。
- エディタ UI・スタイルオーバーライドエンジン・CLI ツールは MIT License の下で公開されています。
