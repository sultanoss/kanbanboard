<template>
  <div
    class="login-container vh-100 d-flex flex-column"
    style="background-color: #f7f7f7"
  >
    <section class="h-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem">
              <form @submit.prevent="login" class="card-body p-5 text-center">
                <h3 class="mb-3">Sign in</h3>

                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                    v-model="email"
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
                    v-model="password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <!-- Checkbox -->
                <div
                  class="form-check d-flex justify-content-evenly mb-3 p-0"
                  style="font-size: 14px"
                >
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label class="form-check-label" for="form1Example3">
                      Remember password
                    </label>
                  </div>
                  <a href="" class="text-decoration-none" style="color: #29abe2"
                    >Forgot my password</a
                  >
                </div>
                <div class="login-btn d-flex justify-content-center mb-3">
                  <button
                    class="btn btn-dark btn-sm m-1"
                    type="submit"
                    style="width: 130px"
                  >
                    Login
                  </button>
                  <RouterLink
                    to="/main/summary"
                    type="button"
                    class="guest btn btn-sm btn-outline-dark m-1"
                    style="width: 130px"
                  >
                    Guest Login
                  </RouterLink>
                </div>
                <div class="signup mb-3">
                  <span>Not a Join user?</span>
                  <RouterLink
                    to="/signup"
                    class="text-black-50 fw-bold text-decoration-none"
                  >
                    Sign up
                  </RouterLink>
                </div>
                <div class="spinner" v-if="isLoading">
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
import firebase from "firebase/compat/app";
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async login() {
      this.isLoading = true;
      // try {
      //   const response = await fetch(
      //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWOZKferZ4TiSnQM-b3jvKBl-qTFm0o9w",
      //     {
      //       method: "POST",
      //       body: JSON.stringify({
      //         email: this.email,
      //         password: this.password,
      //         returnSecureToken: true,
      //       }),
      //     }
      //   );

      //   const responseData = await response.json();
      //   if (!response.ok) {
      //     console.log(responseData);
      //     const error = new Error(
      //       responseData.message || "Faild to authenticate"
      //     );
      //     throw error;
      //   }
      //   console.log(responseData);
      //   this.$router.push("/main/summary");
      // } catch (err) {
      //   this.error = err.message || "Failed to authenticate, try later.";
      // }
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.$router.push("/main/summary");
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.guest {
  &:hover {
    background-color: unset;
    color: #29abe2;
    border-color: #29abe2;
  }
}

.signup {
  a {
    cursor: pointer;
    &:hover {
      color: #29abe2 !important;
    }
  }
}

input:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

.error p {
  color: hsl(11deg 80% 45%);
  font-weight: 500;
}

h3 {
  font-size: 32px;
  font-weight: 700;
}
</style>
