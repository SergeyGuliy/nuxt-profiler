<template>
  <div id="Git">
    <img
      src="https://avatars1.githubusercontent.com/u/43864245?v=4"
      class="git__img"
      alt="profile_img"
    />
    <div class="git__actions">
      <a
        :href="`${data.userInfo.contacts.github}/?tab=followers`"
        class="box"
        target="_blank"
      >
        Followers
        <span class="badge">{{ gitApiInfo.followers }}</span>
      </a>
      <a
        :href="`${data.userInfo.contacts.github}/?tab=following`"
        class="box"
        target="_blank"
      >
        Following
        <span class="badge">{{ gitApiInfo.following }}</span>
      </a>
      <a
        :href="`${data.userInfo.contacts.github}/?tab=repositories`"
        class="box"
        target="_blank"
      >
        Repositories
        <span class="badge">{{ gitApiInfo.public_repos }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GitInfo',
  props: ['gitApiInfo', 'data']
}
</script>

<style lang="sass">
#Git
  display: flex
  flex-direction: column
  border: 2px solid #999999
  border-radius: 5px
  .git__img
    object-fit: cover
    width: 100%
    height: 100%
    max-height: 300px
  .git__actions
    height: 30px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 0 0 5px 5px
    .box
      background-color: #e0e0e0
      width: 33.33333%
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      text-decoration: none
      .badge
        background-color: #e0e0e0
        height: 19px
        width: 19px
        text-align: center
        line-height: 17px
        border-radius: 50%
        border: 1px solid #707070
        font-size: 11px
        margin-left: 5px
    .box:hover
      zoom: 1.02
      background-color: #cccccc
</style>
