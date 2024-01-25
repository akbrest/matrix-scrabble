import ILanguageService from './LanguageService';

class DictionaryService {
  LanguageService;

  public constructor(ILanguageService: ILanguageService) {
    this.LanguageService = ILanguageService;
  }

    public async CheckWords(data: [{ word: string, length: number, status: string, }]) {

    await data.forEach(async (element) => {
        element.status = await this.LanguageService.GetWordStatus(element.word);
      element.length = element.word.length;
    });

    return false;
  }
}

export default DictionaryService;
