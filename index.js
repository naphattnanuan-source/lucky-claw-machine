const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// สร้าง Client ของบอท โดยใส่ Intents ให้ตรงกับที่เปิดไว้ใน Developer Portal
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// รายการของรางวัลในตู้คีบและโอกาสดรอป (รวมกันได้ 1.0 หรือ 100%)
const prizes = [
    { name: '🧸 ตุ๊กตาหมีแรร์สุดน่ารัก', chance: 0.15 },
    { name: '🦖 ตุ๊กตาไดโนเสาร์ทีเร็กซ์', chance: 0.20 },
    { name: '🦊 พวงกุญแจสุนัขจิ้งจอก', chance: 0.30 },
    { name: '❌ แขนคีบวืด! ไม่ได้รับอะไรเลย', chance: 0.35 }
];

client.once('ready', async () => {
    console.log(`🤖 บอทตู้คีบ ${client.user.tag} ออนไลน์บน Render แล้ว!`);
    
    // ลงทะเบียนคำสั่งสแลช /claw
    const clawCommand = new SlashCommandBuilder()
        .setName('claw')
        .setDescription('หยอดเหรียญสุ่มคีบตุ๊กตาจากตู้!');
        
    await client.application.commands.set([clawCommand]);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'claw') {
        // ส่งข้อความเริ่มเกมก่อน
        await interaction.reply('🪙 คุณหยอดเหรียญแล้ว... ขยับแขนคีบ แป๊บๆๆ... 🕹️');

        // หน่วงเวลา 3 วินาทีให้ลุ้นเหมือนตู้คีบจริง
        setTimeout(async () => {
            const random = Math.random();
            let accumulatedChance = 0;
            let winPrize = prizes[prizes.length - 1].name;

            for (const prize of prizes) {
                accumulatedChance += prize.chance;
                if (random <= accumulatedChance) {
                    winPrize = prize.name;
                    break;
                }
            }

            // สร้างการ์ดข้อความสวยๆ (Embed)
            const resultEmbed = new EmbedBuilder()
                .setTitle('🕹️ ผลการคีบ Lucky Claw Machine!')
                .setDescription(`ผลลัพธ์ที่คุณคีบได้คือ: **${winPrize}**`)
                .setColor(winPrize.includes('❌') ? '#ff4d4d' : '#4dff4d')
                .setTimestamp();

            await interaction.editReply({ content: '✨ **แขนคีบปล่อยรางวัลแล้ว!** ✨', embeds: [resultEmbed] });
        }, 3000);
    }
});

// ดึง Token จากตัวแปรสภาพแวดล้อม (Environment Variable) ปลอดภัยที่สุด
client.login(process.env.DISCORD_TOKEN);
