
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import BaseButton from './BaseButton.vue';
import { Icon } from '@iconify/vue';

let search: HTMLDivElement | null

const classesToToggleObject = {
    hide: "invisible",
    scaleZero: "scale-0"
}


const timers: Array<NodeJS.Timeout> = []

onMounted(() => {
    search = document.body?.querySelector<HTMLDivElement>("#search")

    if (!search) {

        throw new Error(
            `A div with an id of search is supposed to exist on this page.
             The point of this component is to show it to the user
             when it's needed.`
        )
    }

    const classesToToggleObjectValues = Object.values(classesToToggleObject);

    const searchElContainsAllClassesToToggleObjectValues =
        classesToToggleObjectValues.every(toggledClass => !search?.classList.contains(toggledClass));

    if (searchElContainsAllClassesToToggleObjectValues) {

        throw new Error(
            `Please add the ${classesToToggleObjectValues.join(",")} class to the #search element.
                It's not supposed to be visible to the user when the page loads`
        )

    }


})

function toggleSearch() {


    const searchElementContainsHideAndScaleClasses =
        search?.classList.contains(classesToToggleObject.hide)
        && search?.classList.contains(classesToToggleObject.scaleZero);

    if (searchElementContainsHideAndScaleClasses) {

        search?.classList.remove(classesToToggleObject.hide)

        const id = setTimeout(() => search?.classList.remove(classesToToggleObject.scaleZero), 200)

        return timers.push(id)
    }

    search?.classList.add(classesToToggleObject.scaleZero)

    const id = setTimeout(() => search?.classList.add(classesToToggleObject.hide), 200)

    timers.push(id)

}


onUnmounted(() => {
    timers.forEach(timer => clearTimeout(timer))
})

</script>

<template>
    <BaseButton @click="toggleSearch" aria-label="Search Collections">
        <Icon icon="mdi:file-search" class="text-12" />
    </BaseButton>
</template>


