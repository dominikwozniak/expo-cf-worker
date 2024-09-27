import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AnimatedDotsProps {
  dotsCount: number;
  currentIndex: number;
}

export function AnimatedDots({ dotsCount, currentIndex }: AnimatedDotsProps) {
  const dotSize = 8;
  const dotSpacing = 16; // 8 (dot size) + 8 (margin)
  const activeDotWidth = 16;
  const containerWidth = dotsCount * dotSpacing - (dotSpacing - dotSize);

  const animatedIndex = useSharedValue(currentIndex);

  useEffect(() => {
    animatedIndex.value = withSpring(currentIndex);
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedIndex.value * dotSpacing }],
    width: withSpring(activeDotWidth),
  }));

  return (
    <View className="mt-4 flex-row justify-center">
      <View className="relative h-2" style={{ width: containerWidth }}>
        <Animated.View
          className="absolute top-0 z-10 h-2 rounded-full bg-primary"
          style={[
            animatedStyle,
            {
              left: -(activeDotWidth - dotSize) / 2,
            },
          ]}
        />
        {Array.from({ length: dotsCount }).map((_, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              left: index * dotSpacing,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: "rgb(209 213 219)",
              opacity: 0.5,
            }}
          />
        ))}
      </View>
    </View>
  );
}
