import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader, ring, customLines, addLines } from './addMeshes'
import { PARAMS, pane, orbit } from './controls'
import { setTime } from './time'
import { resize } from './eventListeners'
import { loadTexture } from './loadTextures'
import {
	ACESFilmicToneMapping,
	MeshStandardMaterial,
	sRGBEncoding,
} from 'three'

let renderer, scene
renderer = new THREE.WebGLRenderer({ antialias: true })
scene = new THREE.Scene()
const meshes = {}
const lights = {}
let innerGroup = new THREE.Group()
let middleGroup = new THREE.Group()
let currTime = setTime()
init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.toneMapping = ACESFilmicToneMapping
	renderer.outputEncoding = sRGBEncoding
	document.body.appendChild(renderer.domElement)

	scene.add(middleGroup)

	scene.background = new THREE.Color('white')
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	;(async function () {
		let texture = await loadTexture(renderer)
		meshes.innerRing = ring(texture, 0.5, true)
		meshes.innerRing.scale.set(0.3, 0.3)
		meshes.middleRing = ring(texture, 0.3, true)
		meshes.middleRing.scale.set(0.6, 0.6)
		meshes.outerRing = ring(texture, 0.15, false)
		meshes.outerRing.scale.set(1.2, 1.2)

		innerGroup.add(meshes.innerRing)
		innerGroup.position.set(0, 1.02, 0)
		meshes.innerRing.position.set(0, 0.45, 0)
		middleGroup.add(meshes.middleRing, innerGroup)
		meshes.middleRing.position.set(0, 1.02, 0)
		scene.add(meshes.outerRing)
		let lines = addLines(texture)
		scene.add(lines)
		middleGroup.rotation.z = -currTime.hour
		innerGroup.rotation.z = -currTime.minute + currTime.hour
	})()
	animate()
}

function animate() {
	requestAnimationFrame(animate)
	if (!PARAMS.simulate) {
		middleGroup.rotation.z -= 0.0000024
		innerGroup.rotation.z -= 0.000029
	}
	renderer.render(scene, camera)
}
