import type { CustomRequestInit, MicroCMSClient as MicroCMSClientOptions } from 'microcms-js-sdk'
import { createClient as _createClient } from 'microcms-js-sdk'
import { MicroCMSClient } from 'types/microcms'

const createClient = (
  options: MicroCMSClientOptions,
  customRequestInit: CustomRequestInit = {},
): MicroCMSClient => {
  const client = _createClient(options)

  return {
    getListDetail(endpoint, contentId, options) {
      return client.getListDetail({
        ...options,
        customRequestInit: {
          ...customRequestInit,
          ...(options?.customRequestInit ?? {}),
        },
        contentId,
        endpoint,
      })
    },
    getAllContents(endpoint, options) {
      return client.getAllContents({
        ...options,
        customRequestInit: {
          ...customRequestInit,
          ...(options?.customRequestInit ?? {}),
        },
        endpoint,
      })
    },
    getList(endpoint, options) {
      return client.getList({
        ...options,
        customRequestInit: {
          ...customRequestInit,
          ...(options?.customRequestInit ?? {}),
        },
        endpoint,
      })
    },
  }
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
  retry: true,
})
