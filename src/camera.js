import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight)

camera.position.z = 100

export default camera
