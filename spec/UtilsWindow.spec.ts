"use strict";

declare var beforeEach: any;
declare var afterEach: any;
declare var describe: any;
declare var it: any;
declare var expect: any;

import Utils from "../lib/Utils";
import UtilsWindow from "../lib/UtilsWindow";

describe("UtilsWindow", () => {

    let dataSet;
    let div1;
    let div2;
    let div3;
    let iframe;

    beforeEach(() => {
        div1 = window.document.createElement("div");
        div1.id = "div1";

        div2 = window.document.createElement("div");
        div2.id = "div2";
        window.document.body.appendChild(div2);

        div3 = window.document.createElement("div");
        div3.id = "div3";
        iframe = window.document.createElement("iframe");
        iframe.src = "javascript:;";
        window.document.body.appendChild(iframe);
        iframe.contentWindow.document.body.appendChild(div3);

        let paramsValues = [undefined, null, false, true, 123, "test", div1, div2, div3, window, window.document, iframe.contentWindow, iframe.contentWindow.document, window.document.body];
        dataSet = [];
        for (let x1 of paramsValues) {
            let cond = (
                x1 === undefined ||
                x1 === window ||
                x1 === iframe.contentWindow
            );
            dataSet.push({
                params: [x1],
                result: cond
            });
        }
    });

    afterEach(() => {
        window.document.body.removeChild(div2);
        window.document.body.removeChild(iframe);
    });

    let test = (methods, _dataSet) => {
        for (let set of _dataSet) {
            let results = [];
            for (let method of methods) {
                results.push(method.apply(UtilsWindow, set.params));
            }
            let result = results[0];
            for (let _result of results) {
                expect(_result).toEqual(result);
            }

            expect(typeof(result)).toEqual("number");

            if (set.result) {
                expect(result).toBeCalculable();
            } else {
                expect(result).toBeNaN();
            }
        }
    };

    it("UtilsWindow", () => {
        expect(typeof(UtilsWindow)).toEqual("function");
    });

    it("UtilsWindow.getHeight", () => {
        test([UtilsWindow.getHeight, Utils.Window.getHeight], dataSet);
    });

    it("UtilsWindow.getWidth", () => {
        test([UtilsWindow.getWidth, Utils.Window.getWidth], dataSet);
    });

    it("UtilsWindow.getSizes", () => {
        let methods = [UtilsWindow.getSizes, Utils.Window.getSizes];
        for (let set of dataSet) {
            let results = [];
            for (let method of methods) {
                results.push(method.apply(UtilsWindow, set.params));
            }
            let result = results[0];
            for (let _result of results) {
                expect(_result).toEqual(result);
            }

            expect(typeof(result)).toEqual("object");

            expect(Object.keys(result)).toBeArray(["width", "height"]);

            expect(typeof(result.width)).toEqual("number");
            expect(typeof(result.height)).toEqual("number");

            if (set.result) {
                expect(result.width).toBeCalculable();
                expect(result.height).toBeCalculable();
            } else {
                expect(result.width).toBeNaN();
                expect(result.height).toBeNaN();
            }
        }
    });
});