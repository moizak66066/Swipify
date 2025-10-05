import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from './Theme/colors';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const H_PADDING = 12;
const CARD_W = SCREEN_W - H_PADDING * 2;
const CARD_H = SCREEN_H * 0.73; // increased height
const SWIPE_THRESHOLD = CARD_W * 0.22;

type CardItem = { id: string };
const SAMPLE: CardItem[] = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

export default function SwipingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const nextScale = useSharedValue(0.96);
  const nextTranslateY = useSharedValue(12);

  const data = useMemo(() => SAMPLE, []);

  const onSwiped = useCallback((dir: 'left' | 'right') => {
    setIndex((i) => (i + 1) % data.length);
    translateX.value = 0;
    translateY.value = 0;
    rotateZ.value = 0;
    nextScale.value = 0.96;
    nextTranslateY.value = 12;
  }, [data.length]);

  const pan = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
      rotateZ.value = (translateX.value / CARD_W) * 12;
      const progress = Math.min(1, Math.abs(translateX.value) / SWIPE_THRESHOLD);
      nextScale.value = 0.96 + 0.04 * progress;
      nextTranslateY.value = 12 - 12 * progress;
    })
    .onEnd(() => {
      const shouldLeft = translateX.value < -SWIPE_THRESHOLD;
      const shouldRight = translateX.value > SWIPE_THRESHOLD;
      if (shouldLeft || shouldRight) {
        const toX = (shouldRight ? SCREEN_W : -SCREEN_W) * 1.2;
        translateX.value = withTiming(toX, { duration: 220 }, () =>
          runOnJS(onSwiped)(shouldRight ? 'right' : 'left')
        );
        translateY.value = withTiming(translateY.value * 0.5, { duration: 220 });
        rotateZ.value = withTiming((shouldRight ? 1 : -1) * 18, { duration: 220 });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotateZ.value = withSpring(0);
        nextScale.value = withSpring(0.96);
        nextTranslateY.value = withSpring(12);
      }
    });

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));
  const nextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: nextTranslateY.value }, { scale: nextScale.value }],
  }));

  const top = data[index];
  const next = data[(index + 1) % data.length];

  return (
    <LinearGradient colors={[COLORS.mochaStart, COLORS.mochaEnd]} style={styles.bg}>
      <SafeAreaView style={styles.safe}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.replace('/home')} style={styles.homeBtn}>
            <Feather name="arrow-left" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.brand}>Swipify</Text>
          <View style={styles.profile}>
            <Text style={styles.profileText}>JD</Text>
          </View>
        </View>
        <View style={styles.divider} />

        {/* Card Stack */}
        <View style={styles.stackWrap}>
          {next && (
            <Animated.View style={[styles.card, styles.cardBorder, nextStyle]}>
              <CardBlank />
            </Animated.View>
          )}
          {top && (
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.card, styles.cardBorder, topStyle]}>
                <CardBlank />
              </Animated.View>
            </GestureDetector>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function CardBlank() {
  return (
    <LinearGradient
      colors={[COLORS.mochaEnd, '#2b1f1a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: H_PADDING },

  topBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  homeBtn: {
    paddingHorizontal: 4,
    transform: [{ translateX: 6 }], // nudge closer to center
  },
  brand: {
    color: COLORS.pink,
    fontSize: 22,
    fontWeight: '700',
  },
  profile: {
    width: 28,
    height: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -6 }], // nudge closer to center
  },
  profileText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.inputBorder,
    opacity: 0.6,
    marginBottom: 6,
  },

  stackWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.inputBg,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
});
