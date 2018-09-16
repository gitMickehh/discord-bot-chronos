const Discord = require("discord.js");
const commando = require('discord.js-commando');
const fs = require("fs");
const meetings = require('../../meetings.json');

class SetupMeeting extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'setup',
            group: 'meeting',
            memberName: 'setup',
            description: 'sets up a meeting, you can set one of these four (main, side, art, dev)',
            examples: ['!setup main monday 5 pm', '!setup art friday 8 am']
        });
    }

    async run(message, args){
        //!setup main monday 5 pm
        //!setup side friday 8 am

        let argsArray = args.split(" ");
        //console.log(argsArray[0]);
        //console.log("lenght is " + argsArray.length);

        if(argsArray[0] == "main" || argsArray[0] == "art" || 
        argsArray[0] == "side" || argsArray[0] == "dev" )
        {

            if(meetings[argsArray[0]].done == "N")
            {
                return message.reply("The next meeting hasn't happened yet! if you want to clear it use !clearmeeting")
                .then(msg=>{msg.delete(5000)});
            }

            if(argsArray[1] === "sunday" || argsArray[1] === "monday" ||
            argsArray[1] === "tuesday" || argsArray[1] === "wednesday" ||
            argsArray[1] === "thursday" || argsArray[1] === "friday" ||
            argsArray[1] === "saturday"  )
            {
                //the day is written correctly
                if(!isNaN(argsArray[2]))
                {
                    //the time is a number
                    if(argsArray[3] == "am" || argsArray[3] == "pm" ||
                    argsArray[3] == "elsob7" || argsArray[3] == "belel")
                    {
                        //pm and am are correct
                        meetings[argsArray[0]].done = "N";
                        meetings[argsArray[0]].day = argsArray[1];
                        meetings[argsArray[0]].time = `${argsArray[2]} ${argsArray[3]}`;
                    
                        fs.writeFile("./meetings.json", JSON.stringify(meetings), (err) => {
                            if(err)
                                console.log(err);
                        });

                        message.reply("All set!").then(msg => msg.delete(15000));
                    }
                    else
                    {
                        //wrong am/pm
                        message.channel.send("Please Specify (am, pm)!").then(msg => msg.delete(5000));
                    }
                }
                else
                {
                    //wrong time
                    message.channel.send("Wrong Time!").then(msg => msg.delete(5000));
                }
            }
            else
            {
                //wrong day
                message.channel.send("Wrong day!").then(msg => msg.delete(5000));
            }
        }
        else
        {
            message.channel.send("Not specified! please clarify. (main, art, dev, side)");
        }
        
        

    }

}

module.exports = SetupMeeting;