export const setTime = () => {
	let date = new Date()
	let hourAngle = (date.getHours() / 12) * Math.PI * 2
	let minuteAngle = (date.getMinutes() / 60) * Math.PI * 2
	let secondsAngle = -(date.getSeconds() / 60) * Math.PI * 2
	return { hour: hourAngle, minute: minuteAngle }
}
