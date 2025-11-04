// services/googleSheetsService.js
import { ref, reactive } from 'vue'
class GoogleSheetsService {
  staticTable = {
    units: 'E30:E40',
    phases: 'E29:F40',
    dataUnits: 'E29:Q40',
    dataUnitsPremium: 'E168:Q179',
    pricesData: 'E14:K25',
    pricesDataPremium: 'E153:K164',
    dailyStrategy: 'E53:Z64',
    monthlyStrategy: 'E68:Z79',
    rentalRate: 'E43:I47',
    course: 'E11:G11',
    selectedPrice: 'G27',

    dailyStrategyPhase3: 'E53:Z64',
    monthlyStrategyPhase3: 'E68:Z79',
    dailyStrategyPhase2: 'E84:Z95',
    monthlyStrategyPhase2: 'E99:Z110',
    dailyStrategyPhase1: 'E116:Z127',
    monthlyStrategyPhase1: 'E131:Z142',

    dailyStrategyPhase3Premium: 'E192:Z203',
    monthlyStrategyPhase3Premium: 'E207:Z218',
    dailyStrategyPhase2Premium: 'E223:Z234',
    monthlyStrategyPhase2Premium: 'E238:Z249',
    dailyStrategyPhase1Premium: 'E255:Z266',
    monthlyStrategyPhase1Premium: 'E270:Z281',
    dailyStrategyPremium: 'E53:Z64',
    monthlyStrategyPremium: 'E68:Z79',
  }

  units = ref([])
  phases = ref([])
  unitsData = ref([])
  unitsDataPremium = ref([])
  unitsPricesData = ref([])
  unitsPricesDataPremium = ref([])
  dailyStrategy = ref([])
  monthlyStrategy = ref([])
  rentalRate = ref([])
  course = ref([])
  selectedPrice = ref([])
  monthlyStrategyPhase3 = ref([])
  dailyStrategyPhase3 = ref([])
  monthlyStrategyPhase2 = ref([])
  dailyStrategyPhase2 = ref([])
  monthlyStrategyPhase1 = ref([])
  dailyStrategyPhase1 = ref([])
  monthlyStrategyPhase3Premium = ref([])
  dailyStrategyPhase3Premium = ref([])
  monthlyStrategyPhase2Premium = ref([])
  dailyStrategyPhase2Premium = ref([])
  monthlyStrategyPhase1Premium = ref([])
  dailyStrategyPhase1Premium = ref([])
  dailyStrategyPremium = ref([])
  monthlyStrategyPremium = ref([])

  constructor() {
    this.spreadsheetId = '1dnLv8GbIPw30XCGyNRe85wKM2Xq8qPhdjPdMrpv1YRI';
    this.apiKey = import.meta.env.VITE_VUE_APP_GOOGLE_SHEETS_API_KEY;
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    this.cache = new Map();
  }

  createUnitsArray(data) {
    return data.map((item, index) => ({
        id: item[0] // или item, если хотите использовать строку "Unit X"
    }));
  }

