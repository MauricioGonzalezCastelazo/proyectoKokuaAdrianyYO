//------------------------------Jsons------------------------------------------------------------------

const contactsURL = '/api/persona-apoyo/contactos:id';
const idToReplace = 1; // El ID que quieres usar
const updatedContactsURL = contactsURL.replace(':id', idToReplace);

const userURL = '/api/persona-apoyo/user:id';
const idToReplaceURL = 1; // El ID que quieres usar
const updateduserURL = userURL.replace(':id', idToReplaceURL);

console.log(updateduserURL);

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

  const mensajes = 
  [
      {
          id: 1, 
          id_recpetor : 1,
          id_emisor : 1, 
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
          id_recpetor : 4, 
          id_emisor : 1, 
          mensaje: [
            { "tipo": "emisor", "mensaje": "Hola" },
            { "tipo": "emisor", "mensaje": "Como has estado Ferro?" },
            { "tipo": "receptor", "mensaje": "bien" },
            { "tipo": "receptor", "mensaje": "gracias por preguntar" }
          ]
      }
  ]



//----------------------------------functions--------------------------------------------------------------

//-----------------------------------Side bar-------------------------------------------------------------- 
const loadSideBar = async () =>{
  try{
      // Encuentra todos los enlaces en el sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // Agrega un event listener a cada enlace
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previene la acción por defecto del enlace

            const contentId = this.getAttribute('href').substring(1);
            const contentToDisplay = document.getElementById(contentId);

            // Oculta todo el contenido
            document.querySelectorAll('.content').forEach(function(content) {
                content.style.display = 'none';
            });

            // Muestra el contenido correspondiente
            if (contentToDisplay) {
                contentToDisplay.style.display = 'block';
            }
        });
    });
  } catch(error){
    console.log(error);
  }
}

//-------------------------------User--------------------------------------------------------------------
const loadChatUser = async () =>{
  try{
    const response = await loadJSON(updateduserURL); 
    const jsonUser = response.data;
    console.log("Aqui va el usuario");
    const user = document.getElementsByClassName('usuario');
    jsonUser.forEach(element =>{
        const nombreUsuario = document.createElement("p"); 
        const divImg = document.createElement('div');
        divImg.className = 'imgHelp';
        divImg.innerHTML = '<ion-icon name="person-outline" class = "iconoGrandeNegrita"></ion-icon>'
        nombreUsuario.innerText = element.Nombre; 
        user[0].appendChild(divImg); 
        user[0].appendChild(nombreUsuario); 
    });
    }catch(error){
      console.log(error);
  }
}

//---------------------------chatContacts------------------------------------------------------------------
const loadChatContacts = async ()=>{
  try{
    await loadChatUser();
      const card = document.getElementsByClassName('contact');
      console.log(card);
      const response = await loadJSON(updatedContactsURL);
  
      // Obtener el primer elemento del array 'data', que contiene tus objetos
      const jsonContacts = response.data; 
      console.log(jsonContacts);
      jsonContacts.forEach(element => {
          const conversaciones = mensajes.filter(m => m.id_recpetor === element.IDPaciente);
          let ultimoMensajeTexto = "No hay mensajes";
          if (conversaciones.length > 0) {
            const ultimoMensaje = conversaciones.map(c => c.mensaje[c.mensaje.length - 1]).reduce((a, b) => (a > b ? a : b));
            ultimoMensajeTexto = ultimoMensaje.mensaje;
          }
          let hora = new Date().toLocaleTimeString(); 
          const div = document.createElement("button"); 
          const divNombre = document.createElement("div"); 
          const nombre = document.createElement("h6"); 
          const fecha = document.createElement("p"); 
          const mensaje = document.createElement("p"); 
          const salto = document.createElement("br");
          mensaje.innerText = ultimoMensajeTexto;
          mensaje.className = "ulimoMensaje";
          mensaje.appendChild(salto);
          nombre.innerText = element.Nombre;
          fecha.innerText = hora;
          div.className = 'contactArea';
          nombre.className = 'nombreContacto'; 
          fecha.className = 'fechaContacto'; 
          divNombre.appendChild(nombre); 
          divNombre.appendChild((mensaje)); 
          div.appendChild(divNombre); 
          div.appendChild(fecha);
          card[0].appendChild(div);
      });
  }catch(error){
    console.log(error);
  }
}

