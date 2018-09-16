const Discord = require("discord.js");
const commando = require('discord.js-commando');
const meetings = require('../../meetings.json');

class ShowMeeting extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'meetings',
            group: 'meeting',
            memberName: 'meetings',
            description: 'shows upcoming meetings',
            examples: ['!meetings']
        });
    }

    async run(message, args){

        let meetingembd = new Discord.RichEmbed()
        .setTitle("Meetings! 🍔")
        .setColor("#3ed1bb");

        if(meetings["main"].done == "N")
        {
            let meetingdate = `${meetings["main"].day} ${meetings["main"].time}`;
            meetingembd.addField("Main Meeting", meetingdate);
        }

        if(meetings["side"].done == "N")
        {
            let meetingdate = `${meetings["side"].day} ${meetings["side"].time}`;
            meetingembd.addField("Side Meeting", meetingdate);
        }

        if(meetings["art"].done == "N")
        {
            let meetingdate = `${meetings["art"].day} ${meetings["art"].time}`;
            meetingembd.addField("Art Meeting", meetingdate);
        }

        if(meetings["dev"].done == "N")
        {
            let meetingdate = `${meetings["dev"].day} ${meetings["dev"].time}`;
            meetingembd.addField("Dev Meeting", meetingdate);
        }

        return message.channel.send(meetingembd);
    }

}

module.exports = ShowMeeting;