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

import type { DependencyItemWithInfo, ISerializableClassDependencyItemWithInfo, ISerializableFunctionDependencyItemWithInfo, ISerializableMethodDependencyItemWithInfo, ISerializableModuleDependencyItemWithInfo, ISerializableParameterDependencyItemWithInfo, ISerializablePropertyDependencyItemWithInfo, SerializableDependencyItem } from "../types";
import type { GetClassNameFunc, IsConstructorFunc, List } from "../types/internal";

/**
 * Serialized a list of dependency items.
 *
 * @param {List<DependencyItemWithInfo>} list The input list to serialize.
 *
 * @returns {SerializableDependencyItem[]} The serialized list.
 */
export function serializeDependencies(list: List<DependencyItemWithInfo>): SerializableDependencyItem[] {
    const getClassName: GetClassNameFunc = require("./internal").getClassName;
    const isConstructor: IsConstructorFunc = require("./internal").isConstructor;

    const serializedItems: SerializableDependencyItem[] = [];

    for (const item of list) {
        const existsIn = item.existsIn || null;

        let newSerializedItem: SerializableDependencyItem;
        if (item.type === "class") {
            const newClassItem: ISerializableClassDependencyItemWithInfo = {
                existsIn,
                "info": item.info,
                "name": item.constructor.name,
                "type": item.type
            };

            newSerializedItem = newClassItem;
        }
        else if (item.type === "method") {
            const newMethodItem: ISerializableMethodDependencyItemWithInfo = {
                "className": getClassName(item.classOrInstance),
                existsIn,
                "info": item.info,
                "isStatic": isConstructor(item.classOrInstance),
                "name": String(item.key),
                "type": item.type
            };

            newSerializedItem = newMethodItem;
        }
        else if (item.type === "parameter") {
            const newParameterItem: ISerializableParameterDependencyItemWithInfo = {
                "className": getClassName(item.classOrInstance),
                existsIn,
                "info": item.info,
                "index": item.index,
                "isStatic": isConstructor(item.classOrInstance),
                "name": String(item.key ?? "") || null,
                "type": item.type
            };

            newSerializedItem = newParameterItem;
        }
        else if (item.type === "property") {
            const newPropertyItem: ISerializablePropertyDependencyItemWithInfo = {
                "className": getClassName(item.classOrInstance),
                existsIn,
                "info": item.info,
                "isStatic": isConstructor(item.classOrInstance),
                "name": String(item.key),
                "type": item.type
            };

            newSerializedItem = newPropertyItem;
        }
        else if (item.type === "function") {
            const newFunctionItem: ISerializableFunctionDependencyItemWithInfo = {
                existsIn,
                "info": item.info,
                "name": item.key,
                "type": item.type
            };

            newSerializedItem = newFunctionItem;
        }
        else {
            const newModuleItem: ISerializableModuleDependencyItemWithInfo = {
                existsIn,
                "info": item.info,
                "name": String(item.module?.filename ?? ""),
                "type": item.type
            };

            newSerializedItem = newModuleItem;
        }

        serializedItems.push(
            newSerializedItem
        );
    }

    return serializedItems;
}
