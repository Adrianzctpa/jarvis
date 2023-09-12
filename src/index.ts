import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});
import discord, { Client, GatewayIntentBits } from 'discord.js';

var PETER_MODE = false
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on("ready", () => {
    console.log("Jarvis ligou, senhor.")
})

client.on("messageCreate", (message: discord.Message) => {
    console.log('id: ', message.author.id)

    if (message.author.id === process.env.PETER && PETER_MODE) {
        message.channel.send({
            content: '>peter\nOk fixados.',
            files: [{
                attachment: "../assets/jarvissorriso.png",
            }]
        })

        message.pin()
        message.unpin()

        return
    }

    if (message.content.includes("arte")) {
        message.reply("conceito isso, senhor.")
    }

    if (!message.content.includes(".jarvis")) {
        return
    }

    if (message.content.includes("peter")) {
        if (PETER_MODE) {
            PETER_MODE = false
            message.reply("Modo Peter desativado.")
        } else {
            PETER_MODE = true
            message.reply("Modo Peter ativado.")
        }

        return
    }

    if (message.content.includes("fixar")) {

    }

    message.reply("Afirmativo senhor.")

    message.channel.send({
        files: [{
            attachment: "../assets/jarvissorriso.png",
        }]
    })
})

client.login(process.env.DISCORD_TOKEN);