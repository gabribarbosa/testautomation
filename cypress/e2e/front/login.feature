# language: pt

Funcionalidade: Login
  Como um usuário cadastrado
  Quero realizar o login na plataforma
  Para acessar as funcionalidades disponíveis

  Contexto:
    Dado que estou na página de login

  Cenário: Login com credenciais válidas
    Quando preencho o email com o usuário válido
    E preencho a senha com o usuário válido
    E clico no botão Entrar
    Então devo ser redirecionado para a home
    E o botão de logout deve estar visível

  Cenário: Login com credenciais inválidas
    Quando preencho o email com "usuario-invalido@teste.com"
    E preencho a senha com "senhaerrada"
    E clico no botão Entrar
    Então devo ver a mensagem de credenciais inválidas

  Cenário: Login sem preencher o email
    Quando deixo o campo de email em branco
    E preencho a senha com o usuário válido
    E clico no botão Entrar
    Então devo ver a mensagem de email obrigatório

  Cenário: Login sem preencher a senha
    Quando preencho o email com o usuário válido
    E deixo o campo de senha em branco
    E clico no botão Entrar
    Então devo ver a mensagem de senha obrigatória
