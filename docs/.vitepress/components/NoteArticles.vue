<template>
  <div>
    <ContentsContainer :contents="contents" />
  </div>
</template>

<script setup lang="ts">
import { data } from '../data/lapras.data.ts'
import ContentsContainer from './ContentsContainer.vue';

const contents = data.noteArticles.map((note) => {
  return {
    isOverlayTitle: true,
    title: note.title,
    url: note.url,
    ogImage: note.ogImage as string
  }
})
</script>

<style lang="scss" scoped></style>
