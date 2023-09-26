export const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Todo-List Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "mazerqoDev",
                email: "roman.martyniakdev@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8000/api/todo",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};
