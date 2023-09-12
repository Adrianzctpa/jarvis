import discord from 'discord.js';

function getRandomInRange(from: number, to: number, fixed: number) : number{
    let val = (Math.random() * (to - from) + from).toFixed(fixed);
    return parseFloat(val);
}

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('doxxar')
		.setDescription('Gera um lulz')
        .addStringOption(option => option.setName('pessoa').setDescription('Pessoa a ser doxxada').setRequired(true)),
	async execute(interaction: discord.CommandInteraction) {
        const param = interaction.options.get('pessoa')?.value
        let longitude = getRandomInRange(-73, -34, 3)
        let latitude = getRandomInRange(-33, 5, 3)

        interaction.reply(`Localização de ${param}: https://www.google.com/maps/place/${latitude},${longitude}`)
	},
};