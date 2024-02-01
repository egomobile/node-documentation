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

import type { IWithClassNameProp, IWithClassOrInstanceProp, IWithEffectsProps, IWithIsStaticProp, IWithReferencesProp, IWithRemarksProp, IWithTypeProp } from ".";
import type { ClassPropKey, Collection, Constructor, Nilable, Nullable, Optional, ReferenceValue } from "./internal";

/**
 * Type of an `dependenciesOrResolver` argument.
 */
export type DependencyInfoCollectionArg = Collection<DependencyItemWithInfo> | (() => Collection<DependencyItemWithInfo>);

/**
 * Type of an `infoOrResolver` argument.
 */
export type DependencyInfoArg = IDependencyInformation | DependencyInfoResolver;

/**
 * A function that returns an `IDependencyInformation` based on a `DependencyItem`.
 */
export type DependencyInfoResolver = (item: DependencyItem) => IDependencyInformation;

/**
 * Repository of `IDependencyInformationEntity` grouped by their name.
 */
export type DependencyInformationEntities = IDependencyInformationEntity[];

/**
 * Repository of `IDependencyInformationEntityAttribute` grouped by their name.
 */
export type DependencyInformationEntityAttributes = IDependencyInformationEntityAttribute[];

/**
 * An item for `dependencies`.
 */
export type DependencyItem =
    IClassDependencyItem |
    IFunctionDependencyItem |
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
export interface IDependencyInformation extends Partial<IWithEffectsProps>, Partial<IWithReferencesProp>, Partial<IWithRemarksProp>, Partial<IWithTypeProp> {
    /**
     * A reference value. Value should be handled as slug value, case-insensitive.
     */
    app: ReferenceValue;
    /**
     * An optional value that categories this app. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * Optional entities for this app.
     */
    entities?: Nilable<DependencyInformationEntities>;
    /**
     * Optional unique key. Value should be handled case-insensitive.
     */
    key?: Nilable<ReferenceValue>;
}

/**
 * An entity inside a `IDependencyInformation` object.
 */
export interface IDependencyInformationEntity extends Partial<IWithEffectsProps>, Partial<IWithReferencesProp>, Partial<IWithRemarksProp>, Partial<IWithTypeProp> {
    /**
     * Optional list of attributes.
     */
    attributes?: Nilable<DependencyInformationEntityAttributes>;
    /**
     * An optional value that categories this entity. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * The unique key. Value should be handled case-insensitive.
     */
    key: ReferenceValue;
}

/**
 * An attribute inside a `IDependencyInformationEntity` object.
 */
export interface IDependencyInformationEntityAttribute extends Partial<IWithEffectsProps>, Partial<IWithReferencesProp>, Partial<IWithRemarksProp>, Partial<IWithTypeProp> {
    /**
     * An optional value that categories this attribute. Value should be handled as slug value, case-insensitive.
     */
    category?: Nilable<string>;
    /**
     * The unique key. Value should be handled as slug value, case-insensitive.
     */
    key: ReferenceValue;
}

/**
 * A basic dependency item.
 */
export interface IDependencyItem {
}

/**
 * A `IDependencyItem` with information about a function and its dependencies.
 */
export interface IFunctionDependencyItem extends IDependencyItem {
    /**
     * The key / name.
     */
    key: string;
    /**
     * The type.
     */
    type: "function";
}

/**
 * A `IDependencyItem` with information about a class method and its dependencies.
 */
export interface IMethodDependencyItem extends IDependencyItem, Partial<IWithClassOrInstanceProp> {
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
export interface IParameterDependencyItem extends IDependencyItem, Partial<IWithClassOrInstanceProp> {
    /**
     * The zero-based index inside the method.
     */
    index: number;
    /**
     * The key / name, if available.
     */
    key?: Optional<ClassPropKey>;
    /**
     * The type.
     */
    type: "parameter";
}

/**
 * A `IDependencyItem` with information about a class property and its dependencies.
 */
export interface IPropertyDependencyItem extends IDependencyItem, Partial<IWithClassOrInstanceProp> {
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
 * A serizable version of an `IClassDependencyItem`.
 */
export interface ISerializableClassDependencyItemWithInfo extends ISerializableDependencyItemWithInfo {
    /**
     * The name of the class.
     */
    name: string;
    /**
     * The type
     */
    type: "class";
}

/**
 * A serizable version of an `IDependencyItem`.
 */
export interface ISerializableDependencyItemWithInfo {
    /**
     * The underlying information.
     */
    info: IDependencyInformation;
}

/**
 * A serizable version of an `IFunctionDependencyItem`.
 */
export interface ISerializableFunctionDependencyItemWithInfo extends ISerializableDependencyItemWithInfo {
    /**
     * The name of the function.
     */
    name: string;
    /**
     * The type.
     */
    type: "function";
}

/**
 * A serizable version of an `IMethodDependencyItem`.
 */
export interface ISerializableMethodDependencyItemWithInfo extends ISerializableDependencyItemWithInfo, IWithClassNameProp, IWithIsStaticProp {
    /**
     * The name of the method.
     */
    name: string;
    /**
     * The type.
     */
    type: "method";
}

/**
 * A serizable version of an `IParameterDependencyItem`.
 */
export interface ISerializableParameterDependencyItemWithInfo extends ISerializableDependencyItemWithInfo, IWithClassNameProp, IWithIsStaticProp {
    /**
     * The zero-based index inside the method.
     */
    index: number;
    /**
     * The name, if available.
     */
    name: Nullable<string>;
    /**
     * The type.
     */
    type: "parameter";
}

/**
 * A serizable version of an `IPropertyDependencyItem`.
 */
export interface ISerializablePropertyDependencyItemWithInfo extends ISerializableDependencyItemWithInfo, IWithClassNameProp, IWithIsStaticProp {
    /**
     * The name of the property.
     */
    name: string;
    /**
     * The type.
     */
    type: "property";
}

/**
 * An serializable dependency info item.
 */
export type SerializableDependencyItem =
    ISerializableClassDependencyItemWithInfo |
    ISerializableFunctionDependencyItemWithInfo |
    ISerializableMethodDependencyItemWithInfo |
    ISerializableParameterDependencyItemWithInfo |
    ISerializablePropertyDependencyItemWithInfo;
