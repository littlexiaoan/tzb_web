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
             element-loading-background="rgba(255, 255, 255, 1)"
        >
          <img v-if="processedImageUrl" :src="processedImageUrl" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="2">
        <div style="display: flex">
          <el-button @click="click1">均值滤波</el-button>
          <el-button @click="click2">中值滤波</el-button>
          <el-button @click="click3">自适应中值滤波</el-button>
        </div>
      </el-col>
      <el-col :span="6" offset="7">
        <div style="display: flex">
          <el-button @click="click4">十字均值</el-button>
          <el-button @click="click5">彩色图像复原</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="9" style="margin-top: 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="PSNR值:">
            <el-input v-model="psnr"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import photoShop from "@/utils/photoShop";
import message from "@/utils/message";
import {removeNoise} from "@/api";

export default {
  name: "Second",
  data() {
    return {
      //原图片地址
      originalImageUrl: '',
      //图片base64码
      imgCode: '',
      //处理后图片的地址
      processedImageUrl: "",
      //PSNR值
      psnr: "",
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
      })
      return false
    },
    //图片改变，将更新图片URL置空
    OnChange() {
      this.processedImageUrl = ""
    },
    //均值滤波
    click1() {
      this.processedImageUrl = ""
      this.psnr = ""
      this.loading = true
      removeNoise({op: "", img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.psnr = res.results.psnr
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //中值滤波
    click2() {
      this.processedImageUrl = ""
      this.psnr = ""
      this.loading = true
      removeNoise({op: "", img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.psnr = res.results.psnr
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //自适应中值滤波
    click3() {
      this.processedImageUrl = ""
      this.psnr = ""
      this.loading = true
      removeNoise({op: "", img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.psnr = res.results.psnr
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //十字均值
    click4() {
      this.processedImageUrl = ""
      this.psnr = ""
      this.loading = true
      removeNoise({op: "", img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.psnr = res.results.psnr
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //彩色图像复原
    click5() {
      this.processedImageUrl = ""
      this.psnr = ""
      this.loading = true
      removeNoise({op: "", img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.psnr = res.results.psnr
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
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
