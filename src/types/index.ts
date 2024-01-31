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

import type { IDependencyInformation } from "../decorators";
import type { Nullable } from "./internal";

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
 * An object with an `className` property.
 */
export interface IWithClassNameProp {
    /**
     * The name of the underlying class, if available.
     */
    className: Nullable<string>;
}

/**
 * An object with an `isStatic` property.
 */
export interface IWithIsStaticProp {
    /**
     * Is underlying type static or not.
     */
    isStatic: boolean;
}

/**
 * An serializable dependency info item.
 */
export type SerializableDependencyItem =
    ISerializableClassDependencyItemWithInfo |
    ISerializableMethodDependencyItemWithInfo |
    ISerializableParameterDependencyItemWithInfo |
    ISerializablePropertyDependencyItemWithInfo;
