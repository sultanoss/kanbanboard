<template>
  <div class="contacts-container d-flex">
    <div class="contacts">
      <div
        class="users"
        v-for="user in users"
        :key="user.id"
        @click="getUser(user.id)"
      >
        <div
          v-bind:style="{ backgroundColor: getRandomColor() }"
          class="avatar-icon"
        >
          <span>{{ getInitials(user.firstName + user.lastName) }}</span>
        </div>
        <div class="user-infos">
          <span style="font-weight: 500; font-size: 14px">{{
            user.firstName + " " + user.lastName
          }}</span>
          <span style="font-size: 12px; color: #29abe2">{{ user.email }}</span>
        </div>
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
      <div class="selected-user">
        <div
          v-if="Object.keys(selectedUser).length === 0"
          style="font-size: 24px; font-weight: 500"
        >
          <p>No selected Contact</p>
        </div>
        <div class="users" v-if="Object.keys(selectedUser).length > 0">
          <div
            v-bind:style="{ backgroundColor: getRandomColor() }"
            class="avatar-icon"
          >
            <span>{{
              getInitials(selectedUser.firstName + selectedUser.lastName)
            }}</span>
          </div>
          <div class="user-infos">
            <span style="font-weight: 500; font-size: 24px">{{
              selectedUser.firstName + " " + selectedUser.lastName
            }}</span>
          </div>
        </div>
        <div
          class="contact-information"
          v-if="Object.keys(selectedUser).length > 0"
        >
          <h5>Contact Information</h5>
          <h6>E-mail</h6>
          <a :href="`mailto:${selectedUser.email}`">{{ selectedUser.email }}</a>
          <h6>Phone</h6>
          <span>{{ selectedUser.phoneNummber }}</span>
        </div>
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
              @submit.prevent="createUser"
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
              <div class="form-btn">
                <button
                  type="button"
                  class="btn btn-dark btn-sm m-1"
                  style="width: 130px"
                  @click="clearInput"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-dark btn-sm m-1"
                  style="width: 130px"
                >
                  send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, onSnapshot } from "firebase/firestore";
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
      colors: [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#FF9800",
        "#FF5722",
      ],
      activeItem: null,
      selectedUser: {},
    };
  },

  methods: {
    async createUser() {
      this.users = [];
      await db.collection("users").add({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNummber: this.phoneNummber,
      });
      this.clearInput();
    },

    clearInput() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phoneNummber = "";
    },

    async getUsers() {
      onSnapshot(collection(db, "users"), async (snap) => {
        snap.forEach((doc) => {
          this.users.push({ ...doc.data(), id: doc.id });
          this.sortUsers();
        });
      });
    },
    //avatar
    getRandomColor() {
      let randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex];
    },

    getInitials(data) {
      if (data != null) {
        let chr;
        const d = data.toUpperCase();
        chr = d.split(" ");
        if (chr.length >= 2) {
          return chr[0][0] + chr[1][0];
        } else {
          return d[0] + d[1];
        }
      }
      return "";
    },

    activeBg(index) {
      this.activeItem = index;
    },
    //avatar end

    sortUsers() {
      this.users.sort(function (a, b) {
        let nameA = a.firstName.toLowerCase(),
          nameB = b.firstName.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
    },
    getUser(id) {
      let user = this.users.find((user) => user.id == id);
      this.selectedUser = user;
    },
  },
};
</script>

<style scoped lang="scss">
.contacts-container {
  height: calc(100vh - 50px);
  background-color: rgb(247, 247, 247);
}

.contacts {
  width: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 34px;
}

.users {
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 16px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
}

.active {
  background-color: #f7f7f7;
}

.user-infos {
  display: flex;
  flex-direction: column;
  span:first-letter {
    text-transform: capitalize;
  }
}

.contacts-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
}
.avatar-icon {
  color: #ffffff;
  border-radius: 50%;
  margin-right: 16px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  font-weight: 600;
}

.selected-user {
  display: flex;
  flex-direction: column;
  align-self: center;
  .users {
    width: unset;
    padding: 0;
    margin-top: 0;
    margin-bottom: 16px;
    cursor: unset;
    width: 341px;
  }
  .avatar-icon {
    height: 40px;
    width: 40px;
    font-size: 20px;
    padding: 24px;
  }
}

.contact-information {
  display: flex;
  flex-direction: column;
  h5 {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid lightgray;
  }
  span {
    margin-bottom: 8px;
    font-size: 18px;
    color: rgb(41, 171, 226);
  }
  a {
    margin-bottom: 8px;
    font-size: 18px;
    color: rgb(41, 171, 226);
    text-decoration: none;
  }
}

.form-btn {
  margin-top: 34px;
}

input:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}
</style>
