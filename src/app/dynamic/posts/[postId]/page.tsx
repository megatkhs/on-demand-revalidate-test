/* eslint-disable @next/next/no-img-element */
import { client } from 'libs/microcms'
import { BLOG_POST_ALL, BLOG_POST_BY_ID } from 'constants/tags'
import { Article } from 'app/_components/Article'
import { notFound } from 'next/navigation'

type PostProps = {
  params: {
    postId: string
  }
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  const categories = await client.getAllContents('blogs')

  return categories.map(({ id }) => ({
    postId: id,
  }))
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
