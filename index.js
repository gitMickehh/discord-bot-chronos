const Discord = require('discord.js');
const commando = require('discord.js-commando');
const tokenFile = require('./tokenFile.json');
const botconfig = require('./botconfig.json');
const fs = require("fs");

const TOKEN = tokenFile.token;
const bot = new commando.Client();

global.botRef = bot;

//coins
const coinsDB = require('./coinsDB.json');


function coinChance(message)
{
    if(message.author.bot)
    {
        //the sender is a bot
        return;
    }

    if(!coinsDB[message.author.id])
    {
        coinsDB[message.author.id] = {
            coins: 0
        }

        fs.writeFile("./coinsDB.json", JSON.stringify(coinsDB), (err) => {
            if(err)
                console.log(err);
        });
    }

    let randomRoll = Math.random();
    //3% chance to get a coin
    if(randomRoll >= 0.35 && randomRoll <= 0.38)
    {
        coinsDB[message.author.id].coins = coinsDB[message.author.id].coins + botconfig.coinGain;
        
        /*let coinEmbd = new Discord.RichEmbed()
        .setTitle("Coin Gained! :moneybag:")
        .setColor("#ffe99d")
        .addField("Member", message.author, true)
        .addField("Amount", botconfig.coinGain, true);

        message.channel.send(coinEmbd);
*/
        message.channel.send(`${message.author} gained ${botconfig.coinGain} coins! :moneybag: `);
        
        fs.writeFile("./coinsDB.json", JSON.stringify(coinsDB), (err) => {
            if(err)
                console.log(err);
        });
    }
}


//bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroups([
    ['admin','Admin'],
    ['meeting','Meeting'],
    ['tasks','Tasks'],
    ['poll','Poll'],
    ['random', 'Random'],
    ['coins', 'Coins'],
	['level', 'Level']
]);

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on("ready", async() =>{
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Raskulls meetings", {type: "LISTENING"});
});

bot.on("message", async message =>{
    coinChance(message);
});

bot.login(TOKEN);