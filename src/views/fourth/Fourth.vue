<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div style="margin: 100px;">
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
        <div style="width: 512px;height: 512px;margin: 100px"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 1)"
        >
          <img v-if="processedImageUrl" :src="processedImageUrl" class="avatar">
          <i v-else class="el-icon-picture-outline-round avatar-uploader-icon-return">
            处理图片
          </i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import photoShop from "@/utils/photoShop";
import message from "@/utils/message";
import {api4} from "@/api";

export default {
  name: "Fourth",
  data() {
    return {
      //原图片地址
      originalImageUrl: '',
      //图片base64码
      imgCode: '',
      //处理后图片的地址
      processedImageUrl: "",
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
      api4({img_base64: imgCode}).then(
          res => {
            this.processedImageUrl = res.results.img_base64
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
