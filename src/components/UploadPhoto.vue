<template>
  <div class="upload-photo" v-ripple @click="trigger">
    <p>Upload photo</p>
    <v-icon>mdi-camera</v-icon>
    <v-img :src="value" max-height="200px" contain v-if="!noPreview"></v-img>
    <input hidden @change="onFileInput" type="file" ref="fileInput" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class UploadPhoto extends Vue {
  $refs!: {
    fileInput: HTMLInputElement;
  }

  @Prop({ required: false })
  protected noPreview!: boolean;

  @Prop({ required: false })
  protected value?: string;

  public trigger(): void {
    this.$refs.fileInput.click();
  }

  onFileInput(file: Event): void {
    const { files } = file.target as HTMLInputElement;
    if (!files || files.length !== 1) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.$emit('input', e.target?.result as string);
    };
    fileReader.readAsDataURL(files[0]);
  }
}
</script>

<style lang="scss" scoped>

.upload-photo {
  border: 3px dashed grey;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

}

</style>
