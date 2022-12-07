import { Pane } from 'tweakpane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export const PARAMS = {
	displacementStrength: 0.5,
	simulate: false,
}

export const pane = new Pane()

const folder = pane.addFolder({
	title: 'Parameters',
})

folder.addInput(PARAMS, 'displacementStrength', {
	min: 0.1,
	max: 1.0,
	step: 0.1,
})

folder.addInput(PARAMS, 'Simulate')

export const orbit = (camera, renderer) => {
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
}
// const PARAMS = {
// 	hidden: true,
//   };

//   const pane = new Pane();
//   pane.addInput(PARAMS, 'hidden');
