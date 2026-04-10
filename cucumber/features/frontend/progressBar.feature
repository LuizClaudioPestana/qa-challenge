Feature: Progress Bar — Controle de Progresso

  Scenario: Parar antes de 25%, aguardar 100% e resetar
    Given estou na página Progress Bar
    When inicio a barra de progresso
    And aguardo o progresso iniciar
    And paro a barra de progresso
    Then o valor da barra deve ser menor ou igual a 25
    When inicio a barra de progresso novamente
    Then a barra deve atingir 100%
    When clico em Reset
    Then o valor da barra deve ser 0
