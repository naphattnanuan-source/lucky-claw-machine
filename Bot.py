import os
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'บอท {bot.user.name} ออนไลน์บน GitHub พร้อมใช้งานแล้ว!')
    await bot.change_presence(activity=discord.Game(name="รับปรึกษาปัญหา 24 ชม."))

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    user_message = message.content.lower()

    if "ปรึกษา" in user_message or "ช่วยหน่อย" in user_message:
        await message.reply("สวัสดีครับ ผม KOLI ยินดีให้คำปรึกษาครับ มีเรื่องอะไรไม่สบายใจคุยกับผมได้เลยนะ!")
    elif "สวัสดี" in user_message or "hello" in user_message:
        await message.reply(f"สวัสดีครับคุณ {message.author.name}! มีอะไรให้ KOLI ช่วยเหลือไหมครับ?")

    await bot.process_commands(message)

bot.run(os.environ.get('DISCORD_TOKEN'))
