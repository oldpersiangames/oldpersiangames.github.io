<script setup lang="ts">
import { useFuse } from "@vueuse/integrations/useFuse";

const { t, locale } = useI18n();
const { data: items, pending } = await useAPI("/api/items", {
  default: () => [],
});

const localePath = useLocalePath();

// Columns
const columns = [
  {
    key: "title_" + locale.value,
    label: t("primaryTitle"),
  },
  {
    key: "title_" + (locale.value == "en" ? "fa" : "en"),
    label: t("secondaryTitle"),
  },
  {
    key: "publisher",
    label: t("publisher"),
  },
  {
    key: "actions",
  },
];
const firstColumnSlotName = computed(() => columns[0].key + "-data");

// Filters
const search = ref(
  process.client ? sessionStorage.getItem("itemsFilter") || "" : "",
);
const { results } = useFuse(search, items, {
  fuseOptions: {
    keys: [
      "title_en",
      "title_fa",
      "producers.title_en",
      "producers.title_fa",
      "slug",
    ],
    threshold: 0.3,
    ignoreLocation: true,
  },
  matchAllWhenSearchEmpty: true,
});
const computedResults = computed(() => {
  return results.value.map((e) => e.item);
});
const rows = computed(() => {
  return computedResults.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value,
  );
});

// Pagination
const page = ref(
  process.client ? parseInt(sessionStorage.getItem("itemsPage") || "1") : 1,
);
const pageCount = ref(50);
const pageTotal = computed(() => computedResults.value.length);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
);

// Manage session storage
watch(search, () => {
  page.value = 1;
  sessionStorage.setItem("itemsFilter", search.value);
});

watch(page, () => {
  sessionStorage.setItem("itemsPage", page.value.toString());
});
</script>
<template>
  <UCard
    :ui="{
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
    }"
  >
    <!-- Filters -->
    <div class="flex items-center justify-center px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        :placeholder="$t('search')"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="search !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="search = ''"
          />
        </template>
      </UInput>
    </div>

    <!-- Table -->
    <UTable :rows="rows" :columns="columns" :loading="pending">
      <template #[firstColumnSlotName]="{ row, getRowData }">
        <div class="flex gap-2 font-medium">
          <NuxtLink class="flex" :to="localePath('/misc/' + row.slug)"
            ><NuxtImg width="40" :src="row.featured_image"
          /></NuxtLink>
          <div class="flex flex-col justify-between gap-3">
            <div>
              <NuxtLink
                class="text-gray-700 dark:text-gray-300"
                :to="localePath('/misc/' + row.slug)"
                >{{ getRowData() }}</NuxtLink
              >
            </div>
            <div v-if="row.release_dates?.length" class="text-xs">
              {{ $t("releaseDate") }}:
              {{
                new Date(row.release_dates[0]).toLocaleDateString(
                  locale == "en" ? "en-CA" : locale,
                )
              }}
            </div>
          </div>
        </div>
      </template>

      <template #publisher-data="{ row }">
        {{
          row.publishers
            .map((e: any) => e["title_" + locale])
            .join($t("joinCharacter"))
        }}
      </template>

      <template #actions-data="{ row }">
        <UButton
          :to="localePath('/misc/' + row.slug)"
          icon="i-heroicons-inbox-arrow-down"
          variant="ghost"
        />
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap items-center justify-between">
        <div>
          <span
            class="text-sm leading-5"
            v-html="
              $t('underTable', {
                from: pageFrom,
                to: pageTo,
                total: pageTotal,
              })
            "
          >
          </span>
        </div>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
        />
      </div>
    </template>
  </UCard>
</template>
