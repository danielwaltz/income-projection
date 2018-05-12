<template>
  <div id="app">
    <h1>Income Projection</h1>
    <div class="field-group">
      <Field
        type="number"
        name="salary"
        prettyName="Salary"
        v-model="salary"
      />
      <div class="field">
        <label for="frequency">Paycheck Frequency</label>
        <select id="frequency" v-model="frequency">
          <option value="52">Every Week</option>
          <option value="26">Every Two Weeks</option>
          <option value="24">Twice a Month</option>
        </select>
      </div>
      <Field
        type="number"
        name="taxable"
        prettyName="Taxable Percent"
        v-model="taxable"
      />
      <Field
        type="number"
        name="expenses"
        prettyName="Monthy Expenses"
        v-model="expenses"
      />
    </div>
    <div class="result-group">
      <div class="result">Yearly: {{toCurrency(trueIncome)}}</div>
      <div class="result">Monthy: {{toCurrency(trueIncome / 12)}}</div>
      <div class="result">Paycheck: {{toCurrency(trueIncome / frequency)}}</div>
      <div class="result">Hourly: {{toCurrency(trueIncome / 2080)}}</div>
    </div>
  </div>
</template>

<script>
import currencyFormatter from 'currency-formatter';
import Field from '@/components/Field';

export default {
  name: 'app',
  components: {
    Field,
  },
  data: () => ({
    salary: 60000,
    frequency: 24,
    taxable: 25,
    expenses: 0,
  }),
  computed: {
    trueIncome: function() {
      return this.salary / 100 * (100 - this.taxable) - this.expenses * 12;
    },
  },
  methods: {
    toCurrency: amount => {
      return currencyFormatter.format(amount.toFixed(2), {
        code: 'USD',
      });
    },
  },
};
</script>

<style>
html {
  font-size: 1.5vmin;
}

body {
  margin: 0;
  padding: 5rem;
}

#app {
  color: #2c3e50;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.field-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem 3rem;
}

label {
  display: block;
  font-style: italic;
  margin-bottom: 0.1rem;
}

input,
select {
  display: block;
  width: 100%;
  font-size: 2rem;
  padding: 0.5rem;
}

.result-group {
  margin-top: 3rem;
  font-size: 2rem;
}

.result {
  margin-top: 1rem;
}

.result:first-child {
  margin-top: 0;
}
</style>
