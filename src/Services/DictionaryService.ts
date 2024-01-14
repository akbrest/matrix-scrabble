import ILanguageService from '../Services/LanguageService';

class DictionaryService {

  LanguageService;

  public constructor(ILanguageService: ILanguageService) {
    this.LanguageService = ILanguageService;
  }

  public async CheckWords(data){

    var self = this;

    await data.forEach(
        async function(element) {
          element.status = await self.LanguageService.GetWordStatus(element.word)
          element.length = element.word.length
        }
    );

    return false;
  }

}
  
export default DictionaryService;