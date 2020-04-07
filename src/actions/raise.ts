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

import { State, StateEntry } from "../state";

export interface Action {
  kind: "raise";
  id: string;
}

export function Apply(state: State, action: Action): State {
  const objects = state.objects;
  const stateEntry: StateEntry = objects[action.id] || {};
  const order = (state.highest || 0) + 1;
  return {
    ...state,
    highest: order,
    objects: {
      ...objects,
      [action.id]: {
        ...stateEntry,
        order
      }
    }
  };
}
