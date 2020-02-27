<template>
  <div id="app">
    <ApolloQuery
      :query="gql => gql`
        query PageItemQuery($id: ID!) {
          PageItem(id: $id) {
            id
            slug
            content {
              _uid
              component
              body
            }
          }
        }
      `"
      :variables="{ id: 'home' }">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <div v-else-if="data" class="result apollo">
          <component :blok="data.PageItem.content" :is="data.PageItem.content.component"/>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  created() {
    window.storyblok.on(['change', 'published'], () => {
      this.$apollo.queries.query.options.fetchPolicy = 'network-only';
      this.$apollo.queries.query.refresh();
    });
  },
};
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    margin: 0 auto;
    max-width: 640px;
  }

  .teaser,
  .column {
    font-size: 2rem;
    text-align: center;
    line-height: 3;
    background: #ebeff2;
    border-radius: 10px;
    margin: 10px 5px;
  }

  .feature img {
    width: 100%;
    height: auto;
  }

  .grid {
    display: flex;
  }

  .column {
    flex: 1;
  }

  .loading {
    text-align: center;
    padding: 50px;
  }
</style>
