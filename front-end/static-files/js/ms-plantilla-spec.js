/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("convertirParticipacion ", function () {
    let part=["2002,-2002"]
    let msj=Plantilla.convertirParticipacion(part)
    it("debería devolver texto no vacio y dentro del rango",
        function () {
            expect(msj.length>0).toBeTrue();
            expect(msj[0]>0).toBeTrue();
            expect(msj[1]>0).toBeFalse();
        });
});

describe("actualiza ", function () {
    let d={
        ref: {
            "@ref": {
                id: "ref persona 1"
            }
        },
        data: {
            "nombre": "Juan Francisco Escudero Toribio",
            "fecha_nacimiento": {
                "dia": 30,
                "mes": 6,
                "año": 2002
            },
            "nacionalidad": "español",
            "peso": 80,
            "altura": 196,
            "participacionJJOO": [
                2002,
                2006,
                2008
            ],
            "federado": true,
            "peso_espada": 600,
            "sexo": "masculino",
            "victorias": 43
            }
        
    }
    it("debería devolver una persona correcta",
        function () {
            let msj = Plantilla.plantillaTablaPersonas.actualiza(d)

            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(d.data.fecha_nacimiento.año)).toBeTrue();
            expect(msj.includes(d.data.fecha_nacimiento.dia)).toBeTrue();
            expect(msj.includes(d.data.fecha_nacimiento.mes)).toBeTrue();
            expect(msj.includes(d.data.nacionalidad)).toBeTrue();
            expect(msj.includes(d.data.peso)).toBeTrue();
            expect(msj.includes(d.data.altura)).toBeTrue();
            expect(d.data.participacionJJOO.length>0).toBeTrue();
            expect(d.data.federado==true||d.data.federado==false).toBeTrue();
            expect(msj.includes(d.data.peso_espada)).toBeTrue();
            expect(msj.includes(d.data.sexo)).toBeTrue();
            expect(msj.includes(d.data.victorias)).toBeTrue();
        });
});

describe("actualizaSoloNombres ", function () {
    let d={
        "data": {
          "nombre": "Juan Francisco Escudero Toribio",
          "fecha_nacimiento": {
            "dia": 30,
            "mes": 6,
            "año": 2002
          },
          "nacionalidad": "español",
          "peso": 80,
          "altura": 196,
          "participacionJJOO": [
            2002,
            2006,
            2008
          ],
          "federado": true,
          "peso_espada": 600,
          "sexo": "masculino",
          "victorias": 43
        }
      }
    it("debería devolver una persona correcta",
        function () {
            let msj = Plantilla.plantillaTablaPersonas.actualizaSoloNombres(d)
            expect(msj.includes(d.data.nombre)).toBeTrue();
        });
});

describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.plantillaTablaPersonas.pie).toBe("</tbody></table>");
        });
});

describe("Cabecera Tabla ", function () {
    const plantillaEsperada = `<table width="100%" class="listado-personas">
                    <tr>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th  width="10%">Fecha_nacimiento</th>
                        <th width="10%">Nacionalidad</th>
                        <th width="10%">Peso</th>
                        <th width="10%">Altura</th>
                        <th width="10%">ParticipacionJJOO</th>
                        <th width="10%">Federado</th>
                        <th width="10%">Peso_espada</th>
                        <th width="5%">Sexo</th>
                        <th width="5%">Victorias</th>
                        <th width="10%">Acciones</th>
                    </tr>
                    <tbody>
    `;
    it("debería devolver las etiquetas HTML para cabecera de tabla",
        function () {
            const plantillaGenerada = Plantilla.plantillaTablaPersonas.cabecera;
            expect(plantillaGenerada).toBe(plantillaEsperada);
        });
});

describe("Cabecera Tabla Solo Nombres ", function () {
    const plantillaEsperada = `<table width="100%" class="listado-personas">
                <thead>
                    <th width="100%">Nombre</th> 
                </thead>
                <tbody>
`;
    it("debería devolver las etiquetas HTML para cabecera de tabla de solo nombres",
        function () {
            const plantillaGenerada = Plantilla.plantillaTablaPersonas.cabeceraNombre;
            expect(plantillaGenerada).toBe(plantillaEsperada);
        });
});

describe("Imprime Solo Nombres ", function () {
    const vector= [
        {
            ref: {
                "@ref": {
                    id: "ref persona 1"
                }
            },
            data: {
                nombre: "Nombre persona 1"
            }
        },
        {
            ref: {
                "@ref": {
                    id: "ref persona 2"
                }
            },
            data: {
                nombre: "Nombre persona 2"
            }
        }
      ];
      const plantillaEsperada = 
    `<table width="100%" class="listado-personas">
                <thead>
                    <tr><th width="100%">Nombre</th> 
                </tr></thead>
                <tbody>

<tr title="### ID ###">
    <td>Nombre persona 1</td>
</tr>

<tr title="### ID ###">
    <td>Nombre persona 2</td>
</tr>
</tbody></table>`;
    it("debería devolver correctamente solo los nombres",
        function () {
            Plantilla.imprimeSoloNombres(vector);
            let tit=elementoContenido.innerHTML
            expect(elementoTitulo.innerHTML).toBe("Listado de nombres");
            expect(elementoContenido.innerHTML).toBe(plantillaEsperada);
        });
});

