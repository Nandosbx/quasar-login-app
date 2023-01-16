<template>
  <div class="q-pa-md fixed-center">
    <q-card class="login-card">
      <q-card-section>
        <p class="q-pb-md text-center">Login</p>
        <q-form
          @submit.prevent="handleLogin"
          class="q-gutter-md justify-center items-center"
        >
          <q-input
            outlined
            v-model="username"
            label="username"
            hint="Username"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            label="password"
            v-model="password"
            outlined
            :type="isPwd ? 'password' : 'text'"
            hint="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="col">
            <div class="row q-mb-md justify-center">
              <q-btn
                class="full-width"
                label="Login"
                type="submit"
                color="primary"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                class="full-width"
                exact
                to="/register"
                label="Register"
                color="secondary"
              />
              <!-- <q-btn                
                class="full-width"
                @click="handleLogout"
                label="Logout"
                type="submit"
                color="secondary"
              /> -->
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
//import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { server } from '../boot/axios';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../stores/example-store';
import { disconnect } from 'process';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    //const $q = useQuasar()
    let router = useRouter();
    let logged = useStore();
    let disconnected = useStore();
    let username = ref('');
    let password = ref('');

    return {
      username,
      password,
      isPwd: ref(true),

      async handleLogin() {
        let response = await server.post('login', {
          username: username.value,
          password: password.value,
        });

        router.push('/');

        logged.$patch((state) => {
          state.isLogged = true;
        });

        disconnected.$patch((state) => {
          state.isDisconnected = false;
        });

        console.log(logged.isLogged, disconnected.isDisconnected);
      },

      async handleLogout() {
        await server.delete('logout');
        logged.$patch((state) => {
          state.isLogged = false;
        });

        disconnected.$patch((state) => {
          state.isDisconnected = true;
        });

        console.log(logged.isLogged, disconnected.isDisconnected);
      },
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
  max-width: 400px
</style>
