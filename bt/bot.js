const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const utf8 = require('utf8');


// replace the value below with the Telegram token you receive from @BotFather
const token = '330815897:AAEIOxM0AoyKWU5MVwWTmicAZZ5Wo2OqVZs';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});




const con = mysql.createConnection({
  host: "10.231.128.169",
  user: "eperdomo",
  password: "Telefonica2016",
  database: "wordpress",
  charset : 'utf8mb4'
});



const validacion=0;


bot.on('message', (msg) => {0
  const chatId = msg.chat.id;
  //const id=55969427;
  const id=00;
         
      if (chatId==id) {
        validacion+=1;
      }
      if (validacion>0) {
       
      
 
         bot.sendMessage(msg.chat.id, 'ACCESO DENEGADO');
            
      }
});

      
  if (validacion==0) {
       


// inicio de conexion
con.connect(function(err) {
  if (err) throw err;

 
  //------------------------------------CONSULTA A LA BASE DE DATOS

  bot.onText(/consultabd/, (msg, match) => {
  const chatId = msg.chat.id;
  con.query("SELECT * FROM larry LIMIT 5, 10", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);---- muestra datos de la bd en consola(parta pruebas servira esto)
    for (i = 0; i < result.length; i++) {
    bot.sendMessage(chatId, "id_Telegram= "+result[i].id_telegram+" nombre= "+result[i].nombre+
    " apellido= "+result[i].apellido+" mensaje= "+result[i].mensaje+" fecha= "+result[i].fecha);
    }
  });

});

//------------------------fin notificacion
//--------------------------------------------------------------

//------------------------------------INSERTAR A LA BASE DE DATOS

// CONTESTA A CUALQUIER PETICION


bot.on('message', (msg) => {

  chatId=msg.chat.id;
  fname=msg.from.first_name;
  lname=msg.from.last_name;
  id=0;
  mens=msg.text;
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

hoy = dd+'-'+mm+'-'+yyyy; 
    

  const datos =
  {
    id:id,
    id_telegram:chatId,
    nombre:fname,
    apellido:lname,
    mensaje:mens,
    fecha:hoy,

  };
  
  con.query("INSERT INTO larry SET ?", datos, function(err, rows) {
    console.log("1 fila insertada");
  
  });

  var datop = [];
    con.query("SELECT nombre FROM larry", function (err, result, fields) { 

      setValue(result[0].nombre);      
    });
  });

  function setValue(value) {
    datop = value;
  
  }
  

bot.onText(/\/start/, (msg) => {
bot.sendChatAction(msg.chat.id, "typing");    
bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
 
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": 
    [['✔️Prepago', '✔️Pospago'],   
    ['✔️Movistar TV']]
    }
});
    
});


bot.onText(/\/restart/, (msg) => {
  bot.sendChatAction(msg.chat.id, "typing");  
  bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
    
    "reply_markup": {
      "resize_keyboard": true,
      "keyboard": 
      [['✔️Prepago', '✔️Pospago'],   
      ['✔️Movistar TV']]
      }
  });
      
});


  bot.onText(/🔙 Regresar/, (msg) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
    "reply_markup": {
        "resize_keyboard": true,
        "keyboard": 
        [['✔️Prepago', '✔️Pospago'],   
        ['✔️Movistar TV']]
        }
    });
        
  }); 

// ----------------------<PREPAGO>----------------------
bot.onText(/✔️Prepago/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✔️ Oferta Comercial Prepago 📱'],
        ['✔ Paquetes 📨'],               
        ['✔️ Promociones Prepago⭐️'],
        //['Materiales digitales de apoyo 📚'],
        ['🔙 Regresar']]
        }
    });
  
});


bot.onText(/Regresar🔙/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✔️ Oferta Comercial Prepago 📱'],
        ['✔ Paquetes 📨'],               
        ['✔️ Promociones Prepago⭐️'],
        //['Materiales digitales de apoyo 📚'],
        ['🔙 Regresar']]
        }
    });
  
});

// <Oferta Comercial prepago>
bot.onText(/✔️ Oferta Comercial Prepago 📱/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅ Solo SIM'],
        ['✅ Con Terminal'],               
        ['Regresar🔙']]
        }
    });
  
});


bot.onText(/✅ Solo SIM/, (msg, match) => {

  bot.sendPhoto(msg.chat.id,"https://i.imgur.com/9PsxH6Z.png",{caption:'¡Nuestro SIM Movistar con los mejores paquetes!'});
     
});

