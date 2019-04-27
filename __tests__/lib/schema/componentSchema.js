const componentSchema = require("../../../lib/schema/component/component");

jest.mock("../../../lib/schema/component/checkbox");
jest.mock("../../../lib/schema/component/container");
jest.mock("../../../lib/schema/component/label");
jest.mock("../../../lib/schema/component/number");
jest.mock("../../../lib/schema/component/select");
jest.mock("../../../lib/schema/component/textfield");

describe("the configuration schema", () => {
    it("returns checkbox schema when type is container", () => {
        const config = {
            type: "checkbox"
        };
        componentSchema(config);
        const checkboxSchema = require("../../../lib/schema/component/checkbox");
        expect(checkboxSchema.mock.calls.length).toBe(1);
    });
    it("returns container schema when type is container", () => {
        const config = {
            type: "container"
        };
        componentSchema(config);
        const containerSchema = require("../../../lib/schema/component/container");
        expect(containerSchema.mock.calls.length).toBe(1);
    });
    it("returns label schema when type is container", () => {
        const config = {
            type: "label"
        };
        componentSchema(config);
        const labelSchema = require("../../../lib/schema/component/label");
        expect(labelSchema.mock.calls.length).toBe(1);
    });
    it("returns number schema when type is container", () => {
        const config = {
            type: "number"
        };
        componentSchema(config);
        const numberSchema = require("../../../lib/schema/component/number");
        expect(numberSchema.mock.calls.length).toBe(1);
    });
    it("returns select schema when type is container", () => {
        const config = {
            type: "select"
        };
        componentSchema(config);
        const selectSchema = require("../../../lib/schema/component/select");
        expect(selectSchema.mock.calls.length).toBe(1);
    });
    it("returns textfield schema when type is container", () => {
        const config = {
            type: "textfield"
        };
        componentSchema(config);
        const textfieldSchema = require("../../../lib/schema/component/textfield");
        expect(textfieldSchema.mock.calls.length).toBe(1);
    });
});