<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Repository</th>
          <th>languages</th>
          <th>Stars</th>
          <th>Forks</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="repository in repositories" :key="repository.id">
          <td>
            <a :href="repository.url" target="_blank" rel="noopener noreferrer">
              {{ repository.title }}
            </a>
          </td>
          <td>
            <div class="flex gap-2 flex-wrap">
              <img v-for="language in repository.languages" :key="language.name" :src="deviconSrc(language.name)"
                :alt="language.name" class="w-4" />
            </div>
          </td>
          <td>⭐ {{ repository.stargazers_count }}</td>
          <td>{{ repository.forks }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { data } from '../data/lapras.data.ts'
const repositories = data.githubRepositories
const deviconSrc = (name: string) => {
  let langName = name.toLowerCase()
  switch (langName) {
    case 'html':
      langName = 'html5'
      break
    case 'css':
      langName = 'css3'
      break
    case 'shell':
      langName = 'bash'
      break
    case 'tsx':
      langName = 'typescript'
      break
    case 'vue':
      langName = 'vuejs'
      break
    case 'scss':
      langName = 'sass'
      break
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${langName}/${langName}-original.svg`
}

</script>

<style lang="scss" scoped></style>
