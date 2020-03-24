export const filterMixin = {
  watch: {
    language() {
      this.technology = null
    }
  },
  data() {
    return {
      language: null,
      technology: null,
      searchKey: null
    }
  },
  computed: {
    listFiltered() {
      if (this.language && this.technology && this.searchKey) {
        return this.checkedList.filter((value) => {
          return (
            value.technology === this.technology &&
            value.language === this.language &&
            value.name.toLowerCase().includes(this.searchKey.toLowerCase())
          )
        })
      } else if (this.language && this.technology) {
        return this.checkedList.filter((value) => {
          return (
            value.technology === this.technology &&
            value.language === this.language
          )
        })
      } else if (this.language && this.searchKey) {
        return this.checkedList.filter((value) => {
          return (
            value.language === this.language &&
            value.name.toLowerCase().includes(this.searchKey.toLowerCase())
          )
        })
      } else if (this.searchKey) {
        return this.checkedList.filter((value) => {
          return value.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      } else if (this.language) {
        return this.checkedList.filter((value) => {
          return value.language === this.language
        })
      } else {
        return this.checkedList
      }
    },
    technologies() {
      if (this.language) {
        return this.languages[this.language].technologies || []
      } else {
        return []
      }
    }
  }
}
