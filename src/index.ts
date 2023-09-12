import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});
import discord, { Client, GatewayIntentBits, Events, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

var PETER_MODE = false

// Client for some reason does not support slash commands by default
interface discordClient extends Client {
    commands: Collection<string, any>
}

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
}) as discordClient;

client.commands = new Collection()
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.ClientReady, () => {
    console.log("Jarvis ligou, senhor")
})

client.on(Events.InteractionCreate, async (interaction: discord.Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await interaction.channel.send({
        content: 'Afirmativo senhor.',
        files: [{
            attachment: "../assets/jarvissorriso.png",
        }]
    }).then(async () => {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
    
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }
    })
});

client.on(Events.MessageCreate, (message: discord.Message) => {
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

    if (message.content === "arte" || message.content === "Arte") {
        message.reply("conceito isso, senhor.")
    }

    if (!message.content.startsWith(".jarvis")) return;

    message.reply("Afirmativo senhor.")

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

    if(message.content.includes("suba o chat")){
        message.reply(" .\n. \n .\n .\n. \n .\n .\n .\n .\n. \n. \n .  \n .\n .\n. \n. \n .\n. \n")
    }

    if (message.content.startsWith('mande pv ') && message.mentions.users.size) {
        var reply= message.toString().split(' ').join(' ') // Takes the DM content from the message
        const targetMember = message.mentions.members.first();
       (targetMember.user).send(`${reply}`);
    }

    message.channel.send({
        files: [{
            attachment: "../assets/jarvissorriso.png",
        }]
    })
})

//TODO: Convert almost every command to slash

client.login(process.env.DISCORD_TOKEN);
