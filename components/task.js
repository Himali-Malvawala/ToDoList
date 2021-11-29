import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const Task = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.circular}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#D9CAB3",
        borderRadius: 10,
        padding:15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        // marginTop: 10
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    itemText:{
        maxWidth: "80%",
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: "#212121",
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 10
    },
});

export default Task;