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

import type { Component } from "./types";

// The Schema object contains the specifications of various
// objects in a particular game.  It does not change in
// value through the course of the game.  It is
// generated by the Editor and interpreted by the Renderer
// in order to generate the graphics on the frontend.

export interface Schema {
  assets: {
    [id: string]: Asset.Entry;
  };

  traits: Template.Entries;

  components: Template.Entries;

  automation: any;

  instances: {
    [id: string]: Instance.Entry;
  };

  game: any;

  version: number;
}

export namespace Asset {
  export type ID = string;

  export interface Entry {
    id: ID;
    name: string;
    url: string;
  }
}

export namespace Field {
  export type ID = string;

  export interface Definition {
    id: ID;
    type: "text" | "image";
    name?: string;
    value?: Value;
  }

  interface Text {
    value: string;
  }

  interface Image {
    assetID: Asset.ID;
  }

  export type Value = Text | Image;
}

export namespace Template {
  export type ID = string;

  export interface Side {
    layers?: Layer[];
  }

  export interface Layer {
    parts?: Part.Map;
    partOrder?: Part.ID[];

    isVisible?: object;

    isLocked?: boolean;

    traitLayout?: {
      traitID: string;
    };
  }

  export type Entries = {
    [id: string]: Entry;
  };

  export interface Entry {
    id: ID;

    // CARD / SNAP_POINT etc.
    type: Component;

    deps: string[];

    properties: { [id: string]: any };

    behaviors: { [id: string]: any };

    layout: {
      // width / height of the component.
      geometry: Geometry;

      faces: Side[];
    };
  }

  export interface Geometry {
    width: number;
    height: number;
  }

  export namespace Part {
    export type ID = string;

    interface Rect {
      type: "rect";
      id: ID;
      x: number;
      y: number;
      rotation: number;
      width: number;
      height: number;
      fill: string;
      stroke: string;
    }

    interface Circle {
      type: "circle";
      id: ID;
      x: number;
      y: number;
      rotation: number;
      width: number;
      height: number;
      fill: string;
      stroke: string;
    }

    interface Text {
      type: "text";
      id: ID;
      x: number;
      y: number;
      rotation: number;
      width: number;
      height: number;
      color: string;
      fontSize: number;
      fontFamily?: string;
      bold?: boolean;
      italic?: boolean;
      text: string;
      propertyID?: string;
    }

    interface Image {
      type: "image";
      assetID: Asset.ID;
      propertyID?: string;
      id: ID;
      x: number;
      y: number;
      rotation: number;
      width: number;
      height: number;
    }

    export type Entry = Rect | Circle | Text | Image;

    export type Map = {
      [id: string]: Entry;
    };
  }
}

export namespace Instance {
  export type ID = string;

  export interface Entry {
    id: ID;
    templateID: Template.ID;
    overrides?: {
      [id: string]: Field.Value;
    };
  }
}

export interface KeyValue<T> {
  [key: string]: T;
}
