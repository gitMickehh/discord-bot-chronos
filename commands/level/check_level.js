const commando = require('discord.js-commando');

class CheckLevelCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'level',
            group: 'level',
            memberName: 'level',
            description: 'check your level'
        });
    }

    async run(message, args){
        message.reply('you dont have a level');
    }

}

module.exports = CheckLevelCommand;