import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	DoubleSide,
	Group,
	RingGeometry,
	CylinderGeometry,
} from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
export const addMeshes = () => {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshStandardMaterial({ color: 0xff0000 })
	const mesh = new Mesh(geometry, material)
	mesh.position.set(-2, 0, 0)
	return mesh
}

export const ring = (envMap, thickness, handleCheck) => {
	let group = new Group()
	let baseThicc = 2
	let ring = new RingGeometry(baseThicc, baseThicc + 2, 70)
	let material = new MeshStandardMaterial({
		envMap: envMap.texture,
		roughness: 0.2,
		metalness: 1.0,
		side: DoubleSide,
		envMapIntensity: 2.0,
	})
	let ringMesh = new Mesh(ring, material)
	ringMesh.position.set(0, 0, 0.25 * 0.5)
	let outerRing = new CylinderGeometry(
		baseThicc + thickness,
		baseThicc + thickness,
		0.25,
		70,
		1,
		true
	)
	let outerRingMesh = new Mesh(outerRing, material)
	outerRingMesh.rotation.x = Math.PI * 0.5
	let innerRing = new CylinderGeometry(
		baseThicc,
		baseThicc,
		0.25,
		140,
		1,
		true
	)
	let innerRingMesh = new Mesh(innerRing, material)
	innerRingMesh.rotation.x = Math.PI * 0.5
	let hand = new CylinderGeometry(0.1, 0.1, 0.2, 20, 20, false)
	let handMesh = new Mesh(hand, material)
	handMesh.position.set(0, 1.9, 0)
	handleCheck ? group.add(handMesh) : ''
	// group.add(ringMesh, outerRingMesh, innerRingMesh)
	group.add(ringMesh)
	return group
}

export const addShader = () => {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new ShaderMaterial({
		extensions: {
			derivatives: '#extension GL_OES_standard_derivatives : enable',
		},
		side: DoubleSide,
		uniforms: {
			uTime: { type: 'f', value: 0 },
			resolution: { type: 'v4', value: new Vector4() },
			uvRate1: {
				value: new Vector2(1, 1),
			},
			displacementStrength: { type: 'f', value: 0.5 },
		},
		// wireframe: true,
		// transparent: true,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	})
	const mesh = new Mesh(geometry, material)
	mesh.position.set(2, 0, 0)
	return mesh
}
