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
                    const width = U8toInt(file._data.compressedContent.subarray(16, 20))
                    const height = U8toInt(file._data.compressedContent.subarray(20, 24))
                    return file.async('blob').then((blob) => (URL.createObjectURL(blob)))
                })
            return Promise.all(promises)
        })
    }
}

function U8toInt(u8) {
    return (u8[0] << 24 | u8[1] << 16 | u8[2] << 8 | u8[3])
}

export default Loader