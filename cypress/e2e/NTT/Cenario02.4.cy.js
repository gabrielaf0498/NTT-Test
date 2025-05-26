describe("Cenário 2.4 - Alterar cor e quantidade de produto", () => {
  it("Deve pesquisar, selecionar produto, alterar cor e quantidade, validar checkout e atualizar cor no banco", () => {
    // 1. Acessa o site
    cy.visit("https://advantageonlineshopping.com");

    // 2. Pesquisa pelo produto
    cy.get("#mobileSearch > .roboto-medium").type(
      "HP Pavilion 15z touch laptop{enter}"
    );

    // 3. Seleciona o produto pesquisado
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > li.ng-scope'
    )
      .first()
      .click();

    // 4. Altera a cor para azul (ajuste o seletor conforme a estrutura da página)
    cy.get('[ng-show="firstImageToShow"] > .colorSelected').click();

    // 5. Pega o preço unitário antes de ir ao carrinho
    cy.get("#Description > :nth-child(2)")
      .invoke("text")
      .then((text) => {
        const valorUnitario = parseFloat(text.replace("$", "").trim());
        const quantidade = 2;
        const valorEsperado = parseFloat(
          (valorUnitario * quantidade).toFixed(2)
        );

        cy.log(`Valor unitário: ${valorUnitario}`);
        cy.log(`Quantidade: ${quantidade}`);
        cy.log(`Valor esperado: ${valorEsperado}`);

        // 6. Altera a quantidade
        cy.get('input[name="quantity"]').clear().type(`${quantidade}`);
        cy.get('input[name="quantity"]').should("have.value", `${quantidade}`);

        // 7. Adiciona ao carrinho
        cy.get(".fixedBtn > .roboto-medium").click();

        // 8. Acessa o carrinho
        cy.get("#shoppingCartLink").click();

        // 9. Valida total na página de checkout
        cy.get(
          '.fixedTableEdgeCompatibility > tfoot > :nth-child(1) > [colspan="2"] > .roboto-medium'
        )
          .invoke("text")
          .then((totalText) => {
            const totalNum = parseFloat(totalText.replace("$", "").trim());
            cy.log(`Total na tela: ${totalNum}`);

            expect(totalNum).to.eq(valorEsperado);
          });
        // 10. Atualiza a cor no banco via API local
        cy.request({
          method: "PUT",
          url: "http://localhost:3000/produtos/2/cor",
          body: { COLOR: "BLUE" },
          failOnStatusCode: false,
        }).then((response) => {
          cy.log(`Status: ${response.status}`);
          cy.log(`Body: ${JSON.stringify(response.body)}`);
          expect(response.status).to.eq(200);
        });
      });
  });
});
