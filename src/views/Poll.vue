<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePollStore } from '../stores/poll'

const route = useRoute()
const store = usePollStore()

const loading = ref(true)
const publicToken = route.params.public_token
const roomToken = route.params.room_token || null
const voterToken = ref(null)

onMounted(async () => {
  await store.fetchPollByPublicToken(publicToken, roomToken)
  await store.fetchVotes()
  voterToken.value = store.getVoterToken()
  loading.value = false
})

const currentVote = computed(() => {
  if (!store.votes || !voterToken.value) return null
  return store.votes.find(v => v?.voter_token === voterToken.value) || null
})

async function onVote(choice) {
  const ok = confirm('投票を確定しますか？')
  if (!ok) return
  const { error } = await store.vote(choice)
  if (error) alert(error.message || String(error))
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="store.poll" class="poll-card">
    <h2>{{ store.poll.title }}</h2>
    <p v-if="currentVote">あなたの投票: {{ currentVote.choice }}</p>

    <div v-for="(c, i) in store.poll.choices" :key="i">
      <button @click="onVote(c)">{{ c }}</button>
    </div>

    <router-link
      :to="roomToken
        ? { name: 'room-results', params: { room_token: roomToken, public_token: publicToken } }
        : { name: 'results', params: { public_token: publicToken } }"
    >
      結果を見る
    </router-link>
  </div>
</template>


<style scoped>
.poll-card {
  max-width: 500px;
  margin: 40px auto;
  padding: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.poll-card h2 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 24px;
  color: #0f172a;
}
</style>