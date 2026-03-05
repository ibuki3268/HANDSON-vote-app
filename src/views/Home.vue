<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const roomToken = ref('')
const publicToken = ref('')
const creatorToken = ref('')

function genHex(bytes = 8) {
  try {
    const arr = crypto.getRandomValues(new Uint8Array(bytes))
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch (e) {
    return Math.random().toString(16).slice(2, 2 + bytes * 2)
  }
}

function getOrCreateCreatorToken() {
  const key = 'creator_token'
  let t = localStorage.getItem(key)
  if (t) return t
  t = genHex(12)
  localStorage.setItem(key, t)
  return t
}

onMounted(() => {
  creatorToken.value = getOrCreateCreatorToken()
})

async function createRandomRoom() {
  roomToken.value = 'room-' + genHex(4)
}

async function goToRoom() {
  if (!roomToken.value) return alert('グループIDを入力してください')
  if (!publicToken.value) {
    const title = prompt('投票タイトル')
    if (!title) return
    const raw = prompt('選択肢(カンマ区切り) 例: はい,いいえ')
    if (!raw) return
    const choices = raw.split(',').map(s => s.trim()).filter(Boolean)
    const ptoken = genHex(8)

    await supabase.from('rooms').insert([{ room_token: roomToken.value, owner_token: creatorToken.value }])
    await supabase.from('polls').insert([{ title, choices, public_token: ptoken, room_token: roomToken.value }])

    return router.push({ name: 'room-poll', params: { room_token: roomToken.value, public_token: ptoken } })
  }

  router.push({ name: 'room-poll', params: { room_token: roomToken.value, public_token: publicToken.value } })
}
</script>

<template>
  <div class="container">
    <h1>グループ投票</h1>

    <div class="card">
      <label>グループID</label>
      <div class="row">
        <input v-model="roomToken" placeholder="room-xxxx" />
        <button @click="createRandomRoom">新しいグループを作成</button>
      </div>
    </div>

    <div class="card">
      <label>投票ID（任意）</label>
      <input v-model="publicToken" placeholder="public token" />
      <button @click="goToRoom">投票を作成 / 参加する</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px;
  font-family: "Segoe UI", "Helvetica Neue", sans-serif;
  background: #f3f4f6; /* 淡いグレー背景 */
  border-radius: 8px;
  color: #1f2937; /* ダークグレー文字 */
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 20px;
  margin-top: 20px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
  color: #374151;
}

.description {
  font-size: 13px;
  color: #6b7280;
  display: block;
  margin-bottom: 12px;
}

.row {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  background: #ffffff;
  color: #1f2937;
  transition: border-color 0.2s ease;
}
input:focus {
  border-color: #2563eb; /* 青で強調 */
  outline: none;
}

</style>