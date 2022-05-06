import { atom, selector } from "recoil";

export const symptomsState = atom<string[]>({
    key: 'symptomState',
    default: [],
});

export const strifiedSymptomsState = selector({
    key: 'strifiedSymptomsState',
    get: ({get}) => {
        let symptoms = get(symptomsState);
        if (symptoms.length === 0) {
            return '어디가 불편하신가요?';
        }
        else {
            symptoms = symptoms.map(symptom => symptom.replace('왼', ''));
            symptoms = symptoms.map(symptom => symptom.replace('오른', ''));
            let unique_symptoms = new Set(symptoms)
            return appendIGa(Array.from(unique_symptoms).join(', ')) + ' 불편하시군요';
        }
    }
});

function isEndWithConsonant(str: string) {
    const finalChrCode = str.charCodeAt(str.length - 1);
    const finalConsonantCode = (finalChrCode - 44032) % 28;
    return finalConsonantCode !== 0; 
};

function appendIGa(str: string) {
    return isEndWithConsonant(str) ? str + '이' : str + '가';
}