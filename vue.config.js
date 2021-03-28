module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      'test': {
        // http://xiangyou.net/test/index.php
        target: 'http://xiangyou.net/',
        changeOrigin: true,
      }
    }
  }
};