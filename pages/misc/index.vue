<script setup>
import uFuzzy from "@leeoniya/ufuzzy";

const uf = new uFuzzy({
  unicode: true,
  interSplit: "[^\\p{L}\\d']+",
  intraSplit: "\\p{Ll}\\p{Lu}",
  intraBound: "\\p{L}\\d|\\d\\p{L}|\\p{Ll}\\p{Lu}",
  intraChars: "[\\p{L}\\d']",
  intraContr: "'\\p{L}{1,2}\\b",

  intraIns: 2,
});

const localePath = useLocalePath();
const { t, locale } = useI18n();

const { pending: itemsPending, data: items } = await useLazyFetch(
  "https://backend.oldpersiangames.org/api/items/websiteIndex"
);

const pageCount = ref(50);
const page = ref(
  process.client ? JSON.parse(sessionStorage.getItem("itemsPage")) ?? 1 : 1
);

const defaultFilter = {
  q: "",
};
const filter = ref(
  process.client
    ? JSON.parse(sessionStorage.getItem("itemsFilter")) ?? defaultFilter
    : defaultFilter
);

const itemsSearchIndex = computed(() => {
  return items.value.map((r) => r.title_en + "¦" + r.title_fa);
});

const filteredGames = computed(() => {
  if (!items.value) return [];
  let filterSource = items.value;
  if (filter.value.q) {
    let idxs = uf.search(itemsSearchIndex.value, filter.value.q, true);
    if (idxs) filterSource = idxs[0].map((i) => items.value[i]);
  }
  return filterSource;
});

const rows = computed(() => {
  if (!items.value) return [];
  return filteredGames.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value
  );
});

if (process.client) {
  watch(
    filter,
    (newFilter) => {
      page.value = 1;
      sessionStorage.setItem("itemsFilter", JSON.stringify(newFilter));
    },
    { deep: true }
  );
  watch(page, (newPage) => {
    sessionStorage.setItem("itemsPage", JSON.stringify(newPage));
  });
}
</script>
<template>
  <Head>
    <Title>{{ $t("miscellaneous") }}</Title>
    <Meta
      name="description"
      content="List of all miscellaneous items related to Persian games"
    />
  </Head>
  <div v-if="itemsPending">Loading ...</div>
  <div v-else class="shadow-md rounded-lg bg-white dark:bg-gray-800">
    <div
      class="py-4 px-4 flex-col md:flex-row flex items-stretch md:items-start justify-center flex-wrap gap-x-2 gap-y-2"
    >
      <UInput
        v-model="filter.q"
        :placeholder="$t('search')"
        icon="i-heroicons-magnifying-glass-20-solid"
        color="white"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="filter.q !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="filter.q = ''"
          />
        </template>
      </UInput>
    </div>

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">{{ $t("primaryTitle") }}</th>
          <th scope="col" class="px-6 py-3 hidden md:table-cell">
            {{ $t("secondaryTitle") }}
          </th>
          <th scope="col" class="px-6 py-3 hidden md:table-cell">
            {{ $t("publisher") }}
          </th>
          <th scope="col" class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in rows" :key="item.slug">
          <tr
            class="bg-white border-b h-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              v-if="item"
              class="px-6 py-4 font-medium flex items-top gap-2 h-full"
            >
              <SiteLink :to="localePath('/misc/' + item.slug)" class="h-full"
                ><nuxt-img
                  v-if="item.photo"
                  class="h-full w-10"
                  width="40"
                  :src="
                    '/item-photos/' + item.id + '/' + item.photo.id + '.jpg'
                  "
                />
              </SiteLink>
              <div class="flex flex-col justify-between gap-3 h-full">
                <div class="text-gray-900 dark:text-white">
                  <SiteLink
                    :to="localePath('/misc/' + item.slug)"
                    class="h-full"
                    >{{ item["title_" + locale] }}</SiteLink
                  >
                </div>
                <div v-if="item.release_dates?.length" class="text-xs">
                  {{ $t("releaseDate") }}:
                  {{
                    new Date(item.release_dates[0]).toLocaleDateString(
                      locale == "en" ? "en-CA" : locale
                    )
                  }}
                </div>
              </div>
            </th>
            <td class="px-6 py-4 h-full hidden md:table-cell">
              <div class="flex flex-col justify-between gap-3 h-full">
                <div class="text-gray-900 dark:text-white">
                  {{ item["title_" + (locale == "en" ? "fa" : "en")] }}
                </div>
              </div>
            </td>

            <td class="px-6 py-4 hidden md:table-cell">
              <div class="flex flex-col justify-between gap-3 h-full">
                <div class="text-gray-900 dark:text-white">
                  {{
                    item.publishers
                      .map((e) => e["title_" + locale])
                      .join($t("joinCharacter"))
                  }}
                </div>
              </div>
            </td>
            <td class="py-4 px-6 text-center">
              <SiteLink
                :to="localePath('/misc/' + item.slug)"
                class="text-primary-600 hover:underline"
              >
                <UIcon
                  class="h-6 w-6 rounded-full"
                  name="i-heroicons-inbox-arrow-down"
                />
              </SiteLink>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div
      class="flex flex-col md:flex-row gap-4 justify-between px-4 py-4 items-center"
      :style="locale == 'fa' ? 'font-feature-settings: \'ss01\'' : ''"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredGames.length"
      />
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{
          $t("underTable", {
            from: (page - 1) * pageCount + 1,
            to: Math.min(page * pageCount, filteredGames.length),
            total: filteredGames.length,
          })
        }}
      </div>
    </div>
    <div class="flex justify-center"></div>
  </div>
</template>
