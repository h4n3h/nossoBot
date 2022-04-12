const Discord = require('discord.js')
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] })
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice')
const dotenv = require('dotenv')
dotenv.config()

bot.on('ready', () => {
	console.log('Bot on')
})

/*bot.on('message', msg=>{
    if(msg.content === "HELLO"){
        msg.reply('HELLO FRIEND!');
    }
})*/

bot.on('messageCreate', async message => {
	// Voice only works in guilds, if the message does not come from a guild,
	// we ignore it
	if (!message.guild || message.content.toLowerCase() !== 'nosso grupo') return

	if (message.guild.me.voice.channel) return

	if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!')

	// Only try to join the sender's voice channel if they are in one themselves
	const connection = joinVoiceChannel({
		guildId: message.guild.id,
		channelId: message.member.voice.channel.id,
		adapterCreator: message.guild.voiceAdapterCreator,
	})

	const resource = createAudioResource('flute.mp3')

	const player = createAudioPlayer()

	connection.subscribe(player)

	player.play(resource)
})

bot.login(process.env.BOT_TOKEN)
