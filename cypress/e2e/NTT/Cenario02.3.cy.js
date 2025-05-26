describe("Cenário 2.3 - Remover produto específico por cor", () => {
  it("Deve adicionar o produto HP Pavilion em duas cores diferentes, remover o vermelho e validar que sobra o azul", () => {
    // 1. Acessa o site
    cy.visit("https://advantageonlineshopping.com");
    cy.wait(500);

    // 2. Acessa categoria Laptops
    cy.get("#laptopsImg").click();
    cy.wait(500);

    // 3. Seleciona o produto HP PAVILION 15Z TOUCH LAPTOP
    cy.contains(/^hp pavilion 15t touch laptop$/i).click();
    cy.wait(500);

    // 4. Seleciona a cor vermelha e adiciona ao carrinho
    cy.get('[ng-show="firstImageToShow"] > .RED').click();
    cy.wait(500);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(5000);

    // 5. Volta para a home
    cy.get(".logo").click();
    cy.wait(3000);

    // 6. Acessa novamente a categoria Laptops
    cy.get("#laptopsImg").click();
    cy.wait(300);

    // 7. Seleciona novamente o HP PAVILION 15Z TOUCH LAPTOP
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(5)'
    ).click();
    cy.wait(300);

    // 8. Seleciona a cor azul e adiciona ao carrinho
    cy.get('[ng-show="firstImageToShow"] > .BLUE').click();
    cy.wait(3000);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 9. Acessa o carrinho
    cy.get("#shoppingCartLink").click();
    cy.wait(1000);

    // 10. Remove o produto na cor vermelha
    cy.get("tr").contains("RED").parents("tr").find(".removeProduct").click();
    cy.wait(500);

    // 11. Valida que o carrinho contém apenas o produto na cor azul
    cy.get(".sticky > .ng-binding").should("contain", "1");
  });
});
