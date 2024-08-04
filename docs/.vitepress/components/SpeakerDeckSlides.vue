<template>
  <div>
    <ContentsContainer :contents="contents" />
  </div>
</template>

<script setup lang="ts">
import { data } from '../data/lapras.data.ts'
import ContentsContainer from './ContentsContainer.vue';

const contents = data.speakerDeckSlides.map((slide) => {
  return {
    isOverlayTitle: false,
    title: slide.title,
    url: slide.url,
    ogImage: slide.ogImage as string
  }
})
</script>

<style lang="scss" scoped></style>
