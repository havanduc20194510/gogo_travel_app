import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';

export default function DialogError({ visible, setVisible, labelCancel, labelOk, title, description }) {
    // const [visible, setVisible] = useState(true);

    const showDialog = () => {
        setVisible(true);
    };

    const handelCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Dialog.Container visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                <Dialog.Button label={labelCancel} onPress={handelCancel} />
                <Dialog.Button label={labelOk} onPress={handleOk} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
});
