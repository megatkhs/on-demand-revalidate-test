import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = (request: NextRequest): NextResponse => {
  const searchParams = request.nextUrl.searchParams

  const tagsParams = searchParams.get('tags')

  if (tagsParams !== null) {
    const tags = tagsParams.split(',')
    console.log(tags)
    tags.forEach((tag) => revalidateTag(tag))

    return NextResponse.json({
      success: true,
    })
  }

  return NextResponse.json({
    success: false,
  })
}
