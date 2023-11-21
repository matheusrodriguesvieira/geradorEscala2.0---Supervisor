var operadores;
var equipamentos;
var turma;
var operadoresDaTurma;
var listaEscalaDaTurma;
// -----------------------------VARIÁVEIS DE BANCO DE DADOS-----------------------------
// USADA PARA GUARDAR OS EQUIPAMENTOS DISPONÍVEIS DO BANCO DE DADOS;
var equipamentosDisponiveis;
var equipamentosIndisponiveis;

// USADA PARA GUARDAR OS OPERADORES DISPONÍVEIS DO BANCO DE DADOS;
var operadoresDisponiveis;

// USADA PARA GUARDAR A ESCALA FINAL;
var escala;

// USADA PARA GUARDAR TODAS AS ESCALAS
var listaEscalas = [];
// ---------------------------------------------------------------------------------------


// -----------------------------VARIÁVEIS DE EVENTOS-----------------------------
var tela2 = document.querySelector('.bodyEscalaContainer');
var tela3 = document.querySelector('.bodyConfiguracoesContainer');
var tela4 = document.querySelector('.bodyEditarEscalaContainer');
var ulListaEscalas = document.querySelector('.listaContainer > ul');

var btnTela2Voltar = document.querySelector('[tela2Voltar]');
var btnMostrarTela2 = document.querySelector('[novaEscala]');
var btnTela3Voltar = document.querySelector('[tela3Voltar]');
var btnMostrarTela3 = document.querySelectorAll('[configuracao]');
var btnTela4Voltar = document.querySelector('[tela4Voltar]');
var btnResetarBancoDados = document.querySelector('[resetarBancoDados]');
var btnGerarEscala = document.querySelector('[gerarEscala]');
// var btnSalvarEscala = document.querySelector('[salvar]');
var btnEditarEscala = document.querySelectorAll('.edit');
var btnSalvarEdicao = document.querySelector('[salvarEdicao]');
let select = document.querySelector('[name = selectTurmas]');

// ---------------------------------------------------------------------------------------