//--------------------load messages---------------------------------------------------------------------
const loadMessages = async(mensajes) => {
  try {
    await loadChatContacts();
    const response = await loadJSON(updatedContactsURL);
  
      // Obtener el primer elemento del array 'data', que contiene tus objetos
    const jsonContacts = response.data; 
    const areaChat = document.getElementsByClassName("chats")[0];
    const areaNombreChat = document.getElementsByClassName("nombreChat")[0];
    let contactos = document.querySelectorAll('.contactArea');

    contactos.forEach(contacto => {
      contacto.addEventListener('click', function(event) {
        // Limpiar áreas de chat y nombre del chat
        areaChat.innerHTML = '';
        areaNombreChat.innerHTML = '';

        // Obtener el nombre del contacto clickeado
        const name = contacto.querySelector('h6').textContent;

        // Encontrar el paciente correspondiente en jsonContacts
        const paciente = jsonContacts.find(p => p.Nombre === name);
        if (!paciente) {
          console.log('Paciente no encontrado:', name);
          return;
        }

        // Crear y agregar el nombre en el área del chat
        const nombreElement = document.createElement('h3');
        nombreElement.innerText = name;
        nombreElement.className = "NombreChat";
        areaNombreChat.appendChild(nombreElement);
        areaNombreChat.appendChild(document.createElement('hr'));

        // Filtrar y mostrar solo los mensajes para este paciente
        mensajes.forEach(conversacion => {
          console.log(conversacion);
          if (conversacion.id_recpetor === paciente.IDPaciente) {
            conversacion.mensaje.forEach(mensaje => {
              const mensajeElement = document.createElement("p");
              mensajeElement.innerText = mensaje.mensaje;
              mensajeElement.className = mensaje.tipo === "receptor" ? "MensajeReceptor" : "MensajeEmisor";
              areaChat.appendChild(mensajeElement);
            });
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};





const searchBar = async () =>{
  try{
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
  }catch(error){
    console.log(error);
  }
}

//---------------------------clients----------------------------------------------------------------------
const loadClients = async () =>{
  try{
    const clientsArea = document.getElementById('clients');
      let div;
      const response = await loadJSON(updatedContactsURL);
  
      // Obtener el primer elemento del array 'data', que contiene tus objetos
      const jsonContacts = response.data; 
      console.log(jsonContacts);
      jsonContacts.forEach((el, index) => {
        if (index % 7 === 0) {
          // Crea un nuevo contenedor después de cada 7 clientes
          div = document.createElement('div');
          div.id = 'clientes';
          clientsArea.appendChild(div);
        }
      
        const div1 = document.createElement('div');
        const name = document.createElement('p');
        name.innerText = el.Nombre;
        name.className = 'clientName';
        const divImg = document.createElement('div');
        divImg.className = 'imgHelp1';
        divImg.innerHTML = '<ion-icon name="person-outline" class = "iconoGrandeNegrita"></ion-icon>'
        divImg.addEventListener('click', function () {
          const clienteWindow = window.open('', '_blank', 'width=400,height=400,scrollbars=yes,resizable=yes');
          clienteWindow.document.write(`
            <html>
              <head>
                <title>${el.Nombre}</title>
                <link rel="stylesheet" href="style.css" />
              </head>
              <body>
                <div class="blockClient">
                  <h1>${el.Nombre}</h1>
                  <p><h3>Padecimiento: </h3> ${el.Padecimento}</p>
                  <p><h3>Estatus: </h3> ${el.EstatusPaciente}</p>
                  <!-- Puedes agregar más elementos para mostrar otros detalles del cliente si es necesario -->
                </div>
              </body>
            </html>
          `);
        });

        div1.appendChild(divImg);
        div1.appendChild(name);
        div1.className = 'BloqueCliente';
        div.appendChild(div1);
      });
    }catch(error)
    {
      console.log(error);
    }
     
}

//--------------------------notifications---------------------------------------------------------
const loadNotifications = async (notifications) =>{
  try{
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
    
      
        botonBorrar.addEventListener('click', function(event) {
          const notificationId = divNotification.getAttribute('data-id');
          console.log(notificationId);
          divNotification.classList.add('desvanecer');
          divNotification.addEventListener('animationend', function() {
            divNotification.remove();
        
            // Realizar la petición HTTP DELETE (comentada por ahora)
            /*
            fetch('https://tuapi.com/notifications/' + notificationId, {
              method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
              console.log('Notificación eliminada:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
            */
          });
        });
    });
    
  }catch(error)
  {
    console.log(error);
  }

}





//-------------------------------DOM---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  loadSideBar();
  loadMessages(mensajes);
  searchBar();
  loadClients();
  loadNotifications(notifications);

 /*
  Promise.all([
  loadJSON(contactsURL),
  loadJSON(userURL),
  loadJSON(mensajesURL)
])
  .then(([jsonContacts, jsonUser, mensajes]) => {
    // Aquí puedes trabajar con los tres JSON cargados
    loadMessages(jsonContacts, jsonUser, mensajes);
    loadClients(jsonContacts);

    // Puedes realizar operaciones adicionales con los JSON según tus necesidades
  })
  .catch(error => {
    // Manejar errores en la carga de JSON
    console.error('Error al cargar JSON:', error);
  });

 */


  /*
    //notifications
    fetch(url)
    .then(response =>{
      if(!response.ok){
        throw new Error('Error de red ${responde.status}');
      }
      return responde.json;

    })
    .then(data =>{
      var notifications = data; 
      notif(notifications);
    })
  */

});




