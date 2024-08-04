<template>
  <div class="relative">
    <div class="overflow-x-auto whitespace-nowrap" ref="scrollContainer">
      <article v-for="content in contents" :key="content.url" class="inline-block px-2">
        <template v-if="content.ogImage">
        <a :href="content.url" target="_blank" rel="noopener noreferrer" class="relative">
          <div v-if="content.isOverlayTitle" class="absolute w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.3)] p-4">
            <p class="truncate text-white">{{ content.title }}</p>
          </div>
          <img :src="content.ogImage" :alt="content.title" class="h-32 w-auto object-cover rounded-lg shadow-md"/>
        </a>
        </template>
      </article>
      <article class="inline-block px-2">
        <a class="" :href="moreLink">
            and more...
        </a>
      </article>
    </div>
    <div :class="{'before-backdrop': true, 'opacity-0': hideBeforeBackdrop}" />
    <div :class="{'after-backdrop': true, 'opacity-0': hideAfterBackdrop}" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import { useScroll } from '@vueuse/core';

type content = {
  isOverlayTitle: boolean
  title: string
  url: string
  ogImage: string | null
}

defineProps<{
  contents: content[]
  moreLink: string
}>()

const scrollContainer = ref<HTMLElement | null>(null);
const { arrivedState } = useScroll(scrollContainer);

const hideBeforeBackdrop = computed(() => arrivedState.left);
const hideAfterBackdrop = computed(() => arrivedState.right);
</script>

<style lang="scss" scoped>
.before-backdrop {
  left: 0;
  background: linear-gradient(to left, rgba(var(--vp-c-bg-rgb), 0) 0%, rgba(var(--vp-c-bg-rgb), 100) 100%);
}

.after-backdrop {
  right: 0;
  background: linear-gradient(to right, rgba(var(--vp-c-bg-rgb), 0) 0%, rgba(var(--vp-c-bg-rgb), 100) 100%);
}

.after-backdrop, .before-backdrop {
  pointer-events: none;
  position: absolute;
  cursor: pointer;
  top: 0;
  width: 100px;
  height: 100%;
}
</style>
