import request from "supertest";
import app from "../../app/src/index";

describe("Renda Routes", () => {
  let token: string;

  beforeAll(async () => {
    const loginResponse = await request(app).post("/v1/login").send({
      email: "joao@email.com",
      senha: "123456",
    });
    token = loginResponse.body.token;
  });

  it("Deve criar uma renda", async () => {
    const response = await request(app)
      .post("/v1/rendas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor: 5000.0,
        mes: "2024-01-01",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("valor", 5000.0);
  });

  it("Deve listar as rendas", async () => {
    const response = await request(app)
      .get("/v1/rendas")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});