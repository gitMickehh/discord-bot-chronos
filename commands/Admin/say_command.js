const commando = require('discord.js-commando');

class SayCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'say',
            group: 'admin',
            memberName: 'say',
            description: 'make the bot say something.. might be dirty'
        });
    }

    async run(message, args){
        
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("NO! :)");

        message.delete().catch();
        message.channel.send(args);
    }

}

module.exports = SayCommand;