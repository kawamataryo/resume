import { ofetch } from "ofetch";
import { laprasData, LaprasResponse } from "../types";
import ogs from 'open-graph-scraper';

const getOgImage = async (url: string) => {
  try {
    const ogData = await ogs({ url })
    if (ogData.result.success && ogData.result.ogImage?.length) {
      return ogData.result.ogImage[0].url
    }
    throw new Error('could not fetch og image');
  } catch (e) {
    console.error(e)
  }
  return null
}

import { defineLoader } from 'vitepress'

export type Data = laprasData;

declare const data: Data
export { data }

export default defineLoader({
  async load(): Promise<Data> {
    try {
      const res = await ofetch<LaprasResponse>('https://lapras.com/public/kawamataryo.json')
      const zennArticles = await Promise.all(res.zenn_articles.slice(0, 10).map(async article => ({
        ...article,
        ogImage: await getOgImage(article.url)
      })))
      const speakerDeckSlides = await Promise.all(res.speaker_deck_slides.slice(0, 10).map(async slide => ({
        ...slide,
        ogImage: await getOgImage(slide.url)
      })))
      const noteArticles = await Promise.all(res.note_articles.slice(0, 10).map(async article => ({
        ...article,
        ogImage: await getOgImage(article.url)
      })))
      const qiitaArticles = await Promise.all(res.qiita_articles.slice(0, 10).map(async article => ({
        ...article,
        ogImage: await getOgImage(article.url)
      })))
      const githubRepositories = await Promise.all(res.github_repositories.filter(
        // フォークされたリポジトリを除外
        repo => repo.is_owner
      ).sort(
        // スター数の降順でソート
        (a, b) => Number(b.stargazers_count) - Number(a.stargazers_count)
      ).slice(0, 10).map(async repo => ({
        ...repo,
        ogImage: await getOgImage(repo.url)
      })))
      return {
        zennArticles,
        speakerDeckSlides,
        noteArticles,
        qiitaArticles,
        githubRepositories,
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }
})
