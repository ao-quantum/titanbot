const discord = require('discord.js');
const Client = new discord.Client;
const config = require('./config.json');
const antispam = require('discord-anti-spam');
const fs = require('fs');
const getJSON = require('get-json');
const request = require('request');
const delay = require('delay');
const mysql = require('mysql');

let prefix;

const color = config.color;
const footer = config.footer;

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

//               get the prefix
con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
    if (err) throw err;

    dbprefix = rows[0].value;
    prefix = dbprefix;
});

Client.on("ready", () => {
    console.log(`Bot logged in as ${Client.user.tag}`);
    console.log(`${config.name} is online on ${Client.guilds.size} servers`);
    Client.user.setStatus('dnd');

    //          ANTI SPAM

    antispam(Client, {
        warnBuffer: 4,
        maxBuffer: 10,
        interval: 2000,
        warningMessage: "please stop spamming!",
        banMessage: "has banished from the server due to spamming!",
        maxDuplicatesWarning: 5,
        maxDuplicatesBan: 10,
        deleteMessagesAfterBanForPastDays: 7,
        exemptRoles: ["Bots", "Staff"],
        exemptUsers: []
    });
});

Client.on("message", msg => {
    Client.emit("checkMessage", msg);
})

Client.on("ready", async () => {
    while (true) {
        Client.user.setPresence({
            game: {
                name: 'on TitanForgedMC',
                type: "PLAYING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'Currently in Alpha',
                type: "PLAYING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'your commands',
                type: "LISTENING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: '-help',
                type: "WATCHING",
                url: "https://discord.gg/D9aQy5j"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
    };
});

//                                    GUILD MEMBER ADD/REMOVE TRIGGERS

//                                           BUILD SUCCEEDED

Client.on("guildMemberAdd", member => {
    let welcomechannelenable;
    let dbwelcomechannelenable;
    con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
        if (err) throw err;
        dbwelcomechannelenable = rows[1].value;
        welcomechannelenable = dbwelcomechannelenable;
    });
    if (welcomechannelenable = "yes") {
        var channel = member.guild.channels.get(config.welcomechannel);

        if (!channel) return;
        const guildmemberaddembed = new discord.RichEmbed()
            .setTitle(`Welcome to ${config.displayname}, ${member.user.tag}! 🎉🎉🎉`)
            .setColor(color)
            .setFooter(footer);

        channel.send(guildmemberaddembed);
    };
});

Client.on("guildMemberRemove", member => {
    let welcomechannelenable
    con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
        if (err) throw err;
        welcomechannelenable = rows[1].value
    })

    if (welcomechannelenable = "yes") {
        var channel = member.guild.channels.get(config.welcomechannel);

        if (!channel) return;
        const guildMemberRemoveEmbed = new discord.RichEmbed()
            .setTitle(`Goodbye ${member.user.tag}. We will remember you!`)
            .setColor(color)
            .setFooter(footer);

        channel.send(guildMemberRemoveEmbed);
    };
});

Client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === (prefix) + "link") {
        const linkembed = new discord.RichEmbed()
            .setTitle(`To link your discord account with your minecraft account, please execute "/link" in game and DM me the code`)
            .setColor(color)
            .setFooter(footer);
        msg.channel.send(linkembed);
    };
    if (msg.content === (prefix) + "rule") {
        const rulesintro = new discord.RichEmbed()
            .setTitle("Welcome to TitanForgedMC")
            .setDescription("Before you do anything else, please be sure to read the rules. They may be boring but are really important and make sure you and others have a good experience on our server. Failure to comply by the rules will lead to a warning, mute and ban.")
            .setColor(color);
        const rule1 = new discord.RichEmbed()
            .setTitle
    }
});

//                                          SUGGESTIONS COMMAND

//                                            BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.author.bot) return
    if (msg.content.startsWith((prefix) + "suggest")) {
        const messageArray = msg.content.split(" ");
        const args = messageArray.slice(1);
        const suggestion = args.join(" ");
        if (!suggestion) return msg.channel.send("You have not suggested anything. Please put your suggestion after `-suggest`")

        const user = msg.author;

        let suggestionid = Client.channels.get(config.suggestionchannelid);

        const Thanks = new discord.RichEmbed()
            .setTitle("✅ Thank you for your suggestion!")
            .setDescription("Thank you for your suggestion, our staff will now look into the suggestion and think whether it should be added or not")
            .setColor(color)
            .setFooter(footer);

        msg.channel.send(Thanks);

        const suggestionembed = new discord.RichEmbed()
            .addField(`New suggestion from ${user.username}`, `${suggestion}`)
            .setColor(color)
            .setFooter(footer);
        suggestionid.send(suggestionembed);
    }
});

