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

const test = {
	t: 'hdi',
}

init()
function init() {
	test.asdf = 'hif'
	renderer.setSize(sizes.width, sizes.height)
	document.body.appendChild(renderer.domElement)
	defaultMesh = addMeshes()
	defaultShaderMesh = addShader()
	defaultLight = addLight()
	scene.add(defaultMesh)
	scene.add(defaultShaderMesh)
	scene.add(defaultLight)
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	animate()
}

function animate() {
	requestAnimationFrame(animate)
	defaultShaderMesh.material.uniforms.uTime.value += 0.1
	defaultShaderMesh.material.uniforms.displacementStrength.value =
		PARAMS.displacementStrength
	defaultShaderMesh.rotation.y -= 0.01
	defaultShaderMesh.rotation.z += 0.01
	defaultMesh.rotation.x += 0.01
	defaultMesh.rotation.y += 0.01
	renderer.render(scene, camera)
}
