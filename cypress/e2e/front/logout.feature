# language: pt

Funcionalidade: Logout
  Como um usuário autenticado
  Quero realizar o logout da plataforma
  Para encerrar minha sessão com segurança

  Contexto:
    Dado que estou autenticado na plataforma

  Cenário: Logout com sucesso
    Quando clico no botão de logout
    Então devo ser redirecionado para a página de login
    E o botão de logout não deve estar visível
