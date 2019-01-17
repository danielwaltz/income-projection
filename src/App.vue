<template>
  <div id="app">
    <h1>Income Projection</h1>

    <section class="field-group columns">
      <Field
        v-model.number="salary"
        type="number"
        label="Salary"
        name="salary"
      />

      <Field
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

      <Field
        v-model.number="taxable"
        type="number"
        label="Taxable Percent"
        name="taxable"
      />

      <Field
        v-model.number="expenses"
        type="number"
        label="Monthly Expenses"
        name="expenses"
      />
    </section>

    <section class="results-group columns">
      <div class="results">
        <h3>Gross</h3>
        <Result :value="grossIncome" label="Yearly" />
        <Result :value="grossIncome / 12" label="Monthly" />
        <Result :value="grossIncome / frequency" label="Paycheck" />
        <Result :value="grossIncome / 2080" label="Hourly" />
      </div>

      <div class="results">
        <h3>Net</h3>
        <Result :value="netIncome" label="Yearly" />
        <Result :value="netIncome / 12" label="Monthly" />
        <Result :value="netIncome / frequency" label="Paycheck" />
        <Result :value="netIncome / 2080" label="Hourly" />
      </div>

      <div class="results">
        <h3>True</h3>
        <Result :value="trueIncome" label="Yearly" />
        <Result :value="trueIncome / 12" label="Monthly" />
        <Result :value="trueIncome / frequency" label="Paycheck" />
        <Result :value="trueIncome / 2080" label="Hourly" />
      </div>
    </section>

    <h2>Compounded</h2>

    <section class="compounded-group columns">
      <Field
        v-model.number="interest"
        type="number"
        label="Percent Increase"
        name="interest"
      />
      <Field
        v-model.number="years"
        type="number"
        label="Number of Years"
        name="years"
      />
      <Result :value="compound(grossIncome)" label="Gross" />
      <Result :value="compound(netIncome)" label="Net" />
      <Result :value="compound(trueIncome)" label="True" />
    </section>
  </div>
</template>

<script>
import Field from '@/components/Field';
import Result from '@/components/Result';

export default {
  name: 'App',
  components: {
    Field,
    Result,
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
    grossIncome() {
      return this.salary;
    },
    netIncome() {
      return (this.grossIncome / 100) * (100 - this.taxable);
    },
    trueIncome() {
      return this.netIncome - this.expenses * 12;
    },
  },
  methods: {
    compound(amount) {
      let accumulated = 0;

      for (let i = 0; i < this.years; i++) {
        accumulated *= this.interest / 100 + 1;
        accumulated += amount;
      }

      return accumulated;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
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

.columns > div {
  padding: 1rem;
}

@media (max-width: calc(1200px + 6rem)) {
  #app {
    max-width: 500px;
  }
  body .columns.columns > div {
    width: 100%;
    max-width: 100%;
  }
  body .compounded-group .result {
    font-size: 1rem;
  }
}

h1,
h2,
h3 {
  margin: 0;
}

.field-group .field {
  width: 50%;
}

.results-group {
  margin-bottom: 1rem;
}

.results-group .results {
  width: 100%;
  max-width: 350px;
  padding: 1rem;
}

.results-group .result {
  margin-top: 0.5rem;
}

.results-group .result:first-child {
  margin-top: 0;
}

.compounded-group > div {
  width: 50%;
}

.compounded-group .result {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  max-width: 350px;
}
</style>
