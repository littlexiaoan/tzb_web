<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="container">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="getFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">
              点击按钮上传图片
            </i>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="container">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="8">
        <div style="display: flex">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="test">按钮</el-button>
        </div>
        <div style="display: flex">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="test">按钮</el-button>
        </div>
        <div style="display: flex">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="test">按钮</el-button>
        </div>
        <div style="display: flex">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="test">按钮</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "First",
  data() {
    return {
      imageUrl: '',
      imgCode: '',
      input: ''
    };
  },
  methods: {
    test() {
      console.log(this.input)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //转base64方法
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    //将图片转为base64
    getFile(file) {
      this.getBase64(file.raw).then(res => {
        this.imgCode = res
      });
    },

  }

}
</script>

<style lang="less" scoped>
.container {
  width: 512px;
  height: 512px;
  border: 1px solid black;
  position: relative;
  margin: 30px;
}

.img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  width: 512px;
  height: 512px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  //箭头颜色
  color: #8c939d;
  width: 512px;
  height: 512px;
  line-height: 512px;
  text-align: center;
}

.avatar-uploader-icon-return {
  font-size: 28px;
  color: #8c939d;
  width: 512px;
  height: 512px;
  line-height: 512px;
  text-align: center;

}
</style>
