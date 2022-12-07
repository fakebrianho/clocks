import { PerspectiveCamera } from 'three'

const FOV = 45
export const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}
export const camera = new PerspectiveCamera(
	FOV,
	window.innerWidth / window.innerHeight,
	1,
	1000
)

camera.position.set(0, 0, 8)

export default camera
