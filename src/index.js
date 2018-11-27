const canvas = document.querySelector('canvas')
const setDimensions = () => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}
const resize = () => {
  let debounced

  return () => {
    if (debounced) {
      clearTimeout(debounced)
    }

    debounced = setTimeout(setDimensions, 100)
  }
}

setDimensions()
window.addEventListener('resize', resize())
