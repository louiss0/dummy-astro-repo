import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

const {
    nodes: {
        heading,
        ...restNodes
    },
    tags: { dl,
        ...restTags
    }
} = markdocHTMLTagSchemas({
    strictHeadings: true
});

export default defineMarkdocConfig(
    {

        extends: [
            shiki()
        ],
        nodes: {
            heading: {
                render: component("./src/components/markdoc/Heading.astro"),
                attributes: {
                    level: {
                        ...heading.attributes.level,
                        render: true
                    }
                },
                children: heading.children,
            },
            ...restNodes
        },
        tags: {
            callout: {
                render: component("./src/components/markdoc/Callout.astro"),
                attributes: {
                    title: {
                        type: String,

                    },
                    type: {
                        type: String,
                        default: "info",
                        errorLevel: "warning",
                        matches: ['info', 'tip', 'warning', 'danger']
                    },
                }
            },
            dl: {
                render: component("./src/components/markdoc/DefinitionList.astro"),
                attributes: dl.attributes,
                children: dl.children,
            },
            ...restTags
        },

    }
)