// src/services/sheetsService.js

const SPREADSHEET_ID = '1bN9iBmrNt5LLD_Hud_uIh7XQNgDGYizbNEpetr40L3U'; // Ваш SPREADSHEET_ID
const API_KEY = 'AIzaSyBcmzO-a7SfgwjWEyqEpB2x03NGD71Yj2A'; // Вставьте сюда ваш API-ключ
const SHEET_RANGE = 'Investor_ROI!A2:S'; // Диапазон данных, который мы хотим получить

export async function fetchCottageData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Обработка ошибок HTTP (например, 403 Forbidden, 404 Not Found)
      const errorData = await response.json();
      throw new Error(`Ошибка HTTP: ${response.status} - ${errorData.error.message}`);
    }
    const data = await response.json();
    console.log('Данные из Google Sheets:', data.values);
    return data; // Передаем данные на обработку
    return processSheetData(data.values); // Передаем данные на обработку
  } catch (error) {
    console.error('Ошибка при получении данных из Google Sheets:', error);
    // Здесь можно реализовать пользовательское уведомление об ошибке
    return null;
  }
}

// Функция для обработки полученных данных и приведения их к удобному формату
function processSheetData(values) {
  if (!values || values.length === 0) {
    return [];
  }

  // Предполагаем следующую структуру столбцов из вашей таблицы:
  // A: Имя коттеджа (например, "Вилла А")
  // B: Площадь
  // C: Количество спален
  // D: Стоимость ($)
  // E: Ежемесячный доход (помесячно) ($)
  // F: Заполняемость (помесячно) (%)
  // G: Доход за ночь (посуточно) ($)
  // H: Заполняемость (посуточно) (%)
  // I: Годовые эксплуатационные расходы ($)

  return values.map(row => ({
    name: row[0] || 'N/A',
    area: parseFloat(row[1]) || 0,
    bedrooms: parseInt(row[2]) || 0,
    cost: parseFloat(row[3]) || 0,
    monthly_rental_income: parseFloat(row[4]) || 0,
    monthly_occupancy: parseFloat(row[5]) / 100 || 0, // Переводим проценты в десятичную дробь
    daily_rental_income: parseFloat(row[6]) || 0,
    daily_occupancy: parseFloat(row[7]) / 100 || 0, // Переводим проценты в десятичную дробь
    annual_operating_costs: parseFloat(row[8]) || 0,
  }));
}
