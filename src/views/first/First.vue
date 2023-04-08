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
      <el-col :span="8" :offset="7">
        <div class="input-button">
          <el-input v-model.number="size1" placeholder="请输入椒盐噪声的强度"></el-input>
          <el-button type="primary" @click="click1">椒盐加噪</el-button>
        </div>
        <div class="input-button">
          <el-input v-model.number="size2" placeholder="请输入高斯噪声的强度"></el-input>
          <el-button type="primary" @click="click2">高斯加噪</el-button>
        </div>
        <div class="input-button">
          <el-input v-model.number="size3" placeholder="请输入泊松噪声的强度"></el-input>
          <el-button type="primary" @click="click3">泊松加噪</el-button>
        </div>
        <div class="input-button">
          <el-input v-model.number="size4" placeholder="请输入运动模糊的强度"></el-input>
          <el-input v-model.number="direction" placeholder="请输入运动模糊的方向"></el-input>
          <el-button type="primary" @click="click4">运动模糊</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import photoShop from "@/utils/photoShop";
import {addNoise, api1_1, api1_2, api1_3, api1_4} from "@/api";
import message from "@/utils/message";


export default {
  name: "First",
  data() {
    return {
      //原图片地址
      originalImageUrl: '',
      //图片base64码
      imgCode: '',
      //参数
      size1: "",
      size2: "",
      size3: "",
      size4: "",
      direction: "",
      //处理后图片的地址
      processedImageUrl: "",
      //等待
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
    //椒盐噪声
    click1() {
      this.processedImageUrl = ""
      this.loading = true
      addNoise({op: "salt", size: this.size1, img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //高斯噪声
    click2() {
      this.processedImageUrl = ""
      this.loading = true
      addNoise({op: "gaussian", size: this.size2, img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //泊松噪声
    click3() {
      this.processedImageUrl = ""
      this.loading = true
      addNoise({op: "poisson", size: this.size3, img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
            this.loading = false
          },
          error => {
            //失败回调
            message.warning(error.message)
            this.loading = false
          })
    },
    //运动模糊
    click4() {
      this.processedImageUrl = ""
      this.loading = true
      addNoise({op: "motion", size: this.size4, direction: this.direction, img_base64: this.imgCode}).then(res => {
            //成功回调
            this.processedImageUrl = res.results.img_base64
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
.input-button {
  display: flex;
  padding: 5px;
}

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
