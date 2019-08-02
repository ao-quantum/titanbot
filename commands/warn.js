const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = (Client, msg, args, con) => {
    let sql;
    let color = config.color;
    let footer = config.footer;
    member = msg.mentions.users.first()
    if (member) {
        user = msg.guild.member(member)
        if (user) {
            con.query(`SELECT * FROM titanbot_warns WHERE id = '${member.id}'`, (err, rows) => {
                const loghook = new discord.WebhookClient("600431831866933285", "bLdpNW7oATIpTQMzLNzQY_s9YvDLr-FjZdLymBlwLlYacnV2NY76RvPqmA1eXxbq2WWI")
                const reason = args.join(" ").slice(22)
                if (err) throw err;

                if (rows.length < 1) {
                    sql = `INSERT INTO titanbot_warns (id, warns) VALUES ('${member.id}', 1)`
                } else {
                    let warns = rows[0].warns;
                    sql = `UPDATE titanbot_warns SET warns = ${warns + 1} WHERE id = '${member.id}'`
                }
                msg.delete() // delete the warning command
                con.query(sql);
                const warnembed = new discord.RichEmbed()
                    .setTitle(`✅ ${member.username} has been warned`)
                    .setColor(color)
                    .setFooter(footer);

                msg.channel.send(warnembed) // sends the warn in the chat

                const warnlog = new discord.RichEmbed()
                    .addField(`New warning`, `${msg.author.tag} has warned ${member} for ${reason}`)
                    .setColor(color)
                    .setFooter(footer);

                loghook.send(warnlog) // send the log

                member.send("You have been warned on TitanForgedMC for " + reason).catch(() => {
                    return msg.channel.send('An error occured while notifying the user');
                });
                
                con.query(`SELECT * FROM titanbot_warns WHERE id = '${member.id}'`, (err, rows) => {
                    let warnings = rows[0].warns;
                    if (warnings == 3 || warnings == "3") { // if the user has 3 warns then kick him/her
                        user.kick("Exceeding the 3 warnings").then(() => {

                            const exceed3warnsembed = new discord.RichEmbed()
                                .setTitle(`${member.tag} has been automatically kicked for exceeding 3 warns`)
                                .setColor(color)
                                .setFooter(footer);

                            loghook.send(exceed3warnsembed);
                            member.send(`You have been kicked from TitanForgedMC for exceeding your 3 warnings!`)
                        }).catch((err) => {
                            console.log(err);
                            return msg.channel.send('An error occured! Error: ' + err)
                        }); // on error, 
                    } else if (rows[0].warns >= 5) { // if the user exceeds 5 warnings then 
                        user.ban("Exceeding the 5 warnings").then(() => {

                            const exceed5warnsembed = new discord.RichEmbed()
                                .setTitle(`${member.tag} has been automatically banned for exceeding 5 warnings`)
                                .setColor(color)
                                .setFooter(footer);

                            loghook.send(exceed5warnsembed); //send the log
                            member.send('You have been banned on TitanForgedMC for exceeding 3 warnings!')
                        }).catch((err) => {
                            console.log(err)
                            return msg.channel.send('An error occured! ' + err)
                        });
                    };
                })
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

module.exports.help = {
    name: "warn"
}