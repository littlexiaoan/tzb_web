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
      <el-col :span="12">
        <div style="display: flex">
          <el-button>按钮</el-button>
          <el-button>按钮</el-button>
          <el-button>按钮</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="display: flex">
          <el-button>按钮</el-button>
          <el-button>按钮</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="8">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="PSNR值:">
            <el-input v-model="input"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--    <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="getFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <hr>
        <hr>
        <div style="width:178px ;height: 178px; background-color: skyblue">
          <img :src="imageUrl">
        </div>
        <hr>
        <hr>
        <div style="width:178px ;height: 178px; background-color: skyblue">
          <img :src="imageUrl">
        </div>
        <hr>
        <hr>
        <div style="width:178px ;height: 178px; background-color: skyblue">
          <img :src="imageUrl">
        </div>-->
  </div>
</template>

<script>
export default {
  name: "Second",
  data() {
    return {
      imageUrl: '',
      imgCode: '',
      input: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("@imageUrl", this.imageUrl)
      console.log("@@@", res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("@@imageUrl", this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
    }
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

/*.avatar-uploader .el-upload {
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
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

!*上传成功的图片尺寸*!
.avatar {
  background: skyblue;
  width: 178px;
  height: 178px;
  display: block;

}*/
</style>
