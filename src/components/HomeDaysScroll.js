import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
    width:100%;
    height:50px;
`;
const DayButton = styled.TouchableHighlight`
    width:${props=>props.width};
    justify-content:center;
    align-items:center;
`;
const DayItem = styled.View`
    width:30px;
    height:30px;
    border-radius:15px;
    background-color:#EEE;
    justify-content:center;
    align-items:center;
`;
const DayText = styled.Text``;

const screenWidth = Math.round(Dimensions.get('window').width);
let dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW) / 2);

const Day = ({day, month, dailyProgress, workoutDays, onPress}) => {
    let bgColor = '#F4F4F4';
    let opacity = 1;

    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let thisDate = new Date(today.getFullYear(), month, day);

    if(workoutDays.includes( thisDate.getDay() )) {

        if(thisDate.getTime() < today.getTime()) {
            let thisYear = thisDate.getFullYear();
            let thisMonth = thisDate.getMonth() + 1;
            let thisDay = thisDate.getDate();
            thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth;
            thisDay = (thisDay<10)?'0'+thisDay:thisDay;
            let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

            if(dailyProgress.includes(dFormated)) {
                bgColor = '#B5FFB8'; // TREINOU
            } else {
                bgColor = '#FFB5B5'; // NÃO TREINOU
            }

        }

    } else {
        opacity = 0.2;
    }

    if(thisDate.getTime() == today.getTime()) {
        bgColor = '#B5EEFF';
        opacity = 1;
    }


    return (
        <DayButton width={dayW} onPress={onPress} underlayColor="transparent">
            <DayItem style={{opacity, backgroundColor:bgColor}}>
                <DayText>{day}</DayText>
            </DayItem>
        </DayButton>
    )
}

export default (props) => {
    const DayRef = useRef();

    const [selectedDay, setSelectedDay] = useState(props.selectedDay);

    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetDay = Math.round(posX / dayW) + 1;
        setSelectedDay(targetDay);
    }

    const scrollToDay = (d) => {
        let posX = (d - 1) * dayW;
        DayRef.current.scrollTo({x:posX, y:0, animated:true});
    }

    useEffect(()=>{
        props.setSelectedDay(selectedDay);
    }, [selectedDay]);

    useEffect(()=>{
        setTimeout(()=>{
            if(props.selectedMonth == new Date().getMonth()) {
                scrollToDay(new Date().getDate());
            } else {
                scrollToDay(1);
            }
        }, 10);        
    }, [props.selectedMonth]);

    let days = [];
    let daysInMonth = new Date(new Date().getFullYear(), (props.selectedMonth+1), 0).getDate();
    for(let i=1;i<=daysInMonth;i++) {
        days.push(i);
    }

    return (
        <DaysScroll
            ref={DayRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={dayW}
            contentContainerStyle={{paddingLeft:offsetW, paddingRight:offsetW}}
            onMomentumScrollEnd={handleScrollEnd}
        >
            {days.map((d, k)=>(
                <Day
                    key={k}
                    day={d}
                    month={props.selectedMonth}
                    dailyProgress={props.dailyProgress}
                    workoutDays={props.workoutDays}
                    onPress={()=>scrollToDay(d)}
                />
            ))}
        </DaysScroll>
    );
}
