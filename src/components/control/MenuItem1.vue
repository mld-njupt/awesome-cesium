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
    // viewer.entities.add({
    //   id: `polyline${i}`,
    //   polylineVolume: {
    //     positions: Cartesian3.fromDegreesArray(lineArr),
    //     shape: computeCircle(50.0),
    //     material: Color.PALETURQUOISE,
    //   },
    // });
    viewer.entities.add({
      id: `polyline${i}`,
      polyline: {
        // 鼠标移动绘制
        // positions: new CallbackProperty(function () {
        //     return positions
        // }, false),
        positions: Cartesian3.fromDegreesArray(lineArr),
        show: true,
        material: Color.GREEN,
        // depthFailMaterial: new PolylineOutlineMaterialProperty({
        //   // 折线低于地形时用于绘制折线的材料
        //   color: Color.RED,
        // }),
        width: 10,
        clampToGround: true,
        eyeOffset: new Cartesian3(0, 0, -100),
        // heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    });
  });

  //   viewer.entities.add(polylines);
});
</script>
<template><div></div></template>
<style scoped></style>
