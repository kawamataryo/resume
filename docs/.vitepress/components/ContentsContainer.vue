<template>
  <div class="relative">
    <div class="overflow-x-auto whitespace-nowrap flex" ref="scrollContainer">
      <article v-for="content in contents" :key="content.url" class="shrink-0 px-2">
        <template v-if="content.ogImage">
        <a :href="content.url" target="_blank" rel="noopener noreferrer" class="relative">
          <img :src="content.ogImage" :alt="content.title" class="h-32 w-auto object-cover rounded-lg shadow-md"/>
          <div v-if="content.isOverlayTitle" class="absolute w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.4)] p-4 top-0 left-0">
            <p class="truncate text-white">{{ content.title }}</p>
          </div>
        </a>
        </template>
      </article>
      <article class="shrink-0 px-5 grid place-items-center bg-opacity-50">
        <a class="" :href="moreLink" target="_blank">
          👉 more...
        </a>
      </article>
    </div>
    <div :class="{'before-backdrop': true, 'opacity-0': hideBeforeBackdrop}" />
    <div :class="{'after-backdrop': true, 'opacity-0': hideAfterBackdrop}" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
  width: 80px;
  height: 100%;
}
</style>
