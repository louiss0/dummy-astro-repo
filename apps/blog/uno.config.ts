import { presetWind, presetTypography, defineConfig } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group'
export default defineConfig({
    presets: [
        presetWind(),
        presetTypography()
    ],
    transformers: [
        transformerVariantGroup()
    ],
    blocklist: [
        /^(?:(?:m|p|b)a-)/,
        /^(?:(?:op|of|position|case|decoration|line-height|b|c)-)/,
        /^(?:object)-[a-z]{2}$/,
        /^(grid)-(?!cols|rows)/,
        /^(flex)-(justify|items|content)/,
        /^(font|rounded)-\d+/
    ],
})