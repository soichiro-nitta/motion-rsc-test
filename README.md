# motion-rsc-test

[`@soichiro_nitta/motion`](https://github.com/soichiro-nitta/motion) を Next.js 16 + React 19 で検証するためのサンプルです。RSC からは `createId` を、Client Component からは `createMotion` / `useEffectAsync` を利用する最新構成を前提にしています。

## pnpm pack とは？

`pnpm pack` はローカルパッケージを npm へ公開する前段階で `.tgz` 形式のアーカイブに固めるコマンドです。生成されたアーカイブを `pnpm add <path-to-tgz>` でインストールすれば、npm へ publish しなくても他プロジェクトに取り込めます。

このリポジトリでは、`@soichiro_nitta/motion` の変更を即座に検証するために `pnpm pack` で tarball を作り、`motion-rsc-test` へインストールする運用にしています。`link:` 依存だと Next.js (Turbopack) がシンボリックリンク越しに変更を拾えず、`Module not found` や export 差異が起こるため、この手順を推奨しています。

## 反映手順

1. **ライブラリ側で tarball を作成**
   ```bash
   cd /Users/soichiro/Work/motion
   pnpm pack
   ```
   - `soichiro_nitta-motion-<version>.tgz` が生成されます（既存ファイルは手動で削除してください）。
2. **テストプロジェクトへ再インストール**
   ```bash
   cd /Users/soichiro/Work/motion-rsc-test
   pnpm add ../motion/soichiro_nitta-motion-4.1.11.tgz --force
   ```
   - `--force` を付けると既存の依存を上書きできます。バージョン番号を変更した場合はファイル名も合わせてください。
3. **サーバー再起動**
   ```bash
   pnpm dev --hostname 127.0.0.1 --port 3000
   ```
   - 以前の dev サーバーが残っていると `.next/dev/lock` が残るので、必要なら `.next` を削除してから再起動してください。

## プロジェクト構成メモ

- `app/id.ts` … RSC で `createId(['BOX', 'TITLE'])` を実行し、`id` 属性用の `N` を提供。
- `app/motion.ts` … Client Component 専用モジュール。`createMotion(ID)` で `motion` API と型補完されたターゲットを取得。
- `app/_Client/_MotionDemo.tsx` … `useEffectAsync` を使って `await motion.to('BOX', …)` のように直感的にアニメーションを記述。

## よくあるエラー

| 症状 | 原因 | 対処 |
| --- | --- | --- |
| `useEffectAsync is not a function` | 古い tarball を参照している | 上記手順で `pnpm pack` → `pnpm add ...tgz` をやり直す |
| `Module not found: Can't resolve '@soichiro_nitta/motion'` | `link:` 依存のまま or tarball 削除済み | Tarball を再生成し `pnpm add` する |

## ライセンス

このリポジトリ自体は社内検証用のため、公開予定はありません。
