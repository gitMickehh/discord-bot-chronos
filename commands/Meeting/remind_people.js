const Discord = require("discord.js");
const commando = require('discord.js-commando');
const fs = require("fs");
const meetings = require('../../meetings.json');

class RemindMembers extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'remind',
            group: 'meeting',
            memberName: 'remind',
            description: 'Reminds people about the upcoming meeting, doesnt remind people for SIDE meeting ',
            examples: ['!remind art', '!remind all', '!remind main']
        });
    }

    async run(message, args){

        if(args == "main")
        {
            //remind everyone in the server

            if(meetings["main"].done == "Y")
            {
                message.reply("No upcoming main meeting! use (!setup) if you want to set a meeting up!")
                .then(msg => msg.delete(10000));
                return;
            }

            let membersArr = message.guild.members.array();
            for (let i = 0; i < membersArr.length; i++) {
                membersArr[i].send("Hi!\nI'm here to remind you that there's a meeting at " + meetings["main"].time + ".");                
            }
        }
        else if(args == "art")
        {
            //remind all people with role art
            if(meetings["art"].done == "Y")
            {
                message.reply("No upcoming art meeting! use (!setup) if you want to set a meeting up!")
                .then(msg => msg.delete(10000));
                return;
            }

            //filter them by role?....
        }
        else if(args == "dev")
        {
            //reminds all people with the role developer
            if(meetings["dev"].done == "Y")
            {
                message.reply("No upcoming dev meeting! use (!setup) if you want to set a meeting up!")
                .then(msg => msg.delete(10000));
                return;
            }

            //filter them by role?....
        }
        else
        {
            message.reply("Please specify! (main, art, dev)")
                .then(msg => msg.delete(10000));
                return;
        }
    }

}

module.exports = RemindMembers;