<template>
  <a-card hoverable style="width: 100%" :loading="isLoadingArticleRead">
    <img
      slot="cover"
      alt="example"
      style="max-width: 400px;"
      v-if="doneArticleRead"
      :src="item.image" />
    <template slot="actions" class="ant-card-actions">
      <a-icon key="rollback" type="rollback" @click="onClickBackBtn"/>
      <a-icon key="edit" type="edit" @click="onClickEditBtn(item.id)"/>
      <a-button
        icon="delete"
        @click="onClickDeleteBtn(item.id)"
        :loading="isLoadingArticleRemove"/>
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
    isLoadingArticleRead: {
      type: Boolean,
      required: true
    },
    doneArticleRead: {
      type: Boolean,
      required: true
    },
    isLoadingArticleRemove: {
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
    onClickEditBtn (articleId) {
      this.onClickEditBtn_(articleId)
    },
    onClickDeleteBtn (articleId) {
      this.onClickDeleteBtn_(articleId)
    }
  }
}
</script>

<style>
</style>
