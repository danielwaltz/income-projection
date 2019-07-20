<template>
  <div class="amount-result">
    <span v-if="label" class="label">{{ label }}</span>
    <span class="value">{{ asCurrency }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import formatCurrency from '@/utils/formatCurrency';

export default Vue.extend({
  name: 'AmountResult',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    asCurrency(): string {
      return formatCurrency(this.value);
    },
  },
});
</script>

<style scoped>
.amount-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-style: italic;
  font-size: 80%;
}

.value {
  font-weight: 700;
}
</style>
