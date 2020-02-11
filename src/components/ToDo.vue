<template>
  <div>
    <div id="toDoWrapper">
      <div class="toDoCol">
        <h4>To Do</h4>
        <form @submit="onAdd" id="addTask">
          <input v-model="inputValue" placeholder="Add Task" />
          <button type="submit">add</button>
        </form>
        <div v-for="(task, index) in arrayOfTasks" v-bind:key="index">
            <div class="eachTask">
                <p>{{ task.name }}</p>
                <button @click="onDone(task.name, index)">done</button>
                </div>
        </div>
      </div>
      <div class="toDoCol">
        <h4>Done</h4>
        <div v-for="(task, index) in doneTasks" v-bind:key="index">
            <div class="eachTask">
                <p>{{ task.name }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: {},
  data () {
      return {
          inputValue: "",
          arrayOfTasks: [
          ],
          doneTasks: [
          ]
      }
  },
  methods: {
      inputChange(e) {
          this.$emit("change", e);
          this.inputValue = e.target.value
      },
      onAdd(e) {
          e.preventDefault();
          this.arrayOfTasks.push({name: this.inputValue})
          this.inputValue = "";
      },
      onDone(taskname, i) {
          this.arrayOfTasks.splice(i, 1)
          this.doneTasks.push({name: taskname})
      }
  }
};
</script>

<style scoped>
h1 {
  color: blue;
}
#toDoWrapper {
  display: flex;
  justify-content: center;
}
.toDoCol {
  display: flex;
  width: 300px;
  flex-direction: column;
}
#addTask {
    display: flex;
}
.eachTask {
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 10px;
    height: 30px;
}
</style>