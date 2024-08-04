import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ZennArticles from '../components/ZennArticles.vue'
import GitHubRepositories from '../components/GitHubRepositories.vue'
import NoteArticles from '../components/NoteArticles.vue'
import QiitaArticles from '../components/QiitaArticles.vue'
import SpeakerDeckSlides from '../components/SpeakerDeckSlides.vue'
import '../../../node_modules/devicon/devicon.min.css'
import './index.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ZennArticles', ZennArticles)
    app.component('GitHubRepositories', GitHubRepositories)
    app.component('NoteArticles', NoteArticles)
    app.component('QiitaArticles', QiitaArticles)
    app.component('SpeakerDeckSlides', SpeakerDeckSlides)
  }
} satisfies Theme
