import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AnimatedMeshGradient } from "../src/components/organisms/mesh-gradient";

export default function MeshGradientExample() {
  return (
    <View style={styles.container}>
      <AnimatedMeshGradient
        speed={0.8}
        noise={0.15}
        blur={0.6}
        contrast={1.0}
        style={StyleSheet.absoluteFill}
      />

      {/* Optional: Content overlay */}
      <View style={styles.content}>
        <Text style={styles.title}>Mesh Gradient</Text>
        <Text style={styles.subtitle}>Smooth animated background</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
