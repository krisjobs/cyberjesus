import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-training-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './training-menu.component.html',
  styleUrl: './training-menu.component.scss'
})
export class TrainingMenuComponent {

}
