# ハンズオン資料

## セットアップ
Node.jsのインストール
https://nodejs.org/ja/download


プロジェクト作成

PowerShellで新規作成する例:
```powershell
cd C:\Users\User
npm create vite@latest vote-app -- --template vue
cd .\vote-app
npm install
npm i @supabase/supabase-js pinia vue-router qrcode
```


```bash
npm create vite@latest vote-app -- --template vue
cd vote-app
npm install
npm i @supabase/supabase-js pinia vue-router qrcode
```



このあと、以下のフォルダを作成:

- `src/lib`
- `src/router`
- `src/stores`
- `src/views`

一括作成コマンド
powerShell
mkdir src\lib, src\router, src\stores, src\views

Bash
mkdir -p src/lib src/router src/stores src/views

使うファイル丸ごと作成するコマンド
powerShell
New-Item -ItemType File src\lib\supabase.js, src\router\index.js, src\stores\poll.js, src\views\MyRooms.vue, src\views\Start.vue, src\views\Home.vue, src\views\Poll.vue, src\views\Results.vue, src\views\AirsceneVote.vue

Bash
touch src/lib/supabase.js src/router/index.js src/stores/poll.js src/views/MyRooms.vue src/views/Start.vue src/views/Home.vue src/views/Poll.vue src/views/Results.vue src/views/AirsceneVote.vue


`router/index.js` で `MyRooms.vue` を参照するため、先に最小ファイルを作成:

```vue
<!-- src/views/MyRooms.vue -->
<template>
  <div>My Rooms</div>
</template>
```