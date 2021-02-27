<template>
  <a-list
    class="demo-loadmore-list"
    :loading="isLoadingArticleItems"
    item-layout="horizontal"
    :data-source="items" >
    <div
      v-if="doneArticleItems"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }" >
      <a-spin v-if="isLoadingArticleItems" />
      <a-button v-else @click="onClickMoreBtn">
        loading more
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions" @click="onClickEditBtn(item.id)">edit</a>
      <a slot="actions" @click="onClickReadBtn(item.id)">more</a>
      <a-list-item-meta :description="item.content">
        <span slot="title">
          <router-link :to="{ name: 'articlesRead', params: { articleId: item.id }}">
            {{ item.title }}
          </router-link>
        </span>
        <a-avatar slot="avatar" :size="64" :src="item.image" />
      </a-list-item-meta>
      <div>{{item.author}}</div>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    isLoadingArticleItems: {
      type: Boolean,
      required: true
    },
    doneArticleItems: {
      type: Boolean,
      required: true
    },
    onClickMoreBtn_: {
      type: Function,
      required: true
    },
    onClickEditBtn_: {
      type: Function,
      required: true
    },
    onClickReadBtn_: {
      type: Function,
      required: true
    }
  },

  /* request, prepare, on, cb, action */
  methods: {
    async onClickMoreBtn () {
      this.onClickMoreBtn_()
    },
    onClcikRefreshBtn () {
      this.onClcikRefreshBtn_()
    },
    onClickEditBtn (articleId) {
      this.onClickEditBtn_(articleId)
    },
    onClickReadBtn (articleId) {
      this.onClickReadBtn_(articleId)
    }
  }

}
</script>

<style>

</style>