bot.onText(/✅ Con Terminal/, (msg, match) => {

  bot.sendPhoto(msg.chat.id,"https://i.imgur.com/FoGvlnY.png",{caption:'¡Mejoramos los beneficios del Smartphone Movistar y agregamos YouTube Gratis #SinConsumirDatos para cliente LTE!'});
     
});


// <Paquetes>
bot.onText(/✔ Paquetes 📨/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅ Nuevos Paquetes LTE 💨'],
        //['✅ PDV Xius'],
        //['✅ Super Bonos Tras recarga'],
        //['✅ Preplanes Movistar'], 
        ['Regresar🔙']]
        }
    });                                                                                                                                                                  
});

bot.onText(/✅ Nuevos Paquetes LTE 💨/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/ARpnW8I.png',{caption:'Conoce nuestros nuevos paquetes LTE Prepago #SinConsumirDatos'});
     
});

/*bot.onText(/✅ PDV Xius/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/Xj287vI.png');
     
});*/

/*bot.onText(/✅ Super Bonos Tras recarga/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/rVKyKUP.png');
     
});*/

    // <✅ Preplanes Movistar>
/*bot.onText(/✅ Preplanes Movistar/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "ASelecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅ Preplanes 15 días'],
        ['✅ Preplanes 7 días'],        
        ['Regresar menú Paquetes🔙']]
        }
    });                                                                                                                                                                  
});

bot.onText(/✅ Preplanes 15 días/, (msg, match) => {
  
  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/MhjPFlc.png',{caption: 'Para funcionamiento y políticas ℹ️ visita Intranet: https://bit.ly/2NH1uMO 👨🏻‍💻'});
     
});

bot.onText(/✅ Preplanes 7 días/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/vyeB6R4.png',{caption: 'Para funcionamiento y políticas ℹ️ visita Intranet: https://bit.ly/2NH1uMO 👨🏻‍💻'});
     
});*/



// <Regresar menu paquetes>
bot.onText(/Regresar menú Paquetes🔙/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅ Nuevos Paquetes LTE 💨'],
        //['✅ PDV Xius'],
        //['✅ Super Bonos Tras recarga'],
        //['✅ Preplanes Movistar'], 
        ['Regresar🔙']]
        }
    });                                                                                                                                                                  
});



////////// <Promociones prepago>
bot.onText(/✔️ Promociones Prepago⭐️/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Prepago, selecciona una opción del menú 👇", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['⏺ Facebook y WhatsApp Ilimitados ✅'],
        ['Regresar🔙']]
        }
    });
  
});


bot.onText(/⏺ Facebook y WhatsApp Ilimitados ✅/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/OMXBkbB.png',{caption: '🗓 Vigente del 25 de Julio al 30 de Septiembre 2018.ℹ️ Más información y condiciones en Intranet: https://bit.ly/2LkU1X3 👨🏻💻'});
     
});
//////////////////

////////// <Material de apoyo>
/*bot.onText(/Materiales digitales de apoyo 📚/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅Tabla de PDV--Canales Mixtos'],
        ['✅Tabla de PDV--Tiendas y Panelitas'],        
        ['Regresar🔙']]
        }
    });
  
});


bot.onText(/✅Tabla de PDV--Canales Mixtos/, (msg, match) => {
  
  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/fR6ZwXw.png');
     
});

bot.onText(/✅Tabla de PDV--Tiendas y Panelitas/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/XqvB9w8.png');
     
});*/
//////////////////


// ----------------------<POSPAGO>-------------------------------------------------------------------------------////////////

bot.onText(/✔️Pospago/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a Pospago, selecciona una opción del menú 👇", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['✔️ Oferta Comercial Pospago ⭐️'],
                ['✔️ Promociones Pospago ⭐️'],               
                ['✔️ Materiales digitales de apoyo 📚'],              
                ['🔙 Regresar']]
        }
    });
  
});

bot.onText(/Regresar a Menú Pospago ↩️/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✔️ Oferta Comercial Pospago ⭐️'],
                ['✔️ Promociones Pospago ⭐️'],               
                ['✔️ Materiales digitales de apoyo 📚'],              
                ['🔙 Regresar']]
        }
    });
  
});

//--Oferta Comercial Pospago--//////

bot.onText(/✔️ Oferta Comercial Pospago ⭐️/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", 
    {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✅Planes Todo Incluido'],
          ['✅Planes solo SIM'],            
          ['Regresar a Menú Pospago ↩️']]
          }
      });
    
  });

