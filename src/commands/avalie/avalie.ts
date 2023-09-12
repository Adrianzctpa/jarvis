import discord from 'discord.js';

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('avaliar')
		.setDescription('Avalia algo objetivamente')
        .addStringOption(option => option.setName('coisa').setDescription('Coisa a ser avaliada').setRequired(true)),
	async execute(interaction: discord.CommandInteraction) {
        const nota = Math.floor(Math.random() * 11);
        const str = nota.toString()
        const param = interaction.options.get('coisa')?.value
        
        await interaction.channel.send(`Avaliando ${param}...`).then(async () => {
            if (nota === 10){
                await interaction.channel.send("Nota 10, hiperculturemia")
            }
            else {
                await interaction.channel.send(`Nota ${str}`)
            }
        })

        await interaction.reply('.');
        await interaction.deleteReply();
	},
};