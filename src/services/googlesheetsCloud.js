// services/googleSheetsService.js

class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = '1bN9iBmrNt5LLD_Hud_uIh7XQNgDGYizbNEpetr40L3U';
    this.apiKey = import.meta.env.VITE_VUE_APP_GOOGLE_SHEETS_API_KEY; // Получите в Google Console
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  /**
   * Получить данные из Google Sheets с кэшированием
   * @param {string} range - Диапазон ячеек (например, 'A1:Z100')
   * @returns {Promise<Array>} Данные из таблицы
   */
  async fetchData(range) {
    const cacheKey = `sheets_${range}`;
    
    // Проверяем кэш
    const cachedData = this.getCacheData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    try {
      const url = `${this.baseUrl}/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const values = data.values || [];
      
      // Кэшируем результат
      this.setCacheData(cacheKey, values);
      
      return values;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw error;
    }
  }

  /**
   * Парсер данных о коттеджах
   * @returns {Promise<Array>} Массив объектов с данными о коттеджах
   */
  async getUnitsData() {
    try {
      // Получаем данные о юнитах (строки 30-40)
      const unitsRange = 'A30:Z40';
      const unitsData = await this.fetchData(unitsRange);
      
      // Получаем данные о ценах по фазам (строки 15-25)  
      const pricesRange = 'A15:F25';
      const pricesData = await this.fetchData(pricesRange);
      
      // Получаем текущую фазу продаж (строка 27)
      const phaseRange = 'E27';
      const phaseData = await this.fetchData(phaseRange);
      const currentPhase = phaseData[0] ? parseInt(phaseData[0][0]) : 3;
      
      // Получаем курс валют
      const exchangeRates = await this.getExchangeRates();
      
      // Парсим данные о юнитах
      const units = [];
      
      for (let i = 0; i < unitsData.length; i++) {
        const row = unitsData[i];
        if (row && row[0] && row[0].toString().startsWith('Unit')) {
          const unitNumber = row[0];
          const available = row[1] === 'yes';
          const gba = this.parseNumber(row[2]);
          const landArea = this.parseNumber(row[3]);
          const poolSize = this.parseNumber(row[4]);
          const buildingFootprint = this.parseNumber(row[5]);
          const garden = this.parseNumber(row[6]);
          const basePrice = this.parseNumber(row[7]);
          const vat = this.parseNumber(row[8]);
          const finalPrice = this.parseNumber(row[9]);
          const priceUSD = this.parseNumber(row[10]);
          const typology = row[11] || '';
          
          // Получаем цены по фазам для этого юнита
          const unitIndex = parseInt(unitNumber.replace('Unit ', '')) - 1;
          const priceRow = pricesData[unitIndex + 1]; // +1 потому что первая строка - заголовки
          
          let actualPrice = finalPrice;
          if (priceRow && currentPhase < 3) {
            const discountPrice = currentPhase === 1 ? 
              this.parseNumber(priceRow[2]) : this.parseNumber(priceRow[4]);
            if (discountPrice) {
              // Пересчитываем финальную цену с НДС
              const discountWithVat = discountPrice + vat;
              actualPrice = discountWithVat;
            }
          }
          
          units.push({
            unit: unitNumber,
            available,
            gba,
            landArea,
            poolSize,
            buildingFootprint,
            garden,
            basePrice,
            vat,
            finalPrice: actualPrice,
            priceUSD: actualPrice * exchangeRates.idrUsd,
            typology,
            phase: currentPhase
          });
        }
      }
      
      return units.filter(unit => unit.available); // Возвращаем только доступные юниты
    } catch (error) {
      console.error('Error parsing units data:', error);
      throw error;
    }
  }

  /**
   * Безопасный парсер чисел
   * @param {any} value - Значение для парсинга
   * @returns {number} Числовое значение или 0
   */
  parseNumber(value) {
    if (value === null || value === undefined || value === '') return 0;
    const parsed = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Получить данные ROI для конкретного юнита
   * @param {string} unitNumber - Номер юнита (например, "Unit 1")
   * @param {string} strategy - Стратегия аренды ("daily" или "monthly")
   * @returns {Promise<Object>} Данные ROI
   */
  async getRoiData(unitNumber, strategy = 'daily') {
    try {
      const unitIndex = parseInt(unitNumber.replace('Unit ', ''));
      
      let range;
      if (strategy === 'daily') {
        // Daily rentals data (строки 54-64)
        range = `A${53 + unitIndex}:Z${53 + unitIndex}`;
      } else {
        // Monthly rentals data (строки 69-79)
        range = `A${68 + unitIndex}:Z${68 + unitIndex}`;
      }
      
      const data = await this.fetchData(range);
      const row = data[0];
      
      if (!row || row.length < 14) {
        throw new Error(`No ROI data found for ${unitNumber} with ${strategy} strategy`);
      }
      console.log(row)
      return {
        unit: row[0],
        strategy,
        adr: this.parseNumber(row[1]),
        occupancy: this.parseNumber(row[2]) / 100 || 0,
        monthlyProceedings: this.parseNumber(row[3]),
        marketingFee: this.parseNumber(row[4]) / 100 || 0,
        netProceedings: this.parseNumber(row[5]),
        managementCharge: this.parseNumber(row[6]) / 100 || 0,
        mcCharge: this.parseNumber(row[7]),
        investorProceedings: this.parseNumber(row[8]),
        investment: this.parseNumber(row[9]),
        monthlyRoi: this.parseNumber(row[10]) / 100 || 0,
        annualizedRoi: this.parseNumber(row[11]) / 100 || 0,
        monthlyUsd: this.parseNumber(row[12]),
        annualUsd: this.parseNumber(row[13]),
        paybackPeriod: this.parseNumber(row[25])
      };
    } catch (error) {
      console.error('Error fetching ROI data:', error);
      throw error;
    }
  }

  /**
   * Получить курс валют
   * @returns {Promise<Object>} Курсы валют
   */
  async getExchangeRates() {
    try {
      const range = 'C11';
      const data = await this.fetchData(range);
      const usdIdr = this.parseNumber(data[0] ? data[0][0] : 16400) || 16400;
      
      return {
        usdIdr,
        idrUsd: 1 / usdIdr
      };
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return { usdIdr: 16400, idrUsd: 1/16400 };
    }
  }

  /**
   * Получить информацию о текущей фазе продаж
   * @returns {Promise<Object>} Информация о фазе
   */
  async getSalesPhase() {
    try {
      const range = 'B27';
      const data = await this.fetchData(range);
      const phase = parseInt(data[0] ? data[0][0] : 3) || 3;
      
      const phaseInfo = {
        1: { name: 'Early Bird', discount: 9 },
        2: { name: 'During Construction', discount: 4 },
        3: { name: 'Base Price', discount: 0 }
      };
      
      return {
        current: phase,
        info: phaseInfo[phase] || phaseInfo[3]
      };
    } catch (error) {
      console.error('Error fetching sales phase:', error);
      return { current: 3, info: { name: 'Base Price', discount: 0 } };
    }
  }

  /**
   * Кэширование данных для оптимизации
   * @param {string} key - Ключ кэша
   * @param {any} data - Данные для кэширования
   * @param {number} expiry - Время жизни кэша в миллисекундах
   */
  setCacheData(key, data, expiry = 5 * 60 * 1000) {
    if (!this.cache) this.cache = new Map();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  /**
   * Получение данных из кэша
   * @param {string} key - Ключ кэша
   * @returns {any|null} Кэшированные данные или null
   */
  getCacheData(key) {
    if (!this.cache) return null;
    
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