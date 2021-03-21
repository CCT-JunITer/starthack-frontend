<template>
  <div class="dialog-form">

    <v-btn text @click="isDialogOpen = true" color="primary">
      <v-icon>mdi-plus</v-icon>
      add proposal
    </v-btn>
    <v-dialog v-model="isDialogOpen" width="500" transition="dialog-bottom-transition">
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
          <upload-photo v-model="picture"></upload-photo>
          <v-card-text>
            <v-text-field
              v-model="formTitle"
              :rules="formTitleRules"
              label="Title of the proposal"
              required
            ></v-text-field>
            <v-textarea
              v-model="formDescription"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Proposal } from '@/interfaces/Proposal';
import UploadPhoto from '../UploadPhoto.vue';

@Component({
  components: { UploadPhoto },
})
export default class DialogForm extends Vue {
  $refs!: {
    proposalForm: HTMLFormElement,
  };

  protected isDialogOpen = false;

  protected isFormValid = false;

  protected formTitle = '';

  protected formDescription = '';

  protected picture = '';

  protected formTitleRules = [
    (v: string): boolean | string => !!v || 'Title is required',
    (v: string): boolean | string => (v && v.length > 5) || 'Title must be more than 5 characters',
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
      this.picture = '';
    }
  }
}
</script>

<style lang="scss" scoped>

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
