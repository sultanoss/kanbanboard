<template>
  <div class="add-task-container">
    <div class="add-task-header">
      <h2 style="margin: 0px">Add Task</h2>
    </div>
    <form class="add-task-form">
      <div class="form d-flex justify-content-center">
        <div class="form-left">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter a title"
            />
          </div>
          <div class="mb-3">
            <label for="textarea" class="form-label">Description</label>
            <textarea
              class="form-control"
              rows="3"
              placeholder="Enter a Description"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="select" class="form-label">Category</label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Select task category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="select" class="form-label">Assigned to</label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Select contacts to assign</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="form-right">
          <div class="mb-3">
            <label for="date" class="form-label">Due date</label>
            <input type="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="select" class="form-label">Priority</label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Set Priority</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="subtasks" class="form-label">Subtasks</label>
            <!-- <input
              type="text"
              class="form-control"
              placeholder="Enter new subtask"
            /> -->
            <div class="input-group mb-3">
              <div class="search">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Add new subtask"
                />
                <i class="bi bi-plus"></i>
              </div>
            </div>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" />
            <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label>
          </div>
        </div>
      </div>
      <div class="form-btn">
        <button
          type="button"
          class="guest btn btn-sm btn-outline-dark m-1"
          style="width: 130px"
        >
          Clear
        </button>
        <button
          class="btn btn-dark btn-sm m-1"
          type="submit"
          style="width: 130px"
        >
          Create Task
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.add-task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.add-task-header {
  padding: 50px;
  width: 90%;
}
.add-task-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-left: 50px;
  padding-right: 50px;
  height: calc(100vh - 190px);
  justify-content: space-between;
  padding-bottom: 50px;
  font-weight: 500;
}

.form-left {
  width: 50%;
  padding-right: 50px;
  border-right: 1px solid lightgrey;
}

.form-right {
  width: 50%;
  padding-left: 50px;
}

.form-btn {
  display: flex;
  justify-content: flex-end;
}

.search {
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search {
  width: 100%;
}

 input:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

textarea{
    resize: none;
}

textarea:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

select:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

.search i {
  position: absolute;
  top: 1px;
  right: 5px;
  font-size: 24px;
  cursor: pointer;
}
</style>
