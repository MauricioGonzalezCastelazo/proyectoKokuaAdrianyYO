//------------------------------Jsons------------------------------------------------------------------

const contactsURL = '/api/paciente/contactos:id';
const idToReplace = 38; // El ID que quieres usar
const updatedContactsURL = contactsURL.replace(':id', idToReplace);

const userURL = '/api/paciente/user:id';
const updateduserURL = userURL.replace(':id', idToReplace);

const serviciosURL = '/api/paciente/ServiciosExtra';

const SeguimientoURL = '/api/paciente/Seguimiento:id';
const updateseguimientoURL = SeguimientoURL.replace(':id', idToReplace);

const urlPacientes = '/api/data';

// Función para cargar un archivo JSON usando fetch
function loadJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Error al cargar JSON desde ${url}:`, error);
      throw error; // Relanzar el error para manejo posterior si es necesario
    });
}

const notifications =
  [
    {
      id: 1,
      notification: "Hola",
      description: "Alguien te ha dicho hola",
      time: "1hr ago"
    },
    {
      id: 2,
      notification: "Hola",
      description: "Alguien te ha dicho hola",
      time: "1hr ago"
    },
    {
      id: 3,
      notification: "Hola",
      description: "Alguien te ha dicho hola",
      time: "1hr ago"
    },
    {
      id: 4,
      notification: "Hola",
      description: "Alguien te ha dicho hola",
      time: "1hr ago"
    }
  ]

const mensajes =
  [
    {
      id: 1,
      id_recpetor: 1,
      id_emisor: 1,
      mensaje:
        [
          { "tipo": "emisor", "mensaje": "Hola" },
          { "tipo": "emisor", "mensaje": "Como has estado?" },
          { "tipo": "emisor", "mensaje": "amigo" },
          { "tipo": "receptor", "mensaje": "bien" },
          { "tipo": "receptor", "mensaje": "gracias por preguntar" },
          { "tipo": "emisor", "mensaje": "Hola" },
          { "tipo": "emisor", "mensaje": "Como has estado?" },
          { "tipo": "emisor", "mensaje": "amigo" },
          { "tipo": "receptor", "mensaje": "bien" },
          { "tipo": "receptor", "mensaje": "gracias por preguntar" }
        ]
    },

    {
      id: 2,
      id_recpetor: 2,
      id_emisor: 1,
      mensaje: [
        { "tipo": "emisor", "mensaje": "Hola" },
        { "tipo": "emisor", "mensaje": "Como has estado Ferro?" },
        { "tipo": "receptor", "mensaje": "bien" },
        { "tipo": "receptor", "mensaje": "gracias por preguntar" }
      ]
    }
  ]



//----------------------------------functions--------------------------------------------------------------


//-------------------------------User--------------------------------------------------------------------
const loadChatUser = async () => {
  try {
    const response = await loadJSON(updateduserURL);
    const jsonUser = response.data;
    console.log("Aqui va el usuario");
    const user = document.getElementsByClassName('usuario');
    jsonUser.forEach(element => {
      const nombreUsuario = document.createElement("p");
      const divImg = document.createElement('div');
      divImg.className = 'imgHelp';
      divImg.innerHTML = '<ion-icon name="person-outline" class = "iconoGrandeNegrita"></ion-icon>'
      nombreUsuario.innerText = element.Nombre;
      user[0].appendChild(divImg);
      user[0].appendChild(nombreUsuario);
    });
  } catch (error) {
    console.log(error);
  }
}

//---------------------------chatContacts------------------------------------------------------------------
const loadChatContacts = async () => {
  try {
    await loadChatUser();
    const card = document.getElementsByClassName('contact')[0];
    const response = await loadJSON(updatedContactsURL);
    const jsonContacts = response.data;
    console.log(jsonContacts);

    // Decide si mostrar nombre de doctor o de persona de apoyo
    let nombreCompletoDoctor = nombreCompleto = `${jsonContacts[0].NombreDoctor} ${jsonContacts[0].ApellidoDoctor}`;
    let nombreCompletoApoyo = nombreCompleto = `${jsonContacts[0].PersonaApoyoNombre} ${jsonContacts[0].PersonaApoyoApellido}`;
    let ultimoMensajeTexto1 = "No hay mensajes";
    const conversaciones1 = mensajes.filter(m => m.id_recpetor === jsonContacts[0].IDDoctor);

    if (conversaciones1.length > 0) {
      const ultimoMensaje = conversaciones1.map(c => c.mensaje[c.mensaje.length - 1])
        .reduce((a, b) => (a.fecha > b.fecha ? a : b));
      ultimoMensajeTexto1 = ultimoMensaje.mensaje;
    }

    let ultimoMensajeTexto2 = "No hay mensajes";
    const conversaciones2 = mensajes.filter(m => m.id_recpetor === jsonContacts[0].IDPersonaApoyo);

    if (conversaciones2.length > 0) {
      const ultimoMensaje = conversaciones1.map(c => c.mensaje[c.mensaje.length - 1])
        .reduce((a, b) => (a.fecha > b.fecha ? a : b));
      ultimoMensajeTexto2 = ultimoMensaje.mensaje;
    }

    let hora = new Date().toLocaleTimeString();
    const div1 = document.createElement("button");
    const div2 = document.createElement("button");
    const divNombre1 = document.createElement("div");
    const divNombre2 = document.createElement("div");
    const nombreDoctor = document.createElement("h6");
    const nombrePersonaApoyo = document.createElement("h6");
    const fecha1 = document.createElement("p");
    const fecha2 = document.createElement("p");
    const mensaje1 = document.createElement("p"); 2
    const mensaje2 = document.createElement("p");
    const salto1 = document.createElement("br");
    const salto2 = document.createElement("br");

    mensaje1.innerText = ultimoMensajeTexto1;
    mensaje1.className = "ultimoMensaje";
    mensaje1.appendChild(salto1);
    mensaje2.innerText = ultimoMensajeTexto2;
    mensaje2.className = "ultimoMensaje";
    mensaje2.appendChild(salto2);
    nombreDoctor.innerText = nombreCompletoDoctor;
    nombrePersonaApoyo.innerText = nombreCompletoApoyo;
    fecha1.innerText = hora;
    fecha2.innerText = hora;
    div1.className = 'contactArea';
    div2.className = 'contactArea';
    nombreDoctor.className = 'nombreContacto';
    nombrePersonaApoyo.className = 'nombreContacto';
    fecha1.className = 'fechaContacto';
    fecha2.className = 'fechaContacto';
    div1.setAttribute('data-id', jsonContacts[0].IDDoctor);
    div1.setAttribute('data-type', 'doctor');
    div2.setAttribute('data-id', jsonContacts[0].IDPersonaApoyo);
    div2.setAttribute('data-type', 'apoyo');

    divNombre1.appendChild(nombreDoctor);
    divNombre1.appendChild(mensaje1);
    div1.appendChild(divNombre1);
    div1.appendChild(fecha1);
    card.appendChild(div1);

    divNombre2.appendChild(nombrePersonaApoyo);
    divNombre2.appendChild(mensaje2);
    div2.appendChild(divNombre2);
    div2.appendChild(fecha2);
    card.appendChild(div2);
  } catch (error) {
    console.log(error);
  }
};


//--------------------load messages---------------------------------------------------------------------
const loadMessages = async (mensajes) => {
  try {
    await loadChatContacts();
    const areaChat = document.getElementsByClassName("chats")[0];
    const areaNombreChat = document.getElementsByClassName("nombreChat")[0];
    let contactos = document.querySelectorAll('.contactArea');

    contactos.forEach(contacto => {
      contacto.addEventListener('click', function (event) {
        areaChat.innerHTML = '';
        areaNombreChat.innerHTML = '';

        const idContacto = contacto.getAttribute('data-id');
        const tipoContacto = contacto.getAttribute('data-type');
        console.log("ID Contacto:", idContacto, "Tipo:", tipoContacto);

        const nombreElement = document.createElement('h3');
        nombreElement.innerText = contacto.querySelector('h6').textContent;
        nombreElement.className = "NombreChat";
        areaNombreChat.appendChild(nombreElement);
        areaNombreChat.appendChild(document.createElement('hr'));

        let conversaciones = mensajes.filter(m => m.id_recpetor === parseInt(idContacto));
        console.log("Conversaciones filtradas:", conversaciones);

        conversaciones.forEach(conversacion => {
          conversacion.mensaje.forEach(mensaje => {
            const mensajeElement = document.createElement("p");
            mensajeElement.innerText = mensaje.mensaje;
            mensajeElement.className = mensaje.tipo === "receptor" ? "MensajeReceptor" : "MensajeEmisor";
            areaChat.appendChild(mensajeElement);
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};







const searchBar = async () => {
  try {
    const searchBar = document.querySelector('.searchBar');
    searchBar.addEventListener('input', (e) => {
      const searchText = e.target.value.toLowerCase();
      const contactAreas = document.querySelectorAll('.contactArea');

      contactAreas.forEach(contact => {
        const name = contact.querySelector('.nombreContacto').textContent.toLowerCase();
        if (name.includes(searchText)) {
          contact.style.display = '';
        } else {
          contact.style.display = 'none';
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}



//--------------------------notifications---------------------------------------------------------
const loadNotifications = async (notifications) => {
  try {
    const notificationArea = document.getElementById('notifications');

    await notifications.forEach(el => {
      const line = document.createElement('hr');
      line.className = 'lineaNot';
      const divTituloMensaje = document.createElement('div');
      divTituloMensaje.className = 'notificacionTituloDescripcion';
      const divHora = document.createElement('div');
      divHora.className = 'divHoraNotificacion';
      const divNotification = document.createElement('div');
      divNotification.className = 'divNotificacion';
      divNotification.setAttribute('data-id', el.id); // Asignar el ID de la notificación
      const point = document.createElement('div');
      point.className = 'ponitNotificacion';

      const notification = document.createElement('p');
      notification.innerText = el.notification;
      notification.className = 'titleNotification';
      const time = document.createElement('p');
      time.innerText = el.time;
      time.className = 'timeNotification';
      const description = document.createElement('p');
      description.innerText = el.description;
      description.className = 'descriptionNotification';

      const botonBorrar = document.createElement('button');
      botonBorrar.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
      botonBorrar.className = 'borrar';

      divTituloMensaje.appendChild(point);
      divTituloMensaje.appendChild(notification);
      divTituloMensaje.appendChild(description);
      divHora.appendChild(time);
      divNotification.appendChild(divTituloMensaje);
      divNotification.appendChild(divHora);
      divNotification.appendChild(botonBorrar);  // Agrega el botón Borrar a la notificación
      notificationArea.appendChild(line);
      notificationArea.appendChild(divNotification);
      notificationArea.appendChild(line);


      botonBorrar.addEventListener('click', function (event) {
        const notificationId = divNotification.getAttribute('data-id');
        console.log(notificationId);
        divNotification.classList.add('desvanecer');
        divNotification.addEventListener('animationend', function () {
          divNotification.remove();
        });
      });
    });

  } catch (error) {
    console.log(error);
  }

}

//-----------------------------------------------Servicios Extra----------------------------------------------
const serviciosExtraLoad = async () => {
  const response = await loadJSON(serviciosURL);
  const jsonServicios = response.data;
  console.log(jsonServicios)
  const area = document.getElementById('serviciosExtra');
  console.log(area)
  let cont = 0;
  jsonServicios.map(element => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="col-lg-3 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${element.Nombre}</h5>
          <p class="card-text">
            ${element.Descripcion}
          </p>
          <p class="card-text">
            <small class="text-muted">Costo: ${element.Costo}</small>
          </p>
        </div>
      </div>
    </div>`
    area.appendChild(div);
    cont++;
  });
}

