<template>
  <div class="interactive-svg-container" @click="handleContainerClick">
    <svg ref="svgElement" width="694" height="587" viewBox="0 0 694 587" fill="none" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="694" height="587" rx="15" fill="url(#pattern0_602_6)" />

      <!-- Интерактивные секции -->
      <path v-for="(section, index) in sections" :key="index" :ref="el => { sectionRefs[index] = el as SVGPathElement }"
        :d="section.path" :class="['interactive-section', {
          'hovered': hoveredSection === index,
          'selected': selectedSection === index
        }]" @mouseenter="showHoverTooltip(index)" @mouseleave="hideHoverTooltip"
        @click.stop="handleSectionClick(index)" />

      <defs>
        <pattern id="pattern0_602_6" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_602_6" transform="matrix(0.000783168 0 0 0.000925926 -0.251841 0)" />
        </pattern>
      </defs>
    </svg>

    <!-- Тултип -->
    <div v-if="isTooltipVisible && currentTooltip" ref="tooltipElement" class="tooltip" :style="tooltipStyle">
      <div class="investment__item" v-if="selectedUnit">
        <div class="investment__item-top">
          <span class="investment__item-name">{{ selectedUnit.id }} - {{ getUnitBr(selectedUnit) }}</span>
        </div>
        <div class="investment__item-middle">
          <p class="investment__description">{{ selectedUnit.land_area_m2 }}m²</p>
          <p class="investment__description">Premium Location</p>
        </div>
        <div class="investment__item-bottom">
          <UiButton class="investment__roi" variant="solid-yellow" shape="rounded" size="md">Annualised ROI:
            10.6%
          </UiButton>
          <span class="investment__price">{{ formatCurrency(selectedUnit.price_usd) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue'

interface Section {
  path: string
  name: string
  tooltip: string
}

interface Unit {
  id: string;
  available: boolean;
  gba_m2: number;
  land_area_m2: number;
  pool_size_m2: number;
  building_footprint_m2: number;
  garden_m2: number;
  price_idr: number;
  vat_idr: number;
  final_price_idr: number;
  price_usd: number;
  typology: "2Br" | "3Br basic" | "3Br premium" | "4Br";
}

// Тип для значений typology
type TypologyType = Unit['typology'];

// Тип для извлечения BR части
type BrType = "2Br" | "3Br" | "4Br";

// Тип для извлечения finish части
type FinishType = "basic" | "premium" | ""; // пустая строка для "2Br" и "4Br"

interface IProps {
  units: Unit[]
  selectedUnit: string | null
  clearUnit: () => void
}

const props = defineProps<IProps>()

// Данные секций
const sections = reactive<Section[]>([
  {
    path: "M195 210.5L164.5 198V157L156.5 160.5L155.5 159.5L172.5 144.5L254 112.5L273.5 138.5L263 144.5V146.5L223 163.5L203.5 179.5L207.5 182L213.5 179.5V200.5L195 210.5Z",
    name: "section1",
    tooltip: "Unit 5"
  },
  {
    path: "M115.5 217.5L120 220L126.5 214.5H129L160.5 238V243L153.5 252.5V259.5L170.5 264.5L178.5 254.5L186 249L209.5 231.5L224 243L243 261L234.5 274L236 282H239L254.5 268.5L253 246.5L241.5 241.5V235.5L253 240V238L231.5 227.5L135 187L115.5 217.5Z",
    name: "section2",
    tooltip: "Unit 4"
  },
  {
    path: "M54 332L43.5 343.5L74.5 346L80 346.5L108.5 355L133 325.5V317.5L122 325.5L121 323V321L152 285.5V252L159 242.5V240L128 216H126L112.5 225.5L32.5 300.5L34.5 302.5L46 294.5L48.5 309.5L39.5 319.5V321L52 323L54 332Z",
    name: "section3",
    tooltip: "Unit 3"
  },
  {
    path: "M344 207.5L321 222.5V224L330.5 220L329 250.5L317 259L371.5 284L394 272L395.5 245.5L384.5 250.5V247.5L442 212.5L434.5 209.5V202.5L446 196L422.5 166L344 207.5Z",
    name: "section4",
    tooltip: "Unit 8"
  },
  {
    path: "M270 197V242.5L271 243.5L294 249.5L302 245.5L312.5 254.5L327.5 247.5L329 221.5L319.5 225.5V221.5L343 206.5L373.5 191V181.5L384 175L362 146.5L282 185L261 199.5L262.5 201L270 197Z",
    name: "section5",
    tooltip: "Unit 7"
  },
  {
    path: "M244.5 231L215 217.5V177L207.5 180.5L206 179L225 164L305.5 130L326 157L317 162V167L281 184L259.5 199.5L261.5 202.5L269 199.5L268 220.5L244.5 231Z",
    name: "section6",
    tooltip: "Unit 6"
  },
  {
    path: "M513.251 218.445L500.73 225.78L500.483 225.925V232.511L500.759 232.648L509.761 237.168L458.396 272.089L458.178 272.237V277.648L458.892 277.312L467.398 273.291V276.598L430.41 302.434L394.656 287.967L397.347 244.214L397.402 243.306L396.605 243.745L386.5 249.326V247.192L488.927 187.649L513.251 218.445Z",
    name: "section7",
    tooltip: "Unit 9"
  },
  {
    path: "M510 334L459 313.5H458.5L467 308.5L468.5 272L459 276V273.5L533 223.5L561 210.5L587 243L575 253.5V258L582 261L543 290.5V294.5L554.5 300L510 334Z",
    name: "section8",
    tooltip: "Unit 10"
  },
  {
    path: "M619.5 371.5L549.5 345V319L558.5 313V298L546 291L612 241.5H630L673.5 262L657.5 275V291L677.5 300.5L661.5 315.5V324L669 329L661.5 359.5L653 366L641 368.5L619.5 371.5Z",
    name: "section9",
    tooltip: "Unit 11"
  },

  {
    path: "M139 365.5L179 377.5L212 334V331L233.5 301.5V273.5L243 260.5L209.5 231.5L179 254.5L121.5 322L122.5 324L134 316L135 330L125.5 343.5L137.5 346L139 365.5Z",
    name: "section9",
    tooltip: "Unit 2"
  },
  {
    path: "M234 368V389L278 399L302.75 355.75L327.5 312.5V286.5L333.5 275L301.5 246L285.5 256.25L269.5 266.5L218.5 341.5L219.5 343L231 336V339L215 362L234 368Z",
    name: "section9",
    tooltip: "Unit 1"
  }
])

const svgElement = ref<SVGSVGElement>()
const tooltipElement = ref<HTMLElement>()
const sectionRefs = ref<SVGPathElement[]>([])
const hoveredSection = ref<number | null>(null)
const selectedSection = ref<number | null>(null)
const currentTooltip = ref('')
const tooltipPosition = reactive({ x: 0, y: 0 })

// Вычисляем центр фигуры для позиционирования тултипа
const getPathCenter = (pathElement: SVGPathElement) => {
  const bbox = pathElement.getBBox()
  return {
    x: bbox.x + bbox.width / 2,
    y: bbox.y + bbox.height / 2
  }
}

const getUnitBr = (unit: any) => {
  const unitBr = unit.typology.split(' ')[0]
  return unitBr
}

const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Конвертируем координаты SVG в координаты экрана
const svgPointToScreen = (svgX: number, svgY: number) => {
  if (!svgElement.value) return { x: 0, y: 0 }

  const pt = svgElement.value.createSVGPoint()
  pt.x = svgX
  pt.y = svgY
  const ctm = svgElement.value.getScreenCTM();
  if (!ctm) return;
  const screenPt = pt.matrixTransform(ctm);

  return {
    x: screenPt.x,
    y: screenPt.y
  }
}

const selectedUnit = computed(() => {
  return props.units.find((unit) => unit.id === currentTooltip.value)
})

// Вычисляемое свойство для позиционирования тултипа
const tooltipStyle = computed(() => {
  if (!tooltipElement.value || !svgElement.value) {
    return { left: '0px', top: '0px' }
  }

  const svgRect = svgElement.value.getBoundingClientRect()
  const tooltipRect = tooltipElement.value.getBoundingClientRect()

  let x = tooltipPosition.x
  let y = tooltipPosition.y

  // Правая граница
  if (x + tooltipRect.width / 2 > svgRect.right) {
    x = svgRect.right - tooltipRect.width / 2 - 10
  }

  // Левая граница
  if (x - tooltipRect.width / 2 < svgRect.left) {
    x = svgRect.left + tooltipRect.width / 2 + 10
  }

  // Проверка выхода за нижнюю границу
  if (y + tooltipRect.height > svgRect.bottom) {
    y = svgRect.bottom - tooltipRect.height - 10
  }

  // Проверка выхода за верхнюю границу
  if (y < svgRect.top) {
    y = svgRect.top + 10
  }

  return {
    left: `${x}px`,
    top: `${y}px`
  }
})

// Видимость тултипа
const isTooltipVisible = computed(() => {
  return selectedSection.value !== null || hoveredSection.value !== null
})

// Проверка, является ли элемент домом (интерактивной секцией)
const isHouseElement = (element: HTMLElement): boolean => {
  // Проверяем, является ли элемент path с классом interactive-section
  if (element.tagName === 'path' && element.classList.contains('interactive-section')) {
    return true
  }

  // Проверяем, находится ли элемент внутри SVG
  const svgElement = element.closest('svg')
  if (!svgElement) return false

  // Проверяем, является ли элемент частью интерактивной секции
  const pathElement = element.closest('path.interactive-section')
  return pathElement !== null
}

// Показать тултип при наведении
const showHoverTooltip = async (index: number) => {
  // Не показывать тултип при наведении, если уже есть выбранная секция
  if (selectedSection.value !== null) return

  hoveredSection.value = index
  currentTooltip.value = sections[index].tooltip
  await updateTooltipPosition(index)
}

// Скрыть тултип при уходе мыши
const hideHoverTooltip = () => {
  // Не скрывать тултип, если есть выбранная секция
  if (selectedSection.value !== null) return

  hoveredSection.value = null
  currentTooltip.value = ''
}

const selectDefault = () => {
  sections.forEach((section, index) => {
    if (section.tooltip === props.selectedUnit) {
      console.log(index)
      selectedSection.value = index
      hoveredSection.value = index
      currentTooltip.value = props.selectedUnit
      console.log(props.selectedUnit, currentTooltip.value)
      nextTick(() => updateTooltipPosition(index))
      // showHoverTooltip(index)
    }
  })
}

// Обработчик клика по секции
const handleSectionClick = async (index: number) => {
  props.clearUnit()
  // Если кликаем на уже выбранную секцию - снимаем выделение
  if (selectedSection.value === index) {
    selectedSection.value = null
    hoveredSection.value = null
    currentTooltip.value = ''
  } else {
    // Выбираем новую секцию
    selectedSection.value = index
    hoveredSection.value = index
    currentTooltip.value = sections[index].tooltip
    await updateTooltipPosition(index)
  }

  console.log(`Выбрана секция: ${sections[index].name} - ${sections[index].tooltip}`)
}

// Обработчик клика по контейнеру (для сброса при клике вне домов)
const handleContainerClick = (event: MouseEvent) => {
  props.clearUnit()
  const target = event.target as HTMLElement

  // Проверяем, был ли клик по дому (интерактивной секции)
  const isHouseClick = isHouseElement(target)

  // Проверяем, был ли клик по тултипу
  const isTooltipClick = target.closest('.tooltip') !== null ||
    target.closest('.investment__item') !== null

  console.log(isTooltipClick, target.closest('.investment__item'))
  // Если клик был не по дому и не по тултипу - сбрасываем выделение
  if (!isHouseClick && !isTooltipClick) {
    selectedSection.value = null
    hoveredSection.value = null
    currentTooltip.value = ''
    console.log('Сброс выделения - клик вне домов')
  }
}

// Обновление позиции тултипа
const updateTooltipPosition = async (index: number) => {
  await nextTick()

  const pathElement = sectionRefs.value[index]
  if (pathElement && svgElement.value) {
    const center = getPathCenter(pathElement)
    const screenCoords = svgPointToScreen(center.x, center.y)

    if (screenCoords) {
      // Позиционируем тултип над центром фигуры
      tooltipPosition.x = screenCoords.x
      tooltipPosition.y = screenCoords.y + 50 // Смещаем немного выше центра
    }
  }
}

// Обработчик клика по документу для сброса при клике вне
const handleDocumentClick = (event: MouseEvent) => {
  props.clearUnit()
  const target = event.target as HTMLElement

  // Проверяем, был ли клик внутри нашего компонента
  const isInsideContainer = target.closest('.interactive-svg-container') !== null ||
    target.closest('.investment__item') !== null

  // Если клик был вне нашего компонента - сбрасываем выделение
  if (!isInsideContainer) {
    selectedSection.value = null
    hoveredSection.value = null
    currentTooltip.value = ''
    console.log('Сброс выделения - клик вне компонента')
  }
}

watch(() => props.selectedUnit, () => {
  selectDefault()
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    // При скролле обновляем позицию тултипа для выбранной секции
    if (selectedSection.value !== null) {
      updateTooltipPosition(selectedSection.value)
    }
  })

  window.addEventListener('resize', () => {
    // При ресайзе обновляем позицию тултипа для выбранной секции
    if (selectedSection.value !== null) {
      updateTooltipPosition(selectedSection.value)
    }
  })

  // Добавляем обработчик клика по документу для скрытия при клике вне компонента
  document.addEventListener('click', handleDocumentClick)
})
</script>

