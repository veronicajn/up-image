$(document).ready(function() {
    //variables globales
    var ficheroSubido = "";
    var idcomentario = -1;
    var idautor = -1;
    var usuario = "";
    var idusuario="";
    var pasomenu=false;
    var foto = "";
    var numpaginador=10;
    var numarticulos=10;
    var inicio=0;
    var fin = numarticulos;
    var l;

// relacionado con la foto
    $("#archivoLibroNuevo").fileinput({
        uploadUrl: "php/subirarticulo.php",
        showUpload: false,
        showRemove: false,
        maxFileSize: 150,
        uploadAsync: false,
        maxFilesNum: 1,
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: true,
        initialCaption: "Seleccione imagen"
    });
    $("#archivoLibroNuevo").on('fileloaded', function(event, file, previewId, index) {
        ficheroSubido = file.name;
    });
    
// recibir nuevo libro y grabarlo
    $(document).on('submit', '#loginformLibroNuevo', function(e) {
        e.preventDefault();
        var mensaje = "";
        var nombrearchivo = "";
        var titulo = $("#tituloNuevo").val();
        if (titulo == "") {
            mensaje = "El título es obligatorio.<br>";
        }
        var aniopublicacion = $("#aniopublicacionNuevo").val();
        if (aniopublicacion == "") {
            aniopublicacion = 0;
        }
        if (!/^([0-9])*$/.test(aniopublicacion)) { // no es número
            mensaje += "El año de nacimiento debe ser un número.<br>";
            $("#aniopublicacionNuevo").val("");
        }
        var idautorc = $("#autorNuevo").val();
        if (idautorc == "") {
            idautorc = 0;
        }        
        var resumen = $("#resumenNuevo").val();
        nombrearchivo = ficheroSubido;
        if (nombrearchivo == "") {
            nombrearchivo = foto;
        }
        if (mensaje == "") {
            // mediante ajax daríamos de alta el libro
                      
        } else {
            alert(mensaje);
        }

    });

});

// ****************** Funciones  *******************
function CerrarVentana(e) {
    if (e.keyCode == 27) {
        window.history.back();
    }
}


    //cookies
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(c_name, value, hora) {
    var now = new Date();
    var time = now.getTime();
    time += hora * (3600 * 1000); //una hora mas
    now.setTime(time);
    var c_value = escape(value) + ((hora == null) ? "" : ";expires = " + now.toUTCString());
    document.cookie = c_name + " = " + c_value;
}

function checkCookie() {
    var username = getCookie("usuario");
    if (username != null && username != "") {
        alert("Bienvenido " + username);
    } else {
        username = prompt("Por favor, Introduzca su usuario:", "");
        if (username != null && username != "") {
            setCookie("usuario", username, 1);
        }
    }
}

function borrarCookie(nombre) {
    var d = new Date();
    document.cookie = nombre + "=1;expires=" + d.toGMTString() + ";" + ";";
}
