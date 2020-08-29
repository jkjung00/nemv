<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-btn absolute dark fab bottom right color="pink" @click="modalUp">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-col col="12" sm="4" md="2" v-for="(user, i) in users" :key="i">
          <v-card>
            <v-card-title class="pb-0">NAME : {{user.name}}</v-card-title>
            <v-card-text class="text-primary">AGE : {{user.age}}</v-card-text>
            <v-card-actions>
              <v-btn color="orange" text @click="putDialog(user)">수정</v-btn>
              <v-btn color="error" text @click="delUser(user._id)">삭제</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                    v-model="userName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="userAges"
                    label="Age*"
                    required
                    v-model="userAge"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="putUser">Edit</v-btn>
            <v-btn color="blue darken-1" text @click="postUser">Save</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar">
        {{ sbMsg }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getModel: '',
      postModel: '',
      putModel: '',
      delModel: '',
      dialog: false,
      userAges: [],
      userAge: 0,
      userName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 51; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    getReq () {
      axios.get(`${this.$apiRootPath}user`, {
        name: 'getMan'
      })
        .then((r) => {
          this.getModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postReq () {
      axios.post(`${this.$apiRootPath}user`, {
        name: 'jkjung', age: 44
      })
        .then((r) => {
          this.postModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putReq () {
      axios.put(`${this.$apiRootPath}user`, {
        user: 'putMan'
      })
        .then((r) => {
          this.putModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    delReq () {
      axios.delete(`${this.$apiRootPath}user`, {
        user: 'delMan'
      })
        .then((r) => {
          this.delModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    modalUp () {
      this.userName = ''
      this.userAge = ''
      this.dialog = true
    },
    postUser () {
      this.dialog = false
      axios.post(`${this.$apiRootPath}user`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 등록 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    getUsers () {
      axios.get(`${this.$apiRootPath}user`, {
      })
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      axios.put(`${this.$apiRootPath}/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`${this.$apiRootPath}/user/${id}`, {
      })
        .then((r) => {
          this.pop('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
