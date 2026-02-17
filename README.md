# My Town – 方向を学ぶ英語ゲーム

## はじめに

日本の小学校でALTとして勤務する中で、多くの児童が授業でChromebookを活用し、教育用ゲームに高い関心を持っていることに感銘を受けました。
当時扱っていた単元（方向表現）に特化した、授業でそのまま使えるシンプルな英語学習ゲームがあれば良いと感じ、本プロジェクトを制作しました。
実際の授業で使用することを前提に、操作が直感的で、繰り返し練習ができる構成を意識しています。

---

## 概要

児童は小さな町のグリッド上を移動しながら、英語の指示ボタンを使って方向表現を練習します。
2つのモードを用意しています。

- **フリーモード** – 教師主導またはペア活動によるスピーキング練習
- **レベルモード** – 指定された建物を目標に、正しい方向表現を使って移動するチャレンジ形式

以下のような実用的な英文パターンの定着を目的としています。

- “Turn left.”
- “Go straight.”
- “You can see it on your right.”

---

## 主な機能

- 教室用スクリーンに対応したレスポンシブ設計
- ランダムな目標建物の生成
- アバター選択機能
- 目標表示パネル
- 正解時のコンフェッティ演出
- 語彙確認用のレジェンドパネル

---

## 技術構成

本プロジェクトはモジュール構成を採用し、以下を分離しています。

- ゲームロジック
- 描画処理（レンダリング）
- 状態管理
- UI制御

ボード側では抽象的なタイルタイプを管理し、レンダラー側で画像アセットへマッピングする構造とすることで、ロジックと表示を分離しています。

---

## 目的

最小限の準備で授業に導入でき、明確なUIと繰り返し練習が可能な教材として設計しました。

今後は以下の拡張を検討しています。

- 追加マップの実装
- 進行・スコア要素の追加
- 語彙セットの拡張
- アートワークの完全オリジナル化

---

## アセットについて

プレイヤーおよび建物の画像は [https://www.kindpng.com/](https://www.kindpng.com/) の「個人および非商用利用」ライセンスに基づき使用しています。
タイル画像はPhotoshopで制作しました。

---

# My Town – A Directions Game

A browser-based ESL classroom game designed to help Japanese elementary students practice English directional language (left, right, straight, front). The game runs entirely in the browser and is optimized for laptop and classroom display use.

## Overview

Students navigate a small town grid using English instruction buttons.

Two modes are available:

- **Free Mode** – Teacher-led or pair-based speaking practice.
- **Level Mode** – Goal-driven challenges where students navigate to a target building using correct directional phrases.

The game reinforces practical sentence patterns such as:

- “Turn left.”
- “Go straight.”
- “You can see it on your right.”

## Features

- Responsive layout for classroom displays
- Randomized goal selection
- Avatar selection
- Visual goal panel
- Confetti particle effect on correct answers
- Built-in vocabulary legend

## Technical Structure

The project follows a modular architecture separating:

- Game logic
- Rendering
- State management
- UI control

Board logic assigns abstract tile types, while the renderer maps those types to visual assets. This keeps game logic independent from presentation.

## Purpose

The project was designed for real classroom use with minimal setup, a clear interface, and repeatable speaking practice.

Planned improvements include additional maps, progression systems, and expanded vocabulary sets.

## Asset Credits

Player and building images were sourced from [https://www.kindpng.com/](https://www.kindpng.com/) under their “personal and non-commercial use” license.
Tile artwork was created in Photoshop.

Future development may include replacing all third-party artwork with original assets.
