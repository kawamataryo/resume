<template>
  <div class="overflow-x-auto whitespace-nowrap">
    <article v-for="content in contents" :key="content.url" class="inline-block px-2">
      <template v-if="content.ogImage">
      <a :href="content.url" target="_blank" rel="noopener noreferrer" class="relative">
        <div v-if="content.isOverlayTitle" class="absolute w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.3)] p-4">
          <p class="truncate text-white text-xl">{{ content.title }}</p>
        </div>
        <img :src="content.ogImage" :alt="content.title" class="h-32 w-auto object-cover rounded-lg shadow-md"/>
      </a>
      </template>
    </article>
  </div>
</template>

<script setup lang="ts">
type content = {
  isOverlayTitle: boolean
  title: string
  url: string
  ogImage: string | null
}

defineProps<{
  contents: content[]
}>()
</script>

<style lang="scss" scoped>

</style>
