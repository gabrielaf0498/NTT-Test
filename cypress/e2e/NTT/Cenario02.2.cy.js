describe("Cenário 2.2 - Remover produtos do carrinho", () => {
  it("Deve adicionar 2 produtos diferentes e remover todos do carrinho", () => {
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

    // 3. Volta para a home
    cy.get(".logo").click();
    cy.wait(500);

    // 4. Adiciona o segundo produto
    cy.get("#laptopsImg").click();
    cy.wait(500);
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)'
    ).click();
    cy.wait(4000);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 5. Acessa o carrinho de compras
    cy.get("#shoppingCartLink").click();
    cy.wait(500);

    // 6. Remove todos os produtos do carrinho, um por vez
    function removeAllProducts() {
      cy.get("body").then(($body) => {
        if ($body.find(".removeProduct").length > 0) {
          // Se encontrar botão para remover, clica no primeiro e chama de novo
          cy.get(".removeProduct").first().click();
          cy.wait(500); // espera UI atualizar
          removeAllProducts();
        } else {
          // Não tem mais botão, terminou
          cy.log("Carrinho vazio, nenhum produto para remover");
        }
      });
    }

    removeAllProducts();

    cy.get(".bigEmptyCart > .roboto-bold").should(
      "contain.text",
      "Your shopping cart is empty"
    );
  });
});
