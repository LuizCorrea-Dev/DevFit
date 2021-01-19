import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { addProgress, setLastWorkout } from '../actions/userActions';
import ExerciseItem from '../components/ExerciseItem';

const PageContainer = styled.ImageBackground`
    flex:1;
    align-items:center;
    background-color:#000;
`;
const SafeArea = styled.SafeAreaView`
    flex:1;
    width:100%;
    align-items:center;
    background-color:rgba(0, 20, 30, 0.9);
`;
const WorkoutHeader = styled.View`
    flex-direction:row;
    width:90%;
    align-items:center;
    height:70px;
`;
const WorkoutTitle = styled.Text`
    flex:1;
    color:#FFF;
    font-size:20px;
`;
const WorkoutClose = styled.TouchableHighlight`
    width:50px;
    height:50px;
    justify-content:center;
    align-items:center;
`;
const WorkoutCloseText = styled.Text`
    font-weight:bold;
    font-size:22px;
    color:#FFF;
`;
const WorkoutList = styled.FlatList`
    width:90%;
    flex:1;
`;

const Page = (props) => {
    let workout = props.navigation.state.params.workout;

    const [exercises, setExercises] = useState(workout.exercises);

    useEffect(()=>{
        let newExercises = [...exercises];
        newExercises.map(i=>i.done=false);
        setExercises(newExercises);
    }, []);

    const checkAction = (item, index) => {
        let newExercises = [...exercises];
        if(!item.done) {
            newExercises[index].done = true;
        } else {
            newExercises[index].done = false;
        }
        setExercises(newExercises);

        checkWorkout();
    }

    const checkWorkout = () => {
        if(exercises.every(i=>i.done)) {
            let today = new Date();
            let thisYear = today.getFullYear();
            let thisMonth = today.getMonth() + 1;
            let thisDay = today.getDate();
            thisMonth = (thisMonth < 10)?'0'+thisMonth:thisMonth;
            thisDay = (thisDay < 10)?'0'+thisDay:thisDay;
            let thisFormated = `${thisYear}-${thisMonth}-${thisDay}`;

            props.addProgress(thisFormated);
            props.setLastWorkout(workout.id);
            alert("PARABÉNS! VOCÊ FINALIZOU!");

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AppTab' })],
            });
            global.mainstack.dispatch(resetAction);
        }
    }

    return (
        <PageContainer source={require('../assets/fitness.jpg')}>
            <StatusBar barStyle="light-content" />
            <SafeArea>
                <WorkoutHeader>
                    <WorkoutTitle>{workout.name}</WorkoutTitle>
                    <WorkoutClose onPress={()=>props.navigation.goBack()}>
                        <WorkoutCloseText>X</WorkoutCloseText>
                    </WorkoutClose>
                </WorkoutHeader>
                <WorkoutList
                    data={exercises}
                    renderItem={({item, index})=>
                        <ExerciseItem
                            index={index}
                            data={item}
                            checkAction={()=>checkAction(item, index)}
                        />
                    }
                    keyExtractor={item=>item.id.toString()}
                />
            </SafeArea>
        </PageContainer>
    );
};

Page.navigationOptions = ({navigation}) => {
    return {
        header:null
    };
}


const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addProgress:(date)=>addProgress(date, dispatch),
        setLastWorkout:(id)=>setLastWorkout(id, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);