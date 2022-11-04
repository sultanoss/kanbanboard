<template>
  <div class="help-container">
    <h2 style="margin-bottom: 60px">Help</h2>
    <div class="join-description">
      <h5 style="margin-bottom: 16px">What is Join?</h5>
      <p style="font-weight: 500">
        Join is a project management tool designed to help visualize work, limit
        work-in-progress, and maximize efficiency.
      </p>
    </div>
    <div class="usage">
      <h5>How to use it</h5>
      <ul>
        <li>
          Add task bei using the <i class="fs-4 bi-pencil-square"></i> add-task
          formula.
        </li>
        <li> <i class="bi bi-arrow-left-right"></i> Drag your task to the desired field.</li>
        <li>
          Click <i class="bi bi-arrows-angle-expand"></i> for task details.
        </li>
        <li>
          Click <i class="bi bi-clipboard2-check"></i> when a subtask is done.
        </li>
        <li>
          Click <i class="bi bi-arrow-return-left"></i> if you want to remove
          the done status of a subtask.
        </li>
        <li>
          Click
          <i
            class="bi bi-trash delete-task"
            style="color: red; cursor: pointer"
          ></i>
          to delete a Task
        </li>
        <li>
          Navigate to <i class="fs-4 bi-card-list"></i> Summary to see a summary
          of all tasks
        </li>
        <li>
          Navigate to <i class="fs-4 bi-person-rolodex"> </i> Contacts to see
          all contacts or create a new contact
        </li>
        <li>
          <i
            class="bi bi-chevron-double-up"
            style="color: #f70000; font-size: 22px"
          ></i>
          Priority High.
        </li>
        <li>
          <i
            class="bi bi-chevron-bar-contract"
            style="color: #fb6b00; font-size: 22px"
          ></i>
          Priority Medium
        </li>
        <li>
          <i
            class="bi bi-chevron-double-down"
            style="color: #00c209; font-size: 22px"
          ></i>
          Priority Low
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.help-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 50px;
  @media (max-width: 576px) {
    height: calc(100vh - 100px);
    padding: 24px;
    overflow: auto;
    h2 {
      margin-bottom: 24px !important;
    }
  }
}

li {
  list-style: disc;
  font-weight: 500;
  margin-bottom: 8px;
}

i {
  font-size: 20px;
}
</style>
