export type LaprasResponse = {
  name: string; // LAPRAS登録のユーザー名
  description: string; // LAPRAS登録のbio,
  e_score: number; // 技術力スコア,
  b_score: number; // ビジネス力スコア,
  i_score: number; // 影響力スコア,
  qiita_articles: { // Qiita記事
    title: string;
    url: string;
    tags: string[];
    headlines: string[];
    stockers_count: number;
    updated_at: string;
  }[];
  zenn_articles: { // Zenn記事
    title: string;
    url: string;
    tags: string[];
    posted_at: string;
  }[];
  blog_articles: { // ブログ記事
    title: string;
    url: string;
    tags: string[];
    posted_at: string;
  }[];
  note_articles: { // note記事
    url: string;
    title: string;
    tags: string[];
    like_count: number;
    published_at: string;
  }[];
  speaker_deck_slides: { // speaker deckスライド
    title: string;
    description: string;
    url: string;
    star_count: number;
    view_count: number;
    presentation_date: string;
  }[];
  github_repositories: { // githubリポジトリ
    id: number;
    title: string;
    url: string;
    is_oss: boolean;
    is_fork: boolean;
    is_owner: true;
    description: string;
    stargazers_count: string;
    stargazers_url: string;
    forks: number;
    contributors_count: number;
    contributors_url: string;
    contributions: number;
    contributions_url: string;
    language: string;
    languages: {
      name: string;
      bytes: number;
    }[];
  }[];
  teratail_replies: { // teratail回答
    url: string;
    title: string;
    tags: string[];
    is_best_answer: boolean;
    created_at: string;
  }[];
  events: { // connpassイベント
    title: string;
    url: string;
    status: number;
    date: string;
    is_presenter: boolean;
    is_organizer: boolean;
  }[];
  activities: { // ActivityLog
    title: string;
    url: string;
    date: string;
    type:
      | "github"
      | "github_pr"
      | "speaker_deck"
      | "qiita"
      | "zenn"
      | "note"
      | "teratail"
      | "blog"
      | "connpass";
  }[];
};

export type ArticleWithOGImage<T> = T & {
  ogImage: string | null;
};

export type laprasData = {
  zennArticles: ArticleWithOGImage<LaprasResponse['zenn_articles'][number]>[];
  speakerDeckSlides: ArticleWithOGImage<LaprasResponse['speaker_deck_slides'][number]>[];
  noteArticles: ArticleWithOGImage<LaprasResponse['note_articles'][number]>[];
  qiitaArticles: ArticleWithOGImage<LaprasResponse['qiita_articles'][number]>[];
  githubRepositories: ArticleWithOGImage<LaprasResponse['github_repositories'][number]>[];
}
