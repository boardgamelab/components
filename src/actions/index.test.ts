/*
 * Copyright 2020 Nicolo John Davis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Action, ApplyActionsToState } from ".";

test("invalid action", () => {
  const action = {} as Action;
  expect(() => ApplyActionsToState({ objects: {} }, [action])).toThrow();
});

describe("remote", () => {
  const initial = { objects: {} };

  test("false", () => {
    const action: Action = { kind: "noop" };
    const state = ApplyActionsToState(initial, [action]);
    expect(state).toEqual({
      ...initial,
      latestActions: [action],
    });
  });

  test("true", () => {
    const action: Action = { kind: "noop" };
    const state = ApplyActionsToState(initial, [action], true);
    expect(state).toEqual({
      ...initial,
      latestActions: [action],
      remote: true,
    });
  });
});
