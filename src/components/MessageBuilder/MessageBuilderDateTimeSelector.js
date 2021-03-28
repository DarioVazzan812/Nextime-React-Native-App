import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import momentTz from 'moment-timezone';
import { View, Text, Pressable } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { palette } from '../../styles/styles';
import * as Localize from "react-native-localize";

export const MessageBuilderDateTimeSelector = ({ setDatetime, onSubmit }) => {
  const [datePicker, setDatePicker] = useState(false)
  const [timePicker, setTimePicker] = useState(false)

  const [date, setDate] = useState(new Date())
  useEffect(() => { 
    let localized = momentTz(date, Localize.getTimeZone())
    setDatetime(localized.format());
  }, [date])

  return (
    <View style={styles.container}>
      <Overlay isVisible={datePicker} onBackdropPress={() => setDatePicker(false)}>
        <>
          <DatePicker
            mode="date"
            date={date}
            minimumDate={new Date()}
            onDateChange={setDate}
          />
          <Button
            title="Done"
            onPress={() => setDatePicker(false)}
            buttonStyle={styles.confirmButton}
          />
        </>
      </Overlay>
      
      <Overlay isVisible={timePicker} onBackdropPress={() => setTimePicker(false)}>
        <>
          <DatePicker
            mode="time"
            date={date}
            minimumDate={new Date()}
            onDateChange={setDate}
          />
          <Button
            title="Done"
            onPress={() => setTimePicker(false)}
            buttonStyle={styles.confirmButton}
          />
        </>
      </Overlay>

      <View style={styles.dateWrapper}>
        <Pressable onPress={() => setDatePicker(true)}><Moment style={styles.dateText} date={date} element={Text} format="MMM D YYYY"/></Pressable>
        <Pressable onPress={() => setTimePicker(true)}><Moment style={styles.timeText} date={date} element={Text} format="HH:mm"/></Pressable>
        <Button
          title="Send"
          onPress={onSubmit}
          buttonStyle={styles.submitButton}
        />
      </View>
    </View>
  )
}

const styles = { 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    alignSelf: "flex-end",
    backgroundColor: palette.pink,
    width: 120,
    borderRadius: 5,
    marginTop: 20,
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.pink,
    borderRadius: 10,
    overflow: "hidden",
  },
  timeText: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: palette.pink,
  },
  dateText: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: palette.pink,
    borderRightWidth: 1,
    borderColor: palette.pink,
  },
  submitButton: {
    backgroundColor: palette.pink,
  },
}