<style scoped lang="scss">
.investment {
  &__item {
    min-width: vw(200);
    background-color: $white;
    border-radius: vw(12);
    padding: vw(15);
    border: vw(1) solid $yellow-dark;

    @include mobile {
      border-radius: vmin(8);
      padding: vmin(14) vmin(10);
      border: vmin(1) solid $yellow-dark;
    }
  }

  &__item-top {
    display: flex;
    justify-content: space-between;
  }

  &__item-name {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(18);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $brown;

    @include mobile {
      font-size: vmin(16);
    }
  }

  &__item-tags {
    margin-right: vw(-12);
    margin-top: vw(-12);
    display: flex;
    flex-wrap: wrap;
    gap: vw(5);

    @include mobile {
      margin-right: 0;
      margin-top: vmin(-5);
      gap: vmin(5);
    }
  }

  &__button-tag {
    color: $black-light;

    @include mobile {
      text-transform: capitalize;
      letter-spacing: 0%;
      font-size: vmin(8);
      line-height: vmin(10);
    }
  }

  &__tag {}

  &__item-middle {
    margin-bottom: vw(20);
    margin-top: vw(5);
    // min-height: vw(75);

    @include mobile {
      margin-top: vmin(5);
      margin-bottom: vmin(15);
      // min-height: vmin(50);
    }
  }

  &__description {
    text-align: left;
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(12);
    line-height: vw(16);
    letter-spacing: 0px;
    color: $black-light;

    @include mobile {
      font-size: vmin(11);
      line-height: vmin(15);
    }
  }

  &__item-bottom {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: vw(20);
  }

  &__roi {
    width: fit-content;
    background-color: $yellow-middle;
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(9);
    line-height: vw(11);
    letter-spacing: 0%;
    text-align: center;

    @include mobile {
      font-size: vmin(8);
      line-height: vmin(10);
    }
  }

  &__price {
    min-width: vw(125);
    text-align: left;
    font-family: 'Vollkorn';
    font-weight: 400;
    font-size: vw(27);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-dark;

    @include mobile {
      font-size: vmin(24);
      min-width: vmin(115);
    }
  }
}

.interactive-svg-container {
  position: relative;
  display: inline-block;
}

.interactive-section {
  fill: #A98C47;
  fill-opacity: 0;
  stroke: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.interactive-section:hover {
  fill-opacity: 0.6;
  stroke: #A98C47;
  stroke-width: 2;
  filter: drop-shadow(0 0 2px rgba(169, 140, 71, 0.5));
}

.interactive-section.hovered {
  fill-opacity: 0.8;
}

.tooltip {
  // position: absolute;
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  animation: fadeIn 0.2s ease-out;
  transform: translateX(-50%);
  /* Центрируем тултип относительно точки */
}

.tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top-color: white;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>