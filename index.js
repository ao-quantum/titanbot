const discord = require('discord.js');
const Client = new discord.Client;
const config = require('./config.json');
const fs = require('fs');
const getJSON = require('get-json');
const request = require('request');
const delay = require('delay');

const prefix = config.prefix

const color = config.color;
const footer = config.footer;

Client.login(config.token);

Client.on("ready", () => {
    console.log(`Bot logged in as ${Client.user.tag}`);
    console.log(`${config.name} is online on ${Client.guilds.size} servers`);
    Client.user.setStatus('dnd');
});

Client.on("ready", async () => {
    while (config.presence == true) {
        Client.user.setPresence({
            game: {
                name: 'on TitanForgedMC',
                type: "PLAYING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd'
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'Currently in Alpha',
                type: "PLAYING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd'
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'your commands',
                type: "LISTENING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd'
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: '-help',
                type: "WATCHING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd'
        })
        await delay(3000)
    };
});

//                                    GUILD MEMBER ADD/REMOVE TRIGGERS

//                                           BUILD SUCCEEDED

Client.on("guildMemberAdd", member => {
    if (config.welcomechannelenable = true) {
        var channel = member.guild.channels.get("573124496681205761");

        if (!channel) return;
        const guildmemberaddembed = new discord.RichEmbed()
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}! 🎉🎉🎉`)
        .setColor(color)
        .setFooter(footer);

        channel.send(guildmemberaddembed);
    };
});

Client.on("guildMemberRemove", member => {
    var channelname = config.welcomechannelname;

    if (config.welcomechannelenable = true) {
        var channel = member.guild.channels.get("573124496681205761");

        if (!channel) return;
        const guildMemberRemoveEmbed = new discord.RichEmbed()
        .setTitle(`Goodbye ${member.user.tag}. We will remember you!`)
        .setColor(color)
        .setFooter(footer);

        channel.send(guildMemberRemoveEmbed);
    };
});

//                                      HELP COMMAND

//                                     BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.content.startsWith((prefix) + "help")) {
        const help = new discord.RichEmbed()
        .setTitle("[required] field. <optional> field.")
        .addField("General Comamnds", "**ping** - Pong!\n**report** - Report someone on the server. -report [user] [reason]\n**status** - Shows the server status")
        .addField("Admin Commands", "**kick** - Kick someone from the server. -kick [user] <reason>\n**ban** - Ban someone from the server. -ban [user] <user>")
        .setColor(color)
        .setFooter(footer);
        msg.channel.send(help)
    }
});

//                                      KICK COMMAND

//                                     BUILD SUCCEEDED

Client.on("message", (msg) => {
    if (!msg.guild) return;

    if (msg.content.startsWith((config.prefix) + 'kick')) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) {
            msg.channel.send("You do not have permissions to do that!")
            return;
        }
        //variables
        const usertokick = msg.mentions.users.first();
        const messageArray = msg.content.split(" ")
        const args = messageArray.slice(1);
        const reason = args.join(" ").slice(22)
        
        //embeds
        const kicksucceeded = new discord.RichEmbed()
        .addField("✅ User Successfully Kicked!", `${usertokick} has been kicked successfully!`)
        .setColor(color)
        .setFooter(footer);
        const kickfail1 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `Possibly because I do not have enough permissions to ban them`)
        .setColor(color)
        .setFooter(footer);
        const kickfail2 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `The user was not found in this guild!`)
        .setColor(color)
        .setFooter(footer);
        const kickfail3 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `You didn't mention the user to kick!`)
        .setColor(color)
        .setFooter(footer);

        if (usertokick) {
            const member = msg.guild.member(usertokick); // user-who-wants-to-ban-the-bad-guy variable
            if (member) { // kick the user
                member.kick(`${member} kicked ${usertokick} for ${reason}`).then(() => {
                    msg.channel.send(kicksucceeded);
                }).catch(err => {  // unable to kick user
                    msg.channel.send(kickfail1)
                    console.log(err);
                });
            } else { // user not in guild
                msg.channel.send(kickfail2);
            }
        } else { // user not mentioned
            msg.channel.send(kickfail3);
        };
    };
});

//                                             BAN COMMAND

