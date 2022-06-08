import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/auth/login/login.component';
import {ListRoomsComponent} from './components/room/list-rooms/list-rooms.component';
import {NewRoomComponent} from './components/room/new-room/new-room.component';
import {ListDevicesComponent} from './components/device/list-device/list-devices.component';
import {NewDeviceComponent} from './components/device/new-device/new-device.component';
import {DeviceRoomComponent} from './components/device/device-room/device-room.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ListRoomsComponent,
    NewRoomComponent,
    ListDevicesComponent,
    NewDeviceComponent,
    DeviceRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
