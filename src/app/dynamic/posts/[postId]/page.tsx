/* eslint-disable @next/next/no-img-element */
import { client } from 'libs/microcms'
import styles from './page.module.css'
import { BLOG_POST_ALL, BLOG_POST_BY_ID } from 'constants/tags'
import Link from 'next/link'
import { Article } from 'app/_components/Article'
import { notFound } from 'next/navigation'

type PostProps = {
  params: {
    postId: string
  }
}

export default async function Post({ params }: PostProps) {
  try {
    const post = await client.getListDetail('blogs', params.postId, {
      tags: [BLOG_POST_ALL, BLOG_POST_BY_ID(params.postId)],
    })

    return <Article post={post} />
  } catch {
    notFound()
  }
}

export const dynamic = 'force-dynamic'
