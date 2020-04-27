/**
 * This mixin contains logic with control filtering in pages with lists of articles, repositories
 * @external mixins_filterMixin
 */
export const filterMixin = {
  watch: {
    /**
     * If this.language will be changed, this.technology will be set null
     * @memberOf external:mixins_filterMixin
     */
    language() {
      this.technology = null
    }
  },
  /**
   * @memberOf external:mixins_filterMixin
   * @returns {{language: string, technology: string, searchKey: string}}
   */
  data() {
    return {
      language: '',
      technology: '',
      searchKey: ''
    }
  },
  computed: {
    /**
     * @memberOf external:mixins_filterMixin
     * @returns {Array} - filtered array of articles or friends
     */
    listFiltered() {
      // Cloning array witch i would like to filter to local visibility
      let filtredArray = this.checkedList.slice(0)
      const searchFunctions = [
        // Declaration different filtering functions in array
        function(array) {
          if (this.language) {
            return array.filter((value) => value.language === this.language)
          } else {
            return array
          }
        },
        function(array) {
          if (this.technology) {
            return array.filter((value) => value.technology === this.technology)
          } else {
            return array
          }
        },
        function(array) {
          if (this.searchKey) {
            return array.filter((value) =>
              value.name.toLowerCase().includes(this.searchKey.toLowerCase())
            )
          } else {
            return array
          }
        }
      ]

      for (const func of searchFunctions) {
        // Running all functions in array, each iteration will rewrite local
        // array of items
        filtredArray = func.bind(this)(filtredArray)
      }
      return filtredArray

      // if (this.language && this.technology && this.searchKey) {
      //   return this.checkedList.filter((value) => {
      //     return (
      //       value.technology === this.technology &&
      //       value.language === this.language &&
      //       value.name.toLowerCase().includes(this.searchKey.toLowerCase())
      //     )
      //   })
      // } else if (this.language && this.technology) {
      //   return this.checkedList.filter((value) => {
      //     return (
      //       value.technology === this.technology &&
      //       value.language === this.language
      //     )
      //   })
      // } else if (this.language && this.searchKey) {
      //   return this.checkedList.filter((value) => {
      //     return (
      //       value.language === this.language &&
      //       value.name.toLowerCase().includes(this.searchKey.toLowerCase())
      //     )
      //   })
      // } else if (this.searchKey) {
      //   return this.checkedList.filter((value) => {
      //     return value.name.toLowerCase().includes(this.searchKey.toLowerCase())
      //   })
      // } else if (this.language) {
      //   return this.checkedList.filter((value) => {
      //     return value.language === this.language
      //   })
      // } else {
      //   return this.checkedList
      // }
    },

    /**
     * @memberOf external:mixins_filterMixin
     * @returns {Array} - returns technologies of selected language, if selected
     */
    technologies() {
      if (this.language) {
        return this.languages[this.language].technologies || []
      } else {
        return []
      }
    }
  }
}
