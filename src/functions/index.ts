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

import type { DependencyItemCollectionResolver, DependencyItemWithInfo } from "../types";
import type { Collection, IsCollectionFunc } from "../types/internal";

/**
 * Default collection of of `DependencyItemWithInfo`s.
 */
export const defaultDependencies: DependencyItemWithInfo[] = [];

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
    const isCollection: IsCollectionFunc = require("../utils/internal");

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

export * from "./dependsOn";
