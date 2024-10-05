
function buscarCep() {
    const cep = document.getElementById('cep').value;

    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('CEP não encontrado');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('street').value = data.street;
            document.getElementById('neighborhood').value = data.neighborhood;
            document.getElementById('city').value = data.city;
            document.getElementById('state').value = data.state;
        })
        .catch(error => {
            document.getElementById('error-messages').innerText = "Erro ao buscar CEP: " + error.message;
        });
}

function handleSubmit(e) {
    e.preventDefault();
    const errors = [];
    const form = document.getElementById('registrationForm');

    const password = form['password'].value;
    const repeatPassword = form['repeatPassword'].value;
    if (password !== repeatPassword) {
        errors.push('As senhas não coincidem.');
    }

    const email = form['email'].value;
    const repeatEmail = form['repeatEmail'].value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('O e-mail fornecido não é válido.');
    }
    if (email !== repeatEmail) {
        errors.push('Os e-mails não coincidem.');
    }

    const errorMessagesElement = document.getElementById('error-messages');
    if (errors.length > 0) {
        errorMessagesElement.innerHTML = errors.join('<br>');
    } else {
        errorMessagesElement.innerHTML = 'Formulário enviado com sucesso!';
        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('registrationForm');
    form.addEventListener('submit', handleSubmit)

    let buscarCepButton = document.querySelector('#buscarCep');
    buscarCepButton.addEventListener('click', buscarCep);
});
