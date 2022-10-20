<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div
        class="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
        style="background-color: #2a3647; max-width: 200px;"
      >
        <div
          class="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100"
        >
          <div
            class="d-flex justify-content-center align-items-center w-100"
            style="margin-top: 54px; margin-bottom: 54px"
          >
            <img src="../assets/joinlogo.png" />
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
              <RouterLink to="board" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-kanban"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Board</span>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="addtask" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-pencil-square"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Add Task</span>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
            >
              <RouterLink to="contacts" class="nav-link align-middle px-0"
                ><i class="fs-4 bi-person-rolodex"></i
              ></RouterLink>
              <span class="ms-3 d-none d-sm-inline">Contacts</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col" style="background-color: #f7f7f7; padding: 0">
        <div class="header">
          <span style="font-weight: 500">Kanban Project Management Tool</span>
          <div
            class="user-help d-flex justify-content-center align-items-center"
          >
            <i
              class="bi bi-question-circle"
              style="font-size: 24px; color: lightgray"
            ></i>
            <div class="user-img">
              <img
                src="../assets/mypic11.jpg"
                style="
                  height: 32px;
                  width: 32px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin-left: 20px;
                "
              />
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

ul{
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
  color:#29abe2;
}
.router-content {
  min-height: calc(100vh - 50px);
}
</style>
