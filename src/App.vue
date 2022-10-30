<template>
  <RouterView></RouterView>
</template>

<script>
export default {

};
</script>

<style lang="scss">

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}
a{
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px lightgrey;
  border: solid 3px transparent;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px rgb(174, 174, 174);
  border: solid 3px transparent;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  box-shadow: inset 0 0 10px 10px rgb(142, 142, 142);
}
</style>
