import { createActionDefinition, ReducerActionDefinition } from './reducers';

type ExampleState = Record<string, string>;

describe('createActionDefinition', () => {
  const actionType = 'exampleAction';
  const fieldKey = 'fieldKey';
  let actionDefinition: ReducerActionDefinition<'exampleAction', ExampleState, string>;

  beforeEach(() => {
    actionDefinition = createActionDefinition(actionType, (state, action) => {
      return {
        ...state,
        [fieldKey]: action.payload,
      };
    });
  });

  test('calling action definition returns an action object', () => {
    const payloadValue = 'payload-value';
    const actionObject = actionDefinition(payloadValue);

    expect(actionObject).toHaveProperty('type', actionType);
    expect(actionObject).toHaveProperty('payload', payloadValue);
  });

  test('action definition has the specified type', () => {
    expect(actionDefinition).toHaveProperty('type', actionType);
  });

  test('should apply returns true when action object is of same type', () => {
    const actionObject = actionDefinition('payload-value');

    expect(actionDefinition.shouldApply(actionObject)).toBeTrue();
  });

  test('should apply returns false when action object is not of same type', () => {
    const actionObject = { type: 'otherActionType', payload: 'payload-value' };

    expect(actionDefinition.shouldApply(actionObject)).toBeFalse();
  });

  test('reduces the state correctly', () => {
    const payloadValue = 'payload-value';
    const actionObject = actionDefinition(payloadValue);
    const initialState = {};

    const newState = actionDefinition.reduce(initialState, actionObject);
    expect(newState).not.toEqual(initialState);
    expect(newState).toHaveProperty(fieldKey, payloadValue);
  });
});
