import { validUser, invalidEmails, invalidPasswords } from "../fixtures/credentials";
import { missingUsername, blankUsername, missingEmail, invalidPhone, minAge, maxAge, longUsername } from "../fixtures/testdata"

describe("User API Tests", () => {

    cy.step("Positive Scenario: Creating user with valid data");
    it("Test Case 1: Create user successfully with valid data", () => {
        cy.step("Positive Scenario: Sending valid user payload");
        cy.request("POST", "/users/", validUser).then((response) => {
            cy.step("Checking response status and body");
            expect(response.status).to.eq(201);
            expect(response.body.username).to.eq(validUser.username);
            expect(response.body.email).to.eq(validUser.email);
        });
    });

    cy.step("Negative Scenarios");
    it("Test Case 2: Missing username", () => {
        cy.step("Negative Scenario: Payload missing username");
        cy.request({ method: "POST", url: "/users/", body: missingUsername, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 3: Blank username", () => {
        cy.step("Negative Scenario: Payload with blank username");
        cy.request({ method: "POST", url: "/users/", body: blankUsername, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 400 or 422");
                expect([400, 422]).to.include(response.status);
            });
    });

    it("Test Case 4: Missing email", () => {
        cy.step("Negative Scenario: Payload missing email");
        cy.request({ method: "POST", url: "/users/", body: missingEmail, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 5: Invalid email", () => {
        cy.step("Negative Scenario: Payload with invalid email");
        cy.request({ method: "POST", url: "/users/", body: { ...validUser, email: invalidEmails[0] }, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 6: Missing password", () => {
        cy.step("Negative Scenario: Payload missing password");
        const { password, ...userWithoutPassword } = validUser;
        cy.request({ method: "POST", url: "/users/", body: userWithoutPassword, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 7: Short password", () => {
        cy.step("Negative Scenario: Payload with short password");
        cy.request({ method: "POST", url: "/users/", body: { ...validUser, password: invalidPasswords[0] }, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 400 or 422");
                expect([400, 422]).to.include(response.status);
            });
    });

    it("Test Case 8: Missing age", () => {
        cy.step("Negative Scenario: Payload missing age");
        const { age, ...userWithoutAge } = validUser;
        cy.request({ method: "POST", url: "/users/", body: userWithoutAge, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 9: Negative age", () => {
        cy.step("Negative Scenario: Payload with negative age");
        cy.request({ method: "POST", url: "/users/", body: { ...validUser, age: -5 }, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 10: Missing phone", () => {
        cy.step("Negative Scenario: Payload missing phone");
        const { phone, ...userWithoutPhone } = validUser;
        cy.request({ method: "POST", url: "/users/", body: userWithoutPhone, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 11: Invalid phone", () => {
        cy.step("Negative Scenario: Payload with invalid phone");
        cy.request({ method: "POST", url: "/users/", body: invalidPhone, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 12: Empty payload", () => {
        cy.step("Negative Scenario: Sending empty payload");
        cy.request({ method: "POST", url: "/users/", body: {}, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 13: No payload", () => {
        cy.step("Negative Scenario: No payload sent");
        cy.request({ method: "POST", url: "/users/", failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 14: Minimum age", () => {
        cy.step("Negative Scenario: Payload with minimum age under 18");
        cy.request({ method: "POST", url: "/users/", body: minAge, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 15: Maximum age", () => {
        cy.step("Negative Scenario: Payload with maximum age too high");
        cy.request({ method: "POST", url: "/users/", body: maxAge, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

    it("Test Case 16: Long username", () => {
        cy.step("Negative Scenario: Payload with very long username");
        cy.request({ method: "POST", url: "/users/", body: longUsername, failOnStatusCode: false })
            .then((response) => {
                cy.step("Expecting status code 422");
                expect(response.status).to.eq(422);
            });
    });

});
