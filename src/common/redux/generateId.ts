import { Opaque } from "ts-essentials";
import { uuid } from "../uuid";

export function generateId<T extends Opaque<string, string>>() {
    return uuid() as T;
}