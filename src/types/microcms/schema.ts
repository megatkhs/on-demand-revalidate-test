import type { MicroCMSImage } from 'microcms-js-sdk'
import type { MicroCMSRelation } from './utils'

export type MicroCMSListEndpoints = {
  blogs: MicroCMSBlogSchema
  categories: MicroCMSCategorySchema
}

export type MicroCMSBlogSchema = {
  title: string
  content: string
  eyecatch: MicroCMSImage
  category: MicroCMSRelation<MicroCMSCategorySchema>
}

export type MicroCMSCategorySchema = {
  name: string
}
