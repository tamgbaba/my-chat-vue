<template>
  <el-container style="height: 100%">
    <!-- 顶部操作栏 -->
    <el-header>###</el-header>
    <!-- 主页面 -->
    <span>群聊天</span>
    <el-main style="height: 100%">
      <div class="chat-box">
        <div class="chat-left"></div>
        <div class="chat-right">
          <div class="input-chat-box">
            <div slot="header" class="clearfix">
              <span>
                {{
                  '当前ip:  ' +
                  userData.userIp +
                  '::' +
                  userData.province +
                  userData.city
                }}</span
              >
            </div>

            <!-- 信息框 -->
            <div class="chat-message">
              <div v-for="msg in this.messageList" :key="msg" class="text item" >
                {{  msg }}
              </div>

            </div>
          </div>
          <div class="output-chat-box">
            <el-row>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="message"
              >
              </el-input>
              <el-button type="success" plain @click="send()">发送</el-button>
              <el-button type="info">取消</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </el-main>
    <!-- 底部页面 -->
    <el-footer>###</el-footer>
  </el-container>
</template>

<script>
import '@/views/modules/chat/css/messageBox.css'
export default {
  data() {
    return {
      userData: {},
      message: '',
      socket: '',
      socketPath: 'ws://localohost:8083/chat/share/',
      messageList: [],
    }
  },

  created() {},
  mounted() {
    this.getUserIp()
  },
  methods: {
    getUserIp() {
      this.$http
        .get(`/chat/ip/address`)
        .then(({ data }) => {
          this.userData = data.data
          this.init()
        })
        .catch(() => {})
    },
    init: function () {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.socketPath + this.userData.userIp)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      console.log(msg.data)
      this.messageList.push(msg.data)
    },
    send: function () {
      this.socket.send(this.userData.userIp+'发送了：'+this.message)
      this.message=''
    },
    close: function () {
      console.log('socket已经关闭')
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close
    },
  },
}
</script>
<style></style>