bot.onText(/Regresar a Menu oferta comercial ↩️/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
        [['✅Planes Todo Incluido'],
          ['✅Planes solo SIM'],            
          ['Regresar a Menú Pospago ↩️']]
        }
    });
  
});
bot.onText(/✅Planes Todo Incluido/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", 
    {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✅ Oferta de Planes  💵'],                
          ['Regresar a Menu oferta comercial ↩️']]
          }
      });
    
  });

  bot.onText(/✅ Oferta de Planes  💵/, (msg, match) => {
  
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/RtamMtW.png');
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/Uf8B504.png',{caption:'Nuevos Todo Incluido Planes LTE con YouTube Gratis y #SinConsumirDatos. Para Oferta de terminales ingresa aquí: https://bit.ly/2qgLJD6'});
  
  });

  bot.onText(/✅Planes solo SIM/, (msg, match) => {
  
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/RtamMtW.png');
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/t70X5Ck.png',{caption:'Nuevos Planes Solo SIM LTE con YouTube Gratis y #SinConsumirDatos'});
       
  });
//--FIN Oferta Comercial Pospago--//////

//--Promociones pospago--//////
bot.onText(/✔️ Promociones Pospago ⭐️/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "¿Que deseas consultar? 🤔😄", 
    {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['🏧 1GB de Navegación Full al pagar con Cargo Básico 📆'],                
          ['Regresar a Menú Pospago ↩️']]
          }
      });
    
  });

  bot.onText(/🏧 1GB de Navegación Full al pagar con Cargo Básico 📆/, (msg, match) => {
  
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/50YTxhv.png', {caption: "A partir del 30 de Julio 2018 📆 NUEVAMENTE todos nuestros clientes obtendrán un 1GB de Navegación Full 📲 al suscribirse y pagar de forma recurrente sus facturas con Cargo Automático 💳"});
  });
//--FIN Promociones pospago--//////

//--✔️ Materiales digitales de apoyo 📚--//////
bot.onText(/✔️ Materiales digitales de apoyo 📚/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Ahora también tienes tus Plantillas y tabla de ventas en tu Smartphone. Selecciona la opción que prefieras ver.", 
    {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✅Tabla de ventas--Móviles'],
          //['✅Tabla de ventas--LTE 2GO'],
          ['¿Que es Streaming❔🤔'],                
          ['Regresar a Menú Pospago ↩️']]
          }
      });
    
  });

  bot.onText(/Regresar a Materiales Digitales ↩️/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Ahora también tienes tus Plantillas y tabla de ventas en tu Smartphone. Selecciona la opción que prefieras ver.", 
    {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✅Tabla de ventas--Móviles'],
          //['✅Tabla de ventas--LTE 2GO'],
          ['¿Que es Streaming❔🤔'],                
          ['Regresar a Menú Pospago ↩️']]
          }
      });
    
  });
 
  bot.onText(/✅Tabla de ventas--Móviles/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "¡🆕 Navega donde quieras y cuando quieras #SinConsumirDatos!");
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/wRstlha.png');
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/wMhpdkx.jpg');
       
  });

  /*bot.onText(/✅Tabla de ventas--LTE 2GO/, (msg, match) => {
  
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/gPMeqcB.png');
       
  });*/

  bot.onText(/¿Que es Streaming❔🤔/, (msg, match) => {
  
    bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/MfsbYpn.jpg');
       
  });
//--FIN ✔️ Materiales digitales de apoyo 📚--//////

// ----------------------<FIN POSPAGO>----------------------

// ----------------------<Movistar TV>----------------------
//--✔️Movistar TV--//////
bot.onText(/✔️Movistar TV/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Es nuestra TV 📺 en alta definición  con la más amplia cobertura y el mejor entretenimiento. Nuestro servicio de cable digital que funciona bajo la tecnología DTH, es decir, requiere la instalación de una antena 📡 y una caja decodificador 😎");
  bot.sendMessage(msg.chat.id, "Y eso no es todo, explora acá abajo más acerca de Movistar TV👇", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['¿Por qué somos mejores❓ 🤔✨'],
                ['La mejor oferta 🔝'],              
               ['Scripts 📢'],              
                ['🔙 Regresar']]
        }
    });
  
});

bot.onText(/Regresar a Menu TV 🔙/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Es nuestra TV 📺 en alta definición  con la más amplia cobertura y el mejor entretenimiento. Nuestro servicio de cable digital que funciona bajo la tecnología DTH, es decir, requiere la instalación de una antena 📡 y una caja decodificador 😎");
  bot.sendMessage(msg.chat.id, "Y eso no es todo, explora acá abajo más acerca de Movistar TV👇", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['¿Por qué somos mejores❓ 🤔✨'],
                ['La mejor oferta 🔝'],              
                ['Scripts 📢'],              
                ['🔙 Regresar']]
        }
    });
  
});

//--¿Por qué somos mejores? 🤔✨--//////

