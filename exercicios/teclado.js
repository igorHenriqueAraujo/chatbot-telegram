const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['🐷 Porco', '🐮 Vaca', '🐑 Carneiro'],
    ['🐔 Galinha', '🐣 Eu como é ovo'],
    ['🐟 Peixe', '🐙 Frutos do mar'],
    ['🍄 Eu sou vegetariano']
]).resize().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
    await ctx.reply(`Qual bebida você prefere?`, 
    Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra())
})

bot.hears(['Coca', 'Pepsi'], async ctx => {
    await ctx.reply(`Nossa! eu também gosto de ${ctx.match}`)
    await ctx.reply('Qual a sua carne predileta?', tecladoCarne)
})

bot.hears('🐮 Vaca', ctx => ctx.reply('A minha predileta também!!'))
bot.hears('🍄 Eu sou vegetariano', ctx => ctx.reply('Que idiotice, negócio é boi sangrando!!!'))
bot.on('text', ctx => ctx.reply('Legal! Eu gosto mais de 🐮 Vaca'))

bot.startPolling()