// FUNÇÕES DO BANCO DE DADOS
// ---------------------------------------------------------------------------------------
function resetarParametros() {
    let operadoresBD = localStorage.getItem('operadores');
    let equipamentosBD = localStorage.getItem('equipamentos');
    let listasEscalasBD = localStorage.getItem('listaEscalas');


    operadores = operadoresBD != null ? JSON.parse(operadoresBD) : [
        {
            id: 1,
            nome: "matheus",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 2,
            nome: "kemily",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 3,
            nome: "gerson",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 4,
            nome: "jose ferreira",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 5,
            nome: "cleidiane",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 7,
            nome: "roque colato",
            turma: "d",
            habilitado: {
                d11: false,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 8,
            nome: "andrew",
            turma: "d",
            habilitado: {
                d11: false,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 9,
            nome: "fernando sarmento",
            turma: "d",
            habilitado: {
                d11: false,
                ehgp: true,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 10,
            nome: "helitom",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 11,
            nome: "siromar",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 12,
            nome: "elivaldo",
            turma: "d",
            habilitado: {
                d11: false,
                ehgp: true,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 13,
            nome: "evaldo",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 14,
            nome: "renato",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 15,
            nome: "gilsom",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 16,
            nome: "marcos gomes",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 17,
            nome: "judson",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 18,
            nome: "lucivaldo",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 19,
            nome: "paulo jose",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 20,
            nome: "wilsom",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 21,
            nome: "josias",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 22,
            nome: "luis neto",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: false,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 23,
            nome: "francisco vieira",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 24,
            nome: "francisco de assis",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 25,
            nome: "samuelson",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 26,
            nome: "braga",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: false,
                cat777: true,
            },
            disponivel: true,
        },
        {
            id: 27,
            nome: "luis sobrinho",
            turma: "d",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: true,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 28,
            nome: "operador A",
            turma: "a",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: true,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 29,
            nome: "operador B",
            turma: "b",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: true,
                cat777: false,
            },
            disponivel: true,
        },
        {
            id: 30,
            nome: "operador C",
            turma: "c",
            habilitado: {
                d11: true,
                ehgp: true,
                dragline: true,
                cat777: false,
            },
            disponivel: true,
        },
    ];

    equipamentos = equipamentosBD != null ? JSON.parse(equipamentosBD) : [
        {
            id: 1,
            tag: 'te8020',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 2,
            tag: 'eh9501',
            categoria: "ehgp",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 3,
            tag: 'cb6501',
            categoria: "cat777",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 4,
            tag: 'te8024',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 5,
            tag: 'te8026',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 6,
            tag: 'te8027',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 7,
            tag: 'te8028',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 8,
            tag: 'te8029',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 9,
            tag: 'te8030',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 10,
            tag: 'te8031',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 11,
            tag: 'te8032',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 12,
            tag: 'te8033',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 13,
            tag: 'te8034',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 14,
            tag: 'te8035',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 15,
            tag: 'te8036',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 16,
            tag: 'te8037',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 17,
            tag: 'te8038',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 18,
            tag: 'te8039',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 19,
            tag: 'te8040',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 20,
            tag: 'eh9502',
            categoria: "ehgp",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 21,
            tag: 'eh9503',
            categoria: "ehgp",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 22,
            tag: 'eh9504',
            categoria: "ehgp",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 23,
            tag: 'eh9505',
            categoria: "ehgp",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 24,
            tag: 'cb6502',
            categoria: "cat777",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 25,
            tag: 'cb6503',
            categoria: "cat777",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 26,
            tag: 'cb6504',
            categoria: "cat777",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 27,
            tag: 'te8041',
            categoria: "d11",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
        {
            id: 28,
            tag: 'dg8301',
            categoria: "dragline",
            disponivel: true,
            atividade: "atualize a atividade",
            local: "atualize o local",
            infraestrutura: false,
        },
    ];

    listaEscalas = listasEscalasBD != null ? JSON.parse(listasEscalasBD) : [];

    // LINHAS DOS DADOS DA TURMA
    operadoresDaTurma = operadores.filter((operador) => operador.turma == turma);
    listaEscalaDaTurma = listaEscalas.filter((escala) => escala.turma == turma);

    // console.log('operadoresDaTurma');
    // console.log(operadoresDaTurma);

    equipamentosDisponiveis = equipamentos.filter((equipamento) => equipamento.disponivel == true);
    equipamentosIndisponiveis = equipamentos.filter((equipamento) => equipamento.disponivel == false);
    operadoresDisponiveis = operadoresDaTurma.filter((operador) => operador.disponivel == true);
    escala = [];

    equipamentos.sort((a, b) => {
        return a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0;
    })
    operadoresDaTurma.sort((a, b) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    })
}

function salvarParametros() {

    // REMOVE TODOS OS OPERADORES DA turma
    let copiaOperadores = [];
    operadores.forEach((operador) => {
        if (operador.turma != turma) {
            copiaOperadores.push(operador);
        }
    })


    // ADICIONA O ARRAY DE OPERADORES JÁ COM ATUALIZAÇÕES
    operadoresDaTurma.forEach((operador) => {
        copiaOperadores.push(operador);
    });

    operadores = copiaOperadores;


    let copiaListaEscalas = [];
    // REMOVE TODOS OS OPERADORES DA turma
    listaEscalas.forEach((escala, index) => {
        if (escala.turma != turma) {
            copiaListaEscalas.push(escala);
        }
    })

    // ADICIONA O ARRAY DE OPERADORES JÁ COM ATUALIZAÇÕES
    listaEscalaDaTurma.forEach((escala) => {
        copiaListaEscalas.push(escala);
    });

    listaEscalas = copiaListaEscalas;


    let operadoresBD = operadores;
    let equipamentosBD = equipamentos;
    let listaEscalasBD = listaEscalas;
    localStorage.setItem('operadores', JSON.stringify(operadoresBD));
    localStorage.setItem('equipamentos', JSON.stringify(equipamentosBD));
    localStorage.setItem('listaEscalas', JSON.stringify(listaEscalasBD));
}


// FUNÇÕES LÓGICAS
// --------------------------------------------------------------------------------------------------------
function montarEscala(tag, nome, atividade, local = 'ATUALIZE O LOCAL', transporte = 'MICRO') {

    // console.log("mostrando tag: "+ tag);
    // console.log("mostrando local: "+ local);


    let operadorEquipamento = {
        equipamento: tag.toUpperCase(),
        operador: nome.toUpperCase(),
        local: local.toUpperCase(),
        transporte: transporte.toUpperCase(),
        atividade: atividade.toUpperCase(),
    }

    escala.push(operadorEquipamento);
}

// SALVA NO LOCAL STORAGE
function montarListaEscalas(escala, operadoresForaEscala, equipamentoFaltaOperador) {
    let date = new Date();
    let ano = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    let hora = date.getHours();
    let minuto = date.getMinutes();
    let segundo = date.getSeconds();

    let escalas = {
        turma: turma,
        dataCriacao: `${ano}-${mes}-${dia}`,
        horarioCriacao: `${hora}:${minuto}:${segundo}`,
        nome: `Escala da Turma ${turma.toUpperCase()} - ${ano}/${mes}/${dia}`,
        escala: escala,
        operadoresForaEscala: operadoresForaEscala,
        equipamentoFaltaOperador: equipamentoFaltaOperador
    }

    listaEscalaDaTurma.unshift(escalas);
    // salvarParametros();
}


// FUNÇÃO RESPONSÁVEL POR GERAR UM ESCALA
function mostrarEscala() {
    resetarParametros();
    let contador = 0;
    console.log('mostrando escala');
    // console.log(operadoresDisponiveis);
    while (equipamentosDisponiveis.length > 0 && operadoresDisponiveis.length > 0) {
        if (contador <= 20) {
            console.log('escala 1');
            resetarParametros();
            gerarEscala(1);
            contador++;
        } else if (contador <= 40) {
            console.log('escala 2');
            resetarParametros();

            gerarEscala(2);
            contador++;
        } else if (contador <= 60) {
            console.log('escala 3');
            resetarParametros();

            gerarEscala(3);
            contador++;
        } else if (contador <= 80) {
            console.log('escala 4');
            resetarParametros();

            gerarEscala(4);
            contador++;
        } else {
            alert('Intervenção necessária!');
            break;
        }
    }

    if (equipamentosDisponiveis.length > 0) {
        equipamentosDisponiveis.forEach(equipamento => {
            montarEscala(equipamento.tag, "falta de operador", equipamento.atividade, equipamento.local);
        })
    }

    if (equipamentosIndisponiveis.length > 0) {
        equipamentosIndisponiveis.forEach(equipamento => {
            montarEscala(equipamento.tag, "indisponível", "indisponível", equipamento.local);
        })
    }

    console.log('repetições: ' + contador);
    console.log('escala: ');
    // console.log(escala.sort((a, b) => {
    //     return a.equipamento < b.equipamento ? -1 : a.equipamento > b.equipamento ? 1 : 0;
    // }));
    console.log(escala);

    console.log('operadores fora de escala: ');
    console.log(operadoresDisponiveis);
    console.log('equipamentos sem operador: ');
    console.log(equipamentosDisponiveis);
}

function gerarEscala(tipo) {
    if (tipo == 1) {
        escala1();
    } else if (tipo == 2) {
        escala2();
    } else if (tipo == 3) {
        escala3();
    } else if (tipo == 4) {
        escala4();
    }
}


// --------------FUNÇÕES QUE ESCALAM OS EQUIPAMENTOS-----------
function escalarDragline() {
    if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.dragline == true).length != 0
        )) {
        // console.log('dragline disponível. Quantidade: ' + (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline")).length);


        let draglines = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline");
        let operadores = operadoresDisponiveis.filter((operador) => operador.habilitado.dragline == true);

        while ((draglines.length > 0) && (operadores.length > 0)) {
            let equipamento = draglines[Math.floor(Math.random() * draglines.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            console.log('escala dragline');
            console.log(operadoresDisponiveis);
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            draglines.splice(draglines.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            // console.log(equipamentosDisponiveis);
            // console.log(operadoresDisponiveis);

            montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);


            // console.log('escala: ');
            // console.log(escala);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if (draglines.length > 0 && operadores.length == 0) {
            draglines.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", equipamento.local);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.dragline == false).length != 0
        )) {
        let draglines = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline");
        draglines.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", equipamento.local);
        });
    }
}

