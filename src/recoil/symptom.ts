import { atom, selector } from "recoil";
import { Part, ToKorean } from "../data/humans";

export const symptomsState = atom<Pick<Part, 'name' | 'direction'>[]>({
    key: 'symptomState',
    default: [],
});

export const strifiedSymptomsState = selector({
    key: 'strifiedSymptomsState',
    get: ({ get }) => {
        const symptoms = get(symptomsState);
        if (symptoms.length === 0) {
            return '안녕하세요! 어디가 불편하신가요?';
        }
        else {
            let converts = symptoms.map(({name, direction}) => ['arm', 'leg', 'chest', 'back', 'waist', 'chest'].includes(name) ? ToKorean[(direction ?? '') + name] : name);
            return appendIGa(converts.join(', ')) + ' 불편하시군요?';
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