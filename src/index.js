
import JSZip from 'jszip'
document.getElementById('file').addEventListener('change', function(e) {
    console.log(e)
    let f__ = e.target.files[0];
    console.log(f__)
    let fr = new FileReader()
    fr.readAsArrayBuffer(f__)

    fr.onload = function(e) {
        let data = fr.result;
        // https://github.com/Stuk/jszip/issues/399
        JSZip.loadAsync(data).then(function(zip) {
            var re = /(.jpg|.png|.gif|.ps|.jpeg)$/
            var promises = Object.keys(zip.files).filter(function(filename) {
                return re.test(filename.toLowerCase())
            }).map(function(filename) {
                var file = zip.files[filename]
                return file.async('blob').then(function(blob) {
                    return [
                        filename,
                        URL.createObjectURL(blob)
                    ]
                })
            })
            return Promise.all(promises)
        }).then(function (result) {
            // return result.reduce(function(acc, val) {
            //     acc[val[0]] = val[1]
            //     return acc
            // }, imgs)
                
            let imgs = []
            result.forEach(function(val) {
                imgs.push(val[1])
            })
            console.log(imgs)
            addStyle(imgs)
        }).catch(function(e) {
            console.error(e)
        })
    }    
}, false)


function addStyle(imgs) {
    let style = document.createElement('style')
    style.innerHTML = `
        @keyframes keyframes {
            0% {
                background-image: url(${imgs[0]});
            }
        
            20.00% {
                background-image: url(${imgs[1]});
            }
        
            40.00% {
                background-image: url(${imgs[2]});
            }
        
            60.00% {
                background-image: url(${imgs[3]});
            }
        
            80.00% {
                background-image: url(${imgs[4]});
            }
        
            100% {
                background-image: url(${imgs[4]});
            }
        }
        .anime {
            width: 120px;
            height: 120px;
        
            animation-timing-function: steps(1);
            animation-iteration-count: infinite;
        
            background-repeat: no-repeat;
        
            animation-fill-mode: forwards;
        
            background-position: center center;
        
        
            animation-name: keyframes;
            animation-duration: 1s;    
        }
    `
    
    document.head.appendChild(style)

        
    let dom = document.createElement('div')
    dom.className = 'anime'
    // return dom

    document.body.appendChild(dom)
}
