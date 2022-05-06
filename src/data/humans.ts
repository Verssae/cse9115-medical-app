import { ImageSourcePropType } from "react-native";

export interface HumanData {
    uri: ImageSourcePropType,
    name: string,
    width: number,
    height: number,
    left: number,
    top: number,
    disabled?: boolean,
};

export const humans: HumanData[] = [
    {
        uri: require('./human/bg.png'),
        name: 'default',
        width: 317,
        height: 756,
        left: 0,
        top: 0,
        disabled: true,
    },
    {
        uri: require('./human/neck.png'),
        name: '목',
        width: 119.81,
        height: 42.46,
        left: 32.02,
        top: 13.22
    },
    {
        uri: require('./human/chest.png'),
        name: '흉부',
        width: 143.11,
        height: 98.25,
        left: 26.77,
        top: 17.84
    },
    {
        uri: require('./human/face.png'),
        name: '얼굴',
        width: 89.03,
        height: 109.9,
        left: 35.43,
        top: 0,
        disabled: true,
    },
    {
        uri: require('./human/left_arm.png'),
        name: '왼팔',
        width: 57.41,
        height: 208.15,
        left: 71.92,
        top: 21.59
    },
    {
        uri: require('./human/left_shoulder.png'),
        name: '왼어깨',
        width: 59.49,
        height: 76.6,
        left: 64.7,
        top: 17.51
    },
    {
        uri: require('./human/left_hand.png'),
        name: '왼손',
        width: 58.24,
        height: 74.93,
        left: 81.63,
        top: 48.35
    },
    {
        uri: require('./human/right_arm.png'),
        name: '오른팔',
        width: 58.24,
        height: 206.48,
        left: 9.45,
        top: 21.59
    },
    {
        uri: require('./human/right_shoulder.png'),
        name: '오른어깨',
        width: 56.66,
        height: 76.6,
        left: 16.8,
        top: 17.18
    },
    {
        uri: require('./human/right_hand.png'),
        name: '오른손',
        width: 56.58,
        height: 73.27,
        left: 0,
        top: 48.57
    },
    {
        uri: require('./human/body.png'),
        name: '몸통',
        width: 131.13,
        height: 96.58,
        left: 28.71,
        top: 29.74
    },
    {
        uri: require('./human/waist.png'),
        name: '허리',
        width: 122.86,
        height: 23.31,
        left: 30.18,
        top: 42.51
    },
    {
        uri: require('./human/hip.png'),
        name: '엉덩이',
        width: 133.12,
        height: 78.26,
        left: 28.61,
        top: 45.59
    },
    {
        uri: require('./human/thigh.png'),
        name: '허벅지',
        width: 132.15,
        height: 112.4,
        left: 28.83,
        top: 55.95
    },
    {
        uri: require('./human/knee.png'),
        name: '무릎',
        width: 101.04,
        height: 26.64,
        left: 33.54,
        top: 70.81
    },
    {
        uri: require('./human/leg.png'),
        name: '종아리',
        width: 104.83,
        height: 144.87,
        left: 33.07,
        top: 74.34
    },
    {
        uri: require('./human/foot.png'),
        name: '발',
        width: 104.83,
        height: 49.96,
        left: 33.07,
        top: 93.39
    },
];

export const neckParts: HumanData[] = [
    {
        uri: require('./neck/bg.png'),
        name: 'default',
        width: 211.33,
        height: 208.98,
        left: 0,
        top: 0,
        disabled: true,
    },
    {
        uri: require('./neck/목_뒤.png'),
        name: '목 뒤',
        width: 48.26,
        height: 29.97,
        left: 38.19,
        top: 38.21,
    },
    {
        uri: require('./neck/오른쪽_귀_뒤.png'),
        name: '오른쪽 귀 뒤',
        width: 32.58,
        height: 52.09,
        left: 52.3,
        top: 14.8,
    },
    {
        uri: require('./neck/오른쪽_목_아래.png'),
        name: '오른쪽 목 아래',
        width: 69,
        height: 34.76,
        left: 52.05,
        top: 51.73,
    },
    {
        uri: require('./neck/왼쪽_귀_뒤.png'),
        name: '왼쪽 귀 뒤',
        width: 36.32,
        height: 52.45,
        left: 31.1,
        top: 15.72,
    },
    {
        uri: require('./neck/왼쪽_목_아래.png'),
        name: '왼쪽 목 아래',
        width: 73.89,
        height: 33.5,
        left: 13.86,
        top: 51.9,
    },
]