describe("Imprime Solo Nombres Ordenados", function () {
    const vector= [
        {
            ref: {
                "@ref": {
                    id: "ref persona 1"
                }
            },
            data: {
                nombre: "Gema"
            }
        },
        {
            ref: {
                "@ref": {
                    id: "ref persona 2"
                }
            },
            data: {
                nombre: "Ana"
            }
        }
      ];
      const plantillaEsperada = 
    `<table width="100%" class="listado-personas">
                <thead>
                    <tr><th width="100%">Nombre</th> 
                </tr></thead>
                <tbody>

<tr title="### ID ###">
    <td>Ana</td>
</tr>

<tr title="### ID ###">
    <td>Gema</td>
</tr>
</tbody></table>`;
    it("debería devolver correctamente solo los nombres",
        function () {
            Plantilla.imprimeSoloNombresOrdenados(vector);
            let tit=elementoContenido.innerHTML
            expect(elementoTitulo.innerHTML).toBe("Listado de nombres");
            expect(elementoContenido.innerHTML).toBe(plantillaEsperada);
        });
});

describe("Imprime", function () {
    const vector= [
        {
            ref: {
                "@ref": {
                    id: "ref persona 1"
                }
            },
            data: {
                "nombre": "Juan Francisco Escudero Toribio",
                "fecha_nacimiento": {
                    "dia": 30,
                    "mes": 6,
                    "año": 2002
                },
                "nacionalidad": "español",
                "peso": 80,
                "altura": 196,
                "participacionJJOO": [
                    2002,
                    2006,
                    2008
                ],
                "federado": true,
                "peso_espada": 600,
                "sexo": "masculino",
                "victorias": 43
                }
            
        }
        
      ];
      
    it("debería devolver correctamente todos los datos del vector de personas",
        function () {
            Plantilla.imprime(vector);
            let tit=elementoContenido.innerHTML
            expect(elementoTitulo.innerHTML).toBe("Listado de nombres");
            expect(tit.includes("Juan Francisco Escudero Toribio")).toBeTrue();
            expect(tit.includes("español")).toBeTrue();
            expect(tit.includes("80")).toBeTrue();
            expect(tit.includes(196)).toBeTrue();
            expect(tit.includes("2008")).toBeTrue();
            expect(tit.includes("SI")).toBeTrue();
            expect(tit.includes("600")).toBeTrue();
            expect(tit.includes("masculino")).toBeTrue();
            expect(tit.includes("43")).toBeTrue();
        });
});

describe("Imprime Una persona", function () {
    let d={
        ref: {
            "@ref": {
                id: "ref persona 1"
            }
        },
        data: {
            "nombre": "Juan Francisco Escudero Toribio",
            "fecha_nacimiento": {
                "dia": 30,
                "mes": 6,
                "año": 2002
            },
            "nacionalidad": "español",
            "peso": 80,
            "altura": 196,
            "participacionJJOO": [
                2002,
                2006,
                2008
            ],
            "federado": true,
            "peso_espada": 600,
            "sexo": "masculino",
            "victorias": 43
            }
        
    }
    it("debería devolver correctamente todos los datos del vector de personas",
        function () {
            Plantilla.imprimeUnaPersona(d);
            let tit=elementoContenido.innerHTML
            expect(elementoTitulo.innerHTML).toBe("Mostrar una persona");
            expect(tit.includes("Juan Francisco Escudero Toribio")).toBeTrue();
            expect(tit.includes("español")).toBeTrue();
            expect(tit.includes("80")).toBeTrue();
            expect(tit.includes(196)).toBeTrue();
            expect(tit.includes("2008")).toBeTrue();
            expect(tit.includes("SI")).toBeTrue();
            expect(tit.includes("600")).toBeTrue();
            expect(tit.includes("masculino")).toBeTrue();
            expect(tit.includes("43")).toBeTrue();
        });
});

/*
describe("Persona como tabla ", function () {
    let d={
        "data": {
          "nombre": "Juan Francisco Escudero Toribio",
          "fecha_nacimiento": {
            "dia": 30,
            "mes": 6,
            "año": 2002
          },
          "nacionalidad": "español",
          "peso": 80,
          "altura": 196,
          "participacionJJOO": [
            2002,
            2006,
            2008
          ],
          "federado": true,
          "peso_espada": 600,
          "sexo": "masculino",
          "victorias": 43
        }
      }
    it("debería devolver correctamente la persona como una tabla",
        function () {
            console.log(d.data)
            const msjEsperado = Plantilla.plantillaTablaPersonas.cabecera
            + Plantilla.plantillaTablaPersonas.actualiza(d.data)
            + Plantilla.plantillaTablaPersonas.pie;
            
            const msjGenerado = Plantilla.personaComoTabla(d.data);
            console.log(msjGenerado)
            expect(msjGenerado).toBe(msjEsperado);
        });
});

*/
describe("Persona almacenada ", function () {
    const persona={
        "data": {
          "nombre": "Juan Francisco Escudero Toribio",
          "fecha_nacimiento": {
            "dia": 30,
            "mes": 6,
            "año": 2002
          },
          "nacionalidad": "español",
          "peso": 80,
          "altura": 196,
          "participacionJJOO": [
            2002,
            2006,
            2008
          ],
          "federado": true,
          "peso_espada": 600,
          "sexo": "masculino",
          "victorias": 43
        }
      }
    it("debe almacenar los datos de la persona en la variable personaMostrada",
        function () {
            Plantilla.almacenaDatos(persona);
            expect(Plantilla.personaMostrada).toBe(persona);
        });
});

