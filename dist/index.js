"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
client.on("ready", () => {
    console.log("Jarvis ligou, senhor.");
});
client.on("messageCreate", (message) => {
    console.log('id: ', message.author.id);
    if (message.author.id === process.env.PETER) {
        message.channel.send({
            content: '>peter\nOk fixados.',
            files: [{
                    attachment: "../assets/jarvissorriso.png",
                }]
        });
        message.pin();
        message.unpin();
        return;
    }
    if (message.content.includes("arte")) {
        message.reply("conceito isso, senhor.");
    }
    if (!message.content.includes(".jarvis")) {
        return;
    }
    message.reply("Afirmativo senhor.");
    message.channel.send({
        files: [{
                attachment: "../assets/jarvissorriso.png",
            }]
    });
});
client.login(process.env.DISCORD_TOKEN);