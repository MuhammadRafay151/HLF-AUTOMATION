<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
                            <tr>
                        <th>
                            Organizations Name
                        </th>
                        <th>
                            Organization Domain
                        </th>
                        <th>
                            Total Peers
                        </th>
                        <th>
                            Port
                        </th>

                    </tr>
      </thead>
      <tbody>
        <tr>
                        <td>
                            <v-text-field ></v-text-field>
                        </td>
                        <td>
                            <v-text-field ></v-text-field>
                        </td>
                        <td>
                            <v-text-field ></v-text-field>
                        </td>
                        <td>
                            <v-text-field ></v-text-field>
                        </td>
                    </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>