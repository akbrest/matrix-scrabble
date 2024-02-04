class FieldGenerator {
  Language = "en";
  AllowedWords = {
    "3": {
      en: ["god", "sky", "fat", "leg", "art"],
      ru: ["дом", "бог", "фон", "мир"],
    },
    "4": {
      en: ["wine", "crew", "food", "tray", "game"],
      ru: ["блог", "град", "кран", "клад", "фарт"],
    },
    "5": {
      en: ["cruel", "blood", "award", "style", "stick"],
      ru: ["потоп", "сталь", "ферзь", "пласт", "арена"],
    },
    "6": {
      en: ["square", "finish", "skynet", "unique", "skynet"],
      ru: ["корова", "груздь", "фитиль", "планер", "кобель"],
    },
    "7": { en: ["stomach", "tragedy"], ru: ["колбаса", "вентиль"] },
  };

  public GetRandomWord(count) {
    try {
      if (count < 3 || count > 7) {
        throw new Error("Wrong Count");
      }

      var items = this.AllowedWords[count][this.Language];
      let randomValue = items[Math.floor(Math.random() * items.length)];
      return randomValue;
    } catch (error) {
      console.error("Error fetching definition:", error);
      throw new Error("Error fetching definition");
    }
  }

  async CheckWord(word) {
    try {
      if (word == null) {
        throw new Error("Wrong Word");
      }

      var count = word.length;
      if (count < 3 || count > 7) {
        throw new Error("Wrong Count");
      }

      var items = this.AllowedWords[count][this.Language];

      // make api call

      items.forEach((element) => {
        if (element === word) {
          return word;
        }
      });
    } catch (error) {
      console.error("Error fetching definition:", error);
      throw new Error("Error fetching definition");
    }
  }
}

export default FieldGenerator;
