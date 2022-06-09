import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {ListRoomsComponent} from "./components/room/list-rooms/list-rooms.component";
import {AuthGuard} from "./guards/auth.guard";
import {NewRoomComponent} from "./components/room/new-room/new-room.component";
import {ListDevicesComponent} from "./components/device/list-device/list-devices.component";
import {NewDeviceComponent} from "./components/device/new-device/new-device.component";
import {DeviceRoomComponent} from "./components/device/device-room/device-room.component";

const routes: Routes = [
  {
    path: "auth", children: [
      {path: "", pathMatch: "full", redirectTo: "login"},
      {path: "sign-up", component: SignUpComponent},
      {path: "login", component: LoginComponent}
    ]
  },
  {path: "", pathMatch: "full", redirectTo: "rooms"},
  {
    path: "rooms", children: [
      {path: "", pathMatch: "full", component: ListRoomsComponent},
      {path: "new", component: NewRoomComponent},
    ], canActivate: [AuthGuard]
  },
  {
    path: "devices", children: [
      {path: "", pathMatch: "full", component: ListDevicesComponent},
      {path: "new", component: NewDeviceComponent},
        {path: "room/:id", component: DeviceRoomComponent}
      ], canActivate: [AuthGuard]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
