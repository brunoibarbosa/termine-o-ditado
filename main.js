// Variáveis
const menu = document.querySelector('.menu')
const j_interacao = document.querySelector('.janela_interacao')
const j_pontuacao = document.querySelector('.janela_pontuacao')
const j_ditado = document.querySelector('.janela_ditado')
const p_resposta = document.querySelector('#palavra_chave')
const opcoes = document.querySelector('.opcoes')
const input_range = document.querySelector('.range input[type=range]')
const valor_range = document.querySelector('.range input[type=number]')
const proximoBtn = document.querySelector('#proximoBtn')

const opinioes = {
	o1: "Tá de brincadeira?",
	o2: "Só isso?",
	o3: "Isso nem é desafio...",
	o4: "Mais um pouco",
	o5: "Nem ruim, nem bom",
	o6: "Dá pra brincar",
	o7: "Hmm... interessante",
	o8: "Agora sim",
	o9: "Sobe mais um",
	o10: "Show"
}

const ditados = [
	{
		f1: 'Para bom entendedor,',
		palavra_chave: 'meia',
		f2: 'palavra basta.',
		opcoes: ['meia', 'uma', 'nenhuma'],
		renderizado: false
	},
	{
		f1: 'De grão em grão,',
		palavra_chave: 'a galinha',
		f2: 'enche o papo.',
		opcoes: ['a galinha', 'o galo', 'o corvo'],
		renderizado: false
	},
	{
		f1: 'Cada',
		palavra_chave: 'macaco',
		f2: 'no seu galho.',
		opcoes: ['macaco', 'preguiça', 'pássaro'],
		renderizado: false
	},
	{
		f1: 'Casa de',
		palavra_chave: 'ferreiro',
		f2: ', espeto de pau.',
		opcoes: ['ferreiro', 'marceneiro', 'carpinteiro'],
		renderizado: false
	},
	{
		f1: 'Água mole,',
		palavra_chave: 'pedra dura',
		f2: ', tanto bate até que fura.',
		opcoes: ['pedra dura', 'dentadura', 'ferradura'],
		renderizado: false
	},
	{
		f1: 'Filho de',
		palavra_chave: 'peixe',
		f2: ', peixinho é.',
		opcoes: ['peixe', 'tubarão', 'jacaré'],
		renderizado: false
	},
	{
		f1: 'Cão que',
		palavra_chave: 'ladra',
		f2: 'não morde.',
		opcoes: ['ladra', 'finge de morto', 'deita'],
		renderizado: false
	},
	{
		f1: 'Pimenta nos',
		palavra_chave: 'olhos',
		f2: 'dos outros é refresco.',
		opcoes: ['olhos', 'filhos', 'dedos'],
		renderizado: false
	},
	{
		f1: 'A pressa é',
		palavra_chave: 'inimiga',
		f2: 'da perfeição.',
		opcoes: ['inimiga', 'amiga', 'irmã'],
		renderizado: false
	},
	{
		f1: 'Um dia é da caça,',
		palavra_chave: 'outro',
		f2: 'do caçador.',
		opcoes: ['outro', 'fim de semana', 'o resto'],
		renderizado: false
	},
	{
		f1: 'Cavalo dado não se',
		palavra_chave: 'olha',
		f2: 'os dentes.',
		opcoes: ['olha', 'escova', 'mostra'],
		renderizado: false
	},
	{
		f1: 'Em terra de cego, quem',
		palavra_chave: 'tem um olho',
		f2: 'é rei.',
		opcoes: ['tem um olho', 'é caolho', 'usa óculos'],
		renderizado: false
	},
	{
		f1: 'Quem',
		palavra_chave: 'canta',
		f2: 'seus males espanta.',
		opcoes: ['canta', 'dança', 'balança'],
		renderizado: false
	},
	{
		f1: 'Cada',
		palavra_chave: 'panela',
		f2: 'tem sua tampa.',
		opcoes: ['panela', 'pote', 'garrafa'],
		renderizado: false
	},
	{
		f1: 'Não julgue',
		palavra_chave: 'um livro',
		f2: 'pela capa.',
		opcoes: ['um livro', 'um super-herói', 'um celular'],
		renderizado: false
	},
	{
		f1: 'Quem tem',
		palavra_chave: 'boca',
		f2: 'vai a Roma.',
		opcoes: ['boca', 'perna', 'dinheiro'],
		renderizado: false
	},
	{
		f1: 'Mentira tem',
		palavra_chave: 'perna',
		f2: 'curta.',
		opcoes: ['perna', 'língua', 'saia'],
		renderizado: false
	},
	{
		f1: 'Quem não tem',
		palavra_chave: 'cão',
		f2: ', caça com gato.',
		opcoes: ['cão', 'pato', 'rato'],
		renderizado: false
	},
	{
		f1: 'Mais vale um pássaro na mão do que',
		palavra_chave: 'dois',
		f2: 'voando.',
		opcoes: ['dois', 'um', 'nenhum'],
		renderizado: false
	},
	{
		f1: 'Não adianta chorar pelo',
		palavra_chave: 'leite derramado',
		f2: '.',
		opcoes: ['leite derramado', 'joelho ralado', 'dinheiro perdido'],
		renderizado: false
	}
]

