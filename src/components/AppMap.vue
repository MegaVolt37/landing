<template>
  <div class="map-wrapper">
    <!-- Карта -->
    <GMapMap ref="mapRef" :center="center" :zoom="16" map-type-id="terrain" style="width: 100%; height: 100%"
      :options="mapOptions" @tilesloaded="onMapReady">
      <GMapMarker ref="markerMap" class="marker" v-for="marker in [...places, centerMarker]" :key="marker.id"
        :position="marker.position" :icon="getIcon(marker)" @click="clickMarker()"
        :label="marker.id === activeMarkerId ? marker.travelTime : ''">
        <!-- тултип через OverlayView -->
        <!-- <div ref="tooltipEl" class="custom-tooltip">
          <div class="tooltip-content">
            <p class="title">{{ marker.id }}</p>
            <p class="distance">{{ marker.distance }}</p>
            <p class="time">{{ marker.travelTime }}</p>
          </div>
        </div> -->
        <!-- <AppMapTooltip /> -->
      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script setup lang="ts">
/// <reference types="@types/google.maps" />
import { ref, computed, watch, reactive, onMounted, onBeforeUnmount, createApp, nextTick } from "vue"
import logoMap from "@/assets/images/logo-map.svg"
import pinMap from "@/assets/images/pin-map.svg"
import pinMapActive from "@/assets/images/logo-map.svg"
import iconBeach from "@/assets/images/maps/iconBeach.svg"
import iconEat from "@/assets/images/maps/iconEat.svg"
import iconMall from "@/assets/images/maps/iconMall.svg"
import iconPlus from "@/assets/images/maps/iconPlus.svg"
import iconSchool from "@/assets/images/maps/iconSchool.svg"
import logoMapComponent from "@/components/icons/IconLogoMap.vue"
import type { IFilterMap } from "@/utils/types"
import AppMapTooltip from './AppMapTooltip.vue'

interface IProps {
  filters: IFilterMap[],
  places: IMarker[],
  activeFilter: string | null,
  centerMarker?: IMarker,
  changeActiveFilter: (id: string) => void
}

interface IMarker {
  id: string,
  type: string | any,
  position: { lat: number, lng: number },
  icon: any,
  travelTime?: string | null,
  distance?: string | null,
  default?: boolean
}

const props = defineProps<IProps>()

const center = { lat: -8.701024719020094, lng: 115.25534786657671 } // Bali центр

const sandMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      { visibility: "simplified" },
      { color: "#a68b61" } // песочный цвет иконок
    ]
  }
]
// Стили карты
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: sandMapStyle
}

const mapRef = ref()
const markerMap = ref()
// Активный маркер
const activeMarkerId = ref<string | null>(null)
const isMapLoaded = ref(false)
const travelMode = ref<google.maps.TravelMode>("DRIVING" as google.maps.TravelMode);
const overlay = ref<google.maps.OverlayView | null>(null)
const overlays = reactive<Record<string, google.maps.OverlayView>>({})
// Маркеры

const centerMarker: IMarker = {
  id: "",
  type: "walk",
  position: { lat: -8.701024719020094, lng: 115.25534786657671 },
  icon: logoMap,
  default: true
}

const markers = reactive<IMarker[]>([
  {
    id: "Icon Bali mall",
    type: "walk",
    position: { lat: -8.687158851117989, lng: 115.26289747116502 },
    icon: iconMall,
  },
  {
    id: "Sanur beach",
    type: "shuttle",
    position: { lat: -8.629908172675155, lng: 115.25391151808267 },
    icon: iconBeach,
  },
  {
    id: "Internacional hospital",
    type: "shuttle",
    position: { lat: -8.678973961113694, lng: 115.25917270000001 },
    icon: iconPlus,
  },
  {
    id: "Bali international school",
    type: "shuttle",
    position: { lat: -8.679252261164812, lng: 115.25698437116502 },
    icon: iconSchool,
  }
])

function changeFilter(id: string) {
  // activeMarkerId.value = activeMarkerId.value === id ? null : id
  props.changeActiveFilter(id)
}

