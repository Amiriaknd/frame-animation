class Reader {
    constructor(source) {
        this.source = source
    }

    read() {
        if (Object.prototype.toString.call(this.source) === '[object String]') {
            return new Promise((resolve) => {
                if (JSZipUtils) {
                    JSZipUtils.getBinaryContent(this.source, function (err, data) {
                        if(err) {
                            throw err;
                        }
                        resolve(data)
                    });
                } else {
                    throw 'JSZipUtils not found.'
                }
                
            })
        } else {
            return new Promise((resolve) => {
                let fr = new FileReader()
                fr.readAsArrayBuffer(this.source)
                fr.onload = function() {
                    resolve(fr.result)
                }
            })
        }
    }
}

export default Reader