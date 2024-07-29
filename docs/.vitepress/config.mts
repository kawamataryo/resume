import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CV of kawamataRyo",
  description: "Kawamata Ryoの職務経歴書",
  base: '/resume/',
  head: [
    ['meta', { property: 'og:image', content: 'https://kawamataryo.github.io/resume/images/og.png' }],
    ['meta', { property: 'og:title', content: 'CV of Kawamata Ryo' }],
    ['meta', { property: 'og:description	', content: 'SWE 川俣 涼の職務経歴書' }],
    ['meta', { property: 'og:url	', content: 'https://kawamataryo.github.io/resume' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kawamataryo/resume' }
    ],
    editLink: {
      pattern: 'https://github.com/kawamataryo/resume/edit/master/docs/:path'
    }
  }
})
