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

export type ClassOrInstance<T extends any = Object> = T | Constructor<T>;

export type ClassPropKey = string | symbol;

export type Collection<T extends any = any> =
    IArrayLike<T> |
    ISetLike<T>;

export type Constructor<T extends any = any> = (new (...args: any[]) => T);

export interface IArrayLike<T extends any = any> {
    push(item: T): any;
}

export interface ISetLike<T extends any = any> {
    add(item: T): any;
}

export type List<T extends any = any> = T[] | Iterable<T> | IterableIterator<T>;

export type Nilable<T extends any = any> = Optional<T> | Nullable<T>;

export type Nullable<T extends any = any> = T | null;

export type Optional<T extends any = any> = T | undefined;

export type ReferenceValue = string | number;