bot.onText(/¿Por qué somos mejores❓ 🤔✨/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Movistar TV es tu mejor opción , es fácil de usar y te da beneficios que ningún otro servicio de cable te ofrece");
  bot.sendMessage(msg.chat.id, "Estos son algunos de nuestros diferenciadores 👇", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['✅Movistar Play'],
                ['✅Guía interactiva'],             
                ['✅Recordatorios'],   
                ['✅Favoritos'],
                ['✅Control Parental'],          
                ['Regresar a Menu TV 🔙']]
        }
    });
  
});

bot.onText(/✅Movistar Play/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "Con nuestra Caja Smart HD podrás acceder a Movistar Play completamente GRATIS y disfrutar de las mejores películas y series online.");
});

bot.onText(/✅Guía interactiva/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "La más novedosa guía de programación, en la que conocerás detalles de tus programas favoritos y podrás acceder sin seleccionar un canal en específico.");
});

bot.onText(/✅Recordatorios/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "¿Te ha pasado que te pierdes tus programas favoritos? Con Movistar TV podrás programar avisos para recordarte en el momento justo que tú programa está por comenzar.");
});

bot.onText(/✅Favoritos/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "Configura los canales de tu preferencia.");
});

bot.onText(/✅Control Parental/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "Ya no tendrás que preocuparte por lo que ven tus hijos, con Movistar TV podrás bloquear y desbloquear canales de acuerdo al tipo de programación.");
});
//--FIN ¿Por qué somos mejores? 🤔✨--//////

//--La mejor oferta 🔝--//////
bot.onText(/La mejor oferta 🔝/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Con Movistar TV tendrás el mejor entretenimiento en alta definición, los mejores canales y siempre al mejor precio.");
  bot.sendMessage(msg.chat.id, "Estos son nuestros paquetes disponibles 👇", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['Paquete Premium Plus📺'],
                ['Paquete Premium📺'],             
                ['Paquete Básico📺'], 
                ['Canales Adicionales📺'],                            
                ['Regresar a Menu TV 🔙']]
        }
    });
  
});

bot.onText(/Paquete Premium Plus📺/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/UNiSXMm.png');
  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/UXasBN2.png');
     
});

bot.onText(/Paquete Premium📺/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/cyhl6gH.png');
  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/ch3JW4D.png');
     
});

bot.onText(/Paquete Básico📺/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/AuIisOK.png');
  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/1BFFd5B.png');
     
});

bot.onText(/Canales Adicionales📺/, (msg, match) => {

  bot.sendPhoto(msg.chat.id, 'https://i.imgur.com/PrDwPDR.jpg');  
     
});

//--FIN La mejor oferta 🔝--//////

//--Scripts 📢--//////
bot.onText(/Scripts 📢/, (msg, match) => {
  bot.sendChatAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Con Movistar TV tendrás el mejor entretenimiento en alta definición, los mejores canales y siempre al mejor precio.", 
  {
    "reply_markup": {
      "resize_keyboard": true,
        "keyboard": 
                [['Canales Nacionales 🇳🇮'],
                ['Factibilidad Técnica ⚙️'],             
                ['Regresar a Menu TV 🔙']]
        }
    });
  
});

bot.onText(/Canales Nacionales 🇳🇮/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "Muchas gracias por tu interés en nuestro servicio de Movistar TV 📺. Tomaremos en cuenta tu sugerencia y te invitamos desde ya a disfrutar de la mejor TV digital en alta definición📡");
});

bot.onText(/Factibilidad Técnica ⚙️/, (msg, match) => {

  bot.sendMessage(msg.chat.id, "Lamentamos informarle que por dificultades técnicas ⚙️ no será posible instalar el servicio de Movistar TV 📺 en la zona donde usted reside �. Agradecemos su comprensión🙏, y le aseguramos que estamos trabajando por nuevas opciones 🔍 para que pueda disfrutar del mejor entretenimiento en el futuro 😊");
});

///--FIN Scripts 📢--//////

// ----------------------<FIN Movistar TV>----------------------
// VALORES MAYORES Y MENORES"
bot.onText(/\/echo (..+)(..+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const resp2 = match[2];
  if (resp>resp2) {

    bot.sendMessage(chatId, "El valor mayor es: "+resp);
  }else{
    bot.sendMessage(chatId, "El valor mayor es: "+resp2);
  }

  // send back the matched "whatever" to the chat
  
});



bot.onText(/\/lolo/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hola amigo");
 
  // send back the matched "whatever" to the chat
  
});




// CONTESTA A CUALQUIER PETICION
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  
});




// fin de conexion    -------------
});
//---------------------------------------------------------------

      }