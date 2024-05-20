/* eslint-disable @next/next/no-img-element */
import { client } from 'libs/microcms'
import { BLOG_POST_LIST } from 'constants/tags'
import { Card } from 'app/_components/Card'

export default async function Home() {
  const posts = await client.getAllContents('blogs', {
    tags: [BLOG_POST_LIST],
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
