const discord = require('discord.js');
const Util = require('discord.js')
const Client = new discord.Client;
const config = require('./config/config.json');
const antispam = require('discord-anti-spam');
const delay = require('delay');
const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const app = express()
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const Youtube = require('simple-youtube-api');
const opus = require('node-opus');
Client.commands = new discord.Collection();
Client.login(process.env.titanbot_token).catch(console.error);

let prefix;

const color = config.color;
const footer = config.footer;

const con = mysql.createConnection({
    host: "na-sql.pebblehost.com",
    database: "customer_77991",
    user: "customer_77991",
    password: "7987273d7e",
    charset: "utf8mb4_unicode_ci"
});

con.connect(err => {
    if (err) throw err;
    console.log("[STARTUP] Connected to MySql database");
});

//               get the prefix
con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
    if (err) throw err;

    dbprefix = rows[0].value;
    prefix = dbprefix;
});

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

const port = 80
app.get('/www');

app.use(express.static('www'), (req, res, next, err) => {
    res.status(404).send("Error 404. Not found")
})

app.listen(process.env.PORT || 80, (err) => {
    console.log('[STARTUP] Express server is up on port 80')
})

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
    if (msg.author.bot) return;

    let messageArray = msg.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandFile = Client.commands.get(cmd.slice(prefix.length))
    if (commandFile) {
        commandFile.run(Client, msg, args)
    }
});

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
/*
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
*/
Client.on("message", msg => {
    if (msg.author.bot) return;
    //if (msg.content === (prefix) + "rule") {
    //  const rulesintro = new discord.RichEmbed()
    //    .setTitle("Welcome to TitanForgedMC")
    //  .setDescription("Before you do anything else, please be sure to read the rules. They may be boring but are really important and make sure you and others have a good experience on our server. Failure to comply by the rules will lead to a warning, mute and ban.")
    //     .setColor(color);
    // const rule1 = new discord.RichEmbed()
    //   .setTitle
    // }
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

const youtube = new Youtube(config.ytapikey)
const queue = new Map()
let dispatcher;
Client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);

    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(prefix.length)

    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            {
                const embed = new discord.RichEmbed()
                .setAuthor(`${playlist.title} has been added to the queue!`)
                .setColor(color);
                return msg.channel.send(embed)
            };
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    const embed = new discord.RichEmbed()
                    .addField('Song selection:', `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
                    .setColor(color)
                    .setFooter(footer);
                    msg.channel.send(embed)
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        const embed = new discord.RichEmbed()
                        .setAuthor('❌ No or invalid value entered, cancelling video selection.')
                        .setColor(color);
                        return msg.channel.send(embed);
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
        if (!msg.member.voiceChannel) {
            const embed = new discord.RichEmbed()
            .setAuthor("❌ You are not in a voice channel")
            .setColor(color);
            return msg.channel.send(embed)
        }
        if (!serverQueue) {
            const embed = new discord.RichEmbed()
            .setAuthor('There is nothing playing that I could skip for you.')
            .setColor(color);
            return msg.channel.send(embed);
        }
        const embed =  new discord.RichEmbed()
        .setAuthor(`✅ Song skipped!`)
        .setColor(color);
        msg.channel.send(embed);
        serverQueue.connection.dispatcher.end();
        return undefined;
    } else if (command === 'stop') {
        if (!msg.member.voiceChannel) {
            const embed = new discord.RichEmbed()
            .setAuthor("❌ You are not in a voice channel")
            .setColor(color);
            return msg.channel.send(embed)
        };
        if (!serverQueue) {
            const embed = new discord.RichEmbed()
            .setAuthor("❌ There are no songs in the queue")
            .setColor(color);
            return msg.channel.send(embed);
        };
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        return undefined;
    } else if (command === 'volume') {
        if (!msg.member.voiceChannel) {
            const embed = new discord.RichEmbed()
            .setAuthor("❌ You are not in a voice channel")
            .setColor(color);
            return msg.channel.send(embed)
        };
        if (!serverQueue) {
            const embed = new discord.RichEmbed()
            .setAuthor("❌ There are no songs in the queue")
            .setColor(color);
            return msg.channel.send(embed);
        };
        if (!args[1]) {
            const embed = new discord.RichEmbed()
            .setAuthor(`ℹ The current volume is ${serverQueue.volume}`)
            .setColor(color);
            return msg.channel.send(embed)
        };
        serverQueue.volume = args[1];
        if (serverQueue.volume > 5 || serverQueue.volume < 0.1) {
            const embed = new discord.RichEmbed()
            .setAuthor(`❌ The volume cannot be over 5 or under 0.1`)
            .setColor(color);
            return msg.channel.send(embed)
        }
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        const embed = new discord.RichEmbed()
        .setAuthor(`✅ I set the volume to: **${args[1]}**`)
        .setColor(color);
        return msg.channel.send(embed);
    } else if (command === 'np') {
        if (!serverQueue) {
            const embed = new discord.RichEmbed()
            .setAuthor(`❌ There are no songs in the queue`)
            .setColor(color);
            return msg.channel.send(embed);
        };
        const embed = new discord.RichEmbed()
        .setAuthor(`🎶 Now playing: **${serverQueue.songs[0].title}**`)
        .setColor(color);
        return msg.channel.send(embed);
    } else if (command === 'queue') {
        if (!serverQueue) {
            const embed = new discord.RichEmbed()
            .setAuthor(`❌ There are no songs in the queue`)
            .setColor(color);
            return msg.channel.send(embed);
        };
        const embed = new discord.RichEmbed()
        .setAuthor(`Now playing: ${serverQueue.songs[0].title}`)
        .addField(`Song queue:`, `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
        .setColor(color)
        .setFooter(footer);
        msg.channel.send(embed)
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            const embed = new discord.RichEmbed()
            .setAuthor('⏸ Paused')
            .setColor(color);
            return msg.channel.send(embed);
        }
        const embed = new discord.RichEmbed()
        .setAuthor('ℹ There is nothing playing')
        .setColor(color);
        return msg.channel.send(embed);
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            const embed = new discord.RichEmbed()
            .setAuthor("▶ Resumed")
            .setColor(color);
            return msg.channel.send(embed);
        }
        const embed = new discord.RichEmbed()
        .setAuthor('ℹ There is nothing playing')
        .setColor(color);
        return msg.channel.send(embed);
    }

    return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`❌ I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`❌ I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else {
            const embed = new discord.RichEmbed()
            .setAuthor(`✅ ${song.title} has been added to the queue!`)
            .setColor(color);
            msg.channel.send(embed);
        };
    }
    return undefined;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const embed = new discord.RichEmbed()
    .setAuthor(`🎶 Start playing: ${song.title}`)
    .setColor(color);
    serverQueue.textChannel.send(embed);
}