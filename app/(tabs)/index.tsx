import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import SwipeTab from '@/components/ui/swipeTab';
import { useEffect, useState } from 'react';


type WeekDay = {
  day: string;
  date: Date;
  isToday: boolean;
};


export default function HomeScreen() {
  const [calendar, setCalendar] = useState<{
    month: string;
    year: number;
    weekDays: WeekDay[];
  }>({
    month: '',
    year: 0,
    weekDays: [],
  });

  // calender fucntions
  function getCurrentMonthYear() {
    const now = new Date();
    return {
      month: now.toLocaleString('default', { month: 'long' }),
      year: now.getFullYear(),
    };
  }

  function getCurrentWeekDays(): WeekDay[] {
    const today = new Date();
    const start = new Date(today);
    const currentDay = today.getDay();
    start.setDate(today.getDate() - currentDay);

    const days: WeekDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      days.push({
        day: date.toLocaleString('default', { weekday: 'short' }),
        date,
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }

    return days;
  }

  useEffect(() => {
    const { month, year } = getCurrentMonthYear();
    const weekDays = getCurrentWeekDays();

    setCalendar({ month, year, weekDays });
  }, []);


  return (
    <ParallaxScrollView>
      <View style={styles.topTab}>
        <TouchableOpacity>
          <ThemedView style={styles.profile} lightColor='#dde4fc'>
            <ThemedText style={styles.profileText} type="defaultSemiBold" lightColor='#4563EA' >BA</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedView style={styles.addButton} lightColor='#eeeef1'>
            <IconSymbol name='plus' size={26} color={''} />
          </ThemedView>
        </TouchableOpacity>
      </View>
      <View style={styles.calenderView}>
        <ThemedText style={styles.yearText} type='defaultSemiBold' lightColor='#a1a4b3' >
          {calendar.month} {calendar.weekDays.find(day => day.isToday)?.date.getDate()}, {calendar.year}
        </ThemedText>
        <ThemedText style={styles.reminderText} type='defaultSemiBold' >
          Today  reminders
        </ThemedText>
        <View style={styles.weekDaysView}>
          {calendar.weekDays.map((day) => (
            <View key={day.date.toDateString()} style={styles.daysView}>
              <ThemedText type='default' lightColor='#a1a4b3' style={styles.daysText}>
                {day.day}
              </ThemedText>
              <ThemedView style={styles.dateView} lightColor={day.isToday ? '#4563EA' : ''}>
                <ThemedText style={styles.dateText} type='defaultSemiBold' lightColor={day.isToday ? '#ffffff' : '#000'}>
                  {day.date.getDate()}
                </ThemedText>
              </ThemedView>
            </View>
          ))}
        </View>
      </View>
      <SwipeTab/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,

  },
  profile: {
    borderRadius: 999,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 17,
  },
  addButton: {
    width: 45,
    height: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calenderView: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  yearText: {
    fontSize: 20,
  },
  reminderText: {
    fontSize: 28,
    paddingTop: 12,
  },
  weekDaysView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  daysView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  daysText: {
    fontSize: 20,
    fontWeight: '500',
  },
  dateView: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 20,
  }
});
