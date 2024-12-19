import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureOneModule } from './feature-one/feature-one.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FeatureOneModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe';
}
