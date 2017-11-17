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
            loader.load().then((blobArr) => {
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