import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from './Theme/colors';

export default function CreateAccount() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [secure, setSecure] = useState(true);

  return (
    <LinearGradient colors={[COLORS.mochaStart, COLORS.mochaEnd]} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <Text style={styles.logo}>Swipify</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapIcon}>
            <Feather name="mail" size={18} color={COLORS.pinkSoft} style={styles.iconLeft} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              placeholderTextColor={COLORS.placeholder}
              style={[styles.input, styles.inputWithIcon]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapIcon}>
            <Feather name="lock" size={18} color={COLORS.pinkSoft} style={styles.iconLeft} />
            <TextInput
              value={pwd}
              onChangeText={setPwd}
              placeholder="Create Password"
              placeholderTextColor={COLORS.placeholder}
              style={[styles.input, styles.inputWithIcon]}
              secureTextEntry={secure}
            />
            <TouchableOpacity onPress={() => setSecure(s => !s)} style={styles.iconRight}>
              <Feather name={secure ? 'eye' : 'eye-off'} size={18} color={COLORS.pinkSoft} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.primaryBtn} onPress={() => router.replace('/swiping')}>
            <Text style={styles.primaryBtnText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.dividerWrap}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-google" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-apple" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.replace('/login')} style={styles.footerLink}>
            <Text style={styles.footerText}>
              Already a Swiper? <Text style={styles.footerCta}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1, alignItems: 'center' },
  top: { marginTop: 52, alignItems: 'center' },
  logo: { color: COLORS.pink, fontSize: 36, fontFamily: 'serif', fontWeight: '700' },

  form: { marginTop: 24, width: '86%' },

  inputWrap: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  inputWrapIcon: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
    justifyContent: 'center',
  },
  input: { color: COLORS.textPrimary, fontSize: 16 },
  inputWithIcon: { paddingLeft: 40, paddingRight: 44 },
  iconLeft: { position: 'absolute', left: 12, zIndex: 1 },
  iconRight: { position: 'absolute', right: 12, height: '100%', justifyContent: 'center' },

  primaryBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: COLORS.pinkSoft,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryBtnText: { color: COLORS.mochaStart, fontWeight: '700', fontSize: 16 },

  dividerWrap: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: COLORS.inputBorder },
  or: { color: COLORS.pinkSoft, marginHorizontal: 12, fontWeight: '600' },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  socialBtn: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, borderWidth: 1,
  },

  footerLink: { marginTop: 28, alignItems: 'center', paddingBottom: 12 },
  footerText: { color: COLORS.textMuted },
  footerCta: { color: COLORS.pink, fontWeight: '700' },
});
