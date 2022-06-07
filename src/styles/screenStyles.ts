import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topPrompt: {
        flex: 2,
    },
    humanContainer: {
        flex: 8, 
        alignItems: 'center',
        
    },
    midPrompt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});