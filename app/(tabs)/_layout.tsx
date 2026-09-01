import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff', 
        tabBarStyle: { backgroundColor: '#2881ee' }, 
      }}
    >
      
      <Tabs.Screen
        name="index"
        options={{
        title:"Planejador de Viagens",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      
      <Tabs.Screen
        name="Gerenciamento"
        options={{
          title: 'Detalhes das Viagens',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "briefcase-outline" : 'briefcase-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}