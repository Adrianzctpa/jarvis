"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    data: new discord_js_1.default.SlashCommandBuilder()
        .setName('subirchat')
        .setDescription('Sobe o chat quando enviam uma nuclear')
        .addIntegerOption(option => option.setName('pontos').setDescription('Quantidade de pontinhos')),
    async execute(interaction) {
        let param = interaction.options.get('pontos')?.value ? interaction.options.get('pontos')?.value : 30;
        let val = param;
        if (val > 50 || val === 0) {
            val = 30;
        }
        interaction.reply(`Subindo o chat em ${val} pontos...`).then(async () => {
            var string = '';
            for (var i = 0; i < val; i++) {
                string += '.\n';
            }
            await interaction.channel.send(string);
        });
    },
};
