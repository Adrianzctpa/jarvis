"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
function getRandomInRange(from, to, fixed) {
    let val = (Math.random() * (to - from) + from).toFixed(fixed);
    return parseFloat(val);
}
module.exports = {
    data: new discord_js_1.default.SlashCommandBuilder()
        .setName('doxxar')
        .setDescription('Gera um lulz')
        .addStringOption(option => option.setName('pessoa').setDescription('Pessoa a ser doxxada').setRequired(true)),
    async execute(interaction) {
        const param = interaction.options.get('pessoa')?.value;
        let longitude = getRandomInRange(-73, -34, 3);
        let latitude = getRandomInRange(-33, 5, 3);
        interaction.reply(`Localização de ${param}: https://www.google.com/maps/place/${latitude},${longitude}`);
    },
};
