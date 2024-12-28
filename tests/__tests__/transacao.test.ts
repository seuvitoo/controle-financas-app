import request from "supertest";
import app from "../../app/src/index";

describe("Transacao Routes", () => {
  let token: string;

  beforeAll(async () => {
    const loginResponse = await request(app).post("/v1/login").send({
      email: "joao@email.com",
      senha: "123456",
    });
    token = loginResponse.body.token;
  });

  it("Deve criar uma transação", async () => {
    const response = await request(app)
      .post("/v1/transacoes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor: 100.0,
        tipo: "despesa",
        descricao: "Compra de mercado",
        data: "2024-01-01",
        categoriaNome: "Essencial",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("tipo", "despesa");
  });

  it("Deve listar as transações", async () => {
    const response = await request(app)
      .get("/v1/transacoes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});