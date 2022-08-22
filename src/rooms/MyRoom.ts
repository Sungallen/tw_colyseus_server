import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate(options: any) {
    this.setState(new MyRoomState());
    this.roomId = "Taiwan_Island";
    this.autoDispose = false;

    this.onMessage("move", (client, data) => {
      console.log("update received -> ");
      console.debug(JSON.stringify(data));
      const player = this.state.players.get(client.sessionId);
      player.x = data["x"];
      player.y = data['y'];
      player.z = data["z"];
    });

  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = new Player();

    const FLOOR_SIZE = 500;
    player.x = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
    player.y = -1;
    player.z = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);

    this.state.players.set(client.sessionId, player);
    console.log("new player =>", player.toJSON());
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);

    console.log(client.sessionId, "left!");
  }

  onDispose() {
    this.autoDispose = false;
    console.log("room", this.roomId, "disposing...");
  }

}
