import { atom, selector } from "recoil";
import { Parts } from "../data/humans";

export const symptomsState = atom<Pick<Parts, 'name' | 'direction'>[]>({
    key: 'symptomState',
    default: [],
});

export const strifiedSymptomsState = selector({
    key: 'strifiedSymptomsState',
    get: ({ get }) => {
        const symptoms = get(symptomsState);
        if (symptoms.length === 0) {
            return '어디가 불편하신가요?';
        }
        else {
            return appendIGa(JSON.stringify(symptoms));
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