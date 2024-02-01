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

import type { ClassOrInstance, Nilable, Nullable } from "./internal";

/**
 * An object with a `className` property.
 */
export interface IWithClassNameProp {
    /**
     * The name of the underlying class, if available.
     */
    className: Nullable<string>;
}

/**
 * An object with a `classOrInstance` property.
 */
export interface IWithClassOrInstanceProp {
    /**
     * The underlying class or constructor.
     */
    classOrInstance: ClassOrInstance<any>;
}

/**
 *  An object with effects properties.
 */
export interface IWithEffectsProps {
    /**
     * If there is an action on `app`'s side, it will
     * have effects in this application in general.
     *
     * @default `false`
     */
    hasLocalEffects: Nilable<boolean>;
    /**
     * If there is an action in this application,
     * it will have effects on `app`'s side in general.
     *
     * @default `true`
     */
    hasRemoteEffects: Nilable<boolean>;
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
 * An object with a `references` property.
 */
export interface IWithReferencesProp {
    /**
     * An optional list of references. Should be handled as URIs.
     */
    references: Nilable<string[]>;
}

/**
 * An object with a `remarks` property.
 */
export interface IWithRemarksProp {
    /**
     * Optional notes/remarks. Should be handled as Markdown, if possible.
     */
    references: Nilable<string[]>;
}

/**
 * An object with a `type` property.
 */
export interface IWithTypeProp {
    /**
     * An optional value for classification. Value should be handled as slug value, case-insensitive.
     */
    type: Nilable<string>;
}

export * from "./dependencies";
