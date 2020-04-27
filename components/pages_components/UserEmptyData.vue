<template>
  <PageBody col="3">
    <template #c-1>
      <Card>
        <br />
        <CardTitle>You have ability to manage your profile.</CardTitle>
        <br />
        <img src="~/static/user.png" alt="user" class="info_img" />
        <br />
        <CardTitle>And print your profile as CV.</CardTitle>
        <br />
        <img src="~/static/user_print.png" alt="print" class="info_img" />
      </Card>
    </template>
    <template #c-2>
      <Card>
        <br />
        <CardTitle>
          Also you can fill your portfolio with preview.
        </CardTitle>
        <br />
        <img src="~/static/portfolio.png" alt="portf" class="info_img" />
        <br />
        <CardTitle>
          And become admin to manage languages items.
        </CardTitle>
        <br />
        <img src="~/static/admin.png" alt="admin" class="info_img" />
      </Card>
    </template>
    <template #c-3>
      <Card>
        <br />
        <CardTitle>You can create new articles or repositories.</CardTitle>
        <br />
        <img src="~/static/save.png" alt="save" class="info_img" />
        <br />
        <CardTitle>Or add from public lists.</CardTitle>
        <br />
        <img src="~/static/rep_list.png" alt="lists" class="info_img" />
      </Card>
    </template>
  </PageBody>
</template>

<script>
export default {
  name: 'UserEmptyData'
}
</script>
