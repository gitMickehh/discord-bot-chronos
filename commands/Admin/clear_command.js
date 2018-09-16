const commando = require('discord.js-commando');

class ClearCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'clear',
            group: 'admin',
            memberName: 'clear',
            description: 'make the bot clear a few lines in the chat'
        });
    }

    async run(message, args){
        //!clear 15
        
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("no no no no no.");

        if(!isNaN(args))
        {
            if(args >= 100)
            {
                args = 99;
            }

            message.channel.bulkDelete(parseInt(args) + 1).then(()=>{
                message.channel.send(`Cleared ${args} messages!`)
                .then(msg => msg.delete(2000));
            });
        }
    }

}

module.exports = ClearCommand;