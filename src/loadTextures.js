import { RGBELoader } from 'three/addons/loaders/RGBELoader'
import { PMREMGenerator } from 'three'
export async function loadTexture(renderer) {
	const pmrem = new PMREMGenerator(renderer)
	pmrem.compileEquirectangularShader()
	const envHDR = await new RGBELoader().loadAsync(
		'./assets/cannon_1k_blurred.hdr'
	)
	const envRT = pmrem.fromEquirectangular(envHDR)
	return envRT
}
