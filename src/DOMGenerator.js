class DOMGenerator {
    constructor(blobArr, config) {
        this.blobArr = blobArr
        this._defaultConfig = {
            display: 'block',
            width: '100px',
            height: '100px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            animationName: '___keyframe',
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationDelay: '0s',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            animationFillMode: 'none',
            animationPlayState: 'paused'
        }

        this._config = JSON.parse(JSON.stringify(this._defaultConfig))
        this.loadConfig(config)
    }

    loadConfig(config) {
        for (let key in config) {
            this._config[key] = config[key]
        }
    }

    generateDIV() {
        this._config.animationName = this.generateKeyframe()
        const DOM = document.createElement('div')
        for (let key in this._config) {
            DOM.style[key] = this._config[key]
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