module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/urKitchen/'  //Git Repo name /F2E_week2/
        : '/',
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/reset.scss";
                    @import "@/assets/_variables.scss";
                    @import "@/assets/main.scss";
                    @import "@/assets/base.scss";
                    
                `
            }
        }
    },
    devServer: {
        proxy: 'http://localhost:49000/',
    }
}