const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql');
const { dbhost, db, username, password } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getmoney')
		// eslint-disable-next-line quotes
		.setDescription("Get a user's money")
		.addStringOption(option =>
			option.setName('user')
				.setDescription('The user')),
	async execute(interaction) {
		const dbe = mysql.createConnection({
			host: dbhost,
			user: username,
			password: password,
			database: db,
		});
		const user = interaction.options.get('user');
		const query = `SELECT Money FROM characters WHERE Username = '${user}'`;
		dbe.query(query, async (err, result) => {
			if (err) throw err;
			console.log(result);
			await interaction.reply(result);
		});
	},
};