<script setup>
import {
  Cartesian3,
  Color,
  Math as CMath,
  Cartesian2,
  //   PolylineCollection,
} from "cesium";
import { onMounted } from "vue";
import { useViewStore } from "../../stores/earth";
import line_data from "../../assets/data/line.json";
const viewerStore = useViewStore();
function computeCircle(radius) {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = CMath.toRadians(i);
    positions.push(
      new Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians))
    );
  }
  return positions;
}

onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  //   console.log(line_data.features[0].geometry.coordinates.flat[0][1]);
  //   const lineArr = line_data.features[0].geometry.coordinates.reduce(
  //     (pre, cur) => {
  //       return pre.concat(cur);
  //     },
  //     []
  //   );
  //   const polylines = new PolylineCollection();
  line_data.features.map((v, i) => {
    const lineArr = v.geometry.coordinates.reduce((pre, cur) => {
      return pre.concat(cur);
    }, []);
    viewer.entities.add({
      id: `polyline${i}`,
      polylineVolume: {
        positions: Cartesian3.fromDegreesArray(lineArr),
        shape: computeCircle(50.0),
        material: Color.PALETURQUOISE,
      },
    });
  });

  //   viewer.entities.add(polylines);
});
</script>
<template><div></div></template>
<style scoped></style>
