const Discord = require("discord.js");
const commando = require('discord.js-commando');
const fs = require("fs");
const polls = require('../../polls.json');

class ShowPolls extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'polls',
            group: 'poll',
            memberName: 'polls',
            description: 'shows all active polls',
        });
    }

    async run(message, args){
        
        let pollsEmbd = new Discord.RichEmbed()
        .setTitle("Active Polls")
        .setColor("#ffd132");

        let pollID = 0;
        while(polls[pollID.toString()])
        {
            let currentPoll = polls[pollID.toString()];
            
            if(currentPoll.active == "Y")
            {
                pollsEmbd.addField(currentPoll.pollTitle, currentPoll.pollShortcut);
            }

            pollID++;
        }

        pollsEmbd.setFooter("To end any poll use !endpoll then the shortcut");
        message.channel.send(pollsEmbd);
    }


}

module.exports = ShowPolls;