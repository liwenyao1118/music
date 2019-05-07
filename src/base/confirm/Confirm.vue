<template>
  <transition name="fade">
    <div class="confirm">
      <div class="box">
        <div class="context">{{confirmTitle}}</div>
        <div class="result">
          <div class="cancel" @click="cancel">取消</div>
          <div class="sure" @click="sure">清空</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    confirmTitle: {
      default: '是否清空播放列表',
      type:String
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    sure() {
      this.$emit("sure");
    }
  }
};
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    border-radius: 6px;
    width: 270px;
    height: 93px;
    background-color: #f2f3f4;
    display: flex;
    flex-direction: column;
    .context {
      height: 46px;
      text-align: center;
      line-height: 46px;
    }
    .result {
      display: flex;
      height: 100%;
      align-items: center;
      div {
        flex: 1;
        text-align: center;
        height: 100%;
        line-height: 47px;
        color: #d44439;
      }
    }
  }
}
@keyframes confirm-fade {
    0%{
        opacity: 0;
    }   
    100%{
        opacity: 1;
    }
}
@keyframes confirm-zoom {
    0%{
       transform: scale(0)
    }
    50%{
        transform: scale(1.1)
    }
    100%{
        transform: scale(1)
    }
}
.fade-enter-active{
    animation: confirm-fade .3s; 
    .box{
        animation: confirm-zoom .3s;
    }
}
</style>
