import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CV of kawamataRyo",
  description: "Kawamata Ryoの職務経歴書",
  base: '/resume/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kawamataryo/resume' }
    ],
    editLink: {
      pattern: 'https://github.com/kawamataryo/resume/edit/main/docs/:path'
    }
  }
})
