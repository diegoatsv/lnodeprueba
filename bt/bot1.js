const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const utf8 = require('utf8');


// replace the value below with the Telegram token you receive from @BotFather
const token = '658245001:AAGAdEAQqVnqdzMEDpgmlklzMBMOBYrId5Q';

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
  
  con.query("INSERT INTO consultaos_usuarios SET ?", datos, function(err, rows) {
    console.log("1 fila insertada");
  
  });

});
  

bot.onText(/\/start/, (msg) => {
bot.sendChatAction(msg.chat.id, "typing");    
bot.sendMessage(msg.chat.id, "Hola "+fname+" 👋🏼 soy TiVi, yo te ayudaré a estar al tanto de los clientes que adquirieron nuestros servicios de Movistar TV\nPara realizar una busqueda la puedes hacer por medio del nombre completo 📲 del cliente 👫\nAdelante: 👨‍💻👩‍💻",);
    
});


bot.onText(/\/restart/, (msg) => {
  bot.sendChatAction(msg.chat.id, "typing");  
  bot.sendMessage(msg.chat.id, "Hola "+fname+" 👋🏼 soy TiVi, yo te ayudaré a estar al tanto de los clientes que adquirieron nuestros servicios de Movistar TV\nPara realizar una busqueda la puedes hacer por medio del nombre completo 📲 del cliente 👫\nAdelante: 👨‍💻👩‍💻",);
      
});



// CONTESTA A CUALQUIER PETICION
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var consulta = msg.text;

  con.query("SELECT * FROM consultaos where nombre like '%" +consulta+ "%' LIMIT 5", function (err, result, fields) {
    if (err) throw err;
    
    else if (result.length == 1) {
    for (i = 0; i < result.length; i++) {
    bot.sendMessage(chatId, "✔️ Número de caso: "+result[i].os+"\n✔️ Nombre: "+result[i].nombre+
    "\n✔️ Fecha: "+result[i].fecha+"\n✔️ Estado: "+result[i].estado+"\n✔️ Visita: "+result[i].visita);
    }
    bot.sendMessage(msg.chat.id, "🔎 Encontre este resultado ✅ recuerda siempre utilizar el nombre y apellido completo ❗️",);
    }

    else if (result.length == 2) {
        for (i = 0; i < result.length; i++) {
        bot.sendMessage(chatId, "✔️ Número de caso: "+result[i].os+"\n✔️ Nombre: "+result[i].nombre+
        "\n✔️ Fecha: "+result[i].fecha+"\n✔️ Estado: "+result[i].estado+"\n✔️ Visita: "+result[i].visita);
        }
        setTimeout((function() {bot.sendMessage(msg.chat.id, "🔎 Encontre estos resultados ✅ recuerda siempre utilizar el nombre y apellido completo ❗️",);}), 2000);
        }
    
        else if (result.length > 2) {
            
            for (i = 0; i < result.length; i++) {
            bot.sendMessage(chatId, "✔️ Número de caso: "+result[i].os+"\n✔️ Nombre: "+result[i].nombre+
            "\n✔️ Fecha: "+result[i].fecha+"\n✔️ Estado: "+result[i].estado+"\n✔️ Visita: "+result[i].visita);
            }
            
           setTimeout((function() {bot.sendMessage(msg.chat.id, "🔎 Encontre estos resultados para "+consulta+" ✅ recuerda siempre utilizar el nombre y apellido completo ❗️",);
          }), 2000);
        }


            else  {
                
                bot.sendMessage(msg.chat.id, "Ups ...  no encontre ningún resultado🤦🏻‍♀️🤦🏻‍♂️,  recuerda siempre utilizar el nombre y  apellido completo ❗️❗️",);
                }
  });
  
});




// fin de conexion    -------------
});
//---------------------------------------------------------------

      }