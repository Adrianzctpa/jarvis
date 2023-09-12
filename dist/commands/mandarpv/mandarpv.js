"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    data: new discord_js_1.default.SlashCommandBuilder()
        .setName('mandarpv')
        .setDescription('Essa vai ter que ir pro fixados do privado do')
        .addStringOption(option => option.setName('mensagem').setDescription('O que será enviado').setRequired(true))
        .addUserOption(option => option.setName('usuario').setDescription('Pro pv de quem').setRequired(true)),
    async execute(interaction) {
        const msg = interaction.options.get('mensagem')?.value;
        const user = interaction.options.get('usuario')?.user;
        await interaction.reply(`Enviando mensagem para ${user.username}...`).then(async () => {
            await user.send(msg);
            await interaction.channel.send(`Mensagem enviada para ${user.username}`);
        });
    },
};