//                                      HELP COMMAND

//                                     BUILD SUCCEEDED

Client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === (prefix) + 'help') {
        const help = new discord.RichEmbed()
            .setTitle("[required] field. <optional> field.")
            .addField("General Comamnds", "**help** - Opens this menu\n**ping** - Pong!\n**report [user] <reason>** - Report someone on the server.\n**status** - Shows the server status\n**xp <user>** - Shows your or the specified user's XP\n**suggest [suggestion]** - Suggest a feature that we should add\n**flip** - Flips a coin")
            .addField("Support Commands", "**new** - Opens a new support ticket\n**close** - Close the support ticket")
            .addField("Notification commands", "**sub** - Recieve notifications about all the news and important announcements\n**unsub** - Stop receiving all announcements and news")
            .addField("Admin Commands", "**kick [user] [reason]** - Kick someone from the server\n**ban [user] [reason]** - Ban someone from the server\n**prefix [new prefix]** - Set the bot prefix")
            .setColor(color)
            .setFooter(footer);
        msg.channel.send(help)
    };

    //                                        BAD WORDS FILER SYSTEM

    const badwords = require('./badwords.json')
    con.query(`SELECT * FROM titanbot_warns WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err; //599960120834785281 is logs channel id

        if (badwords.badwords.some(word => msg.content.toLowerCase().includes(word))) {
            msg.delete()

            let sql

            if (rows.length < 1) {
                sql = `INSERT INTO titanbot_warns (id, warns) VALUES ('${msg.author.id}', 1)`
            } else {
                let warns = rows[0].warns;

                sql = `UPDATE titanbot_warns SET warns = ${warns + 1} WHERE id = '${msg.author.id}'`
            }
            con.query(sql)
            msg.channel.send(`Do not swear, ${msg.author.tag}! You have been issued a warning.`)
        }
    });

    if (msg.content.startsWith((prefix) + "warn")) {
        member = msg.mentions.users.first()
        if (member) {
            user = msg.guild.member(member)
            if (user) {
                con.query(`SELECT * FROM titanbot_warns WHERE id = '${member.id}'`, (err, rows) => {
                    const messageArray = msg.content.split(" ")
                    const args = messageArray.slice(1)
                    const reason = args.join(" ").slice(22)
                    if (err) throw err;

                    const logchannel = Client.channels.get(`${config.logchannel}`) // define log channel

                    if (rows.length < 1) {
                        sql = `INSERT INTO titanbot_warns (id, warns) VALUES ('${member.id}', 1)`
                    } else {
                        let warns = rows[0].warns
                        sql = `UPDATE titanbot_warns SET warns = ${warns + 1} WHERE id = '${member.id}'`
                    }
                    con.query(sql) // add the warning to the user in the mysql database
                    msg.delete() // delete the warning command

                    const warnembed = new discord.RichEmbed()
                        .setTitle(`✅ ${member.username} has been warned`)
                        .setColor(color)
                        .setFooter(footer);

                    msg.channel.send(warnembed) // sends the warn in the chat

                    const warnlog = new discord.RichEmbed()
                        .addField(`New warning`, `${msg.author.tag} has warned ${member} for ${reason}`)
                        .setColor(color)
                        .setFooter(footer);

                    logchannel.send(warnlog) // send the log

                    member.send("You have been warned on TitanForgedMC for " + reason)
                    if (rows[0]) {
                        if (!rows[0]) return;
                        if (rows[0].warns = 3) { // if the user has more than 3 warns then kick him/her
                            member.kick("Exceeding the 3 warnings").then(() => {

                                const exceed3warnsembed = new discord.RichEmbed()
                                    .setTitle(`${member} has been automatically kicked for exceeding 3 warns`)
                                    .setColor(color)
                                    .setFooter(footer);

                                logchannel.send(exceed3warnsembed);
                            }).catch((err) => {
                                return console.log(err)
                            }) // on error, 
                        } else if (rows[0].warns <= 5) { // if the user exceeds 5 warnings then 
                            member.ban("Exceeding the 5 warnings").then(() => {

                                const exceed5warnsembed = new discord.RichEmbed()
                                    .setTitle(`${member} has been automatically banned for exceeding 5 warnings`)
                                    .setColor(color)
                                    .setFooter(footer);

                                logchannel.send(exceed5warnsembed); //send the log
                            }).catch((err) => {
                                return console.log(err)
                            }); // on an error, log it
                        }
                    }
                })
            } else {
                const usernotfound = new discord.RichEmbed()
                    .setTitle("❌ The user was not found on this server")
                    .setColor(color)
                    .setFooter(footer);
                msg.channel.send(usernotfound)
            }
        } else {
            const usernotmention = new discord.RichEmbed()
                .setTitle("❌ The user was not mentioned")
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(usernotmention);
        }
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
    if (msg.content === (prefix) + "rules") {
        const hook = new discord.WebhookClient()
        const rulesintro = new discord.RichEmbed()
            .setTitle("Welcome to TitanForgedMC")
            .setDescription('We all hate rules, yes, but to ensure a safe and enjoyable place for everyone, we have to enforce rules. Failing to abide by them may lead to appropriate sanctions being taken')
            .setColor(color);
    }
});

Client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith((prefix) + "xp")) {
        let target = msg.mentions.users.first() || msg.author;

        con.query(`SELECT * FROM titanbot_xp WHERE id = '${target.id}'`, (err, rows) => {
            if (err) throw err;
            let xp = rows[0].xp;

            const yourxp = new discord.RichEmbed()
                .setTitle(`You have ${xp}`)
                .setColor(color)
                .setFooter(footer);

            const targetxp = new discord.RichEmbed()
                .setTitle(`${target.name} has ${xp}`)
                .setColor(color)
                .setFooter(footer);

            if (target === msg.author) {
                msg.channel.send(yourxp)
            } else if (target === msg.mentions.users.first()) {
                msg.channel.send(targetxp)
            };
        });
    };
    if (msg.content === (prefix) + "flip") {
        // this uses the value of generateXP function to get a random number, that random number judges the heads of tails
        const num = generateXp();
        let result
        if (num <= 5) {
            result = "Heads";
        } else if (num >= 6) {
            result = "Tails";
        };

        const flipembed = new discord.RichEmbed()
            .setTitle(`${result}`)
            .setColor(color);
        msg.channel.send(flipembed)
    };
    /*

    //                                    SUB & UNSUB COMMAND

    */
    if (msg.content === (prefix) + "sub") {
        con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
            if (err) throw err;
            const notifyrole = rows[3].value;

            msg.member.addRole(`${notifyrole}`); // 599646025757753344 599646025757753344
            const roleadded = new discord.RichEmbed()
                .setTitle('✅ You will now recieve notifications!')
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(roleadded);
        });
    };
    if (msg.content === (prefix) + "unsub") {
        con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
            if (err) throw err;
            notifyrole = rows[3].value;
            msg.member.removeRole(`${notifyrole}`)
            const roleremove = new discord.RichEmbed()
                .setTitle("✅ Removed you from notifications list")
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(roleremove);
        });
    }
})

//                                      KICK COMMAND

//                                     BUILD SUCCEEDED

Client.on("message", (msg) => {
    if (!msg.guild) return;
    if (msg.author.bot) return;

    if (msg.content.startsWith((prefix) + "kick")) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("❌ You do not have permissions to do that!");
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
            const member = msg.guild.member(usertokick); // check is user is in guild
            if (!reason) return msg.channel.send("Please specify a reason");
            if (member) { // kick the user
                member.kick(`${member} kicked ${usertokick} for ${reason}`).then(() => {
                    msg.channel.send(kicksucceeded);
                }).catch(err => { // unable to kick user
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
    if (msg.content.startsWith((prefix) + "ban")) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("❌ You do not have permissions to do that!");
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
            const member = msg.guild.member(usertoban); // check if user is in guild
            if (!reason) return msg.channel.send("Please specify a reason")
            if (member) { // kick the user
                member.ban(`${member} banned ${usertoban} for ${reason}`).then(() => {
                    msg.channel.send(bansucceed);
                }).catch(err => { // unable to kick user
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
        const status = request(config.serverip, {
            json: true
        }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }

            let statusIcon;
            let statusvalue;

            if (body.serverStatus === "online") {
                statusIcon = "✅";
                statusvalue = "Server is Online.";
            } else if (body.serverStatus === "offline") {
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
    if (msg.content.startsWith((prefix) + "report")) { // -report @guywefji#2342 hacking

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
    };

    //                                          PREFIX COMMAND

    //                                          IN DEVELOPMENT

    if (msg.content.startsWith((prefix) + "prefix")) {

        if (!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send("❌ You do not have sufficient permissions to do that!");
        messageArray = msg.content.split(" "); // turn the message into an array, so it should be like ["-prefix", "newprefix"]
        newprefix = `${messageArray[1]}`; // turn the new prefix into a string

        con.query(`UPDATE titanbot_cfg SET value = '${newprefix}' WHERE setting = 'prefix'`, (err, rows) => { // query mysql to change the prefix
            if (err) throw err; // if theres an error, end the bot and return the error
            console.log(`Prefix has been changed to '${newprefix}' by ${msg.author.tag}`) // log it in console
            msg.channel.send(`✅ Prefix has been changed successfully to '${newprefix}'`) // let the user know if its successfull
            con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => { // update the prefix globally
                if (err) throw err;

                dbprefix = rows[0].value;
                prefix = dbprefix;
            });
        });
    };
});

//                                              TICKET SYSTEM

//                                             BUILD SUCCEEDED

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
            c.send({
                embed: embed
            });
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

//                                       OITC LEADERBOARD

//                                        IN DEVELOPMENT

Client.on("message", msg => {
    if (msg.content.startsWith((prefix) + "leaderboard")) {
        const messageArray = msg.content.split(" ")
        const top = messageArray[1]
        request('http://144.217.139.188:8081/oitc/leaderboard', {
            json: true
        }, (err, res, body) => {
            if (err) throw err;
            /*
            const leaderboard10 = new discord.RichEmbed()
            .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
            .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
            .addField(`${body[2].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
            .addField(`${body[3].name}`, `Wins: ${body[3].wins}. Loss: ${Math.floor((body[3].games) - (body[3].wins))}. Kills: ${body[3].kills}.`)
            .addField(`${body[4].name}`, `Wins: ${body[4].wins}. Loss: ${Math.floor((body[4].games) - (body[4].wins))}. Kills: ${body[4].kills}.`)
            .addField(`${body[5].name}`, `Wins: ${body[5].wins}. Loss: ${Math.floor((body[5].games) - (body[5].wins))}. Kills: ${body[5].kills}.`)
            .addField(`${body[6].name}`, `Wins: ${body[6].wins}. Loss: ${Math.floor((body[6].games) - (body[6].wins))}. Kills: ${body[6].kills}.`)
            .addField(`${body[7].name}`, `Wins: ${body[7].wins}. Loss: ${Math.floor((body[7].games) - (body[7].wins))}. Kills: ${body[7].kills}.`)
            .addField(`${body[8].name}`, `Wins: ${body[8].wins}. Loss: ${Math.floor((body[8].games) - (body[8].wins))}. Kills: ${body[8].kills}.`)
            .addField(`${body[9].name}`, `Wins: ${body[9].wins}. Loss: ${Math.floor((body[9].games) - (body[9].wins))}. Kills: ${body[9].kills}.`)
            .addField(`${body[10].name}`, `Wins: ${body[10].wins}. Loss: ${Math.floor((body[10].games) - (body[10].wins))}. Kills: ${body[10].kills}.`)
            .setColor(color)
            .setFooter(footer);
            */
            switch (top) {
                case "1" || `top`:
                    const leaderboardtop = new discord.RichEmbed()
                        .setTitle("TitanForgedMC Top Player")
                        .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                        .setColor(color)
                        .setFooter(footer);
                    msg.channel.send(leaderboardtop);
                    break;
                case 'top':
                    msg.channel.send(leaderboardtop);
                    break;
                case "3":
                    const leaderboardtop3 = new discord.RichEmbed()
                        .setTitle("TitanForgedMC Top 3 Players")
                        .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                        .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
                        .addField(`${body[2].name}`, `Wins: ${body[2].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
                        .setColor(color)
                        .setFooter(footer);
                    msg.channel.send(leaderboardtop3);
                    break;
                case "5":
                    const leaderboardtop5 = new discord.RichEmbed()
                        .setTitle("TitanForgedMC Top 5 Players")
                        .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                        .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
                        .addField(`${body[2].name}`, `Wins: ${body[2].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
                        .addField(`${body[3].name}`, `Wins: ${body[3].wins}. Loss: ${Math.floor((body[3].games) - (body[3].wins))}. Kills: ${body[3].kills}.`)
                        .addField(`${body[4].name}`, `Wins: ${body[4].wins}. Loss: ${Math.floor((body[4].games) - (body[4].wins))}. Kills: ${body[4].kills}.`)
                        .setColor(color)
                        .setFooter(footer);
                    msg.channel.send(leaderboardtop5);
                    break;
                case "10":
                    msg.channel.send("The top 10 currently does not work as there are not enough players to list")
                    break;
                default:
                    msg.channel.send("The top amount must be either 1, 3, 5 or 10.")
            };
        });
    };
});

Client.login('NTc2OTUwMzA4Mjc4ODk0NjIy.XNd9cg.RFPLebQp-x6UO-rMxIs-clE7vrQ').catch(console.error);