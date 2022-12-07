import { Vector2 } from 'three'

let mousePos = new Vector2(0, 0)
export const addMouseFunctions = () => {
	window.addEventListener('mousemove', function (e) {
		let x = e.clientX - this.innerWidth * 0.5
		let y = e.clientY - this.innerHeight * 0.5
		console.log(x, y)
		mousePos.x = x * 0.001
		mousePos.y = y * 0.001
	})
	return mousePos
}
