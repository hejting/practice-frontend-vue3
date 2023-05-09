import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import countries from './custom.geo.json'
// import lines from '../files/lines.json'
// import map from '../files/map.json'

let renderer, camera, scene, controls

let mouseX = 0
let mouseY = 0
let windowHalfX
let windowHalfY
let element
let idName

let Globe

// const xhr = new XMLHttpRequest()
// xhr.open('GET', 'http://127.0.0.1:3000/city')
// xhr.send()
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const data = JSON.parse(xhr.responseText)
//     console.log(data)
//     const map = data.data.map
//     const lines = data.data.lines
//     initGlobe(map, lines)
//   }
// }

function getData() {
  const ws = new WebSocket('ws://124.223.56.245:3000/city-ws')
  ws.onmessage = function (evt) {
    const data = JSON.parse(evt.data)
    console.log(data)
    const map = data.data.map
    const lines = data.data.lines
    setMapAndLine(map, lines)
  }
}

export default function globe(id) {
  idName = id
  element = document.getElementById(idName)
  getData()
  init()
  initGlobe()
  onWindowResize()
  animate()
}

function init() {
  windowHalfX = (element.clientWidth - 1) / 2
  windowHalfY = (element.clientHeight - 1) / 2
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(element.devicePixelRatio)
  renderer.setSize(element.clientWidth - 1, element.clientHeight - 1)
  element.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3)
  scene.add(ambientLight)
  scene.background = new THREE.Color(0x040d21)

  camera = new THREE.PerspectiveCamera()
  camera.aspect = (element.clientWidth - 1) / (element.clientHeight - 1)
  camera.updateProjectionMatrix()

  const dLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dLight.position.set(-800, 2000, 400)
  camera.add(dLight)

  const dLight1 = new THREE.DirectionalLight(0x7982f6, 1)
  dLight1.position.set(-200, 500, 200)
  camera.add(dLight1)

  const dLight2 = new THREE.PointLight(0x8566cc, 0.5)
  dLight2.position.set(-200, 500, 200)
  camera.add(dLight2)

  camera.position.z = 400
  camera.position.x = 0
  camera.position.y = 0

  scene.add(camera)

  scene.fog = new THREE.Fog(0x535ef3, 400, 2000)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dynamicDampingFactor = 0.01
  controls.enablePan = false
  controls.minDistance = 200
  controls.maxDistance = 500
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = false

  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(event) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

function onWindowResize() {
  element = document.getElementById(idName)
  camera.aspect = (element.clientWidth - 1) / (element.clientHeight - 1)
  camera.updateProjectionMatrix()
  windowHalfX = (element.clientWidth - 1) / 1.5
  windowHalfY = (element.clientHeight - 1) / 1.5
  renderer.setSize(element.clientWidth - 1, element.clientHeight - 1)
}

function initGlobe() {
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true
  })

    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.25)

  Globe.rotateY(-Math.PI * (5 / 9))
  Globe.rotateZ(-Math.PI / 6)
  const globeMaterial = Globe.globeMaterial()
  globeMaterial.color = new THREE.Color(0x3a228a)
  globeMaterial.emissive = new THREE.Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7

  scene.add(Globe)
}

function setMapAndLine(map, lines) {
  if (!Globe) return
  Globe.arcsData(lines)
    .arcColor(e => {
      return e.status ? '#9cff00' : '#ff4000'
    })
    .arcAltitude(e => {
      return e.arcAlt
    })
    .arcStroke(e => {
      return e.status ? 0.5 : 0.3
    })
    .arcDashLength(0.6)
    .arcDashGap(5)
    .arcDashAnimateTime(1000)
    .arcsTransitionDuration(1000)
    .arcDashInitialGap(e => e.order * 1)
    .labelsData(map)
    .labelColor(() => '#ffcb21')

    .labelDotRadius(0.3)
    .labelSize(e => e.size)
    .labelText('city')
    .labelResolution(6)
    .labelAltitude(0.01)
    .pointsData(map)
    .pointColor(() => '#ffffff')
    .pointsMerge(true)
    .pointAltitude(0.07)
    .pointRadius(0.05)
}

function animate() {
  camera.position.x +=
    Math.abs(mouseX) <= windowHalfX / 2
      ? (mouseX / 2 - camera.position.x) * 0.005
      : 0
  camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005
  camera.lookAt(scene.position)
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
