# My Town – 方向を学ぶ英語ゲーム

日本の小学校で英語の教師として働く中で、多くの子どもたちが授業でChromebookを使い、教育ゲームを楽しんでいることに気づきました。
そのとき勉強していた単元にぴったり合った、授業ですぐに使えるシンプルなゲームがあればいいと思い、このプロジェクトを作りました。

実際の授業で使うことを考え、操作がわかりやすく、何度もくり返し練習できる形にしています。

## 概要

児童は小さな町のグリッド上を移動しながら、英語の指示ボタンを使って方向表現を練習します。
2つのモードを用意しています。

- **フリーモード** – 教師主導またはペア活動によるスピーキング練習
- **レベルモード** – 指定された建物を目標に、正しい方向表現を使って移動するチャレンジ形式

以下のような実用的な英文パターンの定着を目的としています。

- “Turn left.”
- “Go straight.”
- “You can see it on your right.”

## 主な機能

- 教室用スクリーンに対応したレスポンシブ設計
- ランダムな目標建物の生成
- アバター選択機能
- 目標表示パネル
- 正解時のコンフェッティ演出
- 語彙確認用のレジェンドパネル

## 技術構成

本プロジェクトはモジュール構成を採用し、以下を分離しています。

- ゲームロジック
- 描画処理（レンダリング）
- 状態管理
- UI制御

ボード側では抽象的なタイルタイプを管理し、レンダラー側で画像アセットへマッピングする構造とすることで、ロジックと表示を分離しています。

## 目的

最小限の準備で授業に導入でき、明確なUIと繰り返し練習が可能な教材として設計しました。

今後は以下の拡張を検討しています。

- 追加マップの実装
- 進行・スコア要素の追加
- 語彙セットの拡張
- アートワークの完全オリジナル化

## アセットについて

プレイヤーおよび建物の画像は [https://www.kindpng.com/](https://www.kindpng.com/) の「個人および非商用利用」ライセンスに基づき使用しています。
タイル画像はPhotoshopで制作しました。

---

# My Town – A Directions Game

My Town is a browser-based classroom game designed to help Japanese elementary students practice English directional language (left, right, straight, front).

## Overview

Students navigate a small town grid using English instruction buttons.

- **Free Mode** – Teacher-led or pair-based speaking practice.
- **Level Mode** – Solo Play, with challenges where students navigate to a target building using the directional buttons.

The game teaches these sentences:

- “Turn left.”
- “Go straight.”
- “You can see it on your right.”

As well as vocabulary for building names.

## Features

- Responsive layout for various display sizes
- Randomized goal selection
- Avatar selection
- Confetti particle effect for correct answers
- Collapsible Legend button explaining the English phrases

## Structure

The project follows a modular structure that I studied in The Odin Project, which teaches the fundamentals of JavaScript module separation.
The idea is to split the program into separate JavaScript files (modules) to keep the code organized.

The main file (index.js) interacts with these modules to:

- Handle game logic
- Render content to the screen
- Manage game state
- Listen for events and button presses

For example, the board logic assigns tile types, while the renderer maps those types to visual assets. This keeps game logic independent from the presentation layer.

## Improvements

In future, I would like to include additional maps, a dedicated character selection screen, and a points/level system

## Asset Credits

Player and building images were sourced from [https://www.kindpng.com/](https://www.kindpng.com/) under their "personal and non-commercial use" license. Tile artwork was created in Photoshop.
