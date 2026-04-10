Feature: Web Tables — CRUD de Registros

  Scenario: Criar, editar e deletar um registro
    Given estou na página Web Tables
    When adiciono um registro com os dados:
      | firstName | lastName | email                | age | salary | department |
      | Automacao | Teste    | bdd_crud@test.com    | 30  | 5000   | QA         |
    Then o registro "Automacao" deve aparecer na tabela
    When edito o primeiro registro visível alterando o nome para "AutomacaoEditado"
    Then o registro "AutomacaoEditado" deve aparecer na tabela
    When deleto o primeiro registro visível
    Then nenhum registro deve ser encontrado

  Scenario Outline: Criar 12 registros dinamicamente via Scenario Outline
    Given estou na página Web Tables
    When adiciono um registro com nome "<firstName>", sobrenome "<lastName>", email "<email>", idade "28", salário "4000" e departamento "QA"
    Then o registro "<firstName>" deve aparecer na tabela
    When deleto o primeiro registro visível com email "<email>"

    Examples:
      | firstName | lastName   | email                       |
      | Alice     | Silva      | alice.silva@test.com        |
      | Bruno     | Santos     | bruno.santos@test.com       |
      | Carlos    | Lima       | carlos.lima@test.com        |
      | Diana     | Costa      | diana.costa@test.com        |
      | Eduardo   | Ferreira   | eduardo.ferreira@test.com   |
      | Fernanda  | Oliveira   | fernanda.oliveira@test.com  |
      | Gabriel   | Souza      | gabriel.souza@test.com      |
      | Helena    | Pereira    | helena.pereira@test.com     |
      | Igor      | Alves      | igor.alves@test.com         |
      | Julia     | Rodrigues  | julia.rodrigues@test.com    |
      | Kevin     | Martins    | kevin.martins@test.com      |
      | Laura     | Nascimento | laura.nascimento@test.com   |
