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

Bashで新規作成する例
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
```
mkdir src\lib, src\router, src\stores, src\views
```
Bash
```
mkdir -p src/lib src/router src/stores src/views
```

使うファイル丸ごと作成するコマンド
powerShell
```
New-Item -ItemType File src\lib\supabase.js, src\router\index.js, src\stores\poll.js, src\views\MyRooms.vue, src\views\Start.vue, src\views\Home.vue, src\views\Poll.vue, src\views\Results.vue, src\views\AirsceneVote.vue
```

Bash
```
touch src/lib/supabase.js src/router/index.js src/stores/poll.js src/views/MyRooms.vue src/views/Start.vue src/views/Home.vue src/views/Poll.vue src/views/Results.vue src/views/AirsceneVote.vue
```

`router/index.js` で `MyRooms.vue` を参照するため、先に最小ファイルを作成:

```vue
<!-- src/views/MyRooms.vue -->
<template>
  <div>My Rooms</div>
</template>
```

プロジェクトルートに `.env.local` を作成してコピペ:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

依存関係が未インストールなら実行:

```bash
npm install
```

起動:

```bash
npm run dev
```

supabaseセットアップ

- Supabaseプロジェクトを1つ作成
- SQLエディタで下記を実行
- `.env.local` の値（URL/ANON KEY）を用意

```sql
create extension if not exists "pgcrypto";

create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  choices jsonb not null,
  public_token text unique not null,
  room_token text,
  created_at timestamptz default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  voter_token text,
  choice text not null,
  room_token text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create unique index if not exists votes_poll_voter_unique
on votes (poll_id, voter_token);

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  room_token text unique not null,
  owner_token text not null,
  name text,
  created_at timestamptz default now()
);
```
