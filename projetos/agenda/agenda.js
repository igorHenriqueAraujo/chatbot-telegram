const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const moment = require('moment')
const {getAgenda, getTarefa} = require('./agendaServicos')

const bot = new Telegraf(env.token)

bot.start(ctx => {
    const nome = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${nome}!`)
})

const formatarData = data => 
    data ? moment(data).format('DD/MM/YYYY') : ''


const exibirTarefa = async (ctx, tarefaId, novaMsg = false) => {
    const tarefa = await getTarefa(tarefaId)
    const conclusao = tarefa.dt_conclusao ?
        `\n<b>Concluída em:</b> ${formatarData(tarefa.dt_conclusao)}` : ''
    const msg = `
        <b>${tarefa.descricao}</b>
        <b>Previsão:</b> ${formatarData(tarefa.dt_previsao)}${conclusao}
        <b>Observações:</b>\n${tarefa.observacao || ''}
    `

    if (novaMsg) {
        ctx.reply(msg, botoesTarefa(tarefaId))
    } else {
        ctx.editMessageText(msg, botoesTarefa(tarefaId))
    }
}

const botoesAgenda = tarefas => {
    const botoes = tarefas.map(item => {
        const data = item.dt_previsao ? 
            `${formatarData(item.dt_previsao)} - ` : ''
        return [Markup.callbackButton(`${data}${item.descricao}`, `show ${item.id}`)]
    })
    return Extra.markup(Markup.inlineKeyboard(botoes, {columns: 1}))
}

const botoesTarefa = idTarefa => Extra.HTML().markup(Markup.inlineKeyboard([
    Markup.callbackButton('✔️', `finish ${idTarefa}`),
    Markup.callbackButton('📅', `setDate ${idTarefa}`),
    Markup.callbackButton('💬', `addNote ${idTarefa}`),
    Markup.callbackButton('✖️', `delete ${idTarefa}`)
], {columns: 4}))

//------ Comandos do bot

bot.command('dia', async ctx => {
    const tarefas = await getAgenda(moment())
    ctx.reply(`Aqui está a sua agenda do dia`, botoesAgenda(tarefas))
})

//------ Actions do bot

bot.action(/show (.+)/, async ctx => {
    await exibirTarefa(ctx, ctx.match[1])
})

bot.startPolling()