describe("CuerpoSoloNombre", function () {
    const expected = `
<tr title="### ID ###">
    <td>### NOMBRE ###</td>
</tr>
`;
    it("debe tener el formato correcto",
        function () {
            expect(Plantilla.plantillaTablaPersonas.cuerpoSoloNombre).toBe(expected);
        });
});

describe("Cuerpo", function () {
    const expected = `
    <tr title="### ID ###">
        <td>### ID ###</td>
        <td>### NOMBRE ###</td>
        <td>### FECHA_NACIMIENTO ###</td>
        <td>### NACIONALIDAD ###</td>
        <td>### PESO ###</td>
        <td>### ALTURA ###</td>
        <td>### PARTICIPACIONJJOO ###</td>
        <td>### FEDERADO ###</td>
        <td>### PESO_ESPADA ###</td>
        <td>### SEXO ###</td>
        <td>### VICTORIAS ###</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('### ID ###')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
        
    </tr>
    `;
    it("debe tener el formato correcto",
        function () {
            expect(Plantilla.plantillaTablaPersonas.cuerpo).toBe(expected);
        });
});

describe('Plantilla.sustituyeNombres', function () {
    it('debería reemplazar todos los marcadores de posición de nombre en la plantilla', function () {
        PlantillapW = `
            <tr title="${Plantilla.plantillaTags.ID}">
                <td>${Plantilla.plantillaTags.NOMBRE}</td>
            </tr>
            `;
        PlantillaEsperado = `
            <tr title="${Plantilla.plantillaTags.ID}">
                <td>"Juan Francisco Escudero Toribio"</td>
            </tr>
            `;
        const persona={
            "data": {
              "nombre": "Juan Francisco Escudero Toribio",
              "fecha_nacimiento": {
                "dia": 30,
                "mes": 6,
                "año": 2002
              },
              "nacionalidad": "español",
              "peso": 80,
              "altura": 196,
              "participacionJJOO": [
                2002,
                2006,
                2008
              ],
              "federado": true,
              "peso_espada": 600,
              "sexo": "masculino",
              "victorias": 43
            }
          }
        let resultado = Plantilla.sustituyeNombres(PlantillapW, persona)
        expect(resultado.includes("Juan Francisco Escudero Toribio")).toBeTrue();
      })
  })

describe('Plantilla.sustituyeTags', function () {
    let plantilla = `
<tr title="${Plantilla.plantillaTags.ID}">
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
    <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
    <td>${Plantilla.plantillaTags.PESO}</td>
    <td>${Plantilla.plantillaTags.ALTURA}</td>
    <td>${Plantilla.plantillaTags.PARTICIPACIONJJOO}</td>
    <td>${Plantilla.plantillaTags.FEDERADO}</td>
    <td>${Plantilla.plantillaTags.PESO_ESPADA}</td>
    <td>${Plantilla.plantillaTags.SEXO}</td>
    <td>${Plantilla.plantillaTags.VICTORIAS}</td>
</tr>
`;
let persona = {
    ref: {'@ref': {id: '123456'}},
    data: {
        nombre: 'Juan',
        fecha_nacimiento: {
            dia: 12,
            mes: 3,
            año: 1990
        },
        nacionalidad: 'Española',
        peso: 75,
        altura: 1.80,
        participacionJJOO: [2022],
        federado: true,
        peso_espada: 80,
        sexo: 'Masculino',
        victorias: 15
    }
};
    it('debería reemplazar todos los marcadores de posición de nombre en la plantilla', function () {
        let resultadoObtenido = Plantilla.sustituyeTags(plantilla, persona);
        expect(resultadoObtenido.includes("123456")).toBeTrue();
        expect(resultadoObtenido.includes("Juan")).toBeTrue();
        expect(resultadoObtenido.includes("Española")).toBeTrue();
        expect(resultadoObtenido.includes("75")).toBeTrue();
        expect(resultadoObtenido.includes(1.80)).toBeTrue();
        expect(resultadoObtenido.includes("2022")).toBeTrue();
        expect(resultadoObtenido.includes("SI")).toBeTrue();
        expect(resultadoObtenido.includes("80")).toBeTrue();
        expect(resultadoObtenido.includes("Masculino")).toBeTrue();
        expect(resultadoObtenido.includes("15")).toBeTrue();
      })
  })
/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
