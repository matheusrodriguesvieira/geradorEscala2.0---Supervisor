const INPUT_USERNAME = document.querySelector('#username');
const INPUT_PASSWORD = document.querySelector('#password');
const BTN_ENTRAR = document.querySelector('#btn-entrar');


function init() {
    BTN_ENTRAR.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(INPUT_USERNAME.value.length);
        if (isValidInput()) {
            console.log('enviando os dados');
        } else {
            Toastify({
                text: "Usuário precisa ser no formato A111111",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "rgba(192, 57, 43,1.0)",
                }
            }).showToast();
        }
    })
}

function isValidInput() {
    if (INPUT_USERNAME.value.length < 7 || INPUT_USERNAME.value.length > 7) {
        return false;
    } else {
        return true
    }
}

window.addEventListener('load', init);