Feature: Browser Windows — Abertura de Nova Janela

  Scenario: Validar botão New Window e conteúdo da página destino
    Given estou na página Browser Windows
    Then o botão "New Window" deve estar visível
    And a página da nova janela deve conter "This is a sample page"

  Scenario: Validar botão New Tab
    Given estou na página Browser Windows
    Then o botão "New Tab" deve estar visível
