<?php
	//$carpeta_destino =$_SERVER["DOCUMENT_ROOT"] . "/proyectos mios/lectores/solucion/imagenes/autores";
	$carpeta_destino ="../imagenes/libros";
	$nombre_archivo = $_FILES['archivoLibroNuevo']['name'];
	$tipo_archivo = $_FILES['archivoLibroNuevo']['type'];
	$tamano_archivo = $_FILES['archivoLibroNuevo']['size'];
	$tmp_archivo = $_FILES['archivoLibroNuevo']['tmp_name'];
	$archivador = $carpeta_destino . "/" . $nombre_archivo;
	if($tamano_archivo<150001){
		if (!move_uploaded_file($tmp_archivo, $archivador)) {		
			$nombre_archivo = "";					
		}
		// cambiar el alto y el ancho por si es muy grande
		list($ancho,$alto,$tipo) = getimagesize($archivador);
		if($ancho>500 || $alto>500) {
			if($ancho>$alto){
				$porcentaje=500/$ancho*100;
			}else{
				$porcentaje=500/$alto*100;
			}
			$nuevo_ancho = $ancho * $porcentaje / 100;
			$nuevo_alto = $alto * $porcentaje / 100;
			// Redimensionar
			$imagen_p = imagecreatetruecolor($nuevo_ancho, $nuevo_alto);
			switch ($tipo) { 
				case IMAGETYPE_JPEG:
					$imagen = imagecreatefromjpeg($archivador);
					break; 
				case IMAGETYPE_GIF: 
					$imagen = imagecreatefromgif($archivador);
					break; 
				case IMAGETYPE_PNG: 
					$imagen= imagecreatefrompng($archivador); 
					break; 
				default: 
				;
			} 			
			imagecopyresampled($imagen_p, $imagen, 0, 0, 0, 0, $nuevo_ancho, $nuevo_alto, $ancho, $alto);			
			// cambiar una por otra
			imagejpeg($imagen_p, $archivador, 100);
		}
	}else{
		$nombre_archivo = "grande";					
	}
	echo json_encode($nombre_archivo);
?>

