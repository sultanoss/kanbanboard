<template>
  <div class="contacts-container d-flex">
    <div class="contacts">
      <div class="users" v-for="user in users" :key="user.firstName">
        <span>{{ user.firstName + " " + user.lastName }}</span>
        <span>{{ user.email }}</span>
        <span>Tel: {{ user.phoneNummber }}</span>
      </div>
    </div>
    <div class="contacts-content">
      <div
        class="summary-header d-flex justify-content-center align-items-center"
      >
        <h2
          style="
            margin: 0px;
            paddind-left: 50px;
            padding-right: 32px;
            border-right: 2px solid #29abe2;
            font-weight: 700;
          "
        >
          Contacts
        </h2>
        <span style="font-weight: 400; font-size: 18px; padding-left: 32px"
          >Better with a team</span
        >
      </div>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-dark btn-sm m-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style="width: 130px; align-self: end"
      >
        New contact
      </button>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Contact</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="background-color: rgb(247, 247, 247)">
          <div class="card shadow-2-strong" style="border-radius: 1rem">
            <form
              class="card-body p-5 text-center d-flex flex-column"
              style="position: relative"
            >
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  required
                  v-model="firstName"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Lastname"
                  required
                  v-model="lastName"
                />
                <label for="floatingInput">Lastname</label>
              </div>
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
                  type="text"
                  class="form-control"
                  placeholder="Phone"
                  required
                  v-model="phoneNummber"
                />
                <label for="floatingPassword">Phone</label>
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
        <div class="modal-footer">
          <button
            class="btn btn-dark btn-sm m-1"
            type="button"
            style="width: 130px"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            @click="createUser"
            data-bs-dismiss="modal"
            class="btn btn-dark btn-sm m-1"
            type="submit"
            style="width: 130px"
          >
            Create contact
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.contacts-container {
  height: calc(100vh - 50px);
  background-color: rgb(247, 247, 247);
}

.contacts {
  width: 20%;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.users{
   display: flex;
   flex-direction: column;
}

.contacts-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
}
</style>

<script>
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { query, collection, getDocs } from "firebase/firestore";
export default {
  created() {
    this.getUsers();
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNummber: "",
      users: [],
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async createUser() {
      await db.collection("users").add({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNummber: this.phoneNummber,
      });
      // await setDoc(doc(db, "users", "contacts"), {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   email: this.email,
      //   phoneNummber: this.phoneNummber,
      // });
    },

    async getUsers() {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, "users")));
      // add each doc to 'countries' array
      querySnap.forEach((doc) => {
        this.users.push(doc.data());
      });
      console.log(this.users);
    },
  },
};
</script>
