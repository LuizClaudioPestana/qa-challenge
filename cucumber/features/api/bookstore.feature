Feature: BookStore API — Fluxo Completo

  Scenario: Executar fluxo completo de cadastro, autenticação e reserva de livros
    Given que crio um novo usuário na API
    When gero um token de acesso para o usuário
    Then o usuário deve estar autorizado
    When listo os livros disponíveis na BookStore
    And reservo os 2 primeiros livros para o usuário
    Then os livros devem aparecer no perfil do usuário