function escalarEHGP(preferencia = false) {
    if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.ehgp == true).length != 0
        )
    ) {


        let escavadeiras = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp");
        let operadores = operadoresDisponiveis.filter((operador) => operador.habilitado.ehgp == true);


        // PARTE RESPONSÁVEL PELA PREFERÊNCIA DOS OPERADORES DE ESCAVADEIRA

        if (preferencia) {
            // OPERA APENAS ESCAVADEIRA
            if (operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.cat777 == false && operador.habilitado.dragline == false)).length > 0) {
                let operadoresApenasEhgp = operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.cat777 == false && operador.habilitado.dragline == false))

                while ((escavadeiras.length > 0) && (operadoresApenasEhgp.length > 0)) {
                    let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
                    let operador = operadoresApenasEhgp[Math.floor(Math.random() * operadoresApenasEhgp.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasEhgp.splice(operadoresApenasEhgp.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);

                    // console.log(escala);
                }

            }

            // OPERA ESCAVADEIRA E 777
            if (operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.cat777 == true && operador.habilitado.dragline == false)).length > 0) {
                let operadoresApenasEhgpECat777 = operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.cat777 == true && operador.habilitado.dragline == false))

                // console.log('operadoresApenasEhgpECat777: ' + operadoresApenasEhgpECat777);
                while ((escavadeiras.length > 0) && (operadoresApenasEhgpECat777.length > 0)) {
                    let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
                    let operador = operadoresApenasEhgpECat777[Math.floor(Math.random() * operadoresApenasEhgpECat777.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasEhgpECat777.splice(operadoresApenasEhgpECat777.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);

                    // console.log(escala);
                }
            }
        }
        while ((escavadeiras.length > 0) && (operadores.length > 0)) {
            let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && escavadeiras.length > 0 && operadores.length == 0) {
            escavadeiras.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", equipamento.local);
            });
        }
    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.ehgp == false).length != 0
        )) {
        let escavadeiras = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp");
        escavadeiras.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", equipamento.local);
        });
    }
}

