import { DirectionalLight } from 'three'

const light = new DirectionalLight(0xffffff, 1)
const lightResolution = 2048
const lightSize = 50

light.position.set(-50, 0, 100)
light.castShadow = true
light.shadow.mapSize.x = lightResolution
light.shadow.mapSize.y = lightResolution
light.shadow.camera.bottom = -lightSize
light.shadow.camera.left = -lightSize
light.shadow.camera.right = lightSize
light.shadow.camera.top = lightSize

export default light
