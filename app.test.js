const { describe, expect, it } = require("@jest/globals");
const request = require("supertest");
const app = require("./app.js");

describe("POST /contact-us", () => {
  it("Returns the submitted data", async () => {
    const response = await request(app)
      .post("/contact-us")
      .type("application/x-www-form-urlencoded")
      .send(
        "name=Kieran&email=kieran.barker%40multiverse.io&message=Hello+there"
      );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: "Kieran",
      email: "kieran.barker@multiverse.io",
      message: "Hello there",
    });
  });

  it("Requires a name", async () => {
    const response = await request(app)
      .post("/contact-us")
      .type("application/x-www-form-urlencoded")
      .send("email=kieran.barker%40multiverse.io&message=Hello+there");

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "name",
        }),
      ])
    );
  });

  it("Requires an email address", async () => {
    const response = await request(app)
      .post("/contact-us")
      .type("application/x-www-form-urlencoded")
      .send("name=Kieran&message=Hello+there");

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "email",
        }),
      ])
    );
  });

  it("Requires a valid email address", async () => {
    const response = await request(app)
      .post("/contact-us")
      .type("application/x-www-form-urlencoded")
      .send("name=Kieran&email=kieran.barker&message=Hello+there");

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "email",
        }),
      ])
    );
  });

  it("Requires a message", async () => {
    const response = await request(app)
      .post("/contact-us")
      .type("application/x-www-form-urlencoded")
      .send("name=Kieran&email=kieran.barker%40multiverse.io");

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "message",
        }),
      ])
    );
  });
});
