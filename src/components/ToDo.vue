<template>
  <div>
    <div id="toDoWrapper">
      <div class="toDoCol">
        <h4>Att handla</h4>
        <form autocomplete="off" @submit="onAdd" id="addTask">
          <input required id="inputTask" v-model="inputValue" placeholder="Lägg till vara" />
          <button id="addTaskButton" type="submit">+</button>
        </form>
        <div class="eachTaskDiv" v-for="(task, index) in arrayOfTasks" v-bind:key="index">
            <div class="eachTask">
                <p>{{ task.name }}</p>
                <button @click="onDone(task.name, index)">Check!</button>
            </div>
        </div>
      </div>
      <div class="toDoCol">
        <h4>Check!</h4>
        <div class="eachTaskDiv" v-for="(task, index) in doneTasks" v-bind:key="index">
            <div class="eachTask">
                <p>{{ task.name }}</p>
                <button @click="onRemove(task.name, index)">Ta bort</button>
            </div>
        </div>
        <div>
          <button id="removeAllButton" @click="onRemoveAll">Rensa alla</button>
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
      },
      onRemove(taskname, i) {
        this.doneTasks.splice(i, 1)
      },
      onRemoveAll() {
        this.doneTasks = []
      }
  }
};
</script>

<style scoped>
h1 {
  color: blue;
}

h4 {
  margin: 5px;
}

#inputTask {
  font-size: 1.1em;
  border: 1px solid #f7f7f7;
  border-right: 0;
  border-radius: 5px 0px 0px 5px;
  width: 167px;
}
#inputTask:focus {
  outline: none;
}
#addTask {
    display: flex;
    justify-content: center;
    height: 30px;
    margin-bottom: 10px;
}
#addTaskButton {
  border: 0;
  background-color: #f7f7f7;
  border-radius: 0px 5px 5px 0px;
  width: 50px;
  font-size: 1.5em;
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
.eachTaskDiv {
  display: flex;
  justify-content: center;

}
.eachTask {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 5px;
    height: 30px;
    width: 200px;
    padding: 0px 10px;
    margin: 1px 0px;
}
#removeAllButton {
  background-color: rgba(255, 0, 0, 0.5);
  border: 0;
  height: 30px;
  width: 100px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>