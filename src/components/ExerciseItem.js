import React from 'react';
import styled from 'styled-components/native';
import useMuscleImage from './useMuscleImage';

const ExerciseItemArea = styled.View`
    height:50px;
    margin-bottom:10px;
    flex-direction:row;
`;
const ExerciseMuscleArea = styled.View`
    width:50px;
    height:50px;
    background-color:#ffcc98;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;
const ExerciseMuscleImage = styled.Image`
    width:35px;
    height:35px;
`;
const ExerciseInfo = styled.View`
    flex:1;
    margin-left:10px;
    flex-direction:column;
    justify-content:center;
`;
const ExerciseName = styled.Text`
    font-size:15px;
    color:#FFF;
`;
const ExerciseDetails = styled.Text`
    font-size:12px;
    color:#999;
`;

const ExerciseCount = styled.View`
    width:25px;
    justify-content:center;
`;
const ExerciseCountText = styled.Text`
    font-size:17px;
    color:#FFF;
`;

const ExerciseCheck = styled.TouchableHighlight`
    width:60px;
    justify-content:center;
    align-items:center;
`;

const ExerciseUndone = styled.View`
    width:40px;
    height:40px;
    border:5px solid #FFF;
    border-radius:20px;
`;
const ExerciseDone = styled.Image`
    width:40px;
    height:40px;
`;

export default (props) => {
    return (
        <ExerciseItemArea>
            <>
            <ExerciseCount>
                <ExerciseCountText>{props.index+1}.</ExerciseCountText>
            </ExerciseCount>
            <ExerciseMuscleArea>
                <ExerciseMuscleImage source={useMuscleImage(props.data.muscle)} />
            </ExerciseMuscleArea>
            <ExerciseInfo>
                <ExerciseName>{props.data.name}</ExerciseName>
                <ExerciseDetails>
                    {`${props.data.sets} séries de ${props.data.reps} repetições ${props.data.load?` || carga de  ${props.data.load} kg`:''}`}
                </ExerciseDetails>
            </ExerciseInfo>
            <ExerciseCheck onPress={props.checkAction} underlayColor="transparent">
                {props.data.done ? <ExerciseDone source={require('../assets/check-white.png')} /> : <ExerciseUndone></ExerciseUndone>}
            </ExerciseCheck>
            </>
        </ExerciseItemArea>
    );
}