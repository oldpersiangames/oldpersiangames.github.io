<script setup>

</script>

<template>
  <UCard class="md:max-w-3xl mx-auto" :ui="{
    body: { padding: '' }, background: 'bg-white dark:bg-gray-800/50',
    ring: 'ring-1 ring-gray-200 dark:ring-gray-700',

  }">
    <div class="flex flex-col items-center  md:flex-row bg-white/50dark:bg-gray-800/50">
      <svg viewBox="0 0 756.73141 823.04122"
        class="fill-[#252422] dark:fill-purple-500 w-full rounded-t-lg h-96 md:h-auto p-4 md:p-10 md:rounded-none md:rounded-l-lg flex-1">
        <use xlink:href="/img/logo.svg#g3577"></use>
      </svg>
      <div class="flex-1 flex grow-[2] flex-col justify-between p-4 leading-normal">
        <h5 class="mb-8 text-xl font-bold tracking-tight">
          {{ $t('welcome') }}
        </h5>
        <p class="text-sm leading-6 font-light mb-3"
          v-html="$t('intro', { sitename: '<strong class=\'font-medium\' style=\'text-shadow: #e73cff 0px 0px 20px;\'><span class=\'text-primary-600\'>Old</span> <span class=\'text-red-600\'>Persian</span> <span class=\'text-orange-500 dark:text-yellow-400\'>Games</span></strong>' })">
        </p>
      </div>
    </div>
  </UCard>
</template>