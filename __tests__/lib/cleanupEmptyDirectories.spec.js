const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');

const cleanup = require("../../lib/cleanupEmptyDirectories");

describe("directory cleanup module", () => {
    let tmpDir;
    beforeEach(()=>{
        tmpDir = tmp.dirSync({
            unsafeCleanup: true
        });
    });
    afterEach(()=>{
        tmpDir.removeCallback();
    });
    it("deletes empty directories", () => {
        fs.mkdirSync(path.resolve(tmpDir.name, "rootDir"));
        fs.mkdirSync(path.resolve(tmpDir.name, "rootDir", "emptyDir"));
        cleanup(tmpDir.name);
        expect.assertions(4);
        return Promise.all(
            [new Promise((resolve, reject) => {
                fs.access(path.resolve(tmpDir.name, "rootDir", "emptyDir"), (err) => {
                    if (!err) {
                        fail();
                        reject();
                    }
                    expect(err).toBeDefined();
                    expect(err.code).toBe("ENOENT");
                    resolve()
                })
            }),
                new Promise((resolve, reject) => {
                    fs.access(path.resolve(tmpDir.name, "rootDir"), (err) => {
                        if (!err) {
                            fail();
                            reject();
                        }
                        expect(err).toBeDefined();
                        expect(err.code).toBe("ENOENT");
                        resolve()
                    })
                })]);
    });
    it("does not delete files", () => {
        fs.mkdirSync(path.resolve(tmpDir.name, "rootDir"));
        fs.closeSync(fs.openSync(path.resolve(tmpDir.name, "rootDir", "file"), "w"));
        cleanup(tmpDir.name);
        expect.assertions(2);
        return Promise.all(
            [new Promise((resolve, reject) => {
                fs.access(path.resolve(tmpDir.name, "rootDir", "file"), (err) => {
                    if (err) {
                        fail();
                        reject();
                    }
                    expect(err).toBeNull();
                    resolve()
                })
            }),
                new Promise((resolve, reject) => {
                    fs.access(path.resolve(tmpDir.name, "rootDir"), (err) => {
                        if (err) {
                            fail();
                            reject();
                        }
                        expect(err).toBeNull();
                        resolve()
                    })
                })]);
    });
});