import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private roomService: RoomService, private router: Router) {
    this.form = fb.group({
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente.");
      return;
    }
    this.roomService.saveNewRoom(this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Cômodo #${res.id} salvo com sucesso!`);
          this.router.navigateByUrl("/rooms")
        } else if (res.status === "Error") {
          alert(res.msg);
          return;
        }
      }
    )
  }
}
