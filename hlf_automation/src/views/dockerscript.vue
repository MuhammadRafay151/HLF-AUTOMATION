<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <h1 class="text-h3 text-center mb-12">Curriculum</h1>
        <v-text-field label="Curriculum Name" outlined></v-text-field>
        <v-text-field label="Short Name" outlined></v-text-field>
        <v-text-field label="Total hrs" outlined type="number"></v-text-field>
        <v-autocomplete
          auto-select-first
          label="Select Organization Unit"
          outlined
        ></v-autocomplete>
        <v-btn block color="primary"> Add Curriculum </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-data-table
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]>
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            <v-icon small> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "curriculum",
};
</script>