class DOMGenerator {
    constructor(blobArr, {width, height, animationDuration, animationTimingFunction, animationDelay}) {
        this.blobArr = blobArr

        this.width = width || '100px'
        this.height = height || '100px'
        this.backgroundRepeat = 'no-repeat'
        this.backgroundPosition = 'center center'
        this.backgroundSize = 'cover'
        this.animationDuration = animationDuration || '1s'
        this.animationTimingFunction = animationTimingFunction || 'steps(1)'
        this.animationDelay = animationDelay || '0s'
        this.animationIterationCount = 'infinite'
        this.animationDirection = 'normal'
        this.animationFillMode = 'none'
        this.animationPlayState = 'paused'
    }

    generateDIV() {
        const animationName = this.generateKeyframe()
        const DOM = document.createElement('div')
        const temp = {
            display: 'block',
            width: this.width,
            height: this.height,
            backgroundRepeat: this.backgroundRepeat,
            backgroundPosition: this.backgroundPosition,
            backgroundSize: this.backgroundSize,
            animationName: animationName,
            animationDuration: this.animationDuration,
            animationTimingFunction: this.animationTimingFunction,
            animationDelay: this.animationDelay,
            animationIterationCount: this.animationIterationCount,
            animationDirection: this.animationDirection,
            animationFillMode: this.animationFillMode,
            animationPlayState: this.animationPlayState
        }
        for (let key in temp) {
            DOM.style[key] = temp[key]
        }
        return DOM
    }

    generateKeyframe() {
        const style = document.createElement('style')
        const animationName = '___' + Math.random().toString(36).substr(2) + 'keyframe'
        const content = (() => {
            let result = ''
            const length = this.blobArr.length
            for (let i = 0; i < length; i++) {
                 const percent = (i / (length - 1)).toFixed(4) * 100
                 result += `${percent}% {background-image: url(${this.blobArr[i]})}`
            }
            return result
        })()
        style.innerHTML = `@keyframes ${animationName} {${content}}`;
        document.head.appendChild(style)
        return animationName
    }
}

export default DOMGenerator