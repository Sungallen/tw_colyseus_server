import { Schema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") sessionId: string;
  @type("number") longitude: number;
  @type("number") latitude: number;
}
export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
