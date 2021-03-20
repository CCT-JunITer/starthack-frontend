<template>
  <div class="dialog-form">
    <v-btn class="dialog-form__add-btn" elevation="2" fab @click="isDialogOpen = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="isDialogOpen" width="500" fullscreen transition="dialog-bottom-transition">
      <template #activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>

      <v-card>
        <v-toolbar
          dark
          color="red"
        >
          <v-btn
            icon
            dark
            @click="isDialogOpen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Make a proposal</v-toolbar-title>
        </v-toolbar>
        <v-form ref="proposalForm" v-model="isFormValid">
          <div class="upload-photo" v-ripple @click="trigger">
            <p>Upload photo</p>
            <v-icon>mdi-camera</v-icon>
            <v-img :src="picture">

            </v-img>
          </div>
          <input hidden @change="onFileInput" type="file" ref="fileInput"/>
          <v-card-text>
            <v-text-field
              v-model="formTitle"
              :rules="formTitleRules"
              label="Title of the proposal"
              required
            ></v-text-field>
            <v-textarea
              v-model="formDescription"
              :rules="formDescriptionRules"
              label="Description of the proposal"
              required
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="isDialogOpen = false">
              Close
            </v-btn>
            <v-btn
              color="success"
              elevation="2"
              :disabled="!isFormValid"
              @click="submitProposal"
            >Make the proposal</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Proposal } from '@/interfaces/Proposal';

@Component
export default class DialogForm extends Vue {
  $refs!: {
    proposalForm: HTMLFormElement,
    fileInput: HTMLInputElement,
  };

  protected isDialogOpen = false;

  protected isFormValid = false;

  protected formTitle = '';

  protected formDescription = '';

  protected picture: string | null = null;

  protected formTitleRules = [
    (v: string): boolean | string => !!v || 'Title is required',
    (v: string): boolean | string => (v && v.length > 5) || 'Title must be more than 5 characters',
  ];

  protected formDescriptionRules = [
    (v: string): boolean | string => !!v || 'Description is required',
    (v: string): boolean | string => (v && v.length > 15) || 'Title must be more than 15 characters',
  ];

  submitProposal(): void {
    if (this.$refs.proposalForm.validate()) {
      this.isDialogOpen = false;
      this.$emit('add-proposal', {
        title: this.formTitle,
        description: this.formDescription,
        image: this.picture,
      } as Proposal);
      this.formTitle = '';
      this.formDescription = '';
    }
  }

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
      this.picture = e.target?.result as string;
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

.dialog-form {
  z-index: 1000;

  .dialog-form__add-btn {
    z-index: 1000;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 1.5rem;
    margin-right: 1.5rem;
  }
}
</style>
