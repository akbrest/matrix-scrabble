interface ILanguageService {
    GetWordStatus(word: string): Promise<string>;
}

export default ILanguageService;
