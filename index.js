const discord = require('discord.js');
const Client = new discord.Client;
const config = require('./config.json');
const antispam = require('discord-anti-spam');
const fs = require('fs');
const getJSON = require('get-json');
const request = require('request');
const delay = require('delay');
const mysql = require('mysql');

const prefix = config.prefix

const color = config.color;
const footer = config.footer;

Client.login('NTc2OTUwMzA4Mjc4ODk0NjIy.XNd9cg.RFPLebQp-x6UO-rMxIs-clE7vrQ').catch(console.error);

const con = mysql.createConnection({
    host: "54.39.133.237",
    database: "customer_77991",
    user: "customer_77991",
    password: "7987273d7e",
    charset: "utf8mb4_unicode_ci"
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to MySql database");
});

Client.on("ready", () => {
    console.log(`Bot logged in as ${Client.user.tag}`);
    console.log(`${config.name} is online on ${Client.guilds.size} servers`);
    Client.user.setStatus('dnd');

    //          ANTI SPAM

    antispam(Client, {
        warnBuffer: 4, // Maximum ammount of messages allowed to send in the interval time before getting warned.
        maxBuffer: 10, // Maximum amount of messages allowed to send in the interval time before getting banned.
        interval: 2000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
        warningMessage: "please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
        banMessage: "has banished from the server due to spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
        maxDuplicatesWarning: 5,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
        maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
        deleteMessagesAfterBanForPastDays: 7, // Deletes the message history of the banned user in x days.
        exemptRoles: ["Bots", "Staff"], // Name of roles (case sensitive) that are exempt from spam filter.
        exemptUsers: [] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
      });
});

Client.on("message", msg => {
    Client.emit("checkMessage", msg);
})

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
        var channel = member.guild.channels.get(config.welcomechannel);

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
        var channel = member.guild.channels.get(config.welcomechannel);

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
    if (msg.author.bot) return;
    if (msg.content === (prefix) + 'help') {
        const help = new discord.RichEmbed()
        .setTitle("[required] field. <optional> field.")
        .addField("General Comamnds", "**ping** - Pong!\n**report** - Report someone on the server. -report [user] [reason]\n**status** - Shows the server status\n**xp** - Shows your or the specified user's XP\n**new** - Opens a new support ticket\n**close** - Closes a ticket")
        .addField("Admin Commands", "**kick** - Kick someone from the server. -kick [user] <reason>\n**ban** - Ban someone from the server. -ban [user] <reason>")
        .setColor(color)
        .setFooter(footer);
        msg.channel.send(help)
    }
});

//                                     XP LEVEL SYSTEM

//                                      BUILD SUCCEEDED

