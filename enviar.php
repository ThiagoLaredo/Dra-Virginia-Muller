<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar os dados
    $nome     = htmlspecialchars($_POST["nome"]);
    $telefone = htmlspecialchars($_POST["telefone"]);
    $email    = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $mensagem = htmlspecialchars($_POST["mensagem"]);

    // Configurações do e-mail
    $to      = "seuemail@dominio.com"; // <-- Coloque seu e-mail real
    $subject = "Novo contato do site";
    $body    = "Nome: $nome\nTelefone: $telefone\nEmail: $email\n\nMensagem:\n$mensagem";
    $headers = "From: $email\r\nReply-To: $email";

    // Enviar
    if (mail($to, $subject, $body, $headers)) {
        // Redireciona para página de obrigado
        header("Location: obrigado.html");
        exit();
    } else {
        echo "Erro ao enviar mensagem. Tente novamente.";
    }
} else {
    echo "Método inválido.";
}
?>
