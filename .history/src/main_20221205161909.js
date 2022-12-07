import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader, ring } from './addMeshes'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'
import { loadTexture } from './loadTextures'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'

let renderer, scene
renderer = new THREE.WebGLRenderer({ antialias: true })
scene = new THREE.Scene()

const meshes = {}
const lights = {}
let testGroup = new THREE.Group()
init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.toneMapping = ACESFilmicToneMapping
	renderer.outputEncoding = sRGBEncoding
	document.body.appendChild(renderer.domElement)
	meshes.default = addMeshes()
	meshes.shader = addShader()
	// lights.default = addLight()
	scene.add(meshes.default)
	scene.add(meshes.shader)
	// scene.add(lights.default)
	scene.background = new THREE.Color('white')
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	;(async function () {
		let texture = await loadTexture(renderer)
		meshes.innerRing = ring(texture, 0.5, true)
		meshes.innerRing.scale.set(0.2, 0.2)
		meshes.middleRing = ring(texture, 0.35, true)
		meshes.middleRing.scale.set(0.55, 0.55)
		meshes.outerRing = ring(texture, 0.15, false)
		meshes.outerRing.scale.set(1.2, 1.2)
		testGroup.add(meshes.innerRing)
		testGroup.position.set(1, 0, 0)
		scene.add(meshes.outerRing, testGroup, meshes.middleRing)
	})()
	animate()
}

function animate() {
	requestAnimationFrame(animate)
	meshes.shader.material.uniforms.uTime.value += 0.1
	meshes.shader.material.uniforms.displacementStrength.value =
		PARAMS.displacementStrength
	meshes.shader.rotation.y -= 0.01
	meshes.shader.rotation.z += 0.01
	meshes.default.rotation.x += 0.01
	meshes.default.rotation.y += 0.01
	meshes.innerRing.rotation.z += 0.01
	testGroup.rotation.z += 0.01
	renderer.render(scene, camera)
}
