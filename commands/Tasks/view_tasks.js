const Discord = require("discord.js");
const commando = require('discord.js-commando');

class ViewTasks extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'tasks',
            group: 'tasks',
            memberName: 'tasks',
            description: 'view tasks'
        });
    }

    async run(message, args){
        
    }

}

module.exports = ViewTasks;