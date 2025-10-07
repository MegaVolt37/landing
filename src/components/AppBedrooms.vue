<template>
  <div class="interactive-svg-container" @click="handleContainerClick">
    <svg ref="svgElement" width="694" height="423" viewBox="0 0 694 423" fill="none" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <mask id="mask0_894_171" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="694" height="423">
        <rect width="694" height="423" rx="15" fill="#D9D9D9" />
      </mask>
      <!-- <rect width="694" height="423" rx="15" fill="url(#pattern0_602_6)" /> -->

      <g mask="url(#mask0_894_171)">

        <!-- Интерактивные секции -->
        <path v-for="(section, index) in sections" :key="index"
          :ref="el => { sectionRefs[index] = el as SVGPathElement }" :d="section.path" :class="['interactive-section', {
            'hovered': hoveredSection === index,
            'selected': selectedSection === index
          }]" @mouseenter="showHoverTooltip(index)" @mouseleave="hideHoverTooltip"
          @click.stop="handleSectionClick(index)" />
      </g>

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
        </div>
        <div class="investment__item-bottom">
          <p class="investment__description">Premium Location</p>
          <!-- <UiButton class="investment__roi" variant="solid-yellow" shape="rounded" size="md">Annualised ROI:
            10.6%
          </UiButton> -->
          <span class="investment__price">{{ formatCurrency(selectedUnit) }}</span>
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
  selectedCurrency: string
  clearUnit: () => void
}

const props = defineProps<IProps>()

// Данные секций
const sections = reactive<Section[]>([
  {
    path: "M195 169.5L164.5 157V116L156.5 119.5L155.5 118.5L172.5 103.5L254 71.5L273.5 97.5L263 103.5V105.5L223 122.5L203.5 138.5L207.5 141L213.5 138.5V159.5L195 169.5Z",
    name: "section1",
    tooltip: "Unit 5"
  },
  {
    path: "M115.5 176.5L120 179L126.5 173.5H129L160.5 197V202L153.5 211.5V218.5L170.5 223.5L178.5 213.5L186 208L209.5 190.5L224 202L243 220L234.5 233L236 241H239L254.5 227.5L253 205.5L241.5 200.5V194.5L253 199V197L231.5 186.5L135 146L115.5 176.5Z",
    name: "section2",
    tooltip: "Unit 4"
  },
  {
    path: "M54 291L43.5 302.5L74.5 305L80 305.5L108.5 314L133 284.5V276.5L122 284.5L121 282V280L152 244.5V211L159 201.5V199L128 175H126L112.5 184.5L32.5 259.5L34.5 261.5L46 253.5L48.5 268.5L39.5 278.5V280L52 282L54 291Z",
    name: "section3",
    tooltip: "Unit 3"
  },
  {
    path: "M344 166.5L321 181.5V183L330.5 179L329 209.5L317 218L371.5 243L394 231L395.5 204.5L384.5 209.5V206.5L442 171.5L434.5 168.5V161.5L446 155L422.5 125L344 166.5Z",
    name: "section4",
    tooltip: "Unit 8"
  },
  {
    path: "M270 156V201.5L271 202.5L294 208.5L302 204.5L312.5 213.5L327.5 206.5L329 180.5L319.5 184.5V180.5L343 165.5L373.5 150V140.5L384 134L362 105.5L282 144L261 158.5L262.5 160L270 156Z",
    name: "section5",
    tooltip: "Unit 7"
  },
  {
    path: "M244.5 190L215 176.5V136L207.5 139.5L206 138L225 123L305.5 89L326 116L317 121V126L281 143L259.5 158.5L261.5 161.5L269 158.5L268 179.5L244.5 190Z",
    name: "section6",
    tooltip: "Unit 6"
  },
  {
    path: "M513.251 177.445L500.73 184.78L500.483 184.925V191.511L500.759 191.648L509.761 196.168L458.396 231.089L458.178 231.237V236.648L458.892 236.312L467.398 232.291V235.598L430.41 261.434L394.656 246.967L397.347 203.214L397.402 202.306L396.605 202.745L386.5 208.326V206.192L488.927 146.649L513.251 177.445Z",
    name: "section7",
    tooltip: "Unit 9"
  },
  {
    path: "M510 293L459 272.5H458.5L467 267.5L468.5 231L459 235V232.5L533 182.5L561 169.5L587 202L575 212.5V217L582 220L543 249.5V253.5L554.5 259L510 293Z",
    name: "section8",
    tooltip: "Unit 10"
  },
  {
    path: "M619.5 330.5L549.5 304V278L558.5 272V257L546 250L612 200.5H630L673.5 221L657.5 234V250L677.5 259.5L661.5 274.5V283L669 288L661.5 318.5L653 325L641 327.5L619.5 330.5Z",
    name: "section9",
    tooltip: "Unit 11"
  },

  {
    path: "M139 324.5L179 336.5L212 293V290L233.5 260.5V232.5L243 219.5L209.5 190.5L179 213.5L121.5 281L122.5 283L134 275L135 289L125.5 302.5L137.5 305L139 324.5Z",
    name: "section9",
    tooltip: "Unit 2"
  },
  {
    path: "M234 327V348L278 358L302.75 314.75L327.5 271.5V245.5L333.5 234L301.5 205L285.5 215.25L269.5 225.5L218.5 300.5L219.5 302L231 295V298L215 321L234 327Z",
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

const formatCurrency = (price: any) => {
  const value = props.selectedCurrency === 'usd' ? price.price_usd : price.price_idr
  const amount = value == null ? 0 : Number(value)
  if (Number.isNaN(amount)) return '—'

  if (props.selectedCurrency === 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  } else {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
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