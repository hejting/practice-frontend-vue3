<template>
  <div class="baidu-map" ref="baiduMapRef"></div>
</template>

<script setup>
import BMap from 'BMap'
import { onMounted, ref } from 'vue'

const baiduMapRef = ref()

onMounted(() => {
  initMap()
})

function initMap () {
  const map = new BMap.Map(baiduMapRef.value)
  map.enableScrollWheelZoom(true)
  map.addControl(new BMap.NavigationControl)
  map.addControl(new BMap.ScaleControl)
  map.addControl(new BMap.MapTypeControl)

  var myGeo = new BMap.Geocoder()

  const address = '上海市杨浦区同和国际大厦A座'
  myGeo.getPoint(address, function (point) {
    if (point) {
      map.centerAndZoom(point, 16)
      const marker = new BMap.Marker(point)
      marker.addEventListener('click', function () {
        alert('您点击了标注')
      })
      map.addOverlay(marker)
    }
  },
    '上海市')
  const geoc = new BMap.Geocoder()
  map.addEventListener("click", function (e) {
    const pt = e.point
    geoc.getLocation(pt, function (rs) {
      var addComp = rs.addressComponents
      alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber)
    })
  })
}

</script>

<style scoped lang="scss">
.baidu-map {
  height: 100%;
  width: 100%;
}
</style>