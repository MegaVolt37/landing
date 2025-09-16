class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = '1bN9iBmrNt5LLD_Hud_uIh7XQNgDGYizbNEpetr40L3U';
    this.apiKey = import.meta.env.VITE_VUE_APP_GOOGLE_SHEETS_API_KEY; // Получите в Google Console
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  /**
   * Получить данные из Google Sheets
   * @param {string} range - Диапазон ячеек (например, 'Investor_ROI!A1:Z100')
   * @returns {Promise<Array>} Данные из таблицы
   */
  async fetchData(range) {
    try {
      const url = `${this.baseUrl}/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.values || [];
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
      const unitsRange = 'Investor_ROI!A30:AE40';
      const unitsData = await this.fetchData(unitsRange);
      
      // Получаем данные о ценах по фазам (строки 15-25)
      const pricesRange = 'Investor_ROI!A15:F25';
      const pricesData = await this.fetchData(pricesRange);
      
      // Получаем текущую фазу продаж (строка 27)
      const phaseRange = 'Investor_ROI!B27';
      const phaseData = await this.fetchData(phaseRange);
      const currentPhase = phaseData[0] ? parseInt(phaseData[0][0]) : 3;
      
      // Парсим данные о юнитах
      const units = [];
      
      for (let i = 0; i < unitsData.length; i++) {
        const row = unitsData[i];
        if (row[0] && row[0].startsWith('Unit')) {
          const unitNumber = row[0];
          const available = row[1] === 'yes';
          const gba = parseFloat(row[2]) || 0;
          const landArea = parseFloat(row[3]) || 0;
          const poolSize = parseFloat(row[4]) || 0;
          const buildingFootprint = parseFloat(row[5]) || 0;
          const garden = parseFloat(row[6]) || 0;
          const basePrice = parseFloat(row[7]) || 0;
          const vat = parseFloat(row[8]) || 0;
          const finalPrice = parseFloat(row[9]) || 0;
          const priceUSD = parseFloat(row[10]) || 0;
          const typology = row[11] || '';
          
          // Получаем цены по фазам для этого юнита
          const unitIndex = parseInt(unitNumber.replace('Unit ', '')) - 1;
          const priceRow = pricesData[unitIndex + 1]; // +1 потому что первая строка - заголовки
          
          let actualPrice = finalPrice;
          if (priceRow && currentPhase < 3) {
            const discountPrice = currentPhase === 1 ? 
              parseFloat(priceRow[2]) : parseFloat(priceRow[4]);
            if (discountPrice) {
              // Пересчитываем финальную цену с НДС
              actualPrice = discountPrice + vat;
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
            priceUSD: actualPrice / 16400, // курс из ячейки C11
            typology,
            phase: currentPhase
          });
        }
      }
      
      return units;
    } catch (error) {
      console.error('Error parsing units data:', error);
      throw error;
    }
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
        range = `Investor_ROI!A${53 + unitIndex}:O${53 + unitIndex}`;
      } else {
        // Monthly rentals data (строки 69-79)
        range = `Investor_ROI!A${68 + unitIndex}:O${68 + unitIndex}`;
      }
      
      const data = await this.fetchData(range);
      const row = data[0];
      console.log(row,range)
      
      if (!row) {
        throw new Error(`No ROI data found for ${unitNumber}`);
      }
      
      return {
        unit: row[0],
        strategy,
        adr: parseFloat(row[1]) || 0,
        occupancy: parseFloat(row[2]) / 100 || 0,
        monthlyProceedings: parseFloat(row[3]) || 0,
        marketingFee: parseFloat(row[4]) / 100 || 0,
        netProceedings: parseFloat(row[5]) || 0,
        managementCharge: parseFloat(row[6]) / 100 || 0,
        mcCharge: parseFloat(row[7]) || 0,
        investorProceedings: parseFloat(row[8]) || 0,
        investment: parseFloat(row[9]) || 0,
        monthlyRoi: parseFloat(row[10]) / 100 || 0,
        annualizedRoi: parseFloat(row[11]) / 100 || 0,
        monthlyUsd: parseFloat(row[12]) || 0,
        annualUsd: parseFloat(row[13]) || 0,
        paybackPeriod: parseFloat(row[14]) || 0
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
      const range = 'Investor_ROI!E11';
      const data = await this.fetchData(range);
      const usdIdr = parseFloat(data[0][0]) || 16400;
      console.log(usdIdr)
      
      return {
        usdIdr,
        idrUsd: 1 / usdIdr
      };
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return { usdIdr: 16400, idrUsd: 1/16400 };
    }
  }
}

export default new GoogleSheetsService();