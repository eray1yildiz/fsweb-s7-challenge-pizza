describe("Testler", function () {
  it("Anasayfadaki buton order sayfasına yönlendiriyor mu?", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy='firsButton']").click();
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  it("Pizza boyutu seçiliyor mu?", () => {
    cy.get('[data-cy="size-small"]').check();
  });

  it("Ekstra malzemelerden en fazla 10 adet seçiliyor mu?", () => {
    cy.get('[type="checkbox"]').check();
  });

  it("Not ekleniyor mu?", () => {
    cy.get('[data-cy="special"]').type("örnek not");
  });

  it("Sipariş ver butonu succes sayfasına yönlendiriyor mu?", () => {
    cy.get("[data-cy='secondButton']").click();
  });
});
