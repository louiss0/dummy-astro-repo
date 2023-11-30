
<template>
    <div v-if="href && onClick">
        You can't use both a href and onClick.
        href is for an anchor onClick is for a button.
    </div>

    <div v-else-if="!href && !onClick">
        Please pick either onClick or href as props.
    </div>


    <a v-else-if="href" :href="href" :class="sortedClasses">
        <slot />
    </a>

    <button v-else :class="sortedClasses" @click="onClick" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { tailwindOrWindiCN_EFS } from '@code-fixer-23/cn-efs';


const { class: $class, href, onClick } = defineProps<{
    onClick?: (...args: Array<any>) => void
    href?: `/${string}`
    class?: string | Array<string | boolean | Record<string, boolean>> | Record<string, boolean>
}>()


defineSlots<{ default(): HTMLDivElement | HTMLSpanElement | string }>()


const sortedClasses = tailwindOrWindiCN_EFS(
    "px-6 py-2",
    "border-1 border-transparent",
    "[&:is(:hover,:focus-visible)]:(border-current outline-current)",
    $class
)



</script>