  transformDataNormalized(data) {
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const obj = {
            id: row[0] // Unit становится id
        };
        
        headers.forEach((header, index) => {
            if (header !== "" && index !== 0) {
                let key = header
                    .replace(/,/g, '')
                    .replace(/\s+/g, '_')
                    .toLowerCase();
                
                let value = row[index];
                
                // Преобразование типов данных
                if (typeof value === 'string') {
                    if (key.includes('price') || key.includes('vat')) {
                        value = parseInt(value.replace(/,/g, '')) || value;
                    }
                    else if (key.includes('m2') || key.includes('size') || key.includes('area')) {
                        value = parseInt(value) || value;
                    }
                    else if (key === 'available') {
                        value = value.toLowerCase() === 'yes';
                    }
                }
                
                obj[key] = value;
            }
        });
        
        return obj;
    });
  }

  transformPriceDataNormalized(data) {
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const obj = {
            id: row[0] // Unit становится id
        };
        
        headers.forEach((header, index) => {
            if (header !== "" && index !== 0 && index !== 1) {
                let key = header
                    .replace(/,/g, '')
                    .replace(/\s+/g, '_')
                    .toLowerCase();
                
                let value = row[index];
                
                // Преобразование типов данных
                if (typeof value === 'string') {
                    if (key.includes('price')) {
                        value = parseInt(value.replace(/,/g, '')) || value;
                    }
                    else if (key.includes('discount')) {
                        value = parseFloat(value.replace('%', '')) || value;
                    }
                }
                
                obj[key] = value;
            }
        });
        
        return obj;
    });
  }

  transformDailyStrategy(data) {
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const obj = {
            id: row[0]
        };
        
        headers.forEach((header, index) => {
            if (header !== "" && index !== 0 && index !== 1) {
                // Создаем понятные ключи
                let key = header
                    .replace(/,/g, '')
                    .replace(/%/g, 'perc')
                    .replace(/\s+/g, '_')
                    .toLowerCase();
                
                // Улучшаем названия ключей
                key = key
                    .replace('adr_idr', 'daily_rate_idr')
                    .replace('monthly_proceedings_idr', 'monthly_revenue_idr')
                    .replace('net_proceedings_idr', 'net_revenue_idr')
                    .replace('investor_proceedings_idr', 'investor_income_idr')
                    .replace('mc_charge_idr', 'management_fee_idr')
                    .replace('annualised_roi', 'annual_roi')
                    .replace('pbp_years', 'payback_period_years');
                
                let value = row[index];
                
                if (typeof value === 'string') {
                    if (key.includes('idr') || key.includes('usd') || key.includes('investment')) {
                        value = parseFloat(value.replace(/,/g, '')) || value;
                    }
                    else if (key.includes('perc') || key.includes('roi') || key.includes('occupancy') || key.includes('fee') || key.includes('charge')) {
                        value = parseFloat(value.replace('%', '')) || value;
                    }
                    else if (key.includes('payback_period')) {
                        value = parseFloat(value) || value;
                    }
                }
                
                obj[key] = value;
            }
        });
        
        return obj;
    });
  }

  transformMonthlyStrategy(data) {
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const obj = {
            id: row[0]
        };
        
        headers.forEach((header, index) => {
            if (header !== "" && index !== 0 && index !== 1) {
                let key = header
                    .replace(/,/g, '')
                    .replace(/%/g, 'perc')
                    .replace(/\s+/g, '_')
                    .toLowerCase();

                    key = key
                    .replace('adr_idr', 'daily_rate_idr')
                    .replace('monthly_proceedings_idr', 'monthly_revenue_idr')
                    .replace('net_proceedings_idr', 'net_revenue_idr')
                    .replace('investor_proceedings_idr', 'investor_income_idr')
                    .replace('mc_charge_idr', 'management_fee_idr')
                    .replace('annualised_roi', 'annual_roi')
                    .replace('pbp_years', 'payback_period_years');
                
                let value = row[index];
                
                if (typeof value === 'string') {
                    // if (value === '-') {
                    //     value = 0;
                    // }
                    if (key.includes('idr') || key.includes('usd') || key.includes('investment')) {
                        value = parseFloat(value.replace(/,/g, '')) || value;
                    }
                    else if (key.includes('perc') || key.includes('roi') || key.includes('occupancy') || key.includes('fee') || key.includes('charge')) {
                        value = parseFloat(value.replace('%', '')) || value;
                    }
                    else if (key.includes('payback_period')) {
                        value = parseFloat(value) || value;
                    }
                }
                
                obj[key] = value;
            }
        });
        
        return obj;
    });
  }

  transformRentalRate(data) {
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const obj = {
            id: row[0]
        };
        
        headers.forEach((header, index) => {
            if (header !== "" && index !== 0 && index !== 1) {
                let key = header
                    .replace(/,/g, '')
                    .replace(/%/g, 'perc')
                    .replace(/\s+/g, '_')
                    .toLowerCase();
                
                let value = row[index];
                
                if (typeof value === 'string') {
                    if (key.includes('idr')) {
                        value = parseFloat(value.replace(/,/g, '')) || value;
                    }
                    else if (key.includes('perc')) {
                        value = parseFloat(value.replace('%', '')) || value;
                    }
                }
                
                obj[key] = value;
            }
        });
        
        return obj;
    });
  }

  // --- Fetch with simple in-memory caching ---
  async fetchData(range) {
    const cacheKey = `sheets_${range}`;
    const cachedData = this.getCacheData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const url = `${this.baseUrl}/${this.spreadsheetId}/values/${encodeURIComponent(range)}?key=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const values = Array.isArray(data.values) ? data.values : [];

      this.setCacheData(cacheKey, values);
      return values;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw error;
    }
  }

  // --- Robust number parser ---
  parseNumber(value) {
    if (value === null || value === undefined || value === '') return 0;
    const s = String(value).trim();

    // handle parentheses for negative numbers: "(1,000)" -> -1000
    const isParenthesesNegative = /^\(.*\)$/.test(s);
    let cleaned = s.replace(/[^\d.\-]/g, '');

    // If cleaned becomes empty, return 0
    if (cleaned === '' || cleaned === '.' || cleaned === '-' ) return 0;

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) return 0;

    return isParenthesesNegative ? -Math.abs(parsed) : parsed;
  }

  // --- Parse percent-like values robustly ---
  // Accepts "70", "70%", 0.7 and returns decimal (0.7)
  parsePercent(value) {
    const num = this.parseNumber(value);
    if (num === 0) return 0;

    // If it's clearly > 1 and looks like percent (70 -> 0.7)
    if (Math.abs(num) > 1 && Math.abs(num) <= 10000) {
      return num / 100;
    }

    // If already a decimal (0.7) just return
    return num;
  }

  async getUnits() {
      const unitsMap = await this.fetchData(this.staticTable.units);
      this.units.value = this.createUnitsArray(unitsMap)
      return this.units.value
  }

  async getDataUnits() {
      const unitsMap = await this.fetchData(this.staticTable.dataUnits);
      this.unitsData.value = this.transformDataNormalized(unitsMap)
      return this.unitsData.value
  }

  async getDataUnitsPremium() {
      const unitsMap = await this.fetchData(this.staticTable.dataUnitsPremium);
      this.unitsDataPremium.value = this.transformDataNormalized(unitsMap)
      return this.unitsDataPremium.value
  }

  async getDataPriceUnits() {
      const unitsMap = await this.fetchData(this.staticTable.pricesData);
      this.unitsPricesData.value = this.transformPriceDataNormalized(unitsMap)
      return this.unitsPricesData.value
  }

  async getDataPriceUnitsPremium() {
      const unitsMap = await this.fetchData(this.staticTable.pricesDataPremium);
      this.unitsPricesDataPremium.value = this.transformPriceDataNormalized(unitsMap)
      return this.unitsPricesDataPremium.value
  }

  async getDataDailyStrategy() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategy);
      this.dailyStrategy.value = this.transformDailyStrategy(unitsMap)
      return this.dailyStrategy.value
  }

  async getDataMonthlyStrategy() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategy);
      this.monthlyStrategy.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategy.value
  }

  async getDataRentalRate() {
      const unitsMap = await this.fetchData(this.staticTable.rentalRate);
      this.rentalRate.value = this.transformRentalRate(unitsMap)
      return this.rentalRate.value
  }

  async getDataCourse() {
      const unitsMap = await this.fetchData(this.staticTable.course);
      this.course.value = unitsMap[0][2]
      return this.course.value
  }

  async getSelectedPrice() {
      const unitsMap = await this.fetchData(this.staticTable.selectedPrice);
      this.selectedPrice = Number(unitsMap.flat().join(""))
      return this.selectedPrice
  }

  async getDataMonthlyStrategyPhase3() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase3);
      this.monthlyStrategyPhase3.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase3.value
  }

  async getDataDailyStrategyPhase3() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase3);
      this.dailyStrategyPhase3.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase3.value
  }

  async getDataMonthlyStrategyPhase2() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase2);
      this.monthlyStrategyPhase2.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase2.value
  }

  async getDataDailyStrategyPhase2() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase2);
      console.log(unitsMap,this.staticTable.dailyStrategyPhase2)
      this.dailyStrategyPhase2.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase2.value
  }

  async getDataMonthlyStrategyPhase1() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase1);
      this.monthlyStrategyPhase1.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase1.value
  }

  async getDataDailyStrategyPhase1() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase1);
      this.dailyStrategyPhase1.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase1.value
  }





  async getDataPremiumDailyStrategy() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPremium);
      this.dailyStrategyPremium.value = this.transformDailyStrategy(unitsMap)
      return this.dailyStrategyPremium.value
  }

  async getDataPremiumMonthlyStrategy() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPremium);
      this.monthlyStrategyPremium.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPremium.value
  }

  async getDataMonthlyStrategyPhase3Premium() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase3Premium);
      this.monthlyStrategyPhase3Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase3Premium.value
  }

  async getDataDailyStrategyPhase3Premium() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase3Premium);
      this.dailyStrategyPhase3Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase3Premium.value
  }

  async getDataMonthlyStrategyPhase2Premium() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase2Premium);
      this.monthlyStrategyPhase2Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase2Premium.value
  }

  async getDataDailyStrategyPhase2Premium() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase2Premium);
      console.log(unitsMap,this.staticTable.dailyStrategyPhase2Premium)
      this.dailyStrategyPhase2Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase2Premium.value
  }

  async getDataMonthlyStrategyPhase1Premium() {
      const unitsMap = await this.fetchData(this.staticTable.monthlyStrategyPhase1Premium);
      this.monthlyStrategyPhase1Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.monthlyStrategyPhase1Premium.value
  }

  async getDataDailyStrategyPhase1Premium() {
      const unitsMap = await this.fetchData(this.staticTable.dailyStrategyPhase1Premium);
      this.dailyStrategyPhase1Premium.value = this.transformMonthlyStrategy(unitsMap)
      return this.dailyStrategyPhase1Premium.value
  }

  // --- Simple in-memory cache helpers ---
  setCacheData(key, data, expiry = 5 * 60 * 1000) {
    this.cache.set(key, { data, timestamp: Date.now(), expiry });
  }

  getCacheData(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    return cached.data;
  }
}

export default new GoogleSheetsService();
