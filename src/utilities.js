const goodSearchTerms = ['fire', 'lightning', 'rapper', 'explosion', 'abstract', 'painting', 'portrait', 'aesthetic',
'rainbow', 'colorful', 'texture', 'landscape', 'trees', 'nature texture', 'fire-texture', 'crowd',
'architecture', 'industrial', 'fractal', 'aesthetic texture', 'stunning space', 'psychedelic',
'abstract dark', 'wallpaper', 'light streaks', 'gradient', 'overlay texture', 'sunset', 'sky',
'water texture', 'statue', 'urban', 'floral',
'streetwear', 'wildlife', 'cyberpunk', 'night city', 'liquid', 'fireworks', 'galaxy', 'spider web',
'pattern', 'fabric', 'microscopic', 'stars', 'jellyfish', 'lightning storm',
'waterfall', 'grunge', 'incredible view', 'festival night', 'iridescent sky',
'abstract wallpaper', 'ice', 'fractal patterns', 'flower', 'bikini', 'earth', 'shark',
'reptile eye', 'bokeh', 'light show', 'drawing', 'black and white',
'purple', 'white', 'black']

const modes = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]

const effects = ["none", "blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "saturate"]

const randomFrom = (arr) => {
    return arr[Math.floor(arr.length*Math.random())]
}

export const randomGoodTerm = () => {
    return randomFrom(goodSearchTerms)
}

export const randomMode = () => {
    return randomFrom(modes)
}

export const randomEffect = () => {
    return randomFrom(effects)
}

