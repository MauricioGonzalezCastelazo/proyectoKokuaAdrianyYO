
// Variable global para almacenar el contacto actualmente seleccionado

document.addEventListener('DOMContentLoaded', function() {
    let contactoSeleccionado = null;
    const areaChat = document.getElementsByClassName("chats");
    const jsonContacts = [
        {id: 1,name:"Pepe", image: "https://docplayer.es/docs-images/78/77688057/images/13-0.jpg", ultimoMensaje:"hola"}, 
        {id: 2, name: "Jaime", image: "https://0.academia-photos.com/5311653/2334388/2722471/s200_yoel.ledo_mezquita.jpg",ultimoMensaje :"hola"} , 
        {id: 3, name: "Pedro", image: "https://media.licdn.com/dms/image/C4D03AQFSEtnHKtedeA/profile-displayphoto-shrink_400_400/0/1516821438738?e=2147483647&v=beta&t=h3QIgarKGadV3CcfCzED6kqwt33nNXS2_phxfJlFzAA", ultimoMensaje:"hola"},
        {id: 4, name: "Ledo", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", ultimoMensaje:"hola"}, 
        {id: 5, name: "Legui", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", ultimoMensaje:"hola"}, 
        {id: 6, name: "Ferro", image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ardilla_gris_mexicana.JPG", ultimoMensaje:"hola"}];
    
    
    
        const jsonUser = [{id: 1,name:"Yoel Ledo", image:"https://static.wixstatic.com/media/986f3c_b2610ec8774ce28d231972e92b2bd544.jpg/v1/fill/w_430,h_240,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/986f3c_b2610ec8774ce28d231972e92b2bd544.jpg"}];
    
        const mensajes = 
        [
            {
                id: 1, 
                id_recpetor : 1,
                id_emisor : 1, 
                mensaje: [
                    {
                        emisor: "hola", 
                        receptor: "hola amigo"
                    }, 
                    {
                        receptor: "como has estado?", 
                        emisor: "Bien y tu?"
                    }, 
                    {
                        receptor: "como has estado?", 
                        emisor: "Bien y tu?"
                    },
                    {
                        receptor: "como has estado?", 
                        emisor: "Bien y tu?"  
                    }
                ]
            }, 
            {
                id: 2, 
                id_recpetor : 6, 
                id_emisor : 1, 
                mensaje: [
                    {
                        emisor: "hola Ferro", 
                        receptor: "hola amigo"
                    }
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
    
    
        //-------------------------------Sidebar----------------------------------------------------------------
    
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
    
        //-----------------------------------Chat------------------------------------------------------------
         const card = document.getElementsByClassName('contact');
         console.log(card);
         jsonContacts.forEach(element => {
            let hora = new Date(); 
            hora = hora.toLocaleDateString('en-US'); 
            const div = document.createElement("button"); 
            const divNombre = document.createElement("div"); 
            const imagen = document.createElement("img");
            const nombre = document.createElement("h6"); 
            const fecha = document.createElement("p"); 
            const ultimoMensaje = document.createElement("p"); 
            const salto = document.createElement("br");
            ultimoMensaje.innerText = element.ultimoMensaje; 
            ultimoMensaje.className = "ulimoMensaje";
            ultimoMensaje.appendChild(salto);
            nombre.innerText = element.name;
            fecha.innerText = hora;
            div.className = 'contactArea';
            nombre.className = 'nombreContacto'; 
            imagen.className = 'imagenContacto'; 
            fecha.className = 'fechaContacto'; 
            imagen.src = element.image; 
            divNombre.appendChild(nombre); 
            divNombre.appendChild((ultimoMensaje)); 
            div.appendChild(imagen); 
            div.appendChild(divNombre); 
            div.appendChild(fecha);
            card[0].appendChild(div);
         });
    
         const user = document.getElementsByClassName('usuario');
         jsonUser.forEach(element =>{
            const imagenUsuario = document.createElement("img"); 
            const nombreUsuario = document.createElement("p"); 
            imagenUsuario.src = element.image; 
            imagenUsuario.className = "profilePhoto"; 
            nombreUsuario.innerText = element.name; 
            user[0].appendChild(imagenUsuario); 
            user[0].appendChild(nombreUsuario); 
         }); 
    
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
              
              mensajes.forEach(el1 =>{
                    jsonContacts.forEach(el2 =>{
                        if(el2.id === el1.id_recpetor && name === el2.name)
                        {
                            el1.mensaje.forEach(el3 =>{
                                const mensajeReceptor = document.createElement("p"); 
                                mensajeReceptor.innerText = el3.receptor; 
                                mensajeReceptor.className = "MensajeReceptor"; 
                                const mensajeEmisor = document.createElement("p");
                                mensajeEmisor.innerText = el3.emisor; 
                                mensajeEmisor.className = "MensajeEmisor"; 
                                areaChat[0].appendChild(mensajeReceptor);
                                areaChat[0].appendChild(mensajeEmisor);
                            
                            });   
                        }
                    })
              }); 
            });
         });
    
         //-------------------------------Clientes----------------------------------------------------------------
         const clientsArea = document.getElementById('clients'); 
         let div = document.createElement('div'); 
         let contador = 0; 
         div.id = 'clientes';
         jsonContacts.forEach(el =>{
            const div1 = document.createElement('div');
            const name = document.createElement('p'); 
            const image = document.createElement('img'); 
            name.innerText = el.name; 
            image.src = el.image; 
            name.className = 'clientName'; 
            image.className = 'clientImage'; 
            div1.appendChild(image); 
            div1.appendChild(name); 
            div1.className = "BloqueCliente";
            if(contador >= 7)
            {
                contador = 0; 
                clientsArea.appendChild(div);
                div = document.createElement('div'); 
                div.id = 'clientes';
                div.appendChild(div1);
            }
            else{
                div.appendChild(div1); 
            }
            contador++; 
         });   
         clientsArea.appendChild(div);
    
         //---------------------------Notifications----------------------------------------------------------------
         const notificationArea = document.getElementById('notifications'); 
         notifications.forEach(el =>{
            const line = document.createElement('hr');
            line.className = "lineaNot";
            const divTituloMensaje  = document.createElement('div'); 
            divTituloMensaje.className = "notificacionTituloDescripcion"; 
            const divHora = document.createElement('div'); 
            divHora.className = "divHoraNotificacion"; 
            const divNotification = document.createElement('div'); 
            divNotification.className = "divNotificacion"; 
            const point = document.createElement('div');
            point.className = "ponitNotificacion";
    
            const notification = document.createElement('p');
            notification.innerText = el.notification; 
            notification.className = "titleNotification"; 
            const time = document.createElement('p');
            time.innerText = el.time;  
            time.className = "timeNotification"; 
            const description = document.createElement('p');
            description.innerText = el.description; 
            description.className = "descriptionNotification"; 
    
            divTituloMensaje.appendChild(point); 
            divTituloMensaje.appendChild(notification);
            divTituloMensaje.appendChild(description); 
            divHora.appendChild(time); 
            divNotification.appendChild(divTituloMensaje); 
            divNotification.appendChild(divHora); 
            notificationArea.appendChild(line);
            notificationArea.appendChild(divNotification); 
            notificationArea.appendChild(line);
         }); 
    
    });
    
    