<template>
  <FieldContainer class="base-select" v-bind="$props">
    <select id="name" :value="value" class="select" v-on="listeners">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label || item.value }}
      </option>
    </select>
  </FieldContainer>
</template>

<script lang="ts">
import Vue from 'vue';
import FieldContainer, { props } from '@/components/FieldContainer.vue';

interface SelectItem {
  value: string | number;
  label?: string;
}

export default Vue.extend({
  name: 'BaseSelect',
  components: {
    FieldContainer,
  },
  inheritAttrs: false,
  props: {
    ...props,
    items: {
      type: Array as () => SelectItem[],
      default: Array as () => SelectItem[],
    },
  },
  computed: {
    listeners(): any {
      return {
        ...this.$listeners,
        input: this.update,
      };
    },
  },
  methods: {
    update(event: HTMLInputEvent) {
      this.$emit('input', event.target.value);
    },
  },
});
</script>

<style scoped>
.select {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
