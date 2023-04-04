<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div style="margin: 100px;">
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
        <div style="width: 512px;height: 512px;margin: 100px">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return">
            处理图片
          </i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Fourth",
  data() {
    return {
      imageUrl: '',
      imgCode: ''
    };
  },
  methods: {
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
img {
  width: 100%;
  height: auto
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  border: solid 1px black;
  //箭头颜色
  color: #8c939d;
  //width: 178px;
  //height: 178px;
  //line-height: 178px;
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

/*上传成功的图片尺寸*/
.avatar {
  //width: 178px;
  //height: 178px;
  width: 512px;
  height: 512px;
  display: block;
}
</style>
