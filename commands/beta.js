/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js');
const config = require('../config/config.json');

module.exports.run = (Client, msg, args) => {
    msg.member.addRole('602228966761431061').then(() => {
        msg.channel.send('ok i added it')
    });
};

module.exports.help = {
    name: "beta"
}
