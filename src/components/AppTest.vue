<template>
  <div class="roi-calculator">
    <h2>Калькулятор доходности коттеджей</h2>

    <div v-if="loading">Загрузка данных...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <select v-model="selectedCottage">
        <option disabled value="">Выберите коттедж</option>
        <option v-for="cottage in cottages" :key="cottage.name" :value="cottage">
          {{ cottage.name }} ({{ cottage.area }} м², {{ cottage.bedrooms }} спальни)
        </option>
      </select>

      <div v-if="selectedCottage">
        <h3>Выбранный коттедж: {{ selectedCottage.name }}</h3>
        <p>Стоимость: ${{ selectedCottage.cost.toLocaleString() }}</p>

        <label for="rentalStrategy">Стратегия аренды:</label>
        <select id="rentalStrategy" v-model="rentalStrategy">
          <option value="monthly">Помесячно</option>
          <option value="daily">Посуточно</option>
        </select>

        <div class="results">
          <h4>Расчет доходности:</h4>
          <p>Предполагаемый годовой доход: ${{ annualIncome.toLocaleString() }}</p>
          <p>Годовые эксплуатационные расходы: ${{ selectedCottage.annual_operating_costs.toLocaleString() }}</p>
          <p>Чистый годовой доход: ${{ netAnnualIncome.toLocaleString() }}</p>
          <p>ROI (годовой): **{{ roi.toFixed(2) }}%**</p>
        </div>
      </div>
      <div v-else>
        <p>Пожалуйста, выберите коттедж для расчета.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCottageData } from '@/services/googlesheets'; // Путь может отличаться

export default {
  data() {
    return {
      cottages: [],
      selectedCottage: null,
      rentalStrategy: 'monthly', // 'monthly' или 'daily'
      loading: true,
      error: null,
    };
  },
  computed: {
    // Вычисляем годовой доход в зависимости от стратегии
    annualIncome() {
      if (!this.selectedCottage) return 0;

      let income = 0;
      if (this.rentalStrategy === 'monthly') {
        income = this.selectedCottage.monthly_rental_income * 12 * this.selectedCottage.monthly_occupancy;
      } else { // daily
        income = this.selectedCottage.daily_rental_income * 365 * this.selectedCottage.daily_occupancy;
      }
      return income;
    },
    // Вычисляем чистый годовой доход
    netAnnualIncome() {
      if (!this.selectedCottage) return 0;
      return this.annualIncome - this.selectedCottage.annual_operating_costs;
    },
    // Вычисляем ROI
    roi() {
      if (!this.selectedCottage || this.selectedCottage.cost === 0) return 0;
      return (this.netAnnualIncome / this.selectedCottage.cost) * 100;
    },
  },
  async created() {
    // Получаем данные при создании компонента (при перезагрузке страницы)
    try {
      const data = await fetchCottageData();
      if (data) {
        this.cottages = data;
        // Optionally, pre-select the first cottage
        if (this.cottages.length > 0) {
          this.selectedCottage = this.cottages[0];
        }
      } else {
        this.error = 'Не удалось загрузить данные о коттеджах.';
      }
    } catch (err) {
      this.error = `Ошибка при загрузке данных: ${err.message}`;
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.roi-calculator {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.results {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.results h4 {
  margin-top: 0;
  color: #333;
}

.results p {
  margin: 8px 0;
}

strong {
  color: #007bff;
  /* Примерно синий цвет для выделения ROI */
  font-size: 1.1em;
}
</style>