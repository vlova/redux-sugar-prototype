import { Type } from "../../typescript";
import { Actions } from "./actions";

export function getPossibleActionHandlers<TActions extends Actions<unknown>>(
    actions: TActions
): string[] {
    let methods: string[] = [];
    let prototype: any = actions;
    while (prototype instanceof Actions) {
        methods = [
            ...methods,
            ...Object.getOwnPropertyNames(prototype)
                // TODO: it would be nice to filter out private properties
                //       but they are introduced by shitty https://babeljs.io/docs/en/babel-plugin-proposal-private-methods
                .filter(property => property !== 'constructor')
                // eslint-disable-next-line no-loop-func
                .filter(property => typeof prototype[property] === 'function')
        ];

        prototype = Object.getPrototypeOf(prototype);
    }

    return methods;
}

export function getActionType(actionsType: Type<any>, methodName: string) {
    return actionsType.name + '/' + methodName;
}