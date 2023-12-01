<template>
  <button

          id="toggle-switch"
          :class="[
            'py-2 px-6',
            'border-2 border-transparent [&:is(:hover,:focus)]:border-current',
            'focus:outline-current',
          ]"
          @click="toggleSunIcon()">

    <Center>
      <div data-wrapper class="transition-opacity duration-500 ease-in hover:opacity-80 ">
        <div v-show="isDark">
          <Icon
                icon="mdi:white-balance-sunny"
                width="none"
                class="w-10  text-orange-500"
                area-label="Sun Icon"
                :aria-hidden="isDark" />
          <div class="text-sm sr-only">Click to trigger dark mode</div>
        </div>

        <div v-show="!isDark">
          <Icon
                icon="heroicons:moon-solid"
                width="none"
                :aria-hidden="!isDark"
                class="w-10 text-purple-500"
                area-label="Moon Icon" />
          <div class="text-sm sr-only">Click to trigger light mode</div>
        </div>
      </div>
    </Center>
  </button>
</template>

<script lang="ts" setup>

import { Center } from './base';

import { Icon } from '@iconify/vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();

const toggleSunIcon = useToggle(isDark);

</script>
  
