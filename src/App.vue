<template>
  <div id="app">
    <h1>Income Projection</h1>

    <section class="field-group columns">
      <Field
        v-model.number="salary"
        label="Salary"
        name="salary"
        type="number"
      />

      <div class="field">
        <label for="frequency">Paycheck Frequency</label>
        <select id="frequency" v-model.number="frequency">
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
        label="Monthly Expenses"
        name="expenses"
        type="number"
      />
    </section>

    <section class="results-group columns">
      <div class="results">
        <h3>Gross</h3>
        <Result label="Yearly" :value="grossIncome" />
        <Result label="Monthly" :value="grossIncome / 12" />
        <Result label="Paycheck" :value="grossIncome / frequency" />
        <Result label="Hourly" :value="grossIncome / 2080" />
      </div>

      <div class="results">
        <h3>Net</h3>
        <Result label="Yearly" :value="netIncome" />
        <Result label="Monthly" :value="netIncome / 12" />
        <Result label="Paycheck" :value="netIncome / frequency" />
        <Result label="Hourly" :value="netIncome / 2080" />
      </div>

      <div class="results">
        <h3>True</h3>
        <Result label="Yearly" :value="trueIncome" />
        <Result label="Monthly" :value="trueIncome / 12" />
        <Result label="Paycheck" :value="trueIncome / frequency" />
        <Result label="Hourly" :value="trueIncome / 2080" />
      </div>
    </section>

    <h2>Compounded</h2>

    <section class="compounded-group columns">
      <Field
        v-model.number="interest"
        label="Percent Increase"
        name="interest"
        type="number"
      />
      <Field
        v-model.number="years"
        label="Number of Years"
        name="years"
        type="number"
      />
      <Result label="Gross" :value="compound(grossIncome)" />
      <Result label="Net" :value="compound(netIncome)" />
      <Result label="True" :value="compound(trueIncome)" />
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

label {
  display: block;
  font-style: italic;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
}

input,
select {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
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
