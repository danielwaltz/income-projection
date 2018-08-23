<template>
  <div id="app">
    <h1>Income Projection</h1>

    <div class="field-group columns">
      <Field
        v-model.number="salary"
        label="Salary"
        name="salary"
        type="number"
      />

      <div class="field">
        <label for="frequency">Paycheck Frequency</label>
        <select v-model="frequency" id="frequency">
          <option value="52">Every Week</option>
          <option value="26">Every Two Weeks</option>
          <option value="24">Twice a Month</option>
        </select>
      </div>

      <Field
        v-model.number="taxable"
        label="Taxable Percent"
        name="taxable"
        type="number"
      />

      <Field
        v-model.number="expenses"
        label="Monthy Expenses"
        name="expenses"
        type="number"
      />
    </div>

    <div class="results-group columns">
      <div class="results">
        <h2>Gross</h2>
        <Result label="Yearly" :value="grossIncome" />
        <Result label="Monthy" :value="grossIncome / 12" />
        <Result label="Paycheck" :value="grossIncome / frequency" />
        <Result label="Hourly" :value="grossIncome / 2080" />
      </div>

      <div class="results">
        <h2>Net</h2>
        <Result label="Yearly" :value="netIncome" />
        <Result label="Monthy" :value="netIncome / 12" />
        <Result label="Paycheck" :value="netIncome / frequency" />
        <Result label="Hourly" :value="netIncome / 2080" />
      </div>

      <div class="results">
        <h2>True</h2>
        <Result label="Yearly" :value="trueIncome" />
        <Result label="Monthy" :value="trueIncome / 12" />
        <Result label="Paycheck" :value="trueIncome / frequency" />
        <Result label="Hourly" :value="trueIncome / 2080" />
      </div>
    </div>
  </div>
</template>

<script>
import Field from '@/components/Field';
import Result from '@/components/Result';

export default {
  name: 'app',
  components: {
    Field,
    Result,
  },
  data() {
    return {
      salary: 60000,
      frequency: 24,
      taxable: 25,
      expenses: 1200,
    };
  },
  computed: {
    grossIncome() {
      return this.salary;
    },
    netIncome() {
      return this.grossIncome / 100 * (100 - this.taxable);
    },
    trueIncome() {
      return this.netIncome - this.expenses * 12;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: calc(1em + 1vmin);
}

body {
  margin: 0;
  padding: 1.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  color: #2c3e50;
  font-family: Helvetica, Arial, sans-serif;
}

h1,
h2 {
  margin: 0;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
}

.columns > div {
  padding: 1rem;
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
  font-size: 1.5rem;
  padding: 0.5rem;
}

.field {
  width: 50%;
}

.results {
  width: 33.33%;
  padding: 1rem;
}

.result {
  margin-top: 0.5rem;
}

.result:first-child {
  margin-top: 0;
}

@media (max-width: 1000px) {
  .columns > div {
    width: 100%;
  }
}
</style>
