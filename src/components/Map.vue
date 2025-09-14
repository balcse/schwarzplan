<template>
    <div>
        <!-- <button @click="toggleBasemap">Vorschau</button> -->
        <div id="map"></div>
        <!-- {{ mapextent }} -->
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch, withDefaults, defineProps } from 'vue';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;

let map: maplibregl.Map | null = null;

const props = withDefaults(defineProps<{
    mapextent: { lat: number; lon: number; zoom: number },
    basemapVisible?: boolean
}>(), {
    basemapVisible: false
});

const mapextent = ref({ ...props.mapextent });

// const emit = defineEmits<{
//     (e: 'update:mapextent', payload: { lat: number; lon: number; zoom: number; }): void;
// }>();

// watch(mapextent, (newVal) => {
//     emit('update:mapextent', newVal);
// });

// Watch for prop changes from parent and update map view
watch(() => props.mapextent, (newVal) => {
    if (map && newVal) {
        map.jumpTo({ center: [newVal.lon, newVal.lat], zoom: newVal.zoom });
    }
});

function getMapExtent() {
    return mapextent.value;
}

defineExpose({
    getMapExtent
});

// Reactively update basemap visibility and map interaction when prop changes
watch(() => props.basemapVisible, (visible: boolean) => {
    if (!map) return;
    if (map.getLayer('osm-basemap')) {
        map.setLayoutProperty('osm-basemap', 'visibility', visible ? 'visible' : 'none');
        if (!visible) {
            map.boxZoom.disable();
            map.doubleClickZoom.disable();
            map.dragPan.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.scrollZoom.disable();
            map.touchZoomRotate.disable();
        } else {
            map.boxZoom.enable();
            map.doubleClickZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.keyboard.enable();
            map.scrollZoom.enable();
            map.touchZoomRotate.enable();
        }
    }
}, { immediate: true });


onMounted(() => {
    const style: any = {
        "version": 8,
        "name": "Custom OSM Basemap with Buildings",
        "metadata": {
            "maputnik:license": "https://github.com/maputnik/osm-liberty/blob/gh-pages/LICENSE.md",
            "maputnik:renderer": "mbgljs",
            "openmaptiles:version": "3.x"
        },
        "sources": {
            "osm": {
                "type": "raster",
                "tiles": [
                    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ],
                "tileSize": 256,
                "attribution": "© OpenStreetMap contributors"
            },
            "openmaptiles": {
                "type": "vector",
                "url": `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${maptilerKey}`
            }
        },
        "sprite": "https://maputnik.github.io/osm-liberty/sprites/osm-liberty",
        "glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
        "layers": [
            {
                "id": "osm-basemap",
                "type": "raster",
                "source": "osm",
                "minzoom": 0,
                "maxzoom": 22,
                "layout": {
                    "visibility": props.basemapVisible ? "visible" : "none"
                }
            }
        ],
        "id": "osm-liberty"
    };


    map = new maplibregl.Map({
        container: 'map',
        style,
        center: [props.mapextent.lon, props.mapextent.lat],
        zoom: props.mapextent.zoom
    });

    if (map != null) {
        map.on('load', () => {
            map!.addLayer({
                "id": "building",
                "type": "fill",
                "source": "openmaptiles",
                "source-layer": "building",
                "minzoom": 11,
                "maxzoom": 20,
                "layout": { "visibility": "visible" },
                "paint": {
                    "fill-color": "rgba(0, 0, 0, 1)",
                    "fill-outline-color": "rgba(0, 0, 0, 1)",
                    "fill-translate-anchor": "map"
                }
            });
            // Set initial basemap visibility and interaction lock
            if (typeof props.basemapVisible === 'boolean' && map!.getLayer('osm-basemap')) {
                map!.setLayoutProperty('osm-basemap', 'visibility', props.basemapVisible ? 'visible' : 'none');
                if (!props.basemapVisible) {
                    map!.boxZoom.disable();
                    map!.doubleClickZoom.disable();
                    map!.dragPan.disable();
                    map!.dragRotate.disable();
                    map!.keyboard.disable();
                    map!.scrollZoom.disable();
                    map!.touchZoomRotate.disable();
                } else {
                    map!.boxZoom.enable();
                    map!.doubleClickZoom.enable();
                    map!.dragPan.enable();
                    map!.dragRotate.enable();
                    map!.keyboard.enable();
                    map!.scrollZoom.enable();
                    map!.touchZoomRotate.enable();
                }
            }
            updateMapExtent();
            map!.on('moveend', updateMapExtent);
        });
    }


    // map.addControl(new maplibregl.NavigationControl(), 'top-right');

    function updateMapExtent() {
        if (!map) return;
        const center = map.getCenter();
        const zoom = map.getZoom();
        mapextent.value = {
            lat: center.lat,
            lon: center.lng,
            zoom: zoom
        };
    }
});

</script>

<style scoped>
#map {
    width: 100%;
    min-height: 350px;
    aspect-ratio: 1 / 1;
    min-width: 0;
    box-sizing: border-box;
}
</style>
