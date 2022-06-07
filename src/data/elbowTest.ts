import { Part, Parts } from "./humans";

export interface ElbowPart extends Omit<Part, 'name' | 'direction' | 'disabled'> {
    name: string;
    rotate: boolean;
    deg?: number;
}

export const baseWidth = 1564
export const baseHeight = 1319

export const ElbowTest: ElbowPart[] = [
    {
        uri: require('./ElbowTest/AngleBlue.png'),
        name: 'AngleBlue',
        width: 1241,
        height: 1241,
        left: 20.27,
        top: 4.02,
        rotate: true,
    },
    {
        uri: require('./ElbowTest/AngleOrange.png'),
        name: 'AngleOrange',
        width: 1241,
        height: 1241,
        left: 20.27,
        top: 4.02,
        rotate: true,
    },
    {
        uri: require('./ElbowTest/AngleRed.png'),
        name: 'AngleRed',
        width: 1241,
        height: 1241,
        left: 20.27,
        top: 4.02,
        rotate: true,
    },
    {
        uri: require('./ElbowTest/AngleBlock.png'),
        name: 'AngleBlock',
        width: 1241,
        height: 1241,
        left: 20.27,
        top: 4.02,
        rotate: false,
    },
    {
        uri: require('./ElbowTest/Body.png'),
        name: 'Body',
        width: 1564,
        height: 1257,
        left: 0,
        top: 0,
        rotate: false,
    },
    {
        uri: require('./ElbowTest/Arm.png'),
        name: 'Arm',
        width: 1321,
        height: 1319,
        left: 15.54,
        top: 0,
        rotate: true,
    },
]