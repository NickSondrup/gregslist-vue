<template>
  <form class="bg-white rounded p-3 shadow"
        @submit.prevent="handleSubmit"
        id="house-form"
  >
    <div class="form-group">
      <label for="address" class="">Address: </label>
      <input v-model="editable.address"
             type="string"
             class="form-control"
             name="address"
             id="address"
             required
      >
    </div>
    <div class="form-group">
      <label for="bedrooms" class="">Rooms: </label>
      <input v-model="editable.bedrooms"
             type="number"
             class="form-control"
             name="bedrooms"
             id="bedrooms"
             required
      >
    </div>

    <div class="form-group">
      <label for="bathrooms" class="">Bathrooms:</label>
      <input v-model="editable.bathrooms" type="number" class="form-control" name="bathrooms" id="bathrooms">
    </div>

    <div class="form-group">
      <label for="price" class="">Price:</label>
      <input v-model="editable.price"
             type="number"
             class="form-control"
             name="price"
             id="price"
             required
             min="0"
             max="9999999"
      >
    </div>
    <div class="form-group">
      <label for="levels" class="">levels:</label>
      <input v-model="editable.levels"
             type="number"
             class="form-control"
             name="levels"
             id="levels"
             required
             min="0"
             max="9999999"
      >
    </div>
    <div class="form-group">
      <label for="year" class="">Year:</label>
      <input v-model="editable.year"
             type="number"
             class="form-control"
             name="year"
             id="year"
             required
             min="0"
             max="9999999"
      >
    </div>

    <div class="form-group">
      <label for="description" class="">Description:</label>
      <textarea v-model="editable.description"
                type="text"
                class="form-control"
                name="description"
                id="description"
                rows="5"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="imgUrl" class="">Img:</label>
      <input v-model="editable.img"
             type="url"
             class="form-control"
             name="imgUrl"
             id="imgUrl"
             required
      >
    </div>
    <div class="button-group my-3">
      <button type="reset" class="btn btn-secondary">
        clear
      </button>
      <button type="submit" class="btn btn-primary">
        submit
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { House } from '../models/House.js'
import { watchEffect } from '@vue/runtime-core'
import { housesService } from '../services/HousesService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    house: { type: House, default: () => new House() }
  },
  setup(props) {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...props.house }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.houseId) {
            await housesService.editHouse(editable.value)
          } else {
            await housesService.createHouse(editable.value)
          }
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style>

</style>
