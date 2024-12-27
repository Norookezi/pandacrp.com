import { Injectable } from '@angular/core';
import translate from "../../../public/translate.json"

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  translate: {[key: string]: any} = translate
  userLang: string = navigator.language.split('-')[0]
  constructor() { }

  get(key: string): string {

    const translateDict: {[lang: string]: string} = this.translate[key]
    const translatedString = translateDict[this.userLang] ?? translateDict["en"]

    return translatedString || "missingTranslation"
  }
}
