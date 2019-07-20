<template>
  <div id="app">
    <h1>Income Projection</h1>

    <section class="field-group columns">
      <BaseInput
        v-model.number="salary"
        type="number"
        label="Salary"
        name="salary"
      />

      <BaseSelect
        v-model.number="frequency"
        :items="[
          { label: 'Every Week', value: 52 },
          { label: 'Every Two Weeks', value: 26 },
          { label: 'Twice a Month', value: 24 },
        ]"
        type="select"
        label="Paycheck Frequency"
        name="frequency"
      />

      <BaseInput
        v-model.number="taxable"
        type="number"
        label="Taxable Percent"
        name="taxable"
      />

      <BaseInput
        v-model.number="expenses"
        type="number"
        label="Monthly Expenses"
        name="expenses"
      />
    </section>

    <section class="result-group columns">
      <div class="result">
        <h3>Gross</h3>
        <AmountResult :value="grossIncome" label="Yearly" />
        <AmountResult :value="grossIncome / 12" label="Monthly" />
        <AmountResult :value="grossIncome / frequency" label="Paycheck" />
        <AmountResult :value="grossIncome / 2080" label="Hourly" />
      </div>

      <div class="result">
        <h3>Net</h3>
        <AmountResult :value="netIncome" label="Yearly" />
        <AmountResult :value="netIncome / 12" label="Monthly" />
        <AmountResult :value="netIncome / frequency" label="Paycheck" />
        <AmountResult :value="netIncome / 2080" label="Hourly" />
      </div>

      <div class="result">
        <h3>True</h3>
        <AmountResult :value="trueIncome" label="Yearly" />
        <AmountResult :value="trueIncome / 12" label="Monthly" />
        <AmountResult :value="trueIncome / frequency" label="Paycheck" />
        <AmountResult :value="trueIncome / 2080" label="Hourly" />
      </div>
    </section>

    <h2>Compounded</h2>

    <section class="compounded-group columns">
      <BaseInput
        v-model.number="interest"
        type="number"
        label="Percent Increase"
        name="interest"
      />
      <BaseInput
        v-model.number="years"
        type="number"
        label="Number of Years"
        name="years"
      />
      <AmountResult :value="compound(grossIncome)" label="Gross" />
      <AmountResult :value="compound(netIncome)" label="Net" />
      <AmountResult :value="compound(trueIncome)" label="True" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import AmountResult from '@/components/AmountResult.vue';

export default Vue.extend({
  name: 'App',
  components: {
    BaseInput,
    BaseSelect,
    AmountResult,
  },
  data() {
    return {
      salary: 60000,
      frequency: 24,
      taxable: 25,
      expenses: 1000,
      interest: 8,
      years: 10,
    };
  },
  computed: {
    grossIncome(): number {
      return this.salary;
    },
    netIncome(): number {
      return (this.grossIncome / 100) * (100 - this.taxable);
    },
    trueIncome(): number {
      return this.netIncome - this.expenses * 12;
    },
  },
  methods: {
    compound(amount: number) {
      const accumulated = Array(this.years)
        .fill(0)
        .reduce(result => {
          result *= this.interest / 100 + 1;
          result += amount;
          return result;
        }, 0);
      return accumulated;
    },
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100vh;
}

html {
  font-size: calc(1em + 1vmin);
  background-color: #000;
}

body {
  margin: 0;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.87);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.87);
  font-family: Helvetica, Arial, sans-serif;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -1rem;
  margin-right: -1rem;
}

.columns > * {
  padding: 1rem;
}

@media (max-width: calc(1000px + 6rem)) {
  #app {
    max-width: 500px;
  }
  body .columns.columns > * {
    width: 100%;
    max-width: 100%;
  }
  body .compounded-group .amount-result {
    font-size: 1rem;
  }
}

h1,
h2,
h3 {
  margin: 0;
}

.field-group .field-container {
  width: 50%;
}

.result-group {
  margin-bottom: 1rem;
}

.result-group .result {
  width: 100%;
  max-width: 350px;
  padding: 1rem;
}

.result-group .amount-result {
  margin-top: 0.5rem;
}

.result-group .amount-result:first-child {
  margin-top: 0;
}

.compounded-group .field-container {
  width: 50%;
}

.compounded-group .amount-result {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  max-width: 350px;
}
</style>
