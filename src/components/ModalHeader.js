import React from 'react';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { palette } from "./../styles/styles";
import { View, Text, TouchableOpacity } from "react-native";

export const ModalHeader = ({ title, navigation }) => {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.dispatch({ ...CommonActions.goBack() } )}>
        <Icon name="times" style={styles.icon} size={15} />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  closeIcon: {
    width: 24,
    height: 24,
    backgroundColor: palette.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  icon: {
    color: palette.white,
  }
}

