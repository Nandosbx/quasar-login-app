<template>
  <div class="q-pa-md fixed-center">
    <q-card class="login-card">
      <q-card-section>
        <p class="q-pb-md text-center">Register</p>
        <q-form
          @submit.prevent="handleRegister"
          class="q-gutter-md justify-center items-center"
        >
          <q-input
            outlined
            v-model="name"
            label="name"
            hint="name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="email"
            label="email"
            hint="email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

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
                class="btn-fixed-width"
                label="Register"
                type="submit"
                color="primary"
              />
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

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    //const $q = useQuasar()
    let router = useRouter();
    let name = ref('');
    let email = ref('');
    let username = ref('');
    let password = ref('');

    return {
      name,
      email,
      username,
      password,
      isPwd: ref(true),

      async handleRegister() {
        let response = await server.post('register', {
          name: name.value,
          email: email.value,
          username: username.value,
          password: password.value,
        });
        router.push('/login');
        console.log(response);
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
