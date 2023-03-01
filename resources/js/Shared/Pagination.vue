<template>
<div v-if="links.length > 3" class="row mb-3">
    <div class="col">
<nav>
    <ul class="pagination flex-wrap">
        <template v-for="(link, key) in links">
            <li v-if="link.url === null" :key="key" class="page-item disabled">
                <a class="page-link" v-html="link.label" preserve-scroll></a>
            </li>
            <li v-else class="page-item" :class="{'active': link.active}" :aria-current="link.active ? 'page' : null">
                <Link :key="`link-${key}`" class="page-link" :href="link.url" v-html="link.label" preserve-scroll />
            </li>
        </template>
    </ul>
</nav>    
    </div>
</div>
</template>

<script>
import { Link } from "@inertiajs/vue3";

export default {
  components: {
    Link,
  },
  props: {
    links: Array,
  },
}
</script>
