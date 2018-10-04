const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const utf8 = require('utf8');


// replace the value below with the Telegram token you receive from @BotFather
const token = '629138487:AAEoA96iBqqhgmDr6Orrbg8cxuy_IzpTEtM';

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

hoy = yyyy+'-'+mm+'-'+dd; 
    

  const datos =
  {
    id:id,
    id_telegram:chatId,
    nombre:fname,
    apellido:lname,
    mensaje:mens,
    fecha:hoy,

  };
  
  con.query("INSERT INTO empresas_usuarios SET ?", datos, function(err, rows) {
    console.log("1 fila insertada");
  
  });


  });


  

bot.onText(/\/start/, (msg) => {
bot.sendChatAction(msg.chat.id, "typing");    
bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
 
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": 
    [['✔️OFERTA COMERCIAL']]
    }
});
    
});


bot.onText(/\/restart/, (msg) => {
  bot.sendChatAction(msg.chat.id, "typing");  
  bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
    
    "reply_markup": {
      "resize_keyboard": true,
      "keyboard": 
      [['✔️OFERTA COMERCIAL']]
      }
  });
      
});


  bot.onText(/🔙 Regresar/, (msg) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Selecciona la opcion que desees consultar 👇", {
    "reply_markup": {
        "resize_keyboard": true,
        "keyboard": 
        [['✔️OFERTA COMERCIAL']]
        }
    });
        
  }); 


  // ------------------------------------------------------------<✔️OFERTA COMERCIAL>----------------------------------------------------------------------------------


  bot.onText(/✔️OFERTA COMERCIAL/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a La Oferta Comercial 👇", {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✔️Planes a la medida LTE 📱'],
          ['🔙 Regresar']]
          }
      });
    
  });

  bot.onText(/Regresar Oferta comercial 🔙/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a La Oferta Comercial 👇", {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✔️Planes a la medida LTE 📱'],
          ['🔙 Regresar']]
          }
      });
    
  });

  bot.onText(/✔️Planes a la medida LTE 📱/, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Aquí encontrarás todo lo relacionado a los Planes a la medida LTE 👇", {
      "reply_markup": {
        "resize_keyboard": true,
          "keyboard": 
          [['✔️Beneficios','✔️Planes 📱','✔️Tarifas'],
          ['✔️Consideraciones','✔️Oferta de Terminales 📱','Regresar Oferta comercial 🔙']]
          }
      });
    
  });

  bot.onText(/✔️Beneficios/, (msg, match) => {

    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/f86FbTa.png");
       
  });


  bot.onText(/✔️Planes 📱/, (msg, match) => {

    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/eb8l4fY.png");
       
  });

  bot.onText(/✔️Tarifas/, (msg, match) => {
    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/aTrqxD4.png");
    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/IdKIIQy.png");
    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/xpByHJ8.png");
       
  });

  bot.onText(/✔️Consideraciones/, (msg, match) => {

    bot.sendPhoto(msg.chat.id,"https://i.imgur.com/jSeLJCb.png");
       
  });

// fin de conexion    -------------
});
//---------------------------------------------------------------

      }