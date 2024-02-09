/* eslint-disable @typescript-eslint/naming-convention */

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

import type { IDependencyInformation, IParameterDependencyItem, IPropertyDependencyItem, IMethodDependencyItem, DependencyInfoResolver, DependencyInfoCollectionArg, IStackInfo } from "../types";
import type { ClassPropKey, CreateDependsOnHelpersFunc, Nilable, Nullable, Optional } from "../types/internal";

/**
 * Adds meta for a class, property, method or parameter
 * with information of dependencies.
 *
 * @example
 * ```
 * import {
 *     defaultDependencies,
 *     DependsOn
 * } from "@egomobile/documentation"
 *
 * @DependsOn({
 *  // an unique ID of the "remote" app that
 *   // has a dependency on this class
 *   app: "id-of-my-app",
 *
 *   // optional remarks for this app
 *   remarks: "Changes made by this class will update entities in this app",
 *
 *   // list of entities that are
 *   // affected in `app`
 *   entities: [
 *     {
 *       // an unique ID of the entity in `app`
 *       // like the name of a database table
 *       // or collection
 *       key: "tdta_user",
 *
 *       // optional remarks for this entity
 *       remarks: "Changes made by this class will update this entity",
 *
 *       // list of entities that are
 *       // affected in that entity
 *       attributes: [
 *         {
 *           // an unique ID of the attribute
 *           // inside the entity in like the name of
 *           // column
 *           key: "email",
 *
 *           // optional remarks for this entity attribute
 *           remarks: "Changes made by this class will update this attribute",
 *         },
 *       ],
 *     },
 *   ],
 * })
 * class MyDocumentedClass {
 *     // you can also save information
 *     // about a property
 *    @DependsOn({ ... })
 *     public aProp: any
 *
 *     // you can also save information
 *     // about a method
 *     @DependsOn({ ... })
 *     public aMethod(
 *         // you can also save information
 *         // about a method parameter
 *         @DependsOn({ ... }) aParam: any
 *     ) {
 *         // ...
 *     }
 * }
 *
 * console.log(
 *     // by default all information are
 *     // stored in this module-wide array
 *     defaultDependencies
 * )
 * ```
 *
 * @param {IDependencyInformation|DependencyInfoResolver} infoOrResolver The dependency information or the function that resolves it.
 * @param {Nilable<DependenciesArg>} [dependenciesOrResolver] The custom collection for the dependency info items or the function that resolves it.
 *
 * @returns {ClassDecorator|MethodDecorator|ParameterDecorator|PropertyDecorator} The new decorator function.
 */
export function DependsOn(
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependenciesOrResolver?: Nilable<DependencyInfoCollectionArg>
): any {
    const createDependsOnHelpers: CreateDependsOnHelpersFunc = require("../utils/internal").createDependsOnHelpers;
    const tryGetStackInfo = require("../utils/internal").tryGetStackInfo;

    const stackInfo: Nullable<IStackInfo | false> = tryGetStackInfo();

    const {
        addItem
    } = createDependsOnHelpers(infoOrResolver, dependenciesOrResolver);

    return (...args: any[]) => {
        const target: any = args[0];

        const addAsMethod = () => {
            const propertyKey: Optional<ClassPropKey> = args[1];

            const newMethodItem: IMethodDependencyItem = {
                "classOrInstance": target,
                "key": propertyKey as ClassPropKey,
                "type": "method"
            };

            addItem({
                "existsIn": stackInfo,
                "item": newMethodItem
            });
        };

        const addAsParameter = () => {
            const descriptorOrIndex: Optional<TypedPropertyDescriptor<any> | number> = args[2];
            const propertyKey: Optional<ClassPropKey> = args[1];

            const newParameterItem: IParameterDependencyItem = {
                "classOrInstance": target,
                "index": descriptorOrIndex as number,
                "key": propertyKey,
                "type": "parameter"
            };

            addItem({
                "existsIn": stackInfo,
                "item": newParameterItem
            });
        };

        const addAsProperty = () => {
            const propertyKey: Optional<ClassPropKey> = args[1];

            const newPropertyItem: IPropertyDependencyItem = {
                "classOrInstance": target,
                "key": propertyKey as ClassPropKey,
                "type": "property"
            };

            addItem({
                "existsIn": stackInfo,
                "item": newPropertyItem
            });
        };

        const addWith3Args = () => {
            const descriptorOrIndex: Optional<TypedPropertyDescriptor<any> | number> = args[2];

            if (typeof descriptorOrIndex === "undefined") {
                addAsProperty();
            }
            else if (typeof descriptorOrIndex === "number") {
                addAsParameter();
            }
            else {
                addAsMethod();
            }
        };

        if (typeof target === "function") {
            if (args.length === 3) {
                // static member

                addWith3Args();
            }
            else if (args.length === 1) {
                // class

                const {
                    classDependsOn
                } = require("../functions/dependsOn");

                classDependsOn(
                    target,
                    infoOrResolver,
                    dependenciesOrResolver,
                    stackInfo
                );
            }
        }
        else {
            // instance member

            addWith3Args();
        }
    };
}
