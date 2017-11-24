import { Component } from '@angular/core';
import { ProcessDatabase } from './process-database.service'
import { RoundRobinCalcService } from './roundrobin-calc.service'

@Component({
  selector: 'app-root',
  providers: [ProcessDatabase, RoundRobinCalcService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
