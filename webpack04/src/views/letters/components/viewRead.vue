<template>
  <a-card hoverable style="width: 100%" :loading="isLoadingLetterRead">
    <img
      slot="cover"
      alt="example"
      style="max-width: 400px;"
      v-if="doneLetterRead"
      :src="item.image" />
    <template slot="actions" class="ant-card-actions">
      <a-icon key="rollback" type="rollback" @click="onClickBackBtn"/>
      <a-icon key="edit" type="edit" @click="onClickEditBtn(item.id)"/>
      <a-button
        icon="delete"
        @click="onClickDeleteBtn(item.id)"
        :loading="isLoadingLetterRemove"/>
    </template>
    <a-card-meta
      :title="item.title"
      :description="item.content">
      <a-avatar
        slot="avatar"
        :size="64"
        :src="item.animals" />
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    isLoadingLetterRead: {
      type: Boolean,
      required: true
    },
    doneLetterRead: {
      type: Boolean,
      required: true
    },
    isLoadingLetterRemove: {
      type: Boolean,
      required: true
    },
    onClickBackBtn_: {
      type: Function,
      required: true
    },
    onClickEditBtn_: {
      type: Function,
      required: true
    },
    onClickDeleteBtn_: {
      type: Function,
      required: true
    }
  },

  methods: {
    onClickBackBtn () {
      this.onClickBackBtn_()
    },
    onClickEditBtn (letterId) {
      this.onClickEditBtn_(letterId)
    },
    onClickDeleteBtn (letterId) {
      this.onClickDeleteBtn_(letterId)
    }
  }
}
</script>

<style>
</style>