//---------------------------------------Seguimiento------------------------------------------------------------------------
const seguimientoLoad = async () => {
  const response = await loadJSON(updateseguimientoURL);
  const jsonSeguimiento = response.data;
  const area = document.getElementById('DashBoard');
  const div = document.createElement('div');
  div.innerHTML = `
    <h4> ¡Hola de nuevo, ${jsonSeguimiento[0].NombrePaciente}!</h4>
    <div class = 'row'>
      <div class="col-lg-4">
        <div id="patientInfo" class="info-container">
        <ion-icon name="medkit" class="icono-grande"></ion-icon>
          
          <div class="texto-info">
            <p>Doctor:</p>
            <h6>${jsonSeguimiento[0].NombreDoctor}</h6>
          </div>
        </div>
    </div>
    
    <div class="col-lg-4">
      <div id="patientInfo" class="info-container">
        
        <ion-icon name="people" class="icono-grande"></ion-icon>
        <div class="texto-info">
          <p>Persona de Apoyo:</p>
          <h6>${jsonSeguimiento[0].NombrePersonaApoyo}</h6>  
        </div>
      </div>
    </div>

    
    <div class="col-lg-4">
      <div id="patientInfo" class="info-container">
      <ion-icon name="medical" class="icono-grande"></ion-icon>
        <div class="texto-info">
          <p>Aseguradora:</p>
          <h6>${jsonSeguimiento[0].NombreAseguradora}</h6> 
        </div>
      </div>
    </div>

    </div>
      <br>
      <h2>Mis citas</h2>
      <div id = 'CitasArea'></div>
      <br>
      <h2>Mis medicamentos</h2>
      <div id='MedicamentosArea'></div>
      <br>
    `
  area.appendChild(div);
  const medicinasArea = document.getElementById('MedicamentosArea');
  const citasArea = document.getElementById('CitasArea');
  // Crear contenedor para la línea de tiempo
  // Crear contenedor para la línea de tiempo
  // Crear contenedor para la línea de tiempo
  const lineaTiempoContainer = document.createElement('div');
  lineaTiempoContainer.className = 'linea-tiempo-container';

  const fechasUnicas = new Set();
  jsonSeguimiento.forEach(el => {
    // Formatea la fecha para mostrar solo aaaa-mm-dd
    const fechaFormateada = el.FechaCita.split('T')[0];

    if (!fechasUnicas.has(fechaFormateada)) {
      fechasUnicas.add(fechaFormateada);

      const puntoLineaTiempo = document.createElement('div');
      puntoLineaTiempo.className = 'punto-linea-tiempo';

      const labelFecha = document.createElement('div');
      labelFecha.className = 'label-fecha';
      labelFecha.innerText = fechaFormateada;
      puntoLineaTiempo.appendChild(labelFecha);
      lineaTiempoContainer.appendChild(puntoLineaTiempo);
    }
  });


  const titLinea = document.createElement('h3');
  titLinea.innerText = "Linea del tiempo citas: "
  citasArea.appendChild(titLinea);
  citasArea.appendChild(lineaTiempoContainer);



  const tablaCitas = document.createElement('table');
  const citasUnicas = new Set();
  tablaCitas.className = 'tabla-citas'; // Añade una clase para estilos CSS si es necesario

  // Añadir cabecera de la tabla
  const cabeceraTabla = document.createElement('thead');
  cabeceraTabla.innerHTML = `
      <tr>
        <th>Fecha de la Cita</th>
        <th>Tipo de Cita</th>
        <th>Estatus de la Cita</th>
      </tr>`;
  tablaCitas.appendChild(cabeceraTabla);

  // Añadir cuerpo de la tabla
  const cuerpoTabla = document.createElement('tbody');
  jsonSeguimiento.forEach(el => {
    // Formatea la fecha para mostrar solo aaaa-mm-dd
    const fechaFormateada = el.FechaCita.split('T')[0];

    const citaKey = `${fechaFormateada}-${el.TipoCita}-${el.EstatusCita}`;

    if (!citasUnicas.has(citaKey)) {
      citasUnicas.add(citaKey);

      const filaTabla = document.createElement('tr');
      filaTabla.innerHTML = `
          <td>${fechaFormateada}</td>
          <td>${el.TipoCita}</td>
          <td>${el.EstatusCita}</td>
        `;
      cuerpoTabla.appendChild(filaTabla);
    }
  });
  tablaCitas.appendChild(cuerpoTabla);
  const titTabla = document.createElement('h3');
  titTabla.innerText = "Tabla de citas: "
  citasArea.appendChild(titTabla);
  citasArea.appendChild(tablaCitas);
  console.log(jsonSeguimiento);

  const medicinasUnicas = new Set();
  jsonSeguimiento.forEach(el => {
    if (!medicinasUnicas.has(el.NombreMedicina)) {
      medicinasUnicas.add(el.NombreMedicina);

      const tarjetaMedicina = document.createElement('div');
      tarjetaMedicina.className = 'tarjeta-medicina';

      const nombreMedicina = document.createElement('h5');
      nombreMedicina.innerText = `Nombre: ${el.NombreMedicina}`;

      const descripcionMedicina = document.createElement('p');
      descripcionMedicina.innerText = `Descripción: ${el.Indicaciones}`;

      tarjetaMedicina.appendChild(nombreMedicina);
      tarjetaMedicina.appendChild(descripcionMedicina);

      medicinasArea.appendChild(tarjetaMedicina);
    }
  });


}
//-------------------------------DOM---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  loadMessages(mensajes);
  searchBar();
  loadNotifications(notifications);
  serviciosExtraLoad();
  seguimientoLoad();

});




