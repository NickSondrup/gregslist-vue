<template>
  <div class="mb-4 listing">
    <router-link :to="{name: 'House', params: {houseId: house.houseId}}">
      <div class="card selectable">
        <img :src="house.img" alt="listing image" class="rounded">
        <div class="card-body">
          <h5 class="d-flex justify-content-between">
            <span>{{ house.address }} - {{ house.price }} -- levels: {{ house.levels }}</span>
            <span>Bedrooms: {{ house.bedrooms }} -- Bathrooms: {{ house.bathrooms }}</span>
          </h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { House } from '../models/House.js'
export default {
  props: {
    house: { type: House, required: true }
  },
  setup(props) {
    return {}
  }
}
</script>

<style>

</style>
