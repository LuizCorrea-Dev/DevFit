import React from 'react';
import { Modal, Platform } from 'react-native';
import styled from 'styled-components/native';

const ModalBoxArea = styled.KeyboardAvoidingView`
    flex:1;
    background-color:rgba(0, 0, 0, 0.5);
    justify-content:center;
    align-items:center;
`;
const ModalBox = styled.View`
    width:90%;
    padding:20px;
    background-color:#FFF;
`;
const ModalClose = styled.TouchableHighlight`
    height:40px;
    align-self:flex-end;
`;
const CloseText = styled.Text`
    font-size:25px;
`;
const ModalBody = styled.View``;

export default (props) => {
    return (
        <Modal visible={props.visible} transparent={true} animationType="fade">
            <ModalBoxArea behavior={Platform.OS=='ios'?'padding':null}>
                <ModalBox>
                    <ModalClose onPress={props.closeAction} underlayColor="transparent">
                        <CloseText>X</CloseText>
                    </ModalClose>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </ModalBoxArea>
        </Modal>
    );
}