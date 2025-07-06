// File: js/contato.js  
// Este arquivo gerencia o envio e a validação do formulário de contato.
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contato");
    const statusMsg = document.getElementById("status-mensagem");

    // Verifica se o formulário e a mensagem de status existem
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Limpa a mensagem de status antes de enviar
        if (!nome || !email || !mensagem) {
            statusMsg.innerHTML = "<p style='color:red;'>Preencha todos os campos.</p>";
            return;
        }

        // Valida o formato do e-mail
        if (!validarEmail(email)) {
            statusMsg.innerHTML = "<p style='color:red;'>E-mail inválido.</p>";
            return;
        }

        // Cria o objeto de dados para enviar
        const dados = {
            sender: email,
            title: `Mensagem de contato de ${nome}`,
            contentBody: `Nome: ${nome}<br>Email: ${email}<br>Mensagem:<br>${mensagem}`,
            nameAttachment: "",
            attachment: ""
        };

        statusMsg.innerHTML = "<p>Enviando...</p>";

        // Envia os dados para a API
        fetch("https://api-sendemail.moleniuk.com/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic bW9sZW5pdWs6NzIzYmI4ZTc5NDUxNDI3ZWFmYmEzZjFlNjcxMjJlNmE=",
                "X-API-KEY": "685077e7-52e9-4e8e-95c6-11cddba94b3a"
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                statusMsg.innerHTML = "<p style='color:green;'>Mensagem enviada com sucesso!</p>";
                form.reset();
            } else {
                return response.text().then(texto => {
                    throw new Error(texto);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao enviar:", error);
            statusMsg.innerHTML = "<p style='color:red;'>Erro ao enviar mensagem. Tente novamente.</p>";
        });
    });

    // Função para validar o formato do e-mail
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});

