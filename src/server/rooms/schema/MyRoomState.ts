import { Schema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") longtitude: number;
  @type("number") latitude: number;
}
export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
