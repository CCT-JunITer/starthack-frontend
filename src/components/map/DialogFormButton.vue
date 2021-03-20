<template>
  <div class="dialog-form">
    <v-btn class="dialog-form__add-btn" elevation="2" fab @click="isDialogOpen = true;">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="isDialogOpen" width="500">
      <template #activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>

      <v-card>
        <v-form ref="problemForm" v-model="isFormValid" lazy-validation>
          <v-card-title>Report a problem</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="formTitle"
              :rules="formTitleRules"
              label="Title of the problem"
              required
            ></v-text-field>
            <v-textarea
              v-model="formDescription"
              :rules="formDescriptionRules"
              label="Description of the problem"
              required
              filled
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="success"
              elevation="2"
              :disabled="!isFormValid"
              @click="submitProblem"
            >Report the problem</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Report } from '@/interfaces/Report';

@Component
export default class DialogForm extends Vue {
  $refs!: {
    problemForm: HTMLFormElement,
  };

  protected isDialogOpen = false;

  protected isFormValid = false;

  protected formTitle = '';

  protected formDescription = '';

  protected formTitleRules = [
    (v: string): boolean | string => !!v || 'Title is required',
    (v: string): boolean | string => (v && v.length > 5) || 'Title must be more than 5 characters',
  ];

  protected formDescriptionRules = [
    (v: string): boolean | string => !!v || 'Description is required',
    (v: string): boolean | string => (v && v.length > 15) || 'Title must be more than 15 characters',
  ];

  submitProblem(): void {
    if (this.$refs.problemForm.validate()) {
      this.isDialogOpen = false;
      this.$emit('add-report', {
        title: this.formTitle,
        description: this.formDescription,
      } as Report);
      this.formTitle = '';
      this.formDescription = '';
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
