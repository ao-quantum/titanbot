/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js');
const Client = new discord.Client;
const config = require('./config/config.json');
const antispam = require('discord-anti-spam');
const delay = require('delay');
const mysql = require('mysql');
const fs = require('fs');
Client.commands = new discord.Collection();
Client.login(process.env.token).catch(console.error);

var prefix;

const color = config.color;
const footer = config.footer;

const con = mysql.createPool({
    host: process.env.titanbot_host,
    database: process.env.titanbot_db,
    user: process.env.titanbot_db,
    password: process.env.titanbot_dbpsw
});

//               get the prefix

module.exports.getprefix = () => {
    con.query(`SELECT * FROM titanbot_cfg WHERE setting = 'prefix'`, (err, rows) => {
        if (err) throw err;
    
        prefix = rows[0].value;
    });
}
this.getprefix()

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("[ERROR] Cannot find commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[STARTUP] ${f} loaded`)
        Client.commands.set(props.help.name, props);
    });
});

Client.on("ready", async () => {
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
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    let messageArray = msg.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandFile = Client.commands.get(cmd.slice(prefix.length))
    if (commandFile) {
        commandFile.run(Client, msg, args, con)
    }
});

Client.on("ready", async () => {
    while (true) {
        Client.user.setPresence({
            game: {
                name: 'on TitanForgedMC',
                type: "PLAYING",
                url: "discord invite"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'Currently in Alpha',
                type: "PLAYING",
                url: "discord invite"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: 'your commands',
                type: "LISTENING",
                url: "discord invite"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
        Client.user.setPresence({
            game: {
                name: '-help',
                type: "WATCHING",
                url: "discord invite"
            },
            status: 'dnd',
            afk: true
        })
        await delay(3000)
    };
});

//        Ping the SQL server to prevent from being timed out
Client.on("ready", async () => {
    while (true) {
        await delay(3500000)
        con.query('SELECT * FROM titanbot_warns');
    };
})

//                                    GUILD MEMBER ADD/REMOVE TRIGGERS

//                                           BUILD SUCCEEDED

Client.on("guildMemberAdd", member => {
    let welcomechannelenable;
    con.query(`SELECT * FROM titanbot_cfg WHERE setting = 'enablewelcomeleave'`, (err, rows) => {
        if (err) throw err;
        welcomechannelenable = rows[0].value;
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
    let welcomechannelenable;
    con.query(`SELECT * FROM titanbot_cfg WHERE setting = 'enablewelcomeleave'`, (err, rows) => {
        if (err) throw err;
        welcomechannelenable = rows[0].value
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
        if (err) {
            console.log(err)
            return con.connect();
        };

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
 //              creeper aw man
Client.on('message', msg => {
    if (msg.content == 'creeper') {
        msg.channel.send('aw man')
    }
})
