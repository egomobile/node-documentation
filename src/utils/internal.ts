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

import type { DependencyInfoArg, DependencyInfoCollectionArg, DependencyItem, DependencyItemWithInfo } from "../types";
import type { ClassOrInstance, Collection, Constructor, Nilable, Nullable } from "../types/internal";

export function createDependsOnHelpers(
    infoOrResolver: DependencyInfoArg,
    dependenciesOrResolver: Nilable<DependencyInfoCollectionArg>
) {
    const { getDependencies } = require("../functions");

    const getInfo = (item: DependencyItem) => {
        if (typeof infoOrResolver === "function") {
            return infoOrResolver(item);
        }

        return infoOrResolver;
    };

    const getDepsCollection: (() => Collection<DependencyItemWithInfo>) =
        dependenciesOrResolver ?
            () => {
                return typeof dependenciesOrResolver === "function" ?
                    dependenciesOrResolver() :
                    dependenciesOrResolver!;
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

    return {
        addItem,
        getDepsCollection,
        getInfo
    };
}


export function getClassName(classOrInstance: ClassOrInstance<any>): Nullable<string> {
    if (isConstructor(classOrInstance)) {
        return classOrInstance.name;
    }

    if (typeof classOrInstance?.constructor?.name === "string") {
        return classOrInstance?.constructor?.name;
    }

    return null;
}

export function isCollection<T extends any = any>(val: any): val is Collection<T> {
    return !!val && (
        "push" in val ||
        "add" in val
    );
}

export function isConstructor<T extends any = any>(classOrInstance: ClassOrInstance<T>): classOrInstance is Constructor<T> {
    return typeof classOrInstance === "function";
}

export function isNil(val: unknown): val is (null | undefined) {
    return typeof val === "undefined" || val === null;
}
