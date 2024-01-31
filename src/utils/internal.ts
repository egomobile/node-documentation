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

import type { Collection } from "../types/internal";

export function isCollection<T extends any = any>(val: any): val is Collection<T> {
    return !!val && (
        "push" in val ||
        "add" in val
    );
}

export function isNil(val: unknown): val is (null | undefined) {
    return typeof val === "undefined" || val === null;
}
