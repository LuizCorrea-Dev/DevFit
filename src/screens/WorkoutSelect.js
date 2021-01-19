import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Workout from '../components/Workout';

const PageContainer = styled.SafeAreaView`
    flex:1;
    margin:20px;
`;
const Title = styled.Text`
    margin-bottom:10px;
`;
const WorkoutList = styled.FlatList`
`;

const Page = (props) => {
    let lastWorkout = false;
    if(props.lastWorkout) {
        lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout);
    }

    const goWorkout = (workout) => {
        props.navigation.navigate('WorkoutChecklist', {workout});
    }

    return (
        <PageContainer>
            {lastWorkout &&
                <>
                <Title>Seu último treino foi:</Title>
                <Workout data={lastWorkout} />
                </>
            }
            <Title>Escolha seu treino de hoje:</Title>
            <WorkoutList
                data={props.myWorkouts}

                renderItem={({item})=>
                    <Workout 
                        data={item} 
                        goAction={()=>goWorkout(item)} 
                    />}
                    keyExtractor={item=>item.id}
            />
        </PageContainer>
    );
};

Page.navigationOptions = ({navigation}) => {

    const backAction = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppTab' })
            ],
        });
        global.mainstack.dispatch(resetAction);
    }

    return {
        title:'Escolha seu treino',
        headerLeft:(<HeaderBackButton onPress={backAction}/>)
    };
}


const mapStateToProps = (state) => {
    return {
      myWorkouts:state.userReducer.myWorkouts,
      lastWorkout:state.userReducer.lastWorkout
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setWorkoutDays:(workoutDays)=> setWorkoutDays(workoutDays, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);