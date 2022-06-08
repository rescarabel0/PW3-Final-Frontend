import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../../services/room.service";
import {Room} from "../../../../util/classes/Room";

@Component({
  selector: 'app-room',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {
  rooms: Room[];
  loading = false;

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.roomService.getAllRooms()
      .subscribe(
        (res: Room[]) => {
          this.loading = false
          this.rooms = res;
        }
      )
  }

  deleteRoom(id: Room['id']): void {
    this.roomService.deleteRoom(id).subscribe(
      (res) => {
          alert("Deletado com sucesso!");
          window.location.reload();
      }
    )
  }

}
