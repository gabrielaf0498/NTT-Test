describe("Cenário 2 - Compra e inserção de pedido", () => {
  it("Deve comprar um produto e salvar pedido na API", () => {
    // 1. Acessa o site
    cy.visit("https://advantageonlineshopping.com");
    cy.wait(500);

    // 2. Faz login
    cy.get("#menuUserLink").click();
    cy.wait(500);
    cy.get('[a-hint="Username"] > .inputContainer > .ng-pristine').type(
      "JayGatsby"
    );
    cy.wait(500);
    cy.get('[a-hint="Password"] > .inputContainer > .ng-pristine').type(
      "Teste@123"
    );
    cy.wait(500);
    cy.get("#sign_in_btn").click();
    cy.wait(1000);

    // 3. Escolhe o produto e adiciona ao carrinho
    cy.get("#headphonesImg").click();
    cy.wait(500);
    cy.get(
      '[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)'
    ).click();
    cy.wait(500);
    cy.get(".fixedBtn > .roboto-medium").click();
    cy.wait(500);

    // 4. Acessa carrinho e finaliza compra
    cy.get("#shoppingCartLink").click();
    cy.wait(500);
    cy.get(
      "li > #toolTipCart > :nth-child(1) > table > tfoot > :nth-child(2) > td > #checkOutPopUp"
    ).click();
    cy.wait(500);
    cy.get(".mobileBtnHandler > #next_btn").click();
    cy.wait(500);

    // 5. Preenche dados de pagamento
    cy.get('[a-hint="SafePay username"] > .inputContainer > .ng-valid')
      .clear()
      .type("Compra123");
    cy.wait(500);
    cy.get('[a-hint="SafePay password"] > .inputContainer > .ng-valid')
      .clear()
      .type("Senha123");
    cy.wait(500);
    cy.get("#pay_now_btn_SAFEPAY").click();
    cy.wait(3000);

    // 6. Captura número do pedido e envia para API
    cy.get("#orderNumberLabel", { timeout: 10000 })
      .should("be.visible")
      .and("not.have.text", "")
      .invoke("text")
      .then((orderNumber) => {
        cy.wait(500);
        cy.get("#trackingNumberLabel", { timeout: 10000 })
          .should("be.visible")
          .and("not.have.text", "")
          .invoke("text")
          .then((trackingNumber) => {
            cy.wait(500);

            const usuario_id = 23423532;

            cy.request("POST", "http://localhost:3000/pedido", {
              numero_pedido: orderNumber.trim(),
              usuario_id: usuario_id,
              codigo_rastreamento: trackingNumber.trim(),
            }).then((response) => {
              expect(response.status).to.eq(201);
            });
          });
      });
  });
});
