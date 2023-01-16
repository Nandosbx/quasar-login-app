import { defineStore } from 'pinia';

export const useStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    isDisconnected: true,
    greeting: 'Welcome, sign in to your account',
  }),
  getters: {
    setIsLogged: (state) => state.isLogged,
    setIsDisconnect: (state) => state.isDisconnected,
    setIsGreeting: (state) => state.greeting,
  },
});
