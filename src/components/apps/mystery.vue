<template>
  <div>
    这是一个神秘的页面，如果你不知道这是什么，请不要点击这个页面的按钮。
    <br />
    <input type="text" v-model="value" />
    <button style="margin-left: 5px" @click="mystery">神秘按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    mystery() {
      this.axios({
        method: "get",
        url: "/cgi-bin/mystery?value=" + this.value,
        timeout: 5000,
      })
        .then((data) => {
          console.log(data)
          if (data.data.code == 0) {
            alert("ok");
          } else {
            alert("你正在操作未知的力量，请离开");
          }
        })
        .catch(() => {
          alert("你正在操作未知的力量，请离开");
        });
    },
  },
};
</script>

<style>
</style>