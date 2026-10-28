export type JobCategory =
  | 'UPSC'
  | 'SSC'
  | 'Banking'
  | 'Railways'
  | 'Defense'
  | 'State PSC'
  | 'Teaching'
  | 'PSU'
  | 'Medical';

export type NewsCategory =
  | 'देश'
  | 'विदेश'
  | 'अर्थव्यवस्था'
  | 'करेंट अफेयर्स'
  | 'विशेष विश्लेषण';

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  summary: string;
  content: string;
  source: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export type BlogCategory =
  | 'देश न्यूज़'
  | 'विदेश न्यूज़';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogComment {
  id: string;
  authorName: string;
  text: string;
  timestamp: string;
  editorReply?: string;
}

export interface OfficialWebsiteInfo {
  name: string;
  url: string;
  portalDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: BlogCategory;
  jobCategory?: JobCategory;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  viewsCount: number;
  likesCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  summary: string;
  keyTakeaways: string[];
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  comments: BlogComment[];
  tags: string[];
  officialWebsite?: OfficialWebsiteInfo;
  officialUrl?: string;
}
