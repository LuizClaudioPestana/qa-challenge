Feature: Practice Form — Preenchimento de Formulário

  Scenario: Preencher e submeter o formulário de prática com sucesso
    Given estou na página Practice Form
    When preencho o nome "John" e sobrenome "Doe"
    And preencho o email "john.doe@test.com"
    And seleciono o gênero "Male"
    And preencho o celular "1234567890"
    And defino a data de nascimento para "15" de "January" de "1990"
    And adiciono a matéria "Maths"
    And seleciono o hobby "Sports"
    And faço upload do arquivo "upload.txt"
    And preencho o endereço "123 Main Street, Test City"
    And seleciono o estado e a cidade
    When submeto o formulário
    Then o popup de confirmação deve ser exibido com o nome "John"
    When fecho o popup
    Then o popup deve ser fechado