function escalarCat777(preferencia = false) {
    if ((
        equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777").length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.cat777 == true).length != 0
        )
    ) {

        let caminhoes = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777");
        let operadores = operadoresDisponiveis.filter((operador) => operador.habilitado.cat777 == true);


        // PARTE RESPONSÁVEL PELA PREFERÊNCIA DOS OPERADORES

        if (preferencia) {
            // OPERA APENAS 777
            if (operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.ehgp == false && operador.habilitado.dragline == false)).length > 0) {
                let operadoresApenasCat777 = operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.ehgp == false))

                while ((caminhoes.length > 0) && (operadoresApenasCat777.length > 0)) {
                    let equipamento = caminhoes[Math.floor(Math.random() * caminhoes.length)];
                    let operador = operadoresApenasCat777[Math.floor(Math.random() * operadoresApenasCat777.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    caminhoes.splice(caminhoes.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasCat777.splice(operadoresApenasCat777.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);
                }

            }

            // OPERA APENAS CAT777 E EHGP
            if (operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.ehgp == true && operador.habilitado.dragline == false)).length > 0) {
                let operadoresApenasCat777EEscavadeira = operadores.filter((operador) => (operador.habilitado.d11 == false && operador.habilitado.ehgp == true))

                while ((caminhoes.length > 0) && (operadoresApenasCat777EEscavadeira.length > 0)) {
                    let equipamento = caminhoes[Math.floor(Math.random() * caminhoes.length)];
                    let operador = operadoresApenasCat777EEscavadeira[Math.floor(Math.random() * operadoresApenasCat777EEscavadeira.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    caminhoes.splice(caminhoes.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasCat777EEscavadeira.splice(operadoresApenasCat777EEscavadeira.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);
                }
            }
        }

        while ((caminhoes.length > 0) && (operadores.length > 0)) {
            let equipamento = caminhoes[Math.floor(Math.random() * caminhoes.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            caminhoes.splice(caminhoes.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && caminhoes.length > 0 && operadores.length == 0) {
            caminhoes.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", equipamento.local);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.cat777 == false).length != 0
        )) {
        let caminhoes = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777");
        caminhoes.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", equipamento.local);
        });
    }
}

function escalarD11(preferencia = false) {
    if ((
        equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11").length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.d11 == true).length != 0
        )) {

        let d11 = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11");
        let operadores = operadoresDisponiveis.filter((operador) => operador.habilitado.d11 == true);



        while ((d11.length > 0) && (operadores.length > 0)) {



            let equipamento = d11[Math.floor(Math.random() * d11.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            d11.splice(d11.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            montarEscala(equipamento.tag, operador.nome, equipamento.atividade, equipamento.local);

        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && d11.length > 0 && operadores.length == 0) {
            d11.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", equipamento.local);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.habilitado.d11 == false).length != 0
        )) {
        let d11 = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11");
        d11.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", equipamento.local);
        });
    }
}
// --------------------------------------------------------------



// escala totalmente aleatória
function escala1() {

    // ESCALANDO DRAGLINE
    escalarDragline();

    // ESCALANDO EHGP
    escalarEHGP();

    // ESCALANDO CAT777
    escalarCat777();

    // ESCALANDO D11
    escalarD11();

}

// escala aleatória, mas quem opera apenas escavadeiras será escalado com preferência
function escala2() {

    // ESCALANDO DRAGLINE
    escalarDragline();

    // ESCALANDO EHGP
    escalarEHGP(true);

    // ESCALANDO CAT777
    escalarCat777();

    // ESCALANDO D11
    escalarD11();
}

// escala aleatória, mas quem opera apenas cat777 será escalado com preferência
function escala3() {
    escalarDragline();

    // ESCALANDO EHGP
    escalarEHGP();

    // ESCALANDO CAT777
    escalarCat777(true);

    // ESCALANDO D11
    escalarD11();
}

// ESCALA ALEATÓRIA, MAS QUEM OPERA APENAS CAT777 E QUEM OPERA APENAS EHGP SERÁ ESCALADO COM PREFERÊNCIA
function escala4() {

    // ESCALANDO DRAGLINE
    escalarDragline();

    // ESCALANDO EHGP
    escalarEHGP(true);

    // ESCALANDO CAT777
    escalarCat777(true);

    // ESCALANDO D11
    escalarD11(true);
}
// --------------------------------------------------------------------------------------------------------




// FUNÇÕES DE EVENTOS
// --------------------------------------------------------------------------------------------------------

// SALVA NO LOCAL STORAGE
function atualizarTelaEscalas() {
    ulListaEscalas.innerHTML = '';
    listaEscalaDaTurma.forEach((escala, index) => {
        ulListaEscalas.innerHTML += `
        <li id="${index}">
            <div class="liContainer">
                <div>${escala.nome}</div>
                <div>${escala.dataCriacao} ${escala.horarioCriacao}</div>
                <div class="controlesContainer">
                    <a class="icon" deletarEscala${index}>
                        <img src="./images/delete_FILL0_wght400_GRAD0_opsz24.png" alt="" srcset="">
                    </a>
                    <a class="icon" infoEscala${index}>
                        <img src="./images/info_FILL0_wght400_GRAD0_opsz24.png" alt="" srcset="">
                    </a>
                </div>
            </div>
        </li>
        `;
    });

    let lis = document.querySelectorAll(`.listaContainer > ul > li`);
    lis.forEach((li, index) => {
        let btnDeletarEscala = document.querySelector(`[deletarEscala${index}]`);
        let btnInfoEscala = document.querySelector(`[infoEscala${index}]`);

        // PARTE RESPONSÁVEL POR DELETAR A ESCALA
        btnDeletarEscala.addEventListener('click', () => {


            // FOI PRECISO ADAPTAR O CÓDIGO, POIS O SPLICE NÃO FUNCIONOU, SENDO ASSIM UM ARRAY CÓPIA FOI PREENCHIDO SEM O ELEMENTO A SER REMOVIDO
            let elementoParaRemover = listaEscalaDaTurma[index];
            let copiaListaEscalas = [];

            listaEscalaDaTurma.forEach((e) => {
                if (e != elementoParaRemover) {
                    copiaListaEscalas.push(e);
                }
            });
            listaEscalaDaTurma = copiaListaEscalas;

            // console.log(listaEscalaDaTurma);

            // listaEscalas.splice(listaEscalas[index], 1);


            salvarParametros();
            resetarParametros();
            atualizarTelaEscalas();
        });

        // PARTE RESPONSÁVEL POR DETALHES DA ESCALA
        btnInfoEscala.addEventListener('click', () => {

            if (index > 0) {
                btnEditarEscala.forEach(btn => {
                    btn.hidden = true;
                });
            }

            let escala = listaEscalaDaTurma[index].escala;
            let containerEscala = document.querySelector('.creditosEOperadoresForaEscala');
            let textoDeGeracao = `
            <div class="creditsEscalaContainer" detalhesCriacao>
                <p>Generated in <strong>${listaEscalaDaTurma[index].dataCriacao} at ${listaEscalaDaTurma[index].horarioCriacao}</strong></p>
                <p>GEMIN / GADEM</p>

            </div>
            `;

            mostrarTela2();

            btnGerarEscala.hidden = true;
            btnMostrarTela3.hidden = true;
            // btnSalvarEscala.hidden = true;

            renderizarEscala(escala, listaEscalaDaTurma[index].operadoresForaEscala);

            let range = document.createRange();
            containerEscala.appendChild(range.createContextualFragment(textoDeGeracao));

        });


    });


}

// FUNÇÕES DOS BOTÕES DE EVENTOS
// SALVA NO LOCAL STORAGE
function renderizarConfiguracoes() {
    let ulListaOperadores = document.querySelector('[listaOperadores]');
    let ulListaEquipamentos = document.querySelector('[listaEquipamentos]');


    ulListaOperadores.innerHTML = '';
    ulListaEquipamentos.innerHTML = '';

    operadoresDaTurma.forEach((operador, index) => {
        ulListaOperadores.innerHTML += `
                                <li id="${index}">
                                    <div class="liConfiguracaoContainer">
                                        <div class="operadorEEquipamentoNome">${operador.nome.toUpperCase()}</div>
                                        <div class="operadorEEquipamentoStatus">${operador.disponivel ? "Disponível" : "Indisponível"}</div>
                                        <div class="controlesConfiguracaoContainer">
                                            
                                            <div class="switchContainer ${operador.disponivel ? "active" : ""}" operadorSwitch${index}>
                                                <span class='toggleButton'  ></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
        `;
    });

    equipamentos.forEach((equipamento, index) => {
        ulListaEquipamentos.innerHTML += `
                                <li id="${index}">
                                <div class="liConfiguracaoContainer">
                                    <div class="operadorEEquipamentoNome">${equipamento.tag.toUpperCase()}</div>
                                    <div class="operadorEEquipamentoStatus">${equipamento.disponivel ? "Disponível" : "Indisponível"}</div>
                                   
                                    <div class="controlesConfiguracaoContainer">
                                        
                                            <div class="switchContainer ${equipamento.disponivel ? "active" : ""}" equipamentoSwitch${index}>
                                                <span class='toggleButton'  ></span>
                                            </div>                                        
                                    </div>
                                </div>
                            </li>
        `;
    });

    let lisEsquipamentos = document.querySelectorAll('[listaEquipamentos] > li');
    let lisOperadores = document.querySelectorAll('[listaOperadores] > li');


    lisEsquipamentos.forEach((li, index) => {
        let btnSwitch = document.querySelector(`[equipamentoSwitch${index}]`);

        btnSwitch.addEventListener('click', () => {
            // let btnToggle = document.querySelector(`[equipamentoSwitch${index}]`);
            btnSwitch.classList.toggle('active');
            equipamentos[index].disponivel = !equipamentos[index].disponivel;

            let divEquipamentoStatus = li.querySelector(`.operadorEEquipamentoStatus`);
            divEquipamentoStatus.innerText = '';
            divEquipamentoStatus.innerText = equipamentos[index].disponivel ? "Disponível" : "Indisponível";

            salvarParametros();
            // console.log(equipamentos[index].disponivel);
            // renderizarConfiguracoes();
        });


    });

    lisOperadores.forEach((li, index) => {
        let btnSwitch = document.querySelector(`[operadorSwitch${index}]`);

        btnSwitch.addEventListener('click', () => {
            btnSwitch.classList.toggle('active');
            // operadores[operadores.indexOf(operadoresDaTurma[index])].disponivel = !operadores[operadores.indexOf(operadoresDaTurma[index])].disponivel;
            operadoresDaTurma[index].disponivel = !operadoresDaTurma[index].disponivel;

            let divOperadorStatus = li.querySelector(`.operadorEEquipamentoStatus`);
            divOperadorStatus.innerText = '';
            divOperadorStatus.innerText = operadoresDaTurma[index].disponivel ? "Disponível" : "Indisponível";

            salvarParametros();
            // console.log(divOperadorStatus)

            // renderizarConfiguracoes();
        });
    });


}


function renderizarEscala(escala, operadoresForaEscala) {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    escala.sort((a, b) => {
        return a.equipamento < b.equipamento ? -1 : a.equipamento > b.equipamento ? 1 : 0;
    })

    // COR ESPECIAL DE ACORDO COM O ESTADO DO EQUIPAMENTO
    escala.forEach((element, index) => {
        let className;

        if (element.operador == "FALTA DE OPERADOR") {
            className = 'semOperador';
        } else if (element.operador == 'MANUTENÇÃO') {
            className = 'manutencao';
        } else if (element.operador == "INDISPONÍVEL") {
            className = 'indisponivel';
        } else if (element.operador == "INFRAESTRUTURA") {
            className = 'infraestrutura';
        } else {
            className = "";
        }

        let novaLinha = `
                            <tr id=${index}>
                                <td col1 class="${className}"><label for="col1${index}">${element.equipamento}</label></td>
                                <td col2 class="${className}"><label for="col2${index}">${element.operador}</label></td>
                                <td col3 class="${className}"><label for="col3${index}">${element.local}</label></td>
                                <td col4 class="${className}"><label for="col4${index}">${element.transporte}</label></td>
                                <td col5 class="${className}"><label for="col5${index}">${element.atividade}</label></td>
                            </tr>
            
            `;
        tbody.innerHTML += novaLinha;
    });

    let ulOperadoresForaEscala = document.querySelector('.operadoresForaEscalaContainer > ul');
    ulOperadoresForaEscala.innerHTML = '';
    // console.log(operadoresForaEscala);
    if (operadoresForaEscala.length > 0) {
        operadoresForaEscala.forEach(operador => {
            let li = `
            <li>${operador.nome.toUpperCase()}</li>
        `;

            ulOperadoresForaEscala.innerHTML += li;
        });
    }
}

function mostrarTela2() {
    tela2.classList.add('mostrar');
    tela2.classList.remove('esconder');


    let containerEscala = document.querySelector('.creditosEOperadoresForaEscala');
    let textoGeracao = document.querySelector('.creditsEscalaContainer');
    let ulOperadoresForaEscala = document.querySelector('.operadoresForaEscalaContainer > ul');
    ulOperadoresForaEscala.innerHTML = '';


    if (textoGeracao !== null) {
        containerEscala.removeChild(textoGeracao);
    }

    btnGerarEscala.hidden = false;
    // btnSalvarEscala.hidden = false;
    btnMostrarTela3.hidden = false;
}

function mostrarTela3() {
    renderizarConfiguracoes();
    tela3.classList.remove('esconder');
    tela3.classList.add('mostrar');
}


function mostrarTela4(condicao, col) {
    if (condicao) {
        tela4.classList.remove('esconder');
        tela4.classList.add('mostrar');

        let input = document.querySelector(`[inputMudanca]`);

        // console.log(col);

        if (col.getAttribute('col2') != null) {
            let dataListOperadoresDisponiveis = document.querySelector("#operadoresDiponiveis");
            let optionIndisponivel = `<option value="indisponível">`;
            let optionManutencao = `<option value="manutenção">`;
            let optionInfraestrutura = `<option value="infraestrutura">`;
            let optionFaltaOperador = `<option value="falta de operador">`;

            dataListOperadoresDisponiveis.innerHTML = "";
            dataListOperadoresDisponiveis.innerHTML += optionFaltaOperador;
            dataListOperadoresDisponiveis.innerHTML += optionIndisponivel;
            dataListOperadoresDisponiveis.innerHTML += optionInfraestrutura;
            dataListOperadoresDisponiveis.innerHTML += optionManutencao;


            listaEscalaDaTurma[0].operadoresForaEscala.forEach(operador => {
                let option = `<option value="${operador.nome}">`;
                dataListOperadoresDisponiveis.innerHTML += option;
            });

            input.setAttribute('list', 'operadoresDiponiveis');
        }
        if (col.getAttribute('col3') != null) {
            input.setAttribute('list', 'local');
        }
        if (col.getAttribute('col4') != null) {
            input.setAttribute('list', 'transporte');
        }
        if (col.getAttribute('col5') != null) {
            input.setAttribute('list', 'atividadesPrincipais');
        }


        // PARTE RESPONSÁVEL POR VERIFICAR SE OPERADOR DIGITADO É REPETIDO
        // ----------------------------------------------------

        // input.addEventListener('keyup', (e) => {
        //     let tds = document.querySelectorAll('td[col2]');
        //     let valoresTds = [];
        //     console.log('executando');

        //     tds.forEach(element => {
        //         valoresTds.push(element.innerText);
        //     });

        //     if ((e.keyCode >= 32 && e.keyCode <= 126) || (e.keyCode == 127 || e.keyCode == 8) || (e.keyCode == undefined)) {

        //         let quantidadeRepeticoes = valoresTds.filter((valor) => (valor == input.value.toUpperCase()) && (valor != 'FALTA DE OPERADOR') && (valor != 'INDISPONÍVEL') && (valor != 'INFRAESTRUTURA') && (valor != 'MANUTENÇÃO'));

        //         console.log(e.keyCode);
        //         console.log(input.value.toUpperCase());
        //         console.log(quantidadeRepeticoes);

        //         if (quantidadeRepeticoes.length > 0) {
        //             console.log('TESTE');
        //             let index = valoresTds.findIndex(valor => valor == input.value.toUpperCase());
        //             tds[index].classList.add('repetido');
        //             btnSalvarEdicao.disabled = true;
        //             alert('ATENÇÃO!\nVALOR DIGITADO JÁ EXISTE.\nESCOLHA UM OPERADOR FORA DE ESCALA PARA SALVAR')
        //         } else {
        //             let td = document.querySelector('.repetido');
        //             if (td != null) {
        //                 td.classList.remove('repetido');
        //             }
        //             btnSalvarEdicao.disabled = false;
        //         }

        //     }
        // });
        // ----------------------------------------------------

    } else {
        tela4.classList.remove('mostrar');
        tela4.classList.add('esconder');
    }


}

// ATUALIZA O TÍTULO E O PARAMETRO DA TURMA
function atualizarTituloEscalas() {
    let tituloEscalas = document.querySelector('[tituloEscalas]');

    turma = select.value;
    // console.log(turma);
    tituloEscalas.innerHTML = '';
    tituloEscalas.innerHTML = `Escalas Turma ${turma.toUpperCase()}`;
}
// FUNÇÃO RESPONSÁVEL POR CARREGAR TODOS OS EVENTOS E FUNCIONALIDADES DA APLICAÇÃO
function carregarAplicacao() {
    // localStorage.clear();
    // console.log(JSON.parse(localStorage.getItem('equipamentos')));
    // console.log(JSON.parse(localStorage.getItem('operadores')));
    // console.log('LISTA ESCALAS');
    // console.log(JSON.parse(localStorage.getItem('listaEscalas')));
    atualizarTituloEscalas();


    resetarParametros();
    // console.log(operadores);

    atribuirEventos();
    renderizarConfiguracoes();

    if (listaEscalas.length > 0) {
        atualizarTelaEscalas();
    }
}

// RETORNA VERDADEIRO SE A ESCALA CONTEM O OPERADOR
function existeRepeticoes(escala, valor) {
    let retorno = escala.findIndex(element => element.operador.toUpperCase() == valor.toUpperCase());

    return retorno != -1;
}

// VERIFICA SE EXISTE MAIS DE UM CHECKBOX MARCADO
function existeMultiplasInsercoes(checkboxes) {
    let contador = 0;

    // USADO UM FOR COMUM POR QUE EM UM FOREACH O RETURN NÃO ENCERRA A FUNÇÃO COMO UM TODO
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            contador++;
            if (contador > 1) {
                console.log('existeMultiplasInsercoes');
                return true;
            }
        }
    }

    console.log('nao existeMultiplasInsercoes');
    return false;
}

