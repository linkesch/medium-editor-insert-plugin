/* exported regexHelper */
var regexHelper = (function () {

    function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

    function vimeo_parser(url) {
        var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
        var match = url.match(regExp);
        if (match) {
            return match;
        } else {
            return false;
        }
    }
    
    return{
        youtube_parser: youtube_parser,
        vimeo_parser: vimeo_parser
    };
})();