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
      player.longitude = data["longitude"];
      player.latitude = data['latitude'];
      player.sessionId = data['sessionId'];
    });

  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = new Player();
    if (!options["Island_status"]){
      player.longitude = 120.8966868706328;
      player.latitude = 23.83015369701973;
      player.sessionId = client.sessionId;
      this.state.players.set(client.sessionId, player);
      console.log("new player =>", player.toJSON());
    } else {
      player.latitude = 0;
      player.longitude = 0;
      player.sessionId = client.sessionId;
      this.state.players.set(client.sessionId, player);
      console.log("new player =>", player.toJSON());
    }
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
