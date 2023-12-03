var token;
var usuario;
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
var btnVoltarConfiguracao = document.querySelector('[voltar]');
var btnMostrarConfiguracao = document.querySelector('[configuracao]');
var btnMostrarTela2 = document.querySelector('[novaEscala]');


var telaConfiguracao = document.querySelector('.bodyConfiguracoesContainer');
var tituloEscalas = document.querySelector('[tituloEscalas]');

// var tela2 = document.querySelector('.bodyEscalaContainer');
var btnTela2Voltar = document.querySelector('[tela2Voltar]');


let select = document.querySelector('[name = selectTurmas]');


// var tela4 = document.querySelector('.bodyEditarEscalaContainer');
var ulListaEscalas = document.querySelector('.listaContainer > ul');


// ---------------------------------------------------------------------------------------

// FUNÇÕES DO BANCO DE DADOS
// ---------------------------------------------------------------------------------------
async function fetchData() {
    // URL da API que você deseja consultar
    const equipamentosUrl = 'https://backend-rotas-alternativas.vercel.app/equipamentos/index';
    const operadoresUrl = `https://backend-rotas-alternativas.vercel.app/operadores/index?turma=${turma}`;
    const listaEscalaUrl = `https://backend-rotas-alternativas.vercel.app/listaEscalas/index?turma=${turma}`;

    // Fazendo uma requisição GET
    await fetch(equipamentosUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    })
        .then(response => {
            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            // Converte a resposta para JSON
            return response.json();
        })
        .then(dados => {
            // Trabalha com os dados recebidos

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
                    window.location.replace('../Login/index.html');
                }, 3000);
            } else {
                equipamentos = dados;
            }


        })
        .catch(error => {
            // Lida com erros durante a requisição
            console.error(error);
        });


    await fetch(operadoresUrl, {
        method: 'GET',
        headers: {
            authorization: token
        },
    })
        .then(response => {
            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            // Converte a resposta para JSON
            return response.json();
        })
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
                    window.location.replace('../Login/index.html');
                }, 3000);
            } else {
                operadoresDaTurma = dados;
            }


        })
        .catch(error => {
            // Lida com erros durante a requisição
            console.error(error);
        });

    await fetch(listaEscalaUrl, {
        method: 'GET',
        headers: {
            authorization: token
        },
    })
        .then(response => {
            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            // Converte a resposta para JSON
            return response.json();
        })
        .then(dados => {
            // Trabalha com os dados recebidos
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
                    window.location.replace('../Login/index.html');
                }, 3000);
            } else {
                listaEscalaDaTurma = dados;
            }
        })
        .catch(error => {
            // Lida com erros durante a requisição
            console.error(error);
            console.error('Erro na requisição:', error);
            console.error('Resposta do servidor:', error.response);
        });

}


