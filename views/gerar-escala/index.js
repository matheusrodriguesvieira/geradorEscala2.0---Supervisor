var equipamentos;
var turma;
var operadoresDaTurma;
// -----------------------------VARIÁVEIS DE BANCO DE DADOS-----------------------------
// USADA PARA GUARDAR OS EQUIPAMENTOS DISPONÍVEIS DO BANCO DE DADOS;
var equipamentosDisponiveis;
var equipamentosIndisponiveis;

// USADA PARA GUARDAR OS OPERADORES DISPONÍVEIS DO BANCO DE DADOS;
var operadoresDisponiveis;

// USADA PARA GUARDAR A ESCALA FINAL;
var escala;

// USADA PARA GUARDAR TODAS AS ESCALAS
var listaEscalas;
var idLista;
// ---------------------------------------------------------------------------------------


// -----------------------------VARIÁVEIS DE EVENTOS-----------------------------
// var btnMostrarConfiguracao = document.querySelector('[configuracao]');
// var btnMostrarte = document.querySelector('[novaEscala]');


// var telaConfiguracao = document.querySelector('.bodyConfiguracoesContainer');
// var tituloEscalas = document.querySelector('[tituloEscalas]');

// var tela2 = document.querySelector('.bodyEscalaContainer');
// var btnTela2Voltar = document.querySelector('[tela2Voltar]');
var btnMostrarTela1 = document.querySelector('[voltar]');
var btnTela4Voltar = document.querySelector('[tela4Voltar]');
var btnGerarEscala = document.querySelector('[gerarEscala]');
var btnCancelarEdicao = document.querySelector('[cancelar]');
var btnSalvarEdicao = document.querySelector('[salvarEdicao]');
var btnEditarEscala = document.querySelectorAll('.edit');

var telaEdicao = document.querySelector('.bodyEditarEscalaContainer');

// let select = document.querySelector('[name = selectTurmas]');


// var ulListaEscalas = document.querySelector('.listaContainer > ul');




// var btnResetarBancoDados = document.querySelector('[resetarBancoDados]');
// var btnSalvarEscala = document.querySelector('[salvar]');

// ---------------------------------------------------------------------------------------

