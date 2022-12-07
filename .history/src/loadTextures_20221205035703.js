export async function add(renderer) {
	const pmrem = new PMREMGenerator(renderer)
	pmrem.compileEquirectangularShader()
	const envHDR = await new RGBELoader().loadAsync(
		'./assets/cannon_1k_blurred.hdr'
	)
	const envRT = pmrem.fromEquirectangular(envHDR)
	let sphere = new Mesh(
		new SphereGeometry(2, 10, 10),
		new MeshStandardMaterial({
			envMap: envRT.texture,
			roughness: 0.2,
			metalness: 0.5,
		})
	)
	return { mesh: sphere, envMap: envRT }
}
