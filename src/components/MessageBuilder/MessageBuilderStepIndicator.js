import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { palette } from '../../styles/styles';

const labels = ["What", "To", "When"];
const icons = ["envelope", "user", "hourglass-half"];

export const MessageBuilderStepIndicator = ({ position=0, onChange = (position) => {} }) => {

  const renderStepIcon = ({position, stepStatus}) => (
    <Icon name={icons[position]} style={styles.icon[stepStatus]} size={stepStatus === 'current' ? 14 : 10} />
  )

  return (
    <StepIndicator
      customStyles={styles.stepIndicator}
      currentPosition={position}
      onPress={onChange}
      labels={labels}
      stepCount={3}
      renderStepIndicator={renderStepIcon}
    />
  )
}

const styles = {
  stepIndicator: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: palette.purple,
    stepIndicatorLabelCurrentColor: palette.purple,
    currentStepLabelColor: palette.gray,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorCurrentColor: palette.white,
    stepStrokeWidth: 3,
    stepIndicatorLabelFinishedColor: palette.white,
    stepStrokeFinishedColor: palette.lightblue,
    separatorFinishedColor: palette.lightblue,
    stepIndicatorFinishedColor: palette.lightblue,
    stepIndicatorUnFinishedColor: palette.white,
    stepStrokeUnFinishedColor: palette.pink,
    separatorUnFinishedColor: palette.pink,
    stepIndicatorLabelUnFinishedColor: palette.gray,
    stepIndicatorLabelFontSize: 13,
    labelColor: '#999999',
    labelSize: 13,
  },
  icon: {
    current: {
      color: palette.purple,
    },
    unfinished: {
      color: palette.gray,
    },
    finished: {
      color: palette.white,
    }
  }
}