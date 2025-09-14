import { validUser, invalidEmails, invalidPasswords } from "../fixtures/credentials";
import { missingUsername, blankUsername, missingEmail, invalidPhone, minAge, maxAge, longUsername } from "../fixtures/testdata"

describe("User API Tests", () => {

  cy.step("Positive Scenario: Creating user with valid data");

  it("Test Case 1: Create user successfully with valid data", () => {
    cy.request("POST", "/users/", validUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.username).to.eq(validUser.username);
      expect(response.body.email).to.eq(validUser.email);
    });
  });

  cy.step("Negative Scenarios");
  it("Test Case 2: Create user missing username", () => {
    cy.request({ method: "POST", url: "/users/", body: missingUsername, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 3: Create user with blank username", () => {
    cy.request({ method: "POST", url: "/users/", body: blankUsername, failOnStatusCode: false })
      .then((response) => {
        expect([400, 422]).to.include(response.status);
      });
  });

  it("Test Case 4: Create user missing email", () => {
    cy.request({ method: "POST", url: "/users/", body: missingEmail, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 5: Create user with invalid email", () => {
    cy.request({ method: "POST", url: "/users/", body: { ...validUser, email: invalidEmails[0] }, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 6: Create user missing password", () => {
    const { password, ...userWithoutPassword } = validUser;
    cy.request({ method: "POST", url: "/users/", body: userWithoutPassword, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 7: Create user with short password", () => {
    cy.request({ method: "POST", url: "/users/", body: { ...validUser, password: invalidPasswords[0] }, failOnStatusCode: false })
      .then((response) => {
        expect([400, 422]).to.include(response.status);
      });
  });

  it("Test Case 8: Create user missing age", () => {
    const { age, ...userWithoutAge } = validUser;
    cy.request({ method: "POST", url: "/users/", body: userWithoutAge, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 9: Create user with negative age", () => {
    cy.request({ method: "POST", url: "/users/", body: { ...validUser, age: -5 }, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 10: Create user missing phone", () => {
    const { phone, ...userWithoutPhone } = validUser;
    cy.request({ method: "POST", url: "/users/", body: userWithoutPhone, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 11: Create user with invalid phone", () => {
    cy.request({ method: "POST", url: "/users/", body: invalidPhone, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 12: Create user with empty payload", () => {
    cy.request({ method: "POST", url: "/users/", body: {}, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 13: Create user with no payload", () => {
    cy.request({ method: "POST", url: "/users/", failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 14: Create user with minimum age (under 18)", () => {
    cy.request({ method: "POST", url: "/users/", body: minAge, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 15: Create user with maximum age (too high)", () => {
    cy.request({ method: "POST", url: "/users/", body: maxAge, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });

  it("Test Case 16: Create user with long username", () => {
    cy.request({ method: "POST", url: "/users/", body: longUsername, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(422);
      });
  });
});