let rodada_num = 0,
	nFrases = 0,
	acertos = 0,
	tempo = new Date(10000),
	contador = 0,
	ditadoAtual,
	contadorRodada = 0,
	ditadosRestantes = 0

function atualizaOpiniao(num) {
	document.querySelector('.dificuldade span').textContent = opinioes['o' + num]
}

function iniciaPartida() {
	rodada_num = 0
	acertos = 0
	geraRodada()
}

function geraRodada() {
	rodada_num++
	tempo.setSeconds(9)

	if (rodada_num > nFrases) {
		mostraPontuacao()
		clearInterval(contador)
		return
	}

	proximoBtn.textContent = rodada_num == nFrases ? 'Terminar' : 'Próximo'

	clearInterval(contador)
	contador = setInterval(cronometro, 1000)

	fraseAleatoria()
	renderizaFrase()
	contadorRodada = setTimeout(avancaFrase, 10000)
}

function cronometro() {
	const tR = document.querySelector('#tempoRestante')
	tR.textContent = `${tempo.getSeconds()}s`
	if (tempo.getSeconds() > 0)
		tempo.setSeconds(tempo.getSeconds() - 1)
	tempo.getSeconds() < 3 ? tR.classList.add('alerta') : tR.classList.remove('alerta')
}

function fraseAleatoria() {
	const frases = ditados.filter(f => f.renderizado == false)
	ditadoAtual = frases[Math.floor(Math.random() * frases.length)]
}

function renderizaFrase() {
	p_resposta.innerHTML = ''

	document.querySelector('#numRodada').textContent = `${rodada_num}/${nFrases}`
	document.querySelector('#f1').textContent = ditadoAtual.f1
	document.querySelector('#f2').textContent = ditadoAtual.f2
	document.querySelector('.opcoes').innerHTML = ''

	let opcs = [...ditadoAtual.opcoes]

	for (let i = 1; i <= 3; i++) {
		const opc = opcs[Math.floor(Math.random() * opcs.length)]

		const span = document.createElement('span')
		span.setAttribute('id', `opc${i}`)
		span.setAttribute('draggable', 'true')
		span.setAttribute('ondragstart', 'drag(event)')
		span.textContent = opc
		opcoes.appendChild(span)

		if (opcs.indexOf(opc) > -1)
			opcs.splice(opcs.indexOf(opc), 1)
	}

	ditadoAtual.renderizado = true
}

function avancaFrase() {
	clearInterval(contadorRodada)
	if (rodada_num <= nFrases) checaResposta()
	geraRodada()
}

function checaResposta() {
	let resposta = p_resposta.firstChild
	if (resposta)
		if (resposta.textContent === ditadoAtual.palavra_chave)
			acertos++
}

function checaDitadosRestantes() {
	let x = 0
	ditados.forEach(d => {
		if (!d.renderizado)
			x++
	})

	ditadosRestantes = x
	if (ditadosRestantes < 10) window.location.reload()
}

function mostraPontuacao() {
	j_pontuacao.classList.remove('oculto')
	j_pontuacao.querySelector('.pontuacao').textContent = `${acertos} de ${nFrases}`
}

function voltarMenu() {
	j_pontuacao.classList.add('oculto')
	j_interacao.classList.add('oculto')
	menu.classList.remove('oculto')
	checaDitadosRestantes()
	clearInterval(contadorRodada)
}

// Funções para Drag and Drop
function permiteDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	const data = ev.dataTransfer.getData("text")

	if (ev.target.tagName === 'SPAN' || ev.target.className === 'janela_ditado' || ev.target.className === 'frase') {
		opcoes.appendChild(document.getElementById(data))
	} else
		ev.target.appendChild(document.getElementById(data))
}

// Ouvintes de eventos
input_range.addEventListener('change', function () {
	valor_range.value = this.value
	atualizaOpiniao(Number(this.value))
})

valor_range.addEventListener('change', function () {
	input_range.value = this.value
	atualizaOpiniao(Number(this.value))
})

document.querySelector('#iniciarBtn').addEventListener('click', function () {
	nFrases = input_range.value
	menu.classList.add('oculto')
	j_interacao.classList.remove('oculto')
	iniciaPartida()
})

proximoBtn.addEventListener('click', avancaFrase)

document.querySelector('#desistirBtn').addEventListener('dblclick', voltarMenu)

document.querySelector('#btnVoltarMenu').addEventListener('click', voltarMenu)

j_ditado.addEventListener('drop', drop)
j_ditado.addEventListener('dragover', permiteDrop)