import React, { useEffect } from "react";
import { FlatList, SafeAreaView, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import {Button, LargeSingleButton} from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { useRecoilValue } from "recoil";
import { durationState } from "../recoil/states";
import { historyDiagnosis, medicineQuery } from "../data/selectables";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'Select'>;


const SelectScreen = ({ route, navigation }: Props) => {
    
    const { data } = route.params;
    const duration = useRecoilValue(durationState);
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    useEffect(() => {
        speak(data.top);
        
    }, []);

    

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {data.top}
            </Prompt>
        </View>

        <View style={{
            flex: 10,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>
            <FlatList
                data={data.candidates}
                renderItem={({item}) => <LargeSingleButton name={data.name} unit={unit} callback={() => speak(item)}>{item}</LargeSingleButton>}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                {data.bot}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={data.next === "Overview" ? () => navigation.navigate("Overview", { faced : true }) : data.name === '질환 종류' || duration === '아니요' || duration === '' ? () => navigation.push("Select", {
                data:  medicineQuery
            }) : () => navigation.push("Select", {
                data:  historyDiagnosis
            })}>
                다음
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default SelectScreen;