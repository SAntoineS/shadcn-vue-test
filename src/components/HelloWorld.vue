<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

defineProps<{ msg: string }>()

</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <h1>{{ msg }}</h1>
    <Button>Click me</Button>
  </div>
</template>

<style scoped>

</style>
