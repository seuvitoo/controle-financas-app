import request from "supertest";
import app from "../../app/src/index";

describe("Auth Routes", () => {
  it("Deve registrar um usuário", async () => {
    const response = await request(app).post("/v1/registro").send({
      nome: "João da Silva",
      email: "joao@email.com",
      senha: "123456",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("message", "Usuário registrado com sucesso");
  });

  it("Deve realizar login", async () => {
    const response = await request(app).post("/v1/login").send({
      email: "joao@email.com",
      senha: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});