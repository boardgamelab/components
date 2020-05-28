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

import { State } from "../../state";
import * as Flip from "./flip";
import * as Rotate from "./rotate";

export type Action = Flip.Action | Rotate.Action;

export function Apply(state: State, action: Action) {
  switch (action.kind) {
    case "card/flip":
      return Flip.Apply(state, action);
    case "card/rotate":
      return Rotate.Apply(state, action);
    default:
      return assertNever(action);
  }
}

function assertNever(action: never): never {
  throw new Error(`unexpected action: ${JSON.stringify(action)}`);
}