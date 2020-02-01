<template>
  <div>
    <h1>ALL USERS</h1>
    <table>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Name</th>
      </tr>
      <tr v-for="data in myData">
        <td>{{ data.id }}</td>
        <td>{{ data.name }}</td>
        <th>
          <nuxt-link
            :to="{
              name: 'users-id',
              params: { id: data.id }
            }"
            >Link to #{{ data.id }}</nuxt-link
          >
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      myData: [
        {
          id: 1,
          name: 'bla bla bla'
        },
        {
          id: 2,
          name: 'bla bla bla'
        },
        {
          id: 3,
          name: 'bla bla bla'
        },
        {
          id: 4,
          name: 'bla bla bla'
        },
        {
          id: 5,
          name: 'bla bla bla'
        }
      ]
    }
  }
}
</script>

<style scoped>
td,
th {
  height: 30px;
  width: 100px;
}
</style>
