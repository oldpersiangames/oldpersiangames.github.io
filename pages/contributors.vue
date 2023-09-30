<script setup>
const { pending, data: users } = await useLazyFetch(
    "https://backend.oldpersiangames.org/api/users/websiteIndex"
    , {
        transform: (users) => {
            return users.map(user => ({
                name: user.name, telegram: user.telegram, contributes: user.contributes.reduce((group, contribute) => {
                    group[contribute.contribute] = group[contribute.contribute] ?? { count: 0 };
                    if (contribute.contributable_type) group[contribute.contribute].count++;
                    return group;
                }, {})
            }))
        }
    });
</script>
<template>
    <Head>
        <Title>مشارکت‌کنندگان</Title>
        <Meta name="description" content="لیست مشارکت‌کنندگان Old Persian Games" />
    </Head>
    <div v-if="pending">
        Loading ...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 md:mx-24">
        <UCard class="text-sm" v-for="user, index in users"
            :ui="{ body: { padding: 'px-4 py-5 sm:px-6 sm:py-4' }, background: 'bg-white dark:bg-gray-800/50' }"
            :Key="index">
            <h2 :id="user.name.replace(/ /g, '-')" class="text-lg font-bold mb-4">{{ user.name }} <small
                    v-if="user.telegram" class="text-primary-600 text-xs"><a :href="'https://t.me/' + user.telegram"
                        target="_blank">[تلگرام]</a></small>
                <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
            </h2>
            <ul class="list-disc list-inside">
                <li v-for="contribute, key in user.contributes">
                    {{ key }}{{ contribute.count ? (': ' + contribute.count) : '' }}
                </li>
            </ul>
        </UCard>
    </div>
</template>