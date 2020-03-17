<template>
  <div>
    <div id="toDoWrapper">
      <section class="toDoCol">
        <h4>Att handla</h4>
        <form autocomplete="off" @submit="onAdd" id="addTask">
          <input maxlength="30" required id="inputTask" v-model="inputValue" placeholder="Lägg till vara" />
          <button id="addTaskButton" type="submit">+</button>
        </form>
        <div class="eachTaskDiv" v-for="(task, index) in arrayOfTasks" v-bind:key="index">
            <div class="eachTask">
                <p class="timeLabel">{{ task.timeAdded }}</p>
                <p class="taskName">{{ task.name }}</p>
                <button class="checkButton" @click="onDone(task, index)">Check!</button>
            </div>
        </div>
      </section>
      <section v-if="doneTasks.length > 0" class="toDoCol">
        <h4>Kundvagn</h4>
        <div class="eachTaskDiv" v-for="(task, index) in doneTasks" v-bind:key="index">
            <div class="eachTask">
                <p class="timeLabel">{{ task.timeAdded }}</p>
                <p class="taskNameCart">{{ task.name }}</p>
                <button class="removeButton" @click="onRemove(task, doneTasks.length, index)">Ta bort</button>
            </div>
        </div>
        <div>
          <button id="removeAllButton" @click="onRemoveAll">Rensa kundvagn</button>
        </div>
      </section>
      <div class="cartEmptyMessageContainer">
         <p>Senast rensad kundvagn: </p>
         <strong>{{ cartEmptyTimeStamp }}</strong>
      </div>
    </div>
  </div>
</template>

<script>

import database from '../firebase.js';

export default {
  name: "ToDo",
  props: {},
  data () {
      return {
          inputValue: "",
          arrayOfTasks: [
          ],
          doneTasks: [
          ],
          cartEmptyTimeStamp: "",
          database: database
      }
  },
  methods: {
      inputChange(e) {
          this.$emit("change", e);
          this.inputValue = e.target.value
      },
      weekDayTranslation(weekday) {
          switch(weekday) {
            case 0:
              return "Söndag";
              case 1:
                return "Måndag";
                case 2:
                return "Tisdag";
                case 3:
                return "Onsdag";
                case 4:
                return "Torsdag";
                case 5:
                return "Fredag";
                case 6:
                return "Lördag";
                default:
                  return "Veckodag"
          }
      },
      onAdd(e) {
          e.preventDefault();
          let dateObj = new Date();

          let dayInEnglish = dateObj.getDay();
          let dayInSwedish = this.weekDayTranslation(dayInEnglish);

          this.database.ref('handlingslista').push({
            vara: this.inputValue,
            timeAdded: dayInSwedish + " " + dateObj.toString().split(" ")[4].slice(0, 5)
          });
          this.inputValue = "";
      },
      onDone(task) {
          this.database.ref('handlingslista/' + task.key).remove();
          this.database.ref('handlingslistaklar').push({
            vara: task.name,
            timeAdded: task.timeAdded
          });
      },
      onRemove(task, length) {
        this.database.ref('handlingslistaklar/' + task.key).remove();
        if(length <= 1) {
          this.onCartEmpty();
        }
      },
      onRemoveAll() {
        this.database.ref('handlingslistaklar').remove();
        this.onCartEmpty();
      },
      onCartEmpty() {
        let dateObj = new Date();
        this.database.ref("rensad").set({
          timeRemoved: this.weekDayTranslation(dateObj.getDay()) + " " + dateObj.toString().split(" ")[4].slice(0, 5)
        });
      }
  },
  mounted(){

    let self = this;

    this.database.ref('handlingslista').on('value', function(snapshot) {
      let newArray = []
       snapshot.forEach(function(childSnapshot) {
         newArray.push({ name: childSnapshot.val().vara, timeAdded: childSnapshot.val().timeAdded, key: childSnapshot.key })
        });
      self.arrayOfTasks = newArray
    });

    this.database.ref('handlingslistaklar').on('value', function(snapshot) {
      let newArray = []
       snapshot.forEach(function(childSnapshot) {
         newArray.push({ name: childSnapshot.val().vara, timeAdded: childSnapshot.val().timeAdded, key: childSnapshot.key })
        });
      self.doneTasks = newArray
    });

    this.database.ref('rensad').on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        self.cartEmptyTimeStamp = childSnapshot.val()
      })
    })
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
  width: 280px;
}
#inputTask:focus {
  outline: none;
}
#addTask {
    display: flex;
    justify-content: center;
    height: 50px;
    margin-bottom: 10px;
}
#addTaskButton {
  border: 0;
  background-color: #f7f7f7;
  border-radius: 0px 5px 5px 0px;
  width: 70px;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
#toDoWrapper {
  display: flex;
  justify-content: center;
}
.toDoCol {
  display: flex;
  width: 300px;
  flex-direction: column;
  margin-bottom: 50px;
}
.toDoCol:last-of-type {
  margin-bottom: 0px;
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
    height: 40px;
    width: 280px;
    padding: 0px 10px;
    margin: 7px 0px;
    word-break: break-all;
}
.timeLabel {
  position: absolute;
  margin-top: -21px;
  margin-left: -10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 3px;
}
.taskName {
  width: 190px;
  margin-right: 30px;
  text-align: left;
}
.taskNameCart {
  width: 190px;
  margin-right: 30px;
  text-align: left;
  text-decoration: line-through;
}
.checkButton {
  height: 30px;
  border: 0;
  background-color: green;
  border-radius: 5px;
  color: white;
  width: 70px;
}
.removeButton {
  height: 30px;
  border: 0;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  width: 70px;
}
#removeAllButton {
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
  border: 0;
  height: 30px;
  margin-top: 10px;
  border-radius: 5px;
}
.cartEmptyMessageContainer p {
  margin: 7px 0px 0px 0px;
  padding: 0;
}

@media screen and (max-width: 768px) {
  #toDoWrapper {
    flex-direction: column;
    align-items: center;
  }
}


</style>