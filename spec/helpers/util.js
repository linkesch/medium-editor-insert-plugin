/**
 * Placing caret to element and selected position
 *
 * @param {Element} el
 * @param {integer} position
 * @return {void}
 */

function placeCaret(el, position) {
    var range, sel;

    range = document.createRange();
    sel = window.getSelection();
    range.setStart(el.childNodes[0], position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

// https://gist.github.com/davoclavo/4424731
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]),
        // separate out the mime component
        mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
        // write the bytes of the string to an ArrayBuffer
        arrayBuffer = new ArrayBuffer(byteString.length),
        _ia = new Uint8Array(arrayBuffer),
        i, dataView, blob;

    for (i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    dataView = new DataView(arrayBuffer);
    blob = new Blob([dataView], { type: mimeString });

    return blob;
}
