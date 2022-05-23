import React, { useEffect, useState } from "react";
import {
    Image, StyleSheet, View, LayoutChangeEvent, Pressable
} from "react-native";
import { useRecoilState } from "recoil";
import { Parts } from "../data/humans";
import { symptomsState } from "../recoil/symptom";
import { colors } from "../styles/globalStyles";

const HumanPart = ({ uri, name, direction, width, height, left, top, disabled }: Parts) => {
    const [selected, setSelected] = useState(false);
    const [symptoms, setSymptoms] = useRecoilState(symptomsState);

    const cmp = (x: Pick<Parts, "direction" | "name">) => x.name === name && x.direction === direction

    const onPress = () => {
        setSelected(!selected);
        
        if (symptoms.some(cmp)) {
            console.log(`${name} ${direction}`);
            setSymptoms(symptoms.filter(symptom => !cmp(symptom)))
            // setSymptoms(symptoms.filter((symptom) => (symptom.name !== name) && (symptom.direction !== direction)));
        } else {
            setSymptoms([
                ...symptoms,
                { name: name, direction: direction}
            ]);
        }
    };

    useEffect(() => {
        if (symptoms.some(cmp)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [symptoms]);

    return (
        <Pressable onPress={onPress}
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
            }}
            disabled={disabled ? true : false}>
            <Image source={uri} style={[{
                width: width,
                height: height,
            }, selected && !disabled ? {
                tintColor: colors.selected
            } : {}]} />
        </Pressable>
    )
};

interface HumanProps {
    humans: Parts[],
    baseWidth: number,
    baseHeight: number
}

const Human = ({humans, baseWidth, baseHeight} : HumanProps) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });
    const ratio = baseWidth / baseHeight;

    const getSize = (old: number) => old * size.width / baseWidth

    return (
        <View onLayout={(e: LayoutChangeEvent) => setSize({ ...e.nativeEvent.layout })} style={[styles.container, {
            width: size.height * ratio
        }]}>
            {humans.map((data, i) => (
                <HumanPart key={i} {...{ ...data, width: getSize(data.width), height: getSize(data.height) }} />
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
    },
    img: {
        position: 'absolute',
    }
});

export default Human;