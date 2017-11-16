import DOMGenerator from './DOMGenerator.js'
import Loader from './Loader.js'
import Reader from './Reader.js'

class Player {
    constructor() {
        this.dom = null
    }

    loadFile(file, callback) {
        let reader = new Reader(file)
        reader.read().then((data) => {
            let loader = new Loader(data)
            loader.load().then((blobArr) => {
                let g = new DOMGenerator(blobArr, {
                    width: '120px',
                    height: '120px',
                    animationDuration: '.5s'
                })
                let dom = g.generateDIV()
                this.dom = dom
                callback(dom)
            }).catch(function(e) {
                console.error(e)
            })
        })
    }

    start() {
        if (this.dom !== null) {
            this.dom.style.animationPlayState = 'running'
        }
    }

    stop() {
        if (this.dom !== null) {
            this.dom.style.animationPlayState = 'paused'
        }
    }
}

export default Player