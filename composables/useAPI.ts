// https://nuxt.com/docs/examples/advanced/use-custom-fetch-composable
// https://notes.atinux.com/nuxt-custom-fetch

import type { UseFetchOptions } from 'nuxt/app';

export function useAPI<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) {
    return useFetch(url, {
        ...options,
        baseURL: 'https://backend.oldpersiangames.org',
    })
}
