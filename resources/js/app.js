import './bootstrap';
import '../scss/styles.scss';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .mount(el);
    },
    progress: {
        // The delay after which the progress bar will
        // appear during navigation, in milliseconds.
        delay: 100,

        // The color of the progress bar.
        color: '#29d',
        //color: '#4B5563',

        // Whether to include the default NProgress styles.
        includeCSS: false,

        // Whether the NProgress spinner will be shown.
        showSpinner: true,
    },
});
