describe("plugin model classes", () => {
    it("allows creating instances of defined types", () => {
        const schema = {
            whatever: {
                properties: {
                    string: "string",
                    number: "number",
                    nested: "nested"
                }
            },
            nested: {
                properties: {
                    nestedString: "string",
                    nestedNumber: "number"
                }
            }
        };
        const model = modelWrapper(schema);
        const whatever = new model.whatever();
        const nested = new model.nested();
    })

});