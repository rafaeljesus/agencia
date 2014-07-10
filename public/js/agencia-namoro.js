/**
 *  Agencia Namoro Gay JS
 *  Script para fazer links de anchor animados
 *
 **/
var $root = $('html, body');
$('[id$=link]').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 400, function () {
        window.location.hash = href;
    });
    return false;
});