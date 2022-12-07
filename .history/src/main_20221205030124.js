import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader } from './addMeshes'
import { PARAMS, pane } from './controls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { resize } from './eventListeners'
let renderer, scene, defaultMesh, defaultShaderMesh, defaultLight
renderer = new THREE.WebGLRenderer()
scene = new THREE.Scene()

init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	document.body.appendChild(renderer.domElement)
	defaultMesh = addMeshes()
	defaultShaderMesh = addShader()
	defaultLight = addLight()
	scene.add(defaultMesh)
	scene.add(defaultShaderMesh)
	scene.add(defaultLight)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true

	animate()
}

window.addEventListener('resize', () => {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
