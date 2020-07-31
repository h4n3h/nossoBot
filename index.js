const Discord = require('discord.js');
const bot = new Discord.Client();

const token = "hehehehe";

bot.on('ready', () =>{
    console.log('Bot on');
})

/*bot.on('message', msg=>{
    if(msg.content === "HELLO"){
        msg.reply('HELLO FRIEND!');
    }
})*/


bot.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.content === 'nosso grupo') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        
        const dispatcher = connection.play('flute.mp3', {
          volume: 0.5,
        });

        /*dispatcher.pause();*/
        dispatcher.resume();

        dispatcher.setVolume(0.5); // half the volume

        dispatcher.on('finish', () => {
        console.log('Finished playing!');
        });

        dispatcher.destroy(); // end the stream
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });

bot.login(token);