async function resetarParametros() {
    // console.log("fetchData");

    await fetchData();
    // console.log("equipamentosDisponiveis");


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








// ATUALIZA O TÍTULO E O PARAMETRO DA TURMA
function atualizarTituloEscalas() {
    turma = select.value;
    // console.log(turma);
    tituloEscalas.innerHTML = '';
    tituloEscalas.innerHTML = `Escalas Turma ${turma.toUpperCase()}`;
}

function atualizarTelaEscalas() {
    ulListaEscalas.innerHTML = '';

    if (listaEscalaDaTurma.message != null) {
        ulListaEscalas.innerHTML += `
        <li>
            ${listaEscalaDaTurma.message}
        </li>
        `;
    } else {
        listaEscalaDaTurma.forEach((escala, index) => {
            ulListaEscalas.innerHTML += `
            <li id="${escala.idlista}">
                <div class="liContainer">
                    <div id="nome-lista-${index}">${escala.nomelista}</div>
                    <div>${escala.datacriacao} ${escala.horariocriacao}</div>
                    <div class="controlesContainer">
                        <a class="icon" deletarEscala${index}>
                            <img src="../../assets/images/delete.png" alt="" srcset="">
                        </a>
                        <a class="icon" infoEscala${index}>
                            <img src="../../assets/images/info.png" alt="" srcset="">
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
            let nomeLista = document.querySelector(`#nome-lista-${index}`);

            // PARTE RESPONSÁVEL POR DELETAR A ESCALA
            btnDeletarEscala.addEventListener('click', async (e) => {

                // alert('deletar');

                // // FOI PRECISO ADAPTAR O CÓDIGO, POIS O SPLICE NÃO FUNCIONOU, SENDO ASSIM UM ARRAY CÓPIA FOI PREENCHIDO SEM O ELEMENTO A SER REMOVIDO
                let elementoParaRemover = listaEscalaDaTurma[index];

                const URI = `https://backend-rotas-alternativas.vercel.app/listaEscalas/delete/${elementoParaRemover.idlista}`;
                const CONFIGURAÇÃO = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    }
                }

                // console.log(elementoParaRemover.idlista);

                await fetch(URI, CONFIGURAÇÃO)
                    .then(response => {
                        return response.json();
                    })
                    .then(dados => {
                        if (dados.error != null) {

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
                                window.location.replace('../Login/index.html');
                            }, 3000);
                        } else {
                            let indice = listaEscalaDaTurma.indexOf(elementoParaRemover);
                            listaEscalaDaTurma.splice(indice, 1);
                            atualizarTelaEscalas();
                            Toastify({
                                text: "Escala deletada com sucesso",
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
                    .catch(error => error.response);




            });

            // PARTE RESPONSÁVEL POR DETALHES DA ESCALA
            btnInfoEscala.addEventListener('click', () => {
                let idLista = listaEscalaDaTurma[index].idlista;
                sessionStorage.setItem('idLista', JSON.stringify(idLista));
                mostrarTela2();
            });

            nomeLista.addEventListener('click', () => {
                let idLista = listaEscalaDaTurma[index].idlista;
                sessionStorage.setItem('idLista', JSON.stringify(idLista));
                mostrarTela2();
            });

        });
    }




}

// FUNÇÃO RESPONSÁVEL POR CARREGAR TODOS OS EVENTOS E FUNCIONALIDADES DA APLICAÇÃO
async function carregarAplicacao() {
    // localStorage.clear();
    // console.log(JSON.parse(localStorage.getItem('equipamentos')));
    // console.log(JSON.parse(localStorage.getItem('operadores')));
    // console.log('LISTA ESCALAS');
    // console.log(JSON.parse(localStorage.getItem('listaEscalas')));

    atualizarTituloEscalas();


    // console.log("resetarParametros");
    await resetarParametros();

    renderizarConfiguracoes();

    atribuirEventos();


    atualizarTelaEscalas();
    // if (listaEscalaDaTurma.length > 0) {
    // }
}

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

        btnSwitch.addEventListener('click', async () => {
            // let btnToggle = document.querySelector(`[equipamentoSwitch${index}]`);
            btnSwitch.classList.toggle('active');
            equipamentos[index].disponivel = !equipamentos[index].disponivel;

            let divEquipamentoStatus = li.querySelector(`.operadorEEquipamentoStatus`);
            divEquipamentoStatus.innerText = '';
            divEquipamentoStatus.innerText = equipamentos[index].disponivel ? "Disponível" : "Indisponível";

            // console.log(equipamentos[index].tag);
            const URI = `https://backend-rotas-alternativas.vercel.app/equipamentos/update/${equipamentos[index].tag}`;
            const BODYDATA = {
                disponivel: equipamentos[index].disponivel ? "1" : "0"
            }
            const CONFIGURAÇÃO = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(BODYDATA)
            }
            // console.log(equipamentos[index].disponivel);

            btnVoltarConfiguracao.hidden = true;

            await fetch(URI, CONFIGURAÇÃO)
                .then(response => {
                    return response.json();
                })
                .then(dados => {
                    console.log(dados);
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
                            window.location.replace('../Login/index.html');
                        }, 3000);
                    } else {

                        Toastify({
                            text: "Atualizado com sucesso!",
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
                .catch(error => error.response);

            btnVoltarConfiguracao.hidden = false;

            // salvarParametros();
            // console.log(equipamentos[index].disponivel);
            // renderizarConfiguracoes();
        });


    });

    lisOperadores.forEach((li, index) => {
        let btnSwitch = document.querySelector(`[operadorSwitch${index}]`);

        btnSwitch.addEventListener('click', async () => {
            btnSwitch.classList.toggle('active');
            // operadores[operadores.indexOf(operadoresDaTurma[index])].disponivel = !operadores[operadores.indexOf(operadoresDaTurma[index])].disponivel;
            operadoresDaTurma[index].disponivel = !operadoresDaTurma[index].disponivel;

            let divOperadorStatus = li.querySelector(`.operadorEEquipamentoStatus`);
            divOperadorStatus.innerText = '';
            divOperadorStatus.innerText = operadoresDaTurma[index].disponivel ? "Disponível" : "Indisponível";

            const URI = `https://backend-rotas-alternativas.vercel.app/operadores/update/${operadoresDaTurma[index].matricula}`;
            const BODYDATA = {
                disponivel: operadoresDaTurma[index].disponivel ? "1" : "0"
            }
            const CONFIGURAÇÃO = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(BODYDATA)
            }
            // console.log(operadoresDaTurma[index].matricula);

            btnVoltarConfiguracao.hidden = true;

            await fetch(URI, CONFIGURAÇÃO)
                .then(response => {
                    // console.log(response);
                    return response.json();
                })
                .then(dados => {
                    console.log('dados');
                    console.log(dados);
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
                            window.location.replace('../Login/index.html');
                        }, 3000);
                    } else {

                        Toastify({
                            text: "Atualizado com sucesso!",
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
                .catch(error => error.response);

            btnVoltarConfiguracao.hidden = false;
            // salvarParametros();
            // console.log(divOperadorStatus)

            // renderizarConfiguracoes();
        });
    });


}

function switchTelaConfiguracao() {
    // renderizarConfiguracoes();
    telaConfiguracao.classList.toggle('mostrar');
}
function mostrarTela2() {

    window.location.href = '../Gerar-escala/index.html';



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

function atribuirEventos() {
    btnMostrarTela2.addEventListener('click', () => {
        sessionStorage.removeItem('idLista');
        sessionStorage.setItem('turma', turma);
        sessionStorage.setItem('operadoresDaTurma', JSON.stringify(operadoresDaTurma));
        sessionStorage.setItem('equipamentos', JSON.stringify(equipamentos));
        mostrarTela2();
    })

    btnMostrarConfiguracao.addEventListener('click', switchTelaConfiguracao);

    btnVoltarConfiguracao.addEventListener('click', switchTelaConfiguracao);

    select.addEventListener('change', async () => {
        let componentLoading = document.querySelector('.component-loading-container');
        // console.log(componentLoading);
        componentLoading.classList.toggle('mostrar');
        atualizarTituloEscalas();
        await resetarParametros();
        renderizarConfiguracoes();

        // console.log('resetou');

        atualizarTelaEscalas();
        componentLoading.classList.toggle('mostrar');
        // if (listaEscalaDaTurma.length > 0) {
        // }
    })




}


window.addEventListener('load', async () => {
    console.log(sessionStorage.getItem('data'));
    if (sessionStorage.getItem('data') == null) {

        window.location.replace('../Login/index.html');
    } else {
        let loading = document.querySelector('.screen-loading-container');

        let data = JSON.parse(sessionStorage.getItem('data'));
        token = data.token;
        usuario = data.usuario;

        // console.log(token);


        await carregarAplicacao();
        loading.classList.toggle('mostrar');
    }

});
