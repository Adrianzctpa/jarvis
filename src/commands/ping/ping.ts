import discord from 'discord.js';

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: discord.CommandInteraction ) {
		await interaction.reply('Pong!');
	},
};
