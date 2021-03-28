import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { useQuery } from "@apollo/client";
import { STORAGE_QUERY } from "./../graphql/queries/storage";
import { palette } from '../styles/styles';


export const StorageScreen = () => {
  const maxByteStorage = 5000000000;
  const [usagePercentage, setUsagePercentage] = useState(0);
  const [usage, setUsage] = useState("0B");
  const { data } = useQuery(STORAGE_QUERY, { fetchPolicy: "no-cache" });

  useEffect(() => {
    if(!data) return;
    const bytesUsage = data.storage.used;
    setUsagePercentage(bytesUsage / maxByteStorage);

    if(bytesUsage < 1000) { // Kilobyte
      setUsage(`${(bytesUsage).toFixed(2)}B`);
    } else if (bytesUsage < 1000000) { // Megabyte
      setUsage(`${(bytesUsage / 1000).toFixed(2)}KB`);
    } else if (bytesUsage < 1000000000) { // Gigabyte
      setUsage(`${(bytesUsage / 1000000).toFixed(2)}MB`);
    } else {
      setUsage(`${(bytesUsage / 1000000000).toFixed(2)}GB`);
    }

  }, [data])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Storage Usage</Text>
      <View style={styles.barWrapper}>
        <ProgressBar progress={usagePercentage} width={300} color={palette.pink} />
        <Text style={styles.usageText}>{usage}</Text>
        <Text style={styles.maxUsageText}>5GB</Text>
      </View>
    </View>
  )
}

const styles = {
  screen: {
    alignItems: "center",
    padding: 20,
  },
  title: { 
    fontSize: 23,
    fontWeight: "900",
  },
  barWrapper: {
    position: "relative",
    marginTop: 50,
  },
  usageText: {
    position: "absolute",
    left: 0,
    top: 15,
    fontSize: 17,
  },
  maxUsageText: {
    position: "absolute",
    right: 0,
    top: 15,
    fontSize: 17,
  }

  
}