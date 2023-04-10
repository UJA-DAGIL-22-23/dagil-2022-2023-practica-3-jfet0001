/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}



Plantilla.listar = function () {
    this.recupera(this.imprime);
}

Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}

Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.plantillaTablaPersonas.cabecera;
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres", msj )

}

Plantilla.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "PESO": "### PESO ###",
    "ALTURA": "### ALTURA ###",
    "PARTICIPACIONJJOO": "### PARTICIPACIONJJOO ###",
    "FEDERADO": "### FEDERADO ###",
    "PESO_ESPADA": "### PESO_ESPADA ###",
    "SEXO": "### SEXO ###",
    "VICTORIAS": "### VICTORIAS ###"
}

Plantilla.plantillaTablaPersonas = {}


// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Nombre</th>
                        <th width="10%">Fecha_nacimiento</th>
                        <th width="10%">Nacionalidad</th>
                        <th width="10%">Peso</th>
                        <th width="10%">Altura</th>
                        <th width="10%">ParticipacionJJOO</th>
                        <th width="10%">Federado</th>
                        <th width="10%">Peso_espada</th>
                        <th width="10%">Sexo</th>
                        <th width="10%">Victorias</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTags.PESO}</td>
        <td>${Plantilla.plantillaTags.ALTURA}</td>
        <td>${Plantilla.plantillaTags["PARTICIPACIONJJOO"]}</td>
        <td>${Plantilla.plantillaTags.FEDERADO}</td>
        <td>${Plantilla.plantillaTags.PESO_ESPADA}</td>
        <td>${Plantilla.plantillaTags.SEXO}</td>
        <td>${Plantilla.plantillaTags.VICTORIAS}</td>
        
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, persona) {
    let fechaNacimiento=`${persona.data.fecha_nacimiento.dia}/
    ${persona.data.fecha_nacimiento.mes}/${persona.data.fecha_nacimiento.año}`

    return plantilla
        
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NACIMIENTO, 'g'), fechaNacimiento)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), persona.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Plantilla.plantillaTags.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(Plantilla.plantillaTags.PARTICIPACIONJJOO, 'g'), Plantilla.convertirParticipacion(persona.data.participacionJJOO))
        .replace(new RegExp(Plantilla.plantillaTags.FEDERADO, 'g'), persona.data.federado===true?"SI":"NO")
        .replace(new RegExp(Plantilla.plantillaTags.PESO_ESPADA, 'g'), persona.data.peso_espada)
        .replace(new RegExp(Plantilla.plantillaTags.SEXO, 'g'), persona.data.sexo)
        .replace(new RegExp(Plantilla.plantillaTags.VICTORIAS, 'g'), persona.data.victorias)

}

Plantilla.convertirParticipacion=function(arr){
    let participacion=""
    arr.forEach(pr=>participacion+=pr+" ")
    return participacion
}
/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}