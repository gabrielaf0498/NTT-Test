describe("Cenário 2.1 - Remover um produto e validar quantidade", () => {
  it("Deve adicionar 3 produtos diferentes, remover um e validar que restam 2", () => {
    // 1. Acessa o site
    cy.visit("https://advantageonlineshopping.com");
    cy.wait(500);

    // 2. Adiciona o primeiro produto
    cy.get("#headphonesImg").click();
    cy.wait(500);
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)'
    ).click();
    cy.wait(500);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 3. Volta para home
    cy.get(".logo").click();
    cy.wait(500);

    // 4. Adiciona o segundo produto
    cy.get("#laptopsImg").click();
    cy.wait(500);
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)'
    ).click();
    cy.wait(500);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 5. Volta para home
    cy.get(".logo").click();
    cy.wait(500);

    // 6. Adiciona o terceiro produto
    cy.get("#miceImg").click();
    cy.wait(500);
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)'
    ).click();
    cy.wait(500);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 7. Acessa o carrinho de compras
    cy.get("#shoppingCartLink").click();
    cy.wait(500);

    // 8. Remove UM produto do carrinho
    cy.get(".removeProduct").first().click();
    cy.wait(500);

    // 9. Valida que o número no carrinho é 2
    cy.get(".sticky > .ng-binding").should("contain", "2");
  });
});
