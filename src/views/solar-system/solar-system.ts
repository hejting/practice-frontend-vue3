import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import starsTexture from '@/assets/img/solar-system/stars.jpg'
import starsTexture from '@/assets/img/solar-system/stars.jpg'
import sunTexture from '@/assets/img/solar-system/sun.jpg'
import mercuryTexture from '@/assets/img/solar-system/mercury.jpg'
import saturnTexture from '@/assets/img/solar-system/saturn.jpg'
import saturnRingTexture from '@/assets/img/solar-system/saturn-ring.png'
import venusTexture from '@/assets/img/solar-system/venus.jpg'
import earthTexture from '@/assets/img/solar-system/earth.jpg';
import marsTexture from '@/assets/img/solar-system/mars.jpg';
import jupiterTexture from '@/assets/img/solar-system/jupiter.jpg';
import uranusTexture from '@/assets/img/solar-system/uranus.jpg';
import uranusRingTexture from '@/assets/img/solar-system/uranus-ring.png';
import neptuneTexture from '@/assets/img/solar-system/neptune.jpg';
import plutoTexture from '@/assets/img/solar-system/pluto.jpg';

let renderer: THREE.WebGLRenderer
let orbit: OrbitControls
let scene: THREE.Scene
const textureLoader = new THREE.TextureLoader()
let camera: THREE.PerspectiveCamera
let sun: THREE.Mesh
let mercury: IPlanet, saturn: IPlanet, uranus: IPlanet, venus: IPlanet, earth: IPlanet, mars: IPlanet, jupiter: IPlanet, neptune: IPlanet, pluto: IPlanet

export function init(el: HTMLElement, width: number, height: number) {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height, false)
  el.appendChild(renderer.domElement)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(-90, 140, 140)

  orbit = new OrbitControls(camera, renderer.domElement)
  orbit.update()
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture])

  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)
  const pointLight = new THREE.PointLight(0xffffff, 2, 300)
  scene.add(pointLight)
}


export function addCelestialBody() {
  // sun
  const sunGeo = new THREE.SphereGeometry(16, 30, 30)
  const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
  })
  sun = new THREE.Mesh(sunGeo, sunMat)
  scene.add(sun)
  mercury = createPlanet(3.2, mercuryTexture, 28)
  saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
  })
  uranus = createPlanet(10, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
  })
  venus = createPlanet(5.8, venusTexture, 44)
  earth = createPlanet(6, earthTexture, 62)
  mars = createPlanet(7, marsTexture, 78)
  jupiter = createPlanet(12, jupiterTexture, 100)
  neptune = createPlanet(7, neptuneTexture, 200)
  pluto = createPlanet(2.8, plutoTexture, 216)
  renderer.setAnimationLoop(animate)
}




interface IRing {
  innerRadius: number,
  outerRadius: number,
  texture: string
}

interface IPlanet {
  mesh: THREE.Mesh,
  obj: THREE.Object3D
}

function createPlanet(size: number, texture: string, position: number, ring?: IRing) {
  const geo = new THREE.SphereGeometry(size, 30, 30)
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  })
  const mesh = new THREE.Mesh(geo, mat)
  const obj = new THREE.Object3D()
  obj.add(mesh)

  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = -0.5 * Math.PI
  }

  scene.add(obj)
  mesh.position.x = position
  return { mesh, obj }
}

function animate() {
  sun.rotateY(0.004)
  mercury.mesh.rotateY(0.004)
  saturn.mesh.rotateY(0.038)
  venus.mesh.rotateY(0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)
  pluto.mesh.rotateY(0.008)

  mercury.obj.rotateY(0.04)
  saturn.obj.rotateY(0.0009)
  venus.obj.rotateY(0.015)
  earth.obj.rotateY(0.01)
  mars.obj.rotateY(0.008)
  jupiter.obj.rotateY(0.002)
  uranus.obj.rotateY(0.0004)
  neptune.obj.rotateY(0.0001)
  pluto.obj.rotateY(0.00007)
  renderer.render(scene, camera)
}

export function onWindowResize(width: number, height: number) {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}
