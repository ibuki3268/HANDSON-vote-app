<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePollStore } from '../stores/poll'

const route = useRoute()
const store = usePollStore()
const loading = ref(true)

const publicToken = route.params.public_token
const roomToken = route.params.room_token || null

onMounted(async () => {
  await store.fetchPollByPublicToken(publicToken, roomToken)
  await store.fetchVotes()
  loading.value = false
})

const counts = computed(() => {
  const result = {}
  if (!store.poll) return result
  for (const choice of store.poll.choices) result[choice] = 0
  for (const v of store.votes) if (v?.choice in result) result[v.choice]++
  return result
})

const total = computed(() => Object.values(counts.value).reduce((a, b) => a + b, 0))
</script>

<template>
  <div style="padding:20px; max-width:750px; margin:0 auto">
    <div v-if="loading">Loading...</div>

    <div v-else-if="store.poll">
      <h2>Results for: {{ store.poll.title }}</h2>
      <div v-for="(count, choice) in counts" :key="choice">
        <h3>{{ choice }}</h3>
        <p>{{ count }}票 ({{ total ? Math.round((count/total)*100) : 0 }}%)</p>
      </div>
      <p>Total votes: {{ total }}</p>
    </div>
  </div>
</template>
