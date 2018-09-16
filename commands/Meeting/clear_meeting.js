const Discord = require("discord.js");
const commando = require('discord.js-commando');
const fs = require("fs");
const meetings = require('../../meetings.json');

class ClearMeeting extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'clearmeeting',
            group: 'meeting',
            memberName: 'clearmeeting',
            description: 'clears up a reserved meeting',
            examples: ['!clearmeeting main', '!clearmeeting all']
        });
    }

    async run(message, args){
        //!clearmeeting main
        //!clearmeeting all
        //!clearmeeting side

        if(args == "main" || args == "side" || args == "art" || args == "dev")
        {
            meetings[args].done = "Y";
            message.reply("Cleared! 😁").then(msg=>msg.delete(10000));

            fs.writeFile("./meetings.json", JSON.stringify(meetings), (err) => {
                if(err)
                    console.log(err);
            });
        }
        else if(args == "all")
        {
            meetings["main"].done = "Y";
            meetings["side"].done = "Y";
            meetings["art"].done = "Y";
            meetings["dev"].done = "Y";

            message.reply("Cleared Everything! 😁").then(msg=>msg.delete(10000));

            fs.writeFile("./meetings.json", JSON.stringify(meetings), (err) => {
                if(err)
                    console.log(err);
            });
        }
        else
        {
            message.reply("Please clarify (main, side, art, dev)").then(msg=>msg.delete(10000));
        }

    }

}

module.exports = ClearMeeting;