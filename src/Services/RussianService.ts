import ILanguageService from '../Services/LanguageService';

class RussianService implements ILanguageService {

    apiKey = "dict.1.1.20240111T152922Z.a4f3a2df2c67d15e.ac1af2305676c3ef964f0907440ee866d27f5494";

    async getDefinition(word) {
      try {
        const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=` +this.apiKey+ `&lang=ru-ru&text=`+word);
        const data = await response.json();

        if(data.def == null || data.def.length <= 0){
          return 'No definition found';
        }

        // Assuming the API returns an array of definitions
        const firstDefinition = data.def[0].pos;
  
        return firstDefinition || 'No definition found';
      } catch (error) {
        console.error('Error fetching definition:', error);
        throw new Error('Error fetching definition');
      }
    }

    public async GetWordStatus(word) {
      try {
      
        var value = await this.getDefinition(word);
        // Assuming the API returns an array of definitions
        
        if (value != null && value === "noun"){
          return "ok";
        }
        
        return "err";

      } catch (error) {
        console.error('Error fetching definition:', error);
        throw new Error('Error fetching definition');
      }
    }


    public async CheckWords(data){

      var self = this;

      await data.forEach(
          async function(element) {
            element.status = await self.GetWordStatus(element.word)
            element.length = element.word.length
          }
      );

      return false;
    }       
  }
  
  export default RussianService;