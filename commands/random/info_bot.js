const Discord = require("discord.js");
const commando = require('discord.js-commando');

class InfoCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'info',
            group: 'random',
            memberName: 'info',
            description: 'info about me, your dear, Chronos'
        });
    }

    async run(message, args){
        let botIcon = botRef.user.displayAvatarURL;
        
        let infoEmbd = new Discord.RichEmbed()
        .setTitle("Info about me!")
        .setThumbnail(botIcon)
        .setColor("#b7b7b7")
        .addField("Made by", "Nader Albert")
        .addField("Created on", botRef.user.createdAt);

        message.channel.send(infoEmbd).then(msg=>msg.delete(10000));
    }

}

module.exports = InfoCommand;