// FUNÇÕES DO BANCO DE DADOS
// ---------------------------------------------------------------------------------------
async function fetchData(method, data, param) {

    if (method == 'GET') {
        const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/show/${param}`;


        await fetch(URI)
            .then(resposta => resposta.json()) // Converte a resposta para JSON
            .then(dadosResposta => {
                listaEscalas = dadosResposta;
            })
            .catch(erro => console.error('Erro:', erro));

    } else if (method == "POST") {
        let idlista;
        const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/store`;
        const configuracao = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        await fetch(URI, configuracao)
            .then(resposta => {
                return resposta.json()
            }) // Converte a resposta para JSON
            .then(dadosResposta => {
                // console.log(dadosResposta.id);

                if (dadosResposta.id != null) {
                    idlista = dadosResposta.id;
                    Toastify({
                        text: "Escala gerada com sucesso",
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(39, 174, 96,1.0)",
                        }
                    }).showToast();

                } else {

                    Toastify({
                        text: dadosResposta.message.toUpperCase(),
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(192, 57, 43,1.0)",
                        }
                    }).showToast();
                }



            })
            .catch(erro => {
                console.error('Erro:', erro);
                console.error('Resposta do servidor:', erro.response);
            });

        return idlista;

    } else if (method == "PUT") {
        let error;
        const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/update/${param}`;
        const configuracao = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch(URI, configuracao)
            .then(resposta => {
                return resposta.json()
            }) // Converte a resposta para JSON
            .then(dadosResposta => {
                // console.log(dadosResposta.id);
                error = dadosResposta.error;

                if (!error) {

                    Toastify({
                        text: "Salvo com sucesso",
                        duration: 1500,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(39, 174, 96,1.0)",
                        }
                    }).showToast();
                } else {
                    Toastify({
                        text: dadosResposta.message.toUpperCase(),
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(192, 57, 43,1.0)",
                        }
                    }).showToast();

                }


            })
            .catch(erro => {
                console.error('Erro:', erro);
                console.error('Resposta do servidor:', erro.response);

            });

        return error;
    }




    // Faz a requisição usando fetch

}

function montarEscala(tag, nome, matricula, atividade = "atualize", localizacao = 'atualize o local', transporte = 'micro') {

    // console.log("mostrando tag: "+ tag);
    // console.log("mostrando local: "+ local);


    let operadorEquipamento = {
        tag: tag,
        matricula: matricula,
        operador: nome,
        localizacao: localizacao,
        transporte: transporte,
        atividade: atividade
    }

    escala.push(operadorEquipamento);
}

// SALVA NO LOCAL STORAGE
function montarListaEscalas(escala, operadoresForaEscala) {
    // let date = new Date();
    // let ano = date.getFullYear();
    // let mes = date.getMonth() + 1;
    // let dia = date.getDate();
    // let hora = date.getHours();
    // let minuto = date.getMinutes();
    // let segundo = date.getSeconds();

    let escalas = {
        turma: turma,
        // dataCriacao: `${ano}-${mes}-${dia}`,
        // horarioCriacao: `${hora}:${minuto}:${segundo}`,
        // nomeLista: `Escala da Turma ${turma.toUpperCase()} - ${ano}/${mes}/${dia}`,
        escala: escala,
        operadoresForaEscala: operadoresForaEscala,
    }

    listaEscalas = escalas;
    // salvarParametros();
}

function renderizarEscala(escala, operadoresForaEscala) {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    escala.sort((a, b) => {
        return a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0;
    })

    // COR ESPECIAL DE ACORDO COM O ESTADO DO EQUIPAMENTO
    escala.forEach((element, index) => {
        let className;

        if (element.nome == "falta de operador") {
            className = 'semOperador';
        } else if (element.nome == 'manutenção') {
            className = 'manutencao';
        } else if (element.nome == "indisponível") {
            className = 'indisponivel';
        } else if (element.nome == "infraestrutura") {
            className = 'infraestrutura';
        } else if (element.nome == "treinamento") {
            className = 'treinamento';
        } else {
            className = "";
        }

        let novaLinha = `
                            <tr id=${index}>
                                <td col1 class="${className}"><label for="col1${index}">${element.tag}</label></td>
                                <td col2 class="${className}"><label for="col2${index}">${element.nome}</label></td>
                                <td col3 class="${className}"><label for="col3${index}">${element.localizacao}</label></td>
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
            <li>${operador.nome}</li>
        `;

            ulOperadoresForaEscala.innerHTML += li;
        });
    }
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
            montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
        })
    }

    if (equipamentosIndisponiveis.length > 0) {
        equipamentosIndisponiveis.forEach(equipamento => {
            montarEscala(equipamento.tag, "indisponível", 2, equipamento.atividade, equipamento.local, equipamento.transporte);
        })
    }

    // console.log('repetições: ' + contador);
    // console.log('escala: ');
    // // console.log(escala.sort((a, b) => {
    // //     return a.equipamento < b.equipamento ? -1 : a.equipamento > b.equipamento ? 1 : 0;
    // // }));
    // console.log(escala);

    // console.log('operadores fora de escala: ');
    // console.log(operadoresDisponiveis);
    // console.log('equipamentos sem operador: ');
    // console.log(equipamentosDisponiveis);
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
            operadoresDisponiveis.filter((operador) => operador.dragline == true).length != 0
        )) {
        // console.log('dragline disponível. Quantidade: ' + (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline")).length);


        let draglines = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline");
        let operadores = operadoresDisponiveis.filter((operador) => operador.dragline == true);

        while ((draglines.length > 0) && (operadores.length > 0)) {
            let equipamento = draglines[Math.floor(Math.random() * draglines.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            // console.log('escala dragline');
            // console.log(operadoresDisponiveis);
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            draglines.splice(draglines.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            // console.log(equipamentosDisponiveis);
            // console.log(operadoresDisponiveis);

            montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);


            // console.log('escala: ');
            // console.log(escala);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if (draglines.length > 0 && operadores.length == 0) {
            draglines.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.dragline == false).length != 0
        )) {
        let draglines = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline");
        draglines.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
        });
    }
}

function escalarEHGP(preferencia = false) {
    if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.ehgp == true).length != 0
        )
    ) {


        let escavadeiras = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp");
        let operadores = operadoresDisponiveis.filter((operador) => operador.ehgp == true);


        // PARTE RESPONSÁVEL PELA PREFERÊNCIA DOS OPERADORES DE ESCAVADEIRA

        if (preferencia) {
            // OPERA APENAS ESCAVADEIRA
            if (operadores.filter((operador) => (operador.d11 == false && operador.cat777 == false && operador.dragline == false)).length > 0) {
                let operadoresApenasEhgp = operadores.filter((operador) => (operador.d11 == false && operador.cat777 == false && operador.dragline == false))

                while ((escavadeiras.length > 0) && (operadoresApenasEhgp.length > 0)) {
                    let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
                    let operador = operadoresApenasEhgp[Math.floor(Math.random() * operadoresApenasEhgp.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasEhgp.splice(operadoresApenasEhgp.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);

                    // console.log(escala);
                }

            }

            // OPERA ESCAVADEIRA E 777
            if (operadores.filter((operador) => (operador.d11 == false && operador.cat777 == true && operador.dragline == false)).length > 0) {
                let operadoresApenasEhgpECat777 = operadores.filter((operador) => (operador.d11 == false && operador.cat777 == true && operador.dragline == false))

                // console.log('operadoresApenasEhgpECat777: ' + operadoresApenasEhgpECat777);
                while ((escavadeiras.length > 0) && (operadoresApenasEhgpECat777.length > 0)) {
                    let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
                    let operador = operadoresApenasEhgpECat777[Math.floor(Math.random() * operadoresApenasEhgpECat777.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasEhgpECat777.splice(operadoresApenasEhgpECat777.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);

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

            montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && escavadeiras.length > 0 && operadores.length == 0) {
            escavadeiras.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
            });
        }
    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.ehgp == false).length != 0
        )) {
        let escavadeiras = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "ehgp");
        escavadeiras.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
        });
    }
}

function escalarCat777(preferencia = false) {
    if ((
        equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777").length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.cat777 == true).length != 0
        )
    ) {

        let caminhoes = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777");
        let operadores = operadoresDisponiveis.filter((operador) => operador.cat777 == true);


        // PARTE RESPONSÁVEL PELA PREFERÊNCIA DOS OPERADORES

        if (preferencia) {
            // OPERA APENAS 777
            if (operadores.filter((operador) => (operador.d11 == false && operador.ehgp == false && operador.dragline == false)).length > 0) {
                let operadoresApenasCat777 = operadores.filter((operador) => (operador.d11 == false && operador.ehgp == false))

                while ((caminhoes.length > 0) && (operadoresApenasCat777.length > 0)) {
                    let equipamento = caminhoes[Math.floor(Math.random() * caminhoes.length)];
                    let operador = operadoresApenasCat777[Math.floor(Math.random() * operadoresApenasCat777.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    caminhoes.splice(caminhoes.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasCat777.splice(operadoresApenasCat777.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);
                }

            }

            // OPERA APENAS CAT777 E EHGP
            if (operadores.filter((operador) => (operador.d11 == false && operador.ehgp == true && operador.dragline == false)).length > 0) {
                let operadoresApenasCat777EEscavadeira = operadores.filter((operador) => (operador.d11 == false && operador.ehgp == true))

                while ((caminhoes.length > 0) && (operadoresApenasCat777EEscavadeira.length > 0)) {
                    let equipamento = caminhoes[Math.floor(Math.random() * caminhoes.length)];
                    let operador = operadoresApenasCat777EEscavadeira[Math.floor(Math.random() * operadoresApenasCat777EEscavadeira.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    caminhoes.splice(caminhoes.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasCat777EEscavadeira.splice(operadoresApenasCat777EEscavadeira.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);
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

            montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);
        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && caminhoes.length > 0 && operadores.length == 0) {
            caminhoes.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.cat777 == false).length != 0
        )) {
        let caminhoes = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "cat777");
        caminhoes.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
        });
    }
}

function escalarD11(preferencia = false) {
    if ((
        equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11").length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.d11 == true).length != 0
        )) {

        let d11 = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11");
        let operadores = operadoresDisponiveis.filter((operador) => operador.d11 == true);



        while ((d11.length > 0) && (operadores.length > 0)) {



            let equipamento = d11[Math.floor(Math.random() * d11.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            d11.splice(d11.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);

            montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);

        }

        // VERIFICA SE TEM EQUIPAMENTO DISPONÍVEL E NÃO TEM OPERADOR
        if ((preferencia) && d11.length > 0 && operadores.length == 0) {
            d11.forEach(equipamento => {
                equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
            });
        }

    } else if ((
        (equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11")).length != 0
    ) && (
            operadoresDisponiveis.filter((operador) => operador.d11 == false).length != 0
        )) {
        let d11 = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "d11");
        d11.forEach(equipamento => {
            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            montarEscala(equipamento.tag, "falta de operador", 3, equipamento.atividade, equipamento.local, equipamento.transporte);
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

function resetarParametros() {
    equipamentosDisponiveis = equipamentos.filter((equipamento) => equipamento.disponivel == true);
    equipamentosIndisponiveis = equipamentos.filter((equipamento) => equipamento.disponivel == false);
    operadoresDisponiveis = operadoresDaTurma.filter((operador) => operador.disponivel == true);
    escala = [];
    listaEscalas = {};
}

function mostrarTela1() {
    window.location.href = '../tela2/index.html';



    // let containerEscala = document.querySelector('.creditosEOperadoresForaEscala');
    // let textoGeracao = document.querySelector('.creditsEscalaContainer');
    // let ulOperadoresForaEscala = document.querySelector('.operadoresForaEscalaContainer > ul');
    // ulOperadoresForaEscala.innerHTML = '';


    // if (textoGeracao !== null) {
    //     containerEscala.removeChild(textoGeracao);
    // }

    // btnGerarEscala.hidden = false;
    // // btnSalvarEscala.hidden = false;
    // btnMostrarTela3.hidden = false;
}

async function mostrarTelaEdicao(col) {

    telaEdicao.classList.toggle('mostrar');

    if (telaEdicao.classList.contains('mostrar')) {
        let input = document.querySelector(`[inputMudanca]`);

        // console.log(col);

        if (col.getAttribute('col2') != null) {
            let operadores;

            const URI = `https://backend-rotas-alternativas.vercel.app/operadores/index`;
            await fetch(URI)
                .then(resposta => resposta.json()) // Converte a resposta para JSON
                .then(dadosResposta => {
                    operadores = dadosResposta;
                })
                .catch(erro => console.error('Erro:', erro));

            operadores.sort((a, b) => {
                return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
            })

            let selectOperadoresDisponiveis = document.getElementById("operadoresDiponiveis");
            // let optionIndisponivel = `<option value="indisponível">`;
            // let optionManutencao = `<option value="manutenção">`;
            // let optionInfraestrutura = `<option value="infraestrutura">`;
            // let optionFaltaOperador = `<option value="falta de operador">`;

            selectOperadoresDisponiveis.innerHTML = "";
            // selectOperadoresDisponiveis.innerHTML += optionFaltaOperador;
            // selectOperadoresDisponiveis.innerHTML += optionIndisponivel;
            // selectOperadoresDisponiveis.innerHTML += optionInfraestrutura;
            // selectOperadoresDisponiveis.innerHTML += optionManutencao;


            operadores.forEach(operador => {
                let option = `<option value="${operador.matricula} - ${operador.nome.toUpperCase()}${operador.turma == "" ? "" : " - Turma " + operador.turma.toUpperCase()}">`;
                selectOperadoresDisponiveis.innerHTML += option;
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

    }
}

// FUNÇÃO RESPONSÁVEL POR CARREGAR TODOS OS EVENTOS E FUNCIONALIDADES DA APLICAÇÃO
async function carregarAplicacao() {
    turma = sessionStorage.getItem('turma');
    equipamentos = JSON.parse(sessionStorage.getItem('equipamentos'));
    operadoresDaTurma = JSON.parse(sessionStorage.getItem('operadoresDaTurma'));



    // localStorage.clear();
    // console.log(JSON.parse(localStorage.getItem('equipamentos')));
    // console.log(JSON.parse(localStorage.getItem('operadores')));
    // console.log('LISTA ESCALAS');
    // console.log(JSON.parse(localStorage.getItem('listaEscalass')));

    // atualizarTituloEscalas();


    resetarParametros();

    if (sessionStorage.getItem("idLista") != null) {
        btnGerarEscala.disabled = true;

        idLista = JSON.parse(sessionStorage.getItem("idLista"));
        // console.log(idlista);
        await fetchData("GET", "", idLista);

        // console.log(listaEscalas);
        renderizarEscala(listaEscalas.escala, listaEscalas.operadoresForaEscala);

    }
    // console.log(operadores);

    atribuirEventos();
    // renderizarConfiguracoes();

    // if (listaEscalas.length > 0) {
    //     atualizarTelaEscalas();
    // }
}

function atribuirEventos() {
    // // BOTAO VOLTAR DA TELA 2
    btnMostrarTela1.addEventListener('click', () => {
        window.location.href = '../main/index.html';
    });

    btnEditarEscala.forEach((btnEditar, index) => {
        btnEditar.addEventListener('click', (e) => {

            let tds = document.querySelectorAll(`td[col${index + 2}]`);
            console.log('clicando');

            // verifica de tem escala gerada
            if (tds.length != 0) {

                // verifica se nao tem checkbox em tela
                if (document.querySelectorAll('[type = checkbox]').length == 0) {
                    console.log('adicionando check');
                    mostrarTelaEdicao(e.target);

                    btnMostrarTela1.disabled = true;
                    btnGerarEscala.disabled = true;
                    // btnSalvarEscala.disabled = true;
                    // btnMostrarTela3[1].disabled = true;

                    tds.forEach((td, jindex) => {
                        let input = `<input type="checkbox" id="col${index + 2}${jindex}" col${index + 2}>`;
                        td.innerHTML = input + td.innerHTML;
                    });

                } else {
                    let checkboxes = document.querySelectorAll('[type = checkbox]');
                    checkboxes.forEach(check => {
                        check.parentElement.innerHTML = '' + check.parentElement.innerText;
                    })

                    mostrarTelaEdicao(e.target);

                    let input = document.querySelector(`[inputMudanca]`);
                    input.value = '';
                    btnMostrarTela1.disabled = false;
                    btnGerarEscala.disabled = false;
                    // btnSalvarEscala.disabled = false;
                    // btnMostrarTela3[1].disabled = false;

                }
            }
        });
    });


    btnCancelarEdicao.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll('[type = checkbox]');
        let input = document.querySelector(`[inputMudanca]`);

        input.value = '';
        mostrarTelaEdicao();

        btnMostrarTela1.disabled = false;
        // btnGerarEscala.disabled = false;
        // btnSalvarEscala.disabled = false;
        // btnMostrarTela3[1].disabled = false;




        checkboxes.forEach((check, index) => {
            check.parentElement.innerHTML = '' + check.parentElement.innerText;
        });
    });

    btnSalvarEdicao.addEventListener('click', async () => {
        // alert('salvou');
        let tds = document.querySelectorAll(`td[col1]`);
        let checkboxes = document.querySelectorAll('[type = checkbox]');
        let input = document.querySelector(`[inputMudanca]`);

        // console.log(listaEscalas);



        // VERIFICA SE FOI INSERIDO APENAS ESPAÇOS VAZIOS
        if (input.value.trim() != "") {

            btnSalvarEdicao.disabled = true;
            let atualizacoesLista = {
                escala: []
            };
            // USADO FOR COMUM PORQUE O RETURN NÃO ENCERRA O FOREACH
            for (let indice = 0; indice < checkboxes.length; indice++) {
                let check = checkboxes[indice];
                if (check.checked) {
                    // VERIFICA A COLUNA CHECADA PARA PODER SALVAR O BANCO DE DADOS
                    if (check.getAttribute('col2') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);
                        let escala = { ...listaEscalas.escala[index] };

                        let matricula = input.value.split('-')
                        matricula = matricula[0].trim();
                        escala.matricula = parseInt(matricula);

                        atualizacoesLista.escala.push(escala);
                        // console.log(atualizacoesLista);
                        // console.log(typeof matricula);


                        // VERIFICA SE ESTÁ SENDO INSERIDO UM OPERADOR EM MULTIPLAS LINHAS
                        // let index = listaEscalaDaTurma[0].escala.findIndex((element) => element.operador == check.parentElement.innerText && element.equipamento == tds[indice].innerText);

                        // if (listaEscalaDaTurma[0].operadoresForaEscala.findIndex(operador => operador.nome == input.value) != -1) {
                        //     let indexOperadorForaEscala = listaEscalaDaTurma[0].operadoresForaEscala.findIndex(operador => operador.nome == input.value)
                        //     listaEscalaDaTurma[0].operadoresForaEscala.splice(indexOperadorForaEscala, 1);
                        // }

                        // if ((!existeCodigoEspecial(check.parentElement.innerText)) && (operadoresDaTurma.findIndex(operador => operador.nome == check.parentElement.innerText.toLowerCase()) != -1)) {
                        //     let indexOperadorDaTurma = operadoresDaTurma.findIndex(operador => operador.nome == check.parentElement.innerText.toLowerCase())
                        //     listaEscalaDaTurma[0].operadoresForaEscala.push(operadoresDaTurma[indexOperadorDaTurma]);
                        // }

                        // listaEscalaDaTurma[0].escala[index].operador = input.value.toUpperCase();

                    } else if (check.getAttribute('col3') != null) {
                        // console.log(listaEscalas);
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);
                        let escala = { ...listaEscalas.escala[index] };
                        escala.localizacao = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);
                        // console.log(atualizacoesLista);

                        // console.log(listaEscalas.escala[index]);
                        // console.log(atualizacoesLista.escala);

                        // listaEscalas.escala[index].localizacao = input.value;
                        // console.log(input.value.toUpperCase());
                        // console.log(index);

                        // index = equipamentos.findIndex(equipamento => equipamento.tag.toUpperCase() == listaEscalas.escala[index].equipamento);
                        // equipamentos[index].local = input.value;
                    } else if (check.getAttribute('col4') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);

                        // listaEscalas.escala[index].transporte = input.value;

                        let escala = { ...listaEscalas.escala[index] };
                        escala.transporte = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);

                    } else if (check.getAttribute('col5') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);
                        let escala = { ...listaEscalas.escala[index] };
                        escala.atividade = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);
                        // console.log(atualizacoesLista.escala.push(escala));
                        // listaEscalas.escala[index].atividade = input.value;
                    }
                }
            };

            let loading = document.querySelector('.component-loading-container');

            loading.classList.toggle('mostrar');

            if (!(await fetchData("PUT", atualizacoesLista, idLista))) {
                await fetchData("GET", "", idLista);
            }

            loading.classList.toggle('mostrar');

        }

        input.value = '';

        mostrarTelaEdicao();
        checkboxes.forEach((check, index) => {
            check.parentElement.innerHTML = '' + check.parentElement.innerText;
        });
        renderizarEscala(listaEscalas.escala, listaEscalas.operadoresForaEscala);
        btnMostrarTela1.disabled = false;
        btnSalvarEdicao.disabled = false;


        // console.log(listaEscalas);

    })

    btnGerarEscala.addEventListener('click', async () => {
        // btnSalvarEscala.disabled = false;
        btnGerarEscala.disabled = true;
        let loading = document.querySelector('.component-loading-container');

        loading.classList.toggle('mostrar');
        mostrarEscala();

        montarListaEscalas(escala, operadoresDisponiveis.map(operador => operador.matricula));
        // console.log();
        // listaEscalas.turma = ""
        // console.log(listaEscalas);
        idLista = await fetchData("POST", listaEscalas, "");
        // console.log("idlista ", idlista);
        // console.log("executando o get");
        await fetchData("GET", "", idLista);
        loading.classList.toggle('mostrar');



        // salvarParametros();
        // resetarParametros();
        // atualizarTelaEscalas();

        renderizarEscala(listaEscalas.escala, listaEscalas.operadoresForaEscala);
    });


}





window.addEventListener('load', async () => {
    if (sessionStorage.getItem('turma') == null) {
        window.location.replace('../main/index.html');
    }

    let loading = document.querySelector('.screen-loading-container');

    await carregarAplicacao();
    loading.classList.toggle('mostrar');
});