function existeCodigoEspecial(nome) {
    // console.log(inputOperador.toUpperCase() == 'FALTA DE OPERADOR');
    if ((nome.toUpperCase() == 'FALTA DE OPERADOR') || (nome.toUpperCase() == 'INDISPONÍVEL') || (nome.toUpperCase() == 'INFRAESTRUTURA') || (nome.toUpperCase() == 'MANUTENÇÃO')) {
        return true;
    } else {
        return false;
    }
}

// VERIFICA SE O OPERADOR É AUTORIZADO A OPERAR O EQUIPAMENTO
function autorizadoOperar(tag, operadorNome) {
    let indexEquipamento = equipamentos.findIndex(equipamento => equipamento.tag == tag.toLowerCase());
    let indexOperador = operadores.findIndex(operador => operador.nome == operadorNome.toLowerCase());

    if (indexOperador != -1) {
        let categoria = equipamentos[indexEquipamento].categoria;
        let habilitado = operadores[indexOperador].habilitado[categoria];
        return habilitado;
    }

    return true;
}


function atribuirEventos() {
    btnMostrarTela2.addEventListener('click', mostrarTela2)

    btnMostrarTela3.forEach((btn) => {
        btn.addEventListener('click', mostrarTela3);
    });


    // BOTAO VOLTAR DA TELA 2
    btnTela2Voltar.addEventListener('click', () => {
        btnGerarEscala.disabled = false;

        btnEditarEscala.forEach(btn => {
            btn.hidden = false;
        });

        tela2.classList.add('esconder');
        tela2.classList.remove('mostrar');

        //limpa a tela de escalas ao voltar
        resetarParametros();
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
    });

    btnTela4Voltar.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll('[type = checkbox]');
        let input = document.querySelector(`[inputMudanca]`);

        input.value = '';
        mostrarTela4(false);

        btnTela2Voltar.disabled = false;
        btnGerarEscala.disabled = false;
        // btnSalvarEscala.disabled = false;
        btnMostrarTela3[1].disabled = false;



        checkboxes.forEach((check, index) => {
            check.parentElement.innerHTML = '' + check.parentElement.innerText;
        });
    });

    btnTela3Voltar.addEventListener('click', () => {
        tela3.classList.add('esconder');
        tela3.classList.remove('mostrar');
    });

    btnGerarEscala.addEventListener('click', () => {
        // btnSalvarEscala.disabled = false;
        btnGerarEscala.disabled = true;
        mostrarEscala();

        montarListaEscalas(escala, operadoresDisponiveis, equipamentosDisponiveis);
        console.log(listaEscalaDaTurma);

        salvarParametros();
        resetarParametros();
        atualizarTelaEscalas();

        renderizarEscala(listaEscalaDaTurma[0].escala, listaEscalaDaTurma[0].operadoresForaEscala);
    });

    // SALVA NO LOCAL STORAGE
    btnSalvarEdicao.addEventListener('click', () => {
        let tds = document.querySelectorAll(`td[col1]`);
        let input = document.querySelector(`[inputMudanca]`);
        let checkboxes = document.querySelectorAll('[type = checkbox]');


        // VERIFICA SE FOI INSERIDO APENAS ESPAÇOS VAZIOS
        if (input.value.trim() != "") {

            // USADO FOR COMUM PORQUE O RETURN NÃO ENCERRA O FOREACH
            for (let indice = 0; indice < checkboxes.length; indice++) {
                let check = checkboxes[indice];
                if (check.checked) {
                    // VERIFICA A COLUNA CHECADA PARA PODER SALVAR O BANCO DE DADOS
                    if (check.getAttribute('col2') != null) {
                        // VERIFICA SE ESTÁ SENDO INSERIDO UM OPERADOR EM MULTIPLAS LINHAS
                        if (!existeCodigoEspecial(input.value) && (existeMultiplasInsercoes(checkboxes))) {
                            alert('Tentando inserir operador em multiplas linhas.')
                            // mostrarTela4(false);

                            checkboxes.forEach((check) => {
                                check.parentElement.innerHTML = '' + check.parentElement.innerText;
                            })
                            break;
                        } else if (!existeCodigoEspecial(input.value) && (existeRepeticoes(listaEscalaDaTurma[0].escala, input.value))) {
                            alert('Tentando inserir operador repetido')
                            checkboxes.forEach((check) => {
                                check.parentElement.innerHTML = '' + check.parentElement.innerText;
                            })
                            break;
                        } else if ((!existeCodigoEspecial(input.value)) && (!autorizadoOperar(tds[indice].innerText, input.value))) {
                            alert(`Operador ${input.value.toUpperCase()} não autorizado a operar ${tds[indice].innerText}.`);
                            checkboxes.forEach((check) => {
                                check.parentElement.innerHTML = '' + check.parentElement.innerText;
                            })
                            break;
                        } else {
                            let index = listaEscalaDaTurma[0].escala.findIndex((element) => element.operador == check.parentElement.innerText && element.equipamento == tds[indice].innerText);

                            if (listaEscalaDaTurma[0].operadoresForaEscala.findIndex(operador => operador.nome == input.value) != -1) {
                                let indexOperadorForaEscala = listaEscalaDaTurma[0].operadoresForaEscala.findIndex(operador => operador.nome == input.value)
                                listaEscalaDaTurma[0].operadoresForaEscala.splice(indexOperadorForaEscala, 1);
                            }

                            if ((!existeCodigoEspecial(check.parentElement.innerText)) && (operadoresDaTurma.findIndex(operador => operador.nome == check.parentElement.innerText.toLowerCase()) != -1)) {
                                let indexOperadorDaTurma = operadoresDaTurma.findIndex(operador => operador.nome == check.parentElement.innerText.toLowerCase())
                                listaEscalaDaTurma[0].operadoresForaEscala.push(operadoresDaTurma[indexOperadorDaTurma]);
                            }

                            listaEscalaDaTurma[0].escala[index].operador = input.value.toUpperCase();
                        }

                    } else if (check.getAttribute('col3') != null) {
                        let index = listaEscalaDaTurma[0].escala.findIndex((element) => element.local == check.parentElement.innerText && element.equipamento == tds[indice].innerText);
                        listaEscalaDaTurma[0].escala[index].local = input.value.toUpperCase();

                        index = equipamentos.findIndex(equipamento => equipamento.tag.toUpperCase() == listaEscalaDaTurma[0].escala[index].equipamento);
                        equipamentos[index].local = input.value;
                    } else if (check.getAttribute('col4') != null) {
                        let index = listaEscalaDaTurma[0].escala.findIndex((element) => element.transporte == check.parentElement.innerText && element.equipamento == tds[indice].innerText);
                        listaEscalaDaTurma[0].escala[index].transporte = input.value.toUpperCase();
                    } else if (check.getAttribute('col5') != null) {
                        let index = listaEscalaDaTurma[0].escala.findIndex((element) => element.atividade == check.parentElement.innerText && element.equipamento == tds[indice].innerText);
                        listaEscalaDaTurma[0].escala[index].atividade = input.value.toUpperCase();

                        index = equipamentos.findIndex(equipamento => equipamento.tag.toUpperCase() == listaEscalaDaTurma[0].escala[index].equipamento);
                        equipamentos[index].atividade = input.value;

                    }
                }
            };

        }

        salvarParametros();
        resetarParametros();
        console.log('operadoresDaTurma[0].operadoresForaEscala');
        console.log(listaEscalaDaTurma[0].operadoresForaEscala);
        renderizarEscala(listaEscalaDaTurma[0].escala, listaEscalaDaTurma[0].operadoresForaEscala);

        input.value = '';
        btnTela2Voltar.disabled = false;
        btnGerarEscala.disabled = false;
        // btnSalvarEscala.disabled = false;
        btnMostrarTela3[1].disabled = false;
        mostrarTela4(false);


    });


    btnEditarEscala.forEach((btnEditar, index) => {
        btnEditar.addEventListener('click', (e) => {

            let tds = document.querySelectorAll(`td[col${index + 2}]`);
            console.log('clicando');

            // verifica de tem escala gerada
            if (tds.length != 0) {
                mostrarTela4(true, e.target);

                // verifica se tem checkbox em tela
                if (document.querySelectorAll('[type = checkbox]').length == 0) {
                    console.log('adicionando check');

                    btnTela2Voltar.disabled = true;
                    btnGerarEscala.disabled = true;
                    // btnSalvarEscala.disabled = true;
                    btnMostrarTela3[1].disabled = true;

                    tds.forEach((td, jindex) => {
                        let input = `<input type="checkbox" id="col${index + 2}${jindex}" col${index + 2}>`;
                        td.innerHTML = input + td.innerHTML;
                    });

                } else {
                    let checkboxes = document.querySelectorAll('[type = checkbox]');
                    checkboxes.forEach(check => {
                        check.parentElement.innerHTML = '' + check.parentElement.innerText;
                    })

                    mostrarTela4(false, e.target);

                    let input = document.querySelector(`[inputMudanca]`);
                    input.value = '';
                    btnTela2Voltar.disabled = false;
                    btnGerarEscala.disabled = false;
                    // btnSalvarEscala.disabled = false;
                    btnMostrarTela3[1].disabled = false;

                }
            }
        });
    });

    btnResetarBancoDados.addEventListener('click', () => {
        if (confirm("Esta ação irá resetar todos os dados do aplicativo. Deseja realmente fazer isto?")) {
            localStorage.clear();
            location.reload();
            alert('Dados Apagados com sucesso!');
        }
    })

    select.addEventListener('change', () => {
        atualizarTituloEscalas();
        resetarParametros();
        atualizarTelaEscalas();
    })
}


window.addEventListener('load', () => {
    carregarAplicacao();
});
