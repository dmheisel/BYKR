import mapCenterReducer from './mapCenterReducer'

describe('tests for mapCenterReducer to check states returned are correct', () => {
  test('default state should be empty object', () => {
    let action = {}
    let newState = mapCenterReducer(undefined, action)
    expect(newState).toEqual({});
  })
  test('state should return action payload on SET_CENTER type', () => {
    let action = { type: 'SET_CENTER', payload: 'payloadTest' }
    let newState = mapCenterReducer(undefined, action)
    expect(newState).toEqual('payloadTest')
  })
  test('state should clear to empty object on CLEAR_CENTER type', () => {
    let action = { type: 'CLEAR_CENTER' }
    let newState = mapCenterReducer('testState', action)
    expect(newState).toEqual({});
  })
  test('state should clear to empty object on UNSET_USER', () => {
    let action = { type: 'UNSET_USER' };
    let newState = mapCenterReducer('testState', action)
    expect(newState).toEqual({})
  })
})
