import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader, ring } from './addMeshes'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'
import { loadTexture } from './loadTextures'

let renderer, scene
renderer = new THREE.WebGLRenderer()
scene = new THREE.Scene()

const meshes = {}
const lights = {}

init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
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
		meshes.outerRing = ring(texture, 0.5)
		meshes.outerRing.scale.set(0.55, 0.55)
		meshes.middleRing = ring(texture, 0.35)
		meshes.middleRing.scale.set(0.85, 0.85)
		meshes.innerRing = ring(texture, 0.15)
		meshes.innerRing.scale.set(1.2, 1.2)
		scene.add(meshes.outerRing, meshes.innerRing, meshes.middleRing)
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
	renderer.render(scene, camera)
}
