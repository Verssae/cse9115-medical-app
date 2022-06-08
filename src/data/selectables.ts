import { RootStackParamList } from "../screens/RootStackParams";


export interface Selectable {
    name: string,
    top: string,
    candidates: string[],
    bot?: string,
    next: keyof RootStackParamList,
};

export interface SelectableAnswers {
    name: string,
    answers: string[],
};

export const elbowFunctionTest: Selectable = {
    name: "팔꿈치 기능 테스트",
    top: '다음 팔꿈치를 사용해서 할 수 있는 일 중 혼자서 할 수 있는 일들을 모두 골라 주세요',
    candidates: [
        '머리 빗기',
        '식사',
        '셔츠 입기',
        '씻기',
        '신발 신기'
    ],
    bot: '혼자서 할 수 있는 일이 적힌 버튼을 모두 눌러 주세요',
    next: 'EndScreen'
};

export const historyDuration: Selectable = {
    name: '병력 유무',
    top: '최근에 다른 병원에서 정형외과 진료를 받은 적이 있나요?',
    candidates: [
        '아니요',
        '1달 이내',
        '3달 이내',
        '1년 이내',
        '1년 이상'
    ],
    next: 'Select',
};

export const historyDiagnosis: Selectable = {
    name: '질환 종류',
    top: '어떤 질환으로 진료받으셨나요?',
    candidates: [
        '디스크',
        '골다공증',
        '골절',
        '기타 척추관절질환',
        '수술'
    ],
    next: 'Select',

};

export const medicineQuery: Selectable = {
    name: '복용약 유무',
    top: '현재 처방받아 복용중인 약이 있으신가요?',
    candidates: [
        '네',
        '아니요'
    ],
    next: 'Overview',
};