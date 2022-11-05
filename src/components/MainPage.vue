<template>
  <div class="container-fluid">
    <div class="content-container row flex-nowrap">
      <div
        class="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
        style="background-color: #2a3647; max-width: 200px"
      >
        <div
          class="sidebar d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100"
        >
          <div
            class="logo d-flex justify-content-center align-items-center w-100"
            style="margin-top: 54px; margin-bottom: 54px"
          >
            <img style="height: 80px" src="../assets/capa2.png" />
          </div>

          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="/main/summary" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-card-list"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Summary</span>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="/main/board" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-kanban"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Board</span>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="/main/addtask" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-pencil-square"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Add Task</span>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="/main/contacts" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-person-rolodex"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Contacts</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col" style="background-color: #f7f7f7; padding: 0">
        <div class="header">
          <span class="title" style="font-weight: 500"
            >Kanban Project Management Tool</span
          >
          <img class="logo-img" src="../assets/capa.png" />
          <div
            class="user-help d-flex justify-content-center align-items-center"
          >
            <RouterLink to="/main/help" class="nav-link align-middle px-0">
              <i
                class="bi bi-question-circle"
                style="font-size: 24px; color: lightgray"
              ></i
            ></RouterLink>
            <div class="user-img d-flex align-items-center">
              <span class="logout">Logout</span>
              <i
                class="bi bi-box-arrow-left"
                style="
                  font-size: 1.5rem;
                  margin-left: 16px;
                  cursor: pointer;
                  color: #212529;
                "
                @click="logOut"
              ></i>
            </div>
          </div>
        </div>
        <div class="router-content">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/");
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid lightgrey;
  padding-left: 24px;
  padding-right: 24px;
}

.logo{
  @media(max-width:767px){
    margin-top: 27px !important;
    margin-bottom: 27px !important;
    img{
      height: 56px !important;
    }
  }
}

ul {
  align-self: center;
}
.nav-link {
  color: #d8d8d8;
}
.nav-link.active {
  background-color: unset;
  color: #d8d8d8;
}
.nav-link:focus,
.nav-link:hover {
  color: #29abe2;
}

@media (max-width: 768px) {
  .col-auto {
    width: 150px !important;
  }

  @media (max-width: 576px) {
    .col-auto {
      width: auto !important;
    }
  }

  .d-sm-inline {
    margin-left: 8px !important;
  }
}

@media (max-width: 576px) {
  .content-container {
    flex-direction: column-reverse !important;
  }

  .sidebar {
    min-height: auto !important;
    flex-direction: row !important;
    height: 50px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .col-auto {
    max-width: unset !important;
  }

  .logo {
    width: unset !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    img {
      display: none;
    }
  }

  ul {
    flex-direction: row !important;
    width: 100%;
    justify-content: space-between;
  }

  .router-content {
    min-height: unset !important;
  }

  // .summary-container {
  //   height: calc(100vh - 100px) !important;
  // }
}

.logout {
  margin-left: 16px;
  font-weight: 500;
  @media (max-width: 567px) {
    margin-left: 8px;
    font-size: 14px;
  }
}

.user-img {
  i {
    @media (max-width: 576px) {
      margin-left: 8px !important;
    }
  }
}

.title {
  @media (max-width: 576px) {
    display: none;
  }
}

.logo-img {
  display: none;
  @media (max-width: 576px) {
    display: flex;
  }
}

.bi-question-circle {
  @media (max-width: 576px) {
    font-size: 16px !important;
  }
}
</style>
