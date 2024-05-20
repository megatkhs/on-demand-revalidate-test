import { MicroCMSListContent, MicroCMSObjectContent } from 'microcms-js-sdk'

/** SchemaにMicroCMSListContentを追加する */
export type MicroCMSRelation<Schema> = Schema & MicroCMSListContent

/** SchemaにMMicroCMSObjectContentを追加する */
export type MicroCMSObject<Schema> = Schema & MicroCMSObjectContent
