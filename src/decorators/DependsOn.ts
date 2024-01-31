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

import type { ClassPropKey, Collection, Constructor, IArrayLike, Nilable, Optional, ReferenceValue } from "../types/internal";
import { isCollection } from "../utils/internal";

/**
 * Repository of `IDependencyInformationEntity` grouped by their name.
 */
export type DependencyInformationEntities = IDependencyInformationEntity[];

/**
 * Repository of `IDependencyInformationEntityAttribute` grouped by their name.
 */
export type DependencyInformationEntityAttributes = IDependencyInformationEntityAttribute[];

/**
 * A function that returns an `IDependencyInformation` based on a `DependencyItem`.
 */
export type DependencyInfoResolver = (item: DependencyItem) => IDependencyInformation;

/**
 * An item for `dependencies`.
 */
export type DependencyItem =
    IClassDependencyItem |
    IMethodDependencyItem |
    IParameterDependencyItem |
    IPropertyDependencyItem;

/**
 * A function that resolves collection of `DependencyItemWithInfo`s.
 */
export type DependencyItemCollectionResolver = () => Collection<DependencyItemWithInfo>;

/**
 * An extension of `DependencyItem`.
 */
export type DependencyItemWithInfo = DependencyItem & {
    /**
     * The underlying information.
     */
    info: IDependencyInformation;
};

/**
 * A `IDependencyItem` with information about a class and its dependencies.
 */
export interface IClassDependencyItem extends IDependencyItem {
    /**
     * The underlying constructor.
     */
    constructor: Constructor<any>;
    /**
     * The type
     */
    type: "class";
}

/**
 * Information about a dependency.
 */
export interface IDependencyInformation {
    /**
     * A reference value. Value should be handled as slug value, case-insensitive.
     */
    app: ReferenceValue;
    /**
     * An optional value that categories this app. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * If there is an action on `app`'s side, it will
     * have effects in this application in general.
     *
     * @default `false`
     */
    hasLocalEffects?: Nilable<boolean>;
    /**
     * If there is an action in this application,
     * it will have effects on `app`'s side in general.
     *
     * @default `true`
     */
    hasRemoteEffects?: Nilable<boolean>;
    /**
     * Optional entities for this app.
     */
    entities?: Nilable<DependencyInformationEntities>;
    /**
     * An optional list of references. Should be handled as URIs.
     */
    references?: Nilable<string[]>;
    /**
     * Optional notes/remarks for this app. Should be handled as Markdown, if possible.
     */
    remarks?: Nilable<string>;
    /**
     * An optional value that classifies the application. Value should be handled as slug value, case-insensitive.
     */
    type?: Nilable<string>;
}

/**
 * An entity inside a `IDependencyInformation` object.
 */
export interface IDependencyInformationEntity {
    /**
     * Optional list of attributes.
     */
    attributes?: Nilable<DependencyInformationEntityAttributes>;
    /**
     * An optional value that categories this entity. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * If there is an action on this entity side, it will
     * have effects in this application in general.
     *
     * @default `false`
     */
    hasLocalEffects?: Nilable<boolean>;
    /**
     * If there is an action in this application,
     * it will have effects only on entity's side in general.
     *
     * @default `true`
     */
    hasRemoteEffects?: Nilable<boolean>;
    /**
     * The unique key. Value should be handled case-insensitive.
     */
    key: ReferenceValue;
    /**
     * An optional list of references. Should be handled as URIs.
     */
    references?: Nilable<string[]>;
    /**
     * Optional notes/remarks for this entity. Should be handled as Markdown, if possible.
     */
    remarks?: Nilable<string>;
    /**
     * An optional value that classifies the entity. Value should be handled as slug value, case-insensitive.
     */
    type?: Nilable<string>;
}

/**
 * An attribute inside a `IDependencyInformationEntity` object.
 */
export interface IDependencyInformationEntityAttribute {
    /**
     * An optional value that categories this attribute. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * If there is an action on this attribute side, it will
     * have effects in this application in general.
     *
     * @default `false`
     */
    hasLocalEffects?: Nilable<boolean>;
    /**
     * If there is an action in this application,
     * it will have effects only on attribute's side in general.
     *
     * @default `true`
     */
    hasRemoteEffects?: Nilable<boolean>;
    /**
     * The unique key. Value should be handled as slug value, case-insensitive.
     */
    key: ReferenceValue;
    /**
     * An optional list of references. Should be handled as URIs.
     */
    references?: Nilable<string[]>;
    /**
     * Optional notes/remarks for this attribute. Should be handled as Markdown, if possible.
     */
    remarks?: Nilable<string>;
    /**
     * An optional value that classifies the attribute. Value should be handled as slug value, case-insensitive.
     */
    type?: Nilable<string>;
}

/**
 * A basic dependency item.
 */
export interface IDependencyItem {
}

/**
 * A `IDependencyItem` with information about a class method and its dependencies.
 */
export interface IMethodDependencyItem extends IDependencyItem {
    /**
     * The key / name.
     */
    key: ClassPropKey;
    /**
     * The type.
     */
    type: "method";
}

/**
 * A `IDependencyItem` with information about a paremeter of a class method and its dependencies.
 */
