import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader } from './addMeshes'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'
import { loadTexture } from './loadTextures'

let renderer, scene, defaultMesh, defaultShaderMesh, defaultLight
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
	lights.default = addLight()
	// defaultMesh = addMeshes()
	// defaultShaderMesh = addShader()
	// defaultLight = addLight()
	scene.add(meshes.default)
	scene.add(meshes.shader)
	scene.add(lights.default)
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	animate()
}

function animate() {
	requestAnimationFrame(animate)
	console.log(meshes.default)
	// meshes.default.material.uniforms.uTime.value += 0.1
	// meshes.default.material.uniforms.displacementStrength.value =
	// 	PARAMS.displacementStrength
	// meshes.shader.rotation.y -= 0.01
	// meshes.shader.rotation.z += 0.01
	// meshes.default.rotation.x += 0.01
	// meshes.default.rotation.y += 0.01
	// defaultShaderMesh.material.uniforms.uTime.value += 0.1
	// defaultShaderMesh.material.uniforms.displacementStrength.value =
	// 	PARAMS.displacementStrength
	// defaultShaderMesh.rotation.y -= 0.01
	// defaultShaderMesh.rotation.z += 0.01
	// defaultMesh.rotation.x += 0.01
	// defaultMesh.rotation.y += 0.01
	renderer.render(scene, camera)
}
