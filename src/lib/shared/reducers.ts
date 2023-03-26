export interface ReducerActionObject<T extends string, P = undefined> {
  type: T;
  payload: P;
}

export interface ReducerActionDefinition<T extends string, S, P = undefined> {
  (payload: P): ReducerActionObject<T, P>;
  type: T;
  shouldApply: (action: ReducerActionObject<string, unknown>) => action is ReducerActionObject<T, P>;
  reduce: (state: S, action: ReducerActionObject<T, P>) => S;
}

export function createActionDefinition<T extends string, S, P = undefined>(
  type: T,
  reducer: ReducerActionDefinition<T, S, P>['reduce'],
): ReducerActionDefinition<T, S, P> {
  const actionDefinition: ReducerActionDefinition<T, S, P> = (payload: P)  => ({ type, payload });
  actionDefinition.type = type;
  actionDefinition.reduce = reducer;
  actionDefinition.shouldApply = (action): action is ReturnType<typeof actionDefinition> => action.type === type;

  return actionDefinition;
}
