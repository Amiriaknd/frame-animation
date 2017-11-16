import JSZip from 'jszip'

class Loader {
    constructor(zipFile) {
        this.zipFile = zipFile
    }

    load() {
        // https://github.com/Stuk/jszip/issues/399
        return JSZip.loadAsync(this.zipFile).then(function(zip) {
            const re = /(.jpg|.png|.gif|.ps|.jpeg)$/
            let promises = Object.keys(zip.files)
                .filter((filename) => (re.test(filename.toLowerCase())))
                .sort((fna, fnb) => (fna - fnb))
                .map(function(filename) {
                    const file = zip.files[filename]
                    return file.async('blob').then((blob) => (URL.createObjectURL(blob)))
                })
            return Promise.all(promises)
        })
    }
}

export default Loader