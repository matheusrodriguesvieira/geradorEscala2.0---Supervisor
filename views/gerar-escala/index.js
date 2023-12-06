var equipamentos;
var turma;
var operadoresDaTurma;
var token;
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

var telaEdicao = document.querySelector('.mainEditarEscalaContainer');

// ---------------------------------------------------------------------------------------

// FUNÇÕES DO BANCO DE DADOS
// ---------------------------------------------------------------------------------------
async function fetchData(method, data, param) {

    if (method == 'GET') {
        const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/show/${param}`;
        const configuracao = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        };

        await fetch(URI, configuracao)
            .then(resposta => resposta.json()) // Converte a resposta para JSON
            .then(dados => {

                if (dados.error) {
                    Toastify({
                        text: dados.message,
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(192, 57, 43,1.0)",
                        }
                    }).showToast();
                    setTimeout(() => {
                        window.location.replace('../login/index.html');
                    }, 3000);
                } else {
                    listaEscalas = dados;
                }
            })
            .catch(erro => console.error('Erro:', erro));

    } else if (method == "POST") {
        let idlista;
        const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/store`;
        const configuracao = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(data)
        };

        await fetch(URI, configuracao)
            .then(resposta => {
                return resposta.json()
            }) // Converte a resposta para JSON
            .then(dados => {

                if (dados.error) {
                    Toastify({
                        text: dados.message,
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(192, 57, 43,1.0)",
                        }
                    }).showToast();
                    setTimeout(() => {
                        window.location.replace('../login/index.html');
                    }, 3000);
                } else {
                    if (dados.id != null) {
                        idlista = dados.id;
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
                            text: dados.message.toUpperCase(),
                            duration: 3000,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "rgba(192, 57, 43,1.0)",
                            }
                        }).showToast();
                    }
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
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(data)
        };
        await fetch(URI, configuracao)
            .then(resposta => {
                return resposta.json()
            }) // Converte a resposta para JSON
            .then(dados => {
                error = dados.error;

                if (dados.error) {
                    Toastify({
                        text: dados.message.toUpperCase(),
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "rgba(192, 57, 43,1.0)",
                        }
                    }).showToast();
                } else {
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
    while (equipamentosDisponiveis.length > 0 && operadoresDisponiveis.length > 0) {
        if (contador <= 20) {
            resetarParametros();
            gerarEscala(1);
            contador++;
        } else if (contador <= 40) {
            resetarParametros();

            gerarEscala(2);
            contador++;
        } else if (contador <= 60) {
            resetarParametros();

            gerarEscala(3);
            contador++;
        } else if (contador <= 80) {
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


        let draglines = equipamentosDisponiveis.filter((equipamento) => equipamento.categoria == "dragline");
        let operadores = operadoresDisponiveis.filter((operador) => operador.dragline == true);

        while ((draglines.length > 0) && (operadores.length > 0)) {
            let equipamento = draglines[Math.floor(Math.random() * draglines.length)];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];

            equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
            operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

            draglines.splice(draglines.indexOf(equipamento), 1);
            operadores.splice(operadores.indexOf(operador), 1);


            montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);


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

                }

            }

            // OPERA ESCAVADEIRA E 777
            if (operadores.filter((operador) => (operador.d11 == false && operador.cat777 == true && operador.dragline == false)).length > 0) {
                let operadoresApenasEhgpECat777 = operadores.filter((operador) => (operador.d11 == false && operador.cat777 == true && operador.dragline == false))

                while ((escavadeiras.length > 0) && (operadoresApenasEhgpECat777.length > 0)) {
                    let equipamento = escavadeiras[Math.floor(Math.random() * escavadeiras.length)];
                    let operador = operadoresApenasEhgpECat777[Math.floor(Math.random() * operadoresApenasEhgpECat777.length)];

                    equipamentosDisponiveis.splice(equipamentosDisponiveis.indexOf(equipamento), 1);
                    operadoresDisponiveis.splice(operadoresDisponiveis.indexOf(operador), 1);

                    escavadeiras.splice(escavadeiras.indexOf(equipamento), 1);
                    operadores.splice(operadores.indexOf(operador), 1);
                    operadoresApenasEhgpECat777.splice(operadoresApenasEhgpECat777.indexOf(operador), 1);

                    montarEscala(equipamento.tag, operador.nome, operador.matricula, equipamento.atividade, equipamento.local);

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



async function mostrarTelaEdicao(col) {

    telaEdicao.classList.toggle('mostrar');
    let containerBtns = document.querySelector(`.personalizadoBtnContainer`);
    containerBtns.classList.toggle('esconder');

    if (telaEdicao.classList.contains('mostrar')) {
        if (col.getAttribute('col2') != null) {
            let operadores;

            const URI = `https://backend-rotas-alternativas.vercel.app/operadores/index`;
            const configuracao = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
            }

            await fetch(URI, configuracao)
                .then(resposta => resposta.json()) // Converte a resposta para JSON
                .then(dados => {

                    if (dados.error) {
                        Toastify({
                            text: dados.message.toUpperCase(),
                            duration: 3000,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "rgba(192, 57, 43,1.0)",
                            }
                        }).showToast();
                    } else {

                        operadores = dados;
                    }
                })
                .catch(erro => console.error('Erro:', erro));

            operadores.sort((a, b) => {
                return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
            })


            let select = document.querySelector("#select-field");
            let checkPersonalizadoContainer = document.querySelector('.checkbox-container');
            let inputPersonalizado = document.querySelector('[inputMudanca]');

            inputPersonalizado.hidden = true;
            select.hidden = false;

            select.innerHTML = '';
            checkPersonalizadoContainer.innerHTML = '';

            let defaultOption = `<option value="" checked>Selecione uma opção</option>`;
            select.innerHTML += defaultOption;
            operadores.forEach(operador => {
                let option = `<option value="${operador.matricula}">${operador.nome.toUpperCase()}${operador.turma == "" ? "" : " - Turma " + operador.turma.toUpperCase()}</option>`;
                select.innerHTML += option;
            });


        }
        if (col.getAttribute('col3') != null) {



            let select = document.querySelector("#select-field");
            select.innerHTML = '';


            let defaultOption = `<option value="" checked>Selecione uma opção</option>`;
            select.innerHTML += defaultOption;

            let options = `
            <option value="MINA 4AB">MINA 4AB</option>
            <option value="MINA 4CD">MINA 4CD</option>
            <option value="MINA 4EF">MINA 4EF</option>
            <option value="MINA 4GH">MINA 4GH</option>
            <option value="MINA 4IJ">MINA 4IJ</option>
            <option value="MINA 4KL">MINA 4KL</option>
            <option value="MINA 4MN">MINA 4MN</option>
            <option value="MINA 4OP">MINA 4OP</option>
            <option value="MINA 4Z">MINA 4Z</option>
            <option value="MINA 4X">MINA 4X</option>
            <option value="MINA 4W">MINA 4W</option>
            <option value="MINA 4UV">MINA 4UV</option>
            <option value="MINA 7A">MINA 7A</option>
            <option value="MINA 7BC">MINA 7BC</option>
            <option value="MINA 7DE">MINA 7DE</option>
            <option value="MINA 6AB">MINA 6AB</option>
            <option value="MINA 6CD">MINA 6CD</option>
            <option value="MINA 6EF">MINA 6EF</option>
            <option value="MINA 6GH">MINA 6GH</option>
            <option value="MINA 6IJ">MINA 6IJ</option>
            <option value="MINA 6KL">MINA 6KL</option>
            <option value="MINA 6MN">MINA 6MN</option>
            <option value="MINA 6QR">MINA 6QR</option>
            `;
            select.innerHTML += options;

            let checkPersonalizadoContainer = document.querySelector('.checkbox-container');
            let inputPersonalizado = document.querySelector('[inputMudanca]');


            checkPersonalizadoContainer.innerHTML = "";
            checkPersonalizadoContainer.innerHTML += `
            <label for="check-personalizado">Outro</label>
            <input type="checkbox" id="check-personalizado" ${inputPersonalizado.hidden ? "" : "checked"}>
            `;


            let checkPersonalizado = document.querySelector('#check-personalizado');

            checkPersonalizado.addEventListener('change', () => {
                if (checkPersonalizado.checked) {
                    select.hidden = true;
                    inputPersonalizado.hidden = false;
                } else {
                    select.hidden = false;
                    inputPersonalizado.hidden = true;
                }
            });




        }
        if (col.getAttribute('col4') != null) {
            let select = document.querySelector("#select-field");
            select.innerHTML = '';

            let defaultOption = `<option value="" checked>Selecione uma opção</option>`;
            select.innerHTML += defaultOption;
            let options = `
                    <option value="GADEM001">GADEM001</option>
                    <option value="GADEM002">GADEM002</option>
                    <option value="GADEM003">GADEM003</option>
                    <option value="GADEM004">GADEM004</option>
                    <option value="GADEM005">GADEM005</option>
                    <option value="GADEM006">GADEM006</option>
            `;
            select.innerHTML += options;


            let checkPersonalizadoContainer = document.querySelector('.checkbox-container');
            checkPersonalizadoContainer.innerHTML = "";
            let inputPersonalizado = document.querySelector('[inputMudanca]');

            checkPersonalizadoContainer.innerHTML += `
                    <label for="check-personalizado">Outro</label>
                    <input type="checkbox" id="check-personalizado" ${inputPersonalizado.hidden ? "" : "checked"}>
            `;


            let checkPersonalizado = document.querySelector('#check-personalizado');

            checkPersonalizado.addEventListener('change', () => {
                if (checkPersonalizado.checked) {
                    select.hidden = true;
                    inputPersonalizado.hidden = false;
                } else {
                    select.hidden = false;
                    inputPersonalizado.hidden = true;
                }
            });

        }
        if (col.getAttribute('col5') != null) {
            let select = document.querySelector("#select-field");
            select.innerHTML = '';

            let defaultOption = `<option value="" checked>Selecione uma opção</option>`;
            select.innerHTML += defaultOption;
            let options = `
                    <option value="PRÉ-CORTE">PRÉ-CORTE</option>
                    <option value="DECAP DIRETO">DECAP DIRETO</option>
                    <option value="ESCARIFICAÇÃO">ESCARIFICAÇÃO</option>
                    <option value="RASPAGEM DE LF">RASPAGEM DE LF</option>
                    <option value="EXPOSIÇÃO">EXPOSIÇÃO</option>
                    <option value="CARREGANDO">CARREGANDO</option>
                    <option value="TRANSPORTANDO ESTÉRIL">TRANSPORTANDO ESTÉRIL</option>
                    <option value="PRODUZINDO ESTÉRIL">PRODUZINDO ESTÉRIL</option>
            `;
            select.innerHTML += options;



            let checkPersonalizadoContainer = document.querySelector('.checkbox-container');
            checkPersonalizadoContainer.innerHTML = "";
            let inputPersonalizado = document.querySelector('[inputMudanca]');

            checkPersonalizadoContainer.innerHTML += `
                    <label for="check-personalizado">Outro</label>
                    <input type="checkbox" id="check-personalizado" ${inputPersonalizado.hidden ? "" : "checked"}>
            `;


            let checkPersonalizado = document.querySelector('#check-personalizado');

            checkPersonalizado.addEventListener('change', () => {
                if (checkPersonalizado.checked) {
                    select.hidden = true;
                    inputPersonalizado.hidden = false;
                } else {
                    select.hidden = false;
                    inputPersonalizado.hidden = true;
                }
            });
        }

    }
}

// FUNÇÃO RESPONSÁVEL POR CARREGAR TODOS OS EVENTOS E FUNCIONALIDADES DA APLICAÇÃO
async function carregarAplicacao() {
    turma = sessionStorage.getItem('turma');
    equipamentos = JSON.parse(sessionStorage.getItem('equipamentos'));
    operadoresDaTurma = JSON.parse(sessionStorage.getItem('operadoresDaTurma'));




    resetarParametros();

    if (sessionStorage.getItem("idLista") != null) {
        btnGerarEscala.disabled = true;

        idLista = JSON.parse(sessionStorage.getItem("idLista"));
        await fetchData("GET", "", idLista);

        renderizarEscala(listaEscalas.escala, listaEscalas.operadoresForaEscala);

    }

    atribuirEventos();
}

function atribuirEventos() {
    // // BOTAO VOLTAR DA TELA 2
    btnMostrarTela1.addEventListener('click', () => {
        window.location.href = '../main/index.html';
    });

    btnEditarEscala.forEach((btnEditar, index) => {
        btnEditar.addEventListener('click', (e) => {

            let tds = document.querySelectorAll(`td[col${index + 2}]`);
            if (tds.length != 0) {

                // verifica se nao tem checkbox em tela
                if (document.querySelectorAll('.check-edicao').length == 0) {
                    mostrarTelaEdicao(e.target);

                    btnMostrarTela1.disabled = true;
                    btnGerarEscala.disabled = true;

                    tds.forEach((td, jindex) => {
                        let input = `<input class="check-edicao" type="checkbox" id="col${index + 2}${jindex}" col${index + 2}>`;
                        td.innerHTML = input + td.innerHTML;
                    });

                } else {
                    let checkboxes = document.querySelectorAll('.check-edicao');
                    checkboxes.forEach(check => {
                        check.parentElement.innerHTML = '' + check.parentElement.innerText;
                    })

                    mostrarTelaEdicao(e.target);

                    btnMostrarTela1.disabled = false;
                    btnGerarEscala.disabled = false;

                }
            }
        });
    });


    btnCancelarEdicao.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll('.check-edicao');
        let input = document.querySelector(`[inputMudanca]`);

        input.value = '';
        mostrarTelaEdicao();

        btnMostrarTela1.disabled = false;

        checkboxes.forEach((check, index) => {
            check.parentElement.innerHTML = '' + check.parentElement.innerText;
        });
    });

    btnSalvarEdicao.addEventListener('click', async () => {
        let tds = document.querySelectorAll(`td[col1]`);
        let checkboxes = document.querySelectorAll('.check-edicao');
        let input;


        if (document.querySelector('#check-personalizado') != null) {
            if (document.querySelector('#check-personalizado').checked) {
                input = document.querySelector(`[inputMudanca]`);
            } else {
                input = document.querySelector('#select-field');
            }
        } else {
            input = document.querySelector('#select-field');
        }





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

                        let matricula = input.value;
                        escala.matricula = parseInt(matricula);

                        atualizacoesLista.escala.push(escala);


                    } else if (check.getAttribute('col3') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);
                        let escala = { ...listaEscalas.escala[index] };
                        escala.localizacao = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);

                    } else if (check.getAttribute('col4') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);


                        let escala = { ...listaEscalas.escala[index] };
                        escala.transporte = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);

                    } else if (check.getAttribute('col5') != null) {
                        let index = listaEscalas.escala.findIndex((element) => element.tag == tds[indice].innerText);
                        let escala = { ...listaEscalas.escala[index] };
                        escala.atividade = input.value.toLowerCase();

                        atualizacoesLista.escala.push(escala);
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



    })

    btnGerarEscala.addEventListener('click', async () => {
        btnGerarEscala.disabled = true;
        let loading = document.querySelector('.component-loading-container');

        loading.classList.toggle('mostrar');
        mostrarEscala();

        montarListaEscalas(escala, operadoresDisponiveis.map(operador => operador.matricula));

        idLista = await fetchData("POST", listaEscalas, "");

        await fetchData("GET", "", idLista);
        loading.classList.toggle('mostrar');



        renderizarEscala(listaEscalas.escala, listaEscalas.operadoresForaEscala);
    });

}





window.addEventListener('load', async () => {
    if (sessionStorage.getItem('turma') == null || sessionStorage.getItem('data') == null) {
        window.location.replace('../login/index.html');
    }
    let data = JSON.parse(sessionStorage.getItem('data'));
    token = data.token;
    let loading = document.querySelector('.screen-loading-container');

    await carregarAplicacao();
    loading.classList.toggle('mostrar');
});
