import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TextComponent } from "../../components/text/text.component";
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, TextComponent],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  birthday: number = new Date().getFullYear() - new Date(2003, 6, 28).getFullYear()
  translationService: TranslationService = new TranslationService();

  constructor() { }

  ngOnInit() {  }

}
