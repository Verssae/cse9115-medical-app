import { Selectable} from '../data/selectables';

export type RootStackParamList = {
    Start: undefined;
    Overview: {
        faced: boolean
    };
    Detail: {
        part: string
    };
    ElbowTest: undefined;
    Duration: {
        test?: string
    };
    Pain: {
        test?: string
    };
    Stability: undefined;
    ElbowFunction: {
        data: Selectable,
    };
    EndScreen: undefined;
    Select: {
        data: Selectable,
    };
    
}