<script setup lang="ts">
import { useFuse } from "@vueuse/integrations/useFuse";

const { t, locale } = useI18n();
const { data: games, pending } = await useAPI("/api/games", {
  default: () => {
    data: [];
  },
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
const secondColumnSlotName = computed(() => columns[1].key + "-data");

// Filters list
const defaultPublishers = games.value.data.reduce((acc: any, game: any) => {
  game.publishers.forEach((publisher: any) => {
    if (!acc.some((e: any) => e.slug === publisher.slug)) {
      acc.push(publisher);
    }
  });

  return acc;
}, [] as string[]);
const defaultPlatforms = games.value.data.reduce((acc, game) => {
  game.platforms.forEach((platform: any) => {
    if (!acc.includes(platform)) {
      acc.push(platform);
    }
  });

  return acc;
}, [] as string[]);
const defaultTypes = ["dubbed", "iranian", "modified", "subtitle"];

// Data Management

const filter = ref(
  (process.client
    ? JSON.parse(sessionStorage.getItem("gamesFilter") || "null")
    : null) || {
    search: "",
    selectedPublishers: [],
    selectedPlatforms: [],
    selectedTypes: [],
  },
);

const { results } = useFuse(() => filter.value.search, games.value.data, {
  fuseOptions: {
    keys: [
      "title_en",
      "title_fa",
      "producers.title_en",
      "producers.title_fa",
      "slug",
      "extra_searchables",
    ],
    threshold: 0.3,
    ignoreLocation: true,
  },
  matchAllWhenSearchEmpty: true,
});
const computedResults = computed(() => {
  let result = results.value.map((e) => e.item); // Revert the useFuse format to the original

  if (filter.value.selectedPublishers.length) {
    const selectedPublisherSlugs = defaultPublishers
      .filter((e) => filter.value.selectedPublishers.includes(e.slug))
      .map((e: any) => e.slug);

    result = result.filter((game: any) =>
      game.publishers.some((publisher: any) =>
        selectedPublisherSlugs.includes(publisher.slug),
      ),
    );
  }

  if (filter.value.selectedPlatforms.length) {
    result = result.filter((game: any) =>
      game.platforms.some((platform: string) =>
        filter.value.selectedPlatforms.includes(platform),
      ),
    );
  }

  if (filter.value.selectedTypes.length) {
    result = result.filter((game: any) =>
      game.types.some((type: string) =>
        filter.value.selectedTypes.includes(type),
      ),
    );
  }

  return result;
});
const rows = computed(() => {
  return computedResults.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value,
  );
});

// Pagination
const page = ref(
  process.client ? parseInt(sessionStorage.getItem("gamesPage") || "1") : 1,
);
const pageCount = ref(50);
const pageTotal = computed(() => computedResults.value.length);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
);

// Manage session storage
watch(filter.value, () => {
  page.value = 1;
  sessionStorage.setItem("gamesFilter", JSON.stringify(filter.value));
});
watch(page, () => {
  sessionStorage.setItem("gamesPage", page.value.toString());
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
    <div
      class="flex flex-col items-stretch gap-x-4 gap-y-3 px-4 py-3 lg:flex-row"
    >
      <UInput
        v-model="filter.search"
        icon="i-heroicons-magnifying-glass-20-solid"
        :placeholder="$t('search')"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        class="flex-1"
      >
        <template #trailing>
          <UButton
            v-show="filter.search !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="filter.search = ''"
          />
        </template>
      </UInput>

      <USelectMenu
        v-model="filter.selectedTypes"
        :options="defaultTypes"
        class="flex-1"
        multiple
      >
        <template #option="{ option: option }"> {{ $t(option) }} </template>
        <template #label>
          <span v-if="filter.selectedTypes.length" class="truncate">{{
            filter.selectedTypes.map((e) => $t(e)).join(", ")
          }}</span>
          <span v-else>{{ $t("allTypes") }}</span>
        </template>
      </USelectMenu>

      <USelectMenu
        v-model="filter.selectedPlatforms"
        :options="defaultPlatforms"
        class="flex-1"
        multiple
      >
        <template #label>
          <span v-if="filter.selectedPlatforms.length" class="truncate">{{
            filter.selectedPlatforms.join(", ")
          }}</span>
          <span v-else>{{ $t("allPlatforms") }}</span>
        </template>
      </USelectMenu>

      <USelectMenu
        v-model="filter.selectedPublishers"
        :options="defaultPublishers"
        multiple
        :placeholder="$t('selectPublisher')"
        :searchable-placeholder="$t('selectPublisher')"
        class="flex-1"
        searchable
        :option-attribute="'title_' + locale"
        value-attribute="slug"
      >
        <template #label>
          <span v-if="filter.selectedPublishers.length" class="truncate">{{
            defaultPublishers
              .filter((e) => filter.selectedPublishers.includes(e.slug))
              .map((e) => e["title_" + locale])
              .join(", ")
          }}</span>
          <span v-else>{{ $t("allPublishers") }}</span>
        </template>
      </USelectMenu>
    </div>

    <UTable
      :rows="rows"
      :columns="columns"
      :loading="pending"
      :ui="{ tr: { base: 'h-full' }, td: { base: 'h-full' } }"
    >
      <template #[firstColumnSlotName]="{ row, getRowData }">
        <div class="flex gap-2 font-medium">
          <NuxtLink
            v-if="row.featured_image"
            class="flex"
            :to="localePath('/games/' + row.slug)"
            ><NuxtImg width="40" :src="row.featured_image"
          /></NuxtLink>
          <div class="flex flex-col justify-between">
            <div>
              <NuxtLink
                class="text-gray-700 dark:text-gray-300"
                :to="localePath('/games/' + row.slug)"
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

      <template #[secondColumnSlotName]="{ row, getRowData }">
        <div class="flex h-full flex-col justify-between">
          <div>{{ getRowData() }}</div>
          <div>
            <span
              v-for="platform in row.platforms"
              class="flex items-center gap-1"
            >
              <template v-if="platform == 'Windows'">
                <UIcon name="i-simple-icons-windows" />
              </template>
              <template v-if="platform == 'PS2'">
                <UIcon name="i-simple-icons-playstation" />
              </template>
              <template v-if="platform == 'PS1'">
                <UIcon name="i-simple-icons-playstation" />
              </template>
              <template v-if="platform == 'Android'">
                <UIcon name="i-simple-icons-android" />
              </template>
              <template v-if="platform == 'Xbox 360'">
                <UIcon name="i-simple-icons-xbox" />
              </template>
              {{ platform }}
            </span>
          </div>
        </div>
      </template>

      <template #publisher-data="{ row }">
        <div class="flex h-full flex-col justify-between">
          <div>
            {{
              row.publishers
                .map((e: any) => e["title_" + locale])
                .join($t("joinCharacter"))
            }}
          </div>
          <div class="text-xs" v-if="row.producers.length">
            {{ $t("producer") }}:
            {{
              row.producers
                .map((e: any) => e["title_" + locale])
                .join($t("joinCharacter"))
            }}
          </div>
        </div>
      </template>

      <template #actions-data="{ row }">
        <UButton
          :to="localePath('/games/' + row.slug)"
          icon="i-heroicons-inbox-arrow-down"
          variant="ghost"
        />
      </template>
    </UTable>

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
