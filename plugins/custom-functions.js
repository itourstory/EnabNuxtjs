export default ({ app }, inject) => {
  inject('CustomStore', function () {
    return "something"
  })
}