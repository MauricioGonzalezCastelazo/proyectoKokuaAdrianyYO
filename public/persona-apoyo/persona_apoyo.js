//------------------------------Jsons------------------------------------------------------------------
/*
const contactsURL = 'ruta/contacts.json';
const userURL = 'ruta/user.json';
const mensajesURL = 'ruta/mensajes.json';

// Función para cargar un archivo JSON
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
    });
}

*/

const jsonContacts = [
  {id: 1,name:"Pepe", image: "https://docplayer.es/docs-images/78/77688057/images/13-0.jpg", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Paciente"}, 
  {id: 2, name: "Jaime", image: "https://0.academia-photos.com/5311653/2334388/2722471/s200_yoel.ledo_mezquita.jpg", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Paciente"} , 
  {id: 3, name: "Pedro", image: "https://media.licdn.com/dms/image/C4D03AQFSEtnHKtedeA/profile-displayphoto-shrink_400_400/0/1516821438738?e=2147483647&v=beta&t=h3QIgarKGadV3CcfCzED6kqwt33nNXS2_phxfJlFzAA", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Paciente"},
  {id: 4, name: "Ledo", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Candidato a Paciente"}, 
  {id: 5, name: "Legui", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Paciente"}, 
  {id: 6, name: "Ferro", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", doctor: "Juan Perez", ultima_cita: "2021-10-21", proxima_cita: "2021-10-21", status: "Paciente"}];


  const jsonUser = [
      {id: 1,name:"Yoel Ledo", image:"https://static.wixstatic.com/media/986f3c_b2610ec8774ce28d231972e92b2bd544.jpg/v1/fill/w_430,h_240,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/986f3c_b2610ec8774ce28d231972e92b2bd544.jpg"}
  ];

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
          id_recpetor : 6, 
          id_emisor : 1, 
          mensaje: [
            { "tipo": "emisor", "mensaje": "Hola" },
            { "tipo": "emisor", "mensaje": "Como has estado Ferro?" },
            { "tipo": "receptor", "mensaje": "bien" },
            { "tipo": "receptor", "mensaje": "gracias por preguntar" }
          ]
      }
  ]

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
const loadChatUser = async (jsonUser) =>{
  try{
    const user = document.getElementsByClassName('usuario');
    await jsonUser.forEach(element =>{
        const imagenUsuario = document.createElement("img"); 
        const nombreUsuario = document.createElement("p"); 
        imagenUsuario.src = element.image; 
        imagenUsuario.className = "profilePhoto"; 
        nombreUsuario.innerText = element.name; 
        user[0].appendChild(imagenUsuario); 
        user[0].appendChild(nombreUsuario); 
    });
    }catch(error){
      console.log(error);
  }
}

//---------------------------chatContacts------------------------------------------------------------------
const loadChatContacts = async (jsonContacts, jsonUser)=>{
  try{
    await loadChatUser(jsonUser);
      const card = document.getElementsByClassName('contact');
      console.log(card);
      await jsonContacts.forEach(element => {
          const conversaciones = mensajes.filter(m => m.id_recpetor === element.id || m.id_emisor === element.id);
          let ultimoMensajeTexto = "No hay mensajes";
          if (conversaciones.length > 0) {
            const ultimoMensaje = conversaciones.map(c => c.mensaje[c.mensaje.length - 1]).reduce((a, b) => (a > b ? a : b));
            ultimoMensajeTexto = ultimoMensaje.mensaje;
          }
          let hora = new Date().toLocaleTimeString(); 
          const div = document.createElement("button"); 
          const divNombre = document.createElement("div"); 
          const imagen = document.createElement("img");
          const nombre = document.createElement("h6"); 
          const fecha = document.createElement("p"); 
          const mensaje = document.createElement("p"); 
          const salto = document.createElement("br");
          mensaje.innerText = ultimoMensajeTexto;
          mensaje.className = "ulimoMensaje";
          mensaje.appendChild(salto);
          nombre.innerText = element.name;
          fecha.innerText = hora;
          div.className = 'contactArea';
          nombre.className = 'nombreContacto'; 
          imagen.className = 'imagenContacto'; 
          fecha.className = 'fechaContacto'; 
          imagen.src = element.image; 
          divNombre.appendChild(nombre); 
          divNombre.appendChild((mensaje)); 
          div.appendChild(imagen); 
          div.appendChild(divNombre); 
          div.appendChild(fecha);
          card[0].appendChild(div);
      });
  }catch(error){
    console.log(error);
  }
}

//--------------------load messages---------------------------------------------------------------------
const loadMessages = async(jsonContacts, jsonUser, mensajes) => {
  try{
    const areaChat = document.getElementsByClassName("chats");
    await loadChatContacts(jsonContacts, jsonUser);
    let contacto = document.querySelectorAll('.contactArea');
      const area = document.getElementsByClassName("nombreChat"); 
      contacto.forEach(el =>{
        el.addEventListener('click', function(event){
          for (let i = 0; i < area.length; i++) {
              const areas = area[i];
            
              // Borra todos los hijos del elemento
              while (areas.firstChild) {
                areas.removeChild(areas.firstChild);
              }
            }
            for (let i = 0; i < areaChat.length; i++) {
              const areas = areaChat[i];
            
              // Borra todos los hijos del elemento
              while (areas.firstChild) {
                areas.removeChild(areas.firstChild);
              }
            }
            const name = el.querySelector('h6').textContent; 
            const nombre = document.createElement('h3'); 
            const linea = document.createElement('hr'); 
            nombre.innerText = name;
            nombre.className = "NombreChat"; 
            area[0].appendChild(nombre);  
            area[0].appendChild(linea); 
            for (const el1 of mensajes) {
              for (const el2 of jsonContacts) {
                  if (el2.id === el1.id_recpetor && name === el2.name) {
                      for (const el3 of el1.mensaje) {
                          const mensajeElement = document.createElement("p");
                          
                          if (el3.tipo === "receptor") {
                              mensajeElement.innerText = el3.mensaje;
                              mensajeElement.className = "MensajeReceptor";
                          } else if (el3.tipo === "emisor") {
                              mensajeElement.innerText = el3.mensaje;
                              mensajeElement.className = "MensajeEmisor";
                          }
          
                          areaChat[0].appendChild(mensajeElement);
                      }
                  }
              }
          }
            
            
          });
      });
  }catch(error){
    console.log(error);
  }
}

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
const loadClients = async (jsonContacts) =>{
  try{
    const clientsArea = document.getElementById('clients');
      let div;
      
      await jsonContacts.forEach((el, index) => {
        if (index % 7 === 0) {
          // Crea un nuevo contenedor después de cada 7 clientes
          div = document.createElement('div');
          div.id = 'clientes';
          clientsArea.appendChild(div);
        }
      
        const div1 = document.createElement('div');
        const name = document.createElement('p');
        const image = document.createElement('img');
        name.innerText = el.name;
        image.src = el.image;
        name.className = 'clientName';
        image.className = 'clientImage';
      
        image.addEventListener('click', function () {
          const clienteWindow = window.open('', '_blank', 'width=400,height=400,scrollbars=yes,resizable=yes');
          clienteWindow.document.write(`
            <html>
              <head>
                <title>${el.name}</title>
                <link rel="stylesheet" href="style.css" />
              </head>
              <body>
                <div class="blockClient">
                  <h1>${el.name}</h1>
                  <img src="${el.image}" alt="${el.name}" class = "imageClientWindow"/>
                  <p><h5>Doctor: </h5>${el.doctor}</p>
                  <p><h5>Ultima cita: </h5>${el.ultima_cita}</p>
                  <p><h5>Próxima cita: </h5>${el.proxima_cita}</p>
                  <p><h5>Status: </h5>${el.status}</p>
                  <!-- Puedes agregar más elementos para mostrar otros detalles del cliente si es necesario -->
                </div>
              </body>
            </html>
          `);
        });
      
        div1.appendChild(image);
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
  loadMessages(jsonContacts, jsonUser, mensajes);
  searchBar();
  loadClients(jsonContacts);
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




