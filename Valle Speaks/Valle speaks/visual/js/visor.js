
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/*$(document).ready(function(){
    var documento=utf8Encode(getUrlParameter('doc'));
    //alert(documento);
})*/

function getHeader(){
    return head = {
        uri : utf8Decode(getUrlParameter('url')),
        caducidad : (caducidad = getUrlParameter('caducidad')) != undefined ? Number(utf8Decode(caducidad)) : undefined,
        demo : (demo = getUrlParameter('demo')) != undefined ? utf8Decode(demo) : undefined,
        ocultarbarra : (ocultarbarra = getUrlParameter('ocultarbarra')) != undefined ? utf8Decode(ocultarbarra) : undefined,
        idioma : (idioma = getUrlParameter('idioma')) != undefined ? utf8Decode(idioma) : undefined, 
        numpages : utf8Decode(getUrlParameter('numpages')) 
    }
}

function utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
    return utf8String;
}

function utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
            return String.fromCharCode(cc); }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
            return String.fromCharCode(cc); }
    );
    return unicodeString;
}