"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    data: new discord_js_1.default.SlashCommandBuilder()
        .setName('avaliar')
        .setDescription('Avalia algo objetivamente')
        .addStringOption(option => option.setName('coisa').setDescription('Coisa a ser avaliada').setRequired(true)),
    async execute(interaction) {
        const nota = Math.floor(Math.random() * 10);
        const str = nota.toString();
        const param = interaction.options.get('coisa')?.value;
        await interaction.channel.send(`Avaliando ${param}...`).then(async () => {
            if (nota === 10) {
                await interaction.channel.send("Nota 10, hiperculturemia");
            }
            else {
                await interaction.channel.send(`Nota ${str}`);
            }
        });
        await interaction.reply('.');
        await interaction.deleteReply();
    },
};
