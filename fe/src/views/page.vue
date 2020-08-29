<template>
  <v-container>
    <v-alert :value="!pages.length" type="warning">
      데이터가 없습니다
    </v-alert>
    <v-row>
      <v-col col="12" sm="4" md="2" v-for="page in pages" :key="page._id">
        <v-card>
          <v-card-title class="pb-0">{{page.name}}</v-card-title>
          <v-card-text>
            <div>권한: {{page.lv}}</div>
            <div>진입 횟수: {{page.inCnt}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="orange" @click="putDialog(page)">수정</v-btn>
            <v-btn text color="error" @click="delPage(page._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">페이지 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col col="12" sm="4" md="2">
                <v-text-field
                  label="페이지 이름"
                  hint="게시판"
                  persistent-hint
                  required
                  v-model="pageName"
                ></v-text-field>
              </v-col>
              <v-col col="12" sm="4" md="2">
                <v-select
                  :items="pageLvs"
                  label="권한"
                  required
                  v-model="pageLv"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="putPage">수정</v-btn>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
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
</template>
<script>

export default {
  data () {
    return {
      pages: [],
      dialog: false,
      pageLvs: [],
      pageLv: 0,
      pageName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 0; i < 4; i++) this.pageLvs.push(i)
    this.getPages()
  },
  methods: {
    getPages () {
      this.$axios.get(`${this.$apiRootPath}manage/page`)
        .then((r) => {
          this.pages = r.data.pages
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (page) {
      this.putId = page._id
      this.dialog = true
      this.pageName = page.name
      this.pageLv = page.lv
    },
    putPage () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/page/${this.putId}`, {
        name: this.pageName, lv: this.pageLv
      })
        .then((r) => {
          this.pop('페이지 수정 완료')
          this.getPages()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delPage (id) {
      this.$axios.delete(`${this.$apiRootPath}manage/page/${id}`)
        .then((r) => {
          this.pop('페이지 삭제 완료')
          this.getPages()
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
