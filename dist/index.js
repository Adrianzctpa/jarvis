"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
var PETER_MODE = false;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
client.commands = new discord_js_1.Collection();
const foldersPath = path_1.default.join(__dirname, 'commands');
const commandFolders = fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path_1.default.join(foldersPath, folder);
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
client.on(discord_js_1.Events.ClientReady, () => {
    console.log("Jarvis ligou, senhor");
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;
    await interaction.channel.send({
        content: 'Afirmativo senhor.',
        files: [{
                attachment: "../assets/jarvissorriso.png",
            }]
    }).then(async () => {
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
            else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }
    });
});
client.on(discord_js_1.Events.MessageCreate, (message) => {
    console.log('id: ', message.author.id);
    if (message.author.id === process.env.PETER && PETER_MODE) {
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
    if (message.content === "arte" || message.content === "Arte") {
        message.reply("conceito isso, senhor.");
    }
    if (!message.content.startsWith(".jarvis"))
        return;
    message.reply("Afirmativo senhor.");
    if (message.content.includes("peter")) {
        if (PETER_MODE) {
            PETER_MODE = false;
            message.reply("Modo Peter desativado.");
        }
        else {
            PETER_MODE = true;
            message.reply("Modo Peter ativado.");
        }
        return;
    }
    if (message.content.includes("fixar")) {
    }
    message.channel.send({
        files: [{
                attachment: "../assets/jarvissorriso.png",
            }]
    });
});
//TODO: Convert almost every command to slash
client.login(process.env.DISCORD_TOKEN);
