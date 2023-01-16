<template>
  <div class="q-pa-md fixed-center">
    <div class="col q-mb-md justify-left">
      {{ greet.greeting }}
    </div>
    <div class="col q-mb-md justify-right">
      <q-btn
        v-if="disconnected.isDisconnected"
        class="full-width"
        exact
        to="/login"
        label="Login"
        color="primary"
      />
      <q-btn
        v-else
        @click="handleLogout()"
        class="full-width"
        exact
        to="/login"
        label="Logout"
        color="accent"
      />
    </div>
  </div>
</template>

<script lang="ts">
//import { useQuasar } from 'quasar';
import { server } from '../boot/axios';
import { defineComponent, onMounted } from 'vue';
import { useStore } from '../stores/example-store';
import { QBtn } from 'quasar';
//import { useRouter } from 'vue-router'

let logged = useStore();
let disconnected = useStore();
let greet = useStore();

async function handleLogout() {
  await server.delete('logout');
  logged.$patch((state) => {
    state.isLogged = false;
  });

  disconnected.$patch((state) => {
    state.isDisconnected = true;
  });

  console.log(logged, disconnected);
}

export default defineComponent({
  name: 'IndexPage',

  setup() {
    //let router = useRouter()
    onMounted(async () => {
      let response = await server.get('getme');

      let info = response.data;
      if (logged.isLogged === true && disconnected.isDisconnected === false) {
        let res = greet.$patch({ greeting: `Welcome, ${info.data.name}` });
        console.log('Is logged', res);
        console.log(logged.isLogged, disconnected.isDisconnected);
      }
    });
    return {
      logged,
      disconnected,
      greet,
      handleLogout,
    };
  },
});
</script>

<style lang="sass">
.login-card
  flex: 1
  justify-content: center
  align-items: center
  max-width: 400px

.btn-fixed-width
  width: 400px
  max-width: 200px
</style>