//                                           BUILD SUCCEEDED
Client.on("message", (msg) => {
    if (!msg.guild) return;
    // check if user has permissions
    if (msg.content.startsWith((config.prefix) + 'ban')) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.channel.send("You do not have permissions to do that!")
            return;
        }
        //variables
        const usertoban = msg.mentions.users.first(); // bad guy variable
        const messageArray = msg.content.split(" ")
        const args = messageArray.slice(1);
        const reason = args.join(" ").slice(22)
        
        //embeds
        const bansucceed = new discord.RichEmbed()
        .addField("✅ User Successfully Banned!", `${usertoban} has been banned successfully!`)
        .setColor(color)
        .setFooter(footer);
        const banfail1 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `Possibly because I do not have enough permissions to ban them`)
        .setColor(color)
        .setFooter(footer);
        const banfail2 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `The user was not found in this guild!`)
        .setColor(color)
        .setFooter(footer);
        const banfail3 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `You didn't mention the user to kick!`)
        .setColor(color)
        .setFooter(footer);

        if (usertoban) {
            const member = msg.guild.member(usertoban); // user-who-wants-to-ban-the-bad-guy variable
            if (member) { // kick the user
                member.ban(`${member} banned ${usertoban} for ${reason}`).then(() => {
                    msg.channel.send(bansucceed);
                }).catch(err => {  // unable to kick user
                    msg.channel.send(banfail1)
                    console.log(err);
                });
            } else { // user not in guild
                msg.channel.send(banfail2);
            }
        } else { // user not mentioned
            msg.channel.send(banfail3);
        };
    };
});

//                                          PING COMMAND

//                                         BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.content.startsWith((config.prefix) + 'ping')) {
        msg.channel.send(`Pong! ${Client.ping}ms`);
    };
});

//                                            STATUS COMMAND

//                                            BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.content.startsWith((prefix) + "status")) {
        const status = request('https://mcapi.xdefcon.com/server/144.217.139.188/full/json', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }

            let statusIcon;
            let statusvalue;
    
            if(body.serverStatus === "online"){
                statusIcon = "✅";
                statusvalue = "Server is Online.";
            } else if (body.serverStatus === "offline"){
                statusIcon = "❌";
                statusvalue = "Server is Offline";
            };
    
            const statusEmbed = new discord.RichEmbed()
            .addField(`${statusIcon}  -  Minecraft Server`, `${statusvalue} Ping: ${body.ping}ms.`)
            .addField(`${config.botstatus}  -  Bot Status`, `The bot is ${config.botstatusonline}`)
            .setColor(color)
            .setFooter(footer);
    
            msg.channel.send(statusEmbed);
        });
    };
});

//                                  STATUS HELP COMMAND

//                                    BUILD SUCCEEDED


Client.on("message", msg => {
if (msg.content.startsWith((prefix) + "help status"))    {
        const statushelp = new discord.RichEmbed()
        .addField('✅', 'Working/Functional/Online')
        .addField('⚠', 'Problems/Being worked on')
        .addField('❌', 'Not working/Offline/Maintenance')
        .setColor(color)
        .setFooter(footer);

        msg.channel.send(statushelp);
    };
});


//                             REPORT COMMAND

//                             BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.content.startsWith((prefix) + "report")) {
        
        // VARIABLES

        const messageArray = msg.content.split(" ")
        const args = messageArray.slice(1);
        const reason = args.join(" ").slice(22)

        const member = msg.mentions.users.first();
        const author = msg.author;

        const channel = Client.channels.get("574058435566370820"); // Channel ID
        if (!channel) return; // If its not a channel, stop

        if (!member) { // if member not found
            msg.channel.send('Invalid user or the user is not found! Make sure you mention the user!') // let user know of error
            return; // stop
        }
        
        msg.channel.send(`${member} has been reported! Thank you for letting us know!`);

        // EMBED FOR THE REPORT LOGGING

        const reportembed = new discord.RichEmbed()
        .setTitle('New Report!')
        .setDescription(`${author} has reported ${member} for "${reason}"`)
        .setColor(color)
        .setFooter(footer);

        // SEND THE REPORT TO LOGS

        channel.send(reportembed);
    }
});
