import { atom, selector } from "recoil";
import { Part, ToKorean } from "../data/humans";

interface Log {
    duration: number,
    pain: number,
    motion: number,
    stability: number,
}

export const symptomsState = atom<Pick<Part, 'name' | 'direction'>[]>({
    key: 'symptomsState',
    default: [],
});

export const detailSymptoms = atom<Pick<Part, 'name' | 'direction'>[]>({
    key: 'detailSymptoms',
    default: [],
});

export const elbowFunctionState = atom<string[]>({
    key: 'elbowFunctionState',
    default: [],
});

export const durationState = atom<string>({
    key: 'durationState',
    default: '',
});

export const diagnosisState = atom<string>({
    key: 'diagnosisState',
    default: '',
});

export const homeState = atom<boolean>({
    key: 'homeState',
    default: false,
});

export const medicineState = atom<string>({
    key: 'medicineState',
    default: '',
});

export const logState = atom<Log>({
    key: 'log',
    default: {
        duration: 0,
        pain: 1,
        motion: 30,
        stability: 0,
    }
});

export const getAllStates = selector({
    key: 'getAllStates',
    get: ({ get }) => {
        const symptoms = get(symptomsState);
        const details = get(detailSymptoms);
        const elbowFunction = get(elbowFunctionState);
        const diagnosisDuration = get(durationState);
        const diagnosis = get(diagnosisState);
        const home = get(homeState);
        const medicine = get(medicineState);
        const log = get(logState);
        return ({
            'home' : home,
            'medicine': medicine,
            'diagnosisDuration': diagnosisDuration,
            'diagnosis': diagnosis,
            'symptoms' : symptoms,
            'details' : details,
            ...log
        })
    }
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