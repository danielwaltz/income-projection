
<template>
  <div class="result">
    <span v-if="label" class="result__label">{{label}}:</span>
    <span class="result__value">{{toCurrency(value)}}</span>
  </div>
</template>

<script>
import currencyFormatter from 'currency-formatter';

export default {
  name: 'Result',
  props: {
    label: String,
    value: [String, Number],
  },
  methods: {
    toCurrency(amount) {
      return currencyFormatter.format(amount.toFixed(2), {
        code: 'USD',
      });
    },
  },
};
</script>

<style scoped>
.result {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result__label {
  font-style: italic;
  font-size: 80%;
}

.result__value {
  font-weight: 700;
}
</style>
