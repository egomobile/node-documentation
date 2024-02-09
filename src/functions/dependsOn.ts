// This file is part of the @egomobile/documentation distribution.
// Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
//
// @egomobile/documentation is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, version 3.
//
// @egomobile/documentation is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import type { DependencyInfoCollectionArg, DependencyInfoResolver, IClassDependencyItem, IDependencyInformation, IFunctionDependencyItem, IModuleDependencyItem, IStackInfo } from "../types";
import type { Constructor, CreateDependsOnHelpersFunc, Func, Nilable } from "../types/internal";

/**
 * Adds dependency information for current app.
 *
 * @example
 * ```
 * import {
 *   appDependsOn,
 *   getDependencies
 * } from "@egomobile/documentation"
 *
 * appDependsOn(
 *   {
 *     // your information here...
 *   }
 * )
 *
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @param {IDependencyInformation|DependencyInfoResolver} infoOrResolver The dependency information or the function that resolves it.
 * @param {Nilable<DependenciesArg>} [dependenciesOrResolver] The custom collection for the dependency info items or the function that resolves it.
 * @param {Nilable<IStackInfo|false>} [stackInfo] Custom stack information.
 *
 * @throws ReferenceError No CommonJS based main module found.
 */
export function appDependsOn(
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependenciesOrResolver?: Nilable<DependencyInfoCollectionArg>,
    stackInfo?: Nilable<IStackInfo | false>
) {
    const mainModule = require.main;
    if (!mainModule) {
        throw new ReferenceError("no main module found");
    }

    const tryGetStackInfo = require("../utils/internal").tryGetStackInfo;

    if (!stackInfo) {
        stackInfo = tryGetStackInfo();
    }

    moduleDependsOn(
        mainModule,
        infoOrResolver,
        dependenciesOrResolver,
        stackInfo
    );
}

/**
 * Adds dependency information for a class.
 *
 * @example
 * ```
 * import {
 *   classDependsOn,
 *   getDependencies
 * } from "@egomobile/documentation"
 *
 * class MyClass {
 *   // ...
 * }
 *
 * classDependsOn(
 *   MyClass,
 *   {
 *     // your information here...
 *   }
 * )
 *
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @param {Constructor<any>} classConstructor The class constructor.
 * @param {IDependencyInformation|DependencyInfoResolver} infoOrResolver The dependency information or the function that resolves it.
 * @param {Nilable<DependenciesArg>} [dependenciesOrResolver] The custom collection for the dependency info items or the function that resolves it.
 * @param {Nilable<IStackInfo|false>} [stackInfo] Custom stack information.
 */
export function classDependsOn(
    classConstructor: Constructor<any>,
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependenciesOrResolver?: Nilable<DependencyInfoCollectionArg>,
    stackInfo?: Nilable<IStackInfo | false>
) {
    const createDependsOnHelpers: CreateDependsOnHelpersFunc =
        require("../utils/internal").createDependsOnHelpers;
    const tryGetStackInfo = require("../utils/internal").tryGetStackInfo;

    if (!stackInfo) {
        stackInfo = tryGetStackInfo();
    }

    const {
        addItem
    } = createDependsOnHelpers(infoOrResolver, dependenciesOrResolver);

    const newClassItem: IClassDependencyItem = {
        "constructor": classConstructor,
        "type": "class"
    };

    addItem({
        "existsIn": stackInfo ?? null,
        "item": newClassItem
    });
}

/**
 * Adds dependency information for a function.
 *
 * @example
 * ```
 * import {
 *   functionDependsOn,
 *   getDependencies
 * } from "@egomobile/documentation"
 *
 * function myFunction() {
 *   // ...
 * }
 *
 * functionDependsOn(
 *   myFunction,
 *   {
 *     // your information here...
 *   }
 * )
 *
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @param {Func} func The function.
 * @param {IDependencyInformation|DependencyInfoResolver} infoOrResolver The dependency information or the function that resolves it.
 * @param {Nilable<DependenciesArg>} [dependenciesOrResolver] The custom collection for the dependency info items or the function that resolves it.
 * @param {Nilable<IStackInfo|false>} [stackInfo] Custom stack information.
 */
export function functionDependsOn(
    func: Func,
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependenciesOrResolver?: Nilable<DependencyInfoCollectionArg>,
    stackInfo?: Nilable<IStackInfo | false>
) {
    const createDependsOnHelpers: CreateDependsOnHelpersFunc =
        require("../utils/internal").createDependsOnHelpers;
    const tryGetStackInfo = require("../utils/internal").tryGetStackInfo;

    if (!stackInfo) {
        stackInfo = tryGetStackInfo();
    }

    const {
        addItem
    } = createDependsOnHelpers(infoOrResolver, dependenciesOrResolver);

    const newFunctionItem: IFunctionDependencyItem = {
        "key": func.name,
        "type": "function"
    };

    addItem({
        "existsIn": stackInfo ?? null,
        "item": newFunctionItem
    });
}

/**
 * Adds dependency information for a module.
 *
 * @example
 * ```
 * import {
 *   moduleDependsOn,
 *   getDependencies
 * } from "@egomobile/documentation"
 *
 * moduleDependsOn(
 *   require.main,
 *   {
 *     // your information here...
 *   }
 * )
 *
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @param {any} module The module.
 * @param {IDependencyInformation|DependencyInfoResolver} infoOrResolver The dependency information or the function that resolves it.
 * @param {Nilable<DependenciesArg>} [dependenciesOrResolver] The custom collection for the dependency info items or the function that resolves it.
 * @param {Nilable<IStackInfo|false>} [stackInfo] Custom stack information.
 */
export function moduleDependsOn(
    module: any,
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependenciesOrResolver?: Nilable<DependencyInfoCollectionArg>,
    stackInfo?: Nilable<IStackInfo | false>
) {
    const createDependsOnHelpers: CreateDependsOnHelpersFunc =
        require("../utils/internal").createDependsOnHelpers;
    const tryGetStackInfo = require("../utils/internal").tryGetStackInfo;

    if (!stackInfo) {
        stackInfo = tryGetStackInfo();
    }

    const {
        addItem
    } = createDependsOnHelpers(infoOrResolver, dependenciesOrResolver);

    const newModuleItem: IModuleDependencyItem = {
        module,
        "type": "module"
    };

    addItem({
        "existsIn": stackInfo ?? null,
        "item": newModuleItem
    });
}
