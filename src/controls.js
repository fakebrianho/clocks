import { Pane } from 'tweakpane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export const PARAMS = {
	Simulate: false,
}

export const pane = new Pane()

const folder = pane.addFolder({
	title: 'Parameters',
})

folder.addInput(PARAMS, 'Simulate')

export const orbit = (camera, renderer) => {
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
}
