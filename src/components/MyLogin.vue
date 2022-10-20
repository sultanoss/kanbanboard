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
              <div class="card-body p-5 text-center">
                <h3 class="mb-3">Sign in</h3>

                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-evenly mb-3 p-0" style="font-size:14px">
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
                  <a href="" class="text-decoration-none" style="color:#29ABE2">Forgot my password</a>
                </div>
                <div class="login-btn d-flex justify-content-center mb-3">
                  <button
                    class="btn btn-dark btn-sm m-1"
                    type="submit"
                    style="width: 130px"
                  >
                    Login
                  </button>
                  <RouterLink to="/main"
                    type="button"
                    class="guest btn btn-sm btn-outline-dark m-1"
                    style="width: 130px"
                  >
                    Guest Login
                  </RouterLink>
                </div>
                <div class="signup">
                  <span>Not a Join user?</span>
                  <a class="text-black-50 fw-bold text-decoration-none"> Sign up </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.guest{
  &:hover{
    background-color:unset;
    color: #29ABE2;
   border-color: #29ABE2;
  }
}

.signup{
  a{
    cursor: pointer;
    &:hover{
      color: #29ABE2 !important;
    }
  }
}
</style>
