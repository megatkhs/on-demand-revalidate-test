import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = (request: NextRequest): NextResponse => {
  const searchParams = request.nextUrl.searchParams

  const tags = searchParams.get('tags')

  if (tags !== null) {
    tags.split(',').forEach(revalidateTag)

    return NextResponse.json({
      success: true,
    })
  }

  return NextResponse.json({
    success: false,
  })
}
