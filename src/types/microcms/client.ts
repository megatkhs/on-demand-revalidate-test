import type {
  CustomRequestInit,
  GetAllContentRequest,
  GetListRequest,
  GetRequest,
  MicroCMSContentId,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'
import { MicroCMSRelation } from './utils'
import { MicroCMSListEndpoints } from './schema'

/** Endpoints型の例 */
type MicroCMSClient_Endpoints = Record<string, Record<string, unknown>>

// Ref: https://github.com/tsuki-lab/microcms-ts-sdk/blob/5f2b44b33db1a2e33b257b152612fe8f928622b1/src/type-utils.ts#L1C1-L5C34
type Cdr<XS extends unknown[]> = XS extends [unknown, ...infer R] ? R : never
type Length<XS extends unknown[]> = XS extends { length: infer L } ? L : never
type NumberToTuple<N extends number, XS extends unknown[] = []> =
  Length<XS> extends N ? XS : NumberToTuple<N, [0, ...XS]>

/** 与えられた数値リテラル型から１引いた数値リテラル型を算出する */
type Decrement<N extends number> = Length<Cdr<NumberToTuple<N>>>

/** Depthを考慮して再起的にレスポンスの型を解決する */
export type ResolveDepthResponse<Content, Depth extends number = 1> = {
  [Key in keyof Content]: Content[Key] extends infer Prop
    ? Prop extends MicroCMSRelation<infer Relation>
      ? Depth extends 0
        ? MicroCMSContentId
        : ResolveDepthResponse<MicroCMSRelation<NonNullable<Relation>>, Decrement<Depth>>
      : Prop extends MicroCMSRelation<infer Relation>[]
        ? Depth extends 0
          ? MicroCMSContentId[]
          : ResolveDepthResponse<MicroCMSRelation<NonNullable<Relation>>, Decrement<Depth>>[]
        : Prop
    : never
}

/** クエリからDepthを解決してレスポンス型を算出する */
type ResolveDepthQuery<Queries, Content> = Queries extends {
  depth: infer Depth extends NonNullable<MicroCMSQueries['depth']>
}
  ? ResolveDepthResponse<Content, Depth>
  : ResolveDepthResponse<Content>

/** getListDetailのリクエストオプション型 */
type GetListDetailOptions<Schema extends Record<string, unknown>> = {
  queries?: Omit<NonNullable<GetRequest['queries']>, 'fields'> & {
    fields?: Extract<keyof MicroCMSRelation<Schema>, string>[]
  }
  customRequestInit?: CustomRequestInit
  tags?: string[]
}

/** getListDetailのレスポンス型 */
type GetListDetailResponse<
  Schema extends Record<string, unknown>,
  Options extends GetListDetailOptions<Schema>,
  Content = MicroCMSRelation<Schema>,
> = Options extends {
  queries: {
    fields: (infer Fields extends keyof Content)[]
  }
}
  ? ResolveDepthQuery<Options['queries'], Pick<Content, Fields>>
  : ResolveDepthQuery<Options['queries'], Content>

/** getAllContentsのリクエストオプション型 */
type GetAllContentsOptions<Schema extends Record<string, unknown>> = {
  queries?: Omit<NonNullable<GetAllContentRequest['queries']>, 'fields'> & {
    fields?: Extract<keyof MicroCMSRelation<Schema>, string>[]
  }
  customRequestInit?: CustomRequestInit
  tags?: string[]
}

/** getAllContentsのレスポンス型 */
type GetAllContentsResponse<
  Schema extends Record<string, unknown>,
  Options extends GetAllContentsOptions<Schema>,
  Content = MicroCMSRelation<Schema>,
> = (Options extends {
  queries: {
    fields: (infer Fields extends keyof Content)[]
  }
}
  ? ResolveDepthQuery<Options['queries'], Pick<Content, Fields>>
  : ResolveDepthQuery<Options['queries'], Content>)[]

/** getListのリクエストオプション型 */
type GetListOptions<Schema extends Record<string, unknown>> = {
  queries?: Omit<NonNullable<GetListRequest['queries']>, 'fields'> & {
    fields?: Extract<keyof MicroCMSRelation<Schema>, string>[]
  }
  customRequestInit?: CustomRequestInit
  tags?: string[]
}

/** getListのレスポンス型 */
type GetListResponse<
  Schema extends Record<string, unknown>,
  Options extends GetListOptions<Schema>,
  Content = MicroCMSRelation<Schema>,
> = Omit<MicroCMSListResponse<unknown>, 'contents'> & {
  contents: (Options extends {
    queries: {
      fields: (infer Fields extends keyof Content)[]
    }
  }
    ? ResolveDepthQuery<Options['queries'], Pick<Content, Fields>>
    : ResolveDepthQuery<Options['queries'], Content>)[]
}

export type MicroCMSClient = {
  /** 該当のリストAPIエンドポイントの詳細データを取得する */
  getListDetail<
    Endpoint extends keyof MicroCMSListEndpoints,
    Options extends GetListDetailOptions<Schema>,
    Schema extends MicroCMSListEndpoints[Endpoint],
  >(
    endpoint: Endpoint,
    contentId: string,
    options?: Options,
  ): Promise<GetListDetailResponse<Schema, Options>>
  /** 該当のリストAPIエンドポイントの全てのコンテンツを取得する */
  getAllContents<
    Endpoint extends keyof MicroCMSListEndpoints,
    Options extends GetAllContentsOptions<Schema>,
    Schema extends MicroCMSListEndpoints[Endpoint],
  >(
    endpoint: Endpoint,
    options?: Options,
  ): Promise<GetAllContentsResponse<Schema, Options>>
  /** 該当のリストAPIエンドポイントのコンテンツ一覧を取得する */
  getList<
    Endpoint extends keyof MicroCMSListEndpoints,
    Options extends GetListOptions<Schema>,
    Schema extends MicroCMSListEndpoints[Endpoint],
  >(
    endpoint: Endpoint,
    options?: Options,
  ): Promise<GetListResponse<Schema, Options>>
}