export interface IParameterDependencyItem extends IDependencyItem {
    /**
     * The key / name, if available.
     */
    key?: Optional<ClassPropKey>;
    /**
     * The zero-based index inside the method.
     */
    index: number;
    /**
     * The type.
     */
    type: "parameter";
}

/**
 * A `IDependencyItem` with information about a class property and its dependencies.
 */
export interface IPropertyDependencyItem extends IDependencyItem {
    /**
     * The key / name.
     */
    key: ClassPropKey;
    /**
     * The type.
     */
    type: "property";
}

/**
 * Default collection of of `DependencyItemWithInfo`s.
 */
export const defaultDependencies: IArrayLike<DependencyItemWithInfo> = [];

let dependenciesResolver: DependencyItemCollectionResolver = () => {
    return defaultDependencies;
};

/**
 * Returns the collection of `DependencyItemWithInfo` items.
 *
 * @example
 * ```
 * import {
 *   getDependencies,
 *   setDependencies
 * } from "@egomobile/documentation"
 *
 * // initially this is an array
 * console.log(
 *   getDependencies()
 * )
 *
 * // you can also define a function that returns the collection
 * const newDependencyCollection = new Set<DependencyItemWithInfo>()
 *
 * setDependencies(newDependencyCollection)
 *
 * // should be the set from `newDependencyCollection` now
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @returns {Collection<DependencyItemWithInfo>} The current, global collection of `DependencyItemWithInfo`s.
 */
export function getDependencies(): Collection<DependencyItemWithInfo> {
    return dependenciesResolver();
}

/**
 * Sets up the global collection of `DependencyItemWithInfo`s.
 *
 * @example
 * ```
 * import {
 *   getDependencies,
 *   setDependencies
 * } from "@egomobile/documentation"
 *
 * // initially this is an array
 * console.log(
 *   getDependencies()
 * )
 *
 * // you can also define a function that returns the collection
 * const newDependencyCollection = new Set<DependencyItemWithInfo>()
 *
 * setDependencies(newDependencyCollection)
 *
 * // should be the set from `newDependencyCollection` now
 * console.log(
 *   getDependencies()
 * )
 * ```
 *
 * @param {Collection<DependencyItemWithInfo>|DependencyItemCollectionResolver} collectionOrResolver The collection or a function that resolves it.
 */
export function setDependencies(collectionOrResolver: Collection<DependencyItemWithInfo> | DependencyItemCollectionResolver): void {
    if (typeof collectionOrResolver === "function") {
        dependenciesResolver = collectionOrResolver;
    }
    else {
        if (!isCollection(collectionOrResolver)) {
            throw new TypeError("collection is not valid");
        }

        dependenciesResolver = () => {
            return collectionOrResolver as Collection<DependencyItemWithInfo>;
        };
    }
}

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
 * @param {DependsOnOptions} infoOrResolver The information or the function that resolves them.
 * @param {Nilable<Collection<DependencyItemWithInfo>>} [dependencies] The custom collection for the items.
 *
 * @returns {ClassDecorator|MethodDecorator|ParameterDecorator|PropertyDecorator} The new decorator function.
 */
export function DependsOn(
    infoOrResolver: IDependencyInformation | DependencyInfoResolver,
    dependencies?: Nilable<Collection<DependencyItemWithInfo>>
): any {
    const getInfo = (item: DependencyItem) => {
        if (typeof infoOrResolver === "function") {
            return infoOrResolver(item);
        }

        return infoOrResolver;
    };

    const getDepsCollection: (() => Collection<DependencyItemWithInfo>) =
        dependencies ?
            () => {
                return dependencies!;
            } :
            getDependencies;
    const addItem = (item: DependencyItem) => {
        const deps = getDepsCollection();

        const itemToAdd: DependencyItemWithInfo = {
            ...item,

            "info": getInfo(item)
        };

        if ("push" in deps) {
            deps.push(itemToAdd);  // array-like
        }
        else if ("add" in deps) {
            deps.add(itemToAdd);  // set-like
        }
        else {
            throw new TypeError("unsupported collection type");
        }
    };

    return (...args: any[]) => {
        const target: any = args[0];

        if (typeof target === "function") {
            const newClassItem: IClassDependencyItem = {
                "constructor": target,
                "type": "class"
            };

            addItem(newClassItem);
        }
        else {
            const propertyKey: Optional<ClassPropKey> = args[1];
            const descriptorOrIndex: Optional<TypedPropertyDescriptor<any> | number> = args[2];

            if (typeof descriptorOrIndex === "undefined") {
                const newPropertyItem: IPropertyDependencyItem = {
                    "key": propertyKey as ClassPropKey,
                    "type": "property"
                };

                addItem(newPropertyItem);
            }
            else {
                if (typeof descriptorOrIndex === "number") {
                    const newParameterItem: IParameterDependencyItem = {
                        "index": descriptorOrIndex as number,
                        "key": propertyKey,
                        "type": "parameter"
                    };

                    addItem(newParameterItem);
                }
                else {
                    const newMethodItem: IMethodDependencyItem = {
                        "key": propertyKey as ClassPropKey,
                        "type": "method"
                    };

                    addItem(newMethodItem);
                }
            }
        }
    };
}
