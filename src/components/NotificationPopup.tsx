import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Animated } from "react-native";
import { onRemoteNotification } from "../services/WebSocketServer";
import { onLocalNotification } from "../services/LocalNotificationManager";

const NotificationPopup = () => {
  const [notification, setNotification] = useState<any>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    onLocalNotification(setNotification);
    onRemoteNotification(setNotification);
  }, []);

  if (!notification) return null;

  const handlePress = () => {
    if (notification.actionLink) {
      Linking.openURL(notification.actionLink).catch((err) => console.error("Failed to open link:", err));
    }
    setNotification(null);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {notification.image && <Image source={{ uri: notification.image }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={{ color: "blue", fontWeight: "bold" }}>Open</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    marginLeft: 10,
  },
});

export default NotificationPopup;
