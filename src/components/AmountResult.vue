<template>
  <div class="amount-result">
    <span v-if="label" class="label">{{ label }}</span>
    <span class="value">{{ asCurrency }}</span>
  </div>
</template>

<script>
import currencyFormatter from 'currency-formatter';

export default {
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
    asCurrency() {
      const parsed = parseFloat(this.value);
      return currencyFormatter.format(parsed.toFixed(2), {
        code: 'USD',
      });
    },
  },
};
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
