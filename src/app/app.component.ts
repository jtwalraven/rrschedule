import { Component } from '@angular/core';
import { ProcessDatabase } from './process-database.service'

@Component({
  selector: 'app-root',
  providers: [ProcessDatabase],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
