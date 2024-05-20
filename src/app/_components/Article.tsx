/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ResolveDepthResponse, MicroCMSRelation, MicroCMSBlogSchema } from 'types/microcms'
import styles from './Article.module.css'

type ArticleProps = {
  post: ResolveDepthResponse<MicroCMSRelation<MicroCMSBlogSchema>, 1>
}

export const Article: React.FC<ArticleProps> = ({ post }) => (
  <article key={post.id}>
    <img
      className={styles.visual}
      src={post.eyecatch.url}
      alt=""
      width={post.eyecatch.width}
      height={post.eyecatch.height}
    />
    <h2 className={styles.title}>{post.title}</h2>

    <div className={styles.category}>
      <Link href={`/categories/${post.category.id}`}>{post.category.name}</Link>
    </div>

    <div className={styles.content}>{post.content}</div>
  </article>
)
