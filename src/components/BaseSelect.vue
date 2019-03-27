<template>
  <FieldContainer class="base-select" v-bind="$props">
    <select id="name" :value="value" class="select" v-on="listeners">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </FieldContainer>
</template>

<script>
import FieldContainer from '@/components/FieldContainer';

export default {
  name: 'BaseSelect',
  components: {
    FieldContainer,
  },
  inheritAttrs: false,
  props: {
    ...FieldContainer.props,
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.update,
      };
    },
  },
  methods: {
    update(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
