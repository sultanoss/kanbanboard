<template>
  <div
    class="login-container vh-100 d-flex flex-column"
    style="background-color: #f7f7f7; overflow: auto"
  >
    <section class="h-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem">
              <form
                @submit.prevent="signup"
                class="card-body p-5 text-center d-flex flex-column"
                style="position: relative"
              >
                <RouterLink to="/"
                  ><i class="back-arrow bi bi-arrow-left-short"></i
                ></RouterLink>

                <h3 class="mb-3">Sign up</h3>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    required
                    v-model="user.userName"
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                    v-model="user.email"
                  />
                  <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    v-model="user.password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="login-btn d-flex justify-content-center mb-3">
                  <button
                    class="btn btn-dark btn-sm m-1"
                    type="submit"
                    style="width: 130px"
                  >
                    Sign up
                  </button>
                </div>
                <div class="spinner mb-3" v-if="isLoading">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </div>
                <div class="error">
                  <p v-if="!!error">{{ error }}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  data() {
    return {
      user: {
        userName: "",
        email: "",
        password: "",
      },
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async signup() {
      this.isLoading = true;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.userName,
            })
            .then(() => {
              db.collection("users").add({
                userName: this.userName,
              });
              this.isLoading = false;
              this.$router.push("/");
            });
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
input:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

.error p {
  color: hsl(11deg 80% 45%);
  font-weight: 500;
}

.back-arrow {
  position: absolute;
  top: 0;
  left: 16px;
  font-size: 2.5rem;
  color: #29abe2;
  cursor: pointer;
}
h3 {
  font-size: 32px;
  font-weight: 700;
}
</style>
