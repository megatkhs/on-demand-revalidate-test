/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { MicroCMSBlogSchema, MicroCMSRelation, ResolveDepthResponse } from 'types/microcms'
import styles from './Card.module.css'

type CardProps = {
  post: ResolveDepthResponse<MicroCMSRelation<MicroCMSBlogSchema>, 1>
}

export const Card: React.FC<CardProps> = ({ post }) => (
  <article key={post.id} className={styles.card}>
    <img
      className={styles.visual}
      src={post.eyecatch.url}
      alt=""
      width={post.eyecatch.width}
      height={post.eyecatch.height}
    />
    <h2 className={styles.title}>
      <Link className={styles.link} href={`/posts/${post.id}`}>
        {post.title}
      </Link>
    </h2>

    <div className={styles.category}>
      <Link href={`/categories/${post.category.id}`}>{post.category.name}</Link>
    </div>
  </article>
)
