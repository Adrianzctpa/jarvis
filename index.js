import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits, MessageManager } from 'discord.js';

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

client.on("messageCreate", (message) => {
    console.log(message.content)

    if (!message.content.includes(".jarvis")) {
        return
    }

    message.reply("Afirmativo senhor.")

    message.channel.send({
        files: [{
            attachment: "assets/jarvissorriso.png",
        }]
    })
})

client.login(process.env.DISCORD_TOKEN);