function generateXp() {
    let max = 10;
    let min = 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Client.on("message", msg => {
    if (msg.author.bot) return;
    con.query(`SELECT * FROM titanbot_xp WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql

        if (rows.length < 1) {
            sql = `INSERT INTO titanbot_xp (id, xp) VALUES ('${msg.author.id}', ${generateXp()})`;
        } else {
            let xp = rows[0].xp;
            
            sql = `UPDATE titanbot_xp SET xp = ${xp + generateXp()} WHERE id = '${msg.author.id}'`;
        }

        con.query(sql);
    });
});

Client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === (prefix) + 'xp') { 
        let target = msg.mentions.users.first() || msg.author;

        con.query(`SELECT * FROM titanbot_xp WHERE id = '${target.id}'`, (err, rows) => {
            if (err) throw err;

            let xp = rows[0].xp;

            const xpembed = new discord.RichEmbed()
            .setTitle(`${xp}`)
            .setColor(color)
            .setFooter(footer);

            msg.channel.send(xpembed);
        });
    }
})

//                                      KICK COMMAND

//                                     BUILD SUCCEEDED

Client.on("message", (msg) => {
    if (!msg.guild) return;
    if (msg.author.bot) return;

    if (msg.content === (prefix) + 'kick') {
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
    if (msg.author.bot) return;
    if (!msg.guild) return;
    // check if user has permissions
    if (msg.content === (prefix) + 'ban') {
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
    if (msg.author.bot) return;
    if (msg.content === (prefix) + 'ping') {
        msg.channel.send(`Pong! ${Client.ping}ms`);
    };
});

//                                            STATUS COMMAND

//                                            BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.author.bot) return
    if (msg.content === (prefix) + 'status') {
        const status = request(config.serverip, { json: true }, (err, res, body) => {
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

            let sqlstatus;
            let sqlicon
            if (con) {
                sqlicon = "✅";
                setStatus = "Online and functional"
            } else {
                sqlicon = "❌";
                setStatus = "Not connected and/or has problems";
            }
    
            const statusEmbed = new discord.RichEmbed()
            .addField(`${statusIcon}  -  Minecraft Server`, `${statusvalue} Ping: ${body.ping}ms`)
            .addField(`${config.botstatus}  -  Bot Status`, `The bot is ${config.botstatusonline}`)
            .addField(`${sqlicon}  -  MySQL Database`, `MySQL Database ${setStatus}`)
            .setColor(color)
            .setFooter(footer);
    
            msg.channel.send(statusEmbed);
        });
    };
});

//                                  STATUS HELP COMMAND

//                                    BUILD SUCCEEDED


Client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === (prefix) + 'help status') {
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
    if (msg.author.bot) return;
    if (msg.content === (prefix + 'report')) { // -report @guywefji#2342 hacking
        
        // VARIABLES

        const messageArray = msg.content.split(" ")
        const args = messageArray.slice(1);
        const reason = args.join(" ").slice(22)

        const member = msg.mentions.users.first();
        const author = msg.author;

        const channel = Client.channels.get(config.reportchannel); // Channel ID
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


Client.on("message", (msg, message) => {
    if (msg.content.toLowerCase().startsWith(prefix + `new`)) {
        const reason = msg.content.split(" ").slice(1).join(" ");
        const usernm = `${msg.author.username}`
        if (!msg.guild.roles.exists("name", "Support Team")) return msg.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (msg.guild.channels.exists("name", `ticket-` + usernm)) return msg.channel.send(`You already have a ticket open.`);
        msg.guild.createChannel(`ticket-${usernm}`, "text").then(c => {
            let role = msg.guild.roles.find("name", "Support Team");
            let role2 = msg.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(msg.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
    
            const ticketmadeembed = new discord.RichEmbed()
            .setTitle(`✅Ticket Created!`)
            .setDescription(`Your Ticket has been created! Your ticket is #${c.name}`)
            .setColor(color)
            .setFooter(footer);
            msg.channel.send(ticketmadeembed);
            const embed = new discord.RichEmbed()
            .setColor(color)
            .addField(`Hey ${msg.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
            .setFooter(footer)
            c.send({ embed: embed });
        }).catch(console.error);
    }
});

Client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + `close`)) {
        const error = new discord.RichEmbed()
        .addField(`Error!`, `You cannot use this command outside a ticket channel`)
        .setColor(color)
        .setFooter(footer);
        if (!msg.channel.name.startsWith(`ticket-`)) return msg.channel.send(error);
    
        const closeconfirm = new discord.RichEmbed()
        .addField(`Warning! Are you sure you want to continue with that action?`, `This action is irreversible.\nTo confirm, type \`-confirm\`. This request will time out in 20 seconds.`)
        .setColor(color)
        .setFooter(footer);
        msg.channel.send(closeconfirm)
        .then((m) => {
          msg.channel.awaitMessages(response => response.content === '-confirm', {
            max: 1,
            time: 20000,
            errors: ['time'],
          })
          .then((collected) => {
              msg.channel.delete()
              const cdeletesuccessdm = new discord.RichEmbed()
              .addField(`Hey there, ${msg.author.username}`, `Thanks for contacting TitanForgedMC support.\nIf you have any further enquiries or need further help, please feel free to open another ticket!\nWe hope you have a good day!`)
              .setColor(color)
              .setFooter(footer);
              msg.author.send(cdeletesuccessdm);
            })
            .catch(() => {
                const notclosed = new discord.RichEmbed()
                .setTitle(`Close request timed out. Ticket not closed`)
                .setColor(color)
                .setFooter(footer);
                m.edit(notclosed).then(m2 => {
                    m2.delete();
              }, 3000);
            });
        });
    }
});
