"use strict";
/**
 * Import interfaces
 */
import IError from "../interfaces/IError";
import IWindow from "../interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;
declare var module: any;
declare var Error: IError;

/**
 * Import subclasses
 */
import UtilsAnimation from "./UtilsAnimation";
import UtilsBrowser from "./UtilsBrowser";
import UtilsCookie from "./UtilsCookie";
import UtilsDocument from "./UtilsDocument";
import UtilsDOM from "./UtilsDOM";
import UtilsMouse from "./UtilsMouse";
import UtilsScreen from "./UtilsScreen";
import UtilsSystem from "./UtilsSystem";
import UtilsUser from "./UtilsUser";
import UtilsWindow from "./UtilsWindow";
/**
 * Global Utils class
 */
export default class Utils {
  public static Animation = UtilsAnimation;
  public static Browser = UtilsBrowser;
  public static Cookie = UtilsCookie;
  public static DOM = UtilsDOM;
  public static Document = UtilsDocument;
  public static Mouse = UtilsMouse;
  public static Screen = UtilsScreen;
  public static System = UtilsSystem;
  public static User = UtilsUser;
  public static Window = UtilsWindow;

  public static warn(messange: string) {
    if (
        typeof console === "object"
    ) {
      if (typeof console.warn === "function") {
        //console.warn(messange);
        return messange;
      } else if (typeof console.log === "function") {
        //console.log(messange);
        return messange;
      }
    }
  }

  /**
   * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
   */
  public static getBoundingClientRect(domNode: string | Element, domDocument: Document = document, showForce: boolean = false): {
    bottom: number,
    height: number,
    left: number,
    right: number,
    top: number,
    width: number
  } {
    Utils.warn("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
    return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
  };

  /**
   * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
   */
  public static findElementPosition(domNode: string | Element, domDocument: Document = document, showForce: boolean = false) {
    Utils.warn("Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.");
    return Utils.DOM.findElementPosition(domNode, domDocument, showForce);
  }

  /**
   * Transfer static methods into the object
   * @param realObject
   * @param className
   */
  public static implementationStaticMethods(realObject: Object, className?: string): void {
    if (
        !!realObject &&
        typeof realObject === "object"
    ) {
      let staticClass = realObject.constructor;
      if (typeof staticClass === "function") {
        let methods = Object.keys(staticClass);
        if (methods && methods.length > 0) {
          for (let method of methods) {
            if (typeof realObject[method] === "undefined") {
              realObject[method] = (...args) => {
                if (
                    typeof staticClass !== "undefined"
                ) {
                  Utils.warn("That method was deprecated and soon will be removed. Please use " + (className || (staticClass && staticClass.name) || "Unknown") + "." + method + " method.");
                }
                return staticClass[method](...args);
              };
            }
          }
        }
      }
    }
  }

  /**
   * Get call stack trace
   * @return Array<Object>
   */
  public static stack(): Array<Object> {
    let e: IError = new Error();
    return (
            e &&
            e.stack &&
            e.stack.split("\n").slice(5).map(
                (s) => {
                  if (!s) {
                    return {};
                  }
                  let match: any = (/^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig).exec(s);
                  if (match) {
                    if (match[1]) {
                      match[1] = (/([^\/<]+)/ig).exec(match[1]);
                      if (match[1]) {
                        match[1] = match[1][0];
                      }
                    }
                    return {
                      column: match[4] || "",
                      file: match[2] || "",
                      line: match[3] || "",
                      method: match[1] || "",
                    };
                  }
                  match = (/^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig).exec(s);
                  if (match) {
                    return {
                      column: match[5] || "",
                      file: match[3] || "",
                      line: match[4] || "",
                      method: (match[1] + ":" + match[2]) || "",
                    };
                  }
                  match = (/^(.*)@(.*):([0-9]+):([0-9]+)$/ig).exec(s);
                  if (match) {
                    return {
                      column: match[4] || "",
                      file: match[2] || "",
                      line: match[3] || "",
                      method: match[1] || "",
                    };

                  }
                  match = (/^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig).exec(s);
                  if (match) {
                    return {
                      column: match[4] || "",
                      file: match[2] || "",
                      line: match[3] || "",
                      method: match[1] || "",
                    };
                  }
                  match = (/^\s+at\s(.*):([0-9]+):([0-9]+)$/ig).exec(s);
                  if (match) {
                    return {
                      column: match[3] || "",
                      file: match[1] || "",
                      line: match[2] || "",
                      method: "",
                    };
                  }
                  return s;
                }
            )
        ) ||
        [];
  }

  /**
   * Get random ID
   * @return {string}
   */
  public static getUID(): string {
    return Math.random().toString(36).substring(2);
  }
}

module.exports = Utils;
