Feature: Sortable — Drag and Drop

  Scenario: Reordenar itens da lista via drag and drop
    Given estou na página Sortable
    When capturo o texto do primeiro item da lista
    And arrasto o último item para a primeira posição
    Then a ordem da lista deve ter mudado

  Scenario: Todos os itens permanecem após reordenação
    Given estou na página Sortable
    When capturo a quantidade de itens na lista
    And arrasto o primeiro item para a última posição
    Then a quantidade de itens deve ser a mesma
