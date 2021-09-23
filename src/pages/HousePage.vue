<template>
  <div v-if="house" class="py-4">
    <div class="d-flex flex-wrap w-100">
      <House :house="house" class="house-details" />
      <div class="ms-4 flex-grow-1">
        <p>
          <b>Contact Seller</b>
        </p>
        <div class="d-flex clip-text align-items-center">
          <img :src="house.creator.picture" alt="" class="rounded-circle" height="64">
          <h4>
            {{ house.creator.name }}
          </h4>
        </div>
        <div v-if="house.creatorId === account.id">
          <p class="my-3">
            <b>Listing Controls</b>
          </p>
          <div>
            <button class="btn text-dark lighten-20" @click="remove(house)">
              <b>
                Remove Listing
              </b>
            </button>
            <button class="btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#edit-modal">
              <b>
                Edit
              </b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal id="edit-modal">
      <template #modal-title>
        {{ house.address }} {{ house.price }} {{ house.bedrooms }}
      </template>
      <template #modal-body>
        <HouseForm :house="house" />
      </template>
    </Modal>
  </div>
  <div v-else>
    ......loading.......
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { housesService } from '../services/HousesService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'
export default {
  setup() {
    const route = useRoute()

    onMounted(() => {
      housesService.getHouseById(route.params.houseId)
    })

    return {
      account: computed(() => AppState.account),
      house: computed(() => AppState.house),
      async remove(house) {
        try {
          const yes = await Pop.confirm('are you sure?')
          if (!yes) { return }
          await housesService.removeHouse(house.houseId)
          router.push({ name: 'Houses' })
        } catch (e) {
          Pop.toast(e.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.house-details{
  max-width: 50vw;
}
</style>
