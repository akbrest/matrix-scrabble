import ILanguageService from '../Services/LanguageService';

class EnglishService implements ILanguageService {
  async getDefinition(word) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();

      // Assuming the API returns an array of definitions
      const firstDefinition = data;

      return firstDefinition || 'No definition';
    } catch (error) {
      console.error('Error fetching definition:', error);
      throw new Error('Error fetching definition');
    }
  }

  public async GetWordStatus(word) {
    try {
      var data = await this.getDefinition(word);

      if (data == null) return 'err';
      if (data === 'No definition') return 'err';
      if (data[0] == null) return 'err';
      if (data[0].meanings == null) return 'err';

      var value = false;

      data.map((element) => {
        element.meanings.map((elem) => {
          if (elem.partOfSpeech === 'noun') {
            value = true;
          }

          return 1;
        });

        return 1;
      });

      if (value) return 'ok';
      else return 'err';
    } catch (error) {
      console.error('Error fetching definition:', error);
      throw new Error('Error fetching definition');
    }
  }
}

export default EnglishService;
