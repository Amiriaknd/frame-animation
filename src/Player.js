import DOMGenerator from './DOMGenerator.js'
import Loader from './Loader.js'
import Reader from './Reader.js'

class Player {
    constructor() {
        this._dom = null
        this._config = {}
    }

    loadFile(file, callback) {
        let reader = new Reader(file)
        reader.read().then((data) => {
            let loader = new Loader(data)
            loader.load().then((result) => {
                // let widthArr = []
                // let heightArr = []
                let blobArr = []
                result.sort((a, b) => (a.name.localeCompare(b.name)))
                    .map(t => {
                        // widthArr.push(t.width)
                        // heightArr.push(t.height)
                        blobArr.push(t.data)
                    })
                // const defaultWidth = Math.max.apply(null, widthArr)
                // const defaultHeight = Math.max.apply(null, heightArr)
                // this._config.width = this._config.width || (defaultWidth + 'px')
                // this._config.height = this._config.height || (defaultHeight + 'px')
                let g = new DOMGenerator(blobArr, this._config)
                let dom = g.generateDIV()
                this._dom = dom
                callback(dom)
            }).catch(function(e) {
                console.error(e)
            })
        })
    }

    config(c) {
        this._config = JSON.parse(JSON.stringify(c))
    }

    start() {
        if (this._dom !== null) {
            this._dom.style.animationPlayState = 'running'
        }
    }

    stop() {
        if (this._dom !== null) {
            this._dom.style.animationPlayState = 'paused'
        }
    }
}

export default Player