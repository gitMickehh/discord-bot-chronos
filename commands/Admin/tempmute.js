const Discord = require("discord.js");
const commando = require('discord.js-commando');
const ms = require("ms");

class TempMuteCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'tempmute',
            group: 'admin',
            memberName: 'tempmute',
            description: 'make ayman or anyone muted for some time'
        });
    }

    async run(message, args){
        
        //!tempmute @user 8s/300s (max is 5m)
        let argsArray = args.split(" ");
        
        /*
            let tomute = message.mentions.members.first() || message.guild.members.get(argsArray[0]);

        if(!tomute)
            return message.reply("couldn't find the user");
        
        if(tomute.hasPermission("MANAGE_MESSAGES"))
            return message.reply(`Can't mute ${tomute}`);

        let muterole = message.guild.roles.find(`name`,"muted");

        //create role if it doesn't exist
        if(!muterole)
        {
            try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
            }catch(e)
            {
                console.log(e.stack);
            }
        }//end of creating role
        
        let mutetime = argsArray[1];
        console.log("mute time "+ argsArray[1]);

        if(!mutetime)
            return message.reply("You didn't specify time!");

        if(mutetime.split("")[1] == "s" || parseInt(mutetime.split("")[0]) <= 300)
        {
            await(tomute.addRole(muterole.id));
            message.channel.send(`${tomute} has been muted for ${mutetime}.`);

            setTimeout(function(){
                tomute.removeRole(muterole.id);
                message.channel.send(`${tomute} is unmuted now!`);
            },ms(mutetime));
        }

        */

       let tomute = message.mentions.members.first() || message.guild.members.get(argsArray[0]);
    
       let replies = [
            "no", `I have muted ${tomute} for you for a thousand years.`, 
            `${tomute} will never say a word again in this channel.`, `@everyone don't talk to ${tomute}!!.`
        ];

        let randomReply = Math.floor(Math.random()*replies.length);
        message.reply(replies[randomReply]);
    }

}

module.exports = TempMuteCommand;