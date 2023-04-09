<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="container">
          <el-upload
              class="avatar-uploader"
              action=""
              :before-upload="beforeUpload"
              :on-change="OnChange"
          >
            <img v-if="originalImageUrl" :src="originalImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">
              点击按钮上传图片
            </i>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="container"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 1)">
          <img v-if="processedImageUrlOne" :src="processedImageUrlOne" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="container"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 1)">
          <img v-if="processedImageUrlTwo" :src="processedImageUrlTwo" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return"></i>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="container"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 1)">
          <img v-if="processedImageUrlThree" :src="processedImageUrlThree" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import photoShop from "@/utils/photoShop";
import message from "@/utils/message";
import {api5} from "@/api";

export default {
  name: "Fifth",
  data() {
    return {
      //原图片地址
      originalImageUrl: '',
      //图片base64码
      imgCode: '',
      //处理后图片的地址
      processedImageUrlOne: "",
      processedImageUrlTwo: "",
      processedImageUrlThree: "",
      loading: false

    };
  },
  methods: {
//获取原图的地址、base64
    beforeUpload(file) {
      this.originalImageUrl = photoShop.getImageUrl(file)
      //转base64码
      photoShop.getBase64(file).then(imgCode => {
        //res就是base64码 赋值给imgCode
        this.imgCode = imgCode
        //是否需要立即发送请求
        this.uploadFile(imgCode)
      })
      return false
    },
    uploadFile(imgCode) {
      // 发送 base64 编码到后端
      this.loading = true
      api5(imgCode).then(
          res => {
            this.processedImageUrlOne = res.results.img_base64_1
            this.processedImageUrlTwo = res.results.img_base64_3
            this.processedImageUrlThree = res.results.img_base64_2
            this.loading = false
          }, error => {
            message.warning(error.message)
            this.loading = false
          }
      )
    },
    //图片改变，将更新图片URL置空
    OnChange() {
      this.processedImageUrl = ""
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 256px;
  height: 256px;
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
  //width: 178px;
  //height: 178px;
  width: 256px;
  height: 256px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 14px;
  //箭头颜色
  color: #8c939d;
  width: 256px;
  height: 256px;
  line-height: 256px;
  text-align: center;
}

.avatar-uploader-icon-return {
  font-size: 28px;
  color: #8c939d;
  width: 256px;
  height: 256px;
  line-height: 256px;
  text-align: center;

}

</style>