const clickMarker = () => {
  // activeMarkerId.value = marker.id
  // console.log(markerMap.value)
}

// TODO: для динамических данных из гугла
// function getIcon(marker: any) {
//   const size = marker.default ? 48 : 28  // ширина в пикселях
//   const anchor = size / 2                        // центрирование по горизонтали

//   return {
//     url: marker.id === props.activeFilter ? pinMapActive : marker.icon,
//     scaledSize: { width: size, height: size },
//     anchor: { x: anchor, y: size }
//   }
// }

function getIcon(marker: IMarker) {
  const size = marker.default ? 48 : 28
  const anchor = size / 2

  // const isActive = props.activeFilter && marker.type === props.activeFilter

  // return {
  //   url: isActive ? pinMapActive : marker.icon,
  //   scaledSize: { width: size, height: size },
  //   anchor: { x: anchor, y: size }
  // }

  const isActive = props.activeFilter && marker.type === props.activeFilter

  return {
    url: marker.icon,
    scaledSize: { width: size, height: size },
    anchor: { x: anchor, y: size }
  }


}

function createOverlay(marker: IMarker) {
  if (!window.google || !window.google.maps) return
  const overlay = new window.google.maps.OverlayView()

  // overlay.onAdd = function () {
  //   const div = document.createElement("div")
  //     ; (this as any).div = div

  //   // Монтируем Vue-компонент в div
  //   const app = createApp(AppMapTooltip, { marker })
  //   app.mount(div)

  //   if (this instanceof google.maps.OverlayView) {
  //     this.getPanes().overlayLayer.appendChild(div)
  //   }
  //   // this.getPanes().overlayLayer.appendChild(div)
  // }
  overlay.onAdd = function () {
    const div = document.createElement("div");
    (this as any).div = div;

    // Монтируем Vue-компонент в div
    const app = createApp(AppMapTooltip, { marker });
    app.mount(div);

    const panes = this.getPanes();
    if (panes && panes.overlayLayer) {
      panes.overlayLayer.appendChild(div);
    }
  }

  overlay.draw = function () {
    const projection = this.getProjection()
    const pos = projection.fromLatLngToDivPixel(
      new window.google.maps.LatLng(marker.position)
    )
    const div = (this as any).div
    if (div) {
      div.style.left = pos ? pos.x + "px" : null
      div.style.top = pos ? pos.y + "px" : null
      div.style.position = "absolute"
      div.style.transform = "translate(14px, -100%)"
    }
  }

  overlay.onRemove = function () {
    const div = (this as any).div
    if (div) div.remove()
  }

  overlay.setMap(mapRef.value.$mapObject)
  overlays[marker.id] = overlay
}

watch(() => props.activeFilter, async () => {
  // await calculateDistances()
})

// пересчет расстояний из google api
async function calculateDistances() {
  if (!window.google || !window.google.maps || !props.activeFilter) return
  const modeMap: Record<string, google.maps.TravelMode> = {
    walk: window.google.maps.TravelMode.WALKING,
    car: window.google.maps.TravelMode.DRIVING,
    shuttle: window.google.maps.TravelMode.TRANSIT
  }
  travelMode.value = modeMap[props.activeFilter] || window.google.maps.TravelMode.DRIVING

  const service = new window.google.maps.DistanceMatrixService()

  const destinations = markers.map(m => m.position)

  service.getDistanceMatrix(
    {
      origins: [center],
      destinations,
      travelMode: travelMode.value,
    },
    (response, status) => {
      if (status !== "OK" || !response) return
      const results = response.rows[0].elements
      markers.forEach((m, i) => {
        m.travelTime = results[i].duration?.text || null
        m.distance = results[i].distance?.text || null
      })
    }
  )
}

const onMapReady = () => {
  if (!mapRef.value?.$mapObject) return

  if (!isMapLoaded.value) {
    // calculateDistances()
    props.places.forEach(marker => createOverlay(marker))
    isMapLoaded.value = true
  }
}

defineExpose(
  {
    markers
  }
)
</script>

<style scoped lang="scss">
.map-wrapper {
  height: 100%;
}

.vue-map-container {
  height: 100%;
}
</style>