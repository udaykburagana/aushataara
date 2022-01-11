<template>
    <v-form ref="members">
        <v-container>
            <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Name"
            v-model="name"
            :rules="[rules.required]"
            style="margin-top:5%"
            dense
            clearable
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-text-field
            label="Age"
            v-model="age"
            :rules="[rules.required,rules.numberRule]"
            style="margin-top:12%"
            dense
            clearable
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-select
          :items="list_of_relations"
          label="Releationship"
          item-text="relation"
          item-value="relation"
          v-model="relation"
          :rules="[rules.required]"
          clearable
        ></v-select>
        </v-col>

        <v-col
        cols="12"
          sm="6"
          md="1">
            <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                @click="addMember"
                >
                <v-icon dark>
                    mdi-plus
                </v-icon>
    </v-btn>
        </v-col>
      </v-row>
      <v-row>
          <v-data-table
            :headers="headers"
            :items="addedMembers"
            class="elevation-1"
            style="margin:auto"
            hide-default-footer
        >
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
            No Members Added
            </template>
        </v-data-table>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default{

    data:()=>({
        rules: {
          required: value => !!value || 'Required.',
          numberRule: value  => {
            if (!value?.trim()) return true;
            if (!isNaN(parseFloat(value)) && value >= 0 && value <= 99) return true;
            return 'Age has to be between 0 and 99';
            },
        },
        list_of_relations : [
        {
            id:1,
            relation: "Father"
        },{
            id:2,
            relation: "Mother"
        },{
            id:3,
            relation: "Daughter"
        },{
            id:4,
            relation: "Son"
        },{
            id:5,
            relation: "Myself"
        },{
            id:6,
            relation: "Spouse"
        },{
            id:7,
            relation: "Other"
        }
    ],
    headers:[{
        id:1,text:"Name",value:"name"},
        {id:2,text:"Age",value:"age"},
        {id:3,text:"Relation",value:"relation"} ,
        {id:4,text:"Actions",value:"actions"}],
    name:"",
    age: undefined,
    relation:"",
    }),
    computed: {
        ...mapState(['addedMembers']),
    },
    methods:{
        ...mapMutations(["addMemberMutation","deleteItemMutation"]),
        addMember : function(){
          if(this.$refs.members.validate()){
            let args = {
                name: this.name,
                age: this.age,
                relation: this.relation
            }
            if(this.name != '' && this.age != '' && this.relation != '')  this.addMemberMutation(args)
            this.$refs.members.reset()
          }
        },
        deleteItem(item){
            this.deleteItemMutation(item)
        }
    }
}
</script>

<style >
</style>
