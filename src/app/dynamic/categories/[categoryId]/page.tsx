/* eslint-disable @next/next/no-img-element */
import { client } from 'libs/microcms'
import { BLOG_CATEGORY_ALL, BLOG_CATEGORY_BY_ID, BLOG_POST_ALL } from 'constants/tags'
import { Card } from 'app/_components/Card'

type CategoryProps = {
  params: {
    categoryId: string
  }
}

export async function generateStaticParams(): Promise<CategoryProps['params'][]> {
  const categories = await client.getAllContents('categories')

  return categories.map(({ id }) => ({
    categoryId: id,
  }))
}

export default async function Category({ params }: CategoryProps) {
  const posts = await client.getAllContents('blogs', {
    queries: {
      filters: `category[equals]${params.categoryId}`,
    },
    tags: [BLOG_POST_ALL, BLOG_CATEGORY_ALL, BLOG_CATEGORY_BY_ID(params.categoryId)],
  })

  return (
    <>
      {posts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </>
  )
}

export const dynamic = 'force-dynamic'
