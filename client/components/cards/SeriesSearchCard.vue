<template>
  <div class="flex h-full px-1 overflow-hidden">
    <covers-group-cover :name="series" :book-items="bookItems" :width="60" :height="60" :book-cover-aspect-ratio="bookCoverAspectRatio" />
    <div class="flex-grow px-2 seriesSearchCardContent h-full">
      <p class="truncate text-sm">{{ series }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    series: String,
    bookItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    bookCoverAspectRatio() {
      return this.$store.getters['getBookCoverAspectRatio']
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
.seriesSearchCardContent {
  width: calc(100% - 